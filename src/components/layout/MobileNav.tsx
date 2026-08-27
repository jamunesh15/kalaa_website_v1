"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { FOCUS_RING, SURFACE } from "@/components/ui/surface";
import { CONTACT_LINK, PRIMARY_LINKS } from "@/nav";

/**
 * The phone menu, below `md:`.
 *
 * It exists because the masthead links are hidden on a phone, and links hidden
 * with nothing behind them is how this site once shipped a layout where a
 * visitor on a phone could reach exactly one destination. `responsive.spec.ts`
 * guards that now: it finds this control by its accessible name, opens it, and
 * fails if the phone menu lists fewer places than the desktop masthead.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Escape closes it, which is what a keyboard user expects from a disclosure
  // and what nothing else on the page provides.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`${SURFACE} ${FOCUS_RING} bg-tint-sage px-4 py-2 text-small font-medium text-ink`}
      >
        {open ? "Close menu" : "Menu"}
      </button>

      {open ? (
        <nav
          id={panelId}
          aria-label="Primary mobile"
          className={`${SURFACE} absolute inset-x-4 top-full mt-2 bg-sheet px-5 py-5`}
        >
          <ul className="flex flex-col gap-4">
            {[...PRIMARY_LINKS, CONTACT_LINK].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`${FOCUS_RING} rounded-token text-body text-ink-body`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
