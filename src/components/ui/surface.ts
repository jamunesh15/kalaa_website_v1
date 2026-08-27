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
