"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the viewport is narrower than `lg`, the width below which the service
 * showcase stacks into one column.
 *
 * It exists because one entrance cannot suit both layouts. Side by side, a card
 * sliding in from its own edge is crossing a real gap and a reader watches it
 * arrive. Stacked on a phone, the same card is sliding in from over half the
 * screen away, alone in the column, with the next one queued behind it doing
 * the same, and the client's word for the result was "too slow".
 *
 * `useSyncExternalStore` with a server snapshot of `false`: the markup renders
 * identically on both sides, and the phone value arrives on the first client
 * render. `matchMedia` in an effect would have been a render behind it.
 */
const QUERY = "(max-width: 63.999rem)";

function subscribe(listener: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

export function useNarrowViewport(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
