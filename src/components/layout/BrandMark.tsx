import Image from "next/image";
import { SITE } from "@/site";

/**
 * Kalaa's mark, defined once.
 *
 * The masthead, the footer, the browser tab, the touch icon and the share card
 * all have to show the same artwork, and the way that stops being true is each
 * one being told separately what the logo is. A visitor sees the tab and the
 * header in the same glance, so a mark that differs between them reads as a
 * mistake even when both look right on their own.
 *
 * The source is the client's own file at `public/brand/kalaa_logo.avif`. Every
 * derivative is generated from it: `kalaa-logo.webp` is this component's
 * source, `kalaa-mark.webp` is the badge alone, and `src/app/favicon.ico` and
 * `src/app/apple-icon.png` are cut from the same badge. Replacing the logo means
 * replacing that one file and regenerating, not editing five places.
 *
 * **Lossless WebP, not a quality setting.** The client's file is already AVIF,
 * which is lossy, so a lossy re-encode would be a second generation of loss on
 * artwork that is mostly hard black edges: exactly where WebP's ringing shows,
 * and exactly at the size a masthead renders. Lossless from the decoded pixels
 * adds nothing. It costs 8.2KB against 4.4KB and that trade is not close.
 *
 * `unoptimized` on purpose. The file is a fixed-size 8.2KB logo rendered at one
 * size, so there is nothing for the image optimiser to do except add a round
 * trip, and where this site is hosted is still undecided. See CLAUDE.md.
 */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
  /** The masthead's mark names the link to home. The footer's sits beside the
   *  name in text, so a second announcement of it is noise. */
  decorative = false,
}: {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/brand/kalaa-logo.webp"
      alt={decorative ? "" : SITE.name}
      width={512}
      height={184}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}
