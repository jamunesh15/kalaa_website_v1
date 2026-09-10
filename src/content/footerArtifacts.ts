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
  /**
   * Draw this one only on the widest layouts.
   *
   * For a piece on an edge the content grows into. Measured on the coffee: the
   * contact column's button reaches 98% of the footer's width at 1024 and the
   * right hand copy runs to 95% of its height, so there is no room for it there
   * at any size. Not drawn beats drawn behind a button.
   *
   * The width itself is in `footer-piece-extra-wide-only` in `utilities.css`,
   * so the breakpoint is one number in one place.
   */
  readonly extraWideOnly?: boolean;
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
    /*
     * 93.5, not 87.
     *
     * At 87 this piece ran from 87% to 103% of the footer's width while the
     * "Start a conversation" button ends at 91.7%, so the cup sat behind the one
     * control in that column at every width from 1120 to 1600. Decoration does
     * not share space with a button. It is cropped harder by the footer's own
     * `overflow-hidden` now, which is what this piece was always doing on that
     * edge.
     */
    left: 93.5,
    bottom: 11,
    width: 16,
    /* The button's right edge is at 84.5% of the footer at 1728, 91.7% at 1440
       and 96.7% by 1245, so below the widest layouts this has nowhere to be. */
    extraWideOnly: true,
    rotate: -3,
    // In from the right, and less lift than before for the same reason as
    // the note beside it: nothing on this edge may still be below it when
    // the reader arrives.
    from: { x: 64, y: 12 },
    delay: 0.18,
    phone: { left: 64, bottom: 2, width: 32 },
  },
];
