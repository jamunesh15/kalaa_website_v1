"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Stops the CSS animations inside it while it is off screen.
 *
 * The marquees on this site are `infinite`, which means the browser keeps
 * compositing them for the whole life of the page whether or not anybody can
 * see them. The home page runs four, carrying about forty images between them,
 * still repainting while a reader is four sections further down. Measured on the
 * home page: six animations running at all times, and only ever one of them on
 * screen. It is most of the reason the page feels heavy with dev tools open,
 * because dev tools adds paint instrumentation on top of work that should not be
 * happening at all.
 *
 * It sets `data-paused` rather than touching `style`, so the rule that acts on
 * it lives in the stylesheet beside the animations it pauses. With no
 * JavaScript, the attribute is never set and everything animates as before.
 *
 * `rootMargin` restarts it before it arrives, so a marquee is never caught
 * standing still on screen.
 */
export function OffscreenPause({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.paused = entry.isIntersecting ? "false" : "true";
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
