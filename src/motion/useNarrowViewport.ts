"use client";

import { useSyncExternalStore } from "react";

/* Whether the viewport is narrower than `lg`, the width below which the service showcase stacks into one column. */
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
