import type { Metadata } from "next";
import { getArticles } from "@/content";
import { BlogFeed } from "@/sections/blog/BlogFeed";
import { BlogHero } from "@/sections/blog/BlogHero";
import { ClosingCta } from "@/sections/shared/ClosingCta";
import { JsonLd } from "@/seo/JsonLd";
import { blogPage, siteGraph } from "@/seo/graph";
import { SITE, openGraphFor } from "@/site";

const path = "/blog";
const title = "Blog";

const description =
  "Guides, breakdowns and the reasoning behind the social media, technology and advertising work Kalaa runs for clients every month.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: openGraphFor({ path, title: `${title} | ${SITE.name}`, description }),
};

/* The blog, as a running order. */
export default function Blog() {
  return (
    <>
      <JsonLd data={siteGraph(blogPage())} />

      <BlogHero />
      <BlogFeed articles={getArticles()} />
      <ClosingCta />
    </>
  );
}
