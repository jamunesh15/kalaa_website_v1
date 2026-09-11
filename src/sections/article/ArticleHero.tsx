import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/ui/SlideIn";
import { FOCUS_RING, SURFACE } from "@/components/ui/surface";
import type { FullArticle } from "@/content/types";
import { ArticleArtwork } from "@/sections/blog/ArticleArtwork";

/* The day as a reader writes it, from the ISO day the content carries. UTC, so the server and the browser agree. */
function printed(day: string): string {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/*
 * The top of one article.
 *
 * The cover sits on the same torn sheet the cards on the index are mounted on,
 * through the 3:2 stencil, so arriving from a card does not feel like arriving
 * on a different site.
 *
 * A date only where the article has a real one, printed in the same words its
 * JSON-LD and the sitemap carry. The dates this blog once had were invented and
 * he took them out; a real one came back with the first article carried over
 * from the live site. No named author, at his instruction: the organisation is
 * the author in the markup, and there is no byline to print that would be true.
 *
 * The breadcrumb starts at Home because the `BreadcrumbList` beside it does,
 * and structured data may only describe what the page actually shows.
 */
export function ArticleHero({ article }: { article: FullArticle }) {
  return (
    <Section fill="overflow-x-clip bg-board" padding="pb-14 pt-10 lg:pb-20 lg:pt-14" className="px-3 md:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
        <SlideIn from="left" className="min-w-0">
          <nav aria-label="Breadcrumb" className="text-small text-ink-muted">
            <Link href="/" className={`${FOCUS_RING} rounded-token hover:text-ink`}>
              Home
            </Link>
            <span className="px-2 text-ink-sage">/</span>
            <Link href="/blog" className={`${FOCUS_RING} rounded-token hover:text-ink`}>
              Blog
            </Link>
            <span className="px-2 text-ink-sage">/</span>
            <span className="text-ink-body">{article.topic}</span>
          </nav>

          <h1 className="mt-5 max-w-[18ch] font-display text-display-xl font-black text-ink">
            {article.title}
          </h1>

          {article.published ? (
            <p className="mt-4 text-small text-ink-body">
              <time dateTime={article.published}>{printed(article.published)}</time>
            </p>
          ) : null}

          <p className="mt-6 max-w-[46ch] text-lead text-ink-body">{article.excerpt}</p>

          <p className="mt-8 font-hand text-[1.3rem] leading-snug text-ink">
            Written by the people doing the work.
          </p>
        </SlideIn>

        <SlideIn from="right" className="relative min-w-0">
          {/* The sheet behind the cover, standing out the same 24px as everywhere else. */}
          <div aria-hidden className="paper-mat-hero absolute -inset-3 bg-mat-sage md:-inset-6" />

          <ArticleArtwork
            image={article.image}
            alt={article.alt}
            sizes="(max-width: 64rem) 100vw, 40vw"
            className={`${SURFACE} relative`}
            eager
          />
        </SlideIn>
      </div>
    </Section>
  );
}
