"use client";

import { useReducedMotion, useScroll } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import type { Capability } from "@/content/types";
import { CapabilityCard } from "@/sections/home/CapabilityCard";

const TILT = 3.2;

export function CapabilityDeck({
  capabilities,
}: {
  capabilities: readonly Capability[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  /* The switch waits for mount, and that is a hydration fix rather than a nicety. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const reduced = mounted && prefersReduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end 80%"],
  });

  /* The plain list is always rendered. */
  return (
    <>
      {/* `gap-16` and `px-6` clear the mat's overhang: at `gap-5` two sheets collide, and without the padding the outer edges are clipped by the band. */}
      <ul
        className={`mt-12 grid gap-10 px-3 md:gap-16 md:px-6 lg:mt-16 ${reduced ? "" : "lg:hidden"}`}
      >
        {capabilities.map((capability, index) => (
          <CapabilityCard
            key={capability.slug}
            capability={capability}
            index={index}
            total={capabilities.length}
            tilt={index % 2 === 0 ? -TILT : TILT}
            deckProgress={scrollYProgress}
            stacked={false}
          />
        ))}
      </ul>

      {reduced ? null : (
        <div
          ref={ref}
          /*
           * From `lg`, not `xl`.
           *
           * The stage is `w-full max-w-5xl`, so it was already built to adapt;
           * `xl` just meant a 1109px laptop got the plain stack while a 1280px
           * one got the deck, for no reason either screen could tell.
           */
          className="relative mt-12 hidden h-[220vh] overflow-x-clip lg:mt-16 lg:block"
        >
          {/*
             * Narrower stage below `xl`, and this is what makes the deck usable
             * there at all.
             *
             * Each card enters rotated, so it needs slack either side of the
             * stage or its corner is cut by the section's own clip. At 1440 a
             * 1024px stage sits in ~1400 of content and has it; at 1109 it does
             * not, and the incoming card's heading came in as "ay in memory".
             * A 896px stage restores the margin the rotation swings into.
             */}
            <ul className="stack-stage sticky mx-auto h-[30rem] w-full max-w-4xl xl:max-w-5xl">
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={capability.slug}
                capability={capability}
                index={index}
                total={capabilities.length}
                tilt={index % 2 === 0 ? -TILT : TILT}
                deckProgress={scrollYProgress}
                stacked
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
