import type { Service } from "@/content/types";

/* What Kalaa sells, in the order a business meets it. */
export const SERVICES: readonly Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    summary:
      "We plan, write, design, and schedule posts so your page stays active and your brand feels consistent.",
    includes: ["Monthly content plan", "Posts and stories", "Captions", "Scheduling"],
    tagline: "Content plan, posts, scheduling",
  },
  {
    slug: "campaign-management",
    title: "Campaign Management",
    summary:
      "We manage paid campaigns across Meta and Google, with creative, setup, testing, and reporting kept together.",
    includes: ["Meta ads", "Google ads", "Creative testing", "Reports"],
    tagline: "Meta ads, Google ads, reporting",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    summary:
      "We create reels, posts, stories, scripts, captions, and shoot plans built around how people actually scroll.",
    includes: ["Reels", "Posts", "Stories", "Shoot planning"],
    tagline: "Reels, posts, shoot planning",
  },
  {
    slug: "website-and-software-development",
    title: "Website and Software Development",
    summary:
      "We build websites, landing pages, lead forms, and business software so attention has a place to convert.",
    includes: ["Websites", "Landing pages", "Lead forms", "Custom software"],
    tagline: "Websites, landing pages, forms",
  },
  {
    slug: "business-growth-strategy",
    title: "Business Growth Strategy",
    summary:
      "We help shape offers, campaigns, and next steps so marketing supports the way your business needs to grow.",
    includes: ["Offer planning", "Campaign direction", "Sales flow", "Growth roadmap"],
    tagline: "Offers, campaigns, sales flow",
  },
  {
    slug: "brand-strategy-and-design",
    title: "Brand Strategy and Design",
    summary:
      "We refine your visual identity, messaging, and content style so people recognise you across every touchpoint.",
    includes: ["Brand identity", "Messaging", "Design system", "Creative direction"],
    tagline: "Identity, messaging, design",
  },
];     
