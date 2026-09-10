import peekHimanshu from "@/media/whatsapp/himanshu-padsala-1-peek.webp";
import peekJash from "@/media/whatsapp/jash-dungrani-1-peek.webp";
import peekKalpesh from "@/media/whatsapp/kalpesh-desai-1-peek.webp";
import peekKishan from "@/media/whatsapp/kishanbhai-1-peek.webp";
import peekKrish from "@/media/whatsapp/krish-1-peek.webp";
import peekVishal from "@/media/whatsapp/vishal-apani-2-peek.webp";
import type { Proof } from "@/content/types";

/*
 * The message a client sent, shown beside the work it is about.
 *
 * A service card says what Kalaa does; the peek beside it shows a client
 * reacting, in their own words, with their own photograph and the chat it was
 * typed in. It is the same evidence the testimonial band carries, put where a
 * reader is deciding.
 *
 * Service cards only. The process row had one and it was taken out: a panel
 * opening under a step in a five card row lands on the band below it, and that
 * row is the one composition on this page whose connecting line is measured off
 * the cards themselves.
 *
 * **ALL SIX CARDS CARRY A CHAT, AND FOUR OF THEM SIT BESIDE A SERVICE THE
 * MESSAGE WAS NOT ABOUT.** The client asked for that on 2026-09-10: every card
 * shows a WhatsApp message with the client's name and photograph, and a message
 * that does not match the service beside it was called fine. An explicit
 * instruction outranks a default, so this file no longer holds back a chat for
 * want of a matching service.
 *
 * **What that does NOT license is `about`, which is the honest part of this
 * file and does all the work.** It says what the client was replying to, read
 * off the screenshot rather than guessed: four are answering an mp4 Kalaa sent,
 * one a post that had gone out, one a file sent over to check. The panel reads
 * "Krish, ZJOOLRY, on a file sent to check" whatever card it happens to sit
 * beside, so the reader is never told this client was talking about that
 * service. Relabel one to match the card it landed on and it becomes a
 * fabricated testimonial built out of a real quote, which is worse than an
 * invented one because it is checkable.
 *
 * So: the pairing is arbitrary and says nothing, the caption is measured and
 * says everything. Move a chat between services freely. Never rewrite `about`
 * to suit the service it moved to.
 */

/* Replying to a video Kalaa sent. */
const VISHAL: Proof = {
  peek: peekVishal,
  avatar: "/testimonials/vishal-apani-avatar.webp",
  name: "Vishal Apani",
  company: "Unique Plus jari house",
  about: "a reel",
};

/* "Okayy post achhi bani hei", on a post that had gone out. */
const HIMANSHU: Proof = {
  peek: peekHimanshu,
  avatar: "/testimonials/himanshu-padsala-avatar.webp",
  name: "Himanshu Padsala",
  company: "Avishtha Interiors",
  about: "a post",
};

/* Answering `0204-copy(2).mp4`. */
const JASH: Proof = {
  peek: peekJash,
  avatar: "/testimonials/jash-dungrani-avatar.webp",
  name: "Jash Dungrani",
  company: "Angoori bliss",
  about: "a reel",
};

/* Answering `0619 (1).mp4`. */
const KISHANBHAI: Proof = {
  peek: peekKishan,
  avatar: "/testimonials/kishanbhai-avatar.webp",
  name: "Kishanbhai",
  company: "Meetwa jari and fancy dori",
  about: "a reel",
};

/* Answering `VIDEO_-enjoy-august-_1-1080p.mp4`. */
const KALPESH: Proof = {
  peek: peekKalpesh,
  avatar: "/testimonials/kalpesh-desai-avatar.webp",
  name: "Kalpesh Desai",
  company: "Enjoy group",
  about: "a reel",
};

/* The quoted message is a document with "check kari lyo" on it, not an mp4, so
   this one is not captioned as a reel however much it would tidy the set up. */
const KRISH: Proof = {
  peek: peekKrish,
  avatar: "/testimonials/krish-avatar.webp",
  name: "Krish",
  company: "ZJOOLRY",
  about: "a file sent to check",
};

/** Keyed by the service's own slug, so a renamed service loses its peek loudly. */
const BY_SERVICE: Readonly<Record<string, Proof>> = {
  "social-media-management": HIMANSHU,
  "content-creation": VISHAL,
  "campaign-management": KALPESH,
  "business-growth-strategy": JASH,
  "brand-strategy-and-design": KISHANBHAI,
  "website-and-software-development": KRISH,
};

/** The message about this service, or null where no client has sent one. */
export function proofForService(slug: string): Proof | null {
  return BY_SERVICE[slug] ?? null;
}
