<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Kalaa Website

## Read these first

@.claude/rules/web-common.md

The rules that apply to every website repository live in
[.claude/rules/web-common.md](.claude/rules/web-common.md), and the detailed
standard behind them lives in
[.claude/skills/web-standard/](.claude/skills/web-standard/). Read `SKILL.md`
there before building any page, then the reference file for the kind of work you
are doing.

**This file holds only what is specific to Kalaa.** Anything that would be true
of any website belongs in the common rules instead, so it stays portable.

## Theme

The direction is **Hive Studio**: a white sheet, big black display type, violet
doing the shouting, 3D characters carrying the personality, soft edges and soft
shadows. Kalaa's own idea on top of it is the **sage frame** the sheet sits on,
which is the one part of the design that is not from the reference and the thing
that makes a Kalaa page recognisable in a screenshot.

An earlier version of this system was built around Etereo instead: cream ground,
thick ink outlines, hard offset shadows. That was one reference generalised
across a set that does not share it. None of it survives, and it should not come
back by halves.

Everything below lives in `src/styles/tokens.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--page` | `#7fa99b` | The sage frame. Visible only as a margin. |
| `--sheet` / `--surface` | `#ffffff` | The sheet, and cards on it. |
| `--ink` | `#14131a` | Headings and high-emphasis text. |
| `--ink-body` | `#33313d` | Body text. |
| `--ink-muted` | `#56545f` | Secondary text. **Never on the sage.** |
| `--line` | `#e6e4ee` | Hairline dividers. There are no heavy outlines. |
| `--accent` | `#ffd84d` | The field behind things. **Never a button.** |
| `--action` | `#14131a` | Buttons. The logo's own black. |
| `--action-hover` | `#2f2d38` | Buttons, hovered. |
| `--tint-butter` / `--tint-peach` / `--tint-sage` / `--tint-cloud` | | Card fills. Rhythm, never meaning. |
| `--radius` | `1.25rem` | The corner. One value, everywhere. |
| `--border-w` | `1px` | The hairline. One width, everywhere. |
| `--shadow-soft` / `--shadow-lift` | | Elevation, resting and hovered. |
| `--frame` | `0` / `1.25rem` | How much sage shows. Zero on a phone. |

### Why the loud colour is light, and is not the button

Kalaa's logo is black and white. A dark saturated brand colour next to a
black-and-white mark competes with it: the eye reads two heavy things and cannot
tell which one is the brand.

So the accent is a light butter yellow and it is a **field**, not a control. It
is the panel behind the hero artwork, the marker behind a headline word, and the
closing band. The buttons are the logo's own black, which is why `--action`
exists as a separate token from `--accent`. A pale yellow button with dark text
on a white sheet does not read as pressable, and putting the accent on a button
is the single easiest way to undo this decision by accident.

This is a deliberate departure from the reference, which does put its brand
colour on its buttons. It can afford to: its brand colour is a mid violet.

Measured contrast, and the reason these are not up for casual tuning:

- On the sheet: ink **18.5:1**, body **12.8:1**, muted **7.4:1**.
- On the butter accent: ink **13.3:1**, body **9.2:1**, muted **5.4:1**.
- White on the action black is **18.5:1**.
- On the sage: ink **7.1:1**, body **4.9:1**, and **muted is 2.9:1, which
  fails**. That is the one combination in this palette that looks fine and is
  not readable. The contrast suite fails the build over it, which is why the
  footer sits on the sheet rather than on the frame.
- The accent against the sheet is **1.38:1**. That is a hue difference rather
  than a luminance one: fine for a large field, useless for a hairline. Never
  outline anything in it.

### Typefaces

**Chillax for display, Switzer for text.** Both self-hosted from Fontshare under
the ITF Free Font Licence, both Latin only because the site is English only. See
`src/fonts/README.md`.

Chillax was chosen over Clash Display and Panchang, and both losing families
were deleted from the repository the same day. An unused font is a decision
waiting to be relitigated.

Two families is the ceiling. Chillax tops out at 700, so a heading needing more
presence gets it from size, not from a weight that does not exist. No component
names a typeface: `theme.css` maps the families to `font-display` and
`font-sans`, and components ask for the role.

### One radius, everywhere

`--radius` is a single token on purpose, and this is a rule rather than a
preference. A button, an input, a card, an image frame and a section panel carry
the same corner.

**The reference uses two**: pill buttons and softer panels. This does not.
`1.25rem` was picked because it serves both ends at once, reading as very nearly
a pill on a 48px control and as a soft panel on a large card. That is how the
reference's two radii become one here, and it is a deliberate departure rather
than an oversight.

### Two things the reference does that this design does not

- **The multi-hue gradient on one headline word.** It is the fastest-ageing
  thing on that page. The headline highlights a word in the accent instead.
- **Pinned scroll sections.** Ruled out for this site. Objects may respond to
  input; the page never fights the scroll.

## Site facts

- Production origin and site name: `src/site.ts`. The canonical, `og:url`,
  `robots.txt` and the sitemap all read from there, which is what stops them
  drifting apart.
- Route registry: `src/routes.ts`. Three routes today, `/`, `/contact` and
  `/privacy-policy`.
- `/contact` carries the same information as the live kalaa.io/contact and no
  more: three channels and one line of invitation. There is no form, there or
  here, because there is no backend in this repository to receive one and a form
  that posts nowhere is worse than none. Everything pointing at "Contact" goes
  to this page; the landing page keeps its closing section, whose button now
  hands over to it.
- `public/llms.txt` lists the pages for answer engines. Keep it in step with the
  route registry.

## Components

`src/components/` is split by what a thing is, not by which page uses it.

### `src/components/ui/`, the primitives

- `Button`, every pressable action. Renders an anchor when given `href` and a
  button otherwise, because a thing that navigates and a thing that acts are
  different elements to everything except the eye. Two variants, primary and
  secondary. The lift and drop come from the `pressable` utility, not from here.
- `Card`, the outlined panel. Four fills. **The fill is rhythm, not meaning**:
  nothing may encode information in which colour a card happens to be.
- `Pill`, the small uppercase label above a heading. Never in square brackets.
- `Section`, the page's horizontal rhythm. One max width and one gutter for the
  whole site, so a heading in one block lines up with a heading three blocks
  down. Sections setting their own width is how that quietly stops being true.
- `AssetSlot`, a dashed frame holding the exact space a real picture will take,
  at the real aspect ratio, labelled with what belongs in it. It exists because
  the illustration and 3D assets this design is built around do not exist yet,
  and stock imagery on an agency's own site is worse than an honest gap.
  **Delete it when the last slot is filled.** A placeholder that outlives its
  purpose is how one ships to production.
- `surface.ts` is not a component. It holds the three class strings that make
  something a surface, so the card, the button and the pill cannot drift apart
  on corner, border or shadow.

### `src/components/layout/`, the page skeleton

- `PageFrame`, the white sheet the site is printed on. The document is sage;
  this is the sheet sitting on it, and the sage shows through as a margin on all
  four sides. **Never give it `overflow-hidden`**, however tempting for clipping
  corners: an ancestor with hidden overflow silently breaks `position: sticky`
  on the masthead inside it, and that failure reads as a header bug.
- `SiteHeader`, the masthead and primary nav, mounted once in the root layout.
  Sticks to `--frame` rather than to zero, so it rests inside the sage margin
  instead of scrolling the frame away at the top.
- `SiteFooter`, the site footer, mounted **outside** `<main>` so it is exposed
  as the contentinfo landmark.
- `MobileNav`, the disclosure menu below `md:`. Escape closes it and choosing a
  link closes it. The panel is unmounted when closed so its links are not in the
  tab order behind it.

All three are structure only for now. The redesign dresses them in step 2.

Add every new shared component to this list. `npm run check:structure` fails a
component that nothing documents, because nothing would lead the next person to
it.

### `src/sections/`, one file per section

A section of a page is not a reusable component and does not belong beside the
primitives. `src/sections/home/` holds `Hero`, `Services`, `Process`, `Work` and
`ClosingCta`, and `src/app/page.tsx` holds nothing but the order they appear in.

v1 put seventeen sections in `page.tsx` and it ran to 1,323 lines. The rule now
is that a page file is a running order. If you are writing markup in one, the
section wants its own file.

### `src/content/`, the content layer

`services.ts` and `process.ts` are typed arrays. `types.ts` describes their
shape as if a CMS were already returning them, and `index.ts` holds the
accessors. **Nothing outside `src/content/` imports those arrays directly**: a
page calls `getServices()`.

The CMS is not chosen yet. That indirection is what makes choosing one later a
change to `index.ts` instead of a rewrite of every page.

### `src/seo/`, and why it is not in `components`

- `graph.ts` builds the JSON-LD `@graph`: Organization and WebSite today, with
  page-specific nodes appended by the page that owns them.
- `JsonLd` renders it.

It lives apart because it is not a visual component and because it went missing
once: stripping the v1 design layer took the structured data out of `page.tsx`
along with it, and only `tests/seo.spec.ts` noticed. Structured data that lives
inside whichever page happens to hold it is structured data waiting to be
deleted by accident.

### What the redesign removed, and why it is not coming back

`BrandMark`, `Reveal`, `ReasonWhyCards`, `SmoothScroll`, `CapabilityStrip`,
`PricingCards` and `GrowthLoopRing` were deleted with the rest of the v1 design
layer. They are in git history. Do not restore one to save time: each was built
around the old look, and reusing it is how a redesign quietly becomes a reskin.

`src/brand.ts` stays, because `scripts/make-favicon.mjs`, `apple-icon.tsx` and
`opengraph-image.tsx` all draw the mark from it. **It is shaped to match
Fraunces**, which this redesign removed, so the K will need redrawing once the
display face is chosen. Until then the favicon is a letterform from a typeface
the site no longer sets.


## Motion stack

One system, on purpose.

| System | Used by | Notes |
| --- | --- | --- |
| `motion` | the redesign, as sections land | Springs, drag, gestures, `useInView` reveals. |

There were three, and two of them are gone.

`lenis` owned the scroll position for the whole document. It is removed: smooth
scroll and pinned sections are ruled out for this site, and a library that takes
the scroll away from the browser costs real input latency to do something nobody
asked for. Scrolling is native and instant. Objects on the page may respond to
input; the page never fights the scroll.

`aos` was removed before that, and the reasoning is worth keeping because it is
the trap any replacement falls into: a reveal has to play in one direction, and
AOS dropped its class the moment an element crossed back below a trigger line
sitting 140px above the bottom edge, so scrolling up ran those sections
backwards on screen. `once: true` would have fixed it by never replaying at all.
Whatever drives reveals next needs to reveal on arrival, re-arm only below the
fold, and never take back a reveal the reader has already seen.

`Reveal`, the in-repo replacement for AOS, went with the design layer. Its
behaviour is the specification for what comes next, not the code.

Before adding a second system, read
[.claude/skills/web-standard/references/motion-and-scroll.md](.claude/skills/web-standard/references/motion-and-scroll.md).
Before adding motion to a new section, remember that five sections revealing the
same way is itself the templated look.


## Decisions worth not relitigating

Entries below survived the redesign because they are about how the site works,
not about how v1 looked. Anything that was only true of the old design was
deleted with it rather than left here to mislead.

- **One corner, one border width, one shadow.** Not a scale, not a split between
  surfaces and controls. v1 made buttons rounded and cards square and called it
  editorial character; it read as assembled section by section. Components use
  `rounded-token`, `border-token` and `shadow-hard`, never a number.
- **The border colour is the ink itself**, not a grey tint of it. That single
  choice is what makes a page of coloured rectangles read as drawn rather than
  as boxes floating on a background. Softening it undoes the look.
- **The press gesture is defined once**, in the `pressable` utility. Lift a
  pixel toward the light on hover, drop flat on press. Any surface that can be
  pressed reuses it. Three components inventing three hovers is the templated
  look arriving through the back door.
- **`scroll-padding-top: 5rem` on `html`** exists because the masthead is
  sticky. Removing it puts every anchor target under the header.
- **`bg-ink` is never a section, card or button background.** Ink is a text and
  border colour on this site.
- **Card fill is rhythm, not meaning.** Nothing may encode information in which
  colour a card happens to be. A reader cannot learn a code they were never
  shown, and a colour-blind reader could not read it even if they had been.
- **No invented anything.** No numbers, no testimonials, no client names, no
  prices, no response times, no awards, no social links. `tests/links.spec.ts`
  fails a placeholder `#`, which is the correct behaviour. Structured data is
  held to the same rule: an invented `sameAs` or `aggregateRating` is a false
  statement made in a format built to be trusted.
- **One mark, from one definition.** `src/brand.ts` holds the K as stroke
  geometry, because `next/font` serves woff2, which neither the ICO script nor
  Satori can read, so setting the letter as text would give the tab a different
  letterform to the header. **The strokes are currently shaped to match
  Fraunces, which this redesign deleted.** The K needs redrawing against
  Chillax. After editing it run `node scripts/make-favicon.mjs` and commit the
  .ico.
- **A reveal plays downward only.** Revealing on the way in and un-revealing on
  the way out looks symmetrical in code and wrong on screen: scroll up and the
  page animates backwards under the reader, and a section taller than the
  viewport fades out while it is still being read. Reveal on arrival, re-arm
  only once the element is below the fold, ignore the top edge entirely. This is
  why `aos` is gone: it cannot express it.
- **The focus ring is added, never swapped in.** `focus:outline-none` paired
  with a replacement ring is how focus indicators actually go missing: somebody
  suppresses the default meaning to draw their own, and the second half is lost
  in a refactor. `FOCUS_RING` in `src/components/ui/surface.ts` adds an outline
  without removing anything, so there is no half to lose.
  `check-structure.mjs` enforces the pairing if anyone does reach for it.
- **`min-w-0` on the children of any grid holding a scroll row.** It caused two
  separate "the section is cut off" reports in v1, both of which looked like a
  text problem and neither of which was.
- **Mobile steps its own padding and display sizes.** The type scale is fluid
  through `clamp()` so this is mostly handled, but before it was, the landing
  page spent nearly three screens on section padding alone and three headings
  ran to four lines. Check a phone before calling a section done.


## Current state

**Mid-redesign.** The v1 design layer has been removed on `redesign/kalaa-v2`
and the replacement has not been built yet.

What is on the site right now: the page skeleton, the navigation, and scaffold
pages carrying a heading and the section anchors the nav points at. It builds,
it passes lint and the structure checks, and it is not meant to be looked at.

What was deliberately kept, because the design was the problem and this was not:

- `src/routes.ts`, `src/site.ts` and `src/nav.ts`, which single-source the
  sitemap, the canonical and OG tags, and the three navigations.
- The twelve Playwright specs and both CI workflows.
- `src/brand.ts` and the three renderings of the mark that read from it.
- `.claude/skills/web-standard/`.

Direction for v2, settled with the client: light, warm, creative rather than
corporate, results-first. One radius, thick borders, a hard offset shadow as the
only elevation device, a characterful display face, a four-colour palette,
content in cards. English only, so no i18n routing and no hreflang.

Still open, and each one blocks the step it belongs to:

- **The radius value and the typeface**, both decided against the style tile
  rather than in the abstract.
- **Illustration and 3D asset support.** Every reference the client chose gets
  its personality from custom illustration. Without it the imagery becomes real
  client work instead, which changes the hero.
- **The CMS.** Not chosen. Content will live in typed local modules behind
  accessor functions so that swapping in a CMS later is a fetch change, not a
  rewrite. The blog stays a route stub until this is answered: a blog built on
  hardcoded files is either thrown away or leaves the team unable to publish.
- **Hosting.** `deploy.yml` ships to a 3.8GB box shared with nine other
  applications and a MongoDB. Incremental regeneration and image optimisation
  both cost memory there. Moving to Vercel was proposed and not answered.
- **Real copy, real client work, real prices.** Nothing on this site invents a
  number, a testimonial or a client.
- **No social links.** Nothing real was findable on kalaa.io. A placeholder `#`
  fails `tests/links.spec.ts`, which is the correct behaviour.

One warning worth reading before writing any UI: this repository already ships a
389-line `KALAA_DESIGN_RULES.md` banning em dashes, rounded corners,
glassmorphism and particles, and v1 came out generic anyway. Rules kill the
obvious tells. They do not produce art direction. The direction above came from
references the client actually chose, and that is what to build against.
