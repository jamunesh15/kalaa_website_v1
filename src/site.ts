/**
 * The facts about this site that more than one file needs.
 *
 * The canonical, og:url, the sitemap and robots.txt all have to describe the
 * same address. Reading them from here is what keeps them from drifting apart,
 * which is a failure nothing warns about: the page compiles, and crawlers are
 * quietly told two different stories about where it lives.
 */
export const SITE = {
  name: "Kalaa",
  /**
   * No trailing slash. Every consumer appends a path that starts with one, so a
   * trailing slash here produces a double slash in the canonical.
   */
  url: "https://kalaa.io",
  locale: "en",
} as const;

/** Absolute URL for a route path, for canonicals, og:url and the sitemap. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

/**
 * The share card, described once.
 *
 * `src/app/opengraph-image.tsx` renders the picture and reads its dimensions and
 * alt text from here, so the file and the tags can never disagree about what
 * they are.
 *
 * The dimensions are declared rather than left for a crawler to discover.
 * Without them the card reflows while the image loads, and some platforms give
 * up and show no image at all.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.name}, creative social media marketing agency`,
} as const;

/**
 * The Open Graph block for one page.
 *
 * This exists because Next replaces the parent `openGraph` object wholesale when
 * a page declares its own, rather than merging field by field. A page that sets
 * `openGraph` to override the title therefore silently drops the share image
 * too, and nothing warns: the page builds, and the card just renders blank when
 * somebody shares the link. Going through this helper is what stops that.
 */
export function openGraphFor(options: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}) {
  return {
    type: options.type ?? ("website" as const),
    siteName: SITE.name,
    url: absoluteUrl(options.path),
    title: options.title,
    description: options.description,
    locale: "en_US",
    images: [OG_IMAGE],
  };
}
