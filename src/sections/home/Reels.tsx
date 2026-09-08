import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getReels } from "@/content";
import { ReelGrid } from "@/sections/home/ReelGrid";
import type { Reel } from "@/sections/home/reelPlayerStore";

/* The reels, in a plain grid, each one playing in its own card. This is where the nav's Work link lands. */
export function Reels() {
  const reels = getReels().filter((piece): piece is Reel => piece.kind === "reel");

  if (reels.length === 0) {
    return null;
  }

  return (
    <Section id="work" fill="overflow-x-clip">
      <SectionHeading
        align="center"
        title={<>Content that <HandAccent wrap>stands out</HandAccent></>}
        lead="Tap any reel to watch it with sound."
      />

      <ReelGrid reels={reels} />
    </Section>
  );
}
