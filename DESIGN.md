# Kalaa website design

The design system for kalaa.io, as the code builds it. Every value here is read
from `src/styles/tokens.css`, `src/styles/theme.css`, `src/styles/utilities.css`
and `src/styles/base.css`, which are the source of truth. If this file and the
stylesheets ever disagree, the stylesheets win and this file is wrong.

Stack: Next.js 16 (App Router), Tailwind 4, `motion`. Light theme only. Frontend
only: every page is prerendered and nothing posts anywhere.

## The brief and the feel

Kalaa is a social media marketing agency. The site sells posts, reels, Meta
ads, websites and software to businesses that need marketing. The named sectors
are architects, interior design, restaurants, food, machinery, industry, and
import and export, and those may be stated in copy.

What the site must feel like:

- **Made by a creative team.** Creative, not corporate. Paper, tape, handwriting
  and real work lying on a desk, not panels and gradients.
- **Instantly clear.** A visitor knows what Kalaa does from the first screen.
- **Results first.** Leads, revenue and enquiries lead the argument. Deliverables
  support it.
- **Approachable.** Light ground, soft corners, one friendly hand-written phrase
  per heading.

The pieces that make a Kalaa page recognisable in a screenshot:

- The **sage frame** round the whole application, masthead included.
- The **sheet** printed on it: a barely sage-tinted off-white, not pure white.
- **Paper devices**: cards mounted on torn sheets, masking tape, cut-out artwork
  arriving from the edges and settling at a tilt.
- **Satoshi at 900** for page headings, with one phrase set in the hand.
- **Black buttons**, the logo's own colour, with the arrow badge.
- **Real client work at real aspect ratios** as the artwork.

### The two references, and the limit on each

- **CoreInsight** (a Behance concept) gives structure only: an outcome-led
  headline as the largest thing on screen, a row of cards overlapping the bottom
  edge of the hero band, and a dark label bar across the foot of a work card.
  Nothing of its surface: not its violet gradient, stock photography, pill on
  every card, `01` counters, graph-paper band or invented numbers. No page
  currently uses the overlapping card row.
- **surya.website** gives one device: artifacts arriving from every edge and
  settling into place. Not its cream ground, desk metaphor, notepad, polaroids,
  sticky note or serif.
- **Hive Studio** is rejected.
- Never say a device came from a reference unless the reference actually has it.

## Colour

Kalaa's logo is black and white, and the palette is built around that. A dark
saturated brand colour would compete with the mark, so:

- The loud colour (`--accent`, butter) is **light** and it is a **field**: a
  marker behind a word, a chip, a small panel. Never a button, never a hairline.
- **Buttons are black** (`--action`), the logo's own black.
- `--accent` and `--action` are separate tokens on purpose, so nobody merges
  them by accident.

Every colour is a custom property in `src/styles/tokens.css`, exposed to Tailwind
as `bg-*`, `text-*` and `border-*` names in `src/styles/theme.css`. A component
names the token, never a hex value.

### Every colour token

| Token | Value | Role | Use it for | Never |
| --- | --- | --- | --- | --- |
| `--page` | `#7fa99b` | The sage frame | The document background, the frame ring, the footer's torn band, the process line. Also the `themeColor` literal in `src/app/layout.tsx`, which a browser reads before CSS loads | Behind `--ink-muted` text |
| `--sheet` | `#f4f7f5` | The sheet the site is printed on | The page ground, the masthead, the phone menu panel | Pure white does not replace it: white beside sage reads as a hole in the page |
| `--surface` | `#ffffff` | Cards | Cards, image frames, badges, the FAQ band, discs under ticks on tinted bands | |
| `--frame-inner` | `#bfccc7` | The frame's second line | The pale line between the sage ring and the sheet | |
| `--ink` | `#14131a` | Headings | Headings, high-emphasis text, the process step label plate | A section or card background |
| `--ink-body` | `#33313d` | Body | Paragraphs and list text | |
| `--ink-muted` | `#56545f` | Secondary | Captions, meta, inactive links | **On the sage (`--page`).** It fails there |
| `--ink-sage` | `#4e6f62` | Sage dark enough to be type | `HandAccent` phrases, glyphs in contact rows, brush strokes, the active contents marker | |
| `--line` | `#e6e4ee` | Hairline dividers | `border-line` on dividers and the rare outlined control | Heavy outlines. There are none in this system |
| `--accent` | `#ffd84d` | The loud colour, a field | The hero marker behind "Revenue", the hero stage tabs, the pricing "Save" chip, star ratings, the focus ring | A button, a hairline, text |
| `--on-accent` | `#14131a` | Text on `--accent` | Anything set on butter | |
| `--action` | `#14131a` | Buttons | Every button fill | |
| `--action-hover` | `#2f2d38` | Buttons, hovered | `hover:bg-action-hover` | |
| `--on-action` | `#ffffff` | Text on `--action` | Button labels | |
| `--tint-butter` | `#fff2c2` | Card tint | Card fills, the featured blog card, the article ask card, a service band | Encoding meaning |
| `--tint-peach` | `#ffe2d0` | Card tint | Card fills, a service band, footer tape | Encoding meaning |
| `--tint-sage` | `#dcebe5` | Card tint and band | Hero band and most home bands, card fills, discs | Encoding meaning |
| `--tint-cloud` | `#f1f0f4` | Card tint and band | Services and Process bands, card fills, image placeholders | Encoding meaning |
| `--tint-mist` | `#eff1ec` | The impact band | The Impact section only. An exact value the client gave | Other uses |
| `--tint-violet` | `#eee8ff` | Card tint and band | Capabilities band, card fills, footer tape | Encoding meaning |
| `--mark-violet` | `#a89ad6` | The same violet, dark enough to draw a mark | The tick marks in the closing sheet's corner | Text or a fill |
| `--tint-sky` | `#e3edfa` | Card tint and band | About band, blog feed and article body bands | Encoding meaning |
| `--board` | `#f3f0e9` | The only warm neutral | The footer, the opening band of services, contact, blog and article pages, the closing sheet, resting topic chips | |
| `--tape` | `#d9cdb4` | Masking tape (kraft) | The closing sheet's tape strip, topic tapes on blog cards | |
| `--mat-sage` | `#a3c0bd` | Opaque sage mat | The torn sheet behind cards on non-sage bands | Translucency of any kind |
| `--mat-kraft` | `#c6b8a0` | Opaque kraft mat | The torn sheet behind tinted cards and on sage bands | Translucency of any kind |
| `--plan-sage` | `#a5b395` | Plan strip colour | The marker stroke under the sage plan's price | |
| `--plan-butter` | `#f2d792` | Plan strip colour | The marker stroke under the butter plan's price | |
| `--plan-peach` | `#fbc4ad` | Plan strip colour | The marker stroke under the peach plan's price | |
| `--whatsapp` | `#25d366` | WhatsApp's published green | The WhatsApp dock only | Any other button |
| `--on-whatsapp` | `#ffffff` | The mark on the green | The WhatsApp dock only | |

Notes on the table:

- **Card fill is rhythm, not meaning.** Nothing may encode information in which
  colour a card happens to be. A reader cannot learn a code they were never
  shown, and a colour-blind reader could not read it anyway.
- **The mats are opaque on purpose.** `--mat-sage` is the page sage resolved
  against the bands it sits on, so an overlapping card never shows through the
  sheet in front of it.
- **The plan colours are sampled** off the supplied impact artwork in
  `public/impact/`, whose colours are baked in. `scripts/plan-sheets.mjs` grades
  the photographed strips onto them. Change one and re-grade the other.
- **The one non-black button** is the WhatsApp dock, at the client's ask: in
  black it read as a dark dot the eye skipped, and the green is recognised
  before it is read. `--action` stays black everywhere else.
- The only colour literals in code are where CSS cannot reach: `themeColor` in
  `src/app/layout.tsx`, and the share card and touch icon in
  `src/app/opengraph-image.tsx` and `src/app/apple-icon.tsx`, which are rendered
  by Satori and cannot read custom properties.

### Measured contrast

These figures were measured against white, which is `--surface` (every card).
The sheet is a shade darker than white, so each figure is slightly lower on the
sheet itself; ink, body and muted all stay comfortably readable there.

| Pair | Ratio |
| --- | --- |
| Ink on white | 18.5:1 |
| Body on white | 12.8:1 |
| Muted on white | 7.4:1 |
| Ink on butter (`--accent`) | 13.3:1 |
| Body on butter | 9.2:1 |
| Muted on butter | 5.4:1 |
| White on the action black | 18.5:1 |
| Ink on sage (`--page`) | 7.1:1 |
| Body on sage | 4.9:1 |
| **Muted on sage** | **2.9:1, fails** |
| Butter against white | 1.38:1 |

- **Muted on sage fails.** It is the one combination in the palette that looks
  fine and is not readable. Never set `text-ink-muted` on `bg-page`. This is why
  the footer sits on `--board` rather than on the frame.
- **Butter against white is a hue difference, not a luminance one.** Fine for a
  field, useless for a hairline or an outline.

### How full butter is spent

Full-strength `--accent` appears only as small fields: the marker behind
"Revenue" in the hero headline, the stage tabs on the hero artifacts, the "Save"
chip on a pricing card (only when the chosen term actually saves), the stars,
and the focus ring. No band on the site is full `--accent`. A butter band on
every section is a yellow website; a full butter hero was tested and rejected
because light cards vanish into it.

`--tint-butter` is a different thing: one pale tint in the card and band
rotation.

### Bands, section by section

Each section is one full-width band. Neighbouring bands meet on a straight line.

| Page | Section | Band |
| --- | --- | --- |
| `/` | Hero | `bg-tint-sage` |
| `/` | About | `bg-tint-sky` |
| `/` | Services | `bg-tint-cloud` |
| `/` | Testimonials | `bg-tint-sage` |
| `/` | Client logos | `bg-tint-sage` |
| `/` | Capabilities | `bg-tint-violet` |
| `/` | Work | `bg-tint-sage` |
| `/` | Process | `bg-tint-cloud` |
| `/` | Impact | `bg-tint-mist` |
| `/` | Pricing | `bg-tint-sage` |
| `/` | FAQ | `bg-surface` |
| all but contact | Closing call to action | `bg-tint-sage`, with a `--board` sheet on it |
| `/services` | Opening | `bg-board` |
| `/services` | One band per service | sage, butter, peach, violet, sky, cloud, in turn |
| `/contact` | Opening | `bg-board` |
| `/contact` | Ways in, Studio | no fill (the sheet) |
| `/contact` | Brief | `bg-tint-sage` |
| `/blog` | Opening | `bg-board` |
| `/blog` | Feed | `bg-tint-sky` |
| `/blog/[slug]` | Opening, More articles | `bg-board` |
| `/blog/[slug]` | Article body | `bg-tint-sky` |
| every page | Footer | `bg-board` |

The rule behind the choice: a mat or card must not match the band it sits on.
Sage paper on a sage band is a card that has lost its edge, which is why contact
puts its sage band on Brief rather than on Studio, whose map is mounted on sage
paper.

## Typography

### Families

| Role | Face | Weights shipped | Loaded by | Tailwind |
| --- | --- | --- | --- | --- |
| Display | Satoshi | 500, 700, 900 | `next/font/local`, `src/fonts/satoshi-*.woff2` | `font-display` |
| Text | Switzer | 400, 500, 600, 700 | `next/font/local`, `src/fonts/switzer-*.woff2` | `font-sans` (the body default) |
| The hand | Kalam | 400, 700 | `next/font/google` | `font-hand` |

- Satoshi and Switzer are from Fontshare (Indian Type Foundry) under the ITF Free
  Font Licence, self-hosted, Latin only because the site is English only. The
  loader is `src/fonts/fonts.ts`; the three variables are set once on `<html>` in
  `src/app/layout.tsx`.
- Two families carry the site. Kalam is a third face used only as an accent on a
  phrase, never for a heading or a paragraph.
- **Satoshi has no 600.** `font-semibold` on `font-display` silently renders the
  wrong cut. Use `font-bold` (700) or `font-black` (900). Switzer does ship 600,
  so `font-semibold` is fine on text.
- No component names a typeface. Components ask for the role (`font-display`,
  `font-sans`, `font-hand`) and `theme.css` maps it.
- **The font files are repaired.** Fontshare ships Satoshi and Switzer with
  glyph bounding boxes that do not match their outlines, and Firefox printed one
  console warning per glyph per face on every load. Every glyph's bounds were
  recalculated with fontTools (`glyf[name].recalcBounds(glyf)`, then `head`
  updated to the new extremes) and saved back as woff2. The outlines are
  untouched. Re-download a face and the warnings come back: run the repair again.
- To fetch a weight, ask Fontshare's CSS API for the woff2 address
  (`https://api.fontshare.com/v2/css?f[]=satoshi@900`), save the file as
  `<family>-<weight>.woff2` in `src/fonts/`, repair it, and add it to
  `src/fonts/fonts.ts`.
- **Banned:** Inter, Poppins, Montserrat, DM Sans. Chillax and Clash Display were
  tried in the display slot and deleted from the repo. Do not add a third
  display face.

### The scale

Declared in `src/styles/theme.css` as Tailwind `--text-*` tokens. Pixel figures
assume the default 16px root.

| Utility | Size | Line height | Tracking | Used for |
| --- | --- | --- | --- | --- |
| `text-display-xl` | `clamp(2.25rem, 4.6vw, 4rem)` | 1.26 | -0.02em | Page `h1`, at `font-black` |
| `text-display-l` | `clamp(1.75rem, 3.2vw, 2.5rem)` | 1.15 | -0.018em | Every `h2`, at `font-bold` |
| `text-display-m` | `clamp(1.25rem, 1.9vw, 1.5rem)` | 1.25 | -0.012em | `h3`, card titles, FAQ questions, stat figures |
| `text-lead` | `1.1875rem` (19px) | 1.6 | | The sentence under a heading |
| `text-body` | `1.0625rem` (17px) | 1.65 | | Body copy, set on `<body>` |
| `text-small` | `0.9375rem` (15px) | 1.55 | | Meta, button labels on phones, captions |
| `text-label` | `0.8125rem` (13px) | 1.2 | 0.08em | The smallest step: tape labels, stat captions |

- **The hero headline** has its own size in `utilities.css` (`.hero-headline`):
  `clamp(1.4375rem, 7.4vw, 3.75rem)` while the hero is stacked, and
  `clamp(2.5rem, 4.3vw, 3.75rem)` from `64rem` where it sits in two columns. Each
  of its three sentences is held on one line with `whitespace-nowrap`.
- **Hierarchy is fixed.** The `h1` is the only thing set at `display-xl` and 900.
  Every `h2` is `display-l` at 700, through `SectionHeading` or the same classes.
  `h3` is `display-m` at 700. Exactly one `h1` per page, no skipped levels.
- **Prices** are Satoshi at `font-black`, `text-[2rem]` stepping to `2.5rem` at
  `sm`, with a `MarkerUnderline` beneath.

### The hand

`HandAccent` sets one phrase inside a heading in Kalam at `1.18em`, `font-bold`,
`leading-[0.9]`, in `--ink-sage` (or `--on-accent` on butter).

- One accent per heading, on the payoff phrase ("real growth.", "in the feed",
  "grow your business").
- Never on a price, a plan name or anything a reader must read as literal.
- Pass `wrap` when the phrase runs past about two words, or it will not break.
- The hero's "Revenue" is the one place the hand and the butter marker meet.
- Outside headings, the hand is used for a few short written lines at
  `1.3rem` to `1.45rem`: the Impact line, the three promises on the closing
  sheet, "Different ways. Same open conversation." on contact, "Find us here.",
  "Read by topic", the editor's sign-off and the line under an article's title.

### Floors and phones

- **No text below 12px.** The smallest token, `text-label`, is 13px.
- **No form control below `1rem`**, or iOS zooms the page when it takes focus.
  The billing radios and the reel seek bar carry `text-base` for that reason;
  otherwise they inherit their label's smaller size.
- **Display type steps down on a phone** through `clamp()`. Test by line count:
  no heading may wrap past four lines at 375px. Read the rendered `font-size`
  and divide the height by the line height rather than guessing.
- **Body text and below never shrinks on a phone.** The one deliberate exception
  is the base `ArrowButton` label, `text-small` on a phone and `text-body` from
  `sm`, so the label never wraps.
- British spelling ("specialise", "recognise").

## Shape

### One corner

`--radius` is `0.625rem` (10px), applied with `rounded-token`. Buttons, cards,
chips, images, panels, tabs and the sheet itself carry it. There is no scale and
no split between surfaces and controls: a clickable card is still a card.

Every other corner on the site is **arithmetic on that one token**, never a
second value:

| Name | Value | Where |
| --- | --- | --- |
| `rounded-frame-line` | `--radius + --frame-line` | The pale frame line |
| `rounded-frame` | `--radius + --frame-line + --ring` | The sage ring |
| `rounded-badge` | `--radius * 0.8` | The arrow badge in `ArrowButton`, the testimonial arrows |
| `rounded-token-outset-1` | `--radius + 0.25rem` | The billing toggle's track, which holds its labels at 0.25rem |
| `process-node-number` | `max(0px, --radius - 0.5rem)` | The number square on a process label (2px) |
| `process-detail` | `max(0px, --radius - 1rem)` | The panel inside a process card (square) |

The frame's corners come out at 10 / 16 / 24px on a phone and 10 / 18 / 30px
from `48rem` (sheet / line / ring).

**The badge is deliberately not concentric.** Concentricity is for a band read as
a frame; a badge is an object sitting on a field. The same 10px on a 40px badge
and a 52px shell measures equal and reads rounder on the smaller box, so the
badge takes the ratio the two boxes are in.

**Circles** (`rounded-full`) are reserved for icon-only marks: discs behind
glyphs (about pillars, plan marks, check marks, contact channels), the reel and
testimonial play controls, the footer's social marks and the WhatsApp dock.
Anything carrying words, and every surface, takes the token corner.

### Concentric corners

A rounded box inside a rounded box obeys **outer radius = inner radius +
padding**. Give two nested boxes the same corner and the band between them is
the padding down the straight edges and 1.41 times the padding round the curve,
because the two arcs are the same size with their centres a diagonal apart. It
reads as sloppy without anyone being able to say why.

- Wrapping a `--radius` child: add the padding (`rounded-token-outset-1`).
- Inside a `--radius` box: subtract the padding, floored at zero with
  `max(0px, calc(var(--radius) - <padding>))`. When the padding is larger than
  the radius the inner box is square, which is correct rather than a defect.
- The rule is applied to nested panels, badges, the toggle track and the frame.
  Pictures inset in a padded card (blog cards, the featured article, capability
  cards) keep `rounded-token`.

### Border

- `--border-w` is `1px`, applied with `border-token`, `border-t-token`,
  `border-b-token` and `border-l-token`, in `border-line`.
- Hairlines only, and rarely: dividers, the topic chips, the light `ArrowButton`.
  Hierarchy comes from depth, spacing and type, not outlines.
- Two deliberate exceptions: the FAQ plus mark's bars are `2px` (a rendering fix
  so the cross stays crisp), and the active entry in an article's contents list
  has a `border-l-2` marker.

### Shadow

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-soft` (`shadow-soft`) | `0 8px 24px -10px rgb(20 19 26 / 0.16)` | Resting cards, images, chips. Part of `SURFACE` |
| `--shadow-lift` (`shadow-lift`) | `0 18px 44px -16px rgb(20 19 26 / 0.24)` | Hover, the featured pricing card, the playing reel, process cards |
| `--shadow-hover` (`shadow-hover`) | `0 3px 8px -2px rgb(20 19 26 / 0.18)` | The plate under a hovered text link |
| `--shadow-hover-drop` | `0 3px 6px rgb(20 19 26 / 0.18)` | The same lift as a `drop-shadow` filter, for the torn tape plate |

- `.artifact-shadow` is a two-layer `drop-shadow` filter for the hero's cut-out
  artwork only. The about set has its shadows baked into the alpha and must not
  get a second one.
- A mask clips a box shadow off with everything else, so a torn mat never has a
  shadow. Its depth is the mat itself.
- The WhatsApp dock carries `--shadow-lift` plus a 3px ring in `--sheet`. The
  ring is an edge, not depth: it cuts the green disc out against the footer's
  dark, green artwork.
- No text shadows, no glow.

### Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ease-brand` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Every state change: hovers, tints, the FAQ |
| `--ease-travel` | `cubic-bezier(0.45, 0, 0.2, 1)` | Something travelling or turning: the arrow swipe, the dock's turn, the dock's arrival |
| `--dur-base` | `200ms` | The default. `transition-token` is this plus `--ease-brand` |
| `--dur-slow` | `420ms` | The arrow swipe, the dock's arrival |
| `--dur-turn` | `900ms` | A whole rotation, and `transition-token-reveal` (a hover that reveals a whole panel) |

The shared hovers are utilities, so no component invents its own:

- `service-reference-card`: up `0.25rem` with `--shadow-lift`.
- `arrow-swipe` (on the `ArrowButton` badge): the arrow leaves right and a second
  one enters from the left, over `--dur-slow` on `--ease-travel`.
- `HOVER_PLATE` in `surface.ts`: a 7% ink plate and `shadow-hover` behind a text
  link. `HOVER_TAPE`: the same job as a torn, tilted strip of tape (see the paper
  devices).

## Layout

### The frame, the ring and the sheet

The whole application sits inside a frame of nested boxes, built in
`src/app/layout.tsx` and `src/components/layout/PageFrame.tsx`:

| Layer | Element | Padding token | Phone | From `48rem` | Corner | Fill |
| --- | --- | --- | --- | --- | --- | --- |
| Page margin | `<body>` (`frame-inset`) | `--frame` | `0` | `0.5rem` | none | `--page` |
| Sage ring | `PageFrame` outer (`ring-inset-token`) | `--ring` | `0.5rem` | `0.75rem` | `rounded-frame` | `--page` |
| Frame line | `PageFrame` middle (`frame-line-inset`) | `--frame-line` | `0.375rem` | `0.5rem` | `rounded-frame-line` | `--frame-inner` |
| Sheet | `PageFrame` inner | | | | `rounded-token` | `--sheet` |

The masthead, `<main>`, the footer and the WhatsApp dock all live inside the
sheet. The sage is on the document itself, so it also paints the overscroll
area, and `overscroll-behavior: none` stops the rubber band at either end.

- **The masthead is inside the frame.** `SiteHeader` is `sticky` and rests at
  `sticky-below-frame` (`--frame + --ring + --frame-line`), with a
  `rounded-t-token` sheet-coloured top and a declared height of `--masthead`
  (`4rem`, `4.5rem` from `48rem`).
- **The frame above the masthead is redrawn, not covered.** Once the page
  scrolls, viewport row zero is showing the middle of the sheet, so fixed layers
  rebuild the frame there: `frame-strip-outer` (the page margin) and `frame-cap`
  holding `frame-cap-line` and `frame-cap-sheet`, each carrying its own corner.
  The outer cap is square on purpose: it draws sage on sage, and rounding it only
  cuts a bite out that exposes the sheet scrolling underneath. Check any change
  by screenshotting the corner at 4x zoom at rest and scrolled; the two should
  match to the pixel.
- **Never give `PageFrame` or any ancestor of a sticky element
  `overflow-hidden`.** Hidden overflow breaks `position: sticky` silently and it
  reads as a header bug. A section holding a sticky child uses `overflow-x-clip`
  (Capabilities) or no overflow at all (the article body).
- **The sheet has no maximum width.** The margin is the same on every side at any
  screen size. Line length is held by the content container, not by the sheet.

### The content container

`Section` (`src/components/ui/Section.tsx`) is the horizontal rhythm for the
whole site: a full-width `<section>` carrying the band's `fill`, and inside it
`mx-auto w-full max-w-7xl px-5`. One width and one gutter, so a heading in one
band lines up with a heading three bands down. Sections never set their own
width. The masthead and the footer use the same `max-w-7xl px-5`.

Where torn mats reach the page edge, the section passes `px-3 md:px-6` so the
outer sheets are not cut off (the blog feed, the article opening and body, more
articles).

### Section padding

The default is `py-14 sm:py-20 lg:py-24`. The phone step is always set
explicitly and is always smaller: a desktop band's padding is a fifth of a phone
screen spent on nothing. Sections that need less air pass their own, still
stepped:

| Section | Padding |
| --- | --- |
| Default (`Section`) | `py-14 sm:py-20 lg:py-24` |
| Hero | `py-6 sm:py-12 lg:py-16` |
| About | `py-12 sm:py-16 lg:py-14` |
| Services, client logos | `py-12 sm:py-16 lg:py-20` |
| Pricing | `py-12 sm:py-14 lg:py-16` |
| Impact | `py-14 sm:py-20 lg:py-24` |
| Closing call to action | `py-16 sm:py-20 lg:py-24` |
| Page openings (services, contact) | `pb-14 pt-12 lg:pb-20 lg:pt-16` |
| One service band | `py-10 sm:py-12 lg:py-14` |
| Contact brief | `py-10 sm:py-12 lg:py-14` |

Two sections are sized to the screen:

- `hero-screen`: `min-height: calc(100svh - var(--frame) - var(--ring) - var(--masthead))`,
  so the hero fills the first screen.
- `footer-screen`: `min-height: calc(100svh - var(--masthead) - 2 * (var(--frame) + var(--ring) + var(--frame-line)))`.

`html` carries `scroll-padding-top: 6rem` because the masthead is sticky, and
article headings carry `scroll-mt-28`. Without them every anchor target lands
under the bar.

### Breakpoints

Tailwind's defaults are used unchanged: `sm` 40rem (640px), `md` 48rem (768px),
`lg` 64rem (1024px), `xl` 80rem (1280px). The odd values exist because a
composition was measured and starts where it fits, not at a round number:

| Value | What changes there | Why |
| --- | --- | --- |
| `40rem` | The about board swaps its phone arrangement for the wide one (`.about-piece`) | Below it the board is too narrow for ten pieces |
| `48rem` | Frame tokens grow; the WhatsApp dock appears; the work wall goes from four columns to eight (`useBelowMd` reads `47.999rem`) | Where the site stops being a phone |
| `56.25rem` (900px) | Pricing goes three across and the row's single billing toggle replaces the per-card ones | The torn strip's copy clearance: at 768 nine pieces of text ran under the tear, at 854 two, at 900 none |
| `59.999rem` | Service cards travel and time their entrance for a column rather than a row (`useNarrowViewport`) | Below it the rows are columns |
| `64rem` | The hero's two-column headline size; footer artwork placement; three article cards across | |
| `70rem` | The process row becomes the staircase | Five cards need the width. The number lives in two places, `ProcessPath.tsx` and the `@media` in `utilities.css`; change both or the row renders flat |
| `80rem` (`xl`) | About goes two columns; `ProofPeek` appears; the article ask becomes a third sticky column | |
| `1280px`, `1400px` | The about board bleeds past the container | `min-[1280px]` and `min-[1400px]` in `About.tsx` |
| `87.5rem` | One footer object is drawn again | Between `64rem` and `87.5rem` the contact column's button reaches the footer's right edge and the object has nowhere to be |

### Composition rules

- **Centring is for short things in sets.** `SectionHeading` is centred over a
  block that is symmetric and runs the full width (the service showcase, the
  client rows, the capability deck, the work wall, the process row) and
  start-aligned over a left-anchored block. A start-aligned heading is still
  centred below `md`.
- **Copy columns** are centred while stacked and ranged left once they sit beside
  artwork (`lg` or `xl`). Multi-line copy inside a card is always left-aligned.
- **No heading block with an empty row beside it.** A heading at `max-w-*` with
  the rest of the row empty and nothing heavy below reads as a failed load. Put
  something opposite it (contact's heading faces a handwritten line) or centre it
  over a symmetric block.
- **Vary the shape of neighbouring sections.** Never run eyebrow, centred
  heading, lead and a grid of equal cards twice in a row.
- **`min-w-0` on every grid or flex child** that holds a scrolling row, a
  marquee or wide media, up to the ancestor allowed to constrain it. Without it
  the column takes the width of its content and the page looks sliced down its
  right side.
- **A phone shows one whole card, not a card and a sliver.**
- Check every section at 375, 768 and 1440px, plus any odd breakpoint it uses.

## The paper devices

The site is paper on a desk. These are the devices that say so, and the rules
that keep each one working. Every rule here came from a bug that shipped.

### The torn mat

A card is the site's ordinary surface: one corner, one soft shadow. The sheet
**behind** it is torn, and that sheet is a stencil cut from a photograph of real
deckled paper.

- `node scripts/frames.mjs` reads `assets/frames/frame-card.png` (white paper on
  black) into an alpha channel and cuts three stencils into `public/frames/`.
- The stencils are applied as `mask-image`, so the colour is still a token
  painted behind the mask and one photograph serves every colour.

| Class | Stencil | Size cut | For |
| --- | --- | --- | --- |
| `.paper-mat` | `frame-card.png` | 784 x 1020 | Card-proportioned boxes: blog cards, process cards, review slips, the testimonial stage, service pictures, the article ask, `ProofPeek` |
| `.paper-mat-wide` | `frame-wide.png` | 1742 x 760 | Boxes far wider than tall: the featured article, the capability cards |
| `.paper-mat-hero` | `frame-hero.png` | 1200 x 800 | A 3:2 article cover |

How a mat is built: a wrapper `div.relative`, an `aria-hidden` mat
`absolute -inset-*` with `bg-mat-sage` or `bg-mat-kraft`, then the card on top.
Overhangs in use:

| Where | Overhang |
| --- | --- |
| Blog cards, featured article, article ask, article cover, capability cards | `-inset-3` (12px), `md:-inset-6` (24px) |
| Process cards | `-inset-4` (16px) |
| Service pictures | `-inset-4`, `sm:-inset-6` |
| Review slips | `-inset-3`, `sm:-inset-4` |
| `ProofPeek` | `-inset-3` |
| Testimonial stage | `-inset-5`, `sm:-inset-7` (28px) |

The rules:

- **The mat is opaque.** Only `--mat-sage` and `--mat-kraft`, never an opacity
  modifier. A translucent sheet turns into a window the moment two cards overlap,
  which is exactly what the capability deck does.
- **A gap beside a torn sheet is the gap you want plus the overhang on both
  sides.** The process row's `gap: 3.25rem` is 1.25rem wanted plus 1rem overhang
  twice; its stacked version uses `gap-12`; the capability list uses `gap-16`
  and `px-6`; the blog grid uses `md:gap-16`. Less and the sheets collide, and an
  opaque mat then cuts the neighbour's edge off.
- **Section padding clears the mat too**, or the band clips it.
- **Never tear a section boundary.** Bands meet on a straight line.
- **`PAPER = 1.8` in `scripts/frames.mjs` holds the sheets together.** Every
  stencil is cut from the photograph at that scale, so a small card and a wide
  piece show the same tear at the same size. Never stretch one stencil onto a
  box of a different proportion; cut a new one.
- **Choose the mat against what it sits on and what sits on it.** Kraft under
  tinted cards (process) and on sage bands (the testimonial stage alternates
  sage and kraft by client; review slips alternate by position). Sage on sky and
  cloud bands (blog cards, the article cover and ask, service pictures). The
  featured article is kraft and the grid below it sage, so the two rows are never
  the same sheet.
- **Sage on a sage band depends on width to be seen.** At 16px it reads as a
  hairline; the testimonial sheet stands 28px out for that reason.
- **The card in front keeps the token corner.** Only the sheet behind is torn.

### Photographed edges

Where a single torn edge is wanted rather than a whole sheet, the edge is a
photograph, cut and graded by `node scripts/plan-sheets.mjs` from the sources in
`assets/frames/plans/` and written into `src/media/`:

- **The plan strips** (`src/media/plan-strips/strip-{sage,butter,peach}.webp`)
  lie over the right edge of each white pricing card. The strip's width follows
  its height (`aspect-[98/1410] w-auto max-w-[18%]`), so the tear is never
  magnified or cropped. The copy clears it with `pr-[20%]`, written with `pl` and
  `py` and never the `p` shorthand, because a variant `p-*` is emitted after the
  unprefixed `pr` and wins. `object-cover object-left`, never `fill`, which turns
  the tear into a zigzag. The strip carries the card's corner on its right
  (`rounded-r-token`).
- **The closing sheet's bottom edge** is `strip-edge-sage.webp`, laid along the
  foot of the `--board` sheet, which keeps `pb-24` of clearance for it.
- **The sheet under the contact map** is `src/media/paper/sheet-sage.webp`,
  turned `-1deg`.
- These are **imported as modules, never served from `public/`**, so the
  bundler puts a content hash in the URL and a regraded strip is a new address.
- The script un-premultiplies against black; skipping that leaves a dark fringe
  round the tear that reads as a shadow.

### Tape

- **Colour:** `--tape`, a kraft darker than `--board` so a strip reads on every
  paper on the site. Used at `bg-tape/85` and `bg-tape/90`.
- **Shapes:** `.tape-1`, `.tape-2` and `.tape-3` are torn polygons, each with a
  small built-in turn (`-1.3deg`, `0.9deg`, `-0.7deg`), so no two strips on
  screen are cut the same.
- **Where:** the footer's column headings (on `--tint-sage`, `--tint-violet` and
  `--tint-peach` tape), the topic on every blog card (half on the picture, half
  on the paper), and one plain strip holding the closing sheet at `-28deg`.
- **`tape-hover`** is the hover plate for masthead and footer links: a torn
  `::before` at 7% ink that fades in and tilts `-2.2deg`. Inside a `tape-column`,
  every second link tilts the other way. Only the paper tilts; the words stay
  level. Its lift is `drop-shadow`, because a clip path cuts a box shadow off.

### Tilts

- **The tilt lives on its own inner element**, never on the positioned wrapper,
  so a label on the artwork stays level while the paper leans, and the arrival's
  transform and the tilt never fight.
- Resting tilts are small: hero artifacts `-2` to `-5deg`, review slips
  `1.5deg` either way, capability cards `3.2deg` either way. Pieces arrive from a
  steeper angle than they settle at.

### Cut-out artwork on a board

The surya.website device: separate objects arriving from the edge nearest where
each one lands, then settling at a tilt. Used by the hero (`HeroArtifacts`), the
about board (`AboutArtifacts`), the openings of services, contact and blog and
the contact brief (all through `ArtifactStage`), the impact cards
(`ImpactArtifacts`) and the footer (`FooterArtifacts`).

- Pieces are **positioned by percentage inside a fixed-ratio box**, so one set of
  coordinates serves every width. Coordinates live in `src/content/*Artifacts.ts`.
- A **separate phone arrangement** where the board would shrink the pieces
  illegibly: passed as `--piece-phone-*` custom properties, chosen by
  `.about-piece` or `.footer-piece`, with `-wide-only` classes for pieces a phone
  leaves out entirely rather than drawing smaller.
- **`sizes` is computed per piece**, never one value for the box, or the
  optimiser serves a small file into a large slot.
- **One trigger per board**, not one per piece.
- `artifact-shadow` on the hero cutouts only.
- The hero artifacts carry a butter stage tab ("01 Ideate" to "04 Publish") that
  straddles the sheet's edge. Their layout lives in `src/content/placeholder.ts`.

### Drawn marks

- **The butter marker** behind "Revenue" in the hero headline: `bg-accent
  rounded-token`, the hand inside it. Used once.
- **`MarkerUnderline`** under each plan price, in that plan's `--plan-*` colour.
- **The brush stroke**, one tapered path used under a hand-written line
  (contact opening, contact ways, closing sheet), in `--ink-sage`.
- **Hand-drawn arrows**, open-headed and drawn with the same stroke as their
  line: from the Impact copy into the results, curling into the closing heading,
  and to the contact map.
- **The process staircase.** Five tinted cards, each with a folded top-right
  corner (the card's own tint, a step darker), a label plate resting on the
  card's top edge (`process-node`: an ink plate with a white number square), and
  a connecting line in `--page` drawn above the row. The line is measured from
  the labels' laid-out positions, never predicted, and never crosses a card.
- **The footer desk.** Two torn bands of sage across the foot of the footer
  (drawn with SVG clip paths), four objects lying across the tear, and tape
  headings over each column.

## Imagery and media

Kalaa's product is imagery, so the work is the artwork. There is no commissioned
3D or illustration, and no layout may depend on a character or a scene.

### What goes on the page

- **Real client work at its real aspect ratio.** Posts at 4:5, reels at 9:16,
  blog covers at 3:2. The work wall's cells are 4:5 and a reel spans two columns
  and a band's full height, close enough to 9:16 that `object-cover` only shaves
  the sides.
- **The team's own photographs.** The four capability cards carry them.
- **Client logos**, each on a white tile.
- **Supplied cut-out artwork** for the boards (hero, about, footer, page
  openings, impact cards).
- **Never stock photography of strangers.** On an agency's own site it is worse
  than an honest gap.
- **Testimonial clips** are 720 x 1280, shown in a 3:4 frame with the crop taken
  off the foot (`object-top`), so no face or banner is ever cut.
- **Blog covers have the article's title printed inside them.** Every box that
  holds one is 3:2 so nothing is cropped.

### Placeholders

Allowed while real assets are gathered, and only because the client asked:

- Everything not real yet lives behind `src/content/placeholder.ts` (today, the
  hero composition and its stage labels), so "what is not real" is one file.
- Placeholder images are generated locally into `public/placeholder/` at the real
  aspect ratio. Never downloaded stock.
- A placeholder never names a business, quotes a person or states a price.
- **No placeholder ever reaches JSON-LD.** No invented `sameAs`,
  `aggregateRating` or `priceRange`.

### Where sources live and how they become web files

Client sources go in `assets/`, which is gitignored: anything under `public/` is
served whether or not a page links to it, so multi-megabyte sources never go
there. The pipeline scripts in `scripts/` are local-only files (also gitignored)
and are run directly with `node scripts/<name>.mjs`. There is no npm script for
any of them, whatever a comment in a generated file says. Their outputs, in
`public/`, `src/media/` and the generated `src/content/*Media.ts` modules, are
committed, so the site builds from a clone.

| Script | Takes | Writes |
| --- | --- | --- |
| `scripts/artifacts.mjs` | Supplied artwork sets and photographs in `assets/` (landing, about, services, service detail, process photos, impact, footer, contact, blog opening) | Content-hashed WebP in `public/`, plus a manifest module per set (`heroMedia.ts`, `aboutMedia.ts`, `cardMedia.ts` and so on) |
| `scripts/media.mjs` | Posts, reels, blog covers, testimonial videos and avatars in `assets/` | `public/work/`, `public/blog/`, `public/testimonials/`, and `workMedia.ts`, `blogMedia.ts`, `testimonialMedia.ts` |
| `scripts/frames.mjs` | The paper photograph in `assets/frames/` | The three mat stencils in `public/frames/` |
| `scripts/plan-sheets.mjs` | The strip photographs in `assets/frames/plans/` | `src/media/plan-strips/` and `src/media/paper/` |
| `scripts/whatsapp.mjs` | Client WhatsApp screenshots | Redacted crops in `src/media/whatsapp/`, including a tighter `-peek` cut for `ProofPeek` |

What `scripts/artifacts.mjs` does to every file, and why:

- **Content hash in the filename** (`c1-d81f15e4.webp`). Next's image optimiser
  caches by URL, and that cache outlives deleting `.next/cache`, restarting the
  server and a hard reload. A name that changes with the bytes cannot collide
  with a stale entry in the optimiser, a browser or a CDN. Earlier builds of the
  same slug are deleted so `public/` never collects orphans.
- **Real pixel dimensions** written into the manifest, so no page guesses an
  aspect ratio and nothing reflows when an image loads.
- **EXIF orientation applied** (`sharp().rotate()`): a camera JPEG can store its
  pixels sideways, and WebP output drops the tag, so without it a portrait ships
  lying on its side.
- **Per-photo `focus`**, a CSS `object-position` stored in the manifest and
  applied on the image. The capability photographs are portrait and the frame
  changes shape with the width, so they ship uncropped and `focus` keeps faces in
  frame at every shape.
- **Background keying** for cut-out sets that arrive opaque (a flood fill from
  the border, so light artwork on a light ground survives). Photograph sets and
  mounted pictures opt out.
- **Quality and long edge per set.** The team photographs are 92 at a 2000px
  long edge because softness in a face shows first.

What `scripts/media.mjs` writes: posts at a 1080px long edge plus a 620px copy;
reels as a poster, a silent five-second loop at 720 x 1280 and 24fps, and the
full reel with sound in `public/work/reels/full/`; blog covers at 1400px plus a
700px copy and a 1200 x 630 share card (`-share.jpg`), the cover whole on a
blurred copy of itself, because every platform draws a link card at that shape
and cropping the 3:2 cover cut the type at its edges. It also sweeps the public folders people drop files into (its `DROP`
list) into `assets/` first.

- `next.config.ts` lists `images.qualities: [75, 90]`. 90 is for the capability
  photographs only. Next 16 serves only a listed quality, so a new one has to be
  added there.
- To check which file is really being served, read `img.currentSrc` and
  `naturalHeight` in the browser. Never probe the optimiser with bare `curl`:
  with no `Accept` header it returns JPEG with the alpha flattened to black.
- An image URL is an address Google has indexed. Never move an image's path or
  domain as a side effect of a redesign.

### Loading

- The opening's artwork loads eagerly (`eager` on `ArtifactStage`, the first
  blog cover with `fetchPriority="high"`).
- Work wall posts are **not** lazy, with `fetchPriority="low"`, so the wall is
  filled by the time a reader reaches it without competing with the first
  screen.
- Blog covers and post tiles are plain `img` elements with a two-width `srcSet`,
  because they are pre-sized to the only widths the page draws them at and the
  optimiser only added delay.
- Board artwork is `unoptimized` with a computed `sizes` per piece.

### Video

- **Nothing downloads until somebody asks.** Testimonial clips use
  `preload="none"` and a poster; the clients either side of the stage are
  posters through `next/image`. A visit to the section makes no video requests
  until play is pressed.
- **A testimonial gets no silent loop.** A person talking is worse muted than
  still.
- **A reel is a poster, then a silent loop** once it is near the screen (loops
  are mounted one at a time, never while the page is scrolling), then on a tap
  the full reel plays in the card with sound and its own controls. One reel with
  sound at a time; an open reel pauses when its card leaves the screen.

### Alt text

- Every meaningful image has alt text from the content layer: `imageAlt` on a
  capability, `alt` on an artifact, a service picture or an article, the client's
  name on a logo.
- Decorative artwork says so: the hero and about boards are `aria-hidden`
  containers with `alt=""` on each piece, mats and strips are `aria-hidden`.
- The duplicate copy inside every marquee is `aria-hidden` with `alt=""`, or a
  screen reader hears every logo and review twice.
- The WhatsApp screenshots are redacted in the pixels, not covered in CSS: every
  phone number is destroyed before the file exists.

### The mark

One mark everywhere. `BrandMark` renders `public/brand/kalaa-logo.webp` (lossless
WebP, from the client's `public/brand/kalaa_logo.avif`) in the masthead and the
footer. The tab icon is `src/app/favicon.ico`; `src/app/apple-icon.tsx` renders
`public/brand/kalaa-mark.png` on black; `src/app/opengraph-image.tsx` renders
`public/brand/kalaa-logo.png` on the sheet colour. Check all of them by eye after
any brand change. Never leave the framework's default favicon.

## Motion

### The stack

- **`motion` is the only animation library.** No `lenis`, no `aos`, no smooth
  scroll library, ever. Scrolling is native.
- `MotionProvider` wraps the app in `MotionConfig reducedMotion="user"`.
- `html { scroll-behavior: smooth }` makes anchor jumps travel. It is native and
  it is the only smoothing the page has.

### Reveals play downward only

`useReplayOnScrollDown` (`src/motion/`) is the reveal hook, and `SlideIn` is the
block built on it:

- A block reveals when it arrives.
- It re-arms only once it has left **below** the fold. Leaving above changes
  nothing, so scrolling up never plays anything backwards under a reader, and a
  block taller than the screen never fades out mid-read.
- The hidden state has `duration: 0`, so resetting is invisible.
- One trigger per group: a board of ten pieces, a row of cards or a two-row band
  of the work wall moves on one watcher, not ten.

The hero is the one exception: `HeroCopy` and `HeroArtifacts` use `whileInView`
with `once: false`, so they reset (instantly) whenever the hero leaves the
screen and play again when a reader returns to the top. Every other section uses
the hook.

- **Thresholds.** Use `amount: "some"` with a bottom margin
  (`0px 0px -80px 0px`) for anything that can be taller than the screen, as
  `SlideIn` and the pricing row do. A fraction is a fraction of the element: a
  quarter of the stacked pricing row was 693px of a 2,772px row, more than was
  ever on screen, and all three cards sat invisible. Fractions (`0.1` to `0.4`)
  are used only on boxes known to be shorter than a screen.
- **Never put the viewport trigger on an element whose own size animates from
  zero.** Trigger on a stable wrapper and drive the child through variants.

### Springs and tweens

Spring constants are written at the top of each component. The board spring,
`{ stiffness: 32, damping: 15, mass: 1.3 }`, is shared by `ArtifactStage`, the
about board, the impact cards and the closing sheet; reuse it for a new board
rather than inventing another. The hero's pieces are quicker
(`stiffness: 58`) because they play on load, where a long arrival is a wait.
`SlideIn` uses `{ stiffness: 34, damping: 16, mass: 1.1 }` and 44px of travel;
rows of the work and blog grids use 96px.

### Each section moves its own way

Five sections revealing identically is itself a template tell, so each has its
own entrance:

| Section | Movement |
| --- | --- |
| Hero | Copy slides in from the left; artifacts arrive from every edge and settle at a tilt; the line under the headline types, holds, deletes and is replaced |
| About | Copy from the left; the board's sheet, then its objects on a second trigger |
| Services | Cards slide in from the side they sit on; the portfolio rails rise and drift up and down |
| Testimonials | The stage rises in place (never from the side); the review wall rises once, then its columns drift |
| Client logos | Three marquee rows, alternating direction |
| Capabilities | The scroll-linked stacking deck (below) |
| Work | Each band rises as one unit |
| Process | The heading rises, the line wipes in left to right, cards step up and to the right one at a time |
| Impact | Cards and the note arrive tilted and settle |
| Pricing | The three cards rise together, 80ms apart |
| FAQ | The answer opens by height; the plus turns into a cross |
| Closing sheet | The back sheet, the paper, the tape, the arrow wipe, then the three promises in a stagger |
| Article body | Nothing. A paragraph somebody is reading is never animated |

### Marquees

The logo rows, the review columns and the portfolio rails are CSS keyframes:

- The track holds **two copies** and travels `-50%`, so the loop has no visible
  jump. The copy count and the percentage are one decision.
- Every column or row runs at its own speed, or four columns at two speeds read
  as two columns and a copy.
- Ends fade out with `logo-row-mask` and `review-rails-mask`.
- **Wrap every marquee in `OffscreenPause`.** It sets `data-paused` from an
  IntersectionObserver (restarting 200px before arrival) and the stylesheet
  pauses everything inside. Without it the browser composites every marquee for
  the life of the page.
- Hovering or focusing inside a review column holds that column only, so a
  moving card can be read and its screenshot opened.

### Sticky elements

No section pins or takes over the scroll, with these deliberate exceptions:

- **The masthead** is sticky inside the frame.
- **The capability deck**, from `lg`, is the one pinned stage on the site. A
  `220vh` track holds a sticky `h-[30rem]` stage at `--stack-top`
  (`clamp(12rem, 30svh, 17rem)`). As the page scrolls, `useScroll` drives each
  card in from alternating sides at a steeper angle and it settles over the one
  before it. The scroll itself stays native; the deck responds to it and never
  fights it. Below `lg`, or with reduced motion, it is a plain list whose cards
  slide in from alternating sides.
- **The article rails**: the contents list sticks from `lg`, the ask card from
  `xl`, both at `--masthead + 4.5rem`. The client asked for this arrangement. The
  contents list scrolls inside itself (`toc-scroll`), follows the reader, and
  hides its scrollbar because it tracks the current entry; at its end the next
  wheel turn goes to the page, which is the browser's own behaviour and is left
  alone.

Do not add another pinned section, and never hijack the scroll.

### Hover and press

- Hover affordances only on things that are actually clickable or linked.
- The WhatsApp dock does not change colour on hover; its mark turns once
  through 360deg over `--dur-turn` on `--ease-travel`. It arrives once on load,
  900ms after the page, rising from below.
- `ProofPeek` unfolds over `--dur-turn` because it reveals a whole panel; a link
  tint uses `--dur-base`.

### Reduced motion

- `src/styles/base.css` cuts every CSS animation and transition to `0.01ms` and
  turns off smooth scrolling.
- Each hand-written animation also has its own guard in `utilities.css`: the
  marquees stop, the arrow badge stays still, tape still appears but does not
  tilt, the FAQ opens without a transition while its mark still changes, the
  typing caret stops blinking, the dock is simply there.
- Framer motion is handled once by `MotionProvider`. **Branch the transition,
  never the markup.** Nothing rendered may depend on the preference, because the
  server cannot know it and a mismatch rebuilds the page on the client.
- A component that must read the preference reads it in an effect or a handler
  (`HeroTypedLine`, `NavLink`, the capability deck after mount).
- Test the motion-enabled branch at a phone width as well as the reduced one:
  a suite that only renders the reduced fallback misses every bug in the real
  layout.

## Components

`src/components/` is split by what a thing is, not by which page uses it. A
section of a page is not a component and lives in `src/sections/<page>/`, one
per file. A page file under `src/app/` is a running order and holds no markup.

### `src/components/ui/`, the primitives

| Component | What it is for | Use it when |
| --- | --- | --- |
| `ArrowButton` | The site's call to action: a black pill (`--action`) with the arrow in a white badge that swipes across on hover. `tone="light"` is a white pill with a hairline and a sage badge. `size` `sm` or `base`, `width` `fit` or `full`. Renders a link with `href`, a button without | Every call to action on the site. `sm` in the masthead and on cards, `base` everywhere else |
| `Card` | A surface: `rounded-token shadow-soft`, a fill from `CARD_FILLS` (`surface`, `board`, `butter`, `peach`, `sage`, `cloud`, `violet`, `sky`) and `p-7` unless `padding` is passed | Any card. The fill is rhythm, never meaning |
| `SectionHeading` | The `h2` and its lead for every band below the hero: `display-l` at 700, `lead` under it, `align` `start` or `center`, `tone` `ink` or `on-accent` | Every section heading |
| `Section` | The band and the container: `fill` for the band, `max-w-7xl px-5` inside, default `py-14 sm:py-20 lg:py-24` | Every section |
| `HandAccent` | One phrase of a heading set in Kalam, in `--ink-sage` | The payoff phrase of a heading, once |
| `SlideIn` | A block that arrives from the left, the right or from below, on the downward-only reveal | A block of copy or a row that should arrive rather than fade |
| `ArtifactStage` | A board of cut-out artwork, each piece positioned by percentage, tilted, arriving from its nearest edge on the board spring | Any page opening or band built from supplied cut-out artwork |
| `ProofPeek` | A client's WhatsApp message and photograph held off a service card until hover or keyboard focus. Opens up or down at the card's exact width, measured against the sticky masthead and the section's clip, with a tail landing on the card. `xl` only, `aria-hidden` because the words are on the page as text | Service cards only |
| `Stars` | A rating as the number of stars given, with halves drawn as halves, named "x out of 5" for screen readers | Anywhere a client's rating is shown |
| `MarkerUnderline` | The tapered marker stroke under a figure, stretched to its width, coloured by `currentColor` | Under a price |
| `Glyph` | Every small mark: `ChannelGlyph` (mail, phone, WhatsApp), `PlanGlyph` (rocket, chart, team, named for what the plan is), `CheckGlyph`, `PinGlyph`, `SocialGlyph`, `WhatsappMark`, `PlayerGlyph`, and the shared `Glyph` frame. Brand marks are solid; the rest are outlines at one stroke width | Any icon. Drawn here rather than imported, so the set stays a set |
| `surface.ts` | The class strings that make something a surface or a control: `SURFACE`, `SURFACE_FLAT`, `FOCUS_RING`, `FOCUS_RING_WITHIN`, `HOVER_PLATE`, `HOVER_PLATE_BARE`, `HOVER_TAPE`, `HOVER_TAPE_BARE` | Any new surface or interactive element, so corner, shadow, ring and hover cannot drift |

### `src/components/layout/`, the skeleton

| Component | What it is for |
| --- | --- |
| `PageFrame` | The ring, the frame line and the sheet. Never `overflow-hidden` |
| `SiteHeader` | The sticky masthead: the mark, the primary nav (`aria-label="Primary"`) with tape hovers, and the `sm` "Contact us" `ArrowButton`. Mounted once in the root layout |
| `MobileNav` | The menu below `md`: "Packages" stays in the bar beside a `size-11` menu control whose three bars fold into a cross. Escape or choosing a link closes it, and the panel is unmounted when closed so its links leave the tab order |
| `NavLink` | One nav link. Pressing Home while on `/` scrolls to the top instead of doing nothing |
| `SiteFooter` | The footer, outside `<main>`: the brand block, three tape-headed columns (quick links, services, contact), the colophon, the torn sage bands and the four objects. On `--board` |
| `FooterArtifacts` | The four footer objects, anchored to the footer's bottom edge, arriving from the edge each hangs off |
| `WhatsappDock` | The fixed WhatsApp button inside the sheet's bottom right, from `48rem`. The site's one green button |
| `BrandMark` | The logo, defined once. `decorative` in the footer, where the name is already beside it |
| `MotionProvider` | `MotionConfig reducedMotion="user"` round the whole app |

### `src/motion/`, shared behaviour

| Module | What it does |
| --- | --- |
| `useReplayOnScrollDown` | The reveal: show on arrival, re-arm only below the fold |
| `OffscreenPause` | Pauses CSS animations inside it while off screen |
| `useBelowMd` | True below `48rem` (`47.999rem`); the work wall's phone arrangement |
| `useNarrowViewport` | True below `60rem`; the service cards' column entrance |
| `useCardColumns` | How many article cards a row holds (1, 2 or 3), so a row can move as one |
| `useScrolling` | Whether the page is scrolling now (140ms of quiet counts as stopped); reels never touch a video mid-scroll |

Every new shared component is added to the catalogue above. The local tooling
also keeps a list in `AGENTS.md`, and `scripts/check-structure.mjs` fails a
component that list does not name.

### Running orders

Every page, in the root layout: the fixed frame strip and cap, then
`MotionProvider` > `PageFrame` > `SiteHeader`, `<main>`, `SiteFooter`,
`WhatsappDock`.

The primary nav is Home, Services, Work (`/#work`), Packages (`/#pricing`) and
Blog, with "Contact us" as the button. It is declared once in `src/nav.ts`.

**`/`** (`src/app/page.tsx`)

| Section | Anchor | What it is |
| --- | --- | --- |
| `Hero` | | The first screen. `HeroCopy` (the `h1`, the typing line, one sentence, the button) beside `HeroArtifacts` (four cut-outs with butter stage tabs) |
| `About` | `#about` | `AboutCopy` (heading, lead, four pillars with disc icons, button) beside `AboutArtifacts`, the client's board of objects |
| `Services` | `#services` | `ServiceShowcase`: six service cards in two columns arriving from their own side, round a central rail of website work drifting up and down; each card has a `ProofPeek` |
| `Testimonials` | `#testimonials` | `TestimonialWall` (one clip on a torn stage, the neighbours as posters from `lg`, arrows and dots) then `ReviewWall` (torn slips in four drifting columns, two on a phone; hover shows the WhatsApp screenshot) |
| `ClientLogos` | `#clients` | Three rows of logo tiles as marquees in alternating directions |
| `Capabilities` | `#capabilities` | `CapabilityDeck` of `CapabilityCard`s: the team's photographs beside why presence matters, stacked on scroll from `lg` |
| `Work` | `#work` | `WorkWall`: reels among posts on one mosaic, bands of two reels and six posts (one reel and three posts on a phone), the two reels of a band never adjacent; `ReelTile` plays a reel in its card |
| `Process` | `#process` | `ProcessPath`: five steps as a rising staircase joined by a line from `70rem`, a two or three column grid below |
| `Impact` | `#impact` | Copy with the clipped note beside a two by two grid of result cards and a hand-drawn arrow |
| `Pricing` | `#pricing` | `PricingPlans` with `BillingToggle`: three white cards with torn strips, a stat panel, ticks and a button each; a line and a button for anyone none fits |
| `Faq` | `#faq` | A native `details name="faq"` accordion under a centred heading, then a line and a button |
| `ClosingCta` | | The ask as a cream sheet taped to the desk, on a sage band |

**`/services`**: `ServicesHero` (the `h1` and a board), `Services` (the home
section reused as the overview), `ServiceList` (one band per service, anchored by
its slug, copy and a mounted picture alternating sides), `Impact` (reused),
`ClosingCta`.

**`/contact`**: `ContactHero` (the `h1`, WhatsApp and email buttons, a board
running off the sheet's right edge), `ContactWays` (the three channels side by
side, each with its own button), `ContactBrief` (what to put in a first
message, beside a board), `ContactStudio` (`#studio`: the address, directions,
and the map on a torn sage sheet). There is no form: a form that posts nowhere
and shows success is a lie told to a customer. Contact actions are direct
channels (WhatsApp, `mailto:`, phone).

**`/blog`**: `BlogHero`, `BlogFeed` (the topic chips from `TopicFilter`, the
first article of the selection as `FeaturedArticle` beside `EditorsNote`, then
`ArticleCard`s in rows of up to three arriving from alternating sides),
`ClosingCta`.

**`/blog/[slug]`**: `ArticleHero` (breadcrumb, `h1`, the date where real, the
cover on a torn sheet), `ArticleBody` (the sticky `ArticleContents` list, the
article with its `h2`, `h3`, lists, tables, flow diagrams and FAQ, and the
sticky `ArticleAside` ask), `MoreArticles`, `ClosingCta`. Every picture on the
blog goes through `ArticleArtwork`.

**`/privacy-policy`**: one plain `<article>` on the sheet. It is set in raw
Tailwind sizes (`text-4xl`, `text-2xl`, `text-sm`) rather than the type tokens;
bring it onto the scale when it is next edited.

## Accessibility that shapes the design

### The focus ring

- `FOCUS_RING` in `src/components/ui/surface.ts` is
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`:
  a 2px butter outline, 2px off the element. Every interactive element carries
  it, so the ring looks the same in every browser engine.
- **The ring is added, never swapped in.** It removes nothing, so there is no
  "replacement half" to lose in a refactor. `focus:outline-none` followed by a
  custom ring is how focus indicators go missing, and
  `scripts/check-structure.mjs` checks the class lists for it. Enforce focus
  rules in the source, not in a rendered test, which under-collects.
- `FOCUS_RING_WITHIN` draws the same ring on a wrapper when the real control is
  off screen: the billing toggle's radios are `sr-only`, so their labels wear
  the ring.
- The FAQ `summary` draws its own ring in CSS with the same values and the token
  corner.
- A reel card takes programmatic focus (`tabIndex={-1}`, `outline-none`) so
  keys work after a tap without a ring appearing; it is never a tab stop.
- A scrolling box clips anything past its edge, the ring included: the contents
  list keeps `p-1` of room for it.
- The ring is butter, and butter against white is a hue difference rather than a
  luminance one (1.38:1). On pale grounds the ring is carried by colour.

### Contrast

- Use the pairs in the contrast table under Colour. Body copy is `--ink-body` or
  darker.
- **Never `--ink-muted` on `--page`.** 2.9:1.
- Butter is never text and never a hairline.
- White type on a photograph needs a one-hue scrim (`from-ink to-transparent`)
  under it, as on the testimonial stage. Type dropped straight on a frame is
  legible until the frame changes.
- Dim a picture, never a label: the testimonial slivers hold back their poster
  at 70% and leave the name at full strength.

### Targets

Icon-only controls are sized as a block: the menu control and the testimonial
arrows are `size-11`, the WhatsApp dock `3.5rem`, the footer's social marks
`h-10 w-10`, the play badge on a testimonial `size-14` with the whole frame as
its target. Match `size-11` for a new icon-only control. Reel controls are
`size-8` inside the card's control bar.

### Structure

- One skeleton everywhere: `<header>` with the nav, exactly one `<h1>`, sections
  in `<main>`, `<footer>` **outside** `<main>` so it is the contentinfo landmark.
- Every nav is named: "Primary", "Primary mobile", "Legal", "Breadcrumb",
  "Table of contents", and the footer columns by their tape headings through
  `aria-labelledby`.
- No skipped heading levels: an article's subsections are `h3` under its `h2`.
- Article tables stay a real `<table>` at every width, stacking into one card per
  row below `sm`; each part carries its ARIA role because changing `display`
  strips the semantics in some browsers.
- A link inside a paragraph is underlined (`decoration-ink-sage`), not coloured
  alone.

### Names and duplicates

- Buttons are named by what they do and whose it is ("Show the testimonial from
  Vikas"), never by direction alone ("Next").
- The typing line in the hero is `aria-hidden`, with the whole sentence beside
  it in `sr-only`, so a screen reader does not announce it letter by letter.
- `ProofPeek` and the marquee duplicates are `aria-hidden`; their words are
  already on the page once.
- `Stars` is named "x out of 5".
- A link that leaves the site opens a new tab with `rel="noopener noreferrer"`.

### Controls

- The billing toggle is radio inputs: one tab stop and arrow keys for free. Each
  copy on the page has its own `name`, or the browser merges the groups.
- The testimonial dots are buttons, not tabs, because tabs promise arrow-key
  behaviour.
- A review slip's screenshot is behind a real button, so touch and keyboard can
  open it, not only hover.
- The FAQ is native `details` with a shared `name`: an accordion with no script.
- The phone menu closes on Escape and on choosing a link.
- Reels take Space or `k`, `m`, the arrows (5s), Home, End and Escape.

## Copy rules that shape the design

- **No em dash, no ellipsis character, no curly quotes** in visible copy. Plain
  sentences, straight quotes, including round a client's quoted words.
- **English only.** No i18n routing, no hreflang.
- **No counting in headings** ("Four ways we grow your brand").
- **No "not just X, it's Y"**, and no copy about the page itself ("this section
  is about").
- **None of the AI vocabulary**: delve, leverage, seamless, robust, elevate,
  unlock, empower, streamline, foster, testament, tapestry, vibrant, pivotal,
  intricate, underscore, realm, boasts, nestled, and openers like "in today's
  fast-paced world" or "at its core". The browser suite checks for them.
- **Supplied copy ships verbatim**: same words, punctuation and capitalisation.
  Where a supplied line has a plain slip, fix the grammar and say so in a
  comment beside it, as the footer's "Bring your business online." does.
- **A client's words are theirs.** Reviews keep their mix of Gujarati and
  English, and nothing is added under them: no language label, no caption
  explaining what a message was about.
- **Never invent** a client name, number, testimonial, price, award, response
  time or geography, in copy or in JSON-LD. The prices are the client's, stored
  as monthly figures only in `src/content/pricing.ts`; quarterly and yearly
  prices and the struck figure are derived, the saving is spelled out in rupees
  (`Intl.NumberFormat("en-IN")`), and no percentage is stated.
- **Region.** The studio address on `/contact` and in the footer comes from
  `src/content/contact.ts`. Do not name a region anywhere else in copy until the
  client confirms it.
- **The client's hero block.** The live site's line "We help brands grow through
  purposeful design, storytelling, and data-driven marketing." ships verbatim in
  the footer's brand block, and "Where Creativity Meets Strategy" with that line
  is on the share card. The hero headline is the outcome-led "Technology plans
  it. Social media shows it. Revenue proves it."
- **No eyebrow above a heading.** The labels the code does use, and why each is
  allowed:
  - Each capability card carries one word above its `h3` ("PRESENCE", "TRUST",
    "RECALL", "ENQUIRY"), written in capitals in the content, `text-label
    font-bold`. It names the card's idea inside the card, not a section.
  - The footer's column headings are set on tape in small capitals. They are the
    headings themselves, at the client's call.
  - A blog card's topic sits on tape across the picture.
  - The editor's note and "Table of contents" are small tracked capitals, and
    each is the heading of its block rather than a label over one.
  - The hero's stage tabs ("01 Ideate" to "04 Publish") number the stages of a
    month, which are a real sequence.
  - Never a `[Category]` bracketed label.
- **Re-check the words when the layout changes.** Copy that describes a layout
  that no longer exists is a bug.
- **No heading past four lines at 375px.**

## Banned patterns

Tick every one before calling a section done.

**Colour and surface**
- [ ] `--accent` on a button, or `--accent` and `--action` merged into one token
- [ ] `--ink-muted` on `--page`
- [ ] A colour, radius, spacing or duration literal in a component (the only
      literals are `themeColor` and the Satori-rendered icon and share card)
- [ ] A gradient crossing two hues, glow, glassmorphism, particles, text shadow
- [ ] Stacked shadows (the two deliberate cases are `.artifact-shadow` on the
      hero cutouts and the WhatsApp dock's edge ring)
- [ ] A dot-grid or graph-paper background
- [ ] Butter on every band, or a full butter band
- [ ] Meaning encoded in a card's fill colour
- [ ] Heavy outlines, or more than two nested bordered containers

**Shape**
- [ ] A second radius value instead of arithmetic on `--radius`
- [ ] Nested rounded boxes with the same corner (the concentric rule)
- [ ] A round button with words on it
- [ ] A component kit (shadcn, MUI, Chakra), which brings its own radius and
      shadow

**Type**
- [ ] Inter, Poppins, Montserrat or DM Sans; a second display face
- [ ] `font-semibold` on Satoshi
- [ ] More than one hand accent in a heading, or the hand on a price
- [ ] Text under 12px, a form control under `1rem`

**Layout and composition**
- [ ] A small uppercase eyebrow above a heading
- [ ] A `[Category]` bracketed mono label
- [ ] The same section shape twice in a row (eyebrow, centred heading, lead,
      grid of equal cards)
- [ ] A heading block beside an empty half-row
- [ ] Icon, centred heading and centred body in a two by two grid
- [ ] A pill or badge on every card
- [ ] A counter on every row when nothing depends on the order
- [ ] An accent tick, dash or bar above every heading in a grid
- [ ] A thick left border with italic text as a pull-quote
- [ ] Flat clipart centred in a bordered box
- [ ] Centred multi-line body copy
- [ ] A card and a sliver of the next on a phone
- [ ] Missing `min-w-0` on a grid child holding a scrolling row

**Paper**
- [ ] A translucent mat
- [ ] A gap beside a torn sheet that ignores the overhang
- [ ] A torn section boundary
- [ ] One stencil stretched onto a box of another proportion
- [ ] A shadow on a masked mat
- [ ] A plan strip stretched with `object-fill`, or a `p-*` shorthand beside it

**Motion**
- [ ] `lenis`, `aos` or any smooth-scroll library; scroll hijack
- [ ] A new sticky or pinned section
- [ ] A reveal that plays backwards on the way up, or hides a block that left
      above the fold
- [ ] A fractional viewport threshold on an element that can outgrow the screen
- [ ] The same reveal on every section
- [ ] A marquee without `OffscreenPause`, or without `aria-hidden` on its copy
- [ ] Rendered markup that depends on the reduced-motion preference
- [ ] A hover affordance on something that is not clickable
- [ ] `touch-action: none` on anything a thumb can land on

**Content and media**
- [ ] An invented client, number, testimonial, price, award, response time or
      geography, in copy or JSON-LD
- [ ] A placeholder in JSON-LD, or one that names a business, quotes a person or
      states a price
- [ ] Stock photography of strangers; commissioned 3D or illustration
- [ ] A replaced image kept under its old filename
- [ ] Autoplaying sound, or a video that downloads before it is asked for
- [ ] A form that shows success without posting anywhere
- [ ] An em dash, an ellipsis character, curly quotes, a counting heading, "not just
      X", or the AI vocabulary
- [ ] The framework's default favicon
- [ ] A device attributed to a reference that does not have it

## Adding something new

A new section or page, in order:

1. **Map it in plain text first.** Say which reference (if any) gives what, per
   section, and get it confirmed before writing code.
2. **One section, one file** in `src/sections/<page>/`. The page file only lists
   sections in order.
3. **Wrap it in `Section`.** Pick a band from the tints that does not match the
   mats or cards on it, and look at its neighbours. Set an explicit phone
   padding step. Add an `id` if a link will point at it.
4. **Head it with `SectionHeading`**, centred over a symmetric full-width block,
   start-aligned over a left-anchored one, at most one `HandAccent`. A new page
   gets exactly one `h1` at `display-xl`, `font-black`.
5. **Tokens only.** Theme colour names, `rounded-token` (derived corners by the
   concentric rule), `border-token border-line`, `shadow-soft` and
   `shadow-lift`, `transition-token`. Use `SURFACE`, `FOCUS_RING` and the hover
   strings from `surface.ts`. Calls to action are `ArrowButton`.
6. **Paper, if it has cards.** An opaque `bg-mat-sage` or `bg-mat-kraft` behind
   each card through the stencil that matches the box's proportion; gaps and
   section padding include the overhang; no torn section edge.
7. **Motion.** `SlideIn` or `useReplayOnScrollDown`, `amount: "some"` for
   anything that can be taller than a screen, a movement unlike the neighbours',
   `OffscreenPause` round any marquee. Nothing rendered depends on the
   reduced-motion preference.
8. **Media.** Sources in `assets/`, run `node scripts/artifacts.mjs` or
   `node scripts/media.mjs`, import from the generated `*Media.ts` module. Real
   aspect ratios, alt text from the content layer, a new `quality` added to
   `next.config.ts` if one is used.
9. **Content** lives in `src/content/*.ts` behind an accessor in
   `src/content/index.ts`, so a CMS can replace it later. Anything not real yet
   goes behind `src/content/placeholder.ts`.
10. **Look at it at 375, 768 and 1440px**, plus 1024 and any odd breakpoint the
    section uses. Measure element boxes for overflow (a clipping ancestor hides
    it from `scrollWidth`), count heading lines at 375px, check no text runs
    under a torn strip and no two mats touch. Zoom in to 4x on corners and
    edges; a ten pixel defect is invisible at full-page scale. Check the
    motion-enabled branch, not only reduced motion.
11. **A new page** gets an entry in `src/routes.ts` (the sitemap and every
    browser test read it; `lastModified` is the date its content changed),
    metadata with a unique title and description, a canonical, Open Graph
    through `openGraphFor` from `src/site.ts`, JSON-LD through `src/seo/graph.ts`,
    and a line in `public/llms.txt`.
12. **A new shared component** is added to the catalogue in this file, and to
    the component list in `AGENTS.md` that `scripts/check-structure.mjs` reads.
13. **Gates:** `npm run lint`, `npm run build`, `node scripts/check-structure.mjs`
    and the Playwright suite in `tests/` (`npx playwright test`). Judge
    performance on the production build (`npm run build`, then `npx next start`),
    never on `next dev`.
