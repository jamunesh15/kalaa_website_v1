/*
 * The rating a client left, drawn as the number of marks they gave.
 *
 * **The star is a real one.** It was a hand-typed path drawn as an outline at
 * 1.6px, which is the shape every icon set ships and reads as a placeholder at
 * any size. This one is plotted: ten points on two circles, an outer radius of
 * 11.2 and an inner one at 0.472 of it, every 36 degrees from the top. That
 * ratio is the difference between a star and a five sided blob, and it is why
 * the path is written out to two decimals rather than rounded.
 *
 * Solid, with no stroke. An outlined star at this size spends half its ink on
 * the outline, and next to a filled one the pair read as two different marks
 * rather than as a rating out of five.
 *
 * **A half is drawn as a half**, not rounded up. Three of the written reviews
 * are 4.5 and `Math.round` turned every one of them into five, which is a
 * rating this project did not receive. The half is the filled star clipped to
 * its own left half over the empty one, which needs no gradient and no `id`:
 * ids have to be unique in a document, and this component is on the page
 * seventeen times.
 */
const STAR =
  "M12.00 1.20 L15.11 8.12 L22.65 8.94 L17.03 14.03 L18.58 21.46 L12.00 17.69 L5.42 21.46 L6.97 14.03 L1.35 8.94 L8.89 8.12Z";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`size-[1.125rem] ${className}`}>
      <path d={STAR} />
    </svg>
  );
}

export function Stars({ rating }: { rating: number }) {
  /* Halves round to the nearest half, so 4.5 stays 4.5 and 4.7 becomes 5. */
  const marks = Math.round(rating * 2) / 2;

  return (
    <p className="flex items-center gap-1 text-accent" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index + 1 <= marks;
        const half = !filled && index + 0.5 <= marks;

        return (
          <span key={index} aria-hidden className="relative block">
            <Star className={filled ? "" : "opacity-25"} />

            {half ? (
              <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                <Star />
              </span>
            ) : null}
          </span>
        );
      })}
    </p>
  );
}
