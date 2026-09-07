"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { ABOUT_ARTIFACTS, type AboutArtifact } from "@/content/aboutArtifacts";
import { ABOUT_MEDIA } from "@/content/aboutMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* A month of Kalaa's work, arriving from every edge and settling into a board. */

/* One spring for all six. */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/* The board's pieces, arriving. */
const PIECE: Variants = {
  hidden: (item: AboutArtifact) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.9,
    transition: { duration: 0 },
  }),
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: SPRING,
  },
};

/* The tilt is a second element, and it has to be. */
const TILT: Variants = {
  hidden: (item: AboutArtifact) => ({ rotate: item.rotate - 12, transition: { duration: 0 } }),
  shown: (item: AboutArtifact) => ({ rotate: item.rotate, transition: SPRING }),
};

/* What width this piece is actually drawn at, per breakpoint. */
function sizesFor(item: AboutArtifact) {
  const phone = item.phone?.width ?? item.width;
  return `(min-width: 1024px) ${Math.round(item.width * 8)}px, (min-width: 640px) ${item.width}vw, ${phone}vw`;
}

export function AboutArtifacts() {
  const sheet = useReplayOnScrollDown();
  const objects = useReplayOnScrollDown();

  return (
    /* A fixed ratio with everything positioned by percentage inside it, so one set of coordinates serves every width above. */
    <div aria-hidden className="relative aspect-[1.2/1] w-full overflow-visible sm:aspect-[1.24/1]">
      {/* The sentinel, and it draws nothing. */}
      <motion.div
        {...objects.handlers}
        className="pointer-events-none absolute inset-x-0"
        style={{ top: "51%", height: "45%" }}
        viewport={{ amount: 0.45 }}
      />

      {ABOUT_ARTIFACTS.map((item, index) => {
        const media = ABOUT_MEDIA.find((entry) => entry.slug === item.image);
        if (!media) return null;

        /* The sheet is index 0 and watches the whole box; everything else waits for the sentinel. */
        const isSheet = index === 0;
        const shown = isSheet ? sheet.shown : objects.shown;

        return (
          <motion.div
            key={item.id}
            /* The coordinates go in as custom properties rather than as `left`, `top` and `width` directly, because an inline style. */
            className={`about-piece absolute${item.phone === null ? " about-piece-wide-only" : ""}`}
            style={
              {
                "--piece-left": `${item.left}%`,
                "--piece-top": `${item.top}%`,
                "--piece-width": `${item.width}%`,
                ...(item.phone
                  ? {
                      "--piece-phone-left": `${item.phone.left}%`,
                      "--piece-phone-top": `${item.phone.top}%`,
                      "--piece-phone-width": `${item.phone.width}%`,
                    }
                  : null),
                zIndex: index + 1,
              } as CSSProperties
            }
            {...(isSheet ? sheet.handlers : null)}
            viewport={isSheet ? { amount: 0.1 } : undefined}
            custom={item}
            variants={PIECE}
            initial="hidden"
            animate={shown ? "shown" : "hidden"}
          >
            <motion.div custom={item} variants={TILT}>
              <Image
                src={media.src}
                alt=""
                width={media.width}
                height={media.height}
                sizes={sizesFor(item)}
                className="block h-auto w-full"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "low" : "auto"}
                unoptimized
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
