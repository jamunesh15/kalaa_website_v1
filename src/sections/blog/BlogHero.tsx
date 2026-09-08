import { ArtifactStage } from "@/components/ui/ArtifactStage";
import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/ui/SlideIn";
import { BLOG_TOP_ARTIFACTS } from "@/content/blogTopArtifacts";
import { BLOG_TOP_MEDIA } from "@/content/blogTopMedia";

/* The top of the blog: what is written here, and who it is for. */
export function BlogHero() {
  return (
    <Section fill="overflow-hidden bg-board" padding="pb-12 pt-12 lg:pb-16 lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <SlideIn from="left" className="min-w-0">
          <h1 className="max-w-[16ch] font-display text-display-xl font-black text-ink">
            Marketing notes for brands that want to <HandAccent>grow</HandAccent>.
          </h1>

          <p className="mt-6 max-w-[46ch] text-lead text-ink-body">
            Guides, breakdowns, and the reasoning behind the work we run for clients every month.
          </p>
        </SlideIn>

        {/* Cut-out objects on the board, the way every other opening on this site is drawn, rather than one photograph in a frame. */}
        <ArtifactStage
          pieces={BLOG_TOP_ARTIFACTS}
          media={BLOG_TOP_MEDIA}
          ratio={1.32}
          className="lg:-mr-8 xl:-mr-14"
          eager
        />
      </div>
    </Section>
  );
}
