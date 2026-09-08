import type { Artifact } from "@/content/types";

/*
 * The three objects at the top of the blog, and where each one lands.
 *
 * Read as a desk rather than a row: the notebook is the thing you look at, the
 * drafts are tucked under its left edge, and the phone sits to the right, lower
 * and smaller, the way the last thing picked up would. They overlap on purpose.
 * Three pieces laid out in a line would be a product grid.
 *
 * Order here is stacking order, not reading order: each piece sits above the one
 * before it, so the notebook is written last to keep it on top of both.
 */
export const BLOG_TOP_ARTIFACTS: readonly Artifact[] = [
  {
    id: "drafts",
    image: "bt1",
    alt: 'A clipped stack of drafts, the top page headed "Draft two" with four handwritten notes on it',
    left: 0,
    top: 15,
    width: 39,
    rotate: -6,
    from: { x: -54, y: 26 },
    delay: 0.08,
  },
  {
    id: "published",
    image: "bt2",
    alt: 'A phone showing a published Kalaa article, with a note reading "Publish Friday" stuck to its corner',
    left: 69,
    top: 26,
    width: 34,
    rotate: 6,
    from: { x: 56, y: 30 },
    delay: 0.16,
  },
  {
    id: "notebook",
    image: "bt3",
    alt: 'A spiral notebook headed "Ideas worth writing down", with four ticked lines and a leaf sprig on the corner',
    left: 27,
    top: 0,
    width: 45,
    rotate: 3,
    from: { x: 0, y: -34 },
    delay: 0,
  },
];
