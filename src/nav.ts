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
 * The sections a visitor navigates between.
 *
 * This list and the sections on the landing page are the same list. `About`,
 * `Pricing` and `FAQ` were here pointing at blocks that the redesign has not
 * rebuilt, which is a nav entry that scrolls a visitor to nothing. Add each one
 * back in the same commit that adds the section behind it.
 */
export const PRIMARY_LINKS: readonly NavLink[] = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
];

/**
 * The action, kept apart because it is styled as a button rather than a link.
 *
 * It points at the contact page rather than at the landing page's closing
 * section. Those were two different destinations wearing the same word: the
 * section is an invitation, the page is the address, the number and the inbox.
 * Anyone clicking "Contact" wants the second one.
 */
export const CONTACT_LINK: NavLink = { href: "/contact", label: "Let's talk" };

/**
 * The footer row: home, every section, then contact and the policy.
 *
 * Built from `PRIMARY_LINKS` rather than written again, so a section added to
 * the masthead cannot go missing from the footer. That drift happened once
 * already, and each list looked correct on its own.
 */
export const FOOTER_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  ...PRIMARY_LINKS,
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
];
