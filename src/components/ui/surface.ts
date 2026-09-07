/**
 * The class strings that make something a surface on this site.
 *
 * Extracted because the card, the button, the pill and every panel that comes
 * later all need the same corner and the same elevation, and four files each
 * writing them out is four chances for one to drift. The design system says
 * there is one corner; this is what makes that true in practice rather than
 * only in the tokens.
 */

/** A raised surface: one corner, one soft shadow, no outline. */
export const SURFACE = "rounded-token shadow-soft";

/** The same corner, flat against the sheet. For tags and inline chips. */
export const SURFACE_FLAT = "rounded-token";

/** A hairline outline, for the rare surface that needs an edge instead of depth. */
export const SURFACE_LINED = "rounded-token border-token border-line";

/**
 * The focus ring.
 *
 * Never paired with `focus:outline-none`, which is how a focus indicator
 * actually goes missing: somebody suppresses the browser default intending to
 * draw their own, and the second half is lost in a refactor. This adds a ring
 * without removing anything, so there is no half to lose.
 */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * A text link that lifts on hover, for the masthead and the footer's columns.
 *
 * The client asked for a shadow on hover that follows the same corner every
 * control on this site carries. A shadow needs something to sit under, so the
 * link takes padding and a surface of its own on hover: without the padding the
 * plate hugs the letters and reads as a highlighter mark rather than as a
 * control lifting.
 *
 * **`inline-block`, so the plate is as wide as the words.** It was `block`,
 * which in a footer column means as wide as the column: hovering "Services"
 * lit a plate running most of the way across the page, which the client read as
 * a shadow that was far too long. A control the size of its label is the point
 * of a plate at all.
 *
 * **The plate is a faint grey, not white.** White was the first version and the
 * client cut it: on the sheet, which is already a near-white, a white plate
 * reads as a hole rather than as a surface, and in the footer it fought the
 * cream. Seven percent of the ink is a grey that belongs to this palette
 * because it is made of it, and it works on both grounds without a second
 * value for the second place.
 *
 * **Every list using this needs a negative margin of the same size.** The
 * padding is what the plate is made of, and left uncompensated it indents the
 * whole column against its heading and against the column beside it. `-mx-3`
 * against `px-3` puts the text back exactly where it was.
 */
export const HOVER_PLATE_BARE =
  "rounded-token px-3 py-1.5 transition-token hover:bg-ink/[0.07] hover:shadow-hover";

/**
 * The plate for a plain text link.
 *
 * `HOVER_PLATE_BARE` is the same thing without a display, for a link that sets
 * its own: the footer's contact rows are `inline-flex` so the glyph sits inside
 * the link and the plate covers both. Appending `flex` to a class list that
 * already holds `inline-block` does not reliably win, because Tailwind resolves
 * that by CSS order rather than by the order they are written, and the row came
 * out with its glyph stacked above its words.
 */
export const HOVER_PLATE = `inline-block ${HOVER_PLATE_BARE}`;
