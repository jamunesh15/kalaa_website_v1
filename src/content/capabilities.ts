import type { Capability } from "@/content/types";

/* The presence story before the services list. `image` is a slug in `CARD_MEDIA`. c3 and c4 are the team's own photographs; c1 and c2 are not of the team, so their alt is empty. */
export const CAPABILITIES: readonly Capability[] = [
  {
    slug: "be-seen-often",
    title: "People need to see you often",
    summary:
      "A quiet page makes even a good business feel inactive. Regular posts keep your brand present in the buyer's mind.",
    includes: ["Active page", "Fresh posts", "Local reach", "Brand recall"],
    label: "PRESENCE",
    image: "c1",
    imageAlt: "",
  },
  {
    slug: "look-trustworthy",
    title: "Your page becomes proof",
    summary:
      "Before someone calls, they check how you look online. Clear content helps them feel that your work is real.",
    includes: ["Work proof", "Helpful posts", "Clear offers", "Better first impression"],
    label: "TRUST",
    image: "c2",
    imageAlt: "",
  },
  {
    slug: "stay-in-memory",
    title: "Stay in memory until they are ready",
    summary:
      "Most people do not enquire the first time they see you. Repeated, useful content keeps you close until the need appears.",
    includes: ["Stories", "Reels", "Retargeting", "Reminders"],
    label: "RECALL",
    image: "c3",
    imageAlt: "A Kalaa editor working on video footage at a workstation",
  },
  {
    slug: "make-enquiry-easy",
    title: "Make choosing you easy",
    summary:
      "When the message is clear and the next step is simple, attention can become a WhatsApp message, call, or lead.",
    includes: ["Simple CTA", "Lead form", "WhatsApp", "Follow-up"],
    label: "ENQUIRY",
    image: "c4",
    imageAlt: "A Kalaa team member on a phone call while working at a laptop",
  },
];
