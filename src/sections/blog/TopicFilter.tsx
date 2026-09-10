"use client";

import { FOCUS_RING, SURFACE_FLAT } from "@/components/ui/surface";

/*
 * The topics, as small paper chips.
 *
 * They were underlined text tabs, and that was the one control on the page not
 * made of paper: a row of plain links sitting above a wall of torn sheets. Same
 * corner as every card and every button, cream when resting and butter when
 * chosen, so choosing a topic looks like picking up a card.
 *
 * Buttons rather than links: nothing here changes the address.
 *
 * They WRAP, they do not scroll. A horizontal scroller here hides topics off
 * the right edge of a phone with nothing to say they are there, and it needs a
 * second gesture to reach a control that costs one tap. Six chips over two
 * rows is a set a reader can see all of.
 */
export function TopicFilter({
  topics,
  active,
  onSelect,
}: {
  topics: readonly string[];
  active: string;
  onSelect: (topic: string) => void;
}) {
  return (
    <div className="py-1">
      <ul className="flex flex-wrap items-center gap-2">
        {topics.map((topic) => {
          const selected = topic === active;

          return (
            <li key={topic}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(topic)}
                className={`${FOCUS_RING} ${SURFACE_FLAT} transition-token border-token cursor-pointer px-4 py-2 text-small whitespace-nowrap ${
                  selected
                    ? "border-ink/15 bg-tint-butter font-medium text-ink shadow-soft"
                    : "border-line bg-board text-ink-body hover:border-ink/15 hover:text-ink"
                }`}
              >
                {topic}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
