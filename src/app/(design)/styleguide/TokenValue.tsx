"use client";

import { useSyncExternalStore } from "react";

/* Prints the live value of a token, read from the document. */

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
