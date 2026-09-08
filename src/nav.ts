/* The site's navigation, in one place. */
export type NavLink = {
  readonly href: string;
  readonly label: string;
};

/* The three places the client wants a visitor sent, given 2026-09-07. */
export const PRIMARY_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#pricing", label: "Packages" },
  { href: "/blog", label: "Blog" },
];

/* The action, kept apart because it is styled as a button rather than a link. */
export const CONTACT_LINK: NavLink = { href: "/contact", label: "Contact us" };

/* The one link that stays in the phone masthead beside the menu control. */
export const PHONE_BAR_LINK: NavLink =
  PRIMARY_LINKS.find((link) => link.label === "Packages") ?? PRIMARY_LINKS[PRIMARY_LINKS.length - 1];

/* The footer's first column of links: the nav, then contact. */
export const QUICK_LINKS: readonly NavLink[] = [
  ...PRIMARY_LINKS,
  { href: "/contact", label: "Contact" },
];

/* The small print, next to the copyright. */
export const LEGAL_LINKS: readonly NavLink[] = [
  { href: "/privacy-policy", label: "Privacy policy" },
];
