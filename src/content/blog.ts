import type { Article } from "@/content/types";

/*
 * The blog, newest first.
 *
 * The title of each piece is printed inside its own artwork, so the two are not
 * free to drift: change one and change the other. Dates and read times were here
 * and he took them out on 2026-09-07; the values were invented anyway, so a real
 * date goes back only when a real article does. Shaped like a CMS response on
 * purpose: when the CMS is chosen, this file becomes a fetch and nothing above
 * it changes.
 */
export const ARTICLES: readonly Article[] = [
  {
    slug: "how-to-plan-your-social-media-strategy",
    topic: "Strategy",
    title: "How to plan your social media strategy",
    excerpt:
      "Four steps in order: set clear goals, know your audience, plan the content, then measure and keep improving.",
    image: "strategy-plan",
    alt: "A printed guide headed How to Plan Your Social Media Strategy, with its four steps laid out beside a phone and a set of notes",
  },
  {
    slug: "common-social-media-mistakes-brands-make",
    topic: "Strategy",
    title: "Common social media mistakes brands make",
    excerpt:
      "Eight habits that quietly cost reach, from posting without a plan to copying a trend that does not fit the brand.",
    image: "social-media-mistakes",
    alt: "A clipboard headed Common Social Media Mistakes Brands Make, with eight items crossed off, beside a phone showing a feed",
  },
  {
    slug: "instagram-content-ideas-for-small-businesses",
    topic: "Content",
    title: "Instagram content ideas",
    excerpt:
      "Five formats that keep an account moving: behind the scenes, product highlights, customer stories, tips, and lifestyle.",
    image: "instagram-ideas",
    alt: "A printed list of Instagram content ideas for small businesses, beside a phone showing a grid of posts",
  },
  {
    slug: "video-shooting-ideas-for-small-businesses",
    topic: "Content",
    title: "Video shooting ideas",
    excerpt:
      "Six shots you can get on a phone, from product close-ups and the packaging process to customer reactions.",
    image: "video-ideas",
    alt: "A phone on a gimbal filming a pair of earrings, beside a notebook of video shooting ideas and a ring light",
  },
  {
    slug: "marketing-trends-to-watch",
    topic: "Trends",
    title: "10 marketing trends to watch for sustainable growth",
    excerpt:
      "The shifts worth planning around, from short-form video and community-led growth to AI in content production.",
    image: "marketing-trends",
    alt: "A pair of binoculars on a desk, ringed by ten cards naming marketing trends to watch",
  },
  {
    slug: "a-month-of-content-in-five-steps",
    topic: "Strategy",
    title: "A month of content, in five steps",
    excerpt:
      "Plan, create, share, analyse, grow: the rhythm we run on a client account, and what happens in each step.",
    image: "landing",
    alt: "A notebook headed Social Media Strategy with Plan, Create, Share, Analyse and Grow ticked off, on a desk with coffee and plants",
  },
  {
    slug: "what-a-small-ad-budget-can-actually-do",
    topic: "Ads",
    title: "What a small ad budget can actually do",
    excerpt:
      "Four things a modest budget still does: reach the right people, earn real engagement, show you what works, and build on it.",
    image: "ad-budget",
    alt: "Cut paper bars rising in sage, butter and peach with a paper arrow climbing over them, under a torn strip headed What a Small Ad Budget Can Actually Do",
  },
];

/* The note beside the featured piece. It says who writes here, and claims nothing else. */
export const EDITORS_NOTE = {
  title: "Editor's note",
  body: "We write about the work we actually do: planning a month, making the posts and reels, running the ads, and reading what came back.",
  signoff: "Written by the people doing the work.",
} as const;
