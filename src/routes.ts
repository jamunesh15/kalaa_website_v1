/* Every public page, in one place. */

export type Route = {
  /** The URL path, exactly as a visitor sees it. */
  path: string;
  /* The day this page's content last changed, as YYYY-MM-DD. */
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
