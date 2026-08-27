import { SITE, absoluteUrl } from "@/site";

/**
 * The site's structured data, built rather than typed.
 *
 * Search engines and answer engines read this to work out what Kalaa is, and
 * nothing on a page tells a person when it goes missing. It went missing once
 * already: stripping the v1 design layer took the JSON-LD out of `page.tsx`
 * with it, and only `tests/seo.spec.ts` noticed. That test asserts the types
 * below are present, which is why this lives in its own module now instead of
 * inside whichever page happened to hold it.
 *
 * One `@graph` rather than several loose blocks, so the nodes can reference
 * each other by `@id` and a crawler reads one connected description of the site
 * instead of three unrelated ones.
 */

/** A JSON-LD node. Loose on purpose: schema.org is wider than any type we would write. */
export type SchemaNode = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/**
 * What Kalaa is, as one node.
 *
 * The description is the business's own. Nothing here may claim a founding
 * date, an address, a rating, an employee count or a social profile that has
 * not been verified: an invented `sameAs` or `aggregateRating` is a false
 * statement made in a format built to be trusted.
 *
 * When the real details arrive, add `logo`, `sameAs`, `telephone` and
 * `address`, and upgrade the type to `LocalBusiness` if Kalaa serves a place.
 */
function organization(): SchemaNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: absoluteUrl("/"),
    description:
      "Kalaa is a creative social media marketing agency helping businesses build stronger brands through social strategy, content creation, campaign management, creative direction, and performance-focused marketing.",
  };
}

/** The site itself, published by the organisation above. */
function website(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: absoluteUrl("/"),
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: SITE.locale,
  };
}

/**
 * The graph every page carries.
 *
 * Page-specific nodes get appended by the page that owns them, so a service
 * page can add `Service`, a case study can add `Article`, and the FAQ can add
 * `FAQPage` once there are real questions on it. Marking up an FAQ a page does
 * not show would be a claim about content that is not there.
 */
export function siteGraph(...nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), ...nodes],
  };
}
