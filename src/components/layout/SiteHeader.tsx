import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING, HOVER_TAPE } from "@/components/ui/surface";
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
        {/* `tape-column` is what makes the tilt alternate along the row: the
            rule tilts every link one way and every second child the other. The
            class carries no layout of its own, only that selector. */}
        <nav
          aria-label="Primary"
          className="tape-column hidden items-center gap-3 md:flex"
        >
          {PRIMARY_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={`${HOVER_TAPE} text-small font-medium text-ink`}
            >
              {link.label}
            </NavLink>
          ))}
          {/* The bar's own size: the base button is 52px in a 64px bar and the client called it too big. */}
          <ArrowButton href={CONTACT_LINK.href} width="fit" size="sm">
            {CONTACT_LINK.label}
          </ArrowButton>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
