import { getChannels, getSocials, getStudio } from "@/content";
import { SITE, absoluteUrl } from "@/site";

/* The site's structured data, built rather than typed. */

/** A JSON-LD node. Loose on purpose: schema.org is wider than any type we would write. */
export type SchemaNode = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/* What Kalaa is, as one node. */
function organization(): SchemaNode {
  /* Profiles only. */
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
      "Kalaa is a technology growth partner helping businesses grow revenue through social media, content, paid campaigns, websites and software.",
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

/* The questions on a page, as `FAQPage`. */
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

/* The graph every page carries. */
export function siteGraph(...nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), ...nodes],
  };
}

/* The blog index, as `CollectionPage`. It lists no posts, because none are published yet. */
export function blogPage(): SchemaNode {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/blog")}#webpage`,
    url: absoluteUrl("/blog"),
    name: "Blog",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: SITE.locale,
  };
}

/*
 * One article, as `BlogPosting`.
 *
 * No `datePublished` and no named author, because neither is known: the dates on
 * this blog were invented and were taken out, and structured data is read by a
 * machine as fact. The organisation is the author, which is true.
 */
export function articlePage(article: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}): SchemaNode {
  const path = `/blog/${article.slug}`;

  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.image),
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: SITE.locale,
  };
}

/* The contact page, as `ContactPage`. */
/*
 * The services page, and the six services on it as an `ItemList`.
 *
 * Name and description only. No price and no `Offer`, deliberately: the packages
 * have real figures from the client, but a plan is not the same thing as a
 * service, and pricing one against the other in structured data would state a
 * fact that is not true. Machines read this as fact.
 */
export function servicesPage(
  services: readonly { slug: string; title: string; summary: string }[],
): SchemaNode {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/services")}#webpage`,
    url: absoluteUrl("/services"),
    name: "Services",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: SITE.locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${absoluteUrl("/services")}#${service.slug}`,
          provider: { "@id": ORGANIZATION_ID },
        },
      })),
    },
  };
}

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
