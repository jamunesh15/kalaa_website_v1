"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { FOOTER_ARTIFACTS, type FooterArtifact } from "@/content/footerArtifacts";
import { FOOTER_MEDIA } from "@/content/footerMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* The four objects around the footer, arriving from the edge each one hangs off. */

/* The spring, and it is the about board's rather than the hero's. */
const SPRING = { type: "spring", stiffness: 70, damping: 19, mass: 1 } as const;

/** Instant on the way back, so nothing ever plays in reverse behind a reader. */
const OUT = { duration: 0 } as const;

/* `from` is a percentage of the piece's own size, so one number works for the camera and for a note alike. */
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

/* The tilt is a second element, and it has to be. */
const TILT: Variants = {
  hidden: (item: FooterArtifact) => ({ rotate: item.rotate - 10, transition: OUT }),
  shown: (item: FooterArtifact) => ({
    rotate: item.rotate,
    transition: { ...SPRING, delay: item.delay },
  }),
};

/* What width this piece is actually drawn at, per breakpoint. */
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
      /* A tenth of the footer is enough to start them. */
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
            /* Coordinates go in as custom properties rather than as `left`, `bottom` and `width` directly, because an inline style. */
            className={`footer-piece absolute${item.phone === null ? " footer-piece-wide-only" : ""}${item.extraWideOnly ? " footer-piece-extra-wide-only" : ""}`}
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
