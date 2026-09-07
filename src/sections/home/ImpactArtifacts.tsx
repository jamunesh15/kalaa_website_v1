"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { IMPACT_CARDS, IMPACT_NOTE, type ImpactArtifact } from "@/content/impactArtifacts";
import { IMPACT_MEDIA } from "@/content/impactMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/**
 * The impact artifacts, arriving.
 *
 * Same device as the hero and the about board, and the same rules, because the
 * three of them are one gesture repeated rather than three effects. Each piece
 * travels in from the edge nearest where it lands, they arrive together rather
 * than in sequence, and going back is instant.
 *
 * **The four cards share one trigger, and the note has its own.** They are in
 * different columns of the section, so one watcher covering both would fire on
 * whichever crossed the threshold first and play the other somewhere nobody is
 * looking. Two watchers, each on the thing it animates.
 *
 * **Nothing here is `aria-hidden`, which is the difference from the other two
 * boards.** Those are pictures of work and the page says what it means in real
 * text beside them. These carry the figures themselves, so hiding them would
 * delete the section's content for anyone not looking at it. The alt text is in
 * `impactArtifacts.ts`, on the same line as the file it describes.
 */

/**
 * The about board's spring, not the hero's.
 *
 * Settling time goes as the square root of mass over stiffness, which puts this
 * at 0.202 against the hero's 0.131. The hero plays on load, against a visitor
 * waiting for the page. This plays when a reader has scrolled to it and is
 * looking straight at it, so the arrival is the thing they are watching rather
 * than something in the way of it. One number for all three boards from here.
 */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/**
 * The arrival and the reset.
 *
 * **Going back is instant and that is a bug fix rather than a shortcut.** The
 * hook re-arms a board when the reader scrolls up past it, so it can play again
 * on the way back down. On a spring, re-arming animates every piece home over a
 * full second, off screen, under a reader who is already moving away. On the
 * about board that showed up as a ghost sheet floating over the top of the
 * section. `duration: 0` makes the reset invisible.
 */
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

/**
 * The tilt is a second element, and it has to be.
 *
 * Motion writes an element's whole `transform`, so a wrapper carrying position
 * and a rotation on the same node is one of them winning. The angles here are
 * smaller than the hero's, a degree or two rather than five: these are cards
 * with type on them, and type that leans is read as leaning before it is read
 * as words.
 */
const TILT: Variants = {
  hidden: (item: ImpactArtifact) => ({ rotate: item.rotate - 4, transition: { duration: 0 } }),
  shown: (item: ImpactArtifact) => ({ rotate: item.rotate, transition: SPRING }),
};

function media(slug: string) {
  return IMPACT_MEDIA.find((entry) => entry.slug === slug);
}

/**
 * The two by two grid of results.
 *
 * A real grid rather than a percentage-positioned box, which is what the hero
 * and about boards use. Those are scattered compositions where the arrangement
 * is the design; this is four cards of the same kind in rows, and a grid is
 * what that is. It also means the phone layout is one column with no second set
 * of coordinates to keep in step.
 */
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
                /*
                  Two cards to a row inside a column that runs to about 700px,
                  so a card is drawn near 340px and wants roughly double that
                  for a 2x screen. Left unsaid the optimiser assumes the full
                  viewport and serves four times the bytes needed.
                */
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
