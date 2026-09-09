import shotHimanshu from "@/media/whatsapp/himanshu-padsala-1.webp";
import shotJash from "@/media/whatsapp/jash-dungrani-1.webp";
import shotKalpesh from "@/media/whatsapp/kalpesh-desai-1.webp";
import shotKishan from "@/media/whatsapp/kishanbhai-1.webp";
import shotKrish from "@/media/whatsapp/krish-1.webp";
import shotVishal from "@/media/whatsapp/vishal-apani-2.webp";
import { TESTIMONIAL_MEDIA } from "@/content/testimonialMedia";
import type { Testimonial, WrittenReview } from "@/content/types";

/*
 * The video testimonials, as the clients recorded them.
 *
 * Every name, role and company here is what the client themselves entered
 * alongside their recording. Nothing is transcribed, translated or inferred:
 * three of the four speak Gujarati and one Hindi, and putting an English
 * sentence in their mouth would be writing a testimonial rather than showing
 * one. The video is the testimonial. The words beside it only say who is
 * speaking.
 *
 * `quote` is present on exactly one of them because exactly one of them wrote
 * anything down. `spoken` is what the other three SAID, on camera, carried into
 * English from the transcript of their own recording in
 * `assets/testimonials/transcripts.json`.
 *
 * Nothing here is written for them. A translation is trimmed to its point and
 * never extended: every claim in a `spoken` line is a claim its speaker made,
 * and the card names the language it was made in, so a reader is never shown a
 * rendered sentence as if it were the original. The recording is on the same
 * card and remains the testimony.
 */
const PEOPLE = [
  {
    slug: "vikas",
    name: "Vikas",
    role: "CEO",
    company: "Saistar Impex",
    /* His own written words, from the review he left. */
    quote: "Business growth ho ya complete marketing support Kalaa handles it all effortlessly!",
    /* He wrote his own, in English, so nothing needs carrying over. */
    spoken: null,
    spokenFrom: null,
    rating: 5,
  },
  {
    slug: "himanshu-padsala",
    name: "Himanshu Padsala",
    role: "Founder",
    company: "Avishtha Interiors",
    quote: null,
    spoken:
      "For the last three months I have been working with Kalaa, and I am very satisfied. The scripts they design, the posting time, the scheduling, it is all on time.",
    spokenFrom: "Gujarati",
    rating: 5,
  },
  {
    slug: "alpesh-italiya",
    name: "Alpesh Italiya",
    role: "Owner",
    company: "Max and More Dosa",
    quote: null,
    spoken:
      "I have been working with Kalaa for three months. I like their work, because their marketing brought me a very good response from customers.",
    spokenFrom: "Gujarati",
    rating: 5,
  },
  {
    slug: "alpesh-patel",
    name: "Alpesh Patel",
    role: null,
    company: "Natural Green Wood Industries",
    quote: null,
    spoken:
      "I started marketing work with Kalaa about eight months ago and it has gone very well. The team's support is good, and we recommend them a hundred percent.",
    spokenFrom: "Gujarati",
    rating: 5,
  },
] as const;

/* The words and the files, joined on the slug, so re-encoding never touches copy. */
export const TESTIMONIALS: readonly Testimonial[] = PEOPLE.flatMap((person) => {
  const media = TESTIMONIAL_MEDIA.find((entry) => entry.slug === person.slug);
  return media ? [{ ...person, ...media }] : [];
});

/*
 * The clients who wrote rather than filmed.
 *
 * This is the client's own Feedspace board, every non-video record on it, in a
 * deliberately mixed order. Six were sent in a work chat and carry the message
 * they were typed in; seven came off the review badge and are text alone, so
 * their cards have nothing to show and do not offer it.
 *
 * THE ORDER IS FIXED, not shuffled at run time. Mixed is the point, so a reader
 * never meets six chat cards and then seven plain ones, but a list that reorders
 * itself on every render cannot be server rendered and would move under anybody
 * who came back to a card. This order IS the shuffle, written down: no two cards
 * of the same kind sit in a long run, and where a client appears twice the two
 * are kept rows apart.
 *
 * Six anonymous records on the board are NOT here. Each one repeats, word for
 * word, a review that is here under a name, with the name and rating stripped:
 * they are the same seven imported rows a second time. Showing them would count
 * one client's sentence twice and show it unattributed the second time.
 *
 * Emoji are kept. Half of these are a reaction rather than a sentence, and
 * "Okay Perfect" without them is neither what the client wrote nor what the
 * screenshot beside it shows.
 *
 * Every quote is that client's own words. The summaries Kalaa wrote ABOUT a
 * client in the third person are not used: the screenshots hold what those
 * clients actually typed, so the summaries are not needed, and setting one in
 * quote marks under a client's name would attribute our sentence to them.
 *
 * The words are as they arrived, Gujarati and English mixed. Tidying one into
 * English would be rewriting a quote, and the screenshot would then disagree.
 *
 * `scripts/whatsapp.mjs` cuts and redacts the pictures. Nothing here is safe to
 * point at a raw screenshot.
 */
export const WRITTEN_REVIEWS: readonly WrittenReview[] = [
  {
    slug: "vishal-apani",
    name: "Vishal Apani",
    role: "Founder",
    company: "Unique Plus jari house",
    rating: 5,
    quote: "Baki video 100% Good with Satisfied. Thank You Team Kalaa \u{1F64F}",
    avatar: "/testimonials/vishal-apani-avatar.webp",
    shot: shotVishal,
  },
  {
    slug: "himanshu-padsala-note",
    name: "Himanshu Padsala",
    role: "Founder",
    /* "Avishtha Group" on this record and "Avishtha Interiors" on his other
       two. One business, so it is named the same way in both places. */
    company: "Avishtha Interiors",
    rating: 5,
    quote: "perfect \u{1F44C} \u{1F44D}",
    avatar: "/testimonials/himanshu-padsala-avatar.webp",
    shot: null,
  },
  {
    slug: "kishanbhai",
    name: "Kishanbhai",
    role: "Founder",
    company: "Meetwa jari and fancy dori",
    rating: 5,
    quote: "Ok done...extremely nice",
    avatar: "/testimonials/kishanbhai-avatar.webp",
    shot: shotKishan,
  },
  {
    slug: "harsh-desai",
    name: "Harsh Desai",
    role: null,
    /* "Monarch Hyndai" in the export. The dealership spells it Hyundai. */
    company: "Monarch Hyundai",
    rating: 5,
    quote: "Really nice.",
    avatar: "/testimonials/harsh-desai-avatar.webp",
    shot: null,
  },
  {
    slug: "kayur",
    name: "Kayur",
    role: null,
    company: "Samarpan Jewellery & Fashion",
    rating: 5,
    quote: "Nice",
    avatar: "/testimonials/kayur-avatar.webp",
    shot: null,
  },
  {
    slug: "krish",
    name: "Krish",
    role: null,
    company: "ZJOOLRY",
    rating: 5,
    quote: "Done malik done !! Layva nvu \u{1F601}\u{1F44D}",
    avatar: "/testimonials/krish-avatar.webp",
    shot: shotKrish,
  },
  {
    slug: "jash-dungrani",
    name: "Jash Dungrani",
    role: "Founder",
    company: "Angoori bliss",
    rating: 5,
    quote: "Ready readyyyy ekdumm. Kaju to em pade che ho bistro special ma \u{1F602}",
    avatar: "/testimonials/jash-dungrani-avatar.webp",
    shot: shotJash,
  },
  {
    slug: "aryan",
    name: "Aryan",
    role: null,
    company: "Angoori Bliss",
    rating: 4.5,
    quote: "Killing it day by day \u{1F525}\u{1F525}",
    avatar: "/testimonials/aryan-avatar.webp",
    shot: null,
  },
  {
    slug: "alpeshbhai",
    name: "Alpeshbhai",
    role: null,
    /* Feedspace held no company for him. */
    company: null,
    rating: 5,
    quote: "Super \u{1F44F}",
    avatar: "/testimonials/alpeshbhai-avatar.webp",
    shot: null,
  },
  {
    slug: "kalpesh-desai",
    name: "Kalpesh Desai",
    role: "Founder",
    company: "Enjoy group",
    rating: 4.5,
    quote: "super \u{1F44C}",
    avatar: "/testimonials/kalpesh-desai-avatar.webp",
    shot: shotKalpesh,
  },
  {
    slug: "vishal-apani-note",
    name: "Vishal Apani",
    role: null,
    company: "Unique Plus Jari House",
    rating: 4.5,
    quote: "Okay \u{1F44C} \u{1F44D} Perfect \u{1F929}",
    avatar: "/testimonials/vishal-apani-avatar.webp",
    shot: null,
  },
  {
    slug: "himanshu-padsala-chat",
    name: "Himanshu Padsala",
    role: "Founder",
    company: "Avishtha Interiors",
    rating: 5,
    quote: "Okayy post achhi bani hei \u{1F44D}",
    avatar: "/testimonials/himanshu-padsala-avatar.webp",
    shot: shotHimanshu,
  },
  {
    slug: "jash-dungrani-note",
    name: "Jash Dungrani",
    role: null,
    company: "Angoori Bliss",
    rating: 5,
    quote: "Kudos to all \u{1F64C}\u{1F525}",
    avatar: "/testimonials/jash-dungrani-avatar.webp",
    shot: null,
  },
];
