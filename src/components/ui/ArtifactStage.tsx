"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import type { Artifact, ArtifactMedia } from "@/content/types";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/*
 * An arrangement of supplied artwork, arriving from the edge nearest where it
 * lands.
 *
 * One stage for every page that lays cut-out artwork on a board. It was the
 * contact page's alone until the blog needed the same thing; a second copy of
 * the spring, the tilt and the percentage positioning would have drifted from
 * this one within a week, and the drift is exactly what made the blog look like
 * a different site.
 */

/** The board's spring, which is the one every arrival on this site uses. */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/** Instant on the way back, so nothing plays in reverse behind a reader. */
const OUT = { duration: 0 } as const;

const PIECE: Variants = {
  hidden: (item: Artifact) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.94,
    transition: OUT,
  }),
  shown: (item: Artifact) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { ...SPRING, delay: item.delay },
  }),
};

/* The tilt is a second element and it has to be. */
const TILT: Variants = {
  hidden: (item: Artifact) => ({ rotate: item.rotate - 8, transition: OUT }),
  shown: (item: Artifact) => ({ rotate: item.rotate, transition: SPRING }),
};

export function ArtifactStage({
  pieces,
  media,
  ratio,
  className = "",
  eager = false,
}: {
  pieces: readonly Artifact[];
  /** The set the pieces name, as written by `npm run artifacts`. */
  media: readonly ArtifactMedia[];
  /* The box's aspect ratio, as a number. */
  ratio: number;
  className?: string;
  /* For a composition on the first screen. */
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
        const found = media.find((entry) => entry.slug === item.image);
        if (!found) return null;

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
              {/* `sizes` is per piece rather than one value for the box. */}
              <Image
                src={found.src}
                alt={item.alt}
                width={found.width}
                height={found.height}
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
