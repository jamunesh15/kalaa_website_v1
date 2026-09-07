import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { FOCUS_RING, SURFACE } from "@/components/ui/surface";

/* The button. */
export type ButtonVariant = "primary" | "secondary";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-action text-on-action hover:bg-action-hover",
  /** For a second, quieter action, and for a button sitting on the accent field. */
  secondary: "bg-surface text-ink",
};

/* Two sizes, and the split is where the button sits rather than how important it is. */
export type ButtonSize = "sm" | "base";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-small",
  base: "px-6 py-3 text-body",
};

const BASE = `inline-flex items-center justify-center gap-2 font-medium liftable ${SURFACE} ${FOCUS_RING}`;

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  /* Leaves the site, so it opens in a new tab and says so. */
  external?: boolean;
  /* The arrow after the label. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  variant = "primary",
  size = "base",
  href,
  external = false,
  arrow = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  const label = (
    <>
      {children}
      {arrow ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 h-4 w-4 shrink-0"
        >
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {label}
    </button>
  );
}
