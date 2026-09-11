import type { Article } from "@/content/types";

/*
 * The blog, newest first.
 *
 * The title of each piece is printed inside its own artwork, so the two are not
 * free to drift: change one and change the other. Read times were here and he took
 * them out on 2026-09-07.
 *
 * **PUBLISH DATES ON THE SEVEN IN-HOUSE PIECES ARE SET, NOT HISTORICAL.** At the
 * client's instruction on 2026-09-11 they are spread over the months before
 * launch, newest first in list order; the pieces were written that week. Only
 * the aesthetic design piece carries the date it was actually published, on
 * the live site. `updated` stays the true day the content last changed. Shaped like a CMS response on
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
    /* Rewritten in full on this day, which is the day the long version was written. */
    published: "2026-03-10",
    updated: "2026-09-11",
  },
  /*
   * Carried over from the live kalaa.io, where it was published on 13 February
   * 2026, at the same slug so the address Google already holds keeps working.
   * Second in the list at the client's ask. `updated` is the day the words
   * changed here: punctuation, one held-back sentence, and the sections added
   * below. See the note on its body in `articles.ts`.
   */
  {
    slug: "how-aesthetic-design-can-transform-your-brand",
    topic: "Marketing",
    title: "How Aesthetic Design Can Transform Your Brand",
    excerpt:
      "Learn how aesthetic design can elevate your brand's visuals. Discover the power of soft lighting, minimalism, and consistent design to engage your audience and build a lasting connection.",
    description:
      "Learn how aesthetic design can elevate your brand's visuals. Discover the power of soft lighting, minimalism, and consistent design.",
    /* The client's own cover, supplied on 2026-09-11. A new slug rather than the
       old one, so no cache keeps serving the red and blue card at this address. */
    image: "aesthetic-design-cover",
    alt: "A moodboard of paper notes around a card reading Design Shapes Perception, with paper steps labelled visuals, emotion, trust and impact, and a pink note reading Aesthetic Design Can Transform Your Brand",
    published: "2026-02-13",
    updated: "2026-09-11",
  },
  {
    slug: "common-social-media-mistakes-brands-make",
    topic: "Strategy",
    title: "Common social media mistakes brands make",
    excerpt:
      "Eight habits that quietly cost reach, from posting without a plan to copying a trend that does not fit the brand.",
    image: "social-media-mistakes",
    alt: "A clipboard headed Common Social Media Mistakes Brands Make, with eight items crossed off, beside a phone showing a feed",
    /* Rewritten in full on this day, which is the day the long version was written. */
    published: "2026-01-27",
    updated: "2026-09-11",
  },
  {
    slug: "instagram-content-ideas-for-small-businesses",
    topic: "Content",
    /* The cover reads "for Small Businesses", and so do the slug and the search. */
    title: "Instagram content ideas for small businesses",
    excerpt:
      "Five formats that keep an account moving: behind the scenes, product highlights, customer stories, tips, and lifestyle.",
    image: "instagram-ideas",
    alt: "A printed list of Instagram content ideas for small businesses, beside a phone showing a grid of posts",
    published: "2026-01-12",
    updated: "2026-09-11",
  },
  {
    slug: "video-shooting-ideas-for-small-businesses",
    topic: "Content",
    /* The cover reads "(Small Business)", and the slug and the search say it too. */
    title: "Video shooting ideas for small businesses",
    excerpt:
      "Six shots you can get on a phone, from product close-ups and the packaging process to customer reactions.",
    image: "video-ideas",
    alt: "A phone on a gimbal filming a pair of earrings, beside a notebook of video shooting ideas and a ring light",
    published: "2025-12-16",
    updated: "2026-09-11",
  },
  {
    slug: "marketing-trends-to-watch",
    topic: "Trends",
    title: "10 marketing trends to watch for sustainable growth",
    excerpt:
      "The shifts worth planning around, from short-form video and community-led growth to AI in content production.",
    image: "marketing-trends",
    alt: "A pair of binoculars on a desk, ringed by ten cards naming marketing trends to watch",
    published: "2025-11-25",
    updated: "2026-09-11",
  },
  {
    slug: "a-month-of-content-in-five-steps",
    topic: "Strategy",
    title: "A month of content, in five steps",
    excerpt:
      "Plan, create, share, analyse, grow: the rhythm we run on a client account, and what happens in each step.",
    image: "landing",
    alt: "A notebook headed Social Media Strategy with Plan, Create, Share, Analyse and Grow ticked off, on a desk with coffee and plants",
    published: "2025-11-04",
    updated: "2026-09-11",
  },
  {
    slug: "what-a-small-ad-budget-can-actually-do",
    topic: "Ads",
    title: "What a small ad budget can actually do",
    excerpt:
      "Four things a modest budget still does: reach the right people, earn real engagement, show you what works, and build on it.",
    image: "ad-budget",
    alt: "Cut paper bars rising in sage, butter and peach with a paper arrow climbing over them, under a torn strip headed What a Small Ad Budget Can Actually Do",
    published: "2025-10-14",
    updated: "2026-09-11",
  },
];

/* The note beside the featured piece. It says who writes here, and claims nothing else. */
export const EDITORS_NOTE = {
  title: "Editor's note",
  body: "We write about the work we actually do: planning a month, making the posts and reels, running the ads, and reading what came back.",
  signoff: "Written by the people doing the work.",
} as const;
