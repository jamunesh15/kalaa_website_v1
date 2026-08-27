# Engineering Hygiene, change everything a change touches

Two rules that keep a codebase clean and error-free as it grows:

1. **When you add or change something, update every place it touches.**
2. **When you remove or hide something, remove everything tied to it**, leave no
   dead code, broken references, errors, or warnings.

A change that's only half-applied is how bugs, console errors, and "why is this
still here?" confusion creep in. The standard is: after any change, the app
builds clean, runs with no new errors or warnings, and there are no leftover
references to what you touched.

## Rule 1, Propagate every change to all related places

Before considering a change done, walk the chain of things that depend on it. A
single "add a field" or "rename a component" usually ripples through several
files. Search the codebase for every usage rather than assuming you edited them
all from memory.

Common places a change needs to reach (check each that applies):

- **All usages / imports** of the changed component, function, or variable.
- **Types / interfaces / props** (and defaults) that describe it.
- **Routing**, routes, links, redirects, and the nav/menu/sidebar that point to
  it, plus breadcrumbs.
- **SEO artifacts**, `sitemap.xml`, canonical, meta, and JSON-LD that reference
  the page or entity, including the image URLs inside them (see `seo.md`).
- **State/store, API calls, and data models** that read or write it.
- **Styles/tokens**, if you renamed or restyled, update every consumer; if you
  changed a token, confirm all components still read correctly in light and dark.
- **Content / i18n / translation files** and any hardcoded copy.
- **Tests, stories, mocks, and fixtures.**
- **Docs, READMEs, comments, and config** (env vars, feature flags).
- **The component catalog** (`components.md`) when a shared component changes.

If a value or label exists in more than one place, that's a smell, prefer a
single source of truth (a token, a constant, a config, a shared component) so the
next change is one edit, not a hunt.

### The same fact lives in several files, and they must agree

Some things cannot be reduced to one source of truth. What the product *is* has
to be stated in the page copy, the meta description, the Open Graph card, the
JSON-LD and `llms.txt`, because each is read by something different. That is
fine. What is not fine is changing one and leaving the rest describing last
month's product.

**Nothing is done while a file still describes the old version.** Not "later",
not "a follow-up card". Stale content is worse than missing content, because it
is confidently wrong and nobody knows to doubt it.

These move together. Change anything on the left, update everything on the
right, in the same change:

| When you change | Also update |
| --- | --- |
| A page is added, removed or renamed | routes, nav, footer, breadcrumbs, `sitemap.xml`, `llms.txt`, canonical, every internal link to it, and a redirect if the URL changed |
| The content of one page | that page's `lastmod` in `sitemap.xml`, its visible "Last updated" line if it has one, and its JSON-LD `dateModified`. **Only that page.** Every other page keeps the date it had, or `lastmod` stops meaning anything (`seo.md`) |
| The product name, positioning or pitch | hero copy, meta title and description, Open Graph title/description, the OG image if it carries text, JSON-LD, `llms.txt`, footer |
| A feature, platform or integration is added or dropped | the section that lists it, JSON-LD, `llms.txt`, keywords, the FAQ if it is mentioned there |
| Pricing, limits or plan names | the pricing section, JSON-LD `Offer`, meta description if it quotes a price, `llms.txt`, the FAQ |
| The domain, host, CDN or path that images are served from | a 301 from every old image URL, the image entries in `sitemap.xml`, `og:image`, `twitter:image`, JSON-LD `image`, any `preload`/`preconnect` link, the allowed-image-hosts config (Next.js `images.remotePatterns`), the new host's `robots.txt` and cache headers, plus a short impact summary to the user before you ship it (`seo.md`) |
| The favicon or app icons | **the image only, never the path.** Replacing the file at `/favicon.ico` is safe; renaming, moving or deleting it drops the icon from every search result for weeks, and there is no warning anywhere (`seo.md`) |
| A design token | every consumer, then re-run the theme scan so `project-theme.generated.md` is not describing colours nobody uses |
| A shared component's API or look | every usage, and its entry in `components.md` |
| A rule in this skill | the same file in every project that carries a copy |

**The tell that this has already gone wrong:** a document that states a fact
confidently, and the code says something else. When you find one, do not quietly
follow whichever you prefer. Say on the card which two disagree, say which one
matches reality, and fix the stale one in the same change if it is small enough
to be safe.

## Rule 2, Remove/hide cleanly (no orphans, no warnings)

When the user asks to remove or hide a feature, element, section, or page, remove
the **whole** thing and everything that only existed to support it. "Hidden" must
not mean "still half-wired and throwing warnings."

Delete and clean up, for the thing being removed:

- The component/markup itself **and** its now-unused imports, so linters don't
  warn about unused symbols.
- Its **route(s)**, and every **link/nav/menu/breadcrumb** entry pointing to it,
  so there are no dead links or 404s.
- Its **styles/tokens** that nothing else uses, its **assets** (images, icons,
  fonts) that nothing else references.
- Its **state, API calls, handlers, effects, and data** that no longer have a
  consumer.
- Its **types**, **tests**, **stories**, **mocks**, and **translation keys**.
- Its **SEO entries**, remove from the sitemap, and if the URL is gone for good,
  add a proper redirect (301) or 410 rather than leaving a broken canonical.
- Any **feature flag / config / env var** that only gated this feature.

**Hide vs delete:** decide which the user means.
- *Delete* = gone from the codebase (above). Use when it's not coming back.
- *Hide* = kept in code but not shown/reachable now. Then still do it cleanly:
  gate it behind one flag or a single conditional, make sure it's not rendered,
  not in the tab order, not linked, and **excluded from SEO** (`noindex`, out of
  the sitemap), and make sure the hidden code still compiles without warnings so
  it doesn't rot. Don't leave it partially rendered or throwing runtime errors.

Either way, after removal/hiding: no unused imports or variables, no dangling
references, no broken links, no console errors or warnings, and the build/lint
passes clean.

## Things that must never ship from the UI layer

Short list, no judgement calls. Each one is a real vulnerability rather than a
style preference.

**Never render untrusted content as HTML.** `dangerouslySetInnerHTML`, `v-html`,
`innerHTML`, `[innerHTML]` and `document.write` all execute whatever they are
given. Anything that came from a user, a URL, a query parameter, a CMS or an API
is untrusted. Render it as text, which every framework does safely by default.
If it genuinely must be HTML (a rich-text field), sanitise it with a real
library, never with a regex.

**Never put user input into a URL scheme or a style without checking it.**
`href={userValue}` accepts `javascript:` and `data:`. Allow `http`, `https` and
`mailto` explicitly and reject the rest.

**`target="_blank"` needs `rel="noopener"`**, or the opened page can reach back
through `window.opener`. Add `noreferrer` too unless you have a reason not to.

**No secrets in client code.** Anything in the bundle, in a `NEXT_PUBLIC_`
variable, or in the HTML is public, whatever the file it started in. API keys,
tokens and internal URLs belong on the server. If it reaches the browser, treat
it as published.

**Do not disable a security control to make something work.** Weakening CSP,
turning off SameSite, adding a wildcard CORS origin, or disabling certificate
checks are not fixes. If the feature needs it, say so and ask rather than
quietly loosening it.

**Validate on the server as well.** Client validation is for the person filling
the form. It is not a security boundary, because anything the client checks the
client can skip.

## When something is broken, find the cause before you change anything

Guessing at a fix is the most expensive habit available. A guess that happens to
hide the symptom leaves the cause in place, and the next person pays for it with
a stranger bug in a different place.

**Reproduce it first.** If you cannot make it happen on demand, you cannot know
you fixed it. Write down the exact steps, the screen size, the state, the data.
A bug you saw once and cannot repeat is a bug you have not found.

**Read the actual error.** The whole message, the whole stack, the first frame
that belongs to this codebase rather than to a library. Most messages say
precisely what is wrong and get skimmed anyway.

**Narrow it before you widen it.** Which commit, which component, which prop,
which breakpoint. Comment things out until it stops, or bisect the change. Then
you are fixing one known thing rather than editing hopefully.

**Explain the mechanism before you edit.** You should be able to say "it breaks
because X, so Y happens". If you cannot finish that sentence, you have found a
symptom, not a cause. Keep looking.

**Then fix the cause.** Not the symptom. A `try/catch` that swallows the error,
a `!important` that beats the cascade, a `setTimeout` that waits for a race, an
`?? 0` that hides an undefined: all four make the symptom disappear and the bug
permanent. If you genuinely must patch around something, say so in a comment and
say why.

**Prove it.** Repeat the reproduction steps and confirm it is gone, then check
the thing nearest to what you changed still works.

Two rules that save the most time here:

- **Change one thing at a time.** Three changes at once, and a fix, means you do
  not know which one fixed it, or which one broke something else.
- **Suspect your own change first.** If it worked an hour ago and does not now,
  the cause is almost certainly in what you just did, not in the framework.

## The verification pass (do this after every change)

Don't declare done until you've checked. This is quick and catches almost all of
the "you missed a spot" problems:

1. **Search the whole codebase** for the old name/path/token/route you changed or
   removed. Zero stray references should remain (except intended ones).
2. **Build / typecheck**, it compiles with no new errors.
3. **Lint**, no new warnings, especially unused imports/vars and a11y lint.
4. **Run it.** If the project has browser tests, this is what they are for: run
   them and they load the affected screens, assert the **browser console is
   clean** (no errors or warnings), and drive the paths your change touched. In
   this repository that is `npm test`. Without them, open the screens yourself.
   Either way this step is not optional, because it is the only one that proves
   the code does anything at all: a page that compiles can still render blank.
   When a test fails, fix the cause. Never edit the assertion to match the
   broken behaviour.
5. **Check the related surfaces**, nav, links, and any page that referenced the
   thing still behave correctly (no dead links, no empty sections, no orphaned
   UI).
6. For removed pages, confirm SEO is consistent: not in sitemap, redirect in
   place, nothing links to it.

If any step surfaces something, fix it before moving on, a warning today is a
bug report tomorrow. The bar is simple: the app is always in a clean, consistent,
no-warnings state after your change, and nothing related was left behind.
