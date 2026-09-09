"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* A block that arrives from one side, or from below. */
const SPRING = { type: "spring", stiffness: 34, damping: 16, mass: 1.1 } as const;

/* How far it starts from where it lands. */
const TRAVEL = 44;

export function SlideIn({
  from,
  delay = 0,
  className = "",
  style,
  travel = TRAVEL,
  children,
}: {
  from: "left" | "right" | "up";
  delay?: number;
  className?: string;
  /** Pixels of travel. A whole row of the work wants more than a block of copy. */
  travel?: number;
  /** For a block that is also a grid item and has to carry its area. */
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.div
      {...handlers}
      className={className}
      style={style}
      /* A fixed 80px of the block, not a fifth of it. */
      viewport={{ amount: "some", margin: "0px 0px -80px 0px" }}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          /* `up` travels on y and leaves x alone, so a full width row reveals
             where it already is rather than sliding in from off the page. */
          x: from === "up" ? 0 : from === "left" ? -travel : travel,
          y: from === "up" ? travel : 0,
          transition: { duration: 0 },
        },
        shown: { opacity: 1, x: 0, y: 0, transition: { ...SPRING, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
