"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import type { ContactArtifact } from "@/content/contactArtifacts";
import { CONTACT_MEDIA } from "@/content/contactMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* An arrangement of supplied artwork, arriving from the edge nearest where it lands. */

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

/* The tilt is a second element and it has to be. */
const TILT: Variants = {
  hidden: (item: ContactArtifact) => ({ rotate: item.rotate - 8, transition: OUT }),
  shown: (item: ContactArtifact) => ({ rotate: item.rotate, transition: SPRING }),
};

export function ContactArtifacts({
  pieces,
  /* The box's aspect ratio, as a number. */
  ratio,
  className = "",
  eager = false,
}: {
  pieces: readonly ContactArtifact[];
  ratio: number;
  className?: string;
  /* For the composition on the first screen. */
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
              {/* `sizes` is per piece rather than one value for the box. */}
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
