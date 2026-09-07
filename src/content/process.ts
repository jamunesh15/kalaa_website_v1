import type { ProcessStep } from "@/content/types";

/**
 * A month of social media work, in the order it happens.
 *
 * Numbered because the order is real, not because a numbered list looks
 * organised. If two of these could swap places, they should be one step.
 *
 * Written in the work rather than in the abstract. "We put money behind it"
 * described a budget moving; "We run ads for leads" describes the thing a
 * client is buying. Every line names something an agency does to a social
 * account: shoot days, captions, retargeting, saves and shares. The version
 * before this one would have suited any agency of any kind, which is another
 * way of saying it described none.
 *
 * Nothing here states a timescale, a result, a reach figure or a cost, because
 * none of those are verified for Kalaa and a process section is where an
 * invented one reads most like a commitment. `outcome` is what the step hands
 * to the next step, never what it earns.
 */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    tag: "Discovery",
    title: "We learn your business",
    deliverables: ["Your offer and your buyers", "What your competitors post", "Questions buyers ask"],
    outcome: "This becomes the content plan.",
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
    title: "We shoot, design and write",
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
    deliverables: ["Reach, saves and shares", "Ad spend and enquiries", "What to repeat next month"],
    outcome: "Next month is planned on it.",
  },
];
