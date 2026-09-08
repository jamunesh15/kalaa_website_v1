"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
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
  /* Wraps rather than assuming four photographs for four capabilities, so adding a fifth capability shows a repeat instead. */
  const photo = CARD_MEDIA[index % CARD_MEDIA.length];

  /* The list variant's entrance, below `xl` where the deck does not stack. */
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
  /* Scroll-linked, and no longer spring-smoothed. */
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
        <div className="relative">
          {/*
           * The same torn sheet the blog cards are mounted on, through the wide
           * stencil because these are twice as wide as they are tall. The sage
           * has to be OPAQUE here above anywhere else: these cards overlap as
           * they stack, and a translucent sheet turns the card in front into a
           * window onto the one behind it.
           */}
          <div
            aria-hidden
            className="paper-mat-wide absolute -inset-6 bg-mat-sage"
          />

          <Card
            fill={FILLS[index % FILLS.length]}
            padding="p-4 sm:p-5"
            className="relative min-h-[26rem]"
          >
            <div className="grid min-h-[23rem] gap-5 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
              {/* Centred below `md`, where the card is one column and the copy sits under the photograph rather than beside it. */}
              <div className="flex min-w-0 flex-col justify-center p-4 text-center sm:p-6 md:text-left lg:p-8">
                <p className="text-label font-bold tracking-[0.08em] text-ink-body">
                  {capability.label}
                </p>
                <h3 className="mx-auto mt-4 max-w-[12ch] font-display text-display-l font-bold text-ink md:mx-0">
                  {capability.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[38ch] text-body text-ink-body md:mx-0">
                  {capability.summary}
                </p>
                <p className="mt-6 text-small font-medium text-ink-body">
                  {capability.includes.join(" · ")}
                </p>
              </div>

              {/* First on a phone, second from `md`. */}
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
        </div>
      </motion.article>
    </li>
  );
}
