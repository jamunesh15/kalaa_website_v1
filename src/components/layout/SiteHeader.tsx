import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING, HOVER_PLATE } from "@/components/ui/surface";
import { CONTACT_LINK, PRIMARY_LINKS } from "@/nav";

/* The masthead. */
export function SiteHeader() {
  return (
    <header className="sticky-below-frame sticky z-50 rounded-t-token bg-sheet">
      <div className="mx-auto flex w-full max-w-7xl masthead-height items-center justify-between gap-4 px-5">
        <Link href="/" className={`${FOCUS_RING} rounded-token`}>
          <BrandMark className="h-7 w-auto sm:h-8" priority />
        </Link>

        {/* Named, because a page can hold more than one navigation landmark and an unnamed one gives a screen reader user no way. */}
        {/* `gap-3`, down from `gap-7`. */}
        <nav aria-label="Primary" className="hidden items-center gap-3 md:flex">
          {PRIMARY_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={`${HOVER_PLATE} text-small font-medium text-ink`}
            >
              {link.label}
            </NavLink>
          ))}
          {/* The same button as everywhere else on the site, at the same size. */}
          <ArrowButton href={CONTACT_LINK.href} width="fit">
            {CONTACT_LINK.label}
          </ArrowButton>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
