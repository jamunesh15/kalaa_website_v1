/* The facts about this site that more than one file needs. */
const DEFAULT_URL = "https://kalaa.io";

// Canonical origin for links, sitemap and social cards, from NEXT_PUBLIC_SITE_URL.
// Empty, missing, scheme-less or unparseable values all fall back to the default,
// because a bad value here fails the whole build inside `new URL()`.
function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_URL;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_URL;
  }
}

export const SITE = {
  name: "Kalaa",
  /* No trailing slash. */
  url: siteUrl(),
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
