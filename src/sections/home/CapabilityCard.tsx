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
  /* Named rather than taken by position, so reordering the capabilities cannot pair a photograph with another one's alt text. */
  const photo = CARD_MEDIA.find((media) => media.slug === capability.image);

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
            className="paper-mat-wide absolute -inset-3 bg-mat-sage md:-inset-6"
          />

          {/*
           * The minimum heights start at `md`. Below it the card is one column,
           * so a floor written for two columns side by side only padded the
           * bottom of an already tall stack.
           */}
          <Card
            fill={FILLS[index % FILLS.length]}
            padding="p-4 sm:p-5"
            className="relative md:min-h-[26rem]"
          >
            <div className="grid gap-5 md:min-h-[23rem] md:grid-cols-[0.9fr_1.1fr] md:gap-8">
              {/* Left aligned at every width. Centred multi-line copy is harder to read, and on a phone it was a ragged column against a wide card. */}
              <div className="flex min-w-0 flex-col justify-center p-2 sm:p-6 lg:p-8">
                <p className="text-label font-bold tracking-[0.08em] text-ink-body">
                  {capability.label}
                </p>
                <h3 className="mt-4 max-w-[12ch] font-display text-display-l font-bold text-ink">
                  {capability.title}
                </h3>
                <p className="mt-4 max-w-[38ch] text-body text-ink-body">
                  {capability.summary}
                </p>
                <p className="mt-6 text-small font-medium text-ink-body">
                  {capability.includes.join(" · ")}
                </p>
              </div>

              {/*
               * First on a phone, second from `md`. The team's own photographs,
               * so they carry alt text rather than being hidden as decoration.
               * `focus` keeps faces in frame: the photographs are portrait and
               * the frame changes shape with the width.
               */}
              <div className="rounded-token relative order-first min-h-52 overflow-hidden bg-surface shadow-soft md:order-none md:min-h-64">
                {photo ? (
                  <Image
                    src={photo.src}
                    alt={capability.imageAlt}
                    fill
                    /* The frame's measured widths: 524px at `xl`, 453 at `lg`,
                       295 at `md`, 251 on a 375px phone. Understating them made
                       the optimiser send a file narrower than the frame. */
                    sizes="(min-width: 1280px) 33rem, (min-width: 1024px) 29rem, (min-width: 768px) 19rem, 70vw"
                    quality={90}
                    className="object-cover"
                    style={{ objectPosition: photo.focus }}
                  />
                ) : null}
              </div>
            </div>
          </Card>
        </div>
      </motion.article>
    </li>
  );
}
