/* Everything on this site that is not real yet, in one file. */

/* One piece of content flying into the hero. */
export type HeroArtifact = {
  readonly id: string;
  /* The slug of a cutout in `HERO_MEDIA`. */
  readonly image: string;
  /* The stage of the month this artifact belongs to. */
  readonly stage: string;
  /* Which edge of its own artwork the stage tab straddles, and how far down it. */
  readonly labelSide: "left" | "right";
  readonly labelTop: number;
  /* Hang this tab further off its sheet than the rest. */
  readonly labelFar?: boolean;
  /* Extra degrees on the tab alone, for artwork that is drawn on a slant. */
  readonly labelRotate?: number;
  readonly width: number;
  readonly left: number;
  readonly top: number;
  readonly rotate: number;
  readonly from: { readonly x: number; readonly y: number };
  /** Seconds. Cards land first and the chips answer them. */
  readonly delay: number;
};

/* The hero composition. */
export const HERO_ARTIFACTS: readonly HeroArtifact[] = [
  {
    id: "ideate",
    image: "a4",
    stage: "01 Ideate",
    labelSide: "left",
    labelTop: 20,
    labelRotate: -11,
    width: 44,
    left: 6,
    top: 0,
    /* Shallower than the other three, and it is the one sheet that needs to be. */
    rotate: -3,
    from: { x: 0, y: -60 },
    delay: 0,
  },
  {
    id: "plan",
    image: "a3",
    stage: "02 Plan",
    labelSide: "left",
    labelTop: 16,
    labelFar: true,
    width: 44,
    left: 6,
    top: 50,
    rotate: -5,
    from: { x: -70, y: 0 },
    delay: 0.12,
  },
  {
    id: "create",
    image: "a1",
    stage: "03 Create",
    labelSide: "right",
    labelTop: 70,
    width: 42,
    left: 52,
    top: 10,
    rotate: -4,
    from: { x: 70, y: -20 },
    delay: 0.24,
  },
  {
    id: "publish",
    image: "a2",
    stage: "04 Publish",
    labelSide: "right",
    labelTop: 80,
    width: 42,
    left: 52,
    top: 58,
    rotate: -2,
    from: { x: 20, y: 60 },
    delay: 0.36,
  },
];

