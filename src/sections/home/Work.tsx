import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts, getReels } from "@/content";
import type { WorkPiece } from "@/content/types";
import { WorkWall } from "@/sections/home/WorkWall";
import type { Reel } from "@/sections/home/reelPlayerStore";

/*
 * The work, as one wall.
 *
 * Reels and posts were two sections with two headings, and they are the same
 * claim made twice: this is what the studio makes. They are one band now, with
 * the reels standing among the posts rather than penned above them. This is
 * where the nav's Work link lands.
 */
export function Work() {
  const reels = getReels().filter((piece): piece is Reel => piece.kind === "reel");
  const posts = getPosts().filter(
    (piece): piece is Extract<WorkPiece, { kind: "post" }> => piece.kind === "post",
  );

  if (reels.length === 0 && posts.length === 0) {
    return null;
  }

  return (
    <Section id="work" fill="overflow-x-clip bg-tint-sage">
      <SectionHeading
        align="center"
        title={<>Already <HandAccent>in the feed</HandAccent></>}
        lead="Made for client accounts and posted to them. Tap any reel to watch it with sound."
      />

      <WorkWall reels={reels} posts={posts} />
    </Section>
  );
}
