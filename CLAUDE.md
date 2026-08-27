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

**Type** — Chillax (display) + Switzer (text), both from Fontshare under the ITF Free
Font Licence, self-hosted via `next/font/local`. Latin only. Two families is the ceiling.
Chillax tops out at 700. **Inter, Poppins, Montserrat, DM Sans are banned.**

**Colour logic** — Kalaa's logo is **black and white**. A dark saturated brand colour
competes with it. So:
- The loud colour is **light**, and it is a **field** (bands, panels), never a button.
- **Buttons are black**, the logo's own. `--accent` and `--action` are separate tokens
  so nobody merges them by accident.

**Current palette** (carry over unless the new reference says otherwise):

| Token | Value | Role |
| --- | --- | --- |
| `--page` | `#7fa99b` | Sage frame, visible as a margin around a white sheet |
| `--sheet` | `#ffffff` | The sheet the site is printed on |
| `--ink` | `#14131a` | Headings |
| `--ink-body` | `#33313d` | Body |
| `--ink-muted` | `#56545f` | Secondary. **Never on the sage.** |
| `--accent` | `#ffd84d` | Field only. **Never a button.** |
| `--action` | `#14131a` | Buttons |
| `--radius` | `1.25rem` | The corner |

Measured: ink on sheet 18.5:1, ink on butter 13.3:1, white on black 18.5:1,
ink on sage 7.1:1, body on sage 4.9:1. **Muted on sage is 2.9:1 and fails.**
Butter vs white is 1.38:1, fine as a field, useless as a hairline.

**The sage frame** is Kalaa's own device, not the reference's: sage on `body`, content on
a white sheet with the corner radius, sage showing as a margin. Zero margin on phones.

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

## Not decided. Ask, do not assume.

1. **The design reference.** Hive Studio was tried and rejected. A new one is coming.
2. **Artwork.** Whether we get 3D/illustration made, or build a direction that carries
   itself on typography and real client work. This rules out half of all possible designs,
   so settle it before building.
3. **The headline.** Currently a placeholder.
4. **Hosting.** The old repo deploys over SSH to a 3.8GB box shared with nine apps and a
   MongoDB, not Vercel. ISR and image optimisation are constrained there.
5. **Real content**: prices, FAQ questions, testimonials, client work, and whether Kalaa's
   clients are in a named region (worth real money in local search).

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
