"use client";

import { useSyncExternalStore } from "react";

/*
 * Whether the viewport is narrower than 60rem.
 *
 * 60rem is where the pricing row goes three across and where the service
 * showcase's stacked reveal gives way to the composed one. Below it, anything
 * laid out as a row is a column, and a reveal written for a row reads wrong.
 */
const QUERY = "(max-width: 59.999rem)";

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
