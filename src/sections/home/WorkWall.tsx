"use client";

import type { CSSProperties } from "react";
import { SlideIn } from "@/components/ui/SlideIn";
import type { WorkPiece } from "@/content/types";
import { useBelowMd } from "@/motion/useBelowMd";
import { ReelTile } from "@/sections/home/ReelTile";
import type { Reel } from "@/sections/home/reelPlayerStore";

/*
 * The work wall: reels and posts on one grid rather than in two sections.
 *
 * A band is two reels and six posts. The reel count decides how many bands there
 * are, so every reel is shown once and none repeats; the posts cycle, which they
 * already did when this was a post wall on its own.
 */
const REELS_PER_BAND = 2;
const POSTS_PER_BAND = 6;

/* A phone band is half a wide one: four columns, one reel, three posts. */
const PHONE_REELS_PER_BAND = 1;
const PHONE_POSTS_PER_BAND = 3;

/*
 * A phone band: FOUR columns, one reel and three posts.
 *
 * The same mosaic the wide layout uses, halved. A reel is two columns of four
 * rather than the whole width, which is what keeps the wall short: at full width
 * twelve reels were 6,876px on their own. One reel to a band also means two
 * reels can never meet, which was the constraint from the stacked version.
 *
 * `pa` is two by two and `pb` and `pc` are single cells, all of them 4:5, the
 * same shapes the wide bands use.
 */
const PHONE_BAND_AREAS = [
  '"r1 r1 pa pa" "r1 r1 pa pa" "r1 r1 pb pc"',
  '"pa pa r1 r1" "pa pa r1 r1" "pb pc r1 r1"',
  '"r1 r1 pb pc" "r1 r1 pa pa" "r1 r1 pa pa"',
  '"pb pc r1 r1" "pa pa r1 r1" "pa pa r1 r1"',
];

const PHONE_POST_AREAS = ["pa", "pb", "pc"];

/* Rows of the eight column grid one band occupies. */
const BAND_ROWS = 3;

/*
 * Four arrangements, taken in turn.
 *
 * Read the band as four slots of two columns. **The two reels are never
 * adjacent**: they take slots one and three, and on the next band slots two and
 * four, so posts always separate them. Side by side they read as a pair of
 * videos parked at one end of the row, which is the thing merging the sections
 * was meant to stop.
 *
 * The remaining two slots each hold three posts, one two by two over two single
 * cells, and that stack flips on the third and fourth arrangements so six bands
 * do not read as the same stamp repeated. `r1` and `r2` are two columns wide and
 * the band's full height; every post cell is 4:5.
 */
const BAND_AREAS = [
  /* Reels in slots 1 and 3, large posts on top. */
  '"r1 r1 pa pa r2 r2 pd pd" "r1 r1 pa pa r2 r2 pd pd" "r1 r1 pb pc r2 r2 pe pf"',
  /* Reels in slots 2 and 4. */
  '"pa pa r1 r1 pd pd r2 r2" "pa pa r1 r1 pd pd r2 r2" "pb pc r1 r1 pe pf r2 r2"',
  /* Slots 1 and 3 again, small posts on top. */
  '"r1 r1 pb pc r2 r2 pe pf" "r1 r1 pa pa r2 r2 pd pd" "r1 r1 pa pa r2 r2 pd pd"',
  /* Slots 2 and 4, small posts on top. */
  '"pb pc r1 r1 pe pf r2 r2" "pa pa r1 r1 pd pd r2 r2" "pa pa r1 r1 pd pd r2 r2"',
];

/* Where the six posts of a band land, in the order they are written. */
const POST_AREAS = ["pa", "pb", "pc", "pd", "pe", "pf"];

type Band = { readonly reels: readonly Reel[]; readonly posts: readonly PostPiece[] };
type PostPiece = Extract<WorkPiece, { kind: "post" }>;

export function WorkWall({
  reels,
  posts,
}: {
  reels: readonly Reel[];
  posts: readonly PostPiece[];
}) {
  const belowMd = useBelowMd();

  if (reels.length === 0 || posts.length === 0) {
    return null;
  }

  /* Half as many reels to a band on a phone, so twice as many bands. Every reel
     is still shown exactly once either way. */
  const perBand = belowMd ? PHONE_REELS_PER_BAND : REELS_PER_BAND;
  const postsPerBand = belowMd ? PHONE_POSTS_PER_BAND : POSTS_PER_BAND;

  const bands: Band[] = [];
  for (let start = 0; start < reels.length; start += perBand) {
    const index = bands.length;
    bands.push({
      reels: reels.slice(start, start + perBand),
      posts: Array.from(
        { length: postsPerBand },
        (_, offset) => posts[(index * postsPerBand + offset) % posts.length],
      ),
    });
  }

  return (
    <div
      className="work-mosaic mt-10 lg:mt-14"
      style={{ "--wall-rows": bands.length * BAND_ROWS } as CSSProperties}
    >
      {bands.map((band, index) => (
        /*
         * A subgrid band, so its tiles sit on the wall's own tracks while the
         * band reveals as one. It rises rather than arriving from a side, at the
         * client's ask: a row travelling in from off the page pulled the eye
         * sideways on every band down a long wall.
         */
        <SlideIn
          key={index}
          from="up"
          /* `col-span-full` and a subgrid at both sizes, so the band's tiles land
             on the wall's own tracks. A plain `grid` here made each band one
             column of the wall and stacked its tiles inside it. */
          className="col-span-full row-span-3 grid min-w-0 grid-cols-subgrid grid-rows-subgrid will-change-transform"
          style={{
            gridTemplateAreas: belowMd
              ? PHONE_BAND_AREAS[index % PHONE_BAND_AREAS.length]
              : BAND_AREAS[index % BAND_AREAS.length],
          }}
        >
          {band.reels.map((reel, slot) => (
            /* The cell carries the shape, not the tile. */
            <ReelTile key={reel.slug} item={reel} fill style={{ gridArea: `r${slot + 1}` }} />
          ))}

          {band.posts.map((post, slot) => (
            <PostTile
              key={`${index}-${slot}`}
              item={post}
              className=""
              style={{ gridArea: (belowMd ? PHONE_POST_AREAS : POST_AREAS)[slot] }}
            />
          ))}
        </SlideIn>
      ))}
    </div>
  );
}

/* One tile, one post, held still. */
function PostTile({
  item,
  className,
  style,
}: {
  item: PostPiece;
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
         * anything above the fold first, and these arrive in the gaps.
         */
        fetchPriority="low"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
