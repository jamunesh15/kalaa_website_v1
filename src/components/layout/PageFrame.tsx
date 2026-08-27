import type { ReactNode } from "react";

/**
 * The white sheet the site is printed on.
 *
 * The document itself is sage. This is the sheet sitting on it, with the site's
 * one corner, and the sage shows through as a margin on all four sides. It is
 * the device that makes a Kalaa page recognisable in a screenshot, and it is
 * the one part of the design that is not taken from the reference.
 *
 * No `overflow-hidden` here, however tempting it looks for clipping the
 * corners: an ancestor with hidden overflow silently breaks `position: sticky`
 * on the masthead inside it, and that failure looks like a header bug rather
 * than a layout one. Anything that needs clipping clips itself.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[110rem] flex-1 flex-col rounded-token bg-sheet">
      {children}
    </div>
  );
}
