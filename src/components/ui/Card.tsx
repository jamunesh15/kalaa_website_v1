import type { ReactNode } from "react";
import { SURFACE } from "@/components/ui/surface";

/**
 * The card. One corner, one soft shadow, no outline.
 *
 * Every fill is drawn from the site's quiet tints. A card does not introduce a
 * loud new colour; it borrows a soft one.
 *
 * The fill is rhythm rather than meaning. Nothing on the site should encode
 * information in which colour a card happens to be: a reader cannot learn a
 * code they were never shown, and a colour-blind reader could not read it even
 * if they had been.
 */
export type CardFill = "surface" | "butter" | "peach" | "sage" | "cloud" | "violet" | "sky";

/**
 * The standard inset.
 *
 * Replaceable rather than overridable, for the same reason `Section` documents:
 * Tailwind resolves a conflict by CSS order and not by class order, so
 * appending `p-0` to a list that already holds `p-7` does not win. A card whose
 * picture runs to its own edges has to be able to remove the padding, not fight
 * it.
 */
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
