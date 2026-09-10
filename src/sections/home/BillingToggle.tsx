"use client";

import { FOCUS_RING_WITHIN } from "@/components/ui/surface";
import type { BillingKey, BillingTerm } from "@/content/types";

/*
 * How long a visitor is buying for.
 *
 * ONE STATE for the whole row, but not always one control.
 *
 * Three INDEPENDENT toggles are the thing to avoid: a reader leaves the first
 * card on quarterly and the third on monthly, and the row then compares three
 * plans on three different terms while looking like a price comparison. That is
 * what the reference screenshot actually shows and it is wrong.
 *
 * Repeating the SAME control is a different thing. Stacked on a phone the three
 * cards are 700px each, so a control that lives above the first one is two
 * screens away by the time you are reading the third and the reader has to
 * scroll back to change a price they are looking at. Every copy writes to the
 * same state, so the three cards can never disagree.
 *
 * `name` therefore has to differ per copy. Radios sharing a name are ONE group
 * to the browser, so three copies under one name would make arrow keys jump
 * between cards and put nine inputs in a group of three.
 *
 * Radio inputs rather than buttons, because this is one choice out of three
 * rather than three actions. The browser then gives arrow key navigation, a
 * single tab stop for the whole group and the right announcement, none of which
 * a row of buttons gets without being rebuilt by hand.
 */
export function BillingToggle({
  terms,
  value,
  onChange,
  name = "billing-term",
  className = "mx-auto mt-10 w-fit",
}: {
  terms: readonly BillingTerm[];
  value: BillingKey;
  onChange: (key: BillingKey) => void;
  /** Unique per copy on the page. See the note above: radios group by name. */
  name?: string;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="sr-only">How long you are buying for</legend>

      {/* No wrapping: three labels are one control, and a label on its own
          second row reads as a fourth option. They share the width instead. */}
      <div className="rounded-token-outset-1 flex justify-center gap-1 bg-surface p-1 shadow-soft">
        {terms.map((term) => {
          const selected = term.key === value;
          return (
            <label
              key={term.key}
              className={`transition-token flex-1 cursor-pointer rounded-token px-3 py-2 text-center text-small font-bold whitespace-nowrap sm:px-6 ${FOCUS_RING_WITHIN} ${
                selected ? "bg-action text-on-action" : "text-ink-body hover:bg-ink/[0.07]"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={term.key}
                checked={selected}
                onChange={() => onChange(term.key)}
                /* Off screen rather than `hidden`, so it stays focusable and the
                   group keeps its keyboard behaviour. The label draws the ring. */
                className="sr-only"
              />
              {term.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
