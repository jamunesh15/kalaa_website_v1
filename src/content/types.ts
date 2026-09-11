import type { StaticImageData } from "next/image";

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
  /**
   * The long form, for the services page only.
   *
   * Two or three sentences saying what actually happens and what the client
   * ends up holding. Not a restatement of `summary` at greater length: the
   * summary is the pitch and this is the method, which is what somebody
   * comparing two agencies is reading for.
   */
  readonly detail: string;
  /**
   * What the client ends up holding, as whole lines.
   *
   * Separate from `includes` because the two do different jobs. `includes` is
   * chips on a card and reads as "Captions", "Scheduling", which is fine at a
   * glance and useless on a page somebody is reading to decide. These are
   * sentences, and they say what is actually handed over.
   */
  readonly delivers: readonly string[];
  /** Slug in `SERVICE_DETAIL_MEDIA`, and the picture beside it on the services page. */
  readonly image: string;
  readonly alt: string;
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
  /** Slug in `CARD_MEDIA`. */
  readonly image: string;
  readonly imageAlt: string;
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
  /**
   * Rupees per month, as a number.
   *
   * Every figure on the card is derived from this one: what a quarter costs,
   * what a year costs, and the struck price beside each. A plan's price is
   * therefore changed in one place and cannot fall out of step with its own
   * discount.
   */
  readonly monthly: number;
  /** Who the plan suits. One sentence, in the client's words. */
  readonly summary: string;
  /** The three figures in the strip under the price. Counts, not adjectives. */
  readonly reelsPerMonth: number;
  readonly shoots: number;
  /** What the month actually contains. Counts, not adjectives. */
  readonly includes: readonly string[];
  /** The mark on the card. Chosen for what the plan is, so it travels with the plan rather than with the column. */
  readonly icon: "rocket" | "chart" | "team";
  /** The button's words. Different per plan, because the three asks are different. */
  readonly cta: string;
  /** The one plan drawn as the filled card. Exactly one may set this. */
  readonly featured: boolean;
};

export type BillingKey = "monthly" | "quarterly" | "annual";

/**
 * How long a visitor is buying for, and what that earns them.
 *
 * `paidMonths` is what they are charged for and `months` is what they get. The
 * discount is the difference, so nothing states a percentage anybody has to
 * trust: the struck figure is `monthly * months` and the price is
 * `monthly * paidMonths`, and both are arithmetic the reader can do.
 */
export type BillingTerm = {
  readonly key: BillingKey;
  readonly label: string;
  readonly paidMonths: number;
  readonly months: number;
  /** What the figure is per. Rendered small, on the price's baseline. */
  readonly period: string;
  /** The months cell in the stat strip: "1", "2+1", "6+6". */
  readonly monthsLabel: string;
  /** The line under the price. Empty when nothing is free. */
  readonly offer: string;
};

/* One client, on camera. */
export type Testimonial = {
  readonly slug: string;
  readonly name: string;
  /** What they do. Null where they did not say. */
  readonly role: string | null;
  /** Their business. Null where they did not say. */
  readonly company: string | null;
  /** Their own written words. Only one of the four wrote any. */
  readonly quote: string | null;
  /** What they said on camera, in English. Their sentences, not ours. */
  readonly spoken: string | null;
  /** The language they said it in. The card names it, so the reader knows. */
  readonly spokenFrom: string | null;
  /** Out of five, as they left it. */
  readonly rating: number;
  readonly mp4: string;
  readonly poster: string;
  /** Their photograph, where there is one. */
  readonly avatar: string | null;
  readonly width: number;
  readonly height: number;
  /** Seconds. */
  readonly duration: number;
};

/*
 * One client's message about a piece of work, shown beside the work it is about.
 *
 * `about` names what they were reacting to, in two or three words, and it is
 * read off the screenshot rather than assumed. It is what stops a reel
 * compliment being filed under advertising.
 */
export type Proof = {
  /** The tight cut of the message, from `scripts/whatsapp.mjs`. */
  readonly peek: StaticImageData;
  /** The client's own photograph, from their Feedspace record. */
  readonly avatar: string;
  readonly name: string;
  readonly company: string | null;
  /** What the client was replying to, read off the screenshot. Never the service. */
  readonly about: string;
};

/* A client who wrote rather than filmed. */
export type WrittenReview = {
  readonly slug: string;
  readonly name: string;
  readonly role: string | null;
  readonly company: string | null;
  readonly rating: number;
  /** Their own words, as they wrote them. */
  readonly quote: string;
  readonly avatar: string | null;
  /**
   * The message itself, cut and redacted by `scripts/whatsapp.mjs`.
   *
   * Null where there is no screenshot: some of these came from the review form
   * rather than a chat, and there is nothing to show. The words above are a
   * transcription of what is in this picture where there IS one, so the two
   * cannot be edited apart: change one and the card contradicts itself.
   */
  readonly shot: StaticImageData | null;
};

/* One piece of Kalaa's own work, ready to draw. */
export type WorkPiece =
  | {
      readonly kind: "reel";
      readonly slug: string;
      readonly webm: string;
      readonly mp4: string;
      readonly poster: string;
      /** The whole reel with its sound, for the player. */
      readonly full: string;
      readonly fullWidth: number;
      readonly fullHeight: number;
      /** Seconds. */
      readonly duration: number;
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

/** One piece of supplied artwork, and where it lands on its board. */
export type Artifact = {
  readonly id: string;
  /** Slug in the set's generated media module. */
  readonly image: string;
  /* What the artwork says, for a reader who cannot see it. */
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

/** One entry in a set written by `npm run artifacts`. */
export type ArtifactMedia = {
  readonly slug: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

/* One blog article. Local data now, shaped like a CMS response so a CMS later is a fetch swap. */
export type Article = {
  readonly slug: string;
  /** The filter row is built from these, so a new topic needs no other change. */
  readonly topic: string;
  readonly title: string;
  /** Two lines at most, in the same voice as the page it sits on. */
  readonly excerpt: string;
  /** Slug in `BLOG_MEDIA`. The article's own title is printed inside the picture. */
  readonly image: string;
  readonly alt: string;
  /**
   * The meta description, where the excerpt runs past the roughly 155
   * characters a results page shows. Falls back to `excerpt`.
   */
  readonly description?: string;
  /** ISO date it was first published. Left out rather than invented. */
  readonly published?: string;
  /** ISO date its content last changed. Falls back to `published`. */
  readonly updated?: string;
};

/* One part of an article, and one entry in its table of contents. */
export type ArticleSection = {
  /** The anchor, and what the contents list links to. Unique within one article. */
  readonly id: string;
  readonly heading: string;
  /**
   * Paragraphs. Two marks are allowed and nothing else: `**strong**`, and
   * `[words](/path)` for a link to a page on this site. Internal paths only, so
   * a stray bracket can never become a link off the site.
   */
  readonly body: readonly string[];
  /** For a section that is a list rather than prose. Same two marks. */
  readonly list?: readonly string[];
  readonly table?: ArticleTable;
  readonly flow?: ArticleFlow;
  /** Paragraphs after the table or the diagram. Same two marks. */
  readonly after?: readonly string[];
  /** Parts under this heading, set as `h3`. Not in the contents list. */
  readonly subsections?: readonly ArticleSubsection[];
};

/* One part under a section heading. Renders body, list, table, flow, after. */
export type ArticleSubsection = {
  readonly id: string;
  readonly heading: string;
  readonly body: readonly string[];
  readonly list?: readonly string[];
  readonly table?: ArticleTable;
  readonly flow?: ArticleFlow;
  readonly after?: readonly string[];
};

/*
 * A table in an article: a caption, a header row, and the rows under it.
 *
 * A real `<table>`, never a picture of one. It is the format search engines
 * lift whole into a results page and the one answer engines quote, and it is
 * read correctly by a screen reader, which a screenshot of a table is not. The
 * first cell of each row is its heading. Cells take the same two marks.
 */
export type ArticleTable = {
  /** Plain words. Read by a screen reader and by search engines. */
  readonly caption: string;
  readonly head: readonly string[];
  readonly rows: readonly (readonly string[])[];
};

/*
 * Steps in order, drawn as a diagram from HTML rather than an image, so the
 * words in it are text a crawler reads. An ordered list underneath, because the
 * order is the point: this is the one place a number beside each item is
 * information rather than decoration.
 */
export type ArticleFlow = {
  readonly caption: string;
  readonly steps: readonly { readonly title: string; readonly text: string }[];
  /** A line under the last step, for a cycle that feeds back into its start. */
  readonly loop?: string;
};

/* What an article says, as opposed to what the card for it says. */
export type ArticleBody = {
  /** Before the first heading, so it is never in the contents. */
  readonly intro: readonly string[];
  readonly sections: readonly ArticleSection[];
  /**
   * Questions answered at the foot, visible on the page and marked up as
   * `FAQPage`. Only ever questions the page actually shows.
   */
  readonly faq?: readonly { readonly question: string; readonly answer: string }[];
};

/** An article and its body, which is what a page needs and a card does not. */
export type FullArticle = Article & ArticleBody;

/* One question a business owner actually asks, and its answer. */
export type FaqItem = {
  readonly slug: string;
  readonly question: string;
  readonly answer: string;
};
