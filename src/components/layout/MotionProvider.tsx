"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* Reduced motion, handled once, in the one place that can do it without lying to the server. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
