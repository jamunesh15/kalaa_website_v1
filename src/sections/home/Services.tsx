import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getServices } from "@/content";
import { ServiceShowcase } from "@/sections/home/ServiceShowcase";

/**
 * The service showcase: cards arriving from both sides around real work in the
 * middle. It keeps Kalaa's own light palette rather than taking the reference's
 * dark theme.
 *
 * The heading is here rather than inside the showcase, and that is on purpose.
 * It is the same `SectionHeading` every other band uses, it is server-rendered
 * with the rest of the page, and it starts on the same gutter as the hero. The
 * showcase below it is the only part that needs to be a client component.
 */
export function Services() {
  const services = getServices();

  return (
    <Section
      id="services"
      fill="overflow-hidden bg-tint-cloud"
      padding="py-12 sm:py-16 lg:py-20"
    >
      <SectionHeading
        align="center"
        title={<>Services <HandAccent>We Provide</HandAccent></>}
        lead="Social media, content, ads and websites made to help people notice, trust, and enquire."
      />

      <ServiceShowcase services={services} />
    </Section>
  );
}
