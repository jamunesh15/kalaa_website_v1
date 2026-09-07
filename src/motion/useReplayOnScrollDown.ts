"use client";

import { useCallback, useState } from "react";

/* A scroll reveal that plays every time the reader arrives, and only downward. */
export function useReplayOnScrollDown() {
  const [shown, setShown] = useState(false);

  const onViewportEnter = useCallback(() => setShown(true), []);

  const onViewportLeave = useCallback((entry: IntersectionObserverEntry | null) => {
    if (!entry) return;
    const viewportTop = entry.rootBounds?.top ?? 0;
    if (entry.boundingClientRect.top > viewportTop) setShown(false);
  }, []);

  return { shown, handlers: { onViewportEnter, onViewportLeave } };
}
