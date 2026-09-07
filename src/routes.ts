/**
 * Every public page, in one place.
 *
 * This exists so a route is named once rather than in the sitemap, the nav, the
 * tests and each page's metadata separately. `lastModified` here is a claim
 * about the page itself, so it changes only when that page's content changes.
 * See `.claude/skills/web-standard/references/seo.md` under "lastmod is a
 * claim about one page, not a build timestamp".
 *
 * Adding a page? Add it here. The sitemap is built from this list, the browser
 * tests iterate it, and a test fails if a page exists under `src/app` without an
 * entry, so forgetting is caught rather than shipped.
 */

export type Route = {
  /** The URL path, exactly as a visitor sees it. */
  path: string;
  /**
   * The day this page's content last changed, as YYYY-MM-DD.
   *
   * Update it when you change what the page says, and leave every other entry
   * alone. Never derive it from the build, the file mtime, or an unrelated
   * commit: a crawler stops trusting the field for the whole site once it stops
   * matching what really changed.
   */
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const ROUTES: Route[] = [
  {
    path: "/",
    // Questions section added, Work moved above Process, hero headline rewritten.
    lastModified: "2026-09-02",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/contact",
    // Rebuilt in the new design: the three channels as cards over the opening
    // band, the corrected studio address, and the services as an index.
    lastModified: "2026-09-06",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy-policy",
    // The date this page states in its own copy. The page reads it from here, so
    // the two cannot drift apart.
    lastModified: "2026-08-16",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

/** Look up one route, for a page that needs to print its own date. */
export function routeFor(path: string): Route {
  const route = ROUTES.find((entry) => entry.path === path);
  if (!route) throw new Error(`No route registered for "${path}". Add it to src/routes.ts.`);
  return route;
}
