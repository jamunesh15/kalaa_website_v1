import { POST_MEDIA, REEL_MEDIA } from "@/content/workMedia";
import type { WorkPiece } from "@/content/types";

/**
 * The work wall.
 *
 * The files themselves are listed in `workMedia.ts`, which `npm run media`
 * rewrites from whatever is on disk. This file is the hand written half: it
 * decides what is shown, in what order, and what each piece is called.
 *
 * Nothing here names a client, and that is deliberate rather than unfinished.
 * The artwork carries its own client's logo, which is the client showing their
 * own brand, and that is theirs to publish. A caption underneath saying Kalaa
 * made it is a claim about a working relationship, and CLAUDE.md rules out
 * stating one that has not been confirmed. Add names here the day they are.
 *
 * The alt text says what kind of piece it is rather than describing the
 * artwork, because 27 invented descriptions of images nobody has looked at
 * would be worse than useless to a screen reader user. When the captions
 * arrive, the alt text comes with them.
 */
export const REELS: readonly WorkPiece[] = REEL_MEDIA.map((media) => ({
  ...media,
  kind: "reel" as const,
  alt: "A reel edited by Kalaa for a client account",
}));

export const POSTS: readonly WorkPiece[] = POST_MEDIA.map((media) => ({
  ...media,
  kind: "post" as const,
  alt: "A social media post designed by Kalaa for a client account",
}));
