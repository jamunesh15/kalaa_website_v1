"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/**
 * The About column, arriving from the left.
 *
 * It had no motion at all, which was not a decision so much as an oversight:
 * the board beside it has animated since it was built, so the section played as
 * half a composition waking up while the other half was already there. Same
 * fault the hero had, and the same fix, so it moves the same way. One block,
 * sliding in from the left, on the same shape of spring.
 *
 * **It shares the board's trigger rather than owning one.** Both halves take
 * `useReplayOnScrollDown`, so both start when the section is a quarter into
 * view and both replay on a fresh approach from above. Two independent
 * watchers on two halves of one section is how you get a copy column that has
 * finished arriving before the board has started.
 *
 * The slide is 60px against the hero's 80, because this column is narrower and
 * the same distance across a narrower block reads as further.
 *
 * Nothing here branches on the motion preference. `MotionProvider` sets
 * `reducedMotion="user"`, which drops the transform and settles on the end
 * value; a component that asks `useReducedMotion` during render is a hydration
 * bug, because the server cannot know the answer.
 */
/*
  The board's spring, not the hero's, because both halves of this section start
  on the same trigger and two speeds inside one gesture reads as one of them
  lagging.
*/
const SPRING = { type: "spring", stiffness: 40, damping: 16, mass: 1.15 } as const;

export function AboutCopy({ children }: { children: ReactNode }) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.div
      {...handlers}
      className="min-w-0 text-center xl:flex xl:flex-col xl:justify-center xl:py-4 xl:text-left"
      viewport={{ amount: 0.24 }}
      initial={{ opacity: 0, x: -60 }}
      animate={shown ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      /*
        Going back is instant, the same as the board's. Re-arming on a spring
        animates the column out from under a reader who is scrolling up and
        away from it, which is movement nobody asked for in a direction nobody
        is looking.
      */
      transition={
        shown
          ? { ...SPRING, opacity: { duration: 0.5, ease: "easeOut" } }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
