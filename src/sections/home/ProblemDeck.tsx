"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import type { Problem } from "@/content/types";
import { ProblemCard } from "@/sections/home/ProblemCard";

/**
 * The deck, and the only reason it exists as its own component.
 *
 * A card needs to know how far the reader has got through the whole stack, not
 * just through its own approach, because how far back a card should be pushed
 * depends on how many cards have landed on top of it. That is one scroll
 * measurement shared by every card, so it is read once here and handed down as
 * a motion value rather than measured four times.
 *
 * `offset` runs from "the top of the deck reaches the top of the screen" to
 * "the bottom of the deck reaches the bottom", which is the span over which
 * cards are actually arriving and being covered.
 *
 * `overflow-x-clip`, and the choice of `clip` over `hidden` is the whole point
 * of that class. A card that arrives rotated has a bounding box wider than the
 * card, which produced a horizontal scrollbar at 320px and 390px.
 * `overflow-x: hidden` would also fix it and would silently break the deck: a
 * `hidden` ancestor becomes the scroll container, and `position: sticky` inside
 * it then sticks to nothing. `clip` does not create a scroll container.
 */
export function ProblemDeck({ problems }: { problems: readonly Problem[] }) {
  const ref = useRef<HTMLUListElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ul ref={ref} className="mt-14 overflow-x-clip">
      {problems.map((problem, index) => (
        <ProblemCard
          key={problem.slug}
          problem={problem}
          index={index}
          total={problems.length}
          tilt={index % 2 === 0 ? -TILT : TILT}
          deckProgress={scrollYProgress}
        />
      ))}
    </ul>
  );
}

/**
 * Degrees of in-plane lean before a card settles.
 *
 * Alternating sign, so the deck reads as paper dropped by hand rather than as a
 * fan going one way. This is the smaller half of the motion; the bend that
 * carries it is `rotateX`, in `ProblemCard`.
 */
const TILT = 4;
