import type { ReactNode } from "react";
import { SURFACE_FLAT } from "@/components/ui/surface";

/* The small label above a heading, and the tag inside a card. */
export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`${SURFACE_FLAT} inline-block bg-tint-sage px-4 py-1.5 text-label font-medium uppercase text-ink ${className}`}
    >
      {children}
    </span>
  );
}
