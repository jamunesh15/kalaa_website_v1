/**
 * WRITTEN BY `npm run media`. Do not edit by hand.
 *
 * Every entry is a file in `public/testimonials/`. The names, roles and
 * companies that go with them live in `src/content/testimonials.ts`, which is
 * hand written, so regenerating this never destroys what a person said about
 * themselves.
 */

export type TestimonialMedia = {
  readonly slug: string;
  /** The whole clip with its sound, played on tap. */
  readonly mp4: string;
  readonly poster: string;
  /** The reviewer's own photograph, where there is one. */
  readonly avatar: string | null;
  readonly width: number;
  readonly height: number;
  /** Seconds. */
  readonly duration: number;
};

export const TESTIMONIAL_MEDIA: readonly TestimonialMedia[] = [
  { slug: "alpesh-italiya", mp4: "/testimonials/alpesh-italiya.mp4", poster: "/testimonials/alpesh-italiya.jpg", avatar: null, width: 720, height: 1280, duration: 18.7 },
  { slug: "alpesh-patel", mp4: "/testimonials/alpesh-patel.mp4", poster: "/testimonials/alpesh-patel.jpg", avatar: null, width: 720, height: 1280, duration: 31.7 },
  { slug: "himanshu-padsala", mp4: "/testimonials/himanshu-padsala.mp4", poster: "/testimonials/himanshu-padsala.jpg", avatar: "/testimonials/himanshu-padsala-avatar.webp", width: 720, height: 1280, duration: 47 },
  { slug: "vikas", mp4: "/testimonials/vikas.mp4", poster: "/testimonials/vikas.jpg", avatar: "/testimonials/vikas-avatar.webp", width: 720, height: 1280, duration: 84.3 },
];
