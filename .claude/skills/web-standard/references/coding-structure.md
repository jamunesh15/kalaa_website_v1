# Coding Structure

The goal here is navigability: **any human should be able to open the repo and
guess where a thing lives without asking.** Predictable structure is what lets
people (and AI) move fast. Consistency of layout matters more than which exact
convention you pick, pick one, then keep it everywhere.

## Table of contents

1. First step: detect, don't assume
2. Core principles
3. Folder layout (framework-agnostic)
4. Naming conventions
5. Anatomy of a component
6. Where styles live
7. Imports & the tokens entry point
8. Per-framework notes
9. Routing & URL naming
10. Definition of done

---

## 1. First step: detect, don't assume

Before creating files, look at what the project already does and match it. Check
for: `package.json` (framework + scripts), `tailwind.config.*`, `vite.config.*`,
`next.config.*`, `nuxt.config.*`, `angular.json`, a `src/components` or `app/`
folder, and any existing tokens/theme file. **Mirror the existing conventions**
, folder names, file casing, and styling approach. Only introduce the layout
below when the project is empty or has no established pattern.

## 2. Core principles

- **One source of truth for tokens.** A single tokens/theme file the whole app
  imports (see `design-tokens.md`). Everything else references it.
- **Component-driven.** UI is composed of small, reusable components from the
  catalog, not copy-pasted markup.
- **Feature-first for app code.** Group by feature/domain, not by file type, so
  related code sits together and a feature can be understood in one folder.
- **Shared UI primitives live in one place** (`components/ui/` or `ui/`) so
  Button/Input/etc. are found instantly and reused.
- **Colocation.** A component's styles, tests, and small helpers live next to
  it, not scattered across the tree.
- **Shallow over deep.** Avoid folders nested five levels deep; prefer clear,
  flat groupings.

## 3. Folder layout (framework-agnostic)

A layout that maps cleanly onto React/Vite, Next.js, Vue/Nuxt, or plain builds.
Adjust names to the framework's expectations (e.g. `app/` for Next.js App
Router) but keep the roles:

```
src/
├── styles/
│   ├── tokens.css        # the single source of truth (design tokens)
│   └── globals.css       # resets, base element styles, imports tokens
├── components/
│   ├── ui/               # design-system primitives (Button, Input, Card, Modal…)
│   │   ├── Button/
│   │   │   ├── Button.<ext>
│   │   │   ├── Button.styles.<ext>   # if styles are colocated
│   │   │   └── index.<ext>           # clean re-export
│   │   └── Input/ …
│   └── layout/           # AppShell, Navbar, Sidebar, Footer, PageContainer
├── features/             # feature-first app code
│   └── <feature>/        # e.g. auth/, dashboard/, settings/
│       ├── components/   # components specific to this feature
│       ├── hooks/        # (if applicable)
│       └── index.<ext>
├── pages/ or app/ or routes/   # routing, per the framework
├── lib/ or utils/        # framework-agnostic helpers (format, fetch client…)
├── hooks/                # shared hooks (React/Vue composables in composables/)
├── assets/               # images, icons, fonts
└── types/                # shared types (if TypeScript)
```

Key idea: **`components/ui/` = reusable design system**; **`features/` =
product-specific screens** built from those primitives. Keep that boundary clean
, a primitive never imports from a feature.

## 4. Naming conventions

Consistency beats preference, pick and hold:

- **Components:** `PascalCase` files and names, `Button`, `UserCard`,
  `LoginForm`. One primary component per file.
- **Folders:** `kebab-case` for feature folders (`user-settings/`), or match the
  framework's norm. Component folders may be `PascalCase` to match the file.
- **Hooks / composables:** `useThing`, `useToggle`, `useAuth`.
- **Utilities/functions:** `camelCase`, `formatCurrency`.
- **Constants:** `UPPER_SNAKE_CASE`.
- **CSS classes:** consistent scheme, utility classes (Tailwind) or a BEM-ish
  `block__element--modifier`. Don't mix schemes randomly in one project.
- **Files match their default export.** `Button.tsx` exports `Button`. No
  surprises.
- **Booleans read as questions:** `isOpen`, `hasError`, `canSubmit`.

## 5. Anatomy of a component

A well-formed component is small, typed (if TS), and predictable. Keep this
order top-to-bottom so any file reads the same way:

1. Imports.
2. Types/props (documented; sensible defaults).
3. The component: hooks/state first, derived values next, handlers, then the
   returned markup.
4. Styles (colocated file or utility classes), using tokens only.
5. A clean export (and an `index` re-export from the folder).

Guidelines: keep components focused (one job); lift shared logic into
hooks/utils; prefer composition (`children`/slots) over boolean-flag explosions;
props have clear names and defaults; no business logic buried in UI primitives.

## 6. Where styles live

Follow whatever the project uses; do not mix approaches:

- **Tailwind:** utility classes in markup + tokens mapped in the config; extract
  repeated clusters into a component, not into random custom CSS.
- **CSS Modules / SCSS:** `Component.module.css` colocated; classes reference
  token variables.
- **CSS-in-JS:** styled components/theme object reading token values.
- **Plain CSS:** component classes in a colocated file, tokens on `:root`.

In every case: **no raw colors/spacing/radius in components, only tokens.**

## 7. Imports & the tokens entry point

- Import the tokens/globals **once** at the app root so variables exist app-wide.
- Prefer absolute imports/aliases (`@/components/ui/Button`) over deep relative
  chains (`../../../..`). Configure the alias in the build/tsconfig.
- A folder's `index` file re-exports its public pieces so imports stay short and
  refactors don't ripple.

## 8. Per-framework notes

- **React + Vite:** `src/` as above; `main.tsx` imports `styles/globals.css`;
  primitives in `components/ui`. Composition via `children`.
- **Next.js (App Router):** use `app/` for routes; global CSS imported in
  `app/layout`; keep `components/ui` and `features/` outside `app/`. Mind
  server vs client components, primitives with interactivity are client
  components.
- **Vue / Nuxt:** SFCs (`.vue`); primitives in `components/ui`; composables in
  `composables/`; global tokens via a CSS file registered in the config. Use
  slots for composition.
- **Angular:** feature modules; shared primitives in a `ui` module; tokens in
  global styles; component-scoped styles reference the token variables.
- **Plain HTML/CSS/JS:** a `css/tokens.css` + `css/globals.css`, a `components/`
  folder of reusable partials/snippets, and consistent class naming. The same
  rules apply even without a framework.

## 9. Routing & URL naming

A new page needs a route, and the route name is part of the product. Users see
it, search engines index it, and other developers read it. Get it right the
first time, because changing a live URL later costs redirects and lost ranking.

**Match the file/route to the URL.** In file-based routers (Next.js `app/`,
Nuxt `pages/`), the folder and file names become the URL, so name them as the
final slug. In config-based routers (React Router, Vue Router, Angular), the
path string is the source of truth and the component can be named separately.
Either way, the visible URL follows the rules below.

**URL slug rules:**
- **Lowercase, hyphen-separated words:** `/user-settings`, not `/userSettings`,
  `/user_settings`, or `/UserSettings`.
- **Descriptive and specific.** The slug says what the page is: `/pricing`,
  `/blog/how-to-brew-coffee`, `/docs/getting-started`. Avoid vague names like
  `/page2`, `/new`, `/misc`, or opaque ids where a readable slug is possible.
- **Short but complete.** Drop filler words (`a`, `the`, `and`) when they add
  nothing, but keep the slug meaningful.
- **Nouns for resources; mirror the hierarchy.** URLs reflect structure:
  `/products`, `/products/trail-shoes`, `/products/trail-shoes/reviews`. A child
  page lives under its parent.
- **Consistent patterns across the site.** If it is `/blog/:slug`, use
  `/guides/:slug` too, not `/guide-detail?id=`. Pick collection names (plural for
  lists: `/posts`, `/users`) and hold the convention.
- **Stable and canonical.** No tracking junk in the canonical URL, no trailing
  spaces, consistent trailing-slash policy. Include real IDs only when needed,
  ideally as a readable slug plus id (`/products/trail-shoes-1234`).
- **Dynamic segments named clearly** in code: `[slug]`, `[productId]`,
  `:userId`, not `[x]` or `:p`.

**When you add a route, wire it everywhere (see `engineering-hygiene.md`):** add
the nav/menu link, the breadcrumb, the entry in `sitemap.xml`, and its
`<head>`/SEO metadata. When you rename or remove a route, add a 301 redirect from
the old URL and update every internal link so nothing 404s. Never leave a page
reachable only by typing the URL.

## 10. Definition of done

A UI change is "done" when: it uses tokens (no hard-coded style), it's built
from/added to the component catalog, it's responsive on mobile/tablet/desktop,
it meets the accessibility baseline, it sits in the right folder with the right
name, its route (if any) has a clean descriptive URL wired into nav, sitemap,
and SEO, and, if it introduced a new reusable component, the catalog in
`components.md` was updated to describe it.
