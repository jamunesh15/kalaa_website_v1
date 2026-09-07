/* The impact board: four result cards and a note. */
export type ImpactArtifact = {
  readonly id: string;
  /** Slug in `IMPACT_MEDIA`. */
  readonly image: string;
  readonly alt: string;
  readonly rotate: number;
  readonly from: { readonly x: number; readonly y: number };
};

/* The four cards, in reading order across the two by two grid. */
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

/* The clipped note under the copy. */
export const IMPACT_NOTE: ImpactArtifact = {
  id: "note",
  image: "i1",
  alt: "A pinned note reading: good content starts conversations, great strategy builds growth.",
  rotate: -2,
  from: { x: -30, y: 46 },
};
