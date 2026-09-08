"use client";

import { useState } from "react";
import type { CardFill } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/ui/SlideIn";
import type { Article } from "@/content/types";
import { useCardColumns } from "@/motion/useCardColumns";
import { ArticleCard } from "@/sections/blog/ArticleCard";
import { EditorsNote } from "@/sections/blog/EditorsNote";
import { FeaturedArticle } from "@/sections/blog/FeaturedArticle";
import { TopicFilter } from "@/sections/blog/TopicFilter";

/* The list: the topics, the main piece, then six cards, three across and two down. */
const ALL = "All";

/* The same travel the work grids use, so one row crossing the page reads the same everywhere. */
const ROW_TRAVEL = 96;

/*
 * Two warm papers on a cool band, laid as a chequerboard so no card ever touches
 * another of its colour, sideways or down a column. Neither is the cream the
 * covers themselves are photographed on, which is what stops a card swallowing
 * the edge of its own picture.
 */
const FILLS: readonly CardFill[] = ["peach", "butter"];


/* The footer's three tape shapes, so no two strips on screen are cut the same. */
const TAPES = ["tape-1", "tape-2", "tape-3"];

export function BlogFeed({ articles }: { articles: readonly Article[] }) {
  const [topic, setTopic] = useState(ALL);
  const columns = useCardColumns();

  /* Built from the articles, so a topic can never be offered with nothing behind it. */
  const topics = [ALL, ...new Set(articles.map((article) => article.topic))];
  const shown = topic === ALL ? articles : articles.filter((article) => article.topic === topic);

  /* The lead piece is drawn on its own, and the grid holds everything after it. */
  const [featured, ...rest] = shown;

  const rows: Article[][] = [];
  for (let start = 0; start < rest.length; start += columns) {
    rows.push(rest.slice(start, start + columns));
  }

  return (
    /* `px-6` is the mat's own overhang: without it the sheets behind the outer cards are cut off by the page edge. */
    <Section fill="overflow-x-clip bg-tint-sky" padding="pb-16 pt-10 lg:pb-24 lg:pt-14" className="px-3 md:px-6">
      {/* The row was floating: a bare control under the opening with nothing holding it to the page. The written line anchors it, and it is the site's own voice. */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="font-hand text-[1.3rem] leading-none text-ink">Read by topic</p>

        <div className="min-w-0 flex-1">
          <TopicFilter topics={topics} active={topic} onSelect={setTopic} />
        </div>
      </div>

      {/* Every margin below has 24px of mat standing in it, so the numbers are the gap plus the overhang rather than the gap. */}
      {featured ? (
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.95fr)_minmax(0,0.72fr)] lg:items-center lg:gap-12">
          <SlideIn from="left" travel={ROW_TRAVEL} className="min-w-0 will-change-transform">
            <FeaturedArticle item={featured} />
          </SlideIn>

          <SlideIn from="right" travel={ROW_TRAVEL} className="min-w-0 will-change-transform">
            <EditorsNote />
          </SlideIn>
        </div>
      ) : null}

      {rows.length > 0 ? (
        <>
          <h2 className="mt-20 font-display text-display-l font-bold text-ink">Latest articles</h2>

          {/* The gap has to clear two mats, each standing 24px out of its card. */}
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16 lg:grid-cols-3">
            {rows.map((row, rowIndex) => (
              /* A subgrid row, so the cards keep the grid's columns while the row moves as one. */
              <SlideIn
                key={row[0].slug}
                from={rowIndex % 2 === 0 ? "left" : "right"}
                travel={ROW_TRAVEL}
                className="col-span-full grid min-w-0 grid-cols-subgrid gap-10 will-change-transform md:gap-16"
              >
                {row.map((item, column) => (
                  <ArticleCard
                    key={item.slug}
                    item={item}
                    fill={FILLS[(rowIndex + column) % FILLS.length]}
                    tape={TAPES[(rowIndex * columns + column) % TAPES.length]}
                  />
                ))}
              </SlideIn>
            ))}
          </div>
        </>
      ) : null}
    </Section>
  );
}
