"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/**
 * A block that arrives from one side.
 *
 * The site's artwork already travels in from the edge nearest where it lands.
 * This is the same gesture for a block of words or a frame, so a section built
 * from two halves can have them meet in the middle rather than fading up
 * together, which is what the client asked for on the contact page. Every
 * copy block on that page uses it: hero, brief, ways and studio.
 *
 * **Same hook, same spring, same instant reset as every other arrival here.**
 * It plays on the way down and re-arms only once the reader has scrolled up
 * past it, so nothing ever runs backwards under somebody who is leaving.
 *
 * **The section that holds one has to clip.** The hidden state sits 44px to one
 * side, so on a phone, where the column already fills the width, that 44px is
 * off the edge of the document and the page grows a horizontal scrollbar before
 * the arrival plays. `overflow-hidden` on the band is the same guard every
 * artwork arrangement on this site carries, and `responsive.spec.ts` catches it
 * when it is missing.
 *
 * Nothing in the markup depends on the motion preference. `MotionConfig` is set
 * to `reducedMotion="user"` around the whole application, so a reader who asks
 * for less motion gets the settled state without this component branching on a
 * value that is null during server rendering.
 */
const SPRING = { type: "spring", stiffness: 34, damping: 16, mass: 1.1 } as const;

export function SlideIn({
  from,
  delay = 0,
  className = "",
  children,
}: {
  from: "left" | "right";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.div
      {...handlers}
      className={className}
      /*
        A fixed 80px of the block, not a fifth of it. A fraction scales with
        the block, and the services column taught that a tall block then waits
        for far more of itself than the reader expects; see `ServiceShowcase`.
      */
      viewport={{ amount: "some", margin: "0px 0px -80px 0px" }}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          x: from === "left" ? -44 : 44,
          transition: { duration: 0 },
        },
        shown: { opacity: 1, x: 0, transition: { ...SPRING, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
