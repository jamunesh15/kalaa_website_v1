"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import type { ProcessStep } from "@/content/types";

/* Five steps, five cards, one row, one screen. */

/*
 * The climb, in `--process-rise` units, evenly spaced so every step is the same
 * size. The card reads its DROP, how far it hangs below the highest one, so the
 * last card sits at zero and the first hangs the full climb.
 */
const LIFT_STEPS = [0, 1.2, 2.4, 3.6, 4.8] as const;
const MAX_LIFT = LIFT_STEPS[LIFT_STEPS.length - 1];

/*
 * The line is MEASURED off the labels, not predicted from them.
 *
 * It used to be arithmetic: a column pitch as a percentage, a band height in
 * rise units, and each node's y derived from how far its card was lifted. That
 * carried two assumptions and both broke. The pitch assumed the row's gap, so
 * the line stopped landing on the nodes the moment the gap grew to make room
 * for the torn sheets. The y assumed all five cards were the same height, and
 * the third card's heading runs to three lines, so the line passed 26px under
 * its label.
 *
 * Reading the labels' own boxes has neither assumption, and it costs one
 * observer on a section that is already a client component.
 */
/** The vertical part of an element's OWN transform, in pixels. */
function labelShift(element: HTMLElement) {
  const { transform } = getComputedStyle(element);
  if (!transform || transform === "none") return 0;
  const matrix = new DOMMatrixReadOnly(transform);
  return matrix.f;
}

function offsetWithin(element: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  /* `offsetParent` is null inside a `display: none` subtree, which this row is
     below `xl`, so a walk that never reaches the stage has measured nothing. */
  return node === root ? { x, y } : null;
}

/*
 * One curve per gap: out of the right edge of a label and into the left edge of
 * the next, at the client's drawing.
 *
 * **The line never crosses a card.** That is the whole constraint and it took
 * three goes. Through the label CENTRES it cut deep into each card. Curving
 * straight to the label's left EDGE still cut 23.8px in, because the label
 * starts 1rem inside its card, so the curve was still climbing when it crossed
 * the card's left edge.
 *
 * The curve therefore finishes at the CARD's left edge, where it has reached the
 * card's own top, and a straight run carries it the last 1rem into the label
 * along that top edge. Every point is then on or above a card, never in one.
 *
 * It still reads as one line rather than four marks, because the labels are
 * opaque and sit above it: each segment disappears under one label and comes out
 * of the next.
 */
type Step = {
  readonly labelLeft: number;
  readonly labelRight: number;
  readonly cardLeft: number;
  readonly y: number;
};

function curveBetween(steps: readonly Step[]) {
  const segments: string[] = [];
  for (let index = 1; index < steps.length; index += 1) {
    const from = steps[index - 1];
    const to = steps[index];
    /* Both control points on the midpoint x, so the line leaves one label
       horizontally and arrives at the next card's edge horizontally. */
    const middle = (from.labelRight + to.cardLeft) / 2;
    segments.push(
      `M ${from.labelRight} ${from.y}` +
        ` C ${middle} ${from.y}, ${middle} ${to.y}, ${to.cardLeft} ${to.y}` +
        ` L ${to.labelLeft} ${to.y}`,
    );
  }
  return segments.join(" ");
}

/* The fill is rhythm, not meaning, as everywhere else on this site: nothing is encoded in which colour a card happens to. */
const CARD_TINTS = [
  "process-flow-card-butter",
  "process-flow-card-violet",
  "process-flow-card-sage",
  "process-flow-card-peach",
  "process-flow-card-sky",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/* The whole run plays from one trigger, not five. */
const STAGE: Variants = {
  hidden: {},
  /* No stagger between the line and the row. */
  shown: { transition: { delayChildren: 0.15 } },
};

const HEAD: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/* The line wipes in, left to right, with `clip-path`. */
const LINE: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  /* Linear, and this is the whole reason the line kept outrunning the cards. */
  shown: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.75, ease: "linear" },
  },
};

/* The gap between one card landing and the next starting. */
const ROW: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.28 } },
};

/* Up and to the right, one card at a time. */
const CARD: Variants = {
  hidden: { opacity: 0, x: -18, y: 26 },
  shown: { opacity: 1, x: 0, y: 0, transition: { duration: 0.95, ease: EASE } },
};

export function ProcessPath({ steps }: { steps: readonly ProcessStep[] }) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    /* No panel behind this. */
    <motion.div
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      {...handlers}
      viewport={{ amount: 0.2 }}
    >
      {/* Above the row rather than beside it, and this is arithmetic rather than taste. */}
      <motion.div variants={HEAD}>
        <SectionHeading
          align="center"
          title={
            <>
              How we <HandAccent>grow your business</HandAccent>
            </>
          }
          lead="The same five steps every month, from learning your business to reporting what it returned. Websites and software run alongside them."
        />
      </motion.div>

      <DesktopFlow steps={steps} />
      <MobileFlow steps={steps} />
    </motion.div>
  );
}

/* No trigger of its own. */
function DesktopFlow({ steps }: { steps: readonly ProcessStep[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState({ d: "", w: 0, h: 0 });

  /* `useEffect`, not `useLayoutEffect`: this is a client component that is still
     server rendered, and the line is decorative and below the fold. */
  useEffect(() => {
    const node = stage.current;
    if (!node) return;

    const measure = () => {
      const box = node.getBoundingClientRect();
      const labels = [...node.querySelectorAll(".process-node")];
      if (labels.length < 2 || box.width === 0) return;

      /*
       * Layout offsets, NOT bounding rects.
       *
       * Each card enters on a transform, `x: -18, y: 26`, and a rect read while
       * that is in flight bakes the offset into the path: the line then sits 18
       * left and 26 low of every label for good. `offsetLeft` and `offsetTop`
       * are the laid-out position and no transform touches them.
       */
      const cards = [...node.querySelectorAll(".process-flow-card")];
      if (cards.length !== labels.length) return;

      const measured: Step[] = [];
      for (const [index, label] of labels.entries()) {
        const element = label as HTMLElement;
        const at = offsetWithin(element, node);
        const card = offsetWithin(cards[index] as HTMLElement, node);
        if (!at || !card) return;
        measured.push({
          labelLeft: at.x,
          labelRight: at.x + element.offsetWidth,
          cardLeft: card.x,
          /*
           * The label's VISUAL centre: its layout top, plus its own transform,
           * plus half its height.
           *
           * `process-node` is laid out at `top: 0`, the card's top edge, and then
           * raised by a `translateY`. `offsetTop` reports the layout box and
           * cannot see a transform, and taking it at face value once put the
           * whole line 23px below where the labels are drawn, which is precisely
           * how far it then cut into every card. Reading the element's own
           * matrix means changing that `translateY` cannot break the line again.
           */
          y: at.y + labelShift(element) + element.offsetHeight / 2,
        });
      }
      setLine({ d: curveBetween(measured), w: box.width, h: box.height });
    };

    measure();
    /* The headings wrap differently once the real face has loaded, and a wrapped
       heading changes the card height the label is measured off. */
    void document.fonts?.ready.then(measure);

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [steps]);

  return (
    <motion.div
      ref={stage}
      className="process-flow-stage relative mt-8 hidden xl:block"
      variants={STAGE}
    >
      {/* Drawn in the stage's own pixels, over the whole stage, so a point is a
          label's measured centre rather than a percentage of a guessed box. */}
      <motion.svg
        aria-hidden="true"
        viewBox={`0 0 ${line.w} ${line.h}`}
        preserveAspectRatio="none"
        variants={LINE}
        /*
         * ABOVE the row, not under it.
         *
         * Each card stands higher than the one before, so a segment climbing to
         * the next label crosses that card's torn top corner. Underneath, the
         * paper cut every segment in half and the line read as broken, which is
         * what the client saw. On top it lies across the corner like a thread
         * laid on the sheets. It starts and ends exactly on a label's edge, so
         * it never covers a word.
         */
        className="pointer-events-none absolute inset-0 z-20 h-full w-full text-page"
      >
        {line.d ? (
          <path
            d={line.d}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
      </motion.svg>

      {/* No `z-index` here. It would open a stacking context and cap the labels
          inside it, and they have to sit above the line at z-20. */}
      <motion.ol className="process-flow-grid relative" variants={ROW}>
        {steps.map((step, index) => (
          <motion.li
            key={step.number}
            style={{ "--step-drop": MAX_LIFT - LIFT_STEPS[index] } as CSSProperties}
            variants={CARD}
          >
            <span className="process-node">
              <span className="process-node-number">{step.number}</span>
              {step.tag}
            </span>
            <ProcessCard step={step} index={index} />
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
}

/* The same five steps stacked. */
function MobileFlow({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    /*
     * The same five steps, in as many columns as the width can carry.
     *
     * The flow row needs 1280px to give each of five steps 206px, so below `xl`
     * this is the layout. One column was right on a phone and wrong on
     * everything else: at 854 it spent all 758px on one card and a reader met
     * one step per screen with a band of empty page between each.
     *
     * `gap-12`, not `gap-4`: the sheet under each card stands 1rem out of it, so
     * the gap is the one you want plus the overhang on both sides.
     */
    <ol className="mt-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
      {steps.map((step, index) => (
        <MobileStep key={step.number} step={step} index={index} />
      ))}
    </ol>
  );
}

/* One stacked card, with its own trigger. */
function MobileStep({ step, index }: { step: ProcessStep; index: number }) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.li
      {...handlers}
      viewport={{ amount: 0.35 }}
      initial={{ opacity: 0, y: 16 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <ProcessCard step={step} index={index} showBadge />
    </motion.li>
  );
}

/* `showBadge` is for the stacked layout only. */
function ProcessCard({
  step,
  index,
  showBadge = false,
}: {
  step: ProcessStep;
  index: number;
  showBadge?: boolean;
}) {
  return (
    /*
     * The card is mounted on a torn sheet, the same device the blog cards, the
     * capability deck and the service list use. The sheet is the photograph in
     * `public/frames/`, used as a mask, so the colour is still a token.
     *
     * Kraft rather than sage: these five cards are already tinted butter,
     * violet, sage, peach and sky, and a sage sheet behind a sage card loses its
     * edge while a sage sheet behind a peach one goes muddy. The kraft sits
     * under all five as paper rather than as another colour in the set.
     */
    <div className="relative">
      <div aria-hidden className="paper-mat absolute -inset-4 bg-mat-kraft" />

      <article
        className={`process-flow-card relative ${CARD_TINTS[index] ?? CARD_TINTS[0]}`}
      >
        <div>
          {showBadge ? (
            <div className="mb-3 flex items-center gap-2.5">
              <span className="process-flow-number">{step.number}</span>
              <p className="font-display text-label font-bold text-ink/50">
                {step.tag}
              </p>
            </div>
          ) : null}
          <h3 className="font-display text-display-m font-bold text-ink">
            {step.title}
          </h3>
        </div>

        <div className="process-detail">
          <ul className="flex flex-1 flex-col">
            {step.deliverables.map((item) => (
              <li key={item} className="process-detail-line">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto border-t-token border-line pt-3 text-small font-bold text-ink-body">
            {step.outcome}
          </p>
        </div>
      </article>
    </div>
  );
}
