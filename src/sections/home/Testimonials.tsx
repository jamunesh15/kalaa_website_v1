import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials, getWrittenReviews } from "@/content";
import { ReviewWall } from "@/sections/home/ReviewWall";
import { TestimonialWall } from "@/sections/home/TestimonialWall";

/*
 * What clients say, on camera.
 *
 * This was a Feedspace widget and is now the site's own. The clips, the names
 * and the roles are the same ones Feedspace held, pulled out before it was
 * removed, so nothing about the content changed: only who serves it.
 */
export function Testimonials() {
  const clips = getTestimonials();
  const written = getWrittenReviews();
  if (clips.length === 0) return null;

  return (
    <Section id="testimonials" fill="bg-tint-sage">
      {/*
       * No line under the heading.
       *
       * Three have been tried and all three were wrong in the same direction.
       * "Press play" was an instruction nobody needs. A list of sectors turned
       * four people into a market. A line in the site's own voice cannot sound
       * like feedback, because it is not feedback: the feedback is the four
       * cards below it, and every sentence added above them is the agency
       * talking over its own clients.
       *
       * The TITLE is still not settled either.
       */}
      <SectionHeading align="center" title="What our clients say" />

      <TestimonialWall items={clips} />

      {/*
       * The written reviews CONTINUE this section rather than opening their own.
       *
       * They were a band of their own with a heading over it, and a second
       * heading saying the same thing in different words is how one piece of
       * evidence becomes two weaker ones. Recorded or typed, it is all the same
       * claim by the same kind of person, so it belongs under the same heading.
       * The change of shape from the wide clip cards to the small slips is
       * enough to say the kind of evidence changed.
       */}
      <ReviewWall items={written} />
    </Section>
  );
}
