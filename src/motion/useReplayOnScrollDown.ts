"use client";

import { useCallback, useState } from "react";

/**
 * A scroll reveal that plays every time the reader arrives, and only downward.
 *
 * Every reveal on this site used `once: true`, so each one fired on the first
 * approach and never again. Scroll back up and down and the page was inert: the
 * sections that were built to introduce themselves had already spent the only
 * introduction they had.
 *
 * The obvious fix, `once: false`, is wrong twice over. It resets on any exit, so
 * scrolling UP past a section runs its whole reveal backwards under a reader who
 * has already read it, and it then replays as they come back down having never
 * really left. That is the mistake `.claude/rules/web-common.md` names: never
 * drive a reveal from `isIntersecting` alone.
 *
 * So the exit is judged rather than counted. `boundingClientRect.top` against
 * `rootBounds.top` says which edge the element left by. Positive means its top is
 * still below the top of the viewport, so the reader has scrolled up and the
 * section is now beneath them: re-arm it. Negative means they scrolled down past
 * it, which changes nothing, and is what stops the animation ever running in
 * reverse.
 *
 * Usage: spread `handlers` onto a `motion` element, give it a `viewport` amount,
 * and drive `animate` from `shown`. Do not also pass `whileInView`, which would
 * be a second thing deciding the same question.
 *
 *     const { shown, handlers } = useReplayOnScrollDown();
 *     <motion.div {...handlers} viewport={{ amount: 0.3 }}
 *       initial="hidden" animate={shown ? "shown" : "hidden"} />
 */
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
