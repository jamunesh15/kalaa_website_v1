"use client";

import { useEffect, useState } from "react";
import { FOCUS_RING } from "@/components/ui/surface";
import type { ArticleSection } from "@/content/types";

/*
 * The contents list, and which part of the article is on screen.
 *
 * `rootMargin` is what makes it read correctly rather than merely work: the box
 * is squeezed to a band near the top of the viewport, so the marked heading is
 * the one being read rather than the last one to touch the bottom edge.
 */
const BAND = "-12% 0px -70% 0px";

export function ArticleContents({ sections }: { sections: readonly ArticleSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

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

      {/* The rail is the list's own left edge, and the marker rides it. */}
      <ul className="mt-5 space-y-1 border-l border-line">
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
    </nav>
  );
}
