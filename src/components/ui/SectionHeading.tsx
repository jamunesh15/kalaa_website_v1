import type { ReactNode } from "react";

/* One heading treatment for every band below the hero. */
export function SectionHeading({
  title,
  lead,
  align = "start",
  tone = "ink",
  className = "",
}: {
  title: ReactNode;
  /** The sentence under the heading. Omit it when the section does not need one. */
  lead?: ReactNode;
  /** `center` for a section whose content below is symmetric and full width. */
  align?: "start" | "center";
  /** `on-accent` for the closing band, where the field is butter rather than a tint. */
  tone?: "ink" | "on-accent";
  className?: string;
}) {
  const heading = tone === "ink" ? "text-ink" : "text-on-accent";
  const body = tone === "ink" ? "text-ink-body" : "text-on-accent";
  const centred = align === "center";

  return (
    /* A start-aligned heading is still centred below `md`. */
    <div className={`${centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-center md:text-left"} ${className}`}>
      <h2
        className={`max-w-[26ch] font-display text-display-l font-bold ${heading} ${
          centred ? "mx-auto" : "mx-auto md:mx-0"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p className={`mt-4 max-w-[54ch] text-lead ${body} ${centred ? "mx-auto" : "mx-auto md:mx-0"}`}>{lead}</p>
      ) : null}
    </div>
  );
}
