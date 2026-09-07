import type { ReactNode } from "react";

/**
 * The page's horizontal rhythm, in one place.
 *
 * Every section on the site is the same width and starts at the same gutter, so
 * a heading in one block lines up with a heading three blocks down. Sections
 * setting their own max width is how that alignment quietly stops being true.
 *
 * Two elements rather than one, because a section that wants a coloured field
 * needs it to run the full width of the sheet while its contents stay on the
 * grid. `fill` dresses the outer element, `className` dresses the inner one.
 * Painting the background on a `max-w` element instead produces a band that
 * stops short of the sheet edges, which reads as a rendering fault.
 *
 * The vertical padding steps down on a phone rather than inheriting the desktop
 * value. Eighty pixels top and bottom is a fifth of a 667px screen spent on
 * nothing, and a page of it is several screens of empty space before any
 * content.
 */

/**
 * The standard vertical rhythm between sections.
 *
 * Replaceable rather than overridable, because Tailwind resolves a conflict by
 * CSS order and not by class order: appending `pt-8` to a list that already
 * holds `lg:pt-24` does not reliably win, and the section that looked fixed in
 * one build silently reverts in the next.
 */
const PADDING = "py-14 sm:py-20 lg:py-24";

export function Section({
  id,
  fill = "",
  padding = PADDING,
  children,
  className = "",
}: {
  id?: string;
  /** Classes for the full-width outer element. For a background band. */
  fill?: string;
  /** Replaces the standard vertical padding. For a section that sits under the masthead. */
  padding?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full ${fill}`}>
      <div className={`mx-auto w-full max-w-7xl px-5 ${padding} ${className}`}>{children}</div>
    </section>
  );
}
