"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the page is being scrolled right now.
 *
 * **It exists to pause the reels while the reader is moving, and that is a
 * measured fix rather than a hunch.** Frame times through the work band, taken
 * by scrolling it under `requestAnimationFrame` and recording the gaps:
 *
 * | state              | median | worst |
 * | ------------------ | ------ | ----- |
 * | as shipped         | 16.7ms | 48.1  |
 * | videos paused      | 8.3ms  | 16.6  |
 * | videos removed     | 8.3ms  | 8.8   |
 * | tile shadows off   | 16.7ms | 20.9  |
 *
 * Every other band on the page measures 8.3ms. Six autoplaying videos decoding
 * while the page moves is the whole difference, the shadows are not involved,
 * and paused is as cheap as absent. So they stop while the page is in motion
 * and start again the moment it settles, which is also when anybody could
 * actually watch one.
 *
 * **One listener for the whole document, not one per reel.** Six components
 * each attaching their own scroll handler is six callbacks per frame doing the
 * same work; this is a module-level store they all read.
 *
 * `useSyncExternalStore` rather than state in an effect: the server snapshot is
 * `false`, so the markup renders identically on both sides and nothing depends
 * on a value that only exists in a browser.
 */
let scrolling = false;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

/**
 * 140ms of quiet counts as stopped.
 *
 * Short enough that letting go of the wheel starts the reels again while the
 * reader is still looking at the tile they stopped on, long enough that the
 * gaps between wheel events inside one flick do not restart them mid-scroll.
 */
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

/**
 * The store, for code that cannot read it through the hook.
 *
 * `WorkWall` decides whether to create a video element inside an
 * `IntersectionObserver` callback and again when the page comes to rest, and
 * neither of those is a render. It subscribes here directly and asks
 * `isScrolling()` at the moment it matters, rather than mirroring the value
 * into state through an effect, which the lint rule against setting state in
 * effects rightly refuses.
 */
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
