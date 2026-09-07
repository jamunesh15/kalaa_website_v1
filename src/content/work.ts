import { POST_MEDIA, REEL_MEDIA } from "@/content/workMedia";
import type { WorkPiece } from "@/content/types";

/* The work wall. */
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
