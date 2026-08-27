# SEO Rules, every page, every time

Every page ships SEO-ready by default. SEO is not a later task bolted on before
launch; it is part of building the page, the same way the UI and content are.
The aim is that a page ranks well, is understood by search engines and AI
crawlers, and follows the exact same structure as every other page so the whole
site is predictable.

## The default: indexable

Unless the user clearly says a page should be private/hidden, **every page is
indexable**. Do not add `noindex`. Only add `noindex` when the page is genuinely
not for search, login, account, checkout steps, thank-you pages, admin, staging
previews, or when the user explicitly asks. When you do exclude a page, do it in
both places consistently: the meta robots tag and (where relevant) `robots.txt`
/ the sitemap, so signals don't contradict each other.

```html
<!-- default, indexable: you usually don't even need this, but be explicit if unsure -->
<meta name="robots" content="index, follow, max-image-preview:large">
<!-- only when the page must be hidden -->
<meta name="robots" content="noindex, follow">
```

## Same `<head>` structure for every page

Build one head/metadata pattern and reuse it on every page, only the values
change. In Next.js/Nuxt use the metadata API or a shared SEO component; in plain
HTML use a shared partial. Every page must set, in this order:

1. `<meta charset="utf-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1">` (viewport is required for mobile + performance).
2. **Title**, unique per page, 50-60 chars, primary keyword near the front,
   brand at the end: `Primary Keyword, Section | Brand`.
3. **Meta description**, unique, 140-160 chars, includes the primary keyword
   naturally and a reason to click. Never duplicate across pages.
4. **Canonical**, `<link rel="canonical" href="https://…absolute-url">` on every
   page, self-referencing by default, to prevent duplicate-content issues.
5. **Open Graph**, `og:title`, `og:description`, `og:type`, `og:url`,
   `og:image` (1200×630), `og:site_name`.
6. **Twitter card**, `twitter:card=summary_large_image`, `twitter:title`,
   `twitter:description`, `twitter:image`.
7. **Language & locale**, `<html lang="…">`; add `hreflang` links if the site
   is multilingual.
8. **Favicons / theme-color**.
9. **JSON-LD** structured data (see below).

```html
<title>Running Shoes for Trail, Footwear | Acme</title>
<meta name="description" content="Shop trail running shoes built for grip and long miles. Free returns, ships in 2 days.">
<link rel="canonical" href="https://acme.com/shoes/trail-running">
<meta property="og:title" content="Trail Running Shoes">
<meta property="og:description" content="Grip and comfort for long miles.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://acme.com/shoes/trail-running">
<meta property="og:image" content="https://acme.com/og/trail-running.jpg">
<meta property="og:site_name" content="Acme">
<meta name="twitter:card" content="summary_large_image">
```

## JSON-LD structured data (required)

Add JSON-LD (`<script type="application/ld+json">`) to every page. This is how
search engines and AI agents understand what the page *is*, and it powers rich
results. Pick the type that matches the page; keep the data accurate to the
visible content (never mark up things that aren't on the page).

Baseline that belongs on (almost) every page:
- **`Organization`** or **`WebSite`**, site-wide identity, on the home page.
  Add `WebSite` + `SearchAction` (sitelinks search box) when there's site search.
- **`BreadcrumbList`**, on every page that sits in a hierarchy; mirrors the
  visible breadcrumb.

Then the page-type schema, matching the page:
- Article/blog → **`Article`** / `BlogPosting` (headline, author, datePublished,
  dateModified, image).
- Product → **`Product`** + `Offer` (price, availability, currency) + `AggregateRating`/`Review` if shown.
- Local business → **`LocalBusiness`** (address, geo, openingHours, telephone).
- FAQ block → **`FAQPage`** (question/answer pairs that appear on the page).
- How-to → **`HowTo`**. Recipe → **`Recipe`**. Event → **`Event`**. Course → **`Course`**. Job → **`JobPosting`**. Video → **`VideoObject`**. Person/profile → **`Person`**.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Home","item":"https://acme.com/"},
    {"@type":"ListItem","position":2,"name":"Shoes","item":"https://acme.com/shoes"},
    {"@type":"ListItem","position":3,"name":"Trail Running"}
  ]
}
</script>
```

Rules for JSON-LD: keep one block per type (or an `@graph` array), use absolute
URLs, keep `dateModified` current, and make sure required properties for each
type are present. Validate against Schema.org / Rich Results expectations before
calling the page done.

## Crawlability, for search engines AND AI agents

Make every page trivial to crawl and parse:

- **Server-render the meaningful content.** Text that only appears after client
  JS may be missed by crawlers and many AI agents. Prefer SSR/SSG for content
  that must be found; don't hide primary copy behind interactions.
- **One `<h1>` per page**, then a correct `<h2>/<h3>` outline. The heading tree
  should read like a table of contents of the page.
- **Semantic landmarks:** `<header> <nav> <main> <article>/<section> <aside>
  <footer>`. Crawlers and assistive tech both rely on these.
- **Real links:** navigation and internal links are `<a href>` with descriptive
  text, not click-handlers on divs. Internal linking spreads authority and helps
  discovery.
- **`robots.txt`** allows crawling of public pages and points to the sitemap.
- **`sitemap.xml`** lists all indexable pages with `lastmod`; keep it generated,
  not hand-maintained, so new pages appear automatically.
- **Clean, stable URLs:** lowercase, hyphenated, descriptive, no tracking cruft
  in canonical URLs. Avoid changing URLs; 301-redirect if you must.
- **Image/media discoverability:** meaningful `alt`, real `<img>`/`<video>`
  elements, and include images in the sitemap where relevant.

### `lastmod` is a claim about one page, not a build timestamp

**Only the page that actually changed gets a new date, and that same date appears
everywhere the page states it.** This is the rule that gets broken by accident,
because the broken version looks tidy:

```ts
const lastModified = new Date();          // WRONG
return [
  { url: "/",               lastModified },
  { url: "/privacy-policy", lastModified },
];
```

One `new Date()`, shared by every entry, re-evaluated on every build. Every page
now claims it changed the moment you deployed, whether you touched it or not.

The cost is the opposite of what it looks like. `lastmod` exists to tell a
crawler which page is worth fetching again. Google's own guidance says it uses
the value only while it stays consistent with what actually changes, and ignores
it for the whole site once it does not. So a sitemap that stamps everything with
"just now" does not get crawled more, it loses the signal entirely, and the one
time a page really did change there is no longer any way to say so.

What to do instead:

- **Keep one date per route, in one place**, and have both the sitemap and any
  visible "Last updated" line read from it. A page's modification date is
  content, so it belongs with the content, not with the build.
- **Change only the entry for the page you edited.** If a change genuinely
  touches several pages, several entries move. Never all of them by default.
- **Never derive it from `Date.now()`, `new Date()`, file mtime, or the git
  commit time of an unrelated change.** All four drift for reasons that have
  nothing to do with the page.
- **A visible date and the sitemap date must agree.** Two places stating the
  same fact differently is the failure `engineering-hygiene.md` describes, and
  here a reader can see both.
- **`changefreq` and `priority` are ignored** by Google and have been for years.
  They are not worth maintaining, and a wrong `changefreq` beside a wrong
  `lastmod` makes the sitemap look guessed at.

### Being found by AI, not just by search

Answer engines do not rank a page and hand over a link. They read it, cut it
into passages, and quote the passage that answers the question. Everything below
follows from that one difference.

**Know which bot does what.** The most common mistake is blocking the wrong one,
because training and retrieval are separate crawlers from the same company:

| Bot | What it is for |
| --- | --- |
| `OAI-SearchBot` | ChatGPT search. **This is how you get cited** |
| `ChatGPT-User` | fetches a page because a user asked about it |
| `GPTBot` | OpenAI model training |
| `ClaudeBot` | Anthropic |
| `PerplexityBot` | Perplexity answers |
| `Google-Extended` | Gemini **training only**. Does not affect Google Search |
| `CCBot` | Common Crawl, feeds many models |

Blocking `GPTBot` opts out of training and does nothing to ChatGPT search.
Blocking `OAI-SearchBot` removes you from answers while training continues
elsewhere. Decide those separately, and confirm the current names against each
vendor's own documentation, because they change and this table will age.

**Write passages that survive being lifted out.** A retrieved chunk arrives with
no surrounding page. "As mentioned above" and "this also means" are worthless
once separated from what they referred to. Every section should make sense
alone, and name its subject rather than relying on a pronoun pointing at the
previous heading.

**Put the facts in text.** A model cannot read your logo strip, your pricing
graphic or your comparison screenshot. If the supported platforms are Google,
Trustpilot, G2 and Airbnb, those four words appear in the HTML, not only in an
icon row with `aria-label`. Same for prices, limits, what a credit buys, and
what the product does not do.

**Head sections with the question, not the slogan.** People ask an assistant
"how do I import Google reviews into my site". A page with that as an `<h2>`,
answered directly underneath, gets quoted. "Effortless integration" does not,
because it matches nothing anyone types.

**Say what it is in the first paragraph.** One plain sentence: what it does and
who for. Models anchor on the earliest clear definition, and if the top of the
page is a slogan they will take the definition from somewhere less flattering.

**An FAQ in real text, with `FAQPage` JSON-LD**, is the single highest-value
addition for this, because the format already matches how questions arrive.
Write the questions the way somebody would ask them out loud.

**Keep `dateModified` honest** in the JSON-LD. Answer engines weight freshness,
and a date that never changes on a page that does is worse than none.

### `llms.txt`

**Every public marketing, product or documentation site gets one**, at the root,
alongside `robots.txt`. Skip it only for an app behind a login, where there is
nothing public to describe.

It is a plain markdown file that tells an AI agent what the site is and where to
look, instead of making it infer that from parsing pages. Structure:

```markdown
# Product name

> One sentence on what it is and who it is for.

Two or three sentences of context: the problem it solves, how it works, what
makes it different. Plain language, no marketing adjectives.

## Pages
- [Home](https://example.com/): what someone finds here
- [Pricing](https://example.com/pricing): plans and what each includes
- [Docs](https://example.com/docs): API reference and guides

## Contact
- hello@example.com
```

Rules for it:

- **Absolute URLs**, every one. An agent may read the file with no page context.
- **Say what each page contains**, not just its name. "Pricing: plans and
  limits" is useful, "Pricing" is not.
- **Keep it true.** It is as much a public claim as the page copy, and the same
  rule applies: no invented numbers, no features that do not exist.
- **Update it when pages are added or removed**, the same way the sitemap is.
  A stale `llms.txt` is worse than none, because it is confidently wrong.
- It is not `robots.txt`. It grants no permissions and blocks nothing. Crawler
  access is still decided by `robots.txt`.

Be clear-eyed about what this is worth: it is a proposed convention, not a
standard, and no major AI company has committed to reading it. It costs ten
lines. Write it because it is cheap and might help, not because it is required
by anyone.

## Image URLs, and the domain that serves them

An image URL is an address Google has indexed, not an implementation detail.
Google Images ranks the file at its exact URL, and the crawl history, the
position in image search, and the traffic that comes from it all belong to that
URL. Move the file and Google sees two things: a brand new image with no
history, and an old one that now 404s. Getting back to where it was means a
re-crawl and a re-rank, which takes weeks and is not guaranteed to land in the
same place.

These all count as changing the URL, even though the picture is identical:

- **A different domain or subdomain**, `/img/hero.jpg` to `cdn.example.com/hero.jpg`,
  or a move to a new brand domain.
- **A different image host, CDN, or loader**, S3 to Cloudinary, a new Next.js
  image loader, a new proxy prefix in front of the path.
- **A renamed file or folder**, or a new extension (`.jpg` to `.webp`) when the
  old path stops responding.
- **http to https, www to non-www, or a trailing-slash change** on the image
  host.
- **Adding or removing a hash or version segment** in the path.

A query string added by an optimizer (`?w=800&q=75`) is not this. That is normal
and safe, as long as the base URL is stable and the old variants still resolve.

**Never change an image domain or path as a side effect of another task.** A
redesign, a component rewrite, or a move to a framework `<Image>` component is
not a reason to quietly re-host the files. If the work needs it, raise it as its
own decision.

When the move is genuinely needed, all of this ships in the same change:

- **301-redirect every old image URL to the new one**, and keep the redirects
  for at least a year. This is the one thing that carries the history across.
- **Do not delete the old files** until the redirects are live and the new URLs
  have been crawled.
- **Update everything that points at the old URL:** the image entries in
  `sitemap.xml`, `og:image`, `twitter:image`, JSON-LD `image`, any `preload`
  link, and the framework's allowed-image-hosts config (in Next.js,
  `images.remotePatterns`). A missed config entry breaks the image outright, not
  just its ranking.
- **Check `robots.txt` on the new host.** A fresh CDN or bucket origin often
  serves a default that disallows everything, which makes every image
  uncrawlable the day you switch.
- **Keep alt text, the surrounding copy, and the page the image sits on the
  same**, so the URL is the only variable that changed.
- **Serve the new host over https with long cache headers**, and `preconnect` to
  it if it is a third-party origin, because a new origin adds a DNS and TLS
  round trip in front of the image (`performance.md`). If the hero image moves
  cross-origin, that lands straight on LCP.
- **Verify after:** old URLs redirect, new URLs return 200 and are crawlable,
  and Search Console shows no spike in soft 404s or missing images.

### Report it before you ship it

Whether the ranking reset is worth it is the site owner's call, not something
they should discover in a diff. Whenever a change moves image URLs, stop and
give the user a short summary so they can answer "do it" or "leave it" without
reading the code. Five or six lines, in this shape:

- **What changes**, the old URL pattern, the new one, and how many images.
- **What it costs**, which of those images have image-search history that would
  reset. If they are decorative UI images that have never ranked, say so
  plainly, the cost is near zero and the user should not be scared off a
  harmless change.
- **Whether it is actually needed**, your honest read. A real reason (the old
  host is being shut down, the brand domain changed, the images must be
  optimised and the current host cannot) or a preference that is not worth the
  reset.
- **What has to ship with it**, the redirects, sitemap, OG and JSON-LD, host
  config, cache headers from the list above.
- **What you recommend**, one clear line.

The same summary is worth giving for any URL move, but images are where it gets
skipped, because swapping a domain in a config file does not look like an SEO
change.

### The favicon path is one of those URLs, and it is the easiest to break

**Once a site has a favicon, its path never changes and the file is never
removed.** Renaming `favicon.ico` to `icon.png`, moving it into an assets folder,
or dropping it during a redesign all cost the same thing, and the cost is
invisible from the codebase.

Google fetches the icon separately from the page, caches it against that exact
address, and shows it beside the result on mobile search, in tabs, in bookmarks
and in link previews. Two things follow:

- **Change the path and the old address 404s.** Google drops the icon from the
  results and shows a blank square or a generic placeholder until it crawls the
  new one. Favicon re-crawls are infrequent, so that gap is measured in weeks,
  not hours, on every result the site has.
- **Delete it and the same happens permanently.** Nothing recovers a favicon
  that is not there.

What is safe, and worth stating because people avoid it out of caution:

- **Replacing the image at the same path is fine.** A new design at
  `/favicon.ico` is a content change, not an address change. Google re-crawls it
  in its own time and nothing breaks in between. Frameworks that append a content
  hash as a query string, for example `/favicon.ico?favicon.abc123.ico`, are also
  fine: the path is what is indexed, and the query only busts the browser cache.

The rules that keep it working:

- **Keep the conventional path.** `/favicon.ico` at the site root is the address
  Google checks even when no `<link rel="icon">` is declared, so it is the one
  worth owning. In Next.js that means leaving the file at `app/favicon.ico`.
- **It must be crawlable.** Not blocked by `robots.txt`, not behind auth, not on
  a host that requires a referer. A blocked favicon is the same as a missing one.
- **Declare it, and declare it once.** Several competing `<link rel="icon">` tags
  invite the crawler to pick differently from the browser.
- **If it truly has to move, 301 the old path to the new one** and keep the
  redirect indefinitely, exactly as with any other indexed image.
- **Pin it with a test.** A path this easy to change by accident, and this slow
  to show damage, should fail the build rather than fail quietly in search.

## Speed is an SEO factor, not a separate job

Core Web Vitals are a ranking signal and, more importantly, they decide whether
someone stays long enough to read the page you optimised. A page with perfect
metadata and a 4-second LCP loses.

**Any SEO task includes reading `performance.md`.** Do not treat them as two
different pieces of work. The parts that bite hardest on a landing page:

- LCP, usually the hero image or heading. Preload the hero image, size it
  properly, and never lazy-load it.
- CLS, usually images without dimensions, or a font swap moving text.
- Blocking scripts and unused JavaScript delaying first paint.
- Images shipped at the wrong size or format.

Measure before and after. "Should be faster" is not a finding.

## Auditing a page that already exists

Building a new page and improving an existing one are different jobs. When asked
to improve, review, or audit SEO on a page that is already live, **audit first
and report before you edit**. Editing straight away hides what was wrong, and
the person asking usually needs to see the reasoning, not just a diff.

Read the page's real code, not an assumption of it: the metadata source, the
rendered heading order, the actual links, the actual images, the sitemap and
robots entries.

Deliver findings in this shape:

1. **Current issues**, what is wrong now, each one specific and located
   (file and line, or the exact tag).
2. **Recommended changes**, what to do about each issue.
3. **Exact title and meta description**, written out in full and character
   counted, not described.
4. **Recommended heading structure**, the actual H1/H2/H3 outline you propose.
5. **Keyword recommendations**, one primary, a handful of secondary, and where
   each should appear.
6. **Structured data**, which schema types, with the JSON-LD written out.
7. **Internal linking**, which pages should link here and which links this page
   should add, with the anchor text.
8. **Technical SEO**, canonical, robots, sitemap, URL, redirects, rendering.
9. **Prioritised checklist**, ordered by impact against effort, so someone can
   stop halfway and still have gained the most.

Two rules for the audit itself:

- **Be specific or say nothing.** "Improve the meta description" is not a
  finding. "The meta description is 214 characters and will be truncated at
  ~160; here is a 152-character replacement" is.
- **Do not redesign.** An SEO pass changes metadata, headings, copy, links and
  markup semantics. It does not restyle the page. Where a visual change is
  genuinely needed for SEO or usability, call it out and explain why rather
  than quietly making it.

## Content gaps, judged against what actually ranks

A page can be technically perfect and still lose to a page that answers more of
what the searcher wanted. Finding that gap is part of SEO work.

- Search the primary keyword and read the pages that currently rank. Note what
  questions they answer that this page does not, and what this page covers
  better.
- Compare against intent, not word count. A longer page is not a better page.
  The gap is a missing answer, a missing comparison, a missing objection
  handled, a missing use case, missing pricing clarity.
- Turn each gap into a concrete proposal: the section to add, where it goes, and
  the question it answers. Not "add more content".
- **Never invent a competitor claim, a statistic, or a quote.** If you cannot
  reach the web, say the competitive analysis was not possible and list what you
  would look for, rather than guessing at what rivals say.
- Respect the existing page. Adding a section is a real change to a designed
  layout, so propose it and explain the SEO reason.

## Keywords, used well, not stuffed

Pick keywords with intent, then place them naturally:

- For each page, choose one **primary keyword** (the main intent) and a few
  **secondary/long-tail** variants. Match search intent to page type
  (informational → article, transactional → product/landing).
- Place the primary keyword in: the title, the H1, the first ~100 words, at
  least one subheading, the meta description, the URL slug, and image alt where
  it fits. Use secondary terms and natural synonyms through the body.
- Write for people first. Never keyword-stuff or repeat unnaturally, it reads
  badly and search engines discount it. One clear page per intent beats many
  thin overlapping pages (avoid cannibalization).
- If keyword research tools/connectors are available, use them to validate
  demand and find long-tail variants; otherwise infer from the page's real
  topic and the user's product.

## Per-page SEO checklist (done = all true)

Unique title and meta description. Canonical set. One H1 and a clean heading
outline. Semantic landmarks. Indexable (or intentionally `noindex` with a
reason). Open Graph + Twitter tags with a valid image. Correct JSON-LD for the
page type plus breadcrumbs. Descriptive internal links. All images have alt.
URL is clean and in the sitemap. Image URLs are unchanged, or moved with 301s
and the impact summarised for the user. Primary keyword placed naturally in the
key spots. Content is server-rendered enough to be crawlable. Core Web Vitals
measured, not assumed (`performance.md`). Works with the shared head pattern so
every page matches.

**Site level, once, not per page:** `robots.txt` allows the public pages and
points at the sitemap. `sitemap.xml` is generated rather than hand-kept.
`llms.txt` exists and still describes the pages that actually exist. Adding or
removing a page means touching all three, not just the routing.
