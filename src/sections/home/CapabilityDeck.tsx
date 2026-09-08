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
        className={`mt-12 grid gap-16 px-6 lg:mt-16 ${reduced ? "" : "xl:hidden"}`}
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
          className="relative mt-12 hidden h-[220vh] overflow-x-clip lg:mt-16 xl:block"
        >
          <ul className="stack-stage sticky mx-auto h-[30rem] w-full max-w-5xl">
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
