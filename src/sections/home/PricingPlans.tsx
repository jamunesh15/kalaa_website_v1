"use client";

import type { SVGProps } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING } from "@/components/ui/surface";
import { Card } from "@/components/ui/Card";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import type { Plan } from "@/content/types";

/**
 * The three cards, rising into place together.
 *
 * One parent trigger with a stagger, not three `whileInView` cards. Three cards
 * sitting in one row cross the viewport threshold within a frame of each other,
 * so three independent triggers do not produce a sequence, they produce three
 * things starting at once with different easing. The parent watches, the
 * children follow it in reading order. This is the same lesson the process row
 * cost a session to learn.
 *
 * The featured card arrives FIRST, and the two beside it follow. That is the
 * one place on this page where reading order is the wrong order: the row exists
 * to point at the recommended plan, and the card that lands into an empty row
 * is the card the eye is on. Left to right, the middle card would arrive second
 * into a row that already had something in it.
 *
 * So the order is explicit per card rather than a `staggerChildren` on the
 * parent. A stagger can only count children in document order, and the middle
 * card is the second child.
 *
 * The run replays every time the reader comes back down to it, and only
 * downward: see `useReplayOnScrollDown`. Driven from intersection alone it would
 * run backwards under someone scrolling up past pricing they have already read.
 */
const ROW: Variants = {
  hidden: {},
  shown: {},
};

/**
 * Two curves, because the two jobs are different.
 *
 * The featured card is arriving: it should look decisive, so it covers most of
 * its distance early and settles. The pair either side are drifting in behind
 * it, so their distance is spent evenly and they are still moving while the
 * reader is already looking at the middle.
 */
/** The offer is Feedspace's, so the line that states it goes there. */
const FEEDSPACE_URL = "https://www.feedspace.io/";

const EASE_ARRIVE = [0.16, 1, 0.3, 1] as const;
const EASE_DRIFT = [0.33, 0, 0.2, 1] as const;

/**
 * `order` is the position in the run, not in the row: 1 for the card left of
 * the featured one, 2 for the card right of it.
 *
 * Slower than the middle, deliberately. Equal speeds would make this a stagger,
 * which reads as three cards taking turns. A fast card into an empty row with
 * two slow ones still crossing behind it reads as one card arriving and two
 * settling around it, and the eye stays on the one that stopped first.
 */
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
      /*
        `items-stretch` and `h-full` on the card together are what keep the three
        the same height when one plan's sentence wraps to three lines and another
        stops at two. The featured card is taller than its siblings by its own
        negative margin rather than by holding more content, so the difference
        survives a copy change.
      */
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

/**
 * One plan.
 *
 * The price is the largest thing in the card and the plan's name sits above it
 * at heading size, which is the reference's order. The client's own layout puts
 * the name above the price as a small uppercase label, and that is the eyebrow
 * this project rules out everywhere it has not been overruled, so the name is a
 * real heading here and nothing is lost from the content.
 *
 * One card is filled and the other two are white, which is the only difference
 * between them. Everything else, type colour included, is identical: the fill
 * alone says which plan is the recommended one, and the card also says it in
 * words, because a reader cannot learn a colour code they were never shown.
 *
 * The fill is the pale butter tint rather than the accent proper. The accent is
 * the full band at the closing ask a section further down, and the two are far
 * enough apart in value that a pale card here does not read as the same field
 * arriving twice.
 */
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

        {/*
          Three lines of room whether the sentence needs them or not, so the rule
          under it starts at the same height in all three cards. Without it the
          dividers sit at three different heights, because one plan's sentence
          wraps to three lines and the others stop at two, and three rules at
          three heights across one row reads as a layout that has come apart.
        */}
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

        {/*
          **The button is the width of its own words, not the width of the
          card.** Stretched across the card it carried a stripe of empty black
          on each side of the label, which the client read as the pricing
          buttons not matching the ones everywhere else on the site. Centred and
          sized to its label, it is the same control here as it is in the hero,
          the masthead and the footer.
        */}
        <div className="mt-auto flex flex-col items-center pt-9">
          <ArrowButton href="/contact" width="fit">
            {plan.cta}
          </ArrowButton>
          {/*
            Under its own button, which is where the client's card has it. It was
            stated once below the row first, on the rule against showing one piece
            of information three times inside one component; the client asked for
            it back in the card and an explicit instruction outranks the default.
          */}
          <p className="mt-4 text-center text-small font-semibold text-ink-body">
            {/*
              Opens in its own tab, because it leaves the site: a visitor
              reading the three plans is mid-decision, and sending them to
              another company's home page in the same tab makes the back button
              the only way back to the pricing they were comparing.

              `rel` is not optional with `target="_blank"`. Without `noopener`
              the page that opens gets a handle on this one through
              `window.opener` and can navigate it somewhere else.

              The screen reader gets told, because a new tab with no warning is
              disorienting for somebody who cannot see it happen.
            */}
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
