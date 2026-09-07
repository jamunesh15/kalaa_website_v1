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
| `--tint-butter` / `--tint-peach` / `--tint-sage` / `--tint-cloud` / `--tint-violet` | | Card fills. Rhythm, never meaning. |
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
- The channels themselves are in `src/content/contact.ts`, taken from the live
  kalaa.io rather than composed: `hey@kalaa.io`, `+91 9586909597`, the WhatsApp
  deep link with Kalaa's own pre-filled message, and the Uttran studio address
  with the map pinned by coordinates. The three profiles the client gave on
  2026-09-06 are there too: Instagram, X and WhatsApp. There is no LinkedIn,
  Facebook or YouTube URL, so there is no button for one. `sameAs` in the
  JSON-LD is built from that same list rather than typed again.
- `/contact` carries the three channels, the studio address and the services as
  an index, and no more. **There is no form**, because there is no backend in
  this repository to receive one and a form that posts nowhere shows a success
  message that is a lie told to a customer at the moment they decided to trust
  one. If a hosted endpoint is added later it is one component and one env var,
  and it goes above the channels rather than instead of them. Everything
  pointing at "Contact" goes to this page; the landing page keeps its closing
  section, whose button hands over to it.
- The Organization node carries `email`, `telephone` and a `PostalAddress`, all
  read from `src/content/contact.ts` so a crawler and a visitor are told the
  same thing. It is still `Organization` rather than `LocalBusiness`: the
  upgrade is worth real money in local search for a business with a door, and it
  invites `openingHours` and `priceRange`, neither of which has been agreed.
- `public/llms.txt` lists the pages for answer engines. Keep it in step with the
  route registry.

## Components

`src/components/` is split by what a thing is, not by which page uses it.

### `src/components/ui/`, the primitives

- `Button`, every pressable action. Renders an anchor when given `href` and a
  button otherwise, because a thing that navigates and a thing that acts are
  different elements to everything except the eye. Two variants, primary and
  secondary. The lift and drop come from the `pressable` utility, not from here.
- `MotionProvider`, one `MotionConfig` around the whole application, set to
  `reducedMotion="user"`. It exists because four sections were each answering
  the reduced-motion question themselves with
  `initial={reducedMotion ? false : animated}`, which reads as careful and is a
  hydration bug: `useReducedMotion` returns null during server rendering, so the
  server always wrote the arriving state and a browser with the preference set
  wanted the settled one. React rebuilt the entire page on the client, and the
  cost landed on exactly the people the branch was written for. Nothing rendered
  may depend on that preference. Branch the transition, never the markup.
- `ArrowButton`, the site's black button with the action drawn as a right arrow
  in a white badge, which swipes across the badge on hover. For a row of cards, where
  three solid black bars would be the heaviest thing on the band and would arrive
  before the prices. The pill is `--action` like every other
  button on the site and the badge inverts to `--surface`, so the arrow is black
  on white inside a black control. A pale pill was tried in sage, butter and
  white and each read as a colour that did not belong to its card. The movement is `arrow-swipe` in
  `utilities.css`, which has its own reduced-motion guard.
- `Card`, the outlined panel. Six quiet tints. **The fill is rhythm, not meaning**:
  nothing may encode information in which colour a card happens to be.
- `Glyph`, every small mark the site draws: the channel set (mail, phone,
  WhatsApp), the map pin, the three social marks, and the frame they share. They
  were local to the footer until the contact page needed the same three
  channels, and two copies of an envelope is how a set of icons stops being a
  set. Brand marks are solid and the rest are outlines at one stroke width,
  because an outlined X is a close button and an outlined WhatsApp is a speech
  bubble.
- `SlideIn`, a block that arrives from the left or the right. Same hook, spring
  and instant reset as the artwork arrivals, for a section built from two halves
  that should meet in the middle rather than fade up together.
- `HandAccent`, a phrase inside a heading set in Kalam. One definition rather
  than a span copied into eleven headings, and it carries the size bump that
  matches Kalam's x-height to Satoshi's. One accent per heading, on the payoff
  phrase, never on a price or a plan name a reader has to read as literal.
- `Pill`, the small uppercase label above a heading. Never in square brackets.
- `Section`, the page's horizontal rhythm. One max width and one gutter for the
  whole site, so a heading in one block lines up with a heading three blocks
  down. Sections setting their own width is how that quietly stops being true.
- `SectionHeading`, the h2 and its sentence, for every band below the hero. One
  size, one weight, one alignment. It exists because the page had six answers to
  the same question: measured on the running site, Services was 64px/700 centred,
  the client band 40px/700 centred, Capabilities 40px/900 left and Process
  40px/700 left. Every h2 is now `display-l` at 700 and the h1 stays the only
  thing on the site set heavier or larger. **Alignment is the one thing left to
  the caller**, and it follows the composition under the heading: `align="center"`
  over the service grid, the client rows and the capability deck, which are
  symmetric and run the full rail; the default `start` over the process rows and
  the closing ask, which are left-anchored. A left heading over a symmetric block
  leaves a wide empty half beside it. `tone="on-accent"` for the closing band.
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

- `BrandMark`, Kalaa's logo, defined once so the masthead, the footer, the
  browser tab and the touch icon cannot show different artwork. The client's
  file is `public/brand/kalaa_logo.avif` and every derivative is generated from
  it: `public/brand/kalaa-logo.webp` (the lockup this component renders),
  `public/brand/kalaa-mark.webp` (the badge alone), `src/app/favicon.ico` and
  `src/app/apple-icon.png`. **Lossless WebP**, because the source is already
  lossy AVIF and a second lossy pass rings along the hard black edges at exactly
  the size a masthead draws. Replacing the logo is one file plus a regenerate.
- `PageFrame`, the white sheet the site is printed on. The document is sage;
  this is the sheet sitting on it, and the sage shows through as a margin on all
  four sides. **Never give it `overflow-hidden`**, however tempting for clipping
  corners: an ancestor with hidden overflow silently breaks `position: sticky`
  on the masthead inside it, and that failure reads as a header bug.
- `SiteHeader`, the masthead and primary nav, mounted once in the root layout.
  Sticks to `--frame` rather than to zero, so it rests inside the sage margin
  instead of scrolling the frame away at the top.
- `SiteFooter`, the site footer, mounted **outside** `<main>` so it is exposed
  as the contentinfo landmark. Built to the client's own drawing: four columns
  under tape headings, a colophon, a torn band of frame sage across the bottom
  and four objects lying across the tear. The channels and the studio address
  read from `src/content/contact.ts` and the service names from `services.ts`,
  so nothing in it is a second copy of something a page already states. There
  is no social row until a real profile URL exists, and the tape headings are
  the client overruling this file's default against a small uppercase label.
- `FooterArtifacts`, the four objects around the footer, arriving from the edge
  each one hangs off. Same device and same spring as the about board, driven by
  `useReplayOnScrollDown`. Placement is in `src/content/footerArtifacts.ts` as
  percentages of the footer, anchored to its **bottom** rather than its top,
  because the footer roughly doubles in height when the columns stack.
- `NavLink`, one link in the masthead and the phone menu. It exists for Home:
  `/` has no hash, so pressing it while already on the landing page navigates to
  the page you are on and the reader does not move. It scrolls to the top
  instead when the pathname is already `/`, and reads the reduced-motion
  preference in the handler rather than in the markup.
- `MobileNav`, the disclosure menu below `md:`. Escape closes it and choosing a
  link closes it. The panel is unmounted when closed so its links are not in the
  tab order behind it.

The skeleton components are structure only for now. The redesign dresses them
in step 2.

Add every new shared component to this list. `npm run check:structure` fails a
component that nothing documents, because nothing would lead the next person to
it.

### `src/sections/`, one file per section

A section of a page is not a reusable component and does not belong beside the
primitives. `src/sections/home/` holds `Hero`, `About`, `Services`, `ClientLogos`,
`Capabilities`, `Process`, `Pricing`, `Work`, `Sectors` and `ClosingCta`, and
`src/app/page.tsx` holds nothing but the order they appear in.

`HeroTypedLine` is the one piece of the hero copy that moves. The device is from
bgmediaagency.in and it is taken as that site actually has it: measured on the
running page, its h1 does not animate at all and the movement is on the line
below, a fixed lead followed by a phrase that types, holds, deletes and is
replaced. Animating the headline was the obvious reading, and it would also have
handed this page's LCP element to JavaScript.

The rules it follows, each from a failure this repository has already paid for:
the server renders the first phrase in full and the loop starts in an effect, so
nothing in the markup depends on the motion preference; the visible line is
`aria-hidden` with the whole sentence beside it in `sr-only`, because a screen
reader following the animated node announces the clause one letter at a time
forever; and the box is reserved by the longest phrase drawn hidden underneath,
because "Meta ads" growing into "social media management" wraps to two lines on
a phone and would move the paragraph below it every four seconds. Measured at
375px and 1440px: the paragraph's top never moves.

`About` is the client's own board, and the artwork is the section rather than an
illustration beside it. `AboutArtifacts` draws it as ten separate objects
arriving from the edge nearest where each lands, which is the surya.website
device the hero already uses, shown a second time because the two answer
different questions: the hero says "we make these", the board says "this is what
a month looks like". Coordinates live in `aboutArtifacts.ts` as percentages of a
fixed-ratio box.

The board has a ground of its own, `--board`, the palette's only warm neutral.
Without it each artifact sat on `--surface` carrying its own cream inside its
alpha, so ten pieces of cream paper floated on white and the whole thing read as
scattered. The pieces did not move; the ground did the work. `a1`, `a2`, `a7`
and `a11` are keyed rather than left opaque, because unkeyed they drew white
rectangles across that cream.

Four more things there are load bearing. **No `artifact-shadow`**, because this set
was supplied with shadows already baked into the alpha and the filter that lifts
the hero's cutouts would give each piece a second shadow at a second angle.
**One trigger on the box**, through `useReplayOnScrollDown`, since ten pieces in
one container cross the threshold in the same frame and ten watchers produce a
burst rather than a sequence. The spring is slower and heavier than the hero's,
because the hero plays on load where a long arrival is a wait, and this plays to
a reader who has already scrolled to it and is watching a board being laid out.
**`sizes` is computed per piece and that is not a nicety**: one shared value had
every artifact claiming 260px, so the optimiser served the plan sheet a 256px
variant for a 652px slot and its headings turned to mush. **A separate phone arrangement**, five of the ten
at roughly twice the width, because at 375px the box is 307px and the plan sheet
came out with four-pixel headings; an inline style cannot hold a media query, so
both sets are passed as custom properties and `about-piece` in `utilities.css`
chooses. And **`a7` and `a12` are converted but not placed**: they are the
"+145% enquiries" card and a phone showing 48.2K and 125K, and no one has
verified those figures.

The copy beside it is four words with one line each, because prose cannot win an
argument with a picture of the work. Its band is white rather than the pale sage
the reference uses, since the hero directly above is already sage, and its
heading carries no butter marker: that device is the hero's and is spent once.
`AboutKalaa` and `AboutKalaaFlow` were deleted with it.

`src/sections/contact/` holds the contact page the same way: `ContactHero`,
`ContactChannels`, `ContactStudio` and `ContactBrief`, with `src/app/contact/page.tsx`
holding their order and the metadata.

Two things there are decisions rather than layout. **The channel cards are
pulled up over the bottom of the opening band**, which is the one structural
device this site takes from CoreInsight, and this is the page it was made for:
on a contact page the actions are the content, so they belong on the first
screen. **The studio block is an address, not an embedded map**, because the
only coordinates anyone has belong to the previous office and a pin invented for
the new address would be a false statement drawn on a map. The link searches the
address instead. Put the embed back when somebody sends the real latitude and
longitude.

v1 put seventeen sections in `page.tsx` and it ran to 1,323 lines. The rule now
is that a page file is a running order. If you are writing markup in one, the
section wants its own file.

### `src/content/`, the content layer

`services.ts` and `process.ts` are typed arrays. `types.ts` describes their
shape as if a CMS were already returning them, and `index.ts` holds the
accessors. **Nothing outside `src/content/` imports those arrays directly**: a
page calls `getServices()`.

`footerArtifacts.ts` holds where the four footer objects land and where each
one travels in from, and `footerMedia.ts` is generated by `npm run artifacts`
from `assets/footer/`. The sources are the client's PNGs, two of which arrived
with the transparency chequerboard painted in as real pixels; the keying, the
one seeded hole inside the camera strap and the content-hashed filenames are
all in `scripts/artifacts.mjs`.

`contact.ts` is the one place the email, the phone number, the WhatsApp deep
link and the studio address are written. The footer and the contact page both
render them, and before this they each held their own copy, which is a number
corrected in one place and left wrong in the other with nothing on either page
to show it.

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
