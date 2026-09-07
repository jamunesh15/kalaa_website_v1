/**
 * The shapes the site's content comes in.
 *
 * Written as if a CMS were already returning them, because one day something
 * will. The CMS is not chosen yet, so today these are typed arrays in
 * `src/content/`. Pages never import those arrays: they call the accessors in
 * `index.ts`. When a CMS lands, only those accessors change, and every page,
 * route, sitemap entry and schema block keeps working.
 *
 * That indirection is the whole point. A page reaching into a data file is a
 * page that has to be rewritten the day the data moves.
 */

/** One thing Kalaa sells. */
export type Service = {
  readonly slug: string;
  readonly title: string;
  /** One sentence a business owner would recognise as their own problem. */
  readonly summary: string;
  /** What is actually delivered. Concrete nouns, not adjectives. */
  readonly includes: readonly string[];
  /**
   * The deliverables again, as one short line for the card.
   *
   * Separate from `includes` rather than joined from it, because the two answer
   * different questions. `includes` is the full list a service page will show;
   * this is the line that has to finish inside one line of a card that is about
   * 300px wide. Joining the list produced two and three line taglines and made
   * the six cards different heights, so the card now reads a line written to
   * fit and the full list stays intact for the page that has room for it.
   */
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

/**
 * One thing a business owner already knows is going wrong.
 *
 * Written in their words rather than in the agency's, because the section it
 * feeds exists to be recognised, not to inform. `image` is a placeholder path
 * today; see the note in `problems.ts`.
 */
export type Problem = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly image: string;
};

/**
 * One package a business can buy, with its real price.
 *
 * Every field here is the client's own wording and the client's own number,
 * taken from the pricing they supplied. Nothing in this type may be filled in
 * by guessing: a price is the one piece of content on the site a reader will
 * hold the company to, and an invented one is a quote nobody authorised.
 *
 * `price` and `period` are two fields rather than one string because the last
 * plan does not have a number. "Custom" sits where "$449" sits and "Pricing"
 * sits where "/month" sits, so the three cards share one shape instead of the
 * third needing its own layout.
 */
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

/**
 * One piece of Kalaa's own work, ready to draw.
 *
 * A union rather than one shape with optional fields, because a reel and a post
 * need different elements: a reel has three files and plays, a post has two and
 * does not. Optional fields would let a post be written with a poster and a reel
 * with no video, and nothing would say so until the page rendered.
 */
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

/**
 * One question a business owner actually asks, and its answer.
 *
 * The answers are the constraint here rather than the questions. Every one is
 * derived from something the site already states: the five process steps, the
 * service list, the sector list or the pricing table. Nothing in an answer may
 * introduce a fact that exists nowhere else, because an FAQ is the block most
 * likely to be lifted whole into a search result or read aloud by an assistant,
 * and it is marked up as `FAQPage` so a machine reads it as fact.
 *
 * The questions that cannot be answered yet are the interesting ones and they
 * are deliberately absent: how long a contract runs, how quickly Kalaa replies,
 * where Kalaa is, and whether anything is guaranteed. See the open list in
 * CLAUDE.md.
 */
export type FaqItem = {
  readonly slug: string;
  readonly question: string;
  readonly answer: string;
};
