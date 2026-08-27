import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { FOCUS_RING, SURFACE } from "@/components/ui/surface";

/**
 * The button.
 *
 * Black, because the logo is black and white and a button that matches the mark
 * reads as the company's. The accent is a light butter yellow and is the field
 * behind things, never the thing you press: a pale yellow button with dark text
 * on a white sheet does not read as pressable.
 *
 * At the site's one corner on a control this height it reads as very nearly a
 * pill, which is what the reference uses, without the system needing a second
 * radius to get there.
 *
 * Renders an anchor when given `href` and a button otherwise. A thing that
 * navigates and a thing that acts are different elements to everything except
 * the eye.
 */
export type ButtonVariant = "primary" | "secondary";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-action text-on-action hover:bg-action-hover",
  /** For a second, quieter action, and for a button sitting on the accent field. */
  secondary: "bg-surface text-ink",
};

const BASE = `inline-flex items-center justify-center gap-2 px-6 py-3 text-body font-medium liftable ${SURFACE} ${FOCUS_RING}`;

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
