/* WRITTEN BY `npm run media`. */

export type PostMedia = {
  readonly slug: string;
  readonly src: string;
  readonly small: string;
  readonly width: number;
  readonly height: number;
};

export type ReelMedia = {
  readonly slug: string;
  readonly webm: string;
  readonly mp4: string;
  readonly poster: string;
};

export const POST_MEDIA: readonly PostMedia[] = [
  { slug: "02", src: "/work/posts/02.webp", small: "/work/posts/02-sm.webp", width: 1080, height: 1350 },
  { slug: "03", src: "/work/posts/03.webp", small: "/work/posts/03-sm.webp", width: 1080, height: 1350 },
  { slug: "06", src: "/work/posts/06.webp", small: "/work/posts/06-sm.webp", width: 1080, height: 1350 },
  { slug: "09", src: "/work/posts/09.webp", small: "/work/posts/09-sm.webp", width: 1080, height: 1350 },
  { slug: "1-1", src: "/work/posts/1-1.webp", small: "/work/posts/1-1-sm.webp", width: 1080, height: 1350 },
  { slug: "1-2", src: "/work/posts/1-2.webp", small: "/work/posts/1-2-sm.webp", width: 1080, height: 1350 },
  { slug: "1", src: "/work/posts/1.webp", small: "/work/posts/1-sm.webp", width: 1080, height: 1350 },
  { slug: "10", src: "/work/posts/10.webp", small: "/work/posts/10-sm.webp", width: 670, height: 833 },
  { slug: "11", src: "/work/posts/11.webp", small: "/work/posts/11-sm.webp", width: 1080, height: 1350 },
  { slug: "11-2", src: "/work/posts/11-2.webp", small: "/work/posts/11-2-sm.webp", width: 677, height: 850 },
  { slug: "12", src: "/work/posts/12.webp", small: "/work/posts/12-sm.webp", width: 677, height: 848 },
  { slug: "13", src: "/work/posts/13.webp", small: "/work/posts/13-sm.webp", width: 680, height: 848 },
  { slug: "2", src: "/work/posts/2.webp", small: "/work/posts/2-sm.webp", width: 1080, height: 1350 },
  { slug: "20", src: "/work/posts/20.webp", small: "/work/posts/20-sm.webp", width: 1080, height: 1350 },
  { slug: "21", src: "/work/posts/21.webp", small: "/work/posts/21-sm.webp", width: 1080, height: 1350 },
  { slug: "22", src: "/work/posts/22.webp", small: "/work/posts/22-sm.webp", width: 1080, height: 1350 },
  { slug: "3", src: "/work/posts/3.webp", small: "/work/posts/3-sm.webp", width: 1080, height: 1350 },
  { slug: "4", src: "/work/posts/4.webp", small: "/work/posts/4-sm.webp", width: 1080, height: 1350 },
  { slug: "5", src: "/work/posts/5.webp", small: "/work/posts/5-sm.webp", width: 1080, height: 1350 },
  { slug: "6-2", src: "/work/posts/6-2.webp", small: "/work/posts/6-2-sm.webp", width: 1080, height: 1350 },
  { slug: "7", src: "/work/posts/7.webp", small: "/work/posts/7-sm.webp", width: 1080, height: 1350 },
  { slug: "8", src: "/work/posts/8.webp", small: "/work/posts/8-sm.webp", width: 1080, height: 1350 },
  { slug: "9", src: "/work/posts/9.webp", small: "/work/posts/9-sm.webp", width: 682, height: 851 },
  { slug: "frame-94", src: "/work/posts/frame-94.webp", small: "/work/posts/frame-94-sm.webp", width: 1080, height: 1080 },
  { slug: "mad-over-grils-3", src: "/work/posts/mad-over-grils-3.webp", small: "/work/posts/mad-over-grils-3-sm.webp", width: 1080, height: 1350 },
  { slug: "na-5", src: "/work/posts/na-5.webp", small: "/work/posts/na-5-sm.webp", width: 1080, height: 1350 },
  { slug: "natural-green-wood-5", src: "/work/posts/natural-green-wood-5.webp", small: "/work/posts/natural-green-wood-5-sm.webp", width: 1080, height: 1350 },
  { slug: "image-1", src: "/work/posts/image-1.webp", small: "/work/posts/image-1-sm.webp", width: 1080, height: 1350 },
  { slug: "image-2", src: "/work/posts/image-2.webp", small: "/work/posts/image-2-sm.webp", width: 1080, height: 1350 },
  { slug: "image", src: "/work/posts/image.webp", small: "/work/posts/image-sm.webp", width: 1080, height: 1350 },
];

export const REEL_MEDIA: readonly ReelMedia[] = [
  { slug: "16", webm: "/work/reels/16.webm", mp4: "/work/reels/16.mp4", poster: "/work/reels/16.jpg" },
  { slug: "17", webm: "/work/reels/17.webm", mp4: "/work/reels/17.mp4", poster: "/work/reels/17.jpg" },
  { slug: "18", webm: "/work/reels/18.webm", mp4: "/work/reels/18.mp4", poster: "/work/reels/18.jpg" },
  { slug: "v1", webm: "/work/reels/v1.webm", mp4: "/work/reels/v1.mp4", poster: "/work/reels/v1.jpg" },
  { slug: "v2", webm: "/work/reels/v2.webm", mp4: "/work/reels/v2.mp4", poster: "/work/reels/v2.jpg" },
  { slug: "v3", webm: "/work/reels/v3.webm", mp4: "/work/reels/v3.mp4", poster: "/work/reels/v3.jpg" },
  { slug: "v4", webm: "/work/reels/v4.webm", mp4: "/work/reels/v4.mp4", poster: "/work/reels/v4.jpg" },
  { slug: "v5", webm: "/work/reels/v5.webm", mp4: "/work/reels/v5.mp4", poster: "/work/reels/v5.jpg" },
  { slug: "v6", webm: "/work/reels/v6.webm", mp4: "/work/reels/v6.mp4", poster: "/work/reels/v6.jpg" },
];
