import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { getBillingTerms, getPlanOffer, getPlans } from "@/content";
import { PricingPlans } from "@/sections/home/PricingPlans";

/* What it costs. */
export function Pricing() {
  const plans = getPlans();
  const terms = getBillingTerms();
  const offer = getPlanOffer();

  return (
    <Section id="pricing" fill="bg-tint-sage">
      <SectionHeading
        align="center"
        title={<>Plans that fit how you <HandAccent wrap>want to grow</HandAccent></>}
        lead="Monthly work, priced up front. Buy a quarter or a year and some of those months are free."
      />

      <PricingPlans plans={plans} terms={terms} offer={offer} />

      {/*
       * The way out for the reader none of the three cards fitted. One line
       * under the row rather than a fourth card, because a card is an offer and
       * this is a question.
       *
       * The site's own button, the same one on every other section, rather than
       * the handwritten link this was: a fourth call to action that looks unlike
       * the three above it reads as decoration instead of a control.
       */}
      {/* Wraps rather than stacking outright, so the two sit on one line wherever there is room for them and only break apart on a narrow phone. */}
      <div className="mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:mt-24">
        <p className="text-center text-lead text-ink-body">
          Not sure which plan is right for you?
        </p>
        <ArrowButton href="/contact" width="fit">
          Let&apos;s talk
        </ArrowButton>
      </div>
    </Section>
  );
}
