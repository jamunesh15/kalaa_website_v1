import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { FOCUS_RING } from "@/components/ui/surface";
import { CONTACT_LINK, PRIMARY_LINKS } from "@/nav";
import { SITE } from "@/site";

/**
 * The masthead.
 *
 * Sticks to `--frame` rather than to zero, so it comes to rest inside the sage
 * margin instead of covering it. Sticking to the viewport edge would scroll the
 * frame away at the top and leave the page looking like the border had fallen
 * off on one side.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-[var(--frame)] z-50 rounded-t-token bg-sheet/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <Link
          href="/"
          className={`${FOCUS_RING} rounded-token font-display text-display-m font-semibold text-ink`}
        >
          {SITE.name}
        </Link>

        {/*
          Named, because a page can hold more than one navigation landmark and
          an unnamed one gives a screen reader user no way to tell them apart.
          The footer's is named too.
        */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${FOCUS_RING} transition-token rounded-token text-body text-ink-body hover:text-ink`}
            >
              {link.label}
            </Link>
          ))}
          <Button href={CONTACT_LINK.href}>{CONTACT_LINK.label}</Button>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
