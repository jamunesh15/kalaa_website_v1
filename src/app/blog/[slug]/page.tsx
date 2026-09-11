import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_MEDIA } from "@/content/blogMedia";
import { getArticle, getArticles, getOtherArticles } from "@/content";
import { ArticleBody } from "@/sections/article/ArticleBody";
import { ArticleHero } from "@/sections/article/ArticleHero";
import { MoreArticles } from "@/sections/article/MoreArticles";
import { ClosingCta } from "@/sections/shared/ClosingCta";
import { JsonLd } from "@/seo/JsonLd";
import { articlePage, breadcrumbs, faqPage, siteGraph } from "@/seo/graph";
import { SITE, absoluteUrl, openGraphFor } from "@/site";

type Params = { params: Promise<{ slug: string }> };

/* Every article is known at build time, so every one is a static page. */
export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const path = `/blog/${article.slug}`;
  const description = article.description ?? article.excerpt;
  /* The article's own cover as its share card, so no two posts share one picture. */
  const cover = BLOG_MEDIA.find((entry) => entry.slug === article.image);
  const image = cover
    ? { url: absoluteUrl(cover.src), width: cover.width, height: cover.height, alt: article.alt }
    : undefined;

  return {
    title: article.title,
    description,
    alternates: { canonical: path },
    openGraph: openGraphFor({
      path,
      title: `${article.title} | ${SITE.name}`,
      description,
      type: "article",
      image,
    }),
    /* Declared here as well, because a page that sets `twitter` at all replaces the root's whole block. */
    twitter: { card: "summary_large_image", ...(image ? { images: [image.url] } : null) },
  };
}

/* One article, as a running order. */
export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cover = BLOG_MEDIA.find((entry) => entry.slug === article.image);

  return (
    <>
      <JsonLd
        data={siteGraph(
          articlePage({
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            image: cover?.src ?? "",
            published: article.published,
            updated: article.updated,
          }),
          /* The same three steps the breadcrumb on the page prints. */
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` },
          ]),
          ...(article.faq?.length ? [faqPage(article.faq, `/blog/${article.slug}`)] : []),
        )}
      />

      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <MoreArticles articles={getOtherArticles(article.slug)} />
      <ClosingCta />
    </>
  );
}
