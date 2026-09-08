import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_MEDIA } from "@/content/blogMedia";
import { getArticle, getArticles, getOtherArticles } from "@/content";
import { ArticleBody } from "@/sections/article/ArticleBody";
import { ArticleHero } from "@/sections/article/ArticleHero";
import { MoreArticles } from "@/sections/article/MoreArticles";
import { ClosingCta } from "@/sections/shared/ClosingCta";
import { JsonLd } from "@/seo/JsonLd";
import { articlePage, siteGraph } from "@/seo/graph";
import { SITE, openGraphFor } from "@/site";

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

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: openGraphFor({
      path,
      title: `${article.title} | ${SITE.name}`,
      description: article.excerpt,
      type: "article",
    }),
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
          }),
        )}
      />

      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <MoreArticles articles={getOtherArticles(article.slug)} />
      <ClosingCta />
    </>
  );
}
