"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { FOOTER_ARTIFACTS, type FooterArtifact } from "@/content/footerArtifacts";
import { FOOTER_MEDIA } from "@/content/footerMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/**
 * The four objects around the footer, arriving from the edge each one hangs
 * off.
 *
 * Same device as the hero and the about board, which is surya.website's and
 * this site's alone of the three references: artifacts travelling in from
 * every side and settling. It belongs at the foot of the page for the reason
 * it belongs at the top of it. The hero says "we make these", the board says
 * "this is what a month looks like", and this says the page is over, on paper,
 * in the same hand as the rest.
 *
 * **They arrive together, not one after another.** The delays here run 0 to
 * 0.18, which is inside the settling time of the spring, so the four read as
 * one gesture with four directions in it. The about board was staggered
 * further at one point and was rejected as pieces straggling in, which is the
 * failure this stays clear of.
 *
 * **The spring is quick, and the pieces on the bottom edge do not come from
 * below it.** They arrived on the about board's slow spring at first, the
 * note rising from 76% under the sheet, and on a phone the client reported
 * the footer as "not scrollable to the end": a reader who flicks to the last
 * screen gets there in under a second, the note is still coming up through
 * the bottom edge, clipped by the footer's `overflow-hidden`, and the page
 * reads as cut short. Measured at 375px after the change: both objects are
 * inside the edge 400ms after the end is reached and settled by 800ms.
 *
 * **Going home is instant.** The hook re-arms the whole set when a reader
 * scrolls up past the footer, and on a spring that reset is four objects
 * sliding out sideways under somebody who is moving the other way. `duration:
 * 0` makes it invisible, and the footer is off screen when it happens.
 *
 * **No shadow filter.** These arrived with their own shadows inside the alpha,
 * exactly like the about set, so the lift the hero's cutouts get would give
 * each of them a second shadow at a second angle.
 *
 * `pointer-events-none` on the layer. Every one of these overlaps the torn band
 * and two of them reach up past the colophon, and artwork that eats a click on
 * a privacy policy link is a bug nobody reports.
 */

/**
 * The spring, and it is the about board's rather than the hero's.
 *
 * The hero plays on load, to somebody waiting for the page, where a long
 * arrival is a wait. This plays to a reader who has scrolled to the bottom and
 * has nothing else to look at, so it can afford to travel.
 */
const SPRING = { type: "spring", stiffness: 70, damping: 19, mass: 1 } as const;

/** Instant on the way back, so nothing ever plays in reverse behind a reader. */
const OUT = { duration: 0 } as const;

/**
 * `from` is a percentage of the piece's own size, so one number works for the
 * camera and for a note alike.
 */
const PIECE: Variants = {
  hidden: (item: { from: { x: number; y: number }; delay: number }) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.94,
    transition: OUT,
  }),
  shown: (item: { from: { x: number; y: number }; delay: number }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { ...SPRING, delay: item.delay },
  }),
};

/**
 * The tilt is a second element, and it has to be.
 *
 * Motion overwrites an element's whole `transform`, so a wrapper animating
 * position and a rotation animating on the same node is one of them winning.
 * Each piece also arrives leaning further over than it settles, which is what
 * stops the four looking placed rather than dropped.
 */
const TILT: Variants = {
  hidden: (item: FooterArtifact) => ({ rotate: item.rotate - 10, transition: OUT }),
  shown: (item: FooterArtifact) => ({
    rotate: item.rotate,
    transition: { ...SPRING, delay: item.delay },
  }),
};

/**
 * What width this piece is actually drawn at, per breakpoint.
 *
 * One shared value for the whole set is a real bug rather than a tidy-up: every
 * piece would claim the same width, and the optimiser would serve the camera a
 * variant sized for a note. Above `lg` the sheet settles near 1400px, so a
 * piece is its percentage of that; between `sm` and `lg` it is a percentage of
 * the viewport; below `sm` the phone arrangement is wider again.
 */
function sizesFor(item: FooterArtifact) {
  const phone = item.phone?.width ?? item.width;
  return `(min-width: 1024px) ${Math.round(item.width * 14)}px, (min-width: 640px) ${item.width}vw, ${phone}vw`;
}

export function FooterArtifacts() {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.div
      {...handlers}
      className="pointer-events-none absolute inset-0 select-none"
      /*
        A tenth of the footer is enough to start them. The footer is the last
        thing on the page and a reader meets its top edge first, so waiting for
        a third of it would have the objects arriving after the reader has
        already read the colophon.
      */
      viewport={{ amount: 0.1 }}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
    >
      {FOOTER_ARTIFACTS.map((item, index) => {
        const media = FOOTER_MEDIA.find((entry) => entry.slug === item.image);
        if (!media) return null;

        return (
          <motion.div
            key={item.id}
            /*
              Coordinates go in as custom properties rather than as `left`,
              `bottom` and `width` directly, because an inline style cannot hold
              a media query and two of these four move on a phone.
            */
            className={`footer-piece absolute${item.phone === null ? " footer-piece-wide-only" : ""}`}
            style={
              {
                "--piece-left": `${item.left}%`,
                ...(item.bottom === undefined ? null : { "--piece-bottom": `${item.bottom}%` }),
                ...(item.top === undefined ? null : { "--piece-top": `${item.top}%` }),
                "--piece-width": `${item.width}%`,
                ...(item.phone
                  ? {
                      "--piece-phone-left": `${item.phone.left}%`,
                      "--piece-phone-bottom": `${item.phone.bottom}%`,
                      "--piece-phone-width": `${item.phone.width}%`,
                    }
                  : null),
                zIndex: index + 1,
              } as CSSProperties
            }
            custom={item}
            variants={PIECE}
          >
            <motion.div custom={item} variants={TILT}>
              <Image
                src={media.src}
                alt={item.alt}
                width={media.width}
                height={media.height}
                sizes={sizesFor(item)}
                className="block h-auto w-full"
                loading="lazy"
                unoptimized
              />
            </motion.div>
          </motion.div>
        );
      })}

    </motion.div>
  );
}
