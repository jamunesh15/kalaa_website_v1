"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FOCUS_RING } from "@/components/ui/surface";

/**
 * One link in the masthead or the mobile menu.
 *
 * **It exists for Home, and for one failure that an anchor cannot fix.** `/`
 * has no hash, so pressing Home while already on the landing page is a
 * navigation to the page you are on: Next sees the same route, changes nothing,
 * and the reader stays exactly where they were scrolled to. Reported as "click
 * Home and nothing happens".
 *
 * Pointing Home at `/#top` instead trades that for a subtler version of the
 * same bug. The first press works, and every press after it does nothing,
 * because the hash is already `#top` and a browser does not re-scroll to a
 * fragment it is already at. It also leaves a hash on the address of the front
 * page, which is the one URL that should stay clean.
 *
 * So Home scrolls rather than navigates when the reader is already there. It
 * asks for smooth behaviour explicitly rather than inheriting `scroll-behavior`
 * from `html`, and it reads the reduced-motion preference in the handler rather
 * than in the markup: nothing rendered depends on the preference, so there is
 * no hydration mismatch, and a reader who asks for less motion is taken to the
 * top immediately.
 */
export function NavLink({
  href,
  className = "",
  onNavigate,
  children,
}: {
  href: string;
  className?: string;
  /** For the mobile menu, which closes itself when a link is chosen. */
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isHomeFromHome = href === "/" && pathname === "/";

  return (
    <Link
      href={href}
      onClick={(event) => {
        if (isHomeFromHome) {
          event.preventDefault();
          const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
        }
        onNavigate?.();
      }}
      className={`${FOCUS_RING} transition-token rounded-token ${className}`}
    >
      {children}
    </Link>
  );
}
