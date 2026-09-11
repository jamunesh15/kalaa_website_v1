/* The facts about this site that more than one file needs. */

/*
 * The canonical origin, written down rather than read from the environment.
 *
 * This was `NEXT_PUBLIC_SITE_URL` with a fallback, a regex to tolerate a
 * scheme-less value and a try/catch because a bad one failed the whole build
 * inside `new URL()`. All of that guarded a setting with exactly one correct
 * value: the site is static, has no backend and lives on one domain, so there
 * was nothing an environment could usefully say that this line does not.
 *
 * A preview deployment therefore points its canonicals at the live site, which
 * is what a preview should say anyway: the real version is over there.
 *
 * If the domain ever moves, change it here. It is one line, and it goes through
 * review like any other line rather than living in a dashboard nobody reads.
 */
const SITE_URL = "https://kalaa.io";

export const SITE = {
  name: "Kalaa",
  /* No trailing slash. */
  url: SITE_URL,
  locale: "en",
} as const;

/** Absolute URL for a route path, for canonicals, og:url and the sitemap. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

/* The share card, described once. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.name}, social media and technology growth partner`,
} as const;

/* The Open Graph block for one page. */
export function openGraphFor(options: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /**
   * The page's own share image. An article passes its cover; every page that
   * leaves it out shares the site card, so two posts never share one picture
   * by accident.
   */
  image?: { url: string; width: number; height: number; alt: string };
}) {
  return {
    type: options.type ?? ("website" as const),
    siteName: SITE.name,
    url: absoluteUrl(options.path),
    title: options.title,
    description: options.description,
    locale: "en_US",
    images: [options.image ?? OG_IMAGE],
  };
}
