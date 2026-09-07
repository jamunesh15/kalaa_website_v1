"use client";

import { useSyncExternalStore } from "react";

/* Whether the page is being scrolled right now. */
let scrolling = false;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

/* 140ms of quiet counts as stopped. */
const IDLE_MS = 140;

function onScroll() {
  if (!scrolling) {
    scrolling = true;
    listeners.forEach((listener) => listener());
  }
  clearTimeout(timer);
  timer = setTimeout(() => {
    scrolling = false;
    listeners.forEach((listener) => listener());
  }, IDLE_MS);
}

/* The store, for code that cannot read it through the hook. */
export function isScrolling(): boolean {
  return scrolling;
}

export function subscribeScrolling(listener: () => void): () => void {
  return subscribe(listener);
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      scrolling = false;
    }
  };
}

export function useScrolling(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => scrolling,
    () => false,
  );
}
