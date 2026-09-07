"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* The About column, arriving from the left. */
/* The board's spring, not the hero's, because both halves of this section start on the same trigger and two speeds inside. */
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
      /* Going back is instant, the same as the board's. */
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
