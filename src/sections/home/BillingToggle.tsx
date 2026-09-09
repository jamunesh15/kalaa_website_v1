"use client";

import { FOCUS_RING_WITHIN } from "@/components/ui/surface";
import type { BillingKey, BillingTerm } from "@/content/types";

/*
 * How long a visitor is buying for.
 *
 * ONE control for the whole row, not one per card, and that is a departure from
 * the reference on purpose. Three independent toggles let a reader leave the
 * first card on quarterly and the third on monthly, which is what the reference
 * screenshot actually shows, and the row then compares three plans on three
 * different terms while looking like a price comparison.
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
}: {
  terms: readonly BillingTerm[];
  value: BillingKey;
  onChange: (key: BillingKey) => void;
}) {
  return (
    <fieldset className="mx-auto mt-10 w-fit">
      <legend className="sr-only">How long you are buying for</legend>

      <div className="flex flex-wrap justify-center gap-1 rounded-token bg-surface p-1 shadow-soft">
        {terms.map((term) => {
          const selected = term.key === value;
          return (
            <label
              key={term.key}
              className={`transition-token cursor-pointer rounded-token px-4 py-2 text-small font-bold sm:px-6 ${FOCUS_RING_WITHIN} ${
                selected ? "bg-action text-on-action" : "text-ink-body hover:bg-ink/[0.07]"
              }`}
            >
              <input
                type="radio"
                name="billing-term"
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
