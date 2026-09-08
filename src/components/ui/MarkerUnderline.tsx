/*
 * The marker stroke drawn under a figure.
 *
 * `preserveAspectRatio="none"` on purpose: the stroke stretches to whatever it
 * is underlining and keeps its own height, so a four character price and a
 * seven character word both get a stroke the same weight. Colour is
 * `currentColor`, so the caller sets it with a text class and it stays a token.
 */
export function MarkerUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden="true"
      className={`h-3.5 ${className}`}
    >
      {/* Thicker through the middle than at either end, which is what makes it a stroke rather than a rule. */}
      <path d="M3.5 11.2C40 6.6 70 4.6 100 4.4c34-.2 66 1.2 96.5 3.6l-.6 4.6C165.4 10.4 133.6 9.2 100 9.4c-29.6.2-59.4 2.2-95.3 6.2z" />
    </svg>
  );
}
