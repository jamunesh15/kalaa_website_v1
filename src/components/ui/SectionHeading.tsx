import type { ReactNode } from "react";

/**
 * One heading treatment for every band below the hero.
 *
 * It exists because the page had six answers to the same question. Measured on
 * the running site: the hero at 64px/900 hard left, Services at 64px/700
 * centred, the client band at 40px/700 centred, Capabilities at 40px/900 left,
 * Process and the closing ask at 40px/700 left. Two sizes, two weights and two
 * alignments for the same job is what makes a page read as assembled rather
 * than designed, and it is what a visitor notices without being able to name.
 *
 * So: the h1 stays the heaviest and largest thing on the site, and every h2
 * under it is `display-l` at 700, with one space between it and its sentence.
 *
 * Alignment follows the composition underneath, and it is the ONE thing this
 * component leaves to the caller. A heading is a label for what is below it, so
 * it goes where that thing is: hard left over the process rows, which are
 * left-anchored, and centred over the service grid, the client rows and the
 * capability deck, which are symmetric and run the full rail. A left heading
 * over a symmetric block leaves a wide empty half beside it, which is on this
 * project's own list of templated tells.
 *
 * The closing ask used to be listed here as left-anchored and is now centred.
 * Nothing sits under that heading at all, so there is no composition for it to
 * follow, and left on a full-colour band it left two thirds of the accent
 * empty. See the note in `ClosingCta`.
 *
 * That is a different question from the one this component was written to
 * settle. The page had six answers to size, weight AND alignment at once, which
 * is what made it read as assembled. Size and weight are now fixed for every
 * h2; only alignment varies, and only with the shape of the section.
 */
export function SectionHeading({
  title,
  lead,
  align = "start",
  tone = "ink",
  className = "",
}: {
  title: ReactNode;
  /** The sentence under the heading. Omit it when the section does not need one. */
  lead?: ReactNode;
  /** `center` for a section whose content below is symmetric and full width. */
  align?: "start" | "center";
  /** `on-accent` for the closing band, where the field is butter rather than a tint. */
  tone?: "ink" | "on-accent";
  className?: string;
}) {
  const heading = tone === "ink" ? "text-ink" : "text-on-accent";
  const body = tone === "ink" ? "text-ink-body" : "text-on-accent";
  const centred = align === "center";

  return (
    /*
      A start-aligned heading is still centred below `md`. On a phone the
      heading is alone across the screen, and the client asked for the copy
      there to sit in the middle rather than hug the left edge.
    */
    <div className={`${centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-center md:text-left"} ${className}`}>
      <h2
        className={`max-w-[26ch] font-display text-display-l font-bold ${heading} ${
          centred ? "mx-auto" : "mx-auto md:mx-0"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p className={`mt-4 max-w-[54ch] text-lead ${body} ${centred ? "mx-auto" : "mx-auto md:mx-0"}`}>{lead}</p>
      ) : null}
    </div>
  );
}
