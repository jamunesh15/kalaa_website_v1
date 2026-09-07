/**
 * The impact board: four result cards and a note.
 *
 * **These artifacts carry their own words, which is what separates this set
 * from every other one on the site.** The hero's sheets and the about board's
 * polaroids are pictures of work, so they are `aria-hidden` and the page says
 * what it means in real text beside them. Here the figure and the label live
 * inside the picture: "3.6X" and "MORE REACH" exist nowhere else in the
 * markup. So each one carries real alt text naming its figure, its label and
 * its line, and none of them is hidden. A screen reader gets the same four
 * results a sighted reader does.
 *
 * That is also why the encode is 90 quality at a 1600px long edge rather than
 * the about board's 82 at 1200: compression artefacts around black type on
 * cream read as a blurry card, where the same artefacts on a photograph of a
 * desk read as nothing at all. See the set's entry in `scripts/artifacts.mjs`.
 *
 * **The figures are the client's own and are published as supplied.** They are
 * baked into the artwork rather than set in the page, so changing one means new
 * artwork rather than an edit here. Whoever replaces that artwork has to update
 * the `alt` on the same line, because nothing checks that the two agree.
 *
 * `from` is where a piece travels in from, as a percentage of its own size.
 * Each card comes in from the corner nearest where it lands, so the four arrive
 * outward from the middle rather than converging on a point.
 */
export type ImpactArtifact = {
  readonly id: string;
  /** Slug in `IMPACT_MEDIA`. */
  readonly image: string;
  readonly alt: string;
  readonly rotate: number;
  readonly from: { readonly x: number; readonly y: number };
};

/**
 * The four cards, in reading order across the two by two grid.
 *
 * Reach, engagement, enquiries, sales, which is the order the results happen
 * in rather than the order of their size. A reader follows it as a sequence:
 * more people saw it, more of them cared, more of them asked, more of them
 * bought. Sorted by multiplier it would read as a leaderboard with the
 * smallest and most valuable number last.
 */
export const IMPACT_CARDS: readonly ImpactArtifact[] = [
  {
    id: "reach",
    image: "i5",
    alt: "3.6X more reach. More people discovered our clients across platforms.",
    rotate: -1,
    from: { x: -42, y: -34 },
  },
  {
    id: "engagement",
    image: "i4",
    alt: "3.2X more engagement. Content that people care about and actually interact with.",
    rotate: 1.5,
    from: { x: 42, y: -34 },
  },
  {
    id: "enquiries",
    image: "i3",
    alt: "2.8X more enquiries. High-intent enquiries every single month.",
    rotate: -1.5,
    from: { x: -42, y: 34 },
  },
  {
    id: "sales",
    image: "i2",
    alt: "1.7X more sales. Turning attention into real customers.",
    rotate: 1,
    from: { x: 42, y: 34 },
  },
];

/**
 * The clipped note under the copy.
 *
 * It sits in the text column rather than with the cards, and that is the point
 * of it: the cards are the evidence and this is the sentence the evidence is
 * for. Handwriting is also the only place that voice appears on the page now,
 * since the heading beside it is set in the site's own two faces rather than in
 * a third, script face bought for one line.
 */
export const IMPACT_NOTE: ImpactArtifact = {
  id: "note",
  image: "i1",
  alt: "A pinned note reading: good content starts conversations, great strategy builds growth.",
  rotate: -2,
  from: { x: -30, y: 46 },
};
