"use client";

import { useSyncExternalStore } from "react";
import type { WorkPiece } from "@/content/types";

/* Which reel the player is showing, shared by the wall and the player. */
export type Reel = Extract<WorkPiece, { kind: "reel" }>;

let current: Reel | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function openReel(reel: Reel) {
  current = reel;
  emit();
}

export function closeReel() {
  if (current === null) return;
  current = null;
  emit();
}

function subscribeReel(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useOpenReel(): Reel | null {
  return useSyncExternalStore(
    subscribeReel,
    () => current,
    () => null,
  );
}
