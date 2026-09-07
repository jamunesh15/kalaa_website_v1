"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { IMPACT_CARDS, IMPACT_NOTE, type ImpactArtifact } from "@/content/impactArtifacts";
import { IMPACT_MEDIA } from "@/content/impactMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* The impact artifacts, arriving. */

/* The about board's spring, not the hero's. */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/* The arrival and the reset. */
const PIECE: Variants = {
  hidden: (item: ImpactArtifact) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.94,
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
  hidden: (item: ImpactArtifact) => ({ rotate: item.rotate - 4, transition: { duration: 0 } }),
  shown: (item: ImpactArtifact) => ({ rotate: item.rotate, transition: SPRING }),
};

function media(slug: string) {
  return IMPACT_MEDIA.find((entry) => entry.slug === slug);
}

/* The two by two grid of results. */
export function ImpactCards() {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.ul
      {...handlers}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
      viewport={{ amount: 0.3 }}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
    >
      {IMPACT_CARDS.map((item) => {
        const file = media(item.image);
        if (!file) return null;

        return (
          <motion.li key={item.id} className="min-w-0" custom={item} variants={PIECE}>
            <motion.div custom={item} variants={TILT}>
              <Image
                src={file.src}
                alt={item.alt}
                width={file.width}
                height={file.height}
                /* Two cards to a row inside a column that runs to about 700px, so a card is drawn near 340px and wants roughly double. */
                sizes="(min-width: 1280px) 22rem, (min-width: 640px) 44vw, 90vw"
                className="block h-auto w-full"
                loading="lazy"
                unoptimized
              />
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/** The clipped note, on its own watcher because it sits in the other column. */
export function ImpactNote() {
  const { shown, handlers } = useReplayOnScrollDown();
  const file = media(IMPACT_NOTE.image);
  if (!file) return null;

  return (
    <motion.div
      {...handlers}
      className="max-w-[30rem]"
      viewport={{ amount: 0.4 }}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      custom={IMPACT_NOTE}
      variants={PIECE}
    >
      <motion.div custom={IMPACT_NOTE} variants={TILT}>
        <Image
          src={file.src}
          alt={IMPACT_NOTE.alt}
          width={file.width}
          height={file.height}
          sizes="(min-width: 1280px) 30rem, 90vw"
          className="block h-auto w-full"
          loading="lazy"
          unoptimized
        />
      </motion.div>
    </motion.div>
  );
}
