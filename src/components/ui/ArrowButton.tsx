import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { FOCUS_RING, SURFACE_FLAT } from "@/components/ui/surface";

/**
 * The site's black button, with the action drawn as an arrow in a badge.
 *
 * Black, like every other button here: the logo is black and white, so a button
 * that matches the mark reads as the company's. A pale pill was tried on the
 * pricing cards in three different colours, sage, butter and white, and each
 * one read as a colour that did not belong to the card it sat on. The badge
 * inverts instead, which is where the contrast comes from.
 *
 * **Two widths, and which one is right depends entirely on whether the button
 * has siblings.**
 *
 * `full` is the default and is for a row of them. Sized to their own labels,
 * three buttons with three different label lengths came out three different
 * widths in one card row and the row read as ragged rather than as a set. The
 * label sits left, the badge sits right, so the arrow lands on the same edge in
 * every card and the eye can follow the column down.
 *
 * `fit` is for a button standing alone. There is no column to line up with, and
 * `justify-between` across a fixed width just parks the badge at the far end
 * with a stripe of empty black between it and the words, which reads as two
 * controls rather than one. Sized to its label, the arrow sits where the
 * sentence ends.
 *
 * The arrow points right rather than up-right. Up-right means "opens away from
 * here", and these go to a page on this site.
 *
 * Two arrows, not one. The second is what the first swipes across to on hover;
 * see `arrow-swipe` in `utilities.css`. It is decorative repetition of the
 * first, so it is hidden from assistive technology and the button's name comes
 * from its label alone.
 */
export type ArrowButtonWidth = "full" | "fit";

/**
 * Which way round the button is drawn.
 *
 * `dark` is the site's own control: the logo's black with the arrow in a white
 * badge. `light` inverts exactly that and nothing else, for the second action
 * in a pair where two black pills side by side give a reader no idea which one
 * the page would rather they pressed.
 *
 * Two tones, not a palette. The badge is always the opposite of the pill, so
 * whichever way round it is drawn the arrow stays the brightest thing on it.
 */
export type ArrowButtonTone = "dark" | "light";

const TONES: Record<ArrowButtonTone, { shell: string; badge: string }> = {
  dark: { shell: "bg-action text-on-action", badge: "bg-surface text-ink" },
  /*
    **The light badge is sage, not black.** Inverting the dark button exactly
    put a hard black disc a few pixels from the edge of a white pill, and the
    client called it: at this size the circle reads as something stuck on rather
    than as part of the control, and it competes with the black button beside
    it instead of being the quieter of the two.

    Sage is the site's own field colour, so the badge still separates from the
    pill without shouting, and the pair now reads as one loud action and one
    quiet one. The hairline is what gives the white pill an edge on the cream:
    without it the button has no shape until you hover it.
  */
  light: {
    shell: "border-token border-line bg-surface text-ink",
    badge: "bg-tint-sage text-ink",
  },
};

const WIDTHS: Record<ArrowButtonWidth, string> = {
  /*
    **Centred, not `justify-between`.** Spread across a card-width button the
    label sat at one end and the badge at the other with a hand's width of black
    between them, which does not read as one control and did not match the
    buttons anywhere else on the site. The client called it out on the pricing
    cards, which are the widest place this appears.
  */
  full: "flex w-full justify-center gap-3",
  fit: "inline-flex w-fit gap-3",
};

/*
 * There is no third width, and there was one for an afternoon. A `stack`
 * variant that filled a phone-width track was built for the contact hero's
 * pair, first at the full row and then matched to the wider label, and the
 * client rejected both: his rule is that no button on this site is wider than
 * what it says. A pair that stacks on a phone stacks at two widths.
 */

/**
 * Two sizes, and the split is where the button sits rather than how important
 * it is, the same rule `Button` uses.
 *
 * **`sm` was made for the masthead and the masthead no longer uses it.** That
 * bar is 64px and shares it with a wordmark and four links; the theory was that
 * a 40px badge in it makes the whole page top-heavy, so a 28px badge and the
 * small text size were cut for it. The client then asked for the masthead
 * action to be the same size as every other button, so nothing takes `sm` at
 * the moment. It stays for the next bar that is genuinely too short for the
 * base size.
 */
export type ArrowButtonSize = "sm" | "base";

const SIZES: Record<ArrowButtonSize, { shell: string; badge: string; icon: string }> = {
  /*
    **The badge sits 6px inside the pill, not 4.** At `pr-1` a 40px badge in a
    48px pill leaves four pixels of black around three sides of it and
    twenty-four before the label, and the client read that asymmetry as the
    button being crowded at its edge. Six is enough for the circle to sit inside
    the shape rather than against it, and it costs four pixels of height.
  */
  sm: { shell: "py-1 pr-1 pl-4 text-small", badge: "size-7", icon: "size-4" },
  /*
    **`text-small` on a phone, `text-body` from `sm`, and the label never
    wraps.** "Start with Launch" broke into two lines inside a 330px pricing
    card and the badge sat beside a two-line stack, which the client called
    out. A button label is one line by definition; if it does not fit, the
    text comes down a step rather than the words folding.
  */
  base: { shell: "py-1.5 pr-1.5 pl-5 text-small sm:pl-6 sm:text-body", badge: "size-10", icon: "size-5" },
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
  href: string;
  children: ReactNode;
  width?: ArrowButtonWidth;
  size?: ArrowButtonSize;
  tone?: ArrowButtonTone;
  /**
   * Leaves the site, so it opens in a new tab.
   *
   * WhatsApp and Maps are other applications, and handing a reader to one in
   * the tab they were reading in loses the page they were on. `rel` carries
   * both tokens: browsers imply `noopener` from `noreferrer`, and
   * `tests/links.spec.ts` checks for the word rather than the behaviour, which
   * is the right check for a security property.
   */
  external?: boolean;
  className?: string;
}) {
  const step = SIZES[size];

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group items-center font-semibold ${step.shell} ${WIDTHS[width]} ${SURFACE_FLAT} ${TONES[tone].shell} ${FOCUS_RING} ${className}`}
    >
      <span className="min-w-0 whitespace-nowrap">{children}</span>
      <span
        className={`arrow-swipe grid shrink-0 place-items-center rounded-full ${TONES[tone].badge} ${step.badge}`}
      >
        <ArrowIcon aria-hidden="true" className={step.icon} />
        <ArrowIcon aria-hidden="true" className={step.icon} />
      </span>
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
