"use client";

import type { CardFill } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/ui/SlideIn";
import type { Article } from "@/content/types";
import { ArticleCard } from "@/sections/blog/ArticleCard";

/* The rest of the blog, at the foot of one article. */

/* The same two warm papers the index lays out, so a card is a card wherever it appears. */
const FILLS: readonly CardFill[] = ["peach", "butter", "peach"];
const TAPES = ["tape-1", "tape-2", "tape-3"];

export function MoreArticles({ articles }: { articles: readonly Article[] }) {
  if (articles.length === 0) return null;

  return (
    <Section fill="overflow-x-clip bg-board" padding="py-14 lg:py-20" className="px-3 md:px-6">
      <h2 className="font-display text-display-l font-bold text-ink">More from the blog</h2>

      <SlideIn
        from="left"
        travel={96}
        className="mt-10 grid min-w-0 gap-10 will-change-transform md:grid-cols-2 md:gap-16 lg:grid-cols-3"
      >
        {articles.map((article, index) => (
          <ArticleCard
            key={article.slug}
            item={article}
            fill={FILLS[index % FILLS.length]}
            tape={TAPES[index % TAPES.length]}
          />
        ))}
      </SlideIn>
    </Section>
  );
}
