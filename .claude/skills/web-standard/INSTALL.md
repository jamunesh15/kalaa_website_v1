# Installing this standard in another website repository

Everything in this bundle is split into two groups: files that are **identical
in every project**, and files that **describe one project**. Copying is
therefore mechanical. Copy the first group as it is, then fill in the second.

## What is portable, and what is not

| Path | Portable? | Notes |
| --- | --- | --- |
| `.claude/skills/web-standard/` | Yes, copy as is | The standard and its references |
| `.claude/rules/web-common.md` | Yes, copy as is | The rules that hold on every site |
| `tests/*.spec.ts` | Yes, copy as is | The checks themselves |
| `tests/known-findings.ts` | Yes, copy as is | Starts empty in a new project |
| `scripts/check-structure.mjs` | Yes, copy as is | Reset `ALLOWED` and `KNOWN` |
| `playwright.config.ts` | Yes, copy as is | Three engines, port 3100 |
| `.github/workflows/checks.yml` | Yes, copy as is | Enforcement |
| `tests/project.config.ts` | **Edit** | The only per-project file in `tests/` |
| `src/site.ts` | **Edit** | Site name, origin, share card |
| `src/routes.ts` | **Edit** | The route registry |
| `AGENTS.md` | **Edit** | Palette, components, project facts |

If you find yourself editing a file in the first group to make a project pass,
stop. Either the project is wrong, or the rule is wrong for everyone and the
file should change in every repository. A local edit means the next copy
silently loses the fix.

## Steps

1. **Copy the portable files.** From the root of the source repository:

   ```bash
   TARGET=../other-website
   mkdir -p "$TARGET/.claude/rules" "$TARGET/tests" "$TARGET/scripts" "$TARGET/.github/workflows"
   cp -r .claude/skills/web-standard "$TARGET/.claude/skills/"
   cp .claude/rules/web-common.md    "$TARGET/.claude/rules/"
   cp tests/*.spec.ts                "$TARGET/tests/"
   cp tests/known-findings.ts        "$TARGET/tests/"
   cp tests/project.config.ts        "$TARGET/tests/"
   cp scripts/check-structure.mjs    "$TARGET/scripts/"
   cp playwright.config.ts           "$TARGET/"
   cp .github/workflows/checks.yml   "$TARGET/.github/workflows/"
   ```

2. **Add the dependency and the scripts.**

   ```bash
   npm install --save-dev @playwright/test
   npx playwright install chromium firefox webkit
   ```

   In `package.json`:

   ```json
   "check:structure": "node scripts/check-structure.mjs",
   "test": "playwright test",
   "test:ui": "playwright test --ui",
   "test:report": "playwright show-report"
   ```

   In `.gitignore`: `/test-results`, `/playwright-report`, `/blob-report`,
   `/playwright/.cache`. In `eslint.config.mjs`, ignore those same report
   folders, or ESLint will lint the minified CodeMirror bundle inside the HTML
   report and emit thousands of warnings about code nobody wrote.

3. **Write the four per-project files.**

   - `src/site.ts`, the site name, the production origin with no trailing
     slash, and the share card. Everything else derives from it, which is what
     keeps the canonical, `og:url`, `robots.txt` and the sitemap in agreement.
   - `src/routes.ts`, one entry per public page. The sitemap is built from it
     and every browser check iterates it.
   - `tests/project.config.ts`, the title pattern, any page that prints its own
     "Last updated" date, and the crawler endpoints.
   - `AGENTS.md`, the palette, the shared component list, and the project facts.
     Keep `@.claude/rules/web-common.md` at the top so the common rules load
     with it.

4. **Give the app the shape the checks expect.** A page skeleton with a header,
   one `<h1>`, a `<main>`, and a `<footer>` outside it; a metadata export with
   title, description, canonical and Open Graph built through one shared helper;
   `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `apple-icon.tsx` and a
   `favicon.ico`; and a `public/llms.txt`. The reference implementation is the
   `src/app/` of the repository you copied from.

5. **Run everything.** `npm run lint && npm run check:structure && npm run build
   && npm test`. A fresh project usually fails a handful of these on the first
   run. Fix them rather than recording them, and use `KNOWN_FINDINGS` only for
   what genuinely cannot be fixed now.

## What enforces this

Documentation nobody runs is a suggestion. These are the parts that refuse:

- `npm run lint`, ESLint.
- `npm run check:structure`, imports use the alias, components are named after
  what they export and are documented, no literal colours, no empty folders,
  every page is in the route registry.
- `npm test`, 238 browser checks across Chromium, WebKit and Gecko: the page
  renders with a clean console, the copy rules hold, contrast meets WCAG AA,
  nothing overflows at three widths, the metadata and structured data are
  present and consistent, and the sitemap tells the truth.
- `.github/workflows/checks.yml`, all four on every push and pull request, so a
  branch that breaks the standard cannot be merged without somebody seeing it.

## Keeping copies in step

When a check or a rule improves, it improves for every site. Change it in one
repository, then copy that single file to the others. The split above exists so
that this is always a copy and never a merge.
