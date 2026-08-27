---
name: web-standard
description: >-
  Team standard for building any page in this repository so structure, content,
  SEO, accessibility, and performance stay consistent. Covers a clean,
  human-friendly code structure and the shared page skeleton; standardized
  responsive components (buttons, inputs, forms, cards, modals, tables, nav);
  SEO on every page (indexable by default, semantic HTML, meta, Open Graph,
  JSON-LD, crawlable for search and AI agents, natural keywords); content rules,
  where copy the user supplies is used verbatim with no rewording or added
  words, and copy you write is human-quality with no AI-writing tells like em
  dash or ellipsis overuse; Core Web Vitals performance (LCP, FCP, CLS) with
  correct image, video, and HTML attributes on every device; and change hygiene
  (apply a change everywhere it touches, remove or hide things with all related
  code, leave no errors or warnings). Use when building, styling, or extending a
  page or component, adding SEO or structured data, writing page copy, or
  improving performance. Record new components in the catalog.
---

# Page Structure, Content & SEO Standard

The purpose of this skill is simple: **every page in this project should read
and perform like it was built by the same team, and any human should be able to
open the code and immediately know where things live.** A page is one
deliverable made of four parts that ship together: the structure, the content,
the SEO, and the performance. This standard keeps all four consistent so a
person or an AI can jump in and work fast without re-learning the conventions.

Do not treat the rules below as red tape. They exist so that a button on one
page behaves like a button on another, so copy sounds like a person wrote it,
and so every page is fast and findable. When a rule would block something the
project genuinely needs, adapt it and record the decision, but never break
consistency silently.

Note on style: this skill's own files avoid the AI-writing tells listed in
`references/content.md` (especially em dash and ellipsis overuse). Write the
same way in the skill and in the pages you build.

## This bundle is portable

This skill, `.claude/rules/web-common.md`, the `tests/` suite, the structure
checker and the CI workflow are meant to be **identical in every website
repository**. Only four files describe one project: `src/site.ts`,
`src/routes.ts`, `tests/project.config.ts` and `AGENTS.md`.

`INSTALL.md`, beside this file, has the copy procedure and the full portable
versus per-project split. Read it before adding this to another repository, and
before editing any of the shared files: a local edit to a shared file means the
next project silently loses the fix. If a rule is wrong, it is wrong everywhere,
so change it once and copy that file out.

## Scope of this skill

This skill covers the parts of building a page that are the same on every
project: file and folder structure, the page skeleton, component anatomy,
content quality, SEO, accessibility, performance, and change hygiene.

It deliberately does **not** carry a theme, a palette, or a visual style. The
look of this site is a separate decision recorded in `AGENTS.md`. When you need
a colour, a spacing value, or a radius, read it from the project's own tokens in
`src/app/globals.css` rather than inventing one here or importing one from
another project.

## What the user gave you always wins

Read this before the rest. Everything in this skill is a default for what the
user did **not** specify. It is a floor, never a ceiling on their decisions.

- **They supplied copy?** It ships word for word. Same punctuation, same
  capitalisation. No rewording, no additions, no trimming to fit a length in
  `references/content.md`. Those lengths are for copy you write yourself.
- **They supplied a design?** A Figma file, a screenshot, an attached image, a
  named colour, a written spec. Build that. Do not substitute your own taste or
  "modernise" it.
- **They supplied an image?** Use it. If the work needs one and they did not
  supply it, **ask**. Do not choose a stock photo, generate one, or silently
  drop the image.

Where a user instruction and a rule in this skill disagree, the user wins, and
you say once that you are departing from the standard and why. Where they said
nothing, the standard applies in full.

## Adopt what is already here, never fight it

This skill lives inside a real codebase, so before writing any page code, read
what the project already does and match it:

1. Read the existing tokens and conventions: the CSS custom properties in
   `src/app/globals.css`, the component patterns in `src/components/`, and the
   rules recorded in `AGENTS.md`.
2. When you add anything new, match those conventions. The same button
   variants, the same spacing rhythm, the same file and folder layout. New work
   should be indistinguishable from what is already there.
3. If the existing code is inconsistent, do not silently "fix" it everywhere.
   Note the inconsistency, propose a direction, and align new work to the
   agreed standard.

## The self-growing catalog (important)

This system is meant to expand as the project reveals new needs. **Whenever you
create a new reusable component or pattern that is not already in
`references/components.md`, add a short spec for it to that file** (anatomy,
variants, sizes, states, tokens used, responsive and a11y notes) using the same
format as the existing entries. Also name it in `AGENTS.md`, because
`npm run check:structure` fails a component that nothing documents. Over time
the catalog becomes the shared memory of how this team builds UI, so keep it
current rather than letting knowledge live only in one page's code.

## Every page ships complete, and every page ships the same way

A page is not done when it looks right. It is done when the structure, the
content, the SEO, and the performance are all right together, and when it
follows the same skeleton as every other page. Build all four as one job:

- **Structure** from `references/coding-structure.md` and the component catalog
  in `references/components.md`.
- **Content** written to a human standard from `references/content.md`. If the
  user gave you copy, ship it word for word. If they did not, write real copy
  for them. Do not use lorem ipsum, and do not write in the AI voice.
- **SEO** applied on every page by default from `references/seo.md`: indexable
  unless told otherwise, one shared metadata pattern, JSON-LD, crawlable for
  search engines and AI agents, keywords placed naturally.
- **Performance** to the Core Web Vitals targets in `references/performance.md`,
  verified on mobile, with correct image, video, and attribute handling.

**Same structure for all pages.** Reuse one page skeleton so every page shares
the same landmarks and metadata: `<header>`/nav, one `<h1>`, semantic `<main>`
sections, `<footer>` outside `<main>`, the shared metadata export, and the same
responsive container. Two pages should differ in content, not in their bones.

**Register the route.** Every public page has an entry in `src/routes.ts`. That
registry drives the sitemap and every browser test, so a page without an entry
is absent from the sitemap and silently skipped by the whole suite.
`npm test` fails when a page exists under `src/app` with no entry, so forgetting
is caught rather than shipped. Give every new page a clean, descriptive route
name (lowercase, hyphenated, mirroring the hierarchy) and wire it into nav, the
registry, and its SEO metadata.

## When you change or remove anything, finish the job

Half-applied changes are how bugs and console warnings appear. Follow
`references/engineering-hygiene.md`:

- **Adding or changing something:** update every place it touches (imports,
  types, routes, nav, sitemap, tests, content, styles, the catalog). If a value
  lives in two places, collapse it to one source of truth.
- **Removing or hiding something:** remove the whole thing and everything tied
  to it (markup, unused imports, routes, links, styles, assets, state, types,
  tests, and its SEO entries). "Hidden" still means clean: not rendered, not
  linked, not crawlable, and compiling without warnings.
- **Moving where images are served from:** an image URL is an address Google has
  indexed, so changing the image domain, CDN, or path resets that image's search
  history. Never do it as a side effect of a redesign or refactor. Tell the user
  what is changing and what it costs, in a short summary they can decide on, and
  if it goes ahead ship the 301s, sitemap, metadata, and host config with it
  (`references/seo.md`).
- **Always end in a clean state:** search the codebase for stray references,
  then run `npm run lint`, `npm run check:structure`, `npm run build`, and
  `npm test`. No new errors, no new warnings, no dead links, no orphaned code.

## Non-negotiables (the short list)

These are the things that, if dropped, break the system. Everything else is
guidance you can adapt with judgment.

- **One source of truth for style.** Colours, spacing, radius, typography, and
  shadows come from the tokens in `src/app/globals.css`, never hard-coded ad hoc
  in a component. `npm run check:structure` enforces this.
- **Responsive by default.** Every component, layout, and page works on mobile,
  tablet, and desktop. Design mobile-first and scale up
  (`references/responsive-and-a11y.md`).
- **Accessible by default.** Keyboard focus, labels, contrast, and semantics are
  part of "done", not an afterthought (same reference).
- **SEO by default.** Every page is indexable (unless told otherwise), uses the
  shared metadata pattern, semantic HTML, JSON-LD, clean crawlable structure,
  and natural keywords (`references/seo.md`).
- **Supplied copy is verbatim.** When the user provides content, use it exactly
  as written. No rewording, no added or removed words, no extra headings or
  taglines. Ask before changing anything (`references/content.md`).
- **Human content, not AI content.** For copy you write yourself, be clear and
  specific and avoid the AI-writing tells, above all em dash and ellipsis
  overuse (`references/content.md`).
- **Fast on every device.** Meet the Core Web Vitals targets and handle images,
  video, and HTML attributes correctly (`references/performance.md`).
- **Complete, clean changes.** Apply each change everywhere it touches, remove
  or hide things with all their related code, and leave no errors or warnings
  (`references/engineering-hygiene.md`).
- **Predictable structure.** Files, folders, naming, and the page skeleton
  follow `references/coding-structure.md` so any human can navigate the code.
- **Reused, not re-invented.** Check the catalog before building; extend an
  existing component rather than making a near-duplicate.

## References, read the one you need

Keep this file as the map; the details live in focused reference files. Read the
relevant one before doing that kind of work:

- **`INSTALL.md`**, which files are portable and which describe one project, how
  to copy this standard into another repository, and what enforces it. Read
  before installing it anywhere or editing a shared file.
- **`references/coding-structure.md`**, folder layout, file naming, component
  anatomy, the shared page skeleton, routing and clean URL naming, and
  per-framework notes.
- **`references/components.md`**, the component catalog: Button, Input,
  Textarea, Select, Checkbox/Radio, Switch, Form, Card, Modal, Table,
  Navigation, Toast, and more. Read before building or restyling any component,
  and append to it when you create something new. It also carries the rule that
  every async surface needs four designed states, loading, empty, error and
  success, and how to write an error state that helps rather than blames.
- **`references/motion-and-scroll.md`**, everything that moves or sticks. Read
  it before adding a reveal, a marquee, a smooth-scroll library, a sticky
  column or anything that rotates. Every entry is a bug that shipped and was
  traced, none of which `lint` or `build` can catch: scroll libraries caching
  positions before the fonts load, sticky failing silently inside a grid,
  absolute siblings painting in source order, fragment links landing under a
  sticky header, counter-rotations that cancel the wrong angle, and what a
  reduced-motion path has to actually do.
- **`references/responsive-and-a11y.md`**, the responsive strategy and
  accessibility baseline every component and page must meet.
- **`references/seo.md`**, indexing, the shared head pattern, meta and Open
  Graph, JSON-LD schema types, crawlability for search and AI agents, and
  keyword strategy. Read before building any page. It also covers auditing a
  page that already exists, finding content gaps against pages that currently
  rank, being found by answer engines rather than only by search, `llms.txt`,
  and why an image URL or the domain serving it must not change casually. Any
  SEO task also means reading `performance.md`, because Core Web Vitals are part
  of SEO.
- **`references/content.md`**, how to write human-quality page copy, the list of
  AI-writing tells to avoid, and how copy fits each UI section. Read before
  writing any content.
- **`references/performance.md`**, Core Web Vitals targets, image/video/media
  best practices, and HTML attribute rules for a fast page on every device.
  Also rendering: which properties are cheap to animate, how to avoid layout
  thrash, and when to reach for CSS, SVG, raster or canvas.
- **`references/engineering-hygiene.md`**, how to apply a change everywhere it
  touches and how to remove or hide things cleanly with no leftover errors.
  Also the short list of things that must never ship from the UI layer, and how
  to diagnose a bug rather than guess at it. Read the security list before
  rendering anything a user or an API supplied.

## Quick workflow recap

1. Read `AGENTS.md` and the existing tokens and page structure first, then match
   them.
2. Build each page as one deliverable: structure from the catalog, human
   content, SEO, and performance, all on the shared page skeleton.
3. Register the route in `src/routes.ts` so the sitemap and the test suite see
   it.
4. Make it responsive, accessible, and fast as you go, not later.
5. Apply every change everywhere it touches; remove or hide things cleanly with
   no errors or warnings left behind.
6. Created something new and reusable? Add it to the catalog and name it in
   `AGENTS.md` so the system grows.
