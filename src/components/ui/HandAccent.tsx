import type { ReactNode } from "react";

/* A phrase inside a heading, set in the hand. */
export function HandAccent({
  children,
  tone = "sage",
  wrap = false,
}: {
  children: ReactNode;
  /** `on-accent` for the closing band, where the field is butter rather than a tint. */
  tone?: "sage" | "on-accent";
  /** Let the accent break across lines. Required past about two words. */
  wrap?: boolean;
}) {
  /* `--ink-sage` and never `--tint-sage`. */
  const colour = tone === "sage" ? "text-ink-sage" : "text-on-accent";

  return (
    <span
      className={`font-hand text-[1.18em] font-bold leading-[0.9] ${colour} ${
        wrap ? "" : "whitespace-nowrap"
      }`}
    >
      {children}
    </span>
  );
}
