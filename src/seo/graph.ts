import { getChannels, getSocials, getStudio } from "@/content";
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
 * `sameAs` is built from `getSocials()` rather than typed here, so the profiles
 * a reader can click and the profiles a crawler is told about are the same
 * list. Two lists would drift, and the one nobody looks at would be the one
 * left wrong. It is omitted entirely while that list is empty: an empty array
 * is still a claim, and the claim would be "this business has no profiles".
 *
 * `email`, `telephone` and `address` are read from the same content module the
 * footer and the contact page render, so what a crawler is told and what a
 * visitor can see are the same values. The address is the client's own
 * correction of 2026-09-06, which is what makes it safe to state here at all:
 * structured data is read as fact, and the address this replaced was out of
 * date.
 *
 * Still missing: `logo`, and the upgrade to `LocalBusiness`. That upgrade is
 * worth real money in local search for a business with a door, and it is not
 * made here because `LocalBusiness` invites `openingHours` and `priceRange`,
 * and neither has been agreed.
 */
function organization(): SchemaNode {
  /*
    Profiles only. WhatsApp is in the footer's row of buttons because it is
    somewhere a reader can reach Kalaa, but a `wa.me` deep link carrying a
    pre-filled message is a conversation, not a page about the business, which
    is what `sameAs` describes. Listing it would be telling a crawler that a
    chat window is Kalaa's profile.
  */
  const profiles = getSocials().filter((profile) => profile.icon !== "whatsapp");
  const channels = getChannels();
  const email = channels.find((channel) => channel.icon === "mail")?.value;
  const telephone = channels.find((channel) => channel.icon === "phone")?.value;
  const studio = getStudio();

  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: absoluteUrl("/"),
    ...(profiles.length > 0 ? { sameAs: profiles.map((profile) => profile.href) } : null),
    ...(email ? { email } : null),
    ...(telephone ? { telephone } : null),
    address: { "@type": "PostalAddress", ...studio.postal },
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
 * The questions on a page, as `FAQPage`.
 *
 * Google's own condition for this markup is that every question and answer it
 * describes is visible on the page, so this takes the same array the section
 * renders rather than a copy written for crawlers. A separate list would drift
 * within a month and the markup would then be describing content that is not
 * there, which is the failure this node is most often used to commit.
 *
 * Only ever called by a page that actually shows the questions.
 */
export function faqPage(items: readonly { question: string; answer: string }[]): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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

/**
 * The contact page, as `ContactPage`.
 *
 * It says three things a crawler cannot infer from the markup: that this URL is
 * the page for reaching this organisation, that it belongs to this site, and
 * which organisation it is about. The channels themselves are already on the
 * Organization node, where they describe the business rather than the page, so
 * they are not repeated here.
 */
export function contactPage(): SchemaNode {
  return {
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contact")}#webpage`,
    url: absoluteUrl("/contact"),
    name: "Contact",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: SITE.locale,
  };
}
