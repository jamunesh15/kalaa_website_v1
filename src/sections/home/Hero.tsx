import { Section } from "@/components/ui/Section";
import { HeroArtifacts } from "@/sections/home/HeroArtifacts";
import { HeroCopy } from "@/sections/home/HeroCopy";

/* The first screen. */
export function Hero() {
  return (
    <Section
      fill="hero-screen flex overflow-hidden bg-tint-sage"
      /* The hero fills the first screen: everything the viewport has left after the frame and the masthead, which is why. */
      padding="py-6 sm:py-12 lg:py-16"
      className="flex flex-col justify-center"
    >
      <div className="grid items-center gap-6 sm:gap-8 lg:h-full lg:flex-1 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-12">
        <HeroCopy />

        {/* `min-w-0` is not decorative. */}
        <div className="min-w-0">
          <HeroArtifacts />
        </div>
      </div>
    </Section>
  );
}
