"use client";

import Image, { type StaticImageData } from "next/image";
import stripSage from "@/media/plan-strips/strip-sage.webp";
import stripButter from "@/media/plan-strips/strip-butter.webp";
import stripPeach from "@/media/plan-strips/strip-peach.webp";
import { motion, type Variants } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING } from "@/components/ui/surface";
import { Card } from "@/components/ui/Card";
import { CheckGlyph, PlanGlyph } from "@/components/ui/Glyph";
import { MarkerUnderline } from "@/components/ui/MarkerUnderline";
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

/*
 * The plan's colour, and the ONE piece of it that is a photograph.
 *
 * The card is the site's ordinary white card: same white, same corner, same
 * shadow as every other card on the site. Only the torn strip down its right
 * side is photographed, because a real tear is the one thing here that cannot be
 * drawn convincingly. An earlier version photographed the whole sheet and the
 * section went wrong in a way worth recording: cream paper with fibre across the
 * entire card reads as artificial, not as real, because nothing else on the site
 * is made of that paper.
 *
 * `scripts/plan-sheets.mjs` cuts the white half of each photograph away and
 * leaves the colour alone, on transparency, with a real torn edge on its left.
 *
 * The hue is identity, not meaning. Nothing about sage says "cheaper": the three
 * are a rotation, and the words on the card are what state the plan.
 */
type PlanTone = {
  /**
   * The torn strip, cut and graded by `scripts/plan-sheets.mjs`.
   *
   * IMPORTED, never a path under `public/`. The bundler puts a content hash in
   * the URL, so a regraded strip is a new address and no cache can serve the old
   * one. A fixed `/frames/...` path cost three rounds of "nothing changed" on
   * work that was already correct on disk, because `next dev` holds an image
   * cache in memory that outlives deleting `.next/cache/images`.
   */
  strip: StaticImageData;
  /** The disc under the plan mark and under each check. */
  tint: string;
  /** The marker stroke under the price, set to that strip's own paper. */
  marker: string;
};

const TONES: readonly PlanTone[] = [
  { strip: stripSage, tint: "bg-tint-sage", marker: "text-plan-sage" },
  { strip: stripButter, tint: "bg-tint-butter", marker: "text-plan-butter" },
  { strip: stripPeach, tint: "bg-tint-peach", marker: "text-plan-peach" },
];

/*
 * The strip's width.
 *
 * The card runs its full width underneath and the strip lies ON its right edge,
 * so the tear is what ends the card. `plan-sheets.mjs` cuts the strip's outer
 * edge straight, inside the photograph's own deckle, and reports how far right
 * the tear ever wanders: 63.3 percent of the strip on the worst of the three,
 * which the card clears by running the whole way. A ragged outer edge was tried
 * and left the band showing beside the card, so the strip read as a ribbon
 * floating next to it rather than as its edge.
 *
 * Ten percent is also the strip's own proportion of the sheet, and close to its
 * natural width at these card heights, so the tear is not squashed.
 */
const STRIP_W = "w-[10%]";

/*
 * How far the copy stays clear of the tear.
 *
 * The tear reaches its leftmost a few pixels into the strip, which is 90.6
 * percent of the way across the card. Fourteen percent of padding leaves the
 * copy ending at 86 percent, clear of it on all three.
 *
 * Written with `pl`/`py` and never the `p` shorthand, and that is not tidiness.
 * A `lg:p-8` is a variant, so Tailwind emits it AFTER an unprefixed `pr-[14%]`
 * and quietly wins: the copy then runs into the tear at exactly the width where
 * the row goes to three columns, which is the one width anybody checks it at.
 */
const CLEAR_OF_TEAR = "pr-[14%]";

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
      /* `items-stretch` and `h-full` on the card together are what keep the three the same height when one plan's sentence runs longer. */
      className="mt-12 grid gap-6 sm:gap-7 lg:mt-16 lg:grid-cols-3 lg:items-stretch"
    >
      {plans.map((plan, index) => (
        <PlanCard
          key={plan.slug}
          plan={plan}
          offer={offer}
          tone={TONES[index % TONES.length]}
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
  tone,
  order,
}: {
  plan: Plan;
  offer: string;
  tone: PlanTone;
  /** Position in the run. The featured card is 0, so it lands into an empty row. */
  order: number;
}) {
  const featured = plan.featured;

  return (
    <motion.li
      custom={order}
      variants={featured ? FEATURED_CARD : CARD}
      /*
       * The featured card stands a little proud of the other two rather than
       * being filled in a different colour. Two rem, not the six it was: at six
       * the row read as a chart with one bar taller than the rest.
       */
      className={`relative min-w-0 ${featured ? "lg:-my-2" : ""}`}
    >
      <Card fill="surface" padding="" className={`h-full ${featured ? "shadow-lift" : ""}`}>
        <div
          className={`flex h-full flex-col py-7 pl-6 pb-9 sm:py-8 sm:pl-7 sm:pb-10 lg:py-9 lg:pl-8 lg:pb-11 ${CLEAR_OF_TEAR}`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-full text-ink ${tone.tint}`}
            >
              <PlanGlyph name={plan.icon} />
            </span>
            <h3 className="min-w-0 font-display text-display-m font-bold text-ink">
              {plan.name}
            </h3>
          </div>

          {/* The stroke is under the figure and its period together, and sized by them, so it never runs past a one word price. */}
          <div className="relative mt-6 w-fit">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-[2.5rem] font-black leading-none tracking-tight text-ink sm:text-[3rem]">
                {plan.price}
              </span>
              {plan.period ? (
                <span className="text-small font-medium text-ink-body">
                  {plan.period}
                </span>
              ) : null}
            </p>
            <MarkerUnderline className={`absolute -bottom-3 left-0 w-full ${tone.marker}`} />
          </div>

          {/* Three lines of room whether the sentence needs them or not, so the rule under it starts at the same height in all three. */}
          <p className="mt-7 text-body text-ink-body lg:min-h-[5rem]">
            {plan.summary}
          </p>

          <hr className="plan-rule mt-7" />

          <ul className="mt-7 space-y-3.5">
            {plan.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-body text-ink-body"
              >
                <span
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${tone.tint}`}
                >
                  <CheckGlyph />
                </span>
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>

          {/* The button is the width of its own words, not the width of the card. */}
          <div className="mt-auto pt-9">
            <ArrowButton href="/contact" width="fit">
              {plan.cta}
            </ArrowButton>
            {/* Under its own button, which is where the client's card has it. */}
            <p className="mt-4 text-small font-semibold text-ink-body">
              {/* Opens in its own tab, because it leaves the site: a visitor reading the three plans is mid-decision, and sending them away for good is not the point. */}
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
        </div>
      </Card>

      {/*
       * The torn strip, laid OVER the card's right edge so the tear is what ends
       * the card rather than the card's own straight corner. Last in the source
       * so it paints above the card; the copy never reaches it, and it takes no
       * pointer events so it cannot sit on top of anything clickable.
       *
       * It carries the card's own corner on its right, because it IS the card's
       * right edge now and a square strip would stand proud of the rounded card
       * at both corners.
       *
       * `object-cover` rather than `fill`. These cards are half the photograph's
       * proportion, so stretching to fit doubles the frequency of the tear and
       * turns a torn edge into a zigzag. Cover keeps the tear at its own scale
       * and crops the length instead, and `object-left` puts what little
       * horizontal crop there is on the straight side rather than through the
       * tear.
       */}
      <div
        aria-hidden
        className={`rounded-r-token pointer-events-none absolute inset-y-0 right-0 overflow-hidden ${STRIP_W}`}
      >
        <Image src={tone.strip} alt="" fill sizes="6rem" className="object-cover object-left" />
      </div>
    </motion.li>
  );
}
