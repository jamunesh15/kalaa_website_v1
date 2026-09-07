import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getCapabilities } from "@/content";
import { CapabilityDeck } from "@/sections/home/CapabilityDeck";

/**
 * The social presence story before the direct services section.
 *
 * This uses the stacked tilted cards the client liked in the reference, adapted
 * to Kalaa's light sheet and tint system. The motion explains momentum: each
 * reason lands on top of the one before it until social presence feels like a
 * business system, not a posting habit.
 */
export function Capabilities() {
  const capabilities = getCapabilities();

  return (
    /*
      `overflow-x-clip`, not `overflow-hidden`: the stacked deck inside is
      sticky and a scroll container above it would pin nothing. Clip only
      stops the cards' sideways entrance from widening the page.
    */
    <Section id="capabilities" fill="overflow-x-clip bg-tint-violet">
      <SectionHeading
        align="center"
        title={<>Why your business needs a <HandAccent wrap>strong social presence</HandAccent></>}
        lead="Social media marketing keeps your online presence active while people check, compare, remember, and enquire through the phone in their hand."
      />

      <CapabilityDeck capabilities={capabilities} />
    </Section>
  );
}
