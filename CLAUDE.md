# Kalaa website

Rebuilding **kalaa.io** for Kalaa, a social media marketing agency (TechUp Labs).
Fresh start. The old repo is at `F:\tech up labs\Kalaa-Website`, branch
`redesign/kalaa-v2` — its **design is rejected**, its **plumbing is worth stealing**.

## The brief

- Creative, **not** corporate. A visitor should feel a creative team made this.
- Approachable. Instantly clear what the company does.
- Results first: more leads, more revenue, more enquiries.
- Services: posts, reels, Meta ads, websites and software.
- SEO **and AEO** friendly. Crawlable, server-rendered.
- CMS later so the team can publish blogs, case studies, services, packages.

## Hard rules. Do not break these.

**Content**
- Never invent a client name, number, testimonial, price, award, response time or
  geography. Not in copy, not in JSON-LD (`sameAs`, `aggregateRating`).
- No em dashes. No `…` character. No curly quotes.
- English only. No i18n routing, no hreflang.
- No counting in headings ("Four ways we grow your brand").
- No "not just X, it's Y".

**Design**
- Light theme.
- **One radius token, everywhere.** Buttons, cards, inputs, images, panels. Not a scale.
  Same for border width, shadow, and motion curve.
- No small uppercase eyebrow label above a heading. It is the most common template tell.
- No `[Category]` bracketed mono labels.
- No gradient crossing two hues. No glow, glassmorphism, particles, stacked shadows,
  drop shadow on text.
- No dot-grid or graph-paper backgrounds.
- **No sticky or pinned scroll sections. No scroll hijack.** Never install `lenis`.
- **Never attribute a design device to a reference unless the reference actually has it.**

**Code**
- Small files. A page file is a **running order**, not markup. Sections live one per file.
- No colour, radius, spacing or duration literal in a component. Tokens only.
- SEO is part of every step, not a final pass.

## Decided

**Type** — Satoshi (display, set at 900) + Switzer (text), both from Fontshare under
the ITF Free Font Licence, self-hosted via `next/font/local`. Latin only. Two families
is the ceiling. **Inter, Poppins, Montserrat, DM Sans are banned.**

Third face in the display slot and both losers are deleted from the repo rather than
left lying around. **Chillax** was rounded to the point of reading as a children's
brand at display size. **Clash Display** fixed that and brought its own problem: enough
character in the a, the g and the y that it drew attention to itself rather than to the
words. Six faces were set on the real headline, at the real size, on the real field and
looked at side by side before Satoshi. Satoshi ships 500, 700 and 900 and **has no 600**,
so `font-semibold` silently renders the wrong cut; use `font-bold` or `font-black`.

**Colour logic** — Kalaa's logo is **black and white**. A dark saturated brand colour
competes with it. So:
- The loud colour is **light**, and it is a **field** (bands, panels), never a button.
- **Buttons are black**, the logo's own. `--accent` and `--action` are separate tokens
  so nobody merges them by accident.

**Current palette** (carry over unless the new reference says otherwise):

| Token | Value | Role |
| --- | --- | --- |
| `--page` | `#7fa99b` | Sage frame, visible as a margin around a white sheet |
| `--sheet` | `#f4f7f5` | The sheet the site is printed on. Not white: see below |
| `--surface` | `#ffffff` | Cards, so they lift off the sheet |
| `--ink` | `#14131a` | Headings |
| `--ink-body` | `#33313d` | Body |
| `--ink-muted` | `#56545f` | Secondary. **Never on the sage.** |
| `--accent` | `#ffd84d` | Field only. **Never a button.** |
| `--action` | `#14131a` | Buttons |
| `--radius` | `0.625rem` | The corner |
| `--frame` | `0.5rem` | Page margin, sage. Zero on phones |
| `--ring` | `0.75rem` | The band of sage around the whole app, masthead included |

Measured: ink on sheet 18.5:1, ink on butter 13.3:1, white on black 18.5:1,
ink on sage 7.1:1, body on sage 4.9:1. **Muted on sage is 2.9:1 and fails.**
Butter vs white is 1.38:1, fine as a field, useless as a hairline.

**The sage frame** is Kalaa's own device, not the reference's. It wraps the whole
application, **masthead included**: the bar is part of the app, so the frame goes
around it rather than between it and the content.

**The sheet is not white.** `#f4f7f5`, a barely sage-tinted off-white. Pure white beside
the sage reads as a hole punched in the page rather than as paper, and a section with no
band of its own looked like a gap the design had forgotten. Ink sits on it at 17.9:1.
Cards stay pure white so they still lift without a heavier shadow.

**The frame above the masthead is redrawn, not covered.** Two things make this hard and
each fix broke the other on the first two attempts. The page margin is body padding, so
it exists at the top of the document and nowhere else: once the page scrolls, viewport
row zero is showing the middle of the sheet, and content travels up through any gap. And
the rounded corner you see at rest belongs to the **sheet**, not the frame, so it leaves
with the sheet and a rounded sage corner drawn over what remains does nothing, because
the sage behind it is already square and the same colour. `frame-cap` in
`src/styles/utilities.css` redraws both layers. Check it by screenshotting the corner at
4x zoom at rest and scrolled; at full-page scale a ten pixel error is invisible.

**Stack** — Next.js (App Router) + Tailwind 4 + `motion`.

**Version pins that are not laziness.** Everything runs latest except two, and
both were tried at latest and reverted because they break the build:
- **TypeScript stays on 6.x.** `typescript-eslint` declares `<6.1.0`, and TS 7
  fails immediately with "typescript-eslint does not support TS 7.0".
- **ESLint stays on 9.x.** ESLint 10 breaks `eslint-plugin-react` inside
  `eslint-config-next`: "contextOrFilename.getFilename is not a function".
Re-check both when `eslint-config-next` next updates. Do not bump them blind.
 No component kit (no shadcn,
MUI, Chakra — they impose their own radius and shadow). Radix headless primitives only
for accordion/dialog/tabs. Lucide for utility icons, custom SVG for service icons.
No three.js.

**CMS deferred.** Content lives in `src/content/*.ts` typed arrays behind accessors
(`getServices()`), so swapping in a CMS is a change to one file. **Blog stays a route
stub** until a CMS is chosen.

**Frontend only. There is no backend.** Settled 2026-08-27. No route handlers, no
database, no server actions that write anything. Every page is prerendered HTML.

The one thing this decides rather than merely constrains is the enquiry. A form
that posts nowhere and shows a success message is a lie told to a customer, so
either the contact actions are direct channels (WhatsApp deep link, `mailto:`,
phone) or a hosted form endpoint is added later, at which point it is one
component and one env var. Until then, no form renders a success state.

**Artwork: no commissioned 3D or illustration.** Settled 2026-08-27. The design
carries itself on typography, colour fields and real client work. Kalaa's product is
imagery, so the reels, posts and ad frames are the artwork, shown at their real
aspect ratios. This rules out any layout that needs a character or a scene to work.

**Placeholders are allowed while the real assets are gathered**, and they are
allowed because the client asked for them, not by default. The rules that make
them safe rather than a liability:

- Every placeholder lives behind `src/content/placeholder.ts`, so "what on this
  site is not real yet" is answered by opening one file.
- Placeholder images are generated locally into `public/placeholder/` at the real
  aspect ratios. No stock photography of strangers on an agency's own site.
- A placeholder never names a business, quotes a person or states a price. The
  slot describes the kind of work instead, so nothing on the page becomes a false
  claim about a real client if it ships a day early.
- **No placeholder ever reaches JSON-LD.** No invented `sameAs`, `aggregateRating`
  or `priceRange`. Structured data is read by machines as fact.
- `AssetSlot` is the dashed frame from the old build and it goes when the
  placeholder pipeline lands.

**The design reference. Settled 2026-08-27, and it is two references doing two
different jobs. Do not let either one spread past its job.**

- **CoreInsight** (Behance concept) gives **structure only**: an outcome-led headline
  as the largest thing on screen, a row of cards overlapping the bottom edge of the
  hero band, and a dark label bar across the foot of a work card. **Nothing of its
  surface.** Its violet gradient, its stock photography of people, its pill on every
  card, its `01` counters, its graph-paper band and its invented "15+ years" numbers
  are all out, and most were already banned independently.
- **surya.website** gives **one device**: artifacts arriving from every edge and
  settling into place. That is all. Not its cream ground, not its desk metaphor, not
  its notepad, polaroids, sticky note or serif.
- Hive Studio is rejected and stays rejected.

**The hero is layout E**, chosen against a study of four colour treatments and three
layouts, both screenshotted and looked at. Type hard left and oversized, running
toward the sheet edge. Artifacts down the right. One card may pass **behind** the
last line of the headline; **nothing may sit on top of the headline**, which is the
finding that killed layouts F and G. A centred heading over a centred subline over a
button is the template tell, and the study showed the loud yellow version of it read
as more generic, not less.

**Colour plan.** Sage frame throughout, white sheet, a pale sage field behind the
hero, white for the working sections, and the accent spent **once**, as a full butter
band at the closing call to action. A full butter hero was tested and rejected on
evidence: light cards vanish into it, and the marker behind a headline word has to
turn white, which reads as a hole. Butter on the first screen and again on the last
is one loud colour used twice. Butter on every band is a yellow website.

**The hero copy is the client's own**, taken from the live kalaa.io on
2026-08-27 and shipped verbatim: same words, same punctuation, same
capitalisation, serial comma included.

> WELCOME TO KALAA
> Where Creativity Meets Strategy
> We help brands grow through purposeful design, storytelling, and data-driven
> marketing.

That first line is a small uppercase label above a heading, which the design
rules above rule out as the most common template tell. **The client asked for
this block kept as it is, and an explicit instruction outranks a default.** The
rule still stands everywhere it was not overruled: do not add an eyebrow to any
other section.

## Not decided. Ask, do not assume.
3. **Hosting.** The old repo deploys over SSH to a 3.8GB box shared with nine apps and a
   MongoDB, not Vercel. ISR and image optimisation are constrained there.
4. **Real content**: prices, FAQ questions, testimonials, client work, and whether Kalaa's
   clients are in a named region (worth real money in local search). Placeholders stand in
   until these arrive. See the artwork decision above.

**Sectors, answered 2026-08-27.** Kalaa works with any business that needs marketing,
and the named sectors are architects, interior design, restaurants, food, machinery,
industry, and import and export. These are real and may be stated. They are also the
strongest SEO surface the site has, because "social media marketing for architects" is
a search a real person types and nobody in this space is targeting it. Each sector is a
future landing page once a CMS lands; the content layer is already shaped so that is an
addition rather than a rewrite. Do not state a region: that is still unverified, and
`public/llms.txt` currently claims Surat, Gujarat without confirmation.

## Working process

1. **Map the reference to sections in plain text first.** "Hero from A, services from B."
   Get it confirmed. Then write code. Not before.
2. **Build one section at a time.** Screenshot it, look at it, then continue.
3. Never hand over a screen you have not looked at.

## Mistakes already made. Do not repeat them.

1. **Generalised one reference across a whole set.** Etereo was one section; it got applied
   to everything. Always get an explicit per-section mapping.
2. **Made the type dominate and the artwork subordinate.** In these references the type is
   compact and the artwork carries the page. Check proportion before colour.
3. **Invented a highlighter device and said it came from the reference.** It did not.
4. **Shipped an eyebrow pill** that the project's own rules already banned.
5. Accepted a vague "this feels good" as confirmation of a specific reading.

## Steal from the old repo

`F:\tech up labs\Kalaa-Website` on `redesign/kalaa-v2`:

- `src/routes.ts` — every page declared once; sitemap, nav and tests all read from it
- `src/site.ts` — canonical and OG helpers
- `src/seo/graph.ts` — JSON-LD builders
- `tests/` — 12 Playwright specs (SEO, a11y, contrast, links, motion, performance,
  responsive, sitemap) plus `scripts/check-structure.mjs`, which fails the build on a
  hardcoded colour or an undocumented component
- `scripts/shot.mjs` — headless screenshot:
  `node scripts/shot.mjs http://localhost:3000/ shot.png 1440 900`
  Needs `chromium.launch({ channel: "chromium" })`, not the default headless shell, and
  `await page.evaluate(() => document.fonts.ready)` before shooting.
