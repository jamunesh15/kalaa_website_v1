"use client";

import type { CSSProperties } from "react";
import { SlideIn } from "@/components/ui/SlideIn";
import type { WorkPiece } from "@/content/types";
import { useBelowMd } from "@/motion/useBelowMd";

/* The post mosaic: twenty-eight tiles in bands, and each band arrives as one line from its own side. */
const TILES = 28;
const ROW_TRAVEL = 96;

/* From `md`, a band is two rows of the eight-column grid holding three large tiles and four small, arranged two ways in turn. */
const BAND_AREAS = [
  '"t1 t1 t2 t3 t4 t4 t5 t5" "t1 t1 t6 t7 t4 t4 t5 t5"',
  '"t1 t1 t2 t2 t3 t4 t5 t5" "t1 t1 t2 t2 t6 t7 t5 t5"',
];

export function PostWall({ posts }: { posts: readonly WorkPiece[] }) {
  const belowMd = useBelowMd();

  if (posts.length === 0) {
    return null;
  }

  /* Two tiles to a band on a phone, seven from `md`. */
  const perBand = belowMd ? 2 : 7;
  const bands: WorkPiece[][] = [];
  for (let start = 0; start < TILES; start += perBand) {
    bands.push(
      Array.from(
        { length: perBand },
        (_, offset) => posts[(start + offset) % posts.length],
      ),
    );
  }

  return (
    <div className="work-mosaic mt-10 lg:mt-14">
      {bands.map((band, index) => (
        /* A subgrid band, so its tiles sit on the mosaic's own tracks while the band moves as one. */
        <SlideIn
          key={index}
          from={index % 2 === 0 ? "left" : "right"}
          travel={ROW_TRAVEL}
          className="col-span-full row-span-2 grid min-w-0 grid-cols-subgrid grid-rows-subgrid will-change-transform"
          style={
            belowMd ? undefined : { gridTemplateAreas: BAND_AREAS[index % 2] }
          }
        >
          {band.map((post, slot) =>
            post?.kind === "post" ? (
              <PostSlot
                key={slot}
                item={post}
                className={belowMd ? "col-span-2 row-span-2" : ""}
                style={belowMd ? undefined : { gridArea: `t${slot + 1}` }}
              />
            ) : null,
          )}
        </SlideIn>
      ))}
    </div>
  );
}

/* One tile, one post, held still. */
function PostSlot({
  item,
  className,
  style,
}: {
  item: Extract<WorkPiece, { kind: "post" }>;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={`work-tile min-w-0 ${className}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element -- already sized and encoded by `npm run media`. */}
      <img
        src={item.src}
        srcSet={`${item.small} 620w, ${item.src} 1080w`}
        sizes="(max-width: 48rem) 50vw, 25vw"
        width={item.width}
        height={item.height}
        alt={item.alt}
        /*
         * Not lazy, and that is the fix rather than a preference.
         *
         * A lazy tile is not requested until it is nearly on screen, so the wall
         * filled in a beat behind the reader on the way down while every other
         * section was already there. `fetchPriority="low"` is what makes asking
         * for all of them at once safe: the browser still serves the opening and
         * anything above the fold first, and these twenty-eight arrive in the
         * gaps. They are 87KB each on average, the small file at this size.
         */
        fetchPriority="low"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
