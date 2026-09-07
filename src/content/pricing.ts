import type { Plan } from "@/content/types";

/* Kalaa's packages, exactly as the client supplied them. */
export const PLANS: readonly Plan[] = [
  {
    slug: "launch",
    name: "Launch",
    price: "$199",
    period: "/month",
    summary: "Perfect for startups and small businesses building consistency",
    includes: ["12 Posts", "4 Reels", "Marketing Strategy", "Up to 3 Platforms"],
    cta: "Start with Launch",
    featured: false,
  },
  {
    slug: "growth",
    name: "Growth",
    price: "$449",
    period: "/month",
    summary:
      "Good for ambitious companies and teams with evolving requirements and advanced objectives",
    includes: ["15-18 Posts", "6-8 Reels", "Paid Ads Strategy", "Branding Support"],
    cta: "Start with Growth",
    featured: true,
  },
  {
    slug: "custom",
    name: "Custom",
    /* The client's card reads CUSTOM, then "Custom", then "Pricing", which is the same word twice over. */
    price: "Pricing",
    period: "",
    summary: "Perfect for aspiring entrepreneurs and businesses on the path to success.",
    includes: ["All from Growth package", "Unlimited Posts", "Unlimited Reels", "Premium support"],
    cta: "Tell us what you need",
    featured: false,
  },
];

/** The line that applies to every plan. The client's words, under every button. */
export const PLAN_OFFER = "Feedspace's $49 Plan for Free";
