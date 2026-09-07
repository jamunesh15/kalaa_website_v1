import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getPosts, getReels } from "@/content";
import { WorkWall } from "@/sections/home/WorkWall";

/* The work, and it comes straight after the price on purpose. */
export function Work() {
  return (
    <Section id="work" fill="bg-tint-sage">
      <SectionHeading
        align="center"
        title={<>Already <HandAccent>in the feed</HandAccent></>}
        lead="Made for client accounts and posted to them."
      />

      <WorkWall reels={getReels()} posts={getPosts()} />
    </Section>
  );
}
