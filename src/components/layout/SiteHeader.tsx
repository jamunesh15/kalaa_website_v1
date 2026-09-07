import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING, HOVER_PLATE } from "@/components/ui/surface";
import { CONTACT_LINK, PRIMARY_LINKS } from "@/nav";

/**
 * The masthead.
 *
 * Sticks to `--frame` rather than to zero, so it comes to rest inside the sage
 * margin instead of covering it. Sticking to the viewport edge would scroll the
 * frame away at the top and leave the page looking like the border had fallen
 * off on one side.
 *
 * **Opaque, and never translucent.** It carried `bg-sheet/95 backdrop-blur`
 * for one build, which is glassmorphism, a thing this project bans, and the
 * symptom was exactly what the ban exists to prevent: hero cards scrolling
 * underneath showed through the bar as ghosts and it read as a rendering
 * fault. A masthead that content passes behind has to actually hide it.
 */
export function SiteHeader() {
  return (
    <header className="sticky-below-frame sticky z-50 rounded-t-token bg-sheet">
      <div className="mx-auto flex w-full max-w-7xl masthead-height items-center justify-between gap-4 px-5">
        <Link href="/" className={`${FOCUS_RING} rounded-token`}>
          <BrandMark className="h-7 w-auto sm:h-8" priority />
        </Link>

        {/*
          Named, because a page can hold more than one navigation landmark and
          an unnamed one gives a screen reader user no way to tell them apart.
          The footer's is named too.
        */}
        {/*
          `gap-3`, down from `gap-7`. Each link now carries its own padding, so
          the space between the words is the gap plus two paddings; left at
          seven the row spread out and pushed the button off the end.
        */}
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
          {/*
            The same button as everywhere else on the site, at the same size.
            It carried `size="sm"` for a while on the theory that a 40px badge
            in a 64px bar makes the page top-heavy; the client asked for the
            masthead action to match the other buttons instead of having a
            size of its own. The bar is 64px, the button is 52px, it fits.
          */}
          <ArrowButton href={CONTACT_LINK.href} width="fit">
            {CONTACT_LINK.label}
          </ArrowButton>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
