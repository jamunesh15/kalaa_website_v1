import { SITE } from "../src/site";

/**
 * The only file in `tests/` that changes between projects.
 *
 * Every `.spec.ts` beside it is meant to be byte-identical in every website
 * repository, so that a fix to a check reaches all of them by copying one file.
 * Anything a check needs to know about *this* site is declared here instead of
 * being written into a test.
 *
 * When you copy this suite into a new repository, this is the file to edit.
 */

/** Escapes a literal so it can be dropped into a RegExp safely. */
const literal = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Declared as a type rather than inferred with `as const`.
 *
 * `as const` would narrow each array to its exact length, so a check asking
 * whether a list is empty becomes a compile error the moment this project fills
 * it in. The shape also doubles as the documentation for anyone copying this
 * file into a new repository.
 */
type ProjectConfig = {
  titlePattern: RegExp;
  datedPages: readonly string[];
  crawlerEndpoints: readonly string[];
};

export const PROJECT: ProjectConfig = {
  /**
   * Every page title has to contain the site name.
   *
   * Derived from `src/site.ts` rather than typed again, so renaming the site
   * does not leave a test asserting the old name. A title that has lost the
   * brand is usually a metadata export that was replaced rather than extended.
   */
  titlePattern: new RegExp(literal(SITE.name), "i"),

  /**
   * Routes whose page prints its own "Last updated YYYY-MM-DD" line.
   *
   * These get cross-checked against the date the sitemap publishes for the same
   * page. A reader can see both, so the two disagreeing is a contradiction
   * anyone can catch, and nothing else in the toolchain would notice.
   *
   * Leave the array empty in a project where no page states its own date. The
   * check then reports itself as skipped rather than passing silently.
   */
  datedPages: ["/privacy-policy"],

  /**
   * Paths that must keep answering, whatever else changes.
   *
   * Crawlers and answer engines fetch these directly rather than following a
   * link, so nothing on the site breaks visibly when one starts 404ing.
   */
  crawlerEndpoints: ["/robots.txt", "/sitemap.xml", "/llms.txt"],
};
