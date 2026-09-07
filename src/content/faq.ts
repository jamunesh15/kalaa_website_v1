import type { FaqItem } from "@/content/types";

/**
 * The questions a business owner asks before they enquire.
 *
 * Written from the page rather than invented for it. Each answer restates
 * something the site already commits to somewhere else, so the FAQ cannot drift
 * away from what the rest of the page says: the process steps in `process.ts`,
 * the services in `services.ts`, the sectors in `sectors.ts` and the plans in
 * `pricing.ts`. Change one of those and check this file in the same edit.
 *
 * **This is the block most likely to be quoted.** It is marked up as `FAQPage`,
 * which means a search engine may lift a question and its answer whole, and an
 * assistant may read one aloud with no page around it. So no answer here leans
 * on context from the section above it, and no answer states a fact that is not
 * already true elsewhere on the site.
 *
 * Four questions people definitely ask are missing on purpose, because nobody
 * has confirmed the answers: how long the commitment is, how quickly Kalaa
 * replies, where Kalaa is based, and whether anything is guaranteed. Inventing
 * any of them would put a false statement into structured data, which is the
 * worst place on the site to put one.
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    slug: "what-happens-first-month",
    question: "What happens in the first month?",
    answer:
      "The same five steps that run every month after it. We learn your business and what your buyers ask, plan the month's content, shoot and design and write it, run the ads, then send a report on what happened and what we would repeat.",
  },
  {
    slug: "who-makes-the-content",
    question: "Do you make the content, or do we send it to you?",
    answer:
      "We make it. Reels, posts, stories, captions and shoot plans are all ours to produce. You approve the plan before anything is made and nothing publishes without your approval.",
  },
  {
    slug: "ads-as-well-as-posts",
    question: "Do you run ads as well as posts?",
    answer:
      "Yes. Meta and Google campaigns, the creative that goes in them, testing between versions, and retargeting people who have already watched. The ads and the posts are planned together rather than by two separate teams.",
  },
  {
    slug: "what-you-need-from-us",
    question: "What do you need from us to start?",
    answer:
      "Your offer, who buys it, and who you compete with. That is the discovery step, and what comes out of it becomes the content plan rather than sitting in a document nobody opens.",
  },
  {
    slug: "our-industry",
    question: "Do you work with businesses like ours?",
    answer:
      "We work with architects, interior designers, restaurants, food businesses, machinery and industrial firms, and import and export companies, and with any other business that needs marketing.",
  },
  {
    slug: "website-too",
    question: "Can you build our website as well?",
    answer:
      "Yes. Websites, landing pages, lead forms and custom software. It matters because attention with nowhere to land is wasted, and a campaign pointed at a page that cannot take an enquiry is the most common way spend disappears.",
  },
  {
    slug: "how-we-know-it-works",
    question: "How will we know whether it is working?",
    answer:
      "A report every month covering reach, saves and shares, what the ad spend did and what enquiries came in, and what we would repeat next month. Next month's plan is built on it.",
  },
];
