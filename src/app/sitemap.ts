import type { MetadataRoute } from "next";
import { ROUTES } from "@/routes";
import { absoluteUrl } from "@/site";

/**
 * Built from the route registry, with the dates the registry declares.
 *
 * Never stamp these with `new Date()`. A sitemap that reports every page as
 * modified at build time compiles perfectly and is worse than having no lastmod
 * at all: Google drops the signal for the whole site once it stops matching what
 * really changed. See `references/seo.md`, "lastmod is a claim about one page,
 * not a build timestamp".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
