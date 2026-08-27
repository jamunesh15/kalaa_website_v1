import type { ReactNode } from "react";
import { SURFACE_FLAT } from "@/components/ui/surface";

/**
 * The small label above a heading, and the tag inside a card.
 *
 * Uppercase with open tracking, and never in square brackets. The bracketed
 * mono label is one of the tells this redesign exists to avoid, and it is ruled
 * out here rather than left to each section to remember.
 *
 * Flat against whatever it sits on: it is a tag on the page, not an object
 * above it, so it takes the corner and no shadow.
 */
export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`${SURFACE_FLAT} inline-block bg-tint-sage px-4 py-1.5 text-label font-medium uppercase text-ink ${className}`}
    >
      {children}
    </span>
  );
}
