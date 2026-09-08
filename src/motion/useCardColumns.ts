"use client";

import { useSyncExternalStore } from "react";

/*
 * How many cards the article grid is showing right now.
 *
 * The grid's columns are CSS. This is for the row entrance: a row has to move as
 * one line, so the markup has to be grouped into the same rows the eye sees. The
 * two numbers below are the grid's own breakpoints and have to stay in step with
 * `md:grid-cols-2 lg:grid-cols-3`.
 */
const MD = "(min-width: 48rem)";
const LG = "(min-width: 64rem)";

function subscribe(listener: () => void) {
  const queries = [window.matchMedia(MD), window.matchMedia(LG)];
  queries.forEach((query) => query.addEventListener("change", listener));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", listener));
}

function read() {
  if (window.matchMedia(LG).matches) return 3;
  return window.matchMedia(MD).matches ? 2 : 1;
}

export function useCardColumns(): number {
  /* Three on the server, which is what the widest layout renders, the same way `useBelowMd` assumes desktop. */
  return useSyncExternalStore(subscribe, read, () => 3);
}
