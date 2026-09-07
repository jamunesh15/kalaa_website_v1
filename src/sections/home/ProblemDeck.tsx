"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import type { Problem } from "@/content/types";
import { ProblemCard } from "@/sections/home/ProblemCard";

/* The deck, and the only reason it exists as its own component. */
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

/* Degrees of in-plane lean before a card settles. */
const TILT = 4;
