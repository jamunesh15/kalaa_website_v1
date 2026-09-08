/* The services page's opening board. The shape is shared with every other board on the site. */

import type { Artifact } from "@/content/types";

/*
 * The four pieces supplied on 2026-09-08.
 *
 * `s2`, the tablet, carries figures in the artwork itself: 125K impressions,
 * 8.4K engagements and 320 percent growth over a rising chart. Those are not
 * real Kalaa results. It was held back for that reason and he asked for it
 * anyway on 2026-09-08, which is his call to make and is recorded here so
 * nobody has to guess later whether it was noticed.
 *
 * Its alt text names the object and the three measures and does NOT repeat the
 * figures. That is not squeamishness about the length: alt text is text, so
 * restating an invented number there would put the claim into the page's words
 * as well as its pictures, and a screen reader user would be told as fact what
 * a sighted reader can see is a mock. The figures stay out of the copy, out of
 * the metadata and out of the JSON-LD, which is where a machine reads them as
 * true.
 *
 * The tablet sits BELOW the shoot plan rather than across it. Overlapping the
 * two buried the shoot plan's lower half and the note clipped to it, and two
 * pieces that both carry readable text cannot overlap the way a stack of blank
 * cards can.
 *
 * The array order is z-order, back to front. `delay` is arrival order, and the
 * two differ on purpose: the checklist lands first because it sits nearest the
 * copy, and the post stack lands last because it lies on top of everything.
 */
export const SERVICES_HERO_ARTIFACTS: readonly Artifact[] = [
  {
    id: "shoot-plan",
    image: "s4",
    alt: "A shoot plan listing product shots, lifestyle scenes, short videos, behind the scenes and edit and deliver, beside a grid of styled product photographs",
    left: 35,
    top: 0,
    width: 50,
    rotate: 2,
    from: { x: 56, y: -30 },
    delay: 0.1,
  },
  {
    id: "strategy",
    image: "s1",
    alt: 'A clipped sheet headed Content Strategy with research, content plan, create, schedule and analyse ticked off, and a note reading "Your Brand Our Strategy"',
    left: 0,
    top: 4,
    width: 34,
    rotate: -3,
    from: { x: -58, y: -22 },
    delay: 0,
  },
  {
    id: "dashboard",
    image: "s2",
    alt: "A tablet showing a sample performance dashboard with impressions, engagements and growth",
    left: 46,
    top: 52,
    width: 44,
    rotate: 1,
    from: { x: 52, y: 34 },
    delay: 0.2,
  },
  {
    id: "posts",
    image: "s3",
    alt: "A fanned stack of square posts, the top one headed Social Media Management over the words strategy, content, community and growth",
    left: 6,
    top: 50,
    width: 41,
    rotate: -2,
    from: { x: -34, y: 44 },
    delay: 0.3,
  },
];
