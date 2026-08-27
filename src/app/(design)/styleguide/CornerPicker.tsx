"use client";

import { useEffect, useState } from "react";
import { FOCUS_RING, SURFACE } from "@/components/ui/surface";

/**
 * Changes `--radius` on the document, live.
 *
 * The block this replaced showed four empty tiles at four different corners,
 * and it was the wrong way to ask the question: nobody can judge a corner on a
 * coloured square. A corner is only judgeable on a small button sitting next to
 * a large panel, which is to say on the whole page at once.
 *
 * So this writes the token itself. Every button, card, pill and panel below
 * re-renders at the chosen value, because all of them read the same token. That
 * is also a live proof that the one-radius rule holds: if anything on the page
 * does not change when this does, that thing has a hardcoded corner in it.
 *
 * Development only, like the rest of this page. Nothing here ships.
 */
const OPTIONS = [
  { label: "Square", value: "0px" },
  { label: "Slight", value: "0.5rem" },
  { label: "Current", value: "1.25rem" },
  { label: "Softer", value: "1.75rem" },
];

/** The value in `tokens.css`, so "reset" means what the site actually ships. */
const TOKEN_DEFAULT = "1.25rem";

export function CornerPicker() {
  const [value, setValue] = useState(TOKEN_DEFAULT);

  // Writing to the document is what an effect is for: pushing React state out
  // to an external system. The cleanup restores the stylesheet's own value, so
  // leaving this page cannot leave an override behind.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--radius", value);
    return () => {
      root.style.removeProperty("--radius");
    };
  }, [value]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => setValue(option.value)}
            className={`${SURFACE} ${FOCUS_RING} liftable px-4 py-2 text-small font-medium ${
              selected ? "bg-action text-on-action" : "bg-tint-sage text-ink"
            }`}
          >
            {option.label}
            <span className="ml-2 font-mono opacity-70">{option.value}</span>
          </button>
        );
      })}
    </div>
  );
}
