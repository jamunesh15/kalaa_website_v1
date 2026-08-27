import type { ProcessStep } from "@/content/types";

/**
 * A month with Kalaa, in the order it happens.
 *
 * Numbered because the order is real, not because a numbered list looks
 * organised. If two of these could swap places, they should be one step.
 */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    title: "We learn the business",
    summary:
      "What you sell, who buys it, what they ask before they buy, and what a good month looks like to you.",
  },
  {
    number: "02",
    title: "We plan the month",
    summary:
      "A calendar you can see before anything is made, so nothing goes out that you have not read.",
  },
  {
    number: "03",
    title: "We make the work",
    summary: "Shooting, designing, writing and editing. You approve, we publish.",
  },
  {
    number: "04",
    title: "We put money behind it",
    summary:
      "The posts worth boosting get boosted, and the ads go to the people most likely to reply.",
  },
  {
    number: "05",
    title: "We tell you what happened",
    summary:
      "What was published, what it cost, and how many people got in touch. Then we plan the next month around it.",
  },
];
