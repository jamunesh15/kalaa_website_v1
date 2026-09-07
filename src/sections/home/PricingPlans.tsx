"use client";

import type { SVGProps } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING } from "@/components/ui/surface";
import { Card } from "@/components/ui/Card";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import type { Plan } from "@/content/types";

/* The three cards, rising into place together. */
const ROW: Variants = {
  hidden: {},
  shown: {},
};

/* Two curves, because the two jobs are different. */
/** The offer is Feedspace's, so the line that states it goes there. */
const FEEDSPACE_URL = "https://www.feedspace.io/";

const EASE_ARRIVE = [0.16, 1, 0.3, 1] as const;
const EASE_DRIFT = [0.33, 0, 0.2, 1] as const;

/* `order` is the position in the run, not in the row: 1 for the card left of the featured one, 2 for the card right of it. */
const CARD: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.15, delay: 0.14 + order * 0.1, ease: EASE_DRIFT },
  }),
};

/** First away, first to land, and the shortest time in the air. */
const FEATURED_CARD: Variants = {
  hidden: { opacity: 0, y: 56 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE_ARRIVE },
  },
};

export function PricingPlans({
  plans,
  offer,
}: {
  plans: readonly Plan[];
  offer: string;
}) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.ul
      initial="hidden"
      {...handlers}
      animate={shown ? "shown" : "hidden"}
      viewport={{ amount: 0.25 }}
      variants={ROW}
      /* `items-stretch` and `h-full` on the card together are what keep the three the same height when one plan's sentence. */
      className="mt-12 grid gap-6 sm:gap-7 lg:mt-16 lg:grid-cols-3 lg:items-stretch"
    >
      {plans.map((plan, index) => (
        <PlanCard
          key={plan.slug}
          plan={plan}
          offer={offer}
          order={plan.featured ? 0 : index === 0 ? 1 : 2}
        />
      ))}
    </motion.ul>
  );
}

/* One plan. */
function PlanCard({
  plan,
  offer,
  order,
}: {
  plan: Plan;
  offer: string;
  /** Position in the run. The featured card is 0, so it lands into an empty row. */
  order: number;
}) {
  const featured = plan.featured;

  return (
    <motion.li
      custom={order}
      variants={featured ? FEATURED_CARD : CARD}
      className={`min-w-0 ${featured ? "lg:-my-6" : ""}`}
    >
      <Card
        fill={featured ? "butter" : "surface"}
        padding="p-6 sm:p-7 lg:p-8"
        className={`flex h-full flex-col ${featured ? "shadow-lift lg:py-14" : "border-token border-line"}`}
      >
        <h3 className="font-display text-display-m font-bold text-ink">
          {plan.name}
        </h3>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-[2.5rem] font-black leading-none tracking-tight text-ink sm:text-[3rem]">
            {plan.price}
          </span>
          {plan.period ? (
            <span className="text-small font-medium text-ink-body">
              {plan.period}
            </span>
          ) : null}
        </p>

        {/* Three lines of room whether the sentence needs them or not, so the rule under it starts at the same height in all three. */}
        <p className="mt-5 text-body text-ink-body lg:min-h-[5rem]">
          {plan.summary}
        </p>

        <hr className="plan-rule mt-7" />

        <ul className="mt-7 space-y-3.5">
          {plan.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body text-ink-body"
            >
              <CheckIcon
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-ink"
              />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>

        {/* The button is the width of its own words, not the width of the card. */}
        <div className="mt-auto flex flex-col items-center pt-9">
          <ArrowButton href="/contact" width="fit">
            {plan.cta}
          </ArrowButton>
          {/* Under its own button, which is where the client's card has it. */}
          <p className="mt-4 text-center text-small font-semibold text-ink-body">
            {/* Opens in its own tab, because it leaves the site: a visitor reading the three plans is mid-decision, and sending them. */}
            <a
              href={FEEDSPACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`no-underline hover:no-underline ${FOCUS_RING}`}
            >
              {offer}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </Card>
    </motion.li>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}
