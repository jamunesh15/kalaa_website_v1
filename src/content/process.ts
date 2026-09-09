import type { ProcessStep } from "@/content/types";

/* A month of work, in the order it happens. */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    tag: "Discovery",
    title: "We learn your business",
    deliverables: ["Your offer and your buyers", "What your competitors run", "Questions buyers ask"],
    outcome: "This becomes the plan.",
  },
  {
    number: "02",
    tag: "Content plan",
    title: "We plan the month",
    deliverables: ["Monthly content calendar", "Reel and post ideas", "Approval before anything goes out"],
    outcome: "Nothing publishes unread.",
  },
  {
    number: "03",
    tag: "Production",
    title: "We shoot and design",
    deliverables: ["Reels and shoot days", "Posts and stories", "Captions and hashtags"],
    outcome: "Approved work goes live.",
  },
  {
    number: "04",
    tag: "Ads",
    title: "We run ads for leads",
    deliverables: ["Meta and Google campaigns", "Creative testing", "Retargeting warm viewers"],
    outcome: "Spend follows what performs.",
  },
  {
    number: "05",
    tag: "Report",
    title: "We report what happened",
    deliverables: ["Enquiries and where they came from", "Ad spend against results", "Reach, saves and shares"],
    outcome: "Next month is planned on it.",
  },
];
