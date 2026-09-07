import type { ReactNode } from "react";

/* The page's horizontal rhythm, in one place. */

/* The standard vertical rhythm between sections. */
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
