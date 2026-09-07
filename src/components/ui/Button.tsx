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

/**
 * Two sizes, and the split is where the button sits rather than how important
 * it is. A masthead action shares a 64px bar with a wordmark and three links,
 * and at page size it makes that bar too tall and the whole page top-heavy.
 */
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
  /**
   * Leaves the site, so it opens in a new tab and says so.
   *
   * `rel` carries both tokens. Modern browsers imply `noopener` from
   * `noreferrer`, and `tests/links.spec.ts` checks for the word rather than the
   * behaviour, which is the right check for a security property.
   */
  external?: boolean;
  /**
   * The arrow after the label.
   *
   * The client's drawing has it on every control, and it does a job beyond
   * decoration: these buttons hand the reader to WhatsApp, to a mail client, to
   * a dialer, to Maps. An arrow says "this leaves here" in a way a label alone
   * does not. `ArrowButton` is the other treatment, a white badge on a black
   * pill, and it stays where it is: this is the same gesture at a quieter
   * weight, for a page that has five of them.
   */
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
