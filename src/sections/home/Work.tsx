import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getPosts, getReels } from "@/content";
import { WorkWall } from "@/sections/home/WorkWall";

/**
 * The work, and it comes straight after the price on purpose.
 *
 * A reader who has just seen three numbers has exactly one question, and it is
 * whether the work is any good. Answering it with anything other than the work
 * is a wasted screen. This is also the section CLAUDE.md was pointing at when it
 * ruled out commissioned illustration: Kalaa's product is imagery, so the reels
 * and posts are the artwork and they are shown at the ratios they were made in.
 *
 * The heading is centred. It was left first, on the reading that the mosaic is
 * not symmetric, and that was the wrong axis to measure against: the mosaic
 * runs the full rail edge to edge, so a left heading left a wide empty half
 * over a block that has no empty half of its own. Asked for centred and it is
 * the better composition.
 *
 * The heading says the work is published rather than that Kalaa is capable of
 * it. "What we make" was tried and rejected for exactly that: it describes a
 * service, and this section's whole job is that none of it is a mockup. Nothing
 * here is a claim about a result, only about where the work ended up.
 *
 * **The band is sage, and it is sage because of what sits either side of it.**
 * Work was white until it moved above Process, which is also white, and two
 * white bands touching have no boundary at all: the mosaic stopped and a field
 * of white ran on into the next heading. Process could not take a tint instead,
 * because its own cards are butter, violet, mint, peach and sky and a field in
 * any of those competes with the card wearing it. Sheet was tried on Process
 * and was worse in a way that only shows while scrolling: the masthead is
 * `bg-sheet` too, so the bar dissolved into the band passing under it.
 *
 * Sage is the site's own colour, it is nothing like the masthead, and the
 * mosaic is photographs rather than cards, so it has no surface of its own for
 * a tint to fight.
 *
 * The mosaic stays inside the section rail. An earlier build ran it past both
 * edges of the sheet, which put artwork on top of the sage frame and read as the
 * page having lost its margins rather than as a deliberate bleed.
 */
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
