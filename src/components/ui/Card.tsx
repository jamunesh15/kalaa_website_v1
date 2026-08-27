import type { ReactNode } from "react";
import { SURFACE } from "@/components/ui/surface";

/**
 * The card. One corner, one soft shadow, no outline.
 *
 * Every fill is drawn from the two colours the site already has, the sage of
 * the frame and the butter of the accent, plus one neutral. A card does not
 * introduce a colour; it borrows one.
 *
 * The fill is rhythm rather than meaning. Nothing on the site should encode
 * information in which colour a card happens to be: a reader cannot learn a
 * code they were never shown, and a colour-blind reader could not read it even
 * if they had been.
 */
export type CardFill = "surface" | "butter" | "peach" | "sage" | "cloud";

const FILLS: Record<CardFill, string> = {
  surface: "bg-surface",
  butter: "bg-tint-butter",
  peach: "bg-tint-peach",
  sage: "bg-tint-sage",
  cloud: "bg-tint-cloud",
};

export function Card({
  fill = "surface",
  children,
  className = "",
}: {
  fill?: CardFill;
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${SURFACE} ${FILLS[fill]} p-7 text-ink ${className}`}>{children}</div>;
}
