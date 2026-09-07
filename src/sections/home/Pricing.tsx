import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getPlanOffer, getPlans } from "@/content";
import { PricingPlans } from "@/sections/home/PricingPlans";

/**
 * What it costs.
 *
 * The band is pale sage, the hero's own field returning at the foot of the page,
 * with one butter card standing in it. A neutral grey band was tried first and
 * rejected on sight: it is the one tint on the palette that reads cold, and next
 * to a sage frame it looked like a section borrowed from another site.
 *
 * Process above is the white sheet and the closing ask below is the full butter
 * band, so this band has to be neither of them or the boundary disappears.
 *
 * The heading is centred because the three cards under it are symmetric and run
 * the full rail, which is the rule `SectionHeading` documents. A left heading
 * over a symmetric block leaves a wide empty half beside it.
 *
 * The offer line sits inside each card under its own button, which is where the
 * client's own layout has it. It was stated once below the row first, on the
 * rule against showing one piece of information three times inside one
 * component; the client asked for it in the card and said so explicitly.
 */
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
