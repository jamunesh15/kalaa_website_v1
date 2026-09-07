"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import type { ProcessStep } from "@/content/types";

/**
 * Five steps, five cards, one row, one screen.
 *
 * An earlier build laid them on a six column grid with each card spanning two,
 * so five cards came out as three and then two. That is worth naming precisely:
 * the section was not too tall because the cards were too big, it was too tall
 * because a row of five had nowhere to put the last two. A sequence that wraps
 * stops being read as a sequence, and the empty half row underneath reads as a
 * failed load.
 *
 * So the width is the constraint everything else answers to. Five cards on the
 * 1240px rail is about 215px each once the gaps and the stage inset are taken
 * out, and that number decides what a card may hold: a stage word, a title, and
 * three things the client actually receives. All of it lives in
 * `src/content/process.ts` rather than in this file, so what the section says
 * and how it is drawn stay separable.
 */

/**
 * How much taller each card is than the shortest, in `--process-rise` units.
 *
 * The cards stand on one baseline and grow to the right, so their top edges
 * climb. The curve does not run along those edges: a line parallel to five top
 * edges is read as the roof of the block rather than as a path through it, and
 * that is exactly how the version before this one looked. The curve gets a band
 * of its own above the row, and each card reaches up into it with a labelled
 * node on the line and a stem down to the card.
 *
 * Not evenly spaced. Five equal steps is a straight line, and a straight line
 * drawn with a curve command is a curve nobody can see.
 */
const LIFT_STEPS = [0, 0.9, 2.2, 3.6, 4.5] as const;

/** The tallest card, so a node can be measured down from it. */
const MAX_LIFT = LIFT_STEPS[LIFT_STEPS.length - 1];

/*
 * All in rise units. `TOP_PAD` is the clearance above the highest node so its
 * label is not clipped by its own viewBox; `BAND` is the box the curve is drawn
 * in, and the grid's own top padding is what opens that band up.
 */
const TOP_PAD = 0.9;
const BAND = MAX_LIFT + 1.8;

/*
 * The x of each node is the LEFT edge of its label, not a tenth mark. Five
 * columns with a gap between them put the column edges at multiples of
 * `(column + gap) / row`, which is 20.34% at every width this layout runs at,
 * and the label is inset by the card's own padding. Anchoring at the label's
 * left edge means the curve arrives at the label, disappears behind it, and
 * comes out higher on the other side.
 */
const COLUMN_PITCH = 20.34;
const LABEL_INSET = 1.36;

const nodeY = (lift: number) => ((TOP_PAD + MAX_LIFT - lift) / BAND) * 100;

/*
 * Five points, one per node, and nothing beyond them. A lead-in before the
 * first label and a tail past the last are line with no step on it: they read
 * as the run continuing somewhere the section does not go, and at the ends they
 * are just two loose strokes in empty space. The path now begins where the
 * first node is and stops where the last one is.
 */
/**
 * How far the first point is tucked in behind its own label.
 *
 * Every other point has line arriving from the left, so the label covers where
 * the stroke passes through it. The first has nothing arriving: the path simply
 * begins there, and it began exactly on the label's left edge, where the label's
 * rounded corner curves away from it. What showed was a small green bead poking
 * out at the badge's bottom left, which reads as a rendering fault.
 *
 * Measured rather than nudged: node one spans 1.29% to about 10.2% of the stage,
 * so starting at 3.5% is clear of the corner radius and well short of the middle,
 * which keeps the stroke's round cap inside the badge that hides it.
 */
const START_TUCK = 2.2;

const POINTS = LIFT_STEPS.map((lift, index) => ({
  x: index * COLUMN_PITCH + LABEL_INSET + (index === 0 ? START_TUCK : 0),
  y: nodeY(lift),
}));

/**
 * Cubic segments with both control points on the midpoint x, so the line leaves
 * each node horizontally and arrives at the next one horizontally. A polyline
 * through the same points is six visible kinks.
 */
const CURVE = POINTS.reduce((path, point, index) => {
  if (index === 0) return `M ${point.x} ${point.y}`;
  const previous = POINTS[index - 1];
  const middle = (previous.x + point.x) / 2;
  return `${path} C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
}, "");

/**
 * The fill is rhythm, not meaning, as everywhere else on this site: nothing is
 * encoded in which colour a card happens to be. The last one is plain surface
 * because the stage under it is palest violet at that corner and a cloud card
 * disappeared into it.
 */
const CARD_TINTS = [
  "process-flow-card-butter",
  "process-flow-card-violet",
  "process-flow-card-sage",
  "process-flow-card-peach",
  "process-flow-card-sky",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The whole run plays from one trigger, not five.
 *
 * Five cards each waiting for their own `whileInView` is not a sequence: they
 * sit in one row, so they cross the threshold within a frame of each other and
 * arrive together however carefully their delays are written. One parent with
 * `staggerChildren` is what actually produces one card after another, and it
 * fixes the order to the reading order rather than to whichever element the
 * observer happens to report first.
 */
const STAGE: Variants = {
  hidden: {},
  /*
   * No stagger between the line and the row. They are one thing happening, not
   * two: the line used to start half a second early, so it was most of the way
   * across before the first card existed and the section read as a line being
   * drawn and then some cards turning up.
   */
  shown: { transition: { delayChildren: 0.15 } },
};

const HEAD: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/**
 * The line wipes in, left to right, with `clip-path`.
 *
 * Not a `pathLength` draw-on. Motion implements that as a `stroke-dasharray`, a
 * dash array is measured in the path's own user units, and this viewBox is
 * stretched to the container by `preserveAspectRatio="none"`. It finished with
 * `stroke-dasharray: 1px 1px` on a path 120 units long, so the curve rendered
 * as five disconnected strokes: an image that looked broken, from a unit
 * mismatch. Setting `pathLength` on the element does not fix it. A clip is
 * measured in the element's own box, so the stretch cannot reach it.
 */
const LINE: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  /*
   * Linear, and this is the whole reason the line kept outrunning the cards.
   *
   * Every other reveal here uses the expo-out `EASE`, which is right for a thing
   * arriving and settling and wrong for a thing travelling: it puts about 80% of
   * the wipe into the first quarter second, so the line reached the last node
   * while card two was still fading in. The cards start at an even 0.28s apart,
   * so the only curve that tracks them is the one that spends its distance
   * evenly.
   *
   * The duration is the card run's own length: four staggers of 0.28 plus most
   * of a card's 0.95, so the wipe passes each node at about the moment that
   * node's card lands.
   */
  shown: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.75, ease: "linear" },
  },
};

/**
 * The gap between one card landing and the next starting.
 *
 * This number, not the card's own duration, is what sets the pace of the run.
 * Five cards at a 0.17s stagger is over in under a second whatever each card's
 * duration is, and the eye reads that as the row appearing rather than as five
 * steps happening in order. The whole point of the section is the sequence, so
 * the stagger is worth the wall-clock time.
 */
const ROW: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.28 } },
};

/**
 * Up and to the right, one card at a time.
 *
 * The offsets are the direction of the run itself: each card arrives from below
 * and slightly left of where it lands, so the row assembles from the bottom
 * left corner toward the top right rather than five cards fading in place.
 */
const CARD: Variants = {
  hidden: { opacity: 0, x: -18, y: 26 },
  shown: { opacity: 1, x: 0, y: 0, transition: { duration: 0.95, ease: EASE } },
};

export function ProcessPath({ steps }: { steps: readonly ProcessStep[] }) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    /*
      No panel behind this. It had a rounded, shadowed box of its own, and no
      other band on the site has one, so the section read as a slide pasted into
      the page. It sits on the section's own field like every other band now.
    */
    <motion.div
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      {...handlers}
      viewport={{ amount: 0.2 }}
    >
      {/*
        Above the row rather than beside it, and this is arithmetic rather than
        taste. A heading column took roughly a third of the rail, which left
        about 158px a card, and no card holding a title and three deliverables
        is readable at that width. Moving it up buys every card 60px.
      */}
      <motion.div variants={HEAD}>
        <SectionHeading
          align="center"
          title={<>How we <HandAccent>grow your business</HandAccent></>}
          lead="The same five steps every month, from learning your business to sending the report."
        />
      </motion.div>

      <DesktopFlow steps={steps} />
      <MobileFlow steps={steps} />
    </motion.div>
  );
}

/**
 * No trigger of its own. It inherits the variant its parent is animating to, so
 * the heading, the line and the five cards are one run rather than four
 * observers that happen to fire at similar times.
 */
function DesktopFlow({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <motion.div
      className="process-flow-stage relative mt-8 hidden xl:block"
      variants={STAGE}
    >
      {/*
        The band is `BAND` rises tall, the same box the card tops are measured
        in, so the line lands on their corners. `non-scaling-stroke` because
        `preserveAspectRatio="none"` stretches the box to the container and
        would take the stroke width with it, drawing the line thin where the
        curve is steep and thick where it is flat.
      */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        variants={LINE}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(var(--process-rise)*6.3)] w-full text-page"
      >
        <path
          d={CURVE}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>

      <motion.ol className="process-flow-grid relative z-10" variants={ROW}>
        {steps.map((step, index) => (
          <motion.li
            key={step.number}
            style={{ "--step-lift": LIFT_STEPS[index] } as CSSProperties}
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

/**
 * The same five steps stacked.
 *
 * Not the row scaled down. Five columns have nowhere to go on a narrow screen,
 * and the version that tries reads as a diagram of nothing. What has to survive
 * the breakpoint is the order, so the cards keep their numbers and stack.
 *
 * The switch is at `xl`, not `lg`, and that was measured rather than chosen.
 * Between 1024 and 1280 the rail shrinks but the column count does not, so a
 * card drops to 168px and its own copy pushes it past its `min-height`. That
 * card then stands taller than the row expects, its top rises off the curve,
 * and the node it is joined to no longer points at it. Above 1280 the rail is
 * capped by `max-w-7xl`, so every width from there up is the same 1176px and
 * the geometry holds exactly. Below it there is simply not room for five of
 * these cards.
 */
function MobileFlow({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className="mt-8 grid gap-4 xl:hidden">
      {steps.map((step, index) => (
        <MobileStep key={step.number} step={step} index={index} />
      ))}
    </ol>
  );
}

/**
 * One stacked card, with its own trigger.
 *
 * A hook per card rather than one for the list, because stacked they arrive one
 * at a time as the reader comes to them. Sharing a trigger would make five cards
 * appear together the moment the first crossed the line, which is the opposite
 * of what a sequence read on a phone should do.
 */
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

/**
 * `showBadge` is for the stacked layout only.
 *
 * On the row the number and the stage word are the node on the curve, so
 * repeating them inside the card would be the same information twice in one
 * component. Stacked, there is no curve to hang a node from, so they come back
 * into the card where they can still be read.
 */
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
    <article
      className={`process-flow-card ${CARD_TINTS[index] ?? CARD_TINTS[0]}`}
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
  );
}
