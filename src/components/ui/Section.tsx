import type { ReactNode } from "react";

/**
 * The page's horizontal rhythm, in one place.
 *
 * Every section on the site is the same width and starts at the same gutter, so
 * a heading in one block lines up with a heading three blocks down. Sections
 * setting their own max width is how that alignment quietly stops being true.
 */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-16 ${className}`}>
      {children}
    </section>
  );
}
