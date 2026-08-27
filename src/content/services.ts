import type { Service } from "@/content/types";

/**
 * What Kalaa sells, in the order a business meets it.
 *
 * Every line describes work that is actually done. Nothing here claims a
 * timescale, a result or a number, because none of those have been verified and
 * a service page is where invented ones do the most damage.
 */
export const SERVICES: readonly Service[] = [
  {
    slug: "social-media",
    title: "Social media, run properly",
    summary:
      "Your accounts, planned a month at a time, so there is always something going out and it always sounds like you.",
    includes: ["Monthly content plan", "Posts and stories", "Captions and hashtags", "Scheduling"],
  },
  {
    slug: "reels-and-content",
    title: "Reels people finish",
    summary:
      "Short video made for the way people actually scroll, shot and edited so the first two seconds earn the next twenty.",
    includes: ["Reel scripts", "Shoot days", "Editing and subtitles", "Thumbnails"],
  },
  {
    slug: "meta-ads",
    title: "Meta ads that bring enquiries",
    summary:
      "Instagram and Facebook campaigns pointed at the thing you sell, measured by the messages and calls they bring in.",
    includes: ["Campaign setup", "Ad creative", "Audience testing", "Monthly reporting"],
  },
  {
    slug: "websites-and-software",
    title: "The website behind it",
    summary:
      "Somewhere for the attention to land, and a system that catches an enquiry instead of losing it in an inbox.",
    includes: ["Websites", "Landing pages", "Lead forms", "Custom software"],
  },
];
