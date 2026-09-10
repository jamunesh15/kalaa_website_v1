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

/** The offer is Feedspace's, so the line that states it goes there. */
const FEEDSPACE_URL = "https://www.feedspace.io/";

const EASE_ARRIVE = [0.16, 1, 0.3, 1] as const;

/*
 * ONE curve for all three, and they arrive together.
 *
 * It used to be two: the featured card on a fast curve with no delay and the
 * other two drifting in behind it over 1.15s, so the row assembled around the
 * middle card. Measured at 1040, that read as broken rather than as emphasis.
 * At 1.5 seconds the featured card was at 0.89 and the other two were still at
 * ZERO; they did not finish until 3.0. A reader scrolling to the section saw
 * one card and a gap where two should be, which is exactly how it was reported,
 * three times.
 *
 * 80ms apart now, so the last card is fully in at about 0.66s. The emphasis is
 * the featured card standing proud of the row, which is a static fact a reader
 * can see at any moment, rather than a head start nobody stays still to watch.
 */
const CARD: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: order * 0.08, ease: EASE_ARRIVE },
  }),
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
    {/* The row's control. Below `lg` the cards are a column and each one
        carries its own copy instead, so this one steps aside. */}
    <BillingToggle
      terms={terms}
      value={termKey}
      onChange={setTermKey}
      className="mx-auto mt-7 hidden w-fit min-[56.25rem]:block"
    />

    <motion.ul
      initial="hidden"
      {...handlers}
      animate={shown ? "shown" : "hidden"}
      /*
       * `some`, never a fraction, and this row is why.
       *
       * A fraction is a fraction of the ELEMENT, so it only works while the
       * element is shorter than the screen. Side by side this row is about
       * 800px and a quarter of it is 200: trivially met. Stacked on a phone it
       * is 2,700px, a quarter of it is 675, and with the section heading above
       * it only about 300px is ever on screen at the moment a reader arrives.
       * The threshold was never reached and all three cards sat at opacity 0
       * under the switch, which is exactly what a reader reported: a control
       * and an empty band.
       *
       * The same 80px margin `SlideIn` uses, so a card reveals when it arrives
       * rather than when enough of its siblings do.
       */
      viewport={{ amount: "some", margin: "0px 0px -80px 0px" }}
      variants={ROW}
      /* `items-stretch` and `h-full` on the card together are what keep the three the same height when one plan's sentence runs longer. */
      /*
       * Three across from 60rem, not from `lg`.
       *
       * At 960px the content column is about 900, so a card is 283px: enough for
       * the price, the three cell stat strip and the tick list. Below that a card
       * is under 250 and the strip's three figures collide, which is why this is
       * not `md`.
       */
      /*
       * Three across from 56.25rem, and that number is measured rather than
       * chosen. The card carries a torn strip down its right edge that the copy
       * has to clear, so the usable width is the card minus about 48px. Walking
       * the widths: at 768 nine pieces of text run under the tear, the button
       * label by 27px; at 854 two still do by 3 and 4px; at 900 none do. Below
       * 900 the row is a column.
       */
      className="mt-8 grid gap-6 sm:gap-4 lg:mt-10 min-[56.25rem]:grid-cols-3 min-[56.25rem]:items-stretch lg:gap-7"
    >
      {plans.map((plan, index) => (
        <PlanCard
          key={plan.slug}
          plan={plan}
          term={term}
          terms={terms}
          termKey={termKey}
          onTerm={setTermKey}
          offer={offer}
          tone={TONES[index % TONES.length]}
          order={index}
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
  terms,
  termKey,
  onTerm,
  offer,
  tone,
  order,
}: {
  plan: Plan;
  term: BillingTerm;
  offer: string;
  tone: PlanTone;
  /** The whole set of terms, so a card can carry its own switch. */
  terms: readonly BillingTerm[];
  termKey: BillingKey;
  onTerm: (key: BillingKey) => void;
  /** Position in the run. The featured card is 0, so it lands into an empty row. */
  order: number;
}) {
  const featured = plan.featured;
  const { pay, usual } = priceFor(plan, term);
  /* Nothing to strike on the monthly term, where the two figures are the same. */
  const saves = usual > pay;

  return (
    <li className="relative min-w-0">
      {/*
       * The switch, on every card, and OUTSIDE the animated element.
       *
       * Stacked, a card is about 700px tall, so a control above the FIRST one is
       * two screens away by the time the third is on screen, and a reader has to
       * scroll back to change a price they are looking at. Every copy writes the
       * same state, so the three can never show different terms.
       *
       * Outside, because inside it inherits the card's reveal: until the card
       * arrives the switch is at opacity 0 with it, so a reader who has scrolled
       * to the heading sees a heading and an empty band with no control at all.
       * It shipped that way for one commit.
       *
       * Above the card rather than within it, because within it has to clear the
       * torn strip down the card's right edge, which leaves 198px for three
       * labels at 375 and wraps "Annual" onto a second row.
       */}
      <BillingToggle
        terms={terms}
        value={termKey}
        onChange={onTerm}
        name={`billing-${plan.slug}`}
        className="mb-3 flex w-full min-[56.25rem]:hidden"
      />

      <motion.div
        custom={order}
        variants={CARD}
        /*
         * The featured card stands a little proud of the other two rather than
         * being filled in a different colour. Two rem, not the six it was: at
         * six the row read as a chart with one bar taller than the rest.
         */
        /*
         * `h-full`, and it is load bearing.
         *
         * The row is `items-stretch`, so every `li` is the height of the tallest
         * and the card inside asks for `h-full`. This wrapper sits between them:
         * without a height of its own it collapses to its content, `h-full` on
         * the card then resolves against THAT, and the three cards came out 758,
         * 786 and 798 inside three identical 798px cells.
         *
         * ONLY where the row is a row. Stacked, an `li` has no definite height,
         * so `height: 100%` on its child is circular: the browser sized the
         * child from a height the child was supposed to define, and the offer
         * line under the button ended up 32px BELOW its own `li`, sitting on
         * the next card's switch.
         */
        className={`relative min-[56.25rem]:h-full ${featured ? "lg:-my-2" : ""}`}
      >

      <Card fill="surface" padding="" className={`h-full ${featured ? "shadow-lift" : ""}`}>
        <div
          className={`flex h-full flex-col py-6 pl-6 pb-7 sm:py-7 sm:pl-7 sm:pb-8 lg:pl-8 ${CLEAR_OF_TEAR}`}
        >
          {/* `min-h`, so a one line plan name and a two line one push the price,
              the stat strip and the ticks to the same height across the row. */}
          <div className="flex min-h-[3.75rem] items-center gap-4">
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
          {/*
           * Three lines reserved, but only once the cards are a row.
           *
           * The three summaries run to two, three and two lines depending on
           * width, which put the stat strip and everything under it at different
           * heights across the row. Reserving the tallest keeps them level.
           * Stacked, there is nothing to line up with, so the air is not spent.
           */}
          <p
            className={`text-body text-ink-body min-[56.25rem]:min-h-[5.25rem] ${
              saves ? "mt-3" : "mt-8"
            }`}
          >
            {plan.summary}
          </p>

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
      </motion.div>
    </li>
  );
}
