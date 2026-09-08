"use client";

import { useSyncExternalStore } from "react";

/* Whether the viewport is narrower than `md`, where the work grids are two across rather than their full composition. */
const QUERY = "(max-width: 47.999rem)";

function subscribe(listener: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

export function useBelowMd(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
