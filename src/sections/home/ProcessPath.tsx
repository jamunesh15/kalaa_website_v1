"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import type { ProcessStep } from "@/content/types";

/* Five steps, five cards, one row, one screen. */

/* How much taller each card is than the shortest, in `--process-rise` units. */
const LIFT_STEPS = [0, 0.9, 2.2, 3.6, 4.5] as const;

/** The tallest card, so a node can be measured down from it. */
const MAX_LIFT = LIFT_STEPS[LIFT_STEPS.length - 1];

/* All in rise units. */
const TOP_PAD = 0.9;
const BAND = MAX_LIFT + 1.8;

/* The x of each node is the LEFT edge of its label, not a tenth mark. */
const COLUMN_PITCH = 20.34;
const LABEL_INSET = 1.36;

const nodeY = (lift: number) => ((TOP_PAD + MAX_LIFT - lift) / BAND) * 100;

/* Five points, one per node, and nothing beyond them. */
/* How far the first point is tucked in behind its own label. */
const START_TUCK = 2.2;

const POINTS = LIFT_STEPS.map((lift, index) => ({
  x: index * COLUMN_PITCH + LABEL_INSET + (index === 0 ? START_TUCK : 0),
  y: nodeY(lift),
}));

/* Cubic segments with both control points on the midpoint x, so the line leaves each node horizontally and arrives at the. */
const CURVE = POINTS.reduce((path, point, index) => {
  if (index === 0) return `M ${point.x} ${point.y}`;
  const previous = POINTS[index - 1];
  const middle = (previous.x + point.x) / 2;
  return `${path} C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
}, "");

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
          title={<>How we <HandAccent>grow your business</HandAccent></>}
          lead="The same five steps every month, from learning your business to sending the report."
        />
      </motion.div>

      <DesktopFlow steps={steps} />
      <MobileFlow steps={steps} />
    </motion.div>
  );
}

/* No trigger of its own. */
function DesktopFlow({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <motion.div
      className="process-flow-stage relative mt-8 hidden xl:block"
      variants={STAGE}
    >
      {/* The band is `BAND` rises tall, the same box the card tops are measured in, so the line lands on their corners. */}
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

/* The same five steps stacked. */
function MobileFlow({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className="mt-8 grid gap-4 xl:hidden">
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
