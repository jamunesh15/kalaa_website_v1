import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

/**
 * One titled block of the style tile.
 *
 * Every block on this page is the same shape, so the page reads as one document
 * rather than as six people's screenshots stacked up.
 */
export function Block({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <Section className="border-b-token border-line">
      <h2 className="font-display text-display-m text-ink">{title}</h2>
      {note ? <p className="mt-2 max-w-2xl text-small text-ink-muted">{note}</p> : null}
      <div className="mt-8">{children}</div>
    </Section>
  );
}
