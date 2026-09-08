import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getPosts } from "@/content";
import { PostWall } from "@/sections/home/PostWall";

/* The posts, as the mosaic. */
export function Posts() {
  return (
    <Section id="posts" fill="overflow-x-clip bg-tint-sage">
      <SectionHeading
        align="center"
        title={<>Already <HandAccent>in the feed</HandAccent></>}
        lead="Made for client accounts and posted to them."
      />

      <PostWall posts={getPosts()} />
    </Section>
  );
}
