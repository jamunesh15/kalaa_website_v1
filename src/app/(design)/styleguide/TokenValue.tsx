"use client";

import { useSyncExternalStore } from "react";

/**
 * Prints the live value of a token, read from the document.
 *
 * Deliberately not a list of values typed beside the swatches. A style guide
 * that repeats the palette in its own words is a second source of truth, and
 * the first thing a second source of truth does is drift from the first one.
 * This reads `getComputedStyle`, so the page cannot describe a colour the site
 * is not actually using.
 *
 * `useSyncExternalStore` rather than an effect: the stylesheet is an external
 * value being read into React, which is exactly what this hook is for, and it
 * gives the server render an honest empty answer instead of a wrong one.
 * Reading it in an effect and calling `setState` would work and would also
 * trigger the cascading-render lint rule, for good reason.
 */

/** The value never changes after load, so there is nothing to subscribe to. */
const subscribe = () => () => {};

/** Rendered on the server, where there is no document to measure. */
const serverSnapshot = () => "";

export function TokenValue({ name }: { name: string }) {
  const value = useSyncExternalStore(
    subscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    serverSnapshot,
  );

  return (
    <span className="font-mono text-small text-ink-muted">
      {name}
      {value ? ` ${value}` : ""}
    </span>
  );
}
