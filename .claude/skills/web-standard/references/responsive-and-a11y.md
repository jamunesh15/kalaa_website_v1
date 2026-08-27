# Responsive & Accessibility

Every screen must work on a phone, a tablet, and a desktop, and must be usable
by keyboard and assistive tech. These aren't extras added at the end, they are
part of building the component. A layout that only works at one width, or a
control only reachable by mouse, is not done.

## Part 1, Responsive

### Mobile-first, always

Write base styles for the smallest screen, then **enhance upward** with
`min-width` media queries (or Tailwind `sm:`/`md:`/`lg:` prefixes). This keeps
mobile, the hardest and most common case, correct by default, and desktop
becomes progressive additions rather than a desktop layout you fight to shrink.

```css
/* base = mobile */
.grid{display:grid;grid-template-columns:1fr;gap:var(--space-4);}
/* enhance up */
@media (min-width:768px){ .grid{grid-template-columns:repeat(2,1fr);} }
@media (min-width:1024px){ .grid{grid-template-columns:repeat(3,1fr);} }
```

### Breakpoints (shared with the tokens)

```
sm 640px  ·  md 768px  ·  lg 1024px  ·  xl 1280px  ·  2xl 1536px
```

Think in three device bands and design each intentionally:
- **Mobile (< md):** single column, stacked, thumb-reachable actions, full-width
  primary buttons, off-canvas nav (hamburger), bottom sheets over centered
  modals.
- **Tablet (md-lg):** one or two columns, sidebar may collapse to icons, denser
  than mobile but still touch-friendly.
- **Desktop (≥ lg):** multi-column, persistent sidebar, hover affordances,
  comfortable max content width.

### Fluid by default

- Prefer fluid units and intrinsic layout: `%`, `fr`, `minmax()`, `flex`,
  `gap`, `clamp()`. Avoid fixed pixel widths on containers and inputs.
- Constrain long-form content with a max width (e.g. `max-width:72ch` for text,
  a container max around `1200-1280px`) and center it, full-bleed text is hard
  to read on wide screens.
- Use `clamp()` for fluid type/spacing where a smooth scale helps, e.g.
  `font-size:clamp(1.5rem,4vw,2.25rem)` for a hero heading.
- Images/media: `max-width:100%; height:auto;`, and use responsive `srcset`
  where it matters.

### Layout tools

- **Flexbox** for one-dimensional rows/toolbars (with `flex-wrap` so items wrap
  instead of overflowing).
- **Grid** for two-dimensional layouts and card galleries. `repeat(auto-fit,
  minmax(<min>,1fr))` gives a responsive gallery with no media queries.
- **Container queries** when a component must adapt to its container rather than
  the viewport (e.g. a card that's narrow in a sidebar but wide in main content).
  Prefer these for truly reusable components.

### Don't break the viewport

- Never let content force horizontal scrolling. Wide tables scroll **inside**
  their own container; code blocks scroll or wrap; long words use
  `overflow-wrap:anywhere`.
- Respect safe areas on mobile (`env(safe-area-inset-*)`) for fixed bars.
- Test at 320px width, 768px, and 1280px at minimum before calling it done.

### Touch & input

- Touch targets ≥ 44×44px with adequate spacing so neighbors aren't mis-tapped.
- Don't hide essential actions behind hover-only interactions, they don't exist
  on touch. Hover is an enhancement, not the only path.
- Sticky headers/bars: keep them thin on mobile so they don't eat the screen.

## Part 2, Accessibility (baseline every component meets)

Accessibility is consistency for *all* users. The baseline below is not optional
polish; it's what makes the UI usable with a keyboard, a screen reader, or low
vision, and it usually improves the experience for everyone.

### Semantics first

- Use the right element: `<button>` for actions, `<a href>` for navigation,
  `<nav>`, `<main>`, `<header>`, `<footer>`, `<ul>` for lists, `<table>` for
  tabular data, real form controls. Correct semantics give keyboard and screen-
  reader behavior for free; `<div>` soup does not.
- Add ARIA only to fill gaps native HTML can't (`role`, `aria-*`). Don't ARIA-
  label something that a native element already conveys.

### Keyboard

- Everything interactive is reachable and operable by keyboard in a logical
  order. `Tab` moves, `Enter`/`Space` activate, `Esc` closes overlays, arrows
  move within composites (menus, tabs, radio groups).
- **Visible focus** on every focusable element, a clear ring using
  `--color-focus-ring`. Never remove focus outlines without replacing them.
- Manage focus for overlays: move focus in on open, **trap** it inside a
  modal/drawer, restore it to the trigger on close.
- No keyboard traps anywhere else, the user can always tab away.

### Labels & text alternatives

- Every input has a real, associated `<label>`. Placeholder text is not a label.
- Icon-only controls need an `aria-label`. Decorative images use empty `alt=""`;
  meaningful images have descriptive `alt`.
- Link/button text makes sense out of context ("Download report", not "click
  here").

### Color & contrast

- Text contrast ≥ **4.5:1** (≥ **3:1** for large text); UI components/borders
  and focus indicators ≥ **3:1**. Verify in **both** light and dark modes.
- **Never use color alone** to convey meaning, pair it with text, an icon, or a
  pattern (e.g. errors have an icon + message, not just a red border).

### Feedback & motion

- Announce dynamic changes: `role="alert"`/`aria-live` for errors and important
  updates; `aria-busy` for loading regions.
- Respect `prefers-reduced-motion`, disable or minimize non-essential animation
  and never use motion as the only cue.
- Don't auto-dismiss critical information too fast; give users time and control.

### Forms specifically

- Link errors to fields with `aria-describedby` and set `aria-invalid`.
- Move focus to the first error on failed submit; keep error text next to the
  field.
- Group related controls with `<fieldset>`/`<legend>` (e.g. radio groups).

### Quick self-check before "done"

Tab through the whole screen with no mouse, can you reach and operate
everything, and is focus always visible? Zoom to 200%, does anything break or
overlap? Toggle dark mode, does contrast still hold? Shrink to 320px, any
horizontal scroll or clipped content? If all four pass, the responsive +
accessibility baseline is met.

### Checking responsive without opening a browser yourself

Run the browser tests first, if the project has them. In this repository that is
`npm test`, which drives real Blink, WebKit and Gecko builds and already covers
the mechanical half of the four checks above: horizontal overflow at phone,
tablet and desktop widths, form controls sized below the root text size,
duplicate ids, landmarks, and a visible focus style. A failure there names the
element and the measurement, which beats reading markup and guessing.

What the tests cannot tell you is whether the result looks right: cramped
spacing, an awkward wrap, a heading that technically fits and still reads badly,
an order that makes no sense on a phone. So read the markup as well, and check
every one of these on every section you touched. Say in the pull request which
checks ran, and ask for a look on a real phone when the change is visual.

**Breakpoint coverage.** Tailwind is mobile-first: an unprefixed class is the
*small screen* value and `md:`/`lg:` are the overrides. So `grid-cols-3` with no
`grid-cols-1` before it means three columns on a 375px phone. Every multi-column
grid, side-by-side flex row, and fixed-direction layout needs its small-screen
value written first.

**Things that overflow.** Search your diff for each of these and justify it or
fix it:

- Fixed widths: `w-[600px]`, `min-w-[500px]`, `basis-[420px]`. Anything wider
  than ~320px minus the page padding overflows the smallest phone.
- `whitespace-nowrap` on text whose length you do not control.
- A flex row with no `flex-wrap` and no `flex-col` default.
- Long unbroken strings, URLs, emails, code, IDs. They need `break-words` or
  `break-all`, or they push the page sideways.
- A truncating child of a flex container without `min-w-0` on it. Truncation
  silently fails and the row grows instead.
- Wide tables, code blocks and diagrams: each needs its own
  `overflow-x-auto` wrapper so the *page* never scrolls sideways.
- `w-screen`, `100vw`, and negative margins, which ignore the scrollbar.

**Text at small sizes.** Large display type is where copy breaks first, and it
is the most common thing to get wrong. Every size above body text needs a
small-screen value, either a `clamp()` or a breakpoint step. The concrete
desktop-to-mobile numbers are in `design-tokens.md` under "Type must scale with
the screen". A display-size heading with no mobile step can fall below ten
characters per line on a phone.

Two specific traps to check for by name:

- **A display size with no breakpoint**, whether an arbitrary `text-[…px]` value
  or a large scale step standing alone. It is the same size on every device.
- **Any form control sized below `1rem`.** One rem is the root text size, so this
  is the same sentence as "a control is never smaller than body text". Write it
  that way rather than as a pixel value: a control set in `rem` still satisfies
  the rule for someone who has raised their browser's default text size, and a
  control set in pixels silently stops satisfying it for exactly those people.
  The reason is a platform behaviour rather than a preference. iOS Safari zooms
  the whole page when a focused control renders below the root size, and getting
  back out is awkward enough that it reads as a broken page.

**Spacing at small sizes.** Section-scale padding and gaps need a smaller mobile
value, or a phone screen is mostly empty space. A section padding class with no
smaller value before it is the usual offender. Spacing inside a component
normally stays as it is.

**Parallel items.** Three cards side by side should have headings of similar
length. One that wraps while its neighbours do not is a visible defect on
mobile, not a detail.

**Images and embeds.** Explicit `width`/`height` or an aspect-ratio box, and
`max-width: 100%`. Without them the layout jumps as they load.

**Copy what already works.** The rest of the page has solved this. If every
section uses `px-5 sm:px-6 lg:px-8` and a `max-w-7xl` container, match it
exactly rather than inventing spacing. A section that is responsive in a
different way from its neighbours is a bug even when it happens to look fine.

Be honest about the limit of this. It catches the common breakages, and it does
not catch a section that is technically fluid and still looks wrong. If a change
is visually significant, say on the card that it needs a look on a real phone
before merge.

## It has to work in every engine, not every browser

There are three rendering engines that matter, not a dozen browsers. Chrome,
Edge, Brave, Opera and Arc are all Blink. Firefox is Gecko. Safari is WebKit.
Support the current and previous major version of each.

**WebKit is the one that breaks, and it is not optional.** On iOS every browser
is WebKit underneath, including Chrome and Firefox there, because Apple requires
it. So "it works in Chrome on my phone" tells you about WebKit, not about Blink,
and a WebKit bug reaches every iPhone visitor no matter what they installed.

### Before using a CSS or JS feature

Check it is in all three engines, and check when it arrived rather than only
whether it exists. A feature that shipped in Safari recently is missing from
every device that has not updated, which on iOS is a large, slow-moving group.

Then choose one of these deliberately, and say which:

- **Use a feature all three have had for a while.** The default, and usually
  right.
- **Progressively enhance.** The page works without the feature and is nicer
  with it. Wrap it in `@supports` so the fallback is real rather than assumed.
- **Ship it knowing older engines miss it,** and write down what those visitors
  see. Acceptable for a visual flourish, not for layout or for anything a
  visitor has to click.

What is never acceptable is finding out from a user.

### The traps that actually bite

These are the ones that pass every review because they look ordinary:

- **Newer viewport units** such as `dvh` and `svh`. Widely supported now, absent
  in older WebKit, and when they fail an element can collapse to nothing rather
  than fall back gracefully.
- **`overflow: clip`**, which arrived in WebKit long after Blink. Where it is
  missing the page simply scrolls sideways again, and the layout looks fine on
  the machine of whoever wrote it.
- **`:has()`**, and any selector doing structural work. When it is unsupported
  the rule is dropped silently, so an element keeps the styling you meant to
  override.
- **Date parsing.** WebKit is stricter than Blink about non-standard date
  strings and returns Invalid Date where Chrome guesses. Anything parsing a date
  string needs the ISO form.
- **Backdrop filters and heavy blur**, which are supported but far more
  expensive in WebKit, especially on a sticky element that repaints while
  scrolling.
- **Form control appearance.** Validation messages, date pickers and select
  menus are drawn by the engine and look different in each. Style the field, do
  not assume the browser furniture matches.
- **Scroll behaviour and momentum**, which differ enough on iOS that a
  scroll-driven effect tuned in Blink can feel wrong or stutter in WebKit.

### Verify it rather than reason about it

Where the project has browser tests, run them in all three engines. Reasoning
about engine differences from the source is exactly as reliable as reasoning
about layout from the source, which is to say it catches the obvious cases and
misses the ones that cost you.

A visual change still deserves a look on a real iPhone before it merges, because
an automated engine check proves the page works there, not that it looks right.
