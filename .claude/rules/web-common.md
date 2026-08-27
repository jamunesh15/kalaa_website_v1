# Common Website Rules

**Portable. This file is identical in every website repository and is not edited
per project.** Anything specific to one site (its palette, its components, its
domain) belongs in that repository's `AGENTS.md` instead.

The detailed standard lives in `.claude/skills/web-standard/`. Read `SKILL.md`
there before building any page, then the reference file for the kind of work you
are doing. This file is the short version that is always in context.

## Commands

| Command | What it proves |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run lint` | The code satisfies ESLint |
| `npm run check:structure` | Files, naming, imports and tokens follow the conventions |
| `npm run build` | The project compiles |
| `npm test` | The pages actually render, in three browser engines |
| `npm run test:ui` | The same suite, with the Playwright inspector |
| `npm run test:report` | The HTML report from the last run |

A change is not done until `lint`, `check:structure`, `build` and `test` are all
green. `lint` and `build` only prove the code compiles. They say nothing about
whether the page renders, whether the console is clean, or whether the contrast
is readable, and those are the failures a person actually notices.

## Style Comes From Tokens, Never From A Literal

- Colours, spacing, radius, typography and shadows are declared once as CSS
  custom properties in `src/app/globals.css` and referenced through Tailwind
  class names everywhere else.
- Never hard-code a hex, `rgb()` or `hsl()` in a component.
  `npm run check:structure` fails on a literal colour in a `.tsx` file. The few
  places that genuinely cannot use a token are listed in `ALLOWED` in
  `scripts/check-structure.mjs`, each with a reason.
- Do not introduce a second source of truth: no theme object, no per-component
  colour constant, no inline style carrying a colour.
- The project's actual palette is recorded in its own `AGENTS.md`. Read it from
  there and from `globals.css`, never from another project.

## Radius Is A Decision, Not A Default

- Decide what radius means in the project before using it, and write the answer
  down. The useful split is **surface versus control**: what you read against
  what you press. Rounding both is what makes a page read as templated output,
  and rounding neither leaves nothing signalling that a thing is pressable.
- Name the token after the job rather than the size. `--control-radius` read
  through a `rounded-control` utility tells the next person where it belongs;
  `--radius` and `--radius-lg` tell them to pick one.
- A radius token that nothing references is not a decision, it is a leftover.
  Delete it or use it. Two of them is worse, because the choice between them is
  then made at random by whoever needs a corner first.
- A clickable card is still a card. Reserve the control radius for things whose
  primary purpose is the action, or every composition on the page softens.

## Structure And Routing

- Every public page has an entry in `src/routes.ts`. The sitemap is built from
  that registry and every browser test iterates it, so a page without an entry
  is missing from the sitemap and silently skipped by the whole suite. `npm test`
  fails when a page exists under `src/app` with no entry.
- `lastModified` in the registry is a claim about that page's content. Update it
  when you change what the page says, and leave every other entry alone. Never
  derive it from the build, the file mtime, or an unrelated commit.
- Route names are lowercase and hyphenated and mirror the hierarchy.
- Cross-directory imports use the `@/` alias, which `tsconfig.json` maps to
  `./src/*`. Deep relative imports (`../../`) are a structure finding.
- A component file is named after what it exports: PascalCase `.tsx` under
  `src/components/`, exporting a symbol of the same name. Non-component modules
  are camelCase `.ts`.
- Every shared component is named in backticks in the project's `AGENTS.md`. A
  component that nothing imports and nothing documents is orphaned, and
  `check:structure` says so.

## The Page Skeleton

- Keep one skeleton for every page: `<header>` with nav, exactly one `<h1>`,
  semantic `<main>` sections, `<footer>` **outside** `<main>`. A `<footer>`
  nested inside `<main>` is not exposed as the `contentinfo` landmark, so screen
  reader users cannot jump to it, and the accessibility suite fails on it.
- Two pages in one project differ in content, not in their bones.
- Give the primary nav an accessible name. A page can hold more than one
  navigation region, and "navigation" alone tells a screen reader user nothing.

## Components

- Reuse what exists before writing something new. Extend a component rather than
  making a near-duplicate.
- Every async surface needs four designed states: loading, empty, error and
  success. See `references/components.md`.
- Forms with required fields must mark those fields clearly, show a loading
  state on submit, and provide a clear success state after submission.
- Forms that collect real user details must submit to a server route or
  configured backend before showing success. Do not show a fake success state
  for data that was never saved.
- Do not wrap forms in multiple decorative frames that make them look like
  screenshots or mockups. Use one clear form surface.
- Success modals should use clear status wording that says what happened and
  what comes next. Do not use vague labels like "OK" as the main message.
- A modal needs `aria-modal="true"`, an accessible name via `aria-labelledby`,
  and focus moved into it when it opens. Without the last one a keyboard user is
  left tabbing through the page behind it with no idea the dialog opened.
- Every interactive element shows where keyboard focus is. The failure mode is
  specific and worth naming: `focus:outline-none` is written to replace the
  browser's default ring with the project's own, and the moment somebody forgets
  the replacement half, the element stays perfectly reachable by keyboard and
  becomes completely invisible while focused. Nothing looks wrong on screen.
  WCAG 2.4.7 is the floor.
- Enforce that rule in the **source**, not in the browser suite, and know why.
  A rendered check is stronger in principle: it also catches a ring that is
  present but overridden by something later in the cascade. It is very hard to
  make honest. Rings are keyed off `:focus-visible`, which does not reliably
  match focus moved by script, so a rendered check has to either drive real Tab
  presses, which quietly under-collect when the runner uses several workers and
  report a clean page having examined four elements out of forty, or use
  programmatic focus, which accuses the first focusable element in the document
  on every route at once. Both fail in the direction that matters, which is
  passing while checking almost nothing. Grep the class lists instead: it is
  deterministic, it runs in milliseconds, and it catches the mistake people
  actually make.
- Use the project's own focus ring everywhere, not the browser's on some
  controls and the project's on others. Leaving the default is legal and it is
  still a bug of a smaller kind: Chrome draws a thick contrast-aware ring where
  other engines draw a thin line, so "it looked fine" means "it looked fine in
  one engine".
- No text renders below `12px`, and no form control renders below `1rem`. iOS Safari zooms the whole page when a
  focused control sits under the root text size, and getting back out is awkward
  enough that it reads as a broken page. The 12px floor is separate and applies
  to everything: a phone-versus-desktop check passes type that is equally tiny
  on both. Type inside a mock interface may go smaller, because that is
  illustration rather than copy, but then it must be inside `aria-hidden` and
  the real wording has to exist somewhere a screen reader can reach.

## Layout And UX

- Make mobile layouts stack cleanly with no text overlap, clipped buttons, or
  horizontal overflow. The suite checks all three at 375px, 768px and 1440px.
- Section padding steps down on a phone; it does not inherit the desktop value.
  A band of 80px top and bottom is a fifth of a 667px screen spent on nothing,
  and fifteen sections of it is three screens of empty space before any content.
  Set the mobile step explicitly and let `sm:` and `lg:` carry the desktop
  rhythm.
- Display type steps down too, and the test is how many lines it takes. A
  heading at four lines on a 375px screen is a wall before the reader has
  decided to stay. Measure it rather than guessing: read the rendered
  `font-size` and divide the height by the line height.
- Centring is for short things that come in sets, and almost nothing else.
  Three labels each over a single figure, stacked one per row on a narrow
  screen, read as a ragged left column against a wide empty right side, and
  centring makes them a set. A sentence is not a set: centred multi-line body
  copy is harder to read and is one of the templated tells listed below.
- Body text and below never gets smaller on a phone than on a desktop. Display
  type is expected to scale down so a heading fits a narrow screen; anything at
  or below body size is not, because the phone is the device held closest to the
  face and read in the worst light.
- Do not use fake metrics, random counters, or vague status chips. Every number,
  badge, and preview state must clearly support the product story.
- Use status colours by meaning, and only for a real state. A badge that says
  nothing about state is decoration.
- Do not repeat the same step-by-step explanation or content block in multiple
  sections. Show a workflow in one dedicated place unless a second instance adds
  new context or real interaction.
- Do not show the same piece of information twice inside one component.
- Use subtle background texture only when it supports depth. Do not add
  decorative blobs or random gradients.

## Overflow, Touch And The Mobile Failures That Keep Recurring

Every rule here comes from a bug that shipped, was reported as "the section is
cut off" or "it will not scroll", and took far longer to find than to fix. None
of them are caught by a green test suite, and the reasons why are part of the
rule.

- **A horizontally scrolling child needs `min-w-0` on every ancestor up to the
  one that is allowed to constrain it.** This is the single most common cause of
  a page that looks sliced down its right-hand side. A grid item and a flex item
  both default to `min-width: auto`, meaning they refuse to shrink below their
  content. Put a row of cards inside one and the column takes the width of the
  whole row, and every sibling sharing that column inherits it: headings stop
  wrapping, paragraphs run off, and an ancestor with `overflow-hidden` clips the
  evidence. `overflow-x-auto` on the row does **not** prevent this. It makes the
  row scrollable once something has told the column it may be narrower than the
  row wants; on its own it changes nothing.
- **`touch-action: none` on anything large enough to land a thumb on will trap
  the page.** It tells the browser to perform no scrolling of its own over that
  element, so a visitor whose finger starts there cannot scroll past the section
  at all, and the only escape is the margin beside it. Use `pan-y` for something
  that drags horizontally: vertical panning stays with the browser and horizontal
  movement is still delivered. Reserve `none` for a surface that genuinely owns
  both axes, and know you are taking the page's scroll away when you write it.
- **A pointer press is not yet a gesture.** On touch, the same press begins both
  "drag this" and "scroll the page", and they are indistinguishable at
  `pointerdown`. Capturing the pointer there commits to the drag and takes the
  scroll. Hold the press undecided until the movement has a dominant axis, then
  either claim it or let the browser have it. A mouse has no such conflict and
  can commit immediately.
- **A phone shows one whole card, not a card and a sliver.** A deliberate peek
  is a legitimate way to say "this scrolls" when there is room for it to look
  intentional. A few pixels of the next card is not a peek, it is a seam, and it
  reads as a rendering fault. Check the arithmetic: a full-width card in a row
  that bleeds to the screen edges leaves the next one starting one gap later, so
  the gap has to be at least the horizontal padding or a sliver shows.
- **If you provide your own scroll indicator, hide the native scrollbar.** Two
  indicators for one thing is worse than either, and a horizontal scrollbar under
  a card reads as a stray rule. If you hide it, you owe the reader a replacement:
  dots, a counter, something. Hiding it and giving nothing back leaves no way to
  know more content exists.
- **Derive an indicator from scroll position, never track it separately.** Two
  sources of truth for "which card is showing" drift apart within a few swipes.
  And measure the stride between cards from where the cards actually are, rather
  than card width plus a hard-coded gap: the gap changes in a class list one day
  and the indicator quietly stops matching the screen.

### `scrollWidth === clientWidth` does not mean the layout fits

This is worth its own heading because it wastes hours. An overflow check that
compares the document's scroll width against its client width answers one
question only: is there a horizontal scrollbar. An ancestor with
`overflow-x: hidden` or `clip` silences that check completely while the content
underneath is still too wide and still being cut off.

Measure element boxes as well: walk the tree, compare each rectangle's right
edge against the viewport, and report anything past it **including** elements a
clipping ancestor is hiding. Then judge which of those are deliberate. A
composition drawn larger than its frame and cropped on purpose is fine; a
heading is not.

## Avoiding The Generic "AI-Generated SaaS" Look

No site built to this standard should read as templated Tailwind output. Watch
for these tells and actively design against them:

- Do not repeat the same section pattern (eyebrow label, centered heading,
  description, grid of equal-size cards) more than once in a row. Vary section
  shape and layout rhythm so the page does not scroll like a checklist.
- Do not nest bordered containers more than two levels deep. If a component
  needs a third layer to show data, flatten it with spacing and typography
  instead of adding another bordered box.
- Do not put a pill or badge on every card by default. Reserve pills for real,
  meaningful state, not decorative labels.
- Prefer one distinctive, purpose-built visual per key section over a uniform
  3-card or 6-card grid. A section explaining the core product action should
  show that action happening, not describe it across three bordered boxes.
- Favor elevation (soft shadow, whitespace, type contrast) over borders for
  hierarchy. Do not outline every element; let spacing and weight do the work.

### The specific patterns that keep getting caught

Every one of these was shipped, rejected on sight as "AI design", and rebuilt.
They are listed concretely because "make it less generic" is not actionable and
these are.

- **A small accent tick, dash or bar above every heading in a grid.** This is a
  badge on every card wearing a different hat. If four items each get the same
  decorative mark, the mark carries no information.
- **A thick left border plus italic text**, used as a pull-quote for a line
  nobody said. A quotation treatment on the brand's own words is decoration.
  Set it as a statement: bigger, given room, separated by space not by a rule.
- **Icon, centered heading, centered body, repeated in a two by two grid.**
  The most templated block on the web. Centred multi-line body copy is also
  harder to read than left-aligned, so it costs legibility for the look.
- **A counter on every row** (`01`, `02`, `03`) when nothing depends on the
  order and no one refers to the numbers.
- **Flat single-fill illustrations centred in a bordered box.** They read as
  clipart. If a drawing has to exist, it needs layering and it needs to be
  cropped by its frame rather than floating inside it with margin all round.
- **The same reveal on every section.** Five sections fading up identically is
  itself a tell. Vary the motion per section, or use one and mean it.
- **A heading block at `max-w-*` with the rest of the row left empty**, and
  nothing below heavy enough to anchor it. That void reads as a failed load.

### Design from the content, not from a layout

The way out of the generic look is almost never a new container. It is finding
what is actually distinctive in the copy and setting that.

If four claims share a construction ("Creative enough to...", "Strategic enough
to..."), the words that differ are the content, so set those large and the
shared part small. If a section exists to show three numbers, the numbers are
the largest thing in it and everything else gets out of the way. If a list is a
sequence, show the sequence.

A layout chosen before reading the copy is how the templated look happens.

## One Mark, Everywhere

The brand mark appears in more places than anyone remembers: the masthead, the
footer, `favicon.ico`, the touch icon, the share card, and sometimes an empty
state or a loading screen. **They must all be the same artwork.** A visitor sees
the tab and the header at the same moment, and a mark that differs between them
reads as a mistake even when both look fine alone.

- **Define the mark once and draw every copy from that definition.** Geometry in
  a shared module beats a letter set in a font, because the generated icons
  cannot use the font: `next/font` downloads woff2, which neither an ICO script
  nor Satori can read. Set the masthead in the real typeface and generate the
  icons from strokes and you have shipped two different letterforms.
- **Never leave the framework's default favicon.** It exists, it loads, it is an
  image, and it sits at the right path, so every ordinary favicon check passes
  while the browser tab and every search result show the framework's logo. Test
  for it by hash; a test cannot judge artwork but it can tell that nobody
  replaced the placeholder.
- **Pin the icon paths.** `/favicon.ico` is the address Google probes with no
  `<link>` tag at all, and it caches the icon against that exact URL. Moving it
  drops the icon from search results for weeks.
- **Check the icons by eye after any brand change.** Everything above is
  automatable except whether the mark is *right*, and that is the failure that
  actually happens.

## Content And Copy Rules

- Copy the user supplies ships verbatim. Same words, same punctuation, same
  capitalisation. Ask before changing any of it.
- Do not use em dashes in visible copy. Use plain sentences with standard
  punctuation. `npm test` fails on an em dash in rendered text, and it also
  fails on the ellipsis character and curly quotes.
- Avoid the AI vocabulary set: delve, leverage, seamless, robust, elevate,
  unlock, empower, streamline, foster, testament, tapestry, vibrant, pivotal,
  intricate, underscore, realm, boasts, nestled, and openers like "in today's
  fast-paced world" or "at its core". The suite checks for these.
- Avoid negative parallelism ("not just X, it's Y") and self-referential meta
  copy ("this section is about..."). State the fact or benefit directly.
- Never invent fake reviewer names, quotes, or customer testimonials to fill a
  preview card, even as illustrative content, unless it is clearly and visibly
  labeled as an example.
- Do not invent fake scores, ratings-out-of-100, or abstract quality numbers for
  a product preview. That is a fake metric even when framed as a UI demo.
- When data fields are shown to a non-developer audience, use short
  human-readable labels ("Star rating", "Review date") rather than raw technical
  field names, unless the surrounding context is explicitly a code or API sample.
- Whenever a section's layout is restructured, re-check its descriptive copy for
  accuracy in the same change. Copy that references a layout detail which no
  longer exists is a real bug, not just stale wording.
- No heading should wrap past four lines at 375px.

## SEO

- Every page is indexable unless the user says otherwise, and carries a title,
  a meta description, an absolute canonical, Open Graph and Twitter card tags,
  and a `theme-color`.
- Titles and descriptions are unique per page. Two pages sharing either compete
  with each other in search.
- Exactly one `<h1>` per page, and no skipped heading levels.
- Every meaningful image has alt text. A decorative image says so with `alt=""`
  or `aria-hidden`, but a missing `alt` attribute is the unhandled case.
- `canonical`, `og:url` and the sitemap entry all describe the same address.
- Next replaces the parent `openGraph` object wholesale when a page declares its
  own, rather than merging field by field, so a page that overrides the title
  silently drops the share image too. Build the block through one shared helper
  rather than writing `openGraph` out per page.
- An image URL is an address Google has indexed. Do not change the image domain,
  CDN, or path as a side effect of a redesign. If it has to move, ship the 301s,
  sitemap, metadata and host config with it, and tell the user what it costs
  first.

## Motion

- Animated UI must explain a real workflow, data movement, or product state. Do
  not add motion only for decoration, and respect reduced motion preferences.
- Do not add hover affordances that imply an action (arrows, "go" cues,
  link-style hover) on elements that are not actually clickable or linked.
- A scroll reveal plays in one direction: down. Reveal the element when it
  arrives, and re-arm it only once it has left *below* the fold. Never drive it
  from `isIntersecting` alone, which is the obvious implementation and is wrong
  twice over: scrolling up replays the animation in reverse under a reader who
  has already read it, and an element taller than the viewport is hidden the
  moment its top leaves the screen, so it fades out mid-read. Leaving above the
  fold must change nothing.
- Check the reveal library can express that before adopting it. Several cannot:
  they toggle a class around a single trigger line, so the only choices they
  offer are "reverses on the way up" and "never plays twice".
- For scroll-triggered reveals, do not put `whileInView` on the same element
  whose own size is animating from zero. Its collapsed bounding box can prevent
  the intersection observer from ever firing. Put `whileInView` on a
  stable-sized wrapper and drive the animated child via `variants` instead.
- Any pure-CSS animation needs its own `@media (prefers-reduced-motion: reduce)`
  guard in `globals.css`.
- **Test the interactive branch, not only the reduced-motion one.** A component
  that renders a static fallback until it has mounted, and something
  interactive afterwards, has two layouts, and a suite running under
  `reducedMotion: "reduce"` only ever sees the first. Bugs live in the second
  and reach every visitor who has not asked for less movement. This is not
  hypothetical: a scroll row blew a grid column out to 1296px on a 375px screen
  and every automated check passed, because every check was rendering the
  fallback. At least one test has to load the page with motion enabled, wait
  for hydration, and assert the layout at a phone width.
- When a page will not reproduce a reported bug, check the browser is actually
  running the page's JavaScript before concluding the report is wrong. A
  headless run that is quietly failing to load its chunks renders the
  pre-hydration fallback of every client component, which looks like a working
  page and is not the one anybody is using.

## A Library Is Not Installed Until Its CSS Is

Several scroll, carousel and dialog libraries ship a stylesheet that is not
optional, and importing only the JavaScript leaves them half-installed: the code
runs, the class names land on the elements, and nothing those classes are meant
to trigger exists. Nothing errors. The symptoms surface later as behaviour that
is hard to attribute, because the library is present and apparently working.

Read what the stylesheet does before deciding you do not need it. A smooth-scroll
library, for one, ships `html.lenis, html.lenis body { height: auto }` precisely
to undo a `height: 100%` on the root, which is a thing plenty of layouts set.

Copying a handful of rules into the project stylesheet instead of importing the
package one is a reasonable call, and a good one where the project already keeps
every rule in one file. If you do that, say in a comment that the rules are
copied and from where, so an upgrade does not leave them silently stale.

## Working With Existing Functionality

Before making visual or design-only changes to a section, identify any working,
backend-integrated logic in it (form submission, API calls, validation,
loading/error/success state) and leave that logic untouched. Only wrap it with
non-invasive presentational changes. Never restructure or rewrite the internals
of a working form or data flow as part of a styling pass.

## Known Findings

Two lists record real problems that are queued rather than fixed:

- `KNOWN_FINDINGS` in `tests/known-findings.ts` marks failing tests as `fixme`
  so the suite is green while a fix is queued.
- `KNOWN` in `scripts/check-structure.mjs` does the same for structure findings.

Both exist because a suite that blocks every change on pre-existing findings
blocks the changes that fix them too. **Delete the entry when the fix lands.**
The test then guards that bug forever. Neither list is a place to hide a
problem: `ALLOWED` in `check-structure.mjs` means "correct, and will stay this
way", and `KNOWN` means "wrong, and somebody is going to fix it". Empty is the
correct state for both.
