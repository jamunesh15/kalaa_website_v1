import type { Plan } from "@/content/types";

/**
 * Kalaa's packages, exactly as the client supplied them.
 *
 * Every figure, every sentence and every button label here is the client's own
 * wording, transcribed rather than rewritten. This is the one content file on
 * the site where a change of phrasing is a change to a commercial offer, so
 * nothing in it gets tidied, shortened or made consistent with the tone of the
 * rest of the page without being asked for.
 *
 * The counts are ranges where the client wrote ranges. "15-18 Posts" is not
 * rounded to "15 Posts" and not softened to "up to 18": a range is what was
 * offered and a reader comparing two cards is comparing the numbers.
 *
 * Exactly one plan is `featured`. The card component reads that flag rather
 * than an index, so reordering the array cannot silently move the fill to a
 * different plan.
 *
 * `PLAN_OFFER` applies to every plan and is printed under each plan's own
 * button, which is where the client's layout has it. It was tried once below
 * the row first, on the rule against showing one piece of information three
 * times inside one component, and the client asked for it back in the card.
 */
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
    /*
      The client's card reads CUSTOM, then "Custom", then "Pricing", which is
      the same word twice over. Split across the name and the figure it says
      both of the client's words once each and nothing is invented: the heading
      is "Custom" and the slot the other two cards spend on a number reads
      "Pricing".
    */
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
