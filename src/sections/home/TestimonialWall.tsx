"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PlayerGlyph } from "@/components/ui/Glyph";
import { SlideIn } from "@/components/ui/SlideIn";
import { Stars } from "@/components/ui/Stars";
import { FOCUS_RING } from "@/components/ui/surface";
import type { Testimonial } from "@/content/types";

/*
 * The video testimonials: one client to a row, hung alternately off the left and
 * the right of the page.
 *
 * Two by two put four statements on screen at once, so a reader met them as a
 * block and read none of them. One to a row gives each client the page for the
 * length of a scroll, and the alternation is what stops four rows reading as a
 * list: the card, the clip inside it and the paper behind it all swap sides
 * together, so the eye crosses the page on every row.
 *
 * The list still clips horizontally and its padding is still the paper's
 * overhang, so the torn edge shows on all four sides and nothing a card does can
 * widen the page.
 *
 * The written and WhatsApp reviews are NOT here. They are a different kind of
 * evidence and get their own section.
 */
/*
 * The sheet alternates, sage then kraft, and stands 28px out of its card.
 *
 * Sage on a sage band is a tint away from its own background, so that sheet
 * depends on the width to be seen at all: at 16px it read as a hairline and the
 * kraft one beside it looked like a different device. At 28px both read, and the
 * pair is what stops four rows being the same stamp four times.
 */
const MATS = ["bg-mat-sage", "bg-mat-kraft"] as const;

/*
 * The cards rise where they are. They do not arrive from the sides.
 *
 * A sideways entrance on a full width row pulls the eye across the page on
 * every card, and it is the same objection the work wall settled: a row that
 * travels in from off the page is a row a reader watches instead of reads.
 * These are statements from clients and they should simply appear.
 *
 * It is also the cheap one. Each card sits on a torn sheet cut with
 * `mask-image`, and translating a masked element is free while rotating or
 * scaling one re-rasterises the mask every frame.
 */
const RISE = 32;

export function TestimonialWall({ items }: { items: readonly Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-12 flex flex-col gap-16 overflow-x-clip px-5 sm:gap-20 sm:px-7 lg:mt-16 lg:gap-24">
      {items.map((item, index) => {
        /* Odd rows hang off the right, and everything about them follows. */
        const right = index % 2 === 1;

        return (
          <li
            key={item.slug}
            className={`w-full min-w-0 sm:w-[92%] lg:w-[76%] ${right ? "sm:self-end" : "sm:self-start"}`}
          >
            <SlideIn from="up" travel={RISE}>
              <ClipCard item={item} mat={MATS[index % MATS.length]} flipped={right} />
            </SlideIn>
          </li>
        );
      })}
    </ul>
  );
}

/* One client on camera. Nothing downloads until somebody presses play. */
function ClipCard({
  item,
  mat,
  flipped,
}: {
  item: Testimonial;
  mat: string;
  /** The clip sits on the right instead, so the row hangs off that edge. */
  flipped: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  /* What he wrote, or what he said. Both are his; neither is ours. */
  const words = item.quote ?? item.spoken;

  return (
    <div className="relative">
      {/* The torn sheet behind the card. The list's padding is this overhang. */}
      <div aria-hidden className={`paper-mat absolute -inset-5 sm:-inset-7 ${mat}`} />

      <div className="relative overflow-hidden rounded-token bg-surface shadow-soft">
        {/*
         * Every card is the SAME height, and that is a fixed height rather than
         * a minimum.
         *
         * A minimum let the card grow with its quote, so three lines from one
         * client and six from another made two cards 120px apart, stacked one
         * above the other where the difference is the first thing you see. The
         * height is now the one the longest of the four needs, and the quote is
         * set at a size that fits inside it.
         *
         * The clip is wide and the card is not tall, and those pull against each
         * other: 20rem of width at the source's own 9:16 would stand the card at
         * 35rem and leave the panel beside it half empty. So the box is short of
         * the source's ratio and `object-cover` crops it, about a fifth of the
         * frame, half off the top and half off the bottom. These are people
         * sitting square to a camera with room over their heads, so that comes
         * off the ceiling and the desk. The play badge sits at the foot of the
         * clip for the same reason: centred, it lands on the face.
         */}
        <div
          className={`grid sm:h-[20rem] sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-stretch lg:h-[26rem] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] ${
            flipped ? "sm:[direction:rtl]" : ""
          }`}
        >
          <div className="relative aspect-[4/5] bg-ink [direction:ltr] sm:aspect-auto">
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover"
              poster={item.poster}
              /* `none`, so scrolling past four clips downloads no video at all. */
              preload="none"
              playsInline
              controls={started}
              onPlay={() => setStarted(true)}
            >
              <source src={item.mp4} type="video/mp4" />
            </video>

            {started ? null : (
              <button
                type="button"
                onClick={() => void video.current?.play()}
                aria-label={`Play the testimonial from ${item.name}`}
                className={`absolute inset-0 grid cursor-pointer items-end justify-items-center pb-6 ${FOCUS_RING}`}
              >
                {/* Round, and at the foot of the clip: the same badge the reel
                    tiles use, because it is the same gesture on the same thing. */}
                <span
                  aria-hidden
                  className="grid size-14 place-items-center rounded-full bg-surface text-ink shadow-lift"
                >
                  <PlayerGlyph name="play" size={22} />
                </span>
              </button>
            )}
          </div>

          {/*
           * The panel carries what this person actually said.
           *
           * One of the four wrote his in English. The other three spoke, and
           * their words are carried over from the transcript of their own
           * recording and labelled as carried over. Nothing here is written for
           * them: an agency writing the sentence under a client's face is the
           * one thing a testimonial cannot be.
           *
           * The three blocks are spread across the clip's height rather than
           * centred in it, so the panel is composed at the card's real size
           * instead of leaving a band of air under a short line.
           */}
          <figcaption className="flex flex-col justify-between gap-6 p-6 text-left [direction:ltr] lg:p-9">
            <Stars rating={item.rating} />

            {words ? (
              <blockquote className="font-display text-display-m font-bold text-ink">
                &ldquo;{words}&rdquo;
              </blockquote>
            ) : (
              <p className="font-display text-display-m font-bold text-ink">
                {item.company ?? item.name}
              </p>
            )}

            <div className="flex items-center gap-3">
              {item.avatar ? (
                <Image
                  src={item.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-token object-cover"
                />
              ) : null}
              <div className="min-w-0">
                <p className="text-small font-bold leading-tight text-ink">{item.name}</p>
                <p className="mt-0.5 text-label leading-tight text-ink-muted">
                  {[item.role, item.company].filter(Boolean).join(", ") || "Client"}
                </p>
              </div>
            </div>
          </figcaption>
        </div>
      </div>
    </div>
  );
}
