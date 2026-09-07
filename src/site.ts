/* The facts about this site that more than one file needs. */
export const SITE = {
  name: "Kalaa",
  /* No trailing slash. */
  // Canonical origin for links, sitemap and social cards. Override per environment.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://kalaa.io",
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
  alt: `${SITE.name}, creative social media marketing agency`,
} as const;

/* The Open Graph block for one page. */
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
