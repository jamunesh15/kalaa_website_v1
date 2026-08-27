import type { MetadataRoute } from "next";
import { SITE } from "@/site";

/**
 * Indexable by default, and pointing at the sitemap.
 *
 * Blocking a path here also blocks anything under it from being fetched at all,
 * including the favicon, which is how an icon quietly disappears from search
 * results. Add a Disallow only for a route that genuinely must not be crawled.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
