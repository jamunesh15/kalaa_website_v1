import { ArrowButton } from "@/components/ui/ArrowButton";
import { SURFACE } from "@/components/ui/surface";

/*
 * The ask, beside the article rather than after it.
 *
 * It claims nothing. The middle line is the editor's note from the index, which
 * is a description of the work rather than a promise about a result.
 */
export function ArticleAside() {
  return (
    <div className="relative">
      <div aria-hidden className="paper-mat absolute -inset-3 bg-mat-sage md:-inset-6" />

      <div className={`${SURFACE} relative bg-tint-butter p-6 text-ink`}>
        <h2 className="font-display text-display-m font-bold leading-snug text-ink">
          Want this run for your brand?
        </h2>

        <p className="mt-4 text-small text-ink-body">
          We plan the month, make the posts and reels, run the ads, and read what came back.
        </p>

        <div className="mt-6">
          <ArrowButton href="/contact" width="fit" size="sm">
            Let&apos;s talk
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
