import type { FaqItem } from "@/content/types";

/* The questions a business owner asks before they enquire. */
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
