import type { ReactNode } from "react";

/**
 * The white sheet the site is printed on.
 *
 * The document itself is sage. This is the sheet sitting on it, with the site's
 * one corner, and the sage shows through as a margin on all four sides. It is
 * the device that makes a Kalaa page recognisable in a screenshot, and it is
 * the one part of the design that is not taken from the reference.
 *
 * Three elements: the band of frame colour, a second thinner line inside it,
 * and the sheet everything is printed on.
 *
 * The doubled frame was built once before with a WHITE rim and reverted,
 * because on screen it read as rounded boxes stacked inside each other. The
 * client asked for it back and the fix was the colour rather than the geometry:
 * white is the sheet's own colour, so the rim read as a gap between two boxes.
 * `--frame-inner` is a pale sage-grey at a quarter of the ring's width, so it
 * reads as a second rule drawn around the sheet.
 *
 * The masthead is inside all of it. The bar is part of the application, so the
 * frame goes around it. An earlier build put the band between the masthead and
 * the content, which left the bar sitting outside its own border.
 *
 * No `overflow-hidden` on either, however tempting it looks for clipping the
 * corners: an ancestor with hidden overflow silently breaks `position: sticky`
 * on the masthead inside it, and that failure looks like a header bug rather
 * than a layout one. Anything that needs clipping clips itself.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ring-inset-token mx-auto flex w-full max-w-[var(--sheet-max)] flex-1 flex-col rounded-token bg-page">
      <div className="frame-line-inset flex flex-1 flex-col rounded-token bg-frame-inner">
        <div className="flex flex-1 flex-col rounded-token bg-sheet">{children}</div>
      </div>
    </div>
  );
}
