"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { Card, type CardFill } from "@/components/ui/Card";
import { CARD_MEDIA } from "@/content/cardMedia";
import type { Capability } from "@/content/types";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

const FILLS: readonly CardFill[] = ["butter", "sage", "peach", "cloud"];

export function CapabilityCard({
  capability,
  index,
  total,
  tilt,
  deckProgress,
  stacked,
}: {
  capability: Capability;
  index: number;
  total: number;
  tilt: number;
  deckProgress: MotionValue<number>;
  stacked: boolean;
}) {
  /*
    Wraps rather than assuming four photographs for four capabilities, so
    adding a fifth capability shows a repeat instead of crashing on undefined.
  */
  const photo = CARD_MEDIA[index % CARD_MEDIA.length];

  /*
    The list variant's entrance, below `xl` where the deck does not stack.
    The client asked for the same alternation the service cards have: one
    from the left, the next from the right. Same run and clock as those
    cards get stacked, 28% and 0.7s on the travel ease, so the two sections
    move alike on a phone. The stacked deck ignores all of this; its motion
    is the scroll-driven arrival above.
  */
  const fromLeft = index % 2 === 0;
  const offstage = { x: fromLeft ? "-28%" : "28%", opacity: 0 };
  const entrance = useReplayOnScrollDown();
  const listMotion = stacked
    ? {}
    : {
        ...entrance.handlers,
        viewport: { amount: 0.2 },
        initial: offstage,
        animate: entrance.shown ? { x: 0, opacity: 1 } : offstage,
        transition: { duration: 0.7, ease: [0.45, 0, 0.2, 1] as const },
      };

  const step = 1 / total;
  const arriveFrom = Math.max(0, index * step - 0.08);
  const arriveTo = Math.min(1, arriveFrom + 0.26);

  const direction = index % 2 === 0 ? -1 : 1;
  const entryX = index === 0 ? 0 : direction * 170;
  const entryY = index === 0 ? 0 : 560;
  /*
    **Scroll-linked, and no longer spring-smoothed. That is a measured
    performance fix.**

    Each card ran three `useSpring`s over these three values, and a spring is a
    physics simulation that keeps a frame loop alive for as long as it is
    settling. Five cards times three springs is fifteen simulations updating
    transforms on every frame the deck is anywhere near the viewport, and the
    client reported this band and the work mosaic as the two places scrolling
    felt heavy.

    The smoothing bought little here because the input is already continuous:
    `deckProgress` is the scroll position itself, so a value mapped straight off
    it moves exactly as smoothly as the reader's own scrolling. What the spring
    added was lag between the finger and the card, which is the thing that reads
    as jank rather than as easing.
  */
  const arriveRotate = useTransform(
    deckProgress,
    [arriveFrom, arriveTo],
    [index === 0 ? tilt : tilt * 1.35, tilt],
  );
  const x = useTransform(deckProgress, [arriveFrom, arriveTo], [entryX, 0]);
  const y = useTransform(deckProgress, [arriveFrom, arriveTo], [entryY, 0]);

  return (
    <li
      className={stacked ? "absolute inset-0" : ""}
      style={stacked ? { zIndex: index + 1 } : undefined}
    >
      <motion.article
        {...listMotion}
        className={stacked ? "will-change-transform" : ""}
        style={
          !stacked
            ? undefined
            : {
                rotate: arriveRotate,
                x,
                y,
                transformOrigin: "50% 50%",
              }
        }
      >
        <Card
          fill={FILLS[index % FILLS.length]}
          padding="p-4 sm:p-5"
          className="min-h-[26rem]"
        >
          <div className="grid min-h-[23rem] gap-5 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
            {/*
              Centred below `md`, where the card is one column and the copy sits
              under the photograph rather than beside it. Side by side the two
              share a left edge; stacked, a left-aligned block under a
              full-width picture reads as having slid to one side.
            */}
            <div className="flex min-w-0 flex-col justify-center p-4 text-center sm:p-6 md:text-left lg:p-8">
              <p className="text-label font-bold tracking-[0.08em] text-ink-body">
                {capability.label}
              </p>
              <h3 className="mx-auto mt-4 max-w-[12ch] font-display text-display-l font-bold text-ink md:mx-0">
                {capability.title}
              </h3>
              <p className="mx-auto mt-4 max-w-[38ch] text-body text-ink-body md:mx-0">{capability.summary}</p>
              <p className="mt-6 text-small font-medium text-ink-body">
                {capability.includes.join(" · ")}
              </p>
            </div>

            {/*
              **First on a phone, second from `md`.** The client's order for the
              stacked card is photograph, title, copy: the picture is what says
              which capability this is before a word is read, and on a phone it
              was arriving last, under two paragraphs.
            */}
            <div
              aria-hidden
              className="rounded-token relative order-first min-h-64 overflow-hidden bg-surface shadow-soft md:order-none"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 768px) 30rem, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Card>
      </motion.article>
    </li>
  );
}
