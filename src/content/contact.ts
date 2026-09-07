/**
 * How to reach Kalaa, and the only place these are written down.
 *
 * Every value here is taken from the live kalaa.io rather than composed for
 * this build. An email address, a phone number and an office are facts about a
 * business, and inventing one is the fastest way to make a site lie to a
 * customer who then acts on it. The footer, the contact page and anything that
 * later carries this into structured data all read from here, so a number that
 * changes is corrected once.
 *
 * The live contact page links `hey@kalaa.io` at `tel:+4733378901`, a leftover
 * from whatever template it started from, so tapping the email on a phone
 * offers to dial Norway. That is a bug rather than a fact about the business
 * and it is not carried across.
 *
 * **There are no social profiles here**, because none could be found on
 * kalaa.io. An invented handle is worse than an absence, and a placeholder `#`
 * fails `tests/links.spec.ts`, which is the correct behaviour. Add them the day
 * a real URL arrives.
 */

export type ContactChannel = {
  /** What the channel is, in one word. Read as a label, never as the action. */
  readonly label: string;
  /**
   * Which glyph stands for it.
   *
   * A name rather than a component, because this module is the content layer
   * and will be a CMS query one day. Whatever renders the channel owns the
   * drawing; this only says which one.
   */
  readonly icon: "mail" | "phone" | "whatsapp";
  /** What a reader sees, punctuated for a human rather than for a dialer. */
  readonly value: string;
  /**
   * Two lines saying what this channel is for.
   *
   * They exist because the contact page offers three ways in at once, and three
   * unlabelled buttons make a reader choose without telling them how. Nothing
   * here promises a response time: none has been agreed.
   */
  readonly blurb: string;
  /** The button's words. An imperative, because a button is a thing you press. */
  readonly action: string;
  /** The action the value performs when it is pressed. */
  readonly href: string;
  /**
   * What pressing it does.
   *
   * A large piece of text that turns out to hand the reader to a third-party
   * app is a surprise, and one short line stops that.
   */
  readonly note: string;
  /** Leaves the site, so it opens in a new tab and says so. */
  readonly external: boolean;
};

/**
 * The three ways in, in the order a stranger would pick one.
 *
 * `tel:` carries no spaces. Some dialers stop reading at the first one and
 * offer to call a four digit number.
 *
 * The WhatsApp URL keeps the pre-filled message the live site uses, encoding
 * and all, because it is Kalaa's own wording rather than something to improve.
 */
/**
 * The WhatsApp deep link, written once because two lists use it.
 *
 * It keeps the pre-filled message the live site sends, encoding and all,
 * because that wording is Kalaa's rather than something to improve.
 */
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

/**
 * The office, one line at a time rather than as one string.
 *
 * Set as separate lines so it can be laid out as an address is written, and so
 * nothing has to split a comma-separated string back apart to do it.
 *
 * **This is the client's own correction, given 2026-09-06.** The address before
 * it, 201 Silver Trade Center near VIP Circle in Uttran, came from the live
 * kalaa.io and is out of date. Anything else that still carries the old one,
 * `public/llms.txt` included, is wrong until it is changed here.
 *
 * **The map link searches the address rather than pinning a coordinate**, and
 * that is a downgrade made on purpose. The old link pinned latitude and
 * longitude, which put the marker on the door instead of on the neighbourhood.
 * Those coordinates belong to the old office, and a pin invented for the new
 * one would be a false statement drawn on a map. A search resolves to whatever
 * Google actually holds for this address. Swap it back for a pinned link the
 * day somebody sends the real coordinates.
 */
export const STUDIO = {
  lines: ["B-401, 402, Pragati IT Park", "Opp. AR Mall, Mota Varachha", "Surat, Gujarat 394105"],
  href: "https://www.google.com/maps/search/?api=1&query=B-401%2C%20402%2C%20Pragati%20IT%20Park%2C%20Opp.%20AR%20Mall%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394105",
  /**
   * The same search, as an embeddable frame.
   *
   * `output=embed` rather than the Maps Embed API, which needs a key and a
   * billing account for what is one static frame. It resolves the address the
   * same way the link does, so the map a reader sees and the map "Get
   * directions" opens cannot disagree.
   *
   * **The embed asks for the building, the link asks for the door.** Given the
   * full address, unit number and "Opp. AR Mall" included, Google's geocoder
   * gave up on the specifics and centred a few streets away. Given the
   * building alone it finds Pragati IT Park. The `href` above keeps the whole
   * address, because directions should route to the door rather than to the
   * block, and the two are the same place.
   *
   * `z=17` because without a zoom Google frames the whole city: the address
   * resolves and the reader is shown Surat rather than a street they could
   * walk down.
   */
  embed: "https://www.google.com/maps?q=Pragati%20IT%20Park%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394105&z=17&output=embed",
  /**
   * The same address again, cut the way schema.org asks for it.
   *
   * Not parsed out of `lines` at runtime, because splitting an address on
   * commas is a guess that works until the day a street name contains one. It
   * is written out once, beside the lines it matches, so a correction to one is
   * a correction made looking at the other.
   */
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

/**
 * Kalaa's own profiles, given by the client on 2026-09-06.
 *
 * Three, not the four the drawing showed. There is no LinkedIn, Facebook or
 * YouTube URL, so there is no button for one: an invented handle is a false
 * statement about a business and a placeholder `#` fails `tests/links.spec.ts`.
 * The footer draws this list, so a fourth arriving is a line here.
 *
 * WhatsApp is in both this list and `CHANNELS`, and that is not duplication.
 * One is a way to reach the studio, listed beside the email and the phone; the
 * other is a profile to follow, sitting beside Instagram and X. Both are the
 * same deep link, which is why the number lives in one place above.
 *
 * `sameAs` in `src/seo/graph.ts` is built from this list, minus WhatsApp: a
 * chat window is not a page about the business.
 */
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
