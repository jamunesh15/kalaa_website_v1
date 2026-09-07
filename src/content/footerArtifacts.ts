/* The four pieces scattered around the footer, and where each one lands. */

export type FooterArtifact = {
  readonly id: string;
  /** Slug in `FOOTER_MEDIA`. */
  readonly image: string;
  /* What the artwork says, for a reader who cannot see it. */
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
  /* Where this piece goes below `sm`, and whether it goes there at all. */
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
    // In from the left, mostly, with a little lift.
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
