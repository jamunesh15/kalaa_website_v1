/**
 * The four pieces scattered around the footer, and where each one lands.
 *
 * Same model as the about board: every number is a percentage of the footer
 * rather than a pixel, so one arrangement serves every width and the pieces
 * shrink with the sheet instead of needing a second set of coordinates per
 * breakpoint.
 *
 * **They are anchored to the bottom, not to the top.** The footer is the same
 * component on every page but it is not the same height on every screen: the
 * four columns stack below `lg` and the box roughly doubles. A piece placed at
 * `top: 62%` sits in the torn band on a desktop and in the middle of the
 * services list on a tablet. Measuring up from the bottom edge instead ties
 * each piece to the band it belongs to, which is the thing that does not move.
 * The clipped note is the exception and is anchored to the top, because the
 * corner it hangs from is the top right one.
 *
 * **A piece is a percentage of the footer's WIDTH and sits at a percentage of
 * its HEIGHT, and those two do not scale together.** Widen the screen and the
 * camera grows taller while the footer does not, so it climbs. That is what put
 * its top edge through the written line at 1920 when the same numbers were
 * clear at 1440. The bottoms here are set from the widest case rather than the
 * one that happened to be on screen.
 *
 * **They lie ON the sage, not along the bottom edge, and that is the correction
 * the client made.** The first build put all four at `bottom: 0` to `2`, in a
 * flat strip, which is a row of objects on a rule. Measured off the client's
 * drawing, the camera's lowest point is 18% of the footer above its bottom edge
 * and the coffee's is 22%: both sit on the part of the torn sheet that rises at
 * the ends, and only the taped note lies low enough to cross the front strip.
 * That difference in height between the four is most of what makes them read as
 * objects on paper rather than as a border.
 *
 * Two of the four also run off the left and right edges, which the footer's
 * `overflow-hidden` cuts at the sheet. An object that stops politely inside the
 * margin reads as a sticker rather than as something lying on a desk.
 *
 * The colophon is inset to roughly half the sheet, which is what keeps the
 * outer thirds free for all of this. Widths here are only safe against that
 * inset: widen the colophon and the camera goes through the copyright.
 */

export type FooterArtifact = {
  readonly id: string;
  /** Slug in `FOOTER_MEDIA`. */
  readonly image: string;
  /**
   * What the artwork says, for a reader who cannot see it.
   *
   * Two of these carry handwriting inside the picture, so the words exist
   * nowhere else on the page. That is the same rule the impact cards follow:
   * artwork that contains text is not decorative.
   */
  readonly alt: string;
  /** Percentage of the footer's width. */
  readonly left: number;
  /** Percentage of the footer's height, measured up from its bottom edge. */
  readonly bottom?: number;
  /** Percentage of the footer's height, measured down from its top edge. */
  readonly top?: number;
  /** Percentage of the footer's width. Height follows the artwork's own ratio. */
  readonly width: number;
  readonly rotate: number;
  /** Where it travels in from, as a percentage of its own size. */
  readonly from: { readonly x: number; readonly y: number };
  readonly delay: number;
  /**
   * Where this piece goes below `sm`, and whether it goes there at all.
   *
   * `null` means the narrow arrangement leaves it out. A stacked footer has
   * room for two objects along its foot, and four of them at a readable size
   * would be a second page of artwork under the links.
   *
   * These widths serve everything below `lg`, so they are read at 390px and at
   * 1023px alike. They were 36 and 38 and had to come down: a percentage that
   * gives a 140px note on a phone gives a 270px one on a tablet, where it
   * crossed the privacy link.
   */
  readonly phone: { readonly left: number; readonly bottom: number; readonly width: number } | null;
};

export const FOOTER_ARTIFACTS: readonly FooterArtifact[] = [
  {
    id: "camera",
    image: "f1",
    alt: "A film camera lying on its strap",
    left: -2,
    bottom: 11,
    width: 15,
    rotate: -4,
    // In from the left, along the edge it hangs off.
    from: { x: -70, y: 18 },
    delay: 0,
    phone: null,
  },
  {
    id: "note-customers",
    image: "f2",
    alt: 'A taped note reading "Content that brings you customers."',
    left: 7,
    bottom: 3,
    width: 16,
    rotate: 3,
    // In from the left, mostly, with a little lift. It came up from under
    // the sheet at first, and on a phone that was the fault the client
    // reported as "the footer does not scroll to the end": the reader lands
    // on the last screen while the note is still rising through the bottom
    // edge, half of it clipped, and the page looks cut short.
    from: { x: -60, y: 22 },
    delay: 0.06,
    phone: { left: 2, bottom: 1, width: 30 },
  },
  {
    id: "note-people",
    image: "f3",
    alt: 'A clipped note reading "Good content brings good people."',
    left: 89.5,
    top: 5,
    width: 12.5,
    rotate: 5,
    // Down from the top right corner it is pinned to.
    from: { x: 46, y: -78 },
    delay: 0.12,
    phone: null,
  },
  {
    id: "coffee",
    image: "f4",
    alt: 'A cup of coffee beside a torn note reading "Ideas People Progress"',
    left: 87,
    bottom: 13,
    width: 16,
    rotate: -3,
    // In from the right, and less lift than before for the same reason as
    // the note beside it: nothing on this edge may still be below it when
    // the reader arrives.
    from: { x: 64, y: 12 },
    delay: 0.18,
    phone: { left: 64, bottom: 2, width: 32 },
  },
];
