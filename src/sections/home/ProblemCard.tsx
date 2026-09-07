"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Card } from "@/components/ui/Card";
import type { Problem } from "@/content/types";

/**
 * One card in the deck.
 *
 * THE MOTION, and it is two movements rather than one. Earlier versions of this
 * file only had the first, which is why the deck read as flat rectangles
 * stacked on each other instead of as a pile receding away from the reader.
 *
 * **Arriving.** The card comes up from below leaning away in three dimensions
 * and stands up as it reaches its resting place. Driven by this card's own
 * scroll progress, so each one settles on its own approach.
 *
 * **Receding.** Once it is resting, the next card slides over it, and this one
 * scales down and tips back as that happens. This is the half that was missing.
 * In the reference the cards behind the front one are visibly smaller and still
 * bent; without it, a covered card just sits there at full size and the stack
 * has no depth. Driven by the whole deck's progress, because how far back a
 * card should be pushed depends on how many cards have arrived after it.
 *
 * The two are multiplied rather than chosen between, so a card that is still
 * arriving while the one behind it is still receding renders both.
 *
 * `transformPerspective` is what makes `rotateX` a bend instead of a squash.
 * `transformOrigin` at the top edge is what makes it hinge rather than see-saw.
 *
 * **The padding below each card is the animation's running time.** A sticky
 * card stays stuck for as long as its own box is still passing the viewport, so
 * that padding is the only thing deciding how much scrolling a card gets to
 * arrive and recede in. It was 4rem, which is a fraction of a screen, and every
 * transition was finished before a reader could see it happen. The motion was
 * never the problem; it had no room to run. 70vh gives each card most of a
 * screen, which is what the reference does by wrapping each card in a
 * full-height sticky container.
 *
 * The consequence is a long section, and that is the trade this effect makes:
 * four cards cost roughly three screens of scrolling.
 *
 * Under reduced motion nothing transforms. Checked here rather than in CSS,
 * because these values come from JavaScript and a media query cannot reach them.
 */
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

  /**
   * How far back this card ends up once every later card has covered it.
   *
   * The last card never recedes, because nothing arrives after it. The first
   * recedes the most, because three cards land on top of it.
   */
  const behind = total - 1 - index;

  /**
   * How far back a covered card ends up, and these numbers are the difference
   * between a stack and a pile.
   *
   * The first attempt used -5 degrees and 5% per card behind, which is
   * invisible: a covered card looked exactly like an uncovered one with its
   * bottom hidden. In the reference a card two places back is a band about a
   * hundred pixels tall showing nothing but its own title, which only happens
   * if it has rotated far enough to foreshorten properly under perspective.
   *
   * The scale stays gentle on purpose. Nearly all of the shrinking a reader
   * sees is the rotation doing it, and scaling as well would pull the card away
   * from the stack's edges instead of pushing it back into the screen.
   */
  const restScale = 1 - behind * 0.02;
  const restRotateX = behind * -14;

  /**
   * The recede starts when the next card begins its approach, not when this one
   * lands. Beginning it earlier makes a card shrink while the reader is still
   * reading it.
   */
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
        {/*
          One surface, with the picture inset inside it.

          A hairline edge as well as the shadow, which is a departure from the
          rule that cards on this site separate by shadow alone. That rule
          assumes a card sits on a background. Here a card sits on another card
          of the same colour, and a soft shadow between two identical whites is
          not an edge a reader can see.
        */}
        <Card
          padding="p-4"
          className="border-token border-line grid min-h-96 items-stretch md:min-h-[28rem] md:grid-cols-[1fr_1fr]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="font-display text-display-m font-bold text-ink">{problem.title}</h3>
            <p className="mt-4 max-w-md text-body text-ink-body">{problem.summary}</p>
          </div>

          {/*
            Placeholder photography, downloaded rather than hotlinked so the page
            does not depend on a third party to render and so `next/image` can
            size it. Swap these for real client work or for drawn artifacts in
            the hero's language; stock photos on an agency's own site are the
            weakest thing on it.
          */}
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
