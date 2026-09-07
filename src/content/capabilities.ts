import type { Capability } from "@/content/types";

/* The presence story before the services list. */
export const CAPABILITIES: readonly Capability[] = [
  {
    slug: "be-seen-often",
    title: "People need to see you often",
    summary:
      "A quiet page makes even a good business feel inactive. Regular posts keep your brand present in the buyer's mind.",
    includes: ["Active page", "Fresh posts", "Local reach", "Brand recall"],
    label: "PRESENCE",
  },
  {
    slug: "look-trustworthy",
    title: "Your page becomes proof",
    summary:
      "Before someone calls, they check how you look online. Clear content helps them feel that your work is real.",
    includes: ["Work proof", "Helpful posts", "Clear offers", "Better first impression"],
    label: "TRUST",
  },
  {
    slug: "stay-in-memory",
    title: "Stay in memory until they are ready",
    summary:
      "Most people do not enquire the first time they see you. Repeated, useful content keeps you close until the need appears.",
    includes: ["Stories", "Reels", "Retargeting", "Reminders"],
    label: "RECALL",
  },
  {
    slug: "make-enquiry-easy",
    title: "Make choosing you easy",
    summary:
      "When the message is clear and the next step is simple, attention can become a WhatsApp message, call, or lead.",
    includes: ["Simple CTA", "Lead form", "WhatsApp", "Follow-up"],
    label: "ENQUIRY",
  },
];
