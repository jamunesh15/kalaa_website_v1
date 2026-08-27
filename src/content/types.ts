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
};

/** One step in a month of work. */
export type ProcessStep = {
  readonly number: string;
  readonly title: string;
  readonly summary: string;
};
