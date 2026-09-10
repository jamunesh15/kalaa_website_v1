import Image from "next/image";
import type { Proof } from "@/content/types";

/* Where it rests, and which way it travels as it arrives. */
const SIDES = {
  up: "bottom-full mb-4 translate-y-2",
  down: "top-full mt-4 -translate-y-2",
} as const;

/*
 * The tail, on the edge facing the card.
 *
 * A square turned 45 degrees, centred on the panel's own edge so the panel
 * covers half of it and the other half is a point. It is drawn BEFORE the
 * panel in the markup for exactly that reason: painted after, its buried half
 * would show as a seam across the message.
 *
 * **Its size is measured against the gap, not chosen.** A 24px square turned 45
 * degrees reaches 17px past the edge it sits on, and the panel rests 16px off
 * the card, so the point lands ON the card rather than in the space beside it.
 * At 16px it reached 11px, stopped 5px short, and read as a mark floating near
 * a card instead of one belonging to it. Change the gap and this changes with
 * it.
 *
 * The offset from the left is the card's icon rather than the panel's middle. A
 * centred tail on a panel this wide points at nothing in particular; this one
 * lands on the badge the reader was already looking at.
 */
const TAILS = {
  up: "bottom-0 translate-y-1/2",
  down: "top-0 -translate-y-1/2",
} as const;

/*
 * The client's own message about this work, held off the card until a reader
 * asks for it by hovering or tabbing to it.
 *
 * **It opens vertically, and it is exactly as wide as the card.** It used to
 * open sideways, toward the middle of the band, which is where the real work is
 * shown: hovering a service put a panel straight over the portfolio stack, so
 * asking for the proof cost the reader the pictures. Leaving off the top or the
 * bottom of the card and taking none of the width beside it means the panel can
 * only ever cover its own column. Nothing beside it moves, and there is no
 * width for the page edge to cut, which is what the sideways version could not
 * promise at 1024 either.
 *
 * The tail on the edge facing the card is what says which card it belongs to.
 * Aligned and equal in width, a panel still reads as a separate thing arriving;
 * a point aimed at the card reads as that card speaking, which is what it is.
 *
 * `side` and `shift` are decided when the card is hovered rather than fixed
 * here, because neither direction is always available: the masthead is sticky
 * and the section clips its own overflow, so a panel above a card near the top
 * of the screen goes under the bar and a panel below the bottom row is cut by
 * the section. The card measures both gaps, opens into the one that can hold
 * the whole panel, and where neither can, pulls it back by the overhang. See
 * the note on `place` in `ServiceShowcase`.
 *
 * The parent card carries `group` and this reads its hover and focus. No
 * JavaScript and no motion library: opacity and one small translate, which the
 * compositor handles on its own. That matters on the pages this sits on, which
 * already carry dozens of torn sheets drawn with `mask-image`, and animating
 * those is what drops frames.
 *
 * The open state is `group-hover` and `group-focus-visible`, NEVER
 * `group-focus-within`. The card carries `tabIndex` so a keyboard can reach it,
 * and with focus-within a mouse CLICK on the card left the panel pinned open
 * until the reader clicked somewhere else. `:focus-visible` does not match a
 * mouse click on a `tabindex` element, so the keyboard keeps its access and the
 * mouse gets its panel back when it leaves.
 *
 * The travel is small on purpose and the timing is `transition-token-reveal`
 * rather than the site's usual hover: this is a whole panel unfolding, and at
 * 200ms it snapped into place before a reader had finished moving onto the
 * card. It reads as one thing arriving at 420.
 *
 * **Desktop only, deliberately.** There is no room above a card on a phone and
 * nothing to hover with; the same messages are on the page in full, in the
 * testimonial band, so nothing is lost by not drawing this one.
 *
 * It is `aria-hidden` for the same reason: every word in it is already on the
 * page as text a screen reader reaches, and a hover panel that duplicates it
 * would only add a second copy nobody asked for.
 */
export function ProofPeek({
  proof,
  side,
  shift = 0,
}: {
  proof: Proof;
  /** Measured on the card, into whichever gap can hold the whole panel. */
  side: "up" | "down";
  /**
   * Pixels to pull it back toward the card, where neither gap was big enough
   * and the section would otherwise cut it. Applied as a MARGIN rather than a
   * transform: the arrival animates `translateY`, and a second transform on the
   * same element would fight it.
   */
  shift?: number;
}) {
  return (
    <div
      aria-hidden
      data-proof-peek
      style={
        shift > 0
          ? side === "up"
            ? { marginBottom: `${16 - shift}px` }
            : { marginTop: `${16 - shift}px` }
          : undefined
      }
      className={`pointer-events-none absolute left-0 z-40 hidden w-full opacity-0 transition-token-reveal group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 xl:block ${SIDES[side]}`}
    >
      <div className="relative">
        {/* The same torn sheet every card on this site is mounted on. */}
        <div aria-hidden className="paper-mat absolute -inset-3 bg-mat-kraft" />

        <div className={`absolute left-10 size-6 rotate-45 bg-surface ${TAILS[side]}`} />

        <div className="relative overflow-hidden rounded-token bg-surface shadow-lift">
          <Image src={proof.peek} alt="" sizes="23rem" className="h-auto w-full" />

          <div className="flex items-center gap-3 px-4 py-3">
            <Image
              src={proof.avatar}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-token object-cover"
            />
            <p className="min-w-0 text-label leading-tight text-ink-muted">
              <span className="font-bold text-ink">{proof.name}</span>
              {proof.company ? `, ${proof.company}` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
