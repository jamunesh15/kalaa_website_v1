"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reduced motion, handled once, in the one place that can do it without lying
 * to the server.
 *
 * Four sections used to answer this question themselves, each with the same
 * shape: `initial={reducedMotion ? false : somethingAnimated}`. It reads as
 * careful and it is a hydration bug, because `useReducedMotion` cannot know the
 * preference while the page is being rendered on the server. It returns null
 * there, so the server always wrote the arriving state into the HTML, and a
 * browser with the preference set wanted the settled one. React found the two
 * disagreeing on the first element of the hero and threw away and rebuilt the
 * whole page on the client.
 *
 * The cost landed entirely on the people the branch was written for. It showed
 * up as one console error, which is why it survived: every rendered check passed
 * because the page it produced was correct, just built twice.
 *
 * `reducedMotion="user"` moves the decision out of what is rendered and into how
 * it animates. Motion drops transform and layout animations for anyone who has
 * asked for less movement and lets the element settle on its end value instead,
 * so nothing is ever hidden by a preference. Server and client render the same
 * HTML either way, because nothing in the markup depends on the answer.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
