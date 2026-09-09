import peekHimanshu from "@/media/whatsapp/himanshu-padsala-1-peek.webp";
import peekVishal from "@/media/whatsapp/vishal-apani-2-peek.webp";
import type { Proof } from "@/content/types";

/*
 * The message a client sent, shown beside the work it is about.
 *
 * A service card says what Kalaa does; the peek beside it shows a client
 * reacting, in their own words. It is the same evidence the testimonial band
 * carries, put where a reader is deciding.
 *
 * Service cards only. The process row had one and it was taken out: a panel
 * opening under a step in a five card row lands on the band below it, and that
 * row is the one composition on this page whose connecting line is measured off
 * the cards themselves.
 *
 * **`about` is the honest part of this file and it does all the work.** There
 * are two kinds of review here and they are captioned differently.
 *
 * A SPECIFIC review is a client replying to one piece of work, and what they
 * were replying to is read off the screenshot rather than guessed: five of the
 * six chats are somebody answering a video file and one a post. Those get "on a
 * reel" or "on a post" and sit under the service that made the thing.
 *
 * A GENERAL review is a client rating Kalaa rather than a deliverable. Those
 * came off the review badge as text with no chat behind them, and they are
 * captioned "on working with Kalaa" wherever they appear. That caption is the
 * whole licence for putting one beside Campaign Management or Brand Strategy:
 * the card says what Kalaa does, the note says this client rates the work, and
 * NEITHER claims the client was talking about that service. Relabel one to sound
 * specific and it becomes a fabricated testimonial built out of a real quote,
 * which is worse than an invented one because it is checkable.
 *
 * So: never move a specific review onto a service it was not about, and never
 * relabel a general one. When a client sends a message about an ad or a website
 * it goes here with a caption naming that, and it replaces the general note.
 */

/* Replying to a video Kalaa sent. */
const VISHAL: Proof = {
  peek: peekVishal,
  quote: null,
  name: "Vishal Apani",
  company: "Unique Plus jari house",
  about: "a reel",
};

/* "Okayy post achhi bani hei", on a post that had gone out. */
const HIMANSHU: Proof = {
  peek: peekHimanshu,
  quote: null,
  name: "Himanshu Padsala",
  company: "Avishtha Interiors",
  about: "a post",
};

/* The four below rated Kalaa, not a deliverable. Captioned as exactly that. */
const GENERAL = "working with Kalaa";

const ARYAN: Proof = {
  peek: null,
  quote: "Killing it day by day \u{1F525}\u{1F525}",
  name: "Aryan",
  company: "Angoori Bliss",
  about: GENERAL,
};

const ALPESHBHAI: Proof = {
  peek: null,
  quote: "Super \u{1F44F}",
  name: "Alpeshbhai",
  company: null,
  about: GENERAL,
};

const HARSH: Proof = {
  peek: null,
  quote: "Really nice.",
  name: "Harsh Desai",
  company: "Monarch Hyundai",
  about: GENERAL,
};

const KAYUR: Proof = {
  peek: null,
  quote: "Nice",
  name: "Kayur",
  company: "Samarpan Jewellery & Fashion",
  about: GENERAL,
};

/** Keyed by the service's own slug, so a renamed service loses its peek loudly. */
const BY_SERVICE: Readonly<Record<string, Proof>> = {
  "social-media-management": HIMANSHU,
  "content-creation": VISHAL,
  "business-growth-strategy": ARYAN,
  "brand-strategy-and-design": ALPESHBHAI,
  "campaign-management": HARSH,
  "website-and-software-development": KAYUR,
};

/** The message about this service, or null where no client has sent one. */
export function proofForService(slug: string): Proof | null {
  return BY_SERVICE[slug] ?? null;
}
