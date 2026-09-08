/* The contact page's artwork, and where each piece lands. The shape is shared with every other board on the site. */

import type { Artifact } from "@/content/types";

/** The shape every board on this site uses. Kept under the old name so the page reads the same. */
export type ContactArtifact = Artifact;

/* The opening still life: the notebook and coffee, with the clipped note landing over its corner. */
export const HERO_ARTIFACTS: readonly ContactArtifact[] = [
  {
    id: "desk",
    image: "c2",
    alt: "A notebook reading Ideas, People, Brands, beside a pen and a cup of coffee",
    left: 42,
    top: 0,
    width: 56,
    rotate: 2,
    from: { x: 58, y: -26 },
    delay: 0,
  },
  {
    id: "note",
    image: "c1",
    alt: 'A clipped note reading "Good ideas start with a conversation."',
    left: 0,
    top: 20,
    width: 49,
    rotate: -3,
    from: { x: -62, y: 34 },
    delay: 0.12,
  },
];

/** The brief section's one piece, which is the section's content rather than a picture beside it. */
export const BRIEF_ARTIFACTS: readonly ContactArtifact[] = [
  {
    id: "checklist",
    image: "c4",
    alt: "A checklist reading: what your brand does, what you want to achieve, what's not working right now, how we can help. Underneath, in handwriting: that's enough.",
    left: 0,
    top: 0,
    width: 100,
    rotate: -1.5,
    from: { x: 34, y: 30 },
    delay: 0,
  },
];
