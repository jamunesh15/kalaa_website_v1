import Image from "next/image";
import type { Proof } from "@/content/types";

/*
 * Where the panel rests, where it comes from, and where it settles.
 *
 * Two sides and no `below`: the process row had one and it was removed, and a
 * variant nothing uses is a decision nobody made.
 *
 * The open state is `group-hover` and `group-focus-visible`, NEVER
 * `group-focus-within`. The card carries `tabIndex` so a keyboard can reach it,
 * and with focus-within a mouse CLICK on the card left the panel pinned open
 * until the reader clicked somewhere else. `:focus-visible` does not match a
 * mouse click on a `tabindex` element, so the keyboard keeps its access and the
 * mouse gets its panel back when it leaves.
 *
 * Each entry owns its whole transform, and that is not tidiness. A side panel is
 * centred with `-translate-y-1/2` and slides on x; writing the hover state as a
 * shared `group-hover:translate-y-0` would reset that centring and drop the
 * panel by half its own height the moment a reader touched the card. Only the
 * axis a panel travels on is ever animated.
 *
 * The travel is small on purpose and the timing is `transition-token-reveal`
 * rather than the site's usual hover: this is a whole panel unfolding, and at
 * 200ms it snapped into place before a reader had finished moving onto the
 * card. It reads as one thing arriving at 420.
 */
const SIDES = {
  right:
    "top-1/2 left-full ml-5 -translate-y-1/2 -translate-x-3 group-hover:translate-x-0 group-focus-visible:translate-x-0",
  left: "top-1/2 right-full mr-5 -translate-y-1/2 translate-x-3 group-hover:translate-x-0 group-focus-visible:translate-x-0",
} as const;

/*
 * The client's own message about this work, held beside a card until a reader
 * asks for it by hovering or tabbing to the card.
 *
 * The parent card carries `group` and this reads its hover and focus. No
 * JavaScript and no motion library: opacity and one small translate, which the
 * compositor handles on its own. That matters on the pages this sits on, which
 * already carry dozens of torn sheets drawn with `mask-image`, and animating
 * those is what drops frames.
 *
 * **Desktop only, deliberately.** There is no room beside a card on a phone and
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
}: {
  proof: Proof;
  /** Which side it opens on. Always INWARD, so it never runs off the page. */
  side: "left" | "right";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-40 hidden w-[22rem] opacity-0 transition-token-reveal group-hover:opacity-100 group-focus-visible:opacity-100 xl:block ${SIDES[side]}`}
    >
      <div className="relative">
        {/* The same torn sheet every card on this site is mounted on. */}
        <div aria-hidden className="paper-mat absolute -inset-3 bg-mat-kraft" />

        <div className="relative overflow-hidden rounded-token bg-surface shadow-lift">
          {/*
           * The chat where there is one, the words where there is not. Four of
           * these reviews came off the review badge as text, so there is no
           * screenshot to show and inventing one is not an option.
           */}
          {proof.peek ? (
            <Image src={proof.peek} alt="" sizes="22rem" className="h-auto w-full" />
          ) : (
            <p className="px-4 pt-4 font-display text-display-m font-bold text-ink">
              &ldquo;{proof.quote}&rdquo;
            </p>
          )}

          <p className="px-4 py-3 text-label leading-tight text-ink-muted">
            <span className="font-bold text-ink">{proof.name}</span>
            {proof.company ? `, ${proof.company}` : ""}
            {`, on ${proof.about}`}
          </p>
        </div>
      </div>
    </div>
  );
}
