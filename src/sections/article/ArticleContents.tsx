"use client";

import { useEffect, useRef, useState } from "react";
import { FOCUS_RING } from "@/components/ui/surface";
import type { ArticleSection } from "@/content/types";

/*
 * The contents list, and which part of the article is on screen.
 *
 * `rootMargin` is what makes it read correctly rather than merely work: the box
 * is squeezed to a band near the top of the viewport, so the marked heading is
 * the one being read rather than the last one to touch the bottom edge.
 *
 * **The list scrolls on its own from `lg`, and follows the reader.** The long
 * articles carry fifteen or more sections, which on a laptop runs the sticky
 * column past the bottom of the screen: the last entries could not be reached
 * until the page itself was nearly over. `toc-scroll` caps the list at the room
 * the viewport has, and the effect below keeps the marked entry inside it.
 */
const BAND = "-12% 0px -70% 0px";

export function ArticleContents({ sections }: { sections: readonly ArticleSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const rail = useRef<HTMLDivElement>(null);

  /*
   * Keep the marked entry in view inside the list as the reader moves down.
   *
   * The LIST scrolls, never the window. `scrollIntoView` would move every
   * scrollable ancestor to reach the link, the page included, which is taking
   * the scroll away from somebody who is reading. The margin is one entry's own
   * height, so the next heading along is always visible beside the current one.
   */
  useEffect(() => {
    const box = rail.current;
    if (!box || box.scrollHeight <= box.clientHeight) return;
    const link = box.querySelector<HTMLElement>('[aria-current="true"]');
    if (!link) return;

    const margin = link.offsetHeight;
    const top = link.offsetTop - margin;
    const bottom = link.offsetTop + link.offsetHeight + margin;
    let target: number | null = null;
    if (top < box.scrollTop) target = top;
    else if (bottom > box.scrollTop + box.clientHeight) target = bottom - box.clientHeight;
    if (target === null) return;

    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({ top: Math.max(0, target), behavior: instant ? "auto" : "smooth" });
  }, [active]);

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.filter((entry) => entry.isIntersecting);
        if (onScreen.length === 0) return;
        setActive(onScreen[0].target.id);
      },
      { rootMargin: BAND, threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents">
      <h2 className="text-label font-bold uppercase tracking-[0.08em] text-ink-body">
        Table of contents
      </h2>

      {/*
       * The box that scrolls, from `lg`. `relative` so each link measures its
       * offset from here. `p-1` because a scrolling box clips whatever reaches
       * past its edge, and the focus ring does: 4px of room keeps it whole,
       * and `-mx-1` with `mt-4` in place of `mt-5` puts the list back exactly
       * where it sat before, so the rail still lines up with the label above.
       */}
      <div ref={rail} className="relative -mx-1 mt-4 p-1 lg:toc-scroll">
      {/* The rail is the list's own left edge, and the marker rides it. */}
      <ul className="space-y-1 border-l border-line">
        {sections.map((section) => {
          const current = section.id === active;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={`${FOCUS_RING} transition-token -ml-px block border-l-2 py-2 pl-4 text-small ${
                  current
                    ? "border-ink-sage font-medium text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ul>
      </div>
    </nav>
  );
}
