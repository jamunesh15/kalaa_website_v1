"use client";

import Image, { type StaticImageData } from "next/image";
import stripSage from "@/media/plan-strips/strip-sage.webp";
import stripButter from "@/media/plan-strips/strip-butter.webp";
import stripPeach from "@/media/plan-strips/strip-peach.webp";
import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING } from "@/components/ui/surface";
import { Card } from "@/components/ui/Card";
import { CheckGlyph, PlanGlyph } from "@/components/ui/Glyph";
import { MarkerUnderline } from "@/components/ui/MarkerUnderline";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import { formatRupees, priceFor } from "@/content/pricing";
import { BillingToggle } from "@/sections/home/BillingToggle";
import type { BillingKey, BillingTerm, Plan } from "@/content/types";

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
 * The strip's width, which FOLLOWS ITS HEIGHT rather than being a share of the
 * card.
 *
 * The artwork is 98 by 1410. A fixed ten percent of the card was fine while the
 * card was one height and went wrong the moment it was not: at 938px tall the
 * box was 39 by 938, which is one to twenty four against the artwork's one to
 * fourteen, so `object-cover` blew the tear up 1.7 times its own scale and cut
 * 26px off it. A stretched deckle stops reading as paper, which is exactly what
 * the client called out.
 *
 * Given the artwork's own ratio the box crops nothing and stretches nothing at
 * any card height, which is the same rule `PAPER = 1.8` enforces for the torn
 * sheets: one scale everywhere, whatever the box.
 *
 * The cap is a guard rather than a size. A card tall enough to need more than a
 * fifth of its own width in tear has a content problem, and the copy's padding
 * below is what it would eat.
 */
const STRIP_W = "aspect-[98/1410] w-auto max-w-[18%]";

/*
 * How far the copy stays clear of the tear.
 *
 * Twenty percent, against a strip that reaches about sixteen at the heights
 * these cards run to, so the copy stops clear of it with room for the tear to
 * wander left.
 *
 * Written with `pl`/`py` and never the `p` shorthand, and that is not tidiness.
 * A `lg:p-8` is a variant, so Tailwind emits it AFTER an unprefixed `pr-[20%]`
 * and quietly wins: the copy then runs into the tear at exactly the width where
 * the row goes to three columns, which is the one width anybody checks it at.
 */
const CLEAR_OF_TEAR = "pr-[20%]";

export function PricingPlans({
  plans,
  terms,
  offer,
}: {
  plans: readonly Plan[];
  terms: readonly BillingTerm[];
  offer: string;
}) {
  const { shown, handlers } = useReplayOnScrollDown();
  /* The row owns the term, so the three cards cannot disagree about what a
     reader is comparing. */
  const [termKey, setTermKey] = useState<BillingKey>("monthly");
  const term = terms.find((entry) => entry.key === termKey) ?? terms[0];

  return (
    <>
    <BillingToggle terms={terms} value={termKey} onChange={setTermKey} />

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
          term={term}
          offer={offer}
          tone={TONES[index % TONES.length]}
          order={plan.featured ? 0 : index === 0 ? 1 : 2}
        />
      ))}
    </motion.ul>
    </>
  );
}

/*
 * The three figures a reader actually compares, pulled out of the list.
 *
 * The reference puts them in a panel above the ticks and it earns its place: the
 * counts are what differ between the plans and the rest of the list is nearly
 * identical down the row, so a reader scanning ticks is reading the same words
 * three times.
 */
function PlanStats({ plan, term, tint }: { plan: Plan; term: BillingTerm; tint: string }) {
  const cells = [
    { figure: plan.reelsPerMonth, label: "Reels a month" },
    { figure: plan.shoots, label: plan.shoots === 1 ? "Shoot visit" : "Shoot visits" },
    { figure: term.monthsLabel, label: term.months === 1 ? "Month" : "Months" },
  ];

  return (
    /*
     * ONE panel with hairlines through it, not three cells with gaps between
     * them, which is how the reference draws it and it is the better read: three
     * separate boxes make three claims, one box with dividers makes a single
     * claim about what a month contains.
     */
    <dl className={`mt-6 grid grid-cols-3 rounded-token px-1 py-3 ${tint}`}>
      {cells.map((cell, index) => (
        <div
          key={cell.label}
          className={`px-2 text-center ${index > 0 ? "border-l-token border-ink/10" : ""}`}
        >
          <dd className="font-display text-display-m font-bold leading-none text-ink">
            {cell.figure}
          </dd>
          <dt className="mt-1.5 text-label text-ink-muted">{cell.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/* One plan. */
function PlanCard({
  plan,
  term,
  offer,
  tone,
  order,
}: {
  plan: Plan;
  term: BillingTerm;
  offer: string;
  tone: PlanTone;
  /** Position in the run. The featured card is 0, so it lands into an empty row. */
  order: number;
}) {
  const featured = plan.featured;
  const { pay, usual } = priceFor(plan, term);
  /* Nothing to strike on the monthly term, where the two figures are the same. */
  const saves = usual > pay;

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
          className={`flex h-full flex-col py-6 pl-6 pb-7 sm:py-7 sm:pl-7 sm:pb-8 lg:pl-8 ${CLEAR_OF_TEAR}`}
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

          {/* The stroke is under the figure and its period together, and sized by them, so it never runs past a short price. */}
          <div className="relative mt-6 w-fit">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="sr-only">You pay </span>
              {/* A step down from the 3rem this was. The figures are longer now
                  that a year is priced: at 3rem the widest of them wrapped its
                  period onto a second line and that card alone lost a row. */}
              <span className="font-display text-[2rem] font-black leading-none tracking-tight text-ink sm:text-[2.5rem]">
                {formatRupees(pay)}
              </span>
              <span className="text-small font-medium text-ink-body">{term.period}</span>
            </p>
            <MarkerUnderline className={`absolute -bottom-3 left-0 w-full ${tone.marker}`} />
          </div>

          {/*
           * What the saving IS, stated in rupees, next to what it is a saving
           * against. A struck figure on its own was not landing: it sat above the
           * price in the body face at body size, so it read as a footnote rather
           * than as the old price, and nothing on the card ever said how much
           * came off.
           *
           * The struck figure is therefore in the display face beside the price,
           * and the amount is spelled out. It is arithmetic rather than a claim:
           * three months of a 30,000 plan is 90,000 and the quarter is 60,000, so
           * a reader can check it. No percentage, which is a number you have to
           * be trusted on.
           *
           * The butter is a field here, not a control, which is the one thing the
           * accent is allowed to be. It appears only on a term that actually
           * saves, so it is real state rather than a badge on every card.
           */}
          {/* No reserved height when a term saves nothing. The toggle belongs to
              the row, so all three cards are always showing this line or all
              three are hiding it, and a 2rem box held open for nobody left a gap
              under the monthly price. The summary carries the spacing instead. */}
          {saves ? (
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <s className="font-display text-lead font-bold text-ink-muted">
                <span className="sr-only">Usual price </span>
                {formatRupees(usual)}
              </s>
              <span className="rounded-token bg-accent px-2.5 py-1 text-small font-bold text-on-accent">
                Save {formatRupees(usual - pay)}
              </span>
            </p>
          ) : null}

          {/* The marker under the price hangs 0.75rem below its box, so the
              clear space here is 0.75rem less than the margin says. */}
          <p className={`text-body text-ink-body ${saves ? "mt-3" : "mt-8"}`}>{plan.summary}</p>

          <PlanStats plan={plan} term={term} tint={tone.tint} />

          <ul className="mt-6 space-y-3">
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
          <div className="mt-auto pt-7">
            <ArrowButton href="/contact" width="fit">
              {plan.cta}
            </ArrowButton>
            {/* Under its own button, which is where the client's card has it.
                Centring it was tried and reverted: ranged left it lines up with
                the button and with every other line in the card. */}
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
