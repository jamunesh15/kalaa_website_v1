import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getServices } from "@/content";
import { ServiceShowcase } from "@/sections/home/ServiceShowcase";

/* The service showcase: cards arriving from both sides around real work in the middle. */
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
