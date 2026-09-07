import type { ReactNode } from "react";
import { SURFACE } from "@/components/ui/surface";

/* The card. */
export type CardFill = "surface" | "butter" | "peach" | "sage" | "cloud" | "violet" | "sky";

/* The standard inset. */
const PADDING = "p-7";

const FILLS: Record<CardFill, string> = {
  surface: "bg-surface",
  butter: "bg-tint-butter",
  peach: "bg-tint-peach",
  sage: "bg-tint-sage",
  cloud: "bg-tint-cloud",
  violet: "bg-tint-violet",
  sky: "bg-tint-sky",
};

export function Card({
  fill = "surface",
  padding = PADDING,
  children,
  className = "",
}: {
  fill?: CardFill;
  /** Replaces the standard inset. Pass "" for a card whose content bleeds to its edges. */
  padding?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${SURFACE} ${FILLS[fill]} ${padding} text-ink ${className}`}>{children}</div>
  );
}
