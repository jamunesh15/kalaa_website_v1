import { ArrowButton } from "@/components/ui/ArrowButton";
import { ArtifactStage } from "@/components/ui/ArtifactStage";
import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/ui/SlideIn";
import { SERVICES_MEDIA } from "@/content/servicesMedia";
import { SERVICES_HERO_ARTIFACTS } from "@/content/servicesArtifacts";

/*
 * The top of the services page. The one `h1` on it.
 *
 * Two columns, copy sliding in from the left as the board arrives from the
 * right, which is the shape the home and contact pages open on. A page here
 * that opened on copy alone read as a different site.
 */
export function ServicesHero() {
  return (
    <Section fill="overflow-hidden bg-board" padding="pb-14 pt-12 lg:pb-20 lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <SlideIn from="left" className="min-w-0 text-center lg:text-left">
          <h1 className="font-display text-display-xl font-black text-ink">
            Everything we do to{" "}
            <HandAccent wrap>grow your business</HandAccent>
          </h1>

          <p className="mx-auto mt-6 max-w-[46ch] text-lead text-ink-body lg:mx-0">
            Social media and the software behind it, run as one month of work
            rather than as separate jobs. Here is what each part involves and
            what you get.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <ArrowButton href="/contact" width="fit">
              Get free strategy call
            </ArrowButton>
          </div>
        </SlideIn>

        <ArtifactStage
          media={SERVICES_MEDIA}
          pieces={SERVICES_HERO_ARTIFACTS}
          ratio={1.12}
          className="lg:-mr-10 xl:-mr-16"
          eager
        />
      </div>
    </Section>
  );
}
