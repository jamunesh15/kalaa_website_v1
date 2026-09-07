import { Section } from "@/components/ui/Section";
import { HeroArtifacts } from "@/sections/home/HeroArtifacts";
import { HeroCopy } from "@/sections/home/HeroCopy";

/**
 * The first screen.
 *
 * Layout E, chosen against a study of four colour treatments and three layouts,
 * both screenshotted and looked at rather than argued about. Type hard left and
 * oversized, running toward the sheet edge. The work down the right, arriving
 * from every direction.
 *
 * The finding that settled it: the loud yellow hero read as more generic, not
 * less. Creative came from moving the type off centre and making it enormous,
 * so the colour holds still and the type and the artifacts do the shouting. A
 * centred heading over a centred paragraph over a button is the template tell,
 * whatever colour it is painted.
 *
 * Both halves animate on arrival now, in one sequence rather than two. The copy
 * lives in `HeroCopy` and the work in `HeroArtifacts`, and the reason the
 * heading inside the first one moves without fading is written there: it is the
 * element the browser measures LCP against, so it may be moved but never
 * hidden.
 *
 * This file stays a server component. It holds the section, the grid and the
 * measurements, and nothing in it needs the browser.
 */
export function Hero() {
  return (
    <Section
      fill="hero-screen flex overflow-hidden bg-tint-sage"
      /*
        The hero fills the first screen: everything the viewport has left after
        the frame and the masthead, which is why `--masthead` is a token rather
        than whatever the bar's contents happen to add up to.

        Its own padding is smaller than a normal section's and symmetric, because
        the height now comes from the screen and the block is centred inside it.
        The standard top step would push the copy off centre.
      */
      padding="py-6 sm:py-12 lg:py-16"
      className="flex flex-col justify-center"
    >
      <div className="grid items-center gap-6 sm:gap-8 lg:h-full lg:flex-1 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-12">
        <HeroCopy />

        {/*
          `min-w-0` is not decorative. A grid item defaults to `min-width: auto`,
          so without it this column refuses to shrink below its contents and
          takes the heading column with it. That failure reads as a text bug and
          has cost this project two separate "the section is cut off" reports.
        */}
        <div className="min-w-0">
          <HeroArtifacts />
        </div>
      </div>
    </Section>
  );
}
