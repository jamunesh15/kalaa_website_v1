/* How to reach Kalaa, and the only place these are written down. */

export type ContactChannel = {
  /** What the channel is, in one word. Read as a label, never as the action. */
  readonly label: string;
  /* Which glyph stands for it. */
  readonly icon: "mail" | "phone" | "whatsapp";
  /** What a reader sees, punctuated for a human rather than for a dialer. */
  readonly value: string;
  /* Two lines saying what this channel is for. */
  readonly blurb: string;
  /** The button's words. An imperative, because a button is a thing you press. */
  readonly action: string;
  /** The action the value performs when it is pressed. */
  readonly href: string;
  /* What pressing it does. */
  readonly note: string;
  /** Leaves the site, so it opens in a new tab and says so. */
  readonly external: boolean;
};

/* The three ways in, in the order a stranger would pick one. */
/* The WhatsApp deep link, written once because two lists use it. */
const WHATSAPP =
  "https://wa.me/919586909597?text=I%20would%20like%20to%20know%20more%20about%20Kalaa%20for%20Marketing";

export const CHANNELS: readonly ContactChannel[] = [
  {
    label: "Email",
    icon: "mail",
    value: "hey@kalaa.io",
    blurb: "For projects, collaborations, or anything that needs detail.",
    action: "Email us",
    href: "mailto:hey@kalaa.io",
    note: "Opens your mail app",
    external: false,
  },
  {
    label: "Phone",
    icon: "phone",
    value: "+91 9586909597",
    blurb: "Want to talk it through? We are a call away.",
    action: "Call the studio",
    href: "tel:+919586909597",
    note: "Rings the studio",
    external: false,
  },
  {
    label: "WhatsApp",
    icon: "whatsapp",
    // Not the number again. The label already says which app this is, and the
    // same digits printed twice reads as two numbers until it is read twice.
    value: "Send a message",
    blurb: "The quickest way to reach us. Start a chat any time.",
    action: "Chat on WhatsApp",
    href: WHATSAPP,
    note: "Opens WhatsApp with a message ready",
    external: true,
  },
];

/* The office, one line at a time rather than as one string. */
export const STUDIO = {
  lines: ["B-401, 402, Pragati IT Park", "Opp. AR Mall, Mota Varachha", "Surat, Gujarat 394105"],
  href: "https://www.google.com/maps/search/?api=1&query=B-401%2C%20402%2C%20Pragati%20IT%20Park%2C%20Opp.%20AR%20Mall%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394105",
  /* The same search, as an embeddable frame. */
  embed: "https://www.google.com/maps?q=Pragati%20IT%20Park%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394105&z=17&output=embed",
  /* The same address again, cut the way schema.org asks for it. */
  postal: {
    streetAddress: "B-401, 402, Pragati IT Park, Opp. AR Mall, Mota Varachha",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "394105",
    addressCountry: "IN",
  },
} as const;

export type SocialProfile = {
  /** The platform, as a person would name it. Doubles as the link's accessible name. */
  readonly label: string;
  readonly href: string;
  readonly icon: "instagram" | "x" | "whatsapp";
};

/* Kalaa's own profiles, given by the client on 2026-09-06. */
export const SOCIALS: readonly SocialProfile[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kalaa.io/",
    icon: "instagram",
  },
  {
    label: "X",
    href: "https://x.com/Kalaa_io",
    icon: "x",
  },
  {
    label: "WhatsApp",
    href: WHATSAPP,
    icon: "whatsapp",
  },
];
