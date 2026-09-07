/* The about board, as a laid-out set of objects rather than one picture. */
export type AboutArtifact = {
  readonly id: string;
  /** Slug in `ABOUT_MEDIA`. */
  readonly image: string;
  /** Percentages of the composition box. */
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly rotate: number;
  /** Where it travels in from, as a percentage of its own size. */
  readonly from: { readonly x: number; readonly y: number };
  readonly delay: number;
  /* Where this piece goes below `sm`, and whether it goes there at all. */
  readonly phone?: { readonly left: number; readonly top: number; readonly width: number } | null;
};

export const ABOUT_ARTIFACTS: readonly AboutArtifact[] = [
  {
    id: "plan",
    image: "a1",
    left: 4,
    top: 0,
    width: 92,
    rotate: -2,
    from: { x: 0, y: -82 },
    delay: 0.02,
    phone: { left: 2, top: 0, width: 96 },
  },
  {
    id: "snapshot",
    image: "a2",
    left: 0,
    top: 51,
    width: 23,
    rotate: -5,
    from: { x: -92, y: 10 },
    delay: 0.1,
    phone: { left: 0, top: 50, width: 27 },
  },
  {
    id: "note-plan",
    image: "a3",
    left: 20,
    top: 51,
    width: 24,
    rotate: 2,
    from: { x: -40, y: 70 },
    delay: 0.18,
    phone: { left: 22, top: 50, width: 27 },
  },
  {
    id: "post-arrival",
    image: "a4",
    left: 42,
    top: 51,
    width: 23,
    rotate: -2,
    from: { x: 0, y: 92 },
    delay: 0.26,
    phone: { left: 44, top: 50, width: 27 },
  },
  {
    id: "month",
    image: "a11",
    left: 62,
    top: 56,
    width: 25,
    rotate: 2,
    from: { x: 24, y: 96 },
    delay: 0.34,
    phone: { left: 68, top: 55, width: 28 },
  },
  {
    id: "phone",
    image: "a12",
    left: 84,
    top: 60,
    width: 15,
    rotate: 8,
    from: { x: 92, y: 60 },
    delay: 0.42,
    phone: null,
  },
];
