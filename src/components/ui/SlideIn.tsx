"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* A block that arrives from one side. */
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
      /* A fixed 80px of the block, not a fifth of it. */
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
