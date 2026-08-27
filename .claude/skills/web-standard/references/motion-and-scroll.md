# Motion, Scroll and Sticky Layout

Every entry below is a bug that shipped, was seen by a person, and was traced.
None of them are caught by `lint` or `build`, and most of them look correct in
the source. Read this before building anything that moves or sticks.

## Pick one reveal system and keep it

A scroll reveal is fifty lines of `IntersectionObserver` and a CSS transition.
Adding a library for it means two systems doing one job, and they will not agree:
the browser tells `IntersectionObserver` exactly when an element crosses the
fold, while a library that measures scroll position against cached offsets has to
work it out, and only one of those is wrong after a font loads.

If a project already has a reveal, use it. If it does not, write the small one.
Reach for a library only when the interaction genuinely needs it, and then use
that library for all of it.

## The gotchas

### A scroll library caches element positions at init, and web fonts land later

The single worst offender. A library like AOS records every element's offset when
it initialises, then compares scroll against those numbers. Web fonts swap in
after that and change the height of every heading on the page, so the stored
offsets are wrong by hundreds of pixels and elements reveal far too late, often
after they are already past. Fonts do not mutate the DOM, so a mutation observer
never notices.

Re-measure once things have settled:

```js
document.fonts?.ready.then(() => AOS.refresh());
window.addEventListener("load", () => AOS.refresh());
```

### Smooth scrolling exposes throttled scroll handlers

AOS throttles its scroll handler at 99ms by default, about six frames. Native
scrolling moves in jumps big enough to hide that. A smooth-scroll library moves
continuously, so the same delay reads as the reveal lagging behind the page. Drop
it to one frame (`throttleDelay: 16`).

### AOS only ships delay classes at 50ms intervals

`data-aos-delay="80"` matches no rule and is silently ignored, so a staggered
list lands all at once. Use multiples of 50.

### A smooth-scroll library owns the scroll position, so fragment links fight it

The browser's own jump to `#section` leaves the library and the document
disagreeing, and the page snaps back. Route in-page links through the library's
own `scrollTo`, with an offset matching the sticky header.

### Reveals that fire once look broken on the way back

An observer that calls `disconnect()` on first intersection plays the reveal once
per page load and never again, however far the visitor scrolls back. Unless there
is a reason to latch, follow `isIntersecting` both ways.

### Cap the frame delta in any `requestAnimationFrame` loop

A backgrounded tab hands back a delta of several seconds on its first frame.
Uncapped, a marquee teleports and a stepped animation skips whole items:

```js
const step = Math.min(delta, 100);
```

### Derive one value, do not run two timers

An auto-advancing panel with a progress bar must drive both from the same value.
Two timers drift apart within a few cycles and the bar visibly finishes early or
late. Count through the whole cycle rather than resetting a fraction per item:
a reset schedules a state change that lands a frame later, so the outgoing bar is
painted once at zero before it unmounts, which is a blink.

## Sticky and stacking

### `position: sticky` inside a grid does nothing without `items-start`

Grid items stretch to the row height by default, so the item is already as tall
as the row and a sticky child has nowhere to travel. It fails silently. Set
`align-items: start` on the grid.

### Absolutely positioned siblings paint in DOM order

A stack of absolute elements with no `z-index` paints in source order, so
anything written after the hero element covers it. If a translucent card is
washing out the thing it sits beside, check the order before checking the
opacity.

### A sticky header needs `scroll-padding-top` on the scroll container

Without it, every fragment jump lands with the target's heading underneath the
header. One declaration on `html` covers every anchor on the site, and also
covers scrolling caused by keyboard focus and by find-in-page, which
`scroll-margin-top` on individual sections does not reliably catch.

### A translucent sticky header is not enough separation for large type

Display type passing underneath a bar at 70 percent opacity stays legible through
it, so a heading scrolling past reads as torn in half. Blur does not fix it. Take
the bar to 90 percent or higher.

## Transforms

### A counter-rotation must cancel the live rotation, not just the static angle

Placing items on a circle with `rotate(θ) translate(r) rotate(-θ)` keeps them
upright only while the container is still. If the container carries an animated
rotation, every item keeps that rotation and the ones at the top render upside
down. Either counter-rotate by the live value as well, or place items by
translation only (`x = R sin a`, `y = -R cos a`) and never rotate anything.

A `rotateX` tilt on the same container skews the type as well.

### Mask the edges of a moving row, do not clip them

`overflow: hidden` slices words through the middle at the boundary. A
`mask-image` gradient fades them out instead, which is the difference between
looking broken and looking deliberate. The colour in a mask supplies alpha only,
so `black` there is not a palette value escaping into a component.

### Measure travel, never guess it

A row that translates by a fixed percentage cuts its first and last items at most
screen widths. Measure the overflow (`row.scrollWidth - track.clientWidth`) and
travel exactly that, so it starts flush with one gutter and ends flush with the
other.

## Reduced motion

Every one of the above needs a `prefers-reduced-motion: reduce` path, and the
path has to leave content **visible**, not just still.

The common failure is a library whose stylesheet starts every animated element at
`opacity: 0`. Disabling the animation without disabling the library leaves a
blank page. Check that the reduced-motion branch renders the finished state:

- A scroll library: use its `disable` option, which strips the attributes.
- A smooth-scroll library: do not start it at all.
- A hand-rolled reveal: set the visible state immediately.
- A CSS keyframe animation: `animation: none`, not just a shortened duration. An
  infinite animation at `0.01ms` still runs, it just lands on its last frame,
  which can park a marquee half a track to the left with a visible gap.

## A reveal is a downward gesture, so only observe it that way

The natural implementation is one line:

```js
setInView(entry.isIntersecting);
```

It is symmetrical, it looks obviously right, and it produces two separate
bugs that only show up on a real page.

**Scrolling up replays everything backwards.** An element the reader has
already passed re-enters through the *top* edge on the way back, so the whole
section animates itself in reverse underneath them. Nobody scrolls up to watch
an introduction play again.

**A tall section fades out while it is being read.** As soon as its top
crosses the viewport edge on the way down, `isIntersecting` goes false and the
element hides, with the rest of it still on screen.

Split the two transitions instead. They are not symmetrical:

```js
if (entry.isIntersecting) {
  setInView(true);                              // the reveal
} else if (entry.boundingClientRect.top > 0) {
  setInView(false);                             // gone below: re-arm, off screen
}
// gone above: do nothing. It stays revealed.
```

`top > 0` is enough to mean "below". An element that is not intersecting is
either entirely above the viewport, where its top is negative, or entirely
below it.

Before adopting a reveal library, check it can express this. Many cannot. AOS,
for one, toggles its class around a single trigger line, so `once: false`
reverses on the way up and `once: true` never plays again; the behaviour above
is not among its options. That is worth knowing before it is wired into a
dozen sections rather than after.

And note what will not catch this: a suite running under
`reducedMotion: "reduce"` sees every element in its final state, so a reveal
that plays backwards passes every test in it.
