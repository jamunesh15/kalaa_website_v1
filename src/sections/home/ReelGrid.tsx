"use client";

import { SlideIn } from "@/components/ui/SlideIn";
import { useBelowMd } from "@/motion/useBelowMd";
import { ReelTile } from "@/sections/home/ReelTile";
import type { Reel } from "@/sections/home/reelPlayerStore";

/* Each row of reels arrives as one line: the first from the left, the next from the right. */
const ROW_TRAVEL = 96;

export function ReelGrid({ reels }: { reels: readonly Reel[] }) {
  const columns = useBelowMd() ? 2 : 4;

  const rows: Reel[][] = [];
  for (let start = 0; start < reels.length; start += columns) {
    rows.push(reels.slice(start, start + columns));
  }

  return (
    <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:mt-14">
      {rows.map((row, index) => (
        /* A subgrid row, so the cards keep the grid's columns while the row moves as one. */
        <SlideIn
          key={row[0].slug}
          from={index % 2 === 0 ? "left" : "right"}
          travel={ROW_TRAVEL}
          className="col-span-full grid min-w-0 grid-cols-subgrid will-change-transform"
        >
          {row.map((reel) => (
            <ReelTile key={reel.slug} item={reel} />
          ))}
        </SlideIn>
      ))}
    </div>
  );
}
