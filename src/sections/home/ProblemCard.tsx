"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Card } from "@/components/ui/Card";
import type { Problem } from "@/content/types";

/* One card in the deck. */
export function ProblemCard({
  problem,
  index,
  total,
  tilt,
  deckProgress,
}: {
  problem: Problem;
  index: number;
  total: number;
  /** Degrees of in-plane lean before settling. Alternates sign down the deck. */
  tilt: number;
  /** Progress through the whole deck, for the receding half of the motion. */
  deckProgress: MotionValue<number>;
}) {
  // Typed to the element it is attached to. The list item is the thing that
  // sticks, so it is also the thing whose scroll progress matters.
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress: arrival } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });

  /* How far back this card ends up once every later card has covered it. */
  const behind = total - 1 - index;

  /* How far back a covered card ends up, and these numbers are the difference between a stack and a pile. */
  const restScale = 1 - behind * 0.02;
  const restRotateX = behind * -14;

  /* The recede starts when the next card begins its approach, not when this one lands. */
  const recedeFrom = (index + 1) / total;

  const arriveScale = useTransform(arrival, [0, 1], [0.86, 1]);
  const arriveRotateX = useTransform(arrival, [0, 1], [20, 0]);
  const arriveRotate = useTransform(arrival, [0, 1], [tilt, 0]);
  const y = useTransform(arrival, [0, 1], [90, 0]);

  const recedeScale = useTransform(deckProgress, [recedeFrom, 1], [1, restScale]);
  const recedeRotateX = useTransform(deckProgress, [recedeFrom, 1], [0, restRotateX]);

  const scale = useTransform([arriveScale, recedeScale], ([a, r]: number[]) => a * r);
  const rotateX = useTransform([arriveRotateX, recedeRotateX], ([a, r]: number[]) => a + r);

  return (
    <li
      ref={ref}
      className="stack-card pb-[70vh] last:pb-0"
      style={{ "--stack-index": index } as React.CSSProperties}
    >
      <motion.div
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotate: arriveRotate,
                scale,
                y,
                transformPerspective: 1400,
                transformOrigin: "50% 0%",
              }
        }
      >
        {/* One surface, with the picture inset inside it. */}
        <Card
          padding="p-4"
          className="border-token border-line grid min-h-96 items-stretch md:min-h-[28rem] md:grid-cols-[1fr_1fr]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="font-display text-display-m font-bold text-ink">{problem.title}</h3>
            <p className="mt-4 max-w-md text-body text-ink-body">{problem.summary}</p>
          </div>

          {/* Placeholder photography, downloaded rather than hotlinked so the page does not depend on a third party to render and so. */}
          <div className="rounded-token relative min-h-64 w-full overflow-hidden">
            <Image
              src={problem.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </Card>
      </motion.div>
    </li>
  );
}
