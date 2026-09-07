"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FOCUS_RING, HOVER_PLATE, SURFACE } from "@/components/ui/surface";
import { NavLink } from "@/components/layout/NavLink";
import { CONTACT_LINK, PHONE_BAR_LINK, PRIMARY_LINKS } from "@/nav";

/**
 * The phone menu, below `md:`.
 *
 * It exists because the masthead links are hidden on a phone, and links hidden
 * with nothing behind them is how this site once shipped a layout where a
 * visitor on a phone could reach exactly one destination. `responsive.spec.ts`
 * guards that now: it finds this control by its accessible name, opens it, and
 * fails if the phone menu lists fewer places than the desktop masthead.
 *
 * **Two things stay in the bar: Packages and the control.** The client asked
 * for Packages to be one tap away on a phone without opening the menu, so it
 * sits beside the control as a plain link and stays in the menu as well, the
 * way the desktop bar lists it once and the footer lists it again.
 *
 * **The control is three lines that fold into a cross, not the word "Menu".**
 * The word was a pale pill that read as a second button beside the black
 * action; the glyph is what a phone reader expects to find in that corner.
 * Its accessible name is still the word, because the responsive suite finds
 * the control by `/menu/i` and a screen reader wants a word, not a shape. The
 * lines are an SVG at 24px so all three rasterise alike; see `hamburger` in
 * `utilities.css` for the bar that came out darker than its neighbours.
 *
 * **The panel hangs straight off the bar.** It opened 8px below it at first,
 * inset from both sides, and through that gap the hero artwork showed between
 * the bar and the menu, which the client read as a hole. Full width, flush,
 * with a hairline between them.
 *
 * **Contact is the button it is on the desktop.** The wide bar ends in the
 * black arrow button; the phone menu listed the same destination as a plain
 * link, and the client asked why. Same control, same place: last.
 *
 * **It opens and closes on a transition, not a cut.** The panel drops in from
 * the bar and folds back into it on `AnimatePresence`, so closing animates
 * too, which a conditional render cannot do: the moment `open` flips the
 * element is gone. The lines turn on the same clock, `--dur-base`, so the
 * control and the panel read as one gesture. `MotionProvider` sets
 * `reducedMotion="user"`, so a reader who asked for less motion gets the cut.
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
    <div className="flex items-center gap-1 md:hidden">
      <NavLink
        href={PHONE_BAR_LINK.href}
        className={`${HOVER_PLATE} text-small font-medium text-ink`}
      >
        {PHONE_BAR_LINK.label}
      </NavLink>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Menu"}
        onClick={() => setOpen((value) => !value)}
        className={`${SURFACE} ${FOCUS_RING} grid size-11 shrink-0 place-items-center bg-tint-sage text-ink`}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className={`hamburger ${open ? "is-open" : ""}`}
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id={panelId}
            aria-label="Primary mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-x-0 top-full origin-top rounded-b-token border-t-token border-line bg-sheet px-5 pt-4 pb-5 shadow-soft"
          >
            <ul className="flex flex-col gap-4">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    onNavigate={() => setOpen(false)}
                    className={`${HOVER_PLATE} -ml-3 text-body text-ink`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {/*
              A tap on the button bubbles here and closes the menu behind it.
              `fit`, like every other button on the site: it shipped full
              width once and the client called it out.
            */}
            <div className="mt-5" onClick={() => setOpen(false)}>
              <ArrowButton href={CONTACT_LINK.href} width="fit">
                {CONTACT_LINK.label}
              </ArrowButton>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
