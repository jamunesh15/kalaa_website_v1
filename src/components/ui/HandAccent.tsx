import type { ReactNode } from "react";

/**
 * A phrase inside a heading, set in the hand.
 *
 * One definition rather than a span copied into six headings, for the reason
 * `SectionHeading` exists at all: the page used to have six answers to the same
 * question and that is what makes a site read as assembled rather than
 * designed. Size, weight and colour are fixed here; the caller chooses only the
 * words and, on the butter band, the tone.
 *
 * **The size bump is not decoration.** Kalam's lowercase sits noticeably
 * smaller than Satoshi's at the same point size, so matched on paper the accent
 * reads as a smaller line rather than as the same line in another voice. 1.18em
 * is where the two x-heights meet. The tightened leading is the other half of
 * the same fix: a taller face inside a line box set for the display face pushes
 * the line's own spacing open.
 *
 * `whitespace-nowrap` keeps a short accent whole, because a two-word phrase
 * that breaks across lines reads as a font that ran out rather than as an
 * aside. **It is opt-out for a reason.** A three or four word accent held
 * unbreakable is wider than a 307px phone column at `display-l`, and an
 * unbreakable line does not wrap, it overflows the section. Pass `wrap` for
 * anything past two words and let it break like the rest of the heading.
 *
 * **Once per heading, on the payoff phrase, on every section.**
 *
 * It shipped first on four bands only, held back on the argument that a device
 * appearing everywhere is not a device but a heading style, which is what keeps
 * the hero's yellow marker off every other heading. The client looked at the
 * result and called it: four out of eleven reads as unfinished rather than as
 * restraint, because a reader meeting it on the third section wonders why the
 * first two missed out.
 *
 * So the rule moved down a level. **Every section heading gets one accent, and
 * the restraint is inside the heading rather than across the page**: one phrase,
 * never the whole line, and never on the things a reader has to trust as
 * literal. Prices, plan names, card titles and the client count stay in the
 * display face.
 *
 * **Two wider versions were rendered and rejected, in that order.**
 *
 * The whole site in the hand, body copy included. The hero held up and the FAQ
 * did not: handwriting has no vertical stems to anchor the eye, so a long
 * answer turns into work, and it lands worst where a reader is deciding whether
 * to spend money.
 *
 * Then every heading in the hand with the body left in Switzer. Killed by the
 * pricing table, where "$199" and "$449" set in a hand read as figures
 * scribbled on a napkin rather than prices anyone stands behind. It would also
 * have cost the hero its 900 weight, which Kalam does not ship, and left
 * Satoshi with almost no job.
 *
 * The client's own call after seeing both: the combination reads better than
 * either extreme. So the hand marks phrases, and the two faces keep their jobs.
 */
export function HandAccent({
  children,
  tone = "sage",
  wrap = false,
}: {
  children: ReactNode;
  /** `on-accent` for the closing band, where the field is butter rather than a tint. */
  tone?: "sage" | "on-accent";
  /** Let the accent break across lines. Required past about two words. */
  wrap?: boolean;
}) {
  /*
    `--ink-sage` and never `--tint-sage`. The tint is a background at #dcebe5
    and measures about 1.1:1 on these bands, which is a phrase you cannot read.
    See the note beside the token in `tokens.css`.
  */
  const colour = tone === "sage" ? "text-ink-sage" : "text-on-accent";

  return (
    <span
      className={`font-hand text-[1.18em] font-bold leading-[0.9] ${colour} ${
        wrap ? "" : "whitespace-nowrap"
      }`}
    >
      {children}
    </span>
  );
}
