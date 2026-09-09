import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { FOCUS_RING, SURFACE_FLAT } from "@/components/ui/surface";

/*
 * The site's black button, with the action drawn as an arrow in a badge.
 *
 * The badge carries `--radius-badge`, the shell's corner scaled to its smaller
 * box. It was a circle, and a circle is a shape language of its own: nothing
 * else here is round, so the badge read as a borrowed part rather than as a
 * piece of this button. Two other values were set on the real button and looked
 * at before this one. The frame's concentric radius, 4px at 6px of padding,
 * reads as a hard tile; concentricity is for a band you read as a frame, and
 * this is an object sitting on a field. `--radius` itself, 10px, measures equal
 * to the shell and still reads rounder, which is the client's own note.
 */
export type ArrowButtonWidth = "full" | "fit";

/* Which way round the button is drawn. */
export type ArrowButtonTone = "dark" | "light";

const TONES: Record<ArrowButtonTone, { shell: string; badge: string }> = {
  dark: { shell: "bg-action text-on-action", badge: "bg-surface text-ink" },
  /* The light badge is sage, not black. */
  light: {
    shell: "border-token border-line bg-surface text-ink",
    badge: "bg-tint-sage text-ink",
  },
};

const WIDTHS: Record<ArrowButtonWidth, string> = {
  /* Centred, not `justify-between`. */
  full: "flex w-full justify-center gap-3",
  fit: "inline-flex w-fit gap-3",
};

/* There is no third width, and there was one for an afternoon. */

/* Two sizes, and the split is where the button sits rather than how important it is, the same rule `Button` uses. */
export type ArrowButtonSize = "sm" | "base";

const SIZES: Record<ArrowButtonSize, { shell: string; badge: string; icon: string }> = {
  /* The badge sits 6px inside the pill, not 4. */
  sm: { shell: "py-1 pr-1 pl-4 text-small", badge: "size-7", icon: "size-4" },
  /* `text-small` on a phone, `text-body` from `sm`, and the label never wraps. */
  base: {
    shell: "py-1.5 pr-1.5 pl-5 text-small sm:pl-6 sm:text-body",
    badge: "size-10",
    icon: "size-5",
  },
};

export function ArrowButton({
  href,
  children,
  width = "full",
  size = "base",
  tone = "dark",
  external = false,
  className = "",
}: {
  /** Left off for a control that has nowhere to go yet. It renders a button instead of a link. */
  href?: string;
  children: ReactNode;
  width?: ArrowButtonWidth;
  size?: ArrowButtonSize;
  tone?: ArrowButtonTone;
  /* Leaves the site, so it opens in a new tab. */
  external?: boolean;
  className?: string;
}) {
  const step = SIZES[size];
  const classes = `group items-center font-semibold ${step.shell} ${WIDTHS[width]} ${SURFACE_FLAT} ${TONES[tone].shell} ${FOCUS_RING} ${className}`;

  const label = (
    <>
      <span className="min-w-0 whitespace-nowrap">{children}</span>
      <span
        className={`arrow-swipe grid shrink-0 place-items-center rounded-badge ${TONES[tone].badge} ${step.badge}`}
      >
        <ArrowIcon aria-hidden="true" className={step.icon} />
        <ArrowIcon aria-hidden="true" className={step.icon} />
      </span>
    </>
  );

  /* No destination yet, so a button. A link to a page that does not exist is a broken link, and the suite is right to say so. */
  if (!href) {
    return (
      <button type="button" className={classes}>
        {label}
      </button>
    );
  }

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

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
