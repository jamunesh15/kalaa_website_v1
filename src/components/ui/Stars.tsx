/* The rating a client left, drawn as the number of marks they gave. */
export function Stars({ rating }: { rating: number }) {
  const whole = Math.round(rating);

  return (
    <p className="flex items-center gap-1 text-accent" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={index < whole ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8z" />
        </svg>
      ))}
    </p>
  );
}
