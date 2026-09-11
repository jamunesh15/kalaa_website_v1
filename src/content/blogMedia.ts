/**
 * WRITTEN BY `npm run media`. Do not edit by hand.
 *
 * Every entry is a file in `public/blog/`. The titles and the copy that go
 * with them live in `src/content/blog.ts`, which is hand written, so
 * regenerating this never destroys words.
 */

export type BlogMedia = {
  readonly slug: string;
  readonly src: string;
  readonly small: string;
  readonly width: number;
  readonly height: number;
};

export const BLOG_MEDIA: readonly BlogMedia[] = [
  { slug: "ad-budget", src: "/blog/ad-budget.webp", small: "/blog/ad-budget-sm.webp", width: 1400, height: 933 },
  { slug: "aesthetic-design-cover", src: "/blog/aesthetic-design-cover.webp", small: "/blog/aesthetic-design-cover-sm.webp", width: 1400, height: 933 },
  { slug: "instagram-ideas", src: "/blog/instagram-ideas.webp", small: "/blog/instagram-ideas-sm.webp", width: 1400, height: 933 },
  { slug: "landing", src: "/blog/landing.webp", small: "/blog/landing-sm.webp", width: 1400, height: 933 },
  { slug: "marketing-trends", src: "/blog/marketing-trends.webp", small: "/blog/marketing-trends-sm.webp", width: 1400, height: 933 },
  { slug: "social-media-mistakes", src: "/blog/social-media-mistakes.webp", small: "/blog/social-media-mistakes-sm.webp", width: 1400, height: 933 },
  { slug: "strategy-plan", src: "/blog/strategy-plan.webp", small: "/blog/strategy-plan-sm.webp", width: 1400, height: 933 },
  { slug: "video-ideas", src: "/blog/video-ideas.webp", small: "/blog/video-ideas-sm.webp", width: 1400, height: 933 },
];
