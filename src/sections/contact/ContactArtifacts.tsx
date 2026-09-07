"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import type { ContactArtifact } from "@/content/contactArtifacts";
import { CONTACT_MEDIA } from "@/content/contactMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/**
 * An arrangement of supplied artwork, arriving from the edge nearest where it
 * lands.
 *
 * The device is surya.website's and this site already uses it twice, in the
 * hero and on the about board. It is used again here rather than invented for
 * this page, because a third arrival behaves like the two a reader has already
 * seen instead of introducing a fourth idea on the least designed page of the
 * site.
 *
 * **One component for both arrangements on this page.** They differ only in
 * their pieces and the shape of the box that holds them, and two files that
 * differ by a constant is how two things drift into behaving differently.
 *
 * The pieces are NOT `aria-hidden`. Each one carries handwriting that exists
 * nowhere else on the page, so each carries real alt text. That is the same
 * rule the impact cards follow.
 */

/** The board's spring, which is the one every arrival on this site uses. */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/** Instant on the way back, so nothing plays in reverse behind a reader. */
const OUT = { duration: 0 } as const;

const PIECE: Variants = {
  hidden: (item: ContactArtifact) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.94,
    transition: OUT,
  }),
  shown: (item: ContactArtifact) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { ...SPRING, delay: item.delay },
  }),
};

/**
 * The tilt is a second element and it has to be. Motion overwrites an
 * element's whole `transform`, so a wrapper animating position and a rotation
 * on the same node is one of them winning.
 */
const TILT: Variants = {
  hidden: (item: ContactArtifact) => ({ rotate: item.rotate - 8, transition: OUT }),
  shown: (item: ContactArtifact) => ({ rotate: item.rotate, transition: SPRING }),
};

export function ContactArtifacts({
  pieces,
  /**
   * The box's aspect ratio, as a number.
   *
   * **An inline style rather than an `aspect-[..]` class, and that is a bug
   * fix.** Tailwind finds classes by scanning source text, and a value passed
   * in as a prop is a complete string in the caller's file, so in principle it
   * is found. In practice one of the two on this page compiled and the other
   * did not, and a box with no height lets six absolutely positioned
   * photographs fall out of it at their natural size, across the section below
   * and off the side of the page. A number cannot be missed by a scanner.
   */
  ratio,
  className = "",
  eager = false,
}: {
  pieces: readonly ContactArtifact[];
  ratio: number;
  className?: string;
  /**
   * For the composition on the first screen. `next/image` lazy-loads by
   * default, and the hero still life is above the fold at every width, so
   * lazy there only delays the largest paint; `performance.spec.ts` flags
   * exactly that. The lower compositions stay lazy.
   */
  eager?: boolean;
}) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.div
      {...handlers}
      className={`relative w-full ${className}`}
      style={{ aspectRatio: ratio }}
      viewport={{ amount: 0.3 }}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
    >
      {pieces.map((item, index) => {
        const media = CONTACT_MEDIA.find((entry) => entry.slug === item.image);
        if (!media) return null;

        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={
              {
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: `${item.width}%`,
                zIndex: index + 1,
              } as CSSProperties
            }
            custom={item}
            variants={PIECE}
          >
            <motion.div custom={item} variants={TILT}>
              {/*
                `sizes` is per piece rather than one value for the box. One
                shared value is a real bug and not a small one: every piece
                claims the same width, so the optimiser serves the largest of
                them a variant sized for the smallest and its handwriting turns
                to mush.
              */}
              <Image
                src={media.src}
                alt={item.alt}
                width={media.width}
                height={media.height}
                sizes={`(min-width: 1024px) ${Math.round(item.width * 6)}px, ${item.width}vw`}
                loading={eager ? "eager" : undefined}
                className="block h-auto w-full"
                unoptimized
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
