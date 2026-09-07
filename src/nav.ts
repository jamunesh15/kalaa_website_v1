/**
 * The site's navigation, in one place.
 *
 * The masthead, the mobile menu and the footer all read from here. They were
 * three separate hardcoded lists, and the footer had already drifted: it was
 * missing Pricing for a while after that section was added, which nothing
 * caught because each list looked correct on its own.
 *
 * Paths are absolute (`/#services`, not `#services`) so the same link works
 * from the privacy policy as from the landing page. A bare fragment would
 * scroll the current page looking for a section that is not on it.
 */
export type NavLink = {
  readonly href: string;
  readonly label: string;
};

/**
 * The three places the client wants a visitor sent, given 2026-09-07.
 *
 * It was Services, Work, Process and Pricing, one entry per band in the order
 * the page runs. The client cut it to three, then asked for Work back on
 * 2026-09-07: it points at the mosaic of posts and reels, which is the thing a
 * visitor most wants to see before they decide. **Process is still off the
 * nav.** It is on the page with its anchor intact, so nothing is orphaned and
 * putting it back is one line here, which also puts it back in the footer.
 *
 * "Packages" points at `#pricing`. The label is the client's word and the
 * anchor is the section's id; renaming the id would break every link anyone has
 * already shared to it for no gain a reader can see.
 *
 * A nav entry must always point at something that exists. `About` and `FAQ`
 * were once here aimed at blocks the redesign had not rebuilt, which is a link
 * that scrolls a visitor to nothing.
 */
export const PRIMARY_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#pricing", label: "Packages" },
];

/**
 * The action, kept apart because it is styled as a button rather than a link.
 *
 * It points at the contact page rather than at the landing page's closing
 * section. Those were two different destinations wearing the same word: the
 * section is an invitation, the page is the address, the number and the inbox.
 * Anyone clicking "Contact" wants the second one.
 */
export const CONTACT_LINK: NavLink = { href: "/contact", label: "Contact us" };

/**
 * The one link that stays in the phone masthead beside the menu control.
 *
 * The client asked for Packages to be reachable on a phone without opening the
 * menu. Taken from `PRIMARY_LINKS` rather than written again, so the two cannot
 * drift apart; the fallback only exists so a renamed entry fails loudly in the
 * bar rather than silently pointing somewhere else.
 */
export const PHONE_BAR_LINK: NavLink =
  PRIMARY_LINKS.find((link) => link.label === "Packages") ?? PRIMARY_LINKS[PRIMARY_LINKS.length - 1];

/**
 * The footer's first column of links: the nav, then contact.
 *
 * Home is in `PRIMARY_LINKS` itself now, so it is not added again here. It was,
 * and the moment the client asked for Home in the masthead the footer would
 * have listed it twice.
 *
 * Built from `PRIMARY_LINKS` rather than written again, so a section added to
 * the masthead cannot go missing from the footer. That drift happened once
 * already, and each list looked correct on its own.
 *
 * The privacy policy is deliberately not in here. It sits in `LEGAL_LINKS`
 * beside the copyright, which is where a reader looks for it and which keeps
 * this column a list of places rather than a list of places plus a document.
 */
export const QUICK_LINKS: readonly NavLink[] = [
  ...PRIMARY_LINKS,
  { href: "/contact", label: "Contact" },
];

/**
 * The small print, next to the copyright.
 *
 * One entry today. Terms and conditions belong here the day that page exists,
 * and not before: a footer link to a page that has not been written is a 404
 * with a promise attached, and `tests/links.spec.ts` fails it.
 */
export const LEGAL_LINKS: readonly NavLink[] = [
  { href: "/privacy-policy", label: "Privacy policy" },
];
