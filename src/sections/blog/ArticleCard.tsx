import { ArrowButton } from "@/components/ui/ArrowButton";
import { CARD_FILLS, type CardFill } from "@/components/ui/Card";
import { SURFACE } from "@/components/ui/surface";
import type { Article } from "@/content/types";
import { ArticleArtwork } from "@/sections/blog/ArticleArtwork";

/*
 * One article, cut from the photographed sheet.
 *
 * The card keeps the site's one corner, the same radius as every button. Only
 * the sheet BEHIND it is torn, which is how the results cards on the home page
 * are drawn: a clean card mounted on paper, closed on four sides here instead of
 * showing down one.
 */
export function ArticleCard({
  item,
  fill,
  tape,
}: {
  item: Article;
  /** Set by the grid, so no two cards that touch carry the same colour. */
  fill: CardFill;
  /** Which of the three tape shapes holds this one down. */
  tape: string;
}) {
  return (
    <div className="relative h-full">
      {/*
       * The site's sage, resolved to a solid colour. A tint is invisible against
       * this band, and the lead piece above carries kraft so the two rows of
       * paper are never the same sheet.
       */}
      <div aria-hidden className="paper-mat absolute -inset-3 bg-mat-sage md:-inset-6" />

      <div
        className={`${SURFACE} relative flex h-full flex-col ${CARD_FILLS[fill]} p-5 text-ink`}
      >
        <div className="relative">
          <ArticleArtwork
            image={item.image}
            alt={item.alt}
            sizes="(max-width: 48rem) 100vw, 32vw"
            className="rounded-token shadow-soft"
          />

          {/* The topic, on tape, half on the picture and half on the paper. */}
          <span
            className={`${tape} absolute -top-3 left-2 bg-tape/90 px-3 py-1.5 text-label font-bold uppercase text-ink`}
          >
            {item.topic}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-1 pt-6 pb-1">
          <h3 className="font-display text-display-m font-bold leading-snug text-ink">
            {item.title}
          </h3>

          <p className="mt-3 text-small text-ink-body">{item.excerpt}</p>

          <div className="mt-auto pt-6">
            <ArrowButton href={`/blog/${item.slug}`} width="fit" size="sm">
              Read blog
            </ArrowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
