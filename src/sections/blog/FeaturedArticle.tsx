import { ArrowButton } from "@/components/ui/ArrowButton";
import { SURFACE } from "@/components/ui/surface";
import type { Article } from "@/content/types";
import { ArticleArtwork } from "@/sections/blog/ArticleArtwork";

/*
 * The main piece, on a whole sheet of its own.
 *
 * Same corner as every card below it and every button on the site. The torn
 * sheet is the one behind, cut through the wide stencil rather than the card one
 * so the tear reads at the same size on a box two and a half times wider than it
 * is tall.
 */
export function FeaturedArticle({ item }: { item: Article }) {
  return (
    <div className="relative">
      {/* Kraft, and deliberately not the sage the grid below is mounted on. The tear cuts up to 18px into this, so the overhang has to clear that before any of it shows. */}
      <div aria-hidden className="paper-mat-wide absolute -inset-6 bg-mat" />

      <div className={`${SURFACE} relative bg-tint-butter p-5 text-ink`}>
        {/* The picture keeps its own shape rather than stretching to the copy, because its title is printed inside it. */}
        <div className="grid md:grid-cols-[0.86fr_1.14fr] md:items-center">
          <div className="order-2 flex flex-col p-2 sm:p-4 md:order-1 md:pr-6">
            <h2 className="font-display text-display-l font-bold text-ink">
              {item.title}
            </h2>

            <p className="mt-3 max-w-[44ch] text-body text-ink-body">
              {item.excerpt}
            </p>

            <div className="mt-7">
              <ArrowButton href={`/blog/${item.slug}`} width="fit" size="sm">
                Read blog
              </ArrowButton>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <ArticleArtwork
              image={item.image}
              alt={item.alt}
              sizes="(max-width: 48rem) 100vw, 36vw"
              className="rounded-token shadow-soft"
            />

            {/* The topic on tape, half on the picture and half on the paper, the same as every card below. */}
            <span className="tape-2 absolute -top-3 left-3 bg-tape/90 px-3 py-1.5 text-label font-bold uppercase text-ink">
              {item.topic}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
