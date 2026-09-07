/* The shapes the site's content comes in. */

/** One thing Kalaa sells. */
export type Service = {
  readonly slug: string;
  readonly title: string;
  /** One sentence a business owner would recognise as their own problem. */
  readonly summary: string;
  /** What is actually delivered. Concrete nouns, not adjectives. */
  readonly includes: readonly string[];
  /* The deliverables again, as one short line for the card. */
  readonly tagline: string;
};

/** One approved old-client logo. */
export type ClientLogo = {
  readonly name: string;
  readonly image: string;
  readonly width: number;
  readonly height: number;
};

/** One growth idea shown in the animated home-page stack. */
export type Capability = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly includes: readonly string[];
  readonly label: string;
};

/** One step in a month of work. */
export type ProcessStep = {
  readonly number: string;
  /** One word for the stage. Discovery, Content, Production, Ads, Report. */
  readonly tag: string;
  readonly title: string;
  /** What the client actually receives that month. Nouns, not promises. */
  readonly deliverables: readonly string[];
  /** What the step hands to the next one. Never a result or a number. */
  readonly outcome: string;
};

/* One thing a business owner already knows is going wrong. */
export type Problem = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly image: string;
};

/* One package a business can buy, with its real price. */
export type Plan = {
  readonly slug: string;
  readonly name: string;
  /** The figure, or the word standing in for one. Rendered at the card's largest size. */
  readonly price: string;
  /** What the figure is per. Rendered small, on the price's baseline. */
  readonly period: string;
  /** Who the plan suits. One sentence, in the client's words. */
  readonly summary: string;
  /** What the month actually contains. Counts, not adjectives. */
  readonly includes: readonly string[];
  /** The button's words. Different per plan, because the three asks are different. */
  readonly cta: string;
  /** The one plan drawn as the filled card. Exactly one may set this. */
  readonly featured: boolean;
};

/* One piece of Kalaa's own work, ready to draw. */
export type WorkPiece =
  | {
      readonly kind: "reel";
      readonly slug: string;
      readonly webm: string;
      readonly mp4: string;
      readonly poster: string;
      readonly alt: string;
    }
  | {
      readonly kind: "post";
      readonly slug: string;
      readonly src: string;
      readonly small: string;
      readonly width: number;
      readonly height: number;
      readonly alt: string;
    };

/* One question a business owner actually asks, and its answer. */
export type FaqItem = {
  readonly slug: string;
  readonly question: string;
  readonly answer: string;
};
