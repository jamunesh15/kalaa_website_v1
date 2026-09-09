"use client";

import { motion } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { HeroTypedLine } from "@/sections/home/HeroTypedLine";

/* The left half of the hero, arriving from the left. */

/* Heavier and slower than the artifacts' spring. */
const SPRING = { type: "spring", stiffness: 52, damping: 18, mass: 1.1 } as const;

/* The arrival, as variants, so it can play more than once. */
const REVEAL = {
  hidden: { opacity: 0, x: -80, transition: { duration: 0 } },
  shown: {
    opacity: 1,
    x: 0,
    transition: { ...SPRING, opacity: { duration: 0.5, ease: "easeOut" } },
  },
} as const;

export function HeroCopy() {
  return (
    <motion.div
      className="min-w-0 text-center lg:flex lg:flex-col lg:justify-center lg:text-left"
      variants={REVEAL}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* The headline is outcome-led, which is a change of kind rather than of wording. */}

      {/* The text column is the wider of the two, and that is measured rather than chosen: line one needs 620px at this size and. */}
      {/* The tagline, chosen by him on 2026-09-07 after Chirag asked for the technology-first angle. One sentence a line, held whole. */}
      <h1 className="hero-headline mt-4 font-display text-display-xl font-black text-ink">
        <span className="whitespace-nowrap">Technology plans it.</span>
        <br />
        <span className="whitespace-nowrap">Social media shows it.</span>
        <br />
        <span className="whitespace-nowrap">
          {/* The marker and the hand on one word, which is the only place the two devices are allowed to meet. */}
          <span className="inline-block rounded-token bg-accent px-[0.16em] pt-[0.1em] pb-[0.16em] font-hand text-[1.12em] font-bold leading-[0.93]">
            Revenue
          </span>{" "}
          proves it.
        </span>
      </h1>

      <HeroTypedLine />

      {/* The positioning line, chosen by him from a set on 2026-09-07 after Chirag asked for the technology-first angle. */}
      <p className="mx-auto mt-2 max-w-[46ch] text-body text-ink-body sm:mt-3 lg:mx-0">
        We plan the month, make the work, run the ads, and report what it did.
      </p>

      {/* The same arrow button the about section ends on, at the client's instruction, so the two calls to action on the first. */}
      {/* Centred below `lg` along with the rest of the column, at the client's ask: on a phone the copy is alone on the screen. */}
      <div className="mt-6 flex justify-center lg:justify-start">
        <ArrowButton href="/contact" width="fit">
          Get free strategy call
        </ArrowButton>
      </div>
    </motion.div>
  );
}
