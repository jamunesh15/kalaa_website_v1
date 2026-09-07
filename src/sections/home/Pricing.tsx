import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getPlanOffer, getPlans } from "@/content";
import { PricingPlans } from "@/sections/home/PricingPlans";

/* What it costs. */
export function Pricing() {
  const plans = getPlans();
  const offer = getPlanOffer();

  return (
    <Section id="pricing" fill="bg-tint-sage">
      <SectionHeading
        align="center"
        title={<>Plans that fit how you <HandAccent wrap>want to grow</HandAccent></>}
        lead="Monthly work, priced up front. If none of these fit, tell us what you need."
      />

      <PricingPlans plans={plans} offer={offer} />
    </Section>
  );
}
