"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FOCUS_RING } from "@/components/ui/surface";

/* One link in the masthead or the mobile menu. */
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
