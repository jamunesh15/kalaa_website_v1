import type { MetadataRoute } from "next";
import { ROUTES } from "@/routes";
import { absoluteUrl } from "@/site";

/* Built from the route registry, with the dates the registry declares. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
