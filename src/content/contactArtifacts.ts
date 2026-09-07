/**
 * The contact page's artwork, and where each piece lands.
 *
 * Same model as the about board and the footer: every number is a percentage of
 * the box its arrangement is given, so one set of coordinates serves every
 * width and the pieces shrink with the column rather than needing a second
 * arrangement per breakpoint.
 *
 * Two arrangements, because the page uses artwork twice and for different
 * reasons. The opening pair is a still life a reader looks at while deciding
 * whether to write. The checklist is not decoration at all: it is the section's
 * content, photographed, which is why it is alone in its box and why its alt
 * text carries all four lines.
 */

export type ContactArtifact = {
  readonly id: string;
  /** Slug in `CONTACT_MEDIA`. */
  readonly image: string;
  /**
   * What the artwork says, for a reader who cannot see it.
   *
   * Every one of these carries handwriting inside the picture, so the words
   * exist nowhere else on the page. Artwork that contains text is not
   * decorative, and the impact cards set that rule on this site already.
   */
  readonly alt: string;
  /** Percentages of the box the arrangement is given. */
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly rotate: number;
  /** Where it travels in from, as a percentage of its own size. */
  readonly from: { readonly x: number; readonly y: number };
  readonly delay: number;
};

/**
 * The opening still life: the notebook and coffee, with the clipped note
 * landing over its corner.
 *
 * The note is written second so it lies on top, which is the order paper lands
 * on a desk. It also arrives second, from the left, while the notebook comes in
 * from the right: two pieces travelling the same way read as one object sliding
 * rather than as two being set down.
 */
export const HERO_ARTIFACTS: readonly ContactArtifact[] = [
  {
    id: "desk",
    image: "c2",
    alt: "A notebook reading Ideas, People, Brands, beside a pen and a cup of coffee",
    left: 42,
    top: 0,
    width: 56,
    rotate: 2,
    from: { x: 58, y: -26 },
    delay: 0,
  },
  {
    id: "note",
    image: "c1",
    alt: 'A clipped note reading "Good ideas start with a conversation."',
    left: 0,
    top: 20,
    width: 49,
    rotate: -3,
    from: { x: -62, y: 34 },
    delay: 0.12,
  },
];

/** The brief section's one piece, which is the section's content rather than a picture beside it. */
export const BRIEF_ARTIFACTS: readonly ContactArtifact[] = [
  {
    id: "checklist",
    image: "c4",
    alt: "A checklist reading: what your brand does, what you want to achieve, what's not working right now, how we can help. Underneath, in handwriting: that's enough.",
    left: 0,
    top: 0,
    width: 100,
    rotate: -1.5,
    from: { x: 34, y: 30 },
    delay: 0,
  },
];
