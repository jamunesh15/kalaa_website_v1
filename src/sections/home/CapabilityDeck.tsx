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

  /*
   * The switch waits for mount, and that is a hydration fix rather than a
   * nicety. This component returns two different element trees, a plain list
   * for reduced motion and a pinned stack for everyone else, and it chose
   * between them during render. `useReducedMotion` cannot know the preference
   * on the server, so the server always sent the stack and a browser with the
   * preference set wanted the list: React found a `ul` where it had been given
   * a `div` and threw the page away and rebuilt it on the client.
   *
   * A tag disagreeing is the one version of this that no amount of MotionConfig
   * can fix, because the difference is in the markup rather than in the
   * animation. So the first client render matches the server by construction,
   * and the swap happens immediately after, once the preference is knowable.
   * `useSyncExternalStore` rather than a state flag set in an effect: it is the
   * one hook that is allowed to return a different value on the server than on
   * the client, and it says so in its signature, with the server snapshot as
   * its own argument.
   */
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

  /*
   * The plain list is always rendered. What changes is where it is VISIBLE.
   *
   * The pinned stack was the only thing the server ever sent, at every width,
   * because the swap to the list could not happen until the client knew the
   * motion preference. On a phone that meant the first thing delivered was five
   * cards lying on top of one another: the responsive suite reported four pairs
   * of overlapping text at 375px, and it was right. The client rebuilt it a beat
   * later, which hid the problem from anyone watching rather than fixing it.
   *
   * Width is a question CSS can answer during server rendering and the motion
   * preference is not, so they are answered separately. Below `xl` the list is
   * what shows, from the first byte, with no JavaScript involved. Above it, the
   * stack shows until the preference is known and then the list takes over at
   * every width.
   */
  return (
    <>
      <ul className={`mt-12 grid gap-5 lg:mt-16 ${reduced ? "" : "xl:hidden"}`}>
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
