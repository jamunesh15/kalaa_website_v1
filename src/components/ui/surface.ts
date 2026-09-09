/* The class strings that make something a surface on this site. */

/** A raised surface: one corner, one soft shadow, no outline. */
export const SURFACE = "rounded-token shadow-soft";

/** The same corner, flat against the sheet. For tags and inline chips. */
export const SURFACE_FLAT = "rounded-token";

/** A hairline outline, for the rare surface that needs an edge instead of depth. */
export const SURFACE_LINED = "rounded-token border-token border-line";

/* The focus ring. */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/*
 * The same ring, drawn on a wrapper when the real control is off screen.
 *
 * A visually hidden radio still takes focus, and `focus-visible` on it draws a
 * ring nobody can see: the control is reachable by keyboard and invisible while
 * focused, which is the exact failure WCAG 2.4.7 is about. The label wears the
 * ring instead.
 */
export const FOCUS_RING_WITHIN =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";

/* A text link that lifts on hover, for the masthead and the footer's columns. */
export const HOVER_PLATE_BARE =
  "rounded-token px-3 py-1.5 transition-token hover:bg-ink/[0.07] hover:shadow-hover";

/* The plate for a plain text link. */
export const HOVER_PLATE = `inline-block ${HOVER_PLATE_BARE}`;

/* The footer's hover plate, torn rather than rounded. The caller sets `display`. */
export const HOVER_TAPE_BARE = "tape-hover px-3 py-1.5";

/* The same plate on a plain text link. */
export const HOVER_TAPE = `inline-block ${HOVER_TAPE_BARE}`;
