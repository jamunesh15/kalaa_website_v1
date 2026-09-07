"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkPiece } from "@/content/types";
import { isScrolling, subscribeScrolling, useScrolling } from "@/motion/useScrolling";

/**
 * One mosaic of real work, mixed rather than filed by format.
 *
 * Kalaa makes reels and posts for the same accounts, so two separate lanes
 * described the agency's own filing system instead of its work. Mixed, the
 * section reads the way a feed does.
 *
 * The two formats behave differently on purpose. A reel is already moving, so
 * its tile holds still and lets the footage be the motion. A post is a still
 * image, and it stays one: the tiles hold their position so the artwork can be
 * looked at, and the reels end up being the only motion in the section, which is
 * what makes them read as the moving pieces rather than as more of the same.
 *
 * The shape of the arrangement lives in `work-mosaic` in `utilities.css`, as
 * grid areas. Nothing in this file positions anything.
 */

/**
 * The tiles, and which format each one holds.
 *
 * Named areas rather than spans, so the arrangement is legible in one place
 * instead of scattered through the markup as `col-span-2 row-span-3`.
 */
const TILES = [
  { area: "r1", kind: "reel" },
  { area: "r2", kind: "reel" },
  { area: "r3", kind: "reel" },
  { area: "r4", kind: "reel" },
  { area: "r5", kind: "reel" },
  { area: "r6", kind: "reel" },
  { area: "r7", kind: "reel" },
  { area: "r8", kind: "reel" },
  { area: "r9", kind: "reel" },
  { area: "p1", kind: "post" },
  { area: "p2", kind: "post" },
  { area: "p3", kind: "post" },
  { area: "p4", kind: "post" },
  { area: "p5", kind: "post" },
  { area: "p6", kind: "post" },
  { area: "p7", kind: "post" },
  { area: "p8", kind: "post" },
  { area: "p9", kind: "post" },
  { area: "p10", kind: "post" },
  { area: "p11", kind: "post" },
  { area: "p12", kind: "post" },
  { area: "p13", kind: "post" },
  { area: "p14", kind: "post" },
  { area: "p15", kind: "post" },
  { area: "p16", kind: "post" },
  { area: "p17", kind: "post" },
  { area: "p18", kind: "post" },
  { area: "p19", kind: "post" },
  { area: "p20", kind: "post" },
  { area: "p21", kind: "post" },
  { area: "p22", kind: "post" },
  { area: "p23", kind: "post" },
  { area: "p24", kind: "post" },
  { area: "p25", kind: "post" },
  { area: "p26", kind: "post" },
  { area: "p27", kind: "post" },
  { area: "p28", kind: "post" },
  { area: "p29", kind: "post" },
  { area: "p30", kind: "post" },
] as const;

export function WorkWall({
  reels,
  posts,
}: {
  reels: readonly WorkPiece[];
  posts: readonly WorkPiece[];
}) {
  const reelTiles = TILES.filter((tile) => tile.kind === "reel");
  const postTiles = TILES.filter((tile) => tile.kind === "post");

  return (
    <div className="work-mosaic mt-10 lg:mt-14">
      {reelTiles.map((tile, index) => {
        const reel = reels[index % reels.length];
        return reel?.kind === "reel" ? (
          <Reel key={tile.area} area={tile.area} item={reel} />
        ) : null;
      })}

      {postTiles.map((tile, index) => {
        const post = posts[index % posts.length];
        return post ? (
          <PostSlot key={tile.area} area={tile.area} item={post} />
        ) : null;
      })}
    </div>
  );
}

/**
 * Admits one reel mount every 90ms.
 *
 * Five reels coming into range on the same settle used to mount in one React
 * commit, which is five media players built inside one frame: measured at 58,
 * 83 and 58ms across three frames on the production build, and visible as the
 * reels already playing skipping while their neighbours were built. One at a
 * time, 90ms apart, the same work is spread over half a second and no single
 * frame carries more than one player. The reels also start one after another,
 * which reads as the wall waking up rather than as a stall.
 *
 * Module level, because the queue has to be shared by every reel on the page;
 * one queue per component would be nine queues admitting at once.
 */
const mountQueue: Array<() => void> = [];
let pumping = false;

function enqueueMount(job: () => void) {
  mountQueue.push(job);
  if (!pumping) pump();
}

function pump() {
  const job = mountQueue.shift();
  if (!job) {
    pumping = false;
    return;
  }
  pumping = true;
  job();
  setTimeout(pump, 90);
}

/**
 * A reel is a poster image until it is nearly on screen, and only then a video.
 *
 * The obvious build is a `<video preload="none" poster>` that plays on
 * intersection. It costs nothing in Chromium and it breaks the page in WebKit: a
 * video element enters the resource selection algorithm whatever its `preload`
 * says, and WebKit holds the document's load event open until it settles.
 * Measured on the built page, six of them left `document.readyState` stuck at
 * `interactive` forever, so `load` never fired and every WebKit test on this
 * route timed out at sixty seconds while Chromium finished the page in 102ms.
 *
 * So there is no video element on the page until one is wanted. The poster is a
 * real lazy image, which is what the mosaic is made of at rest, and the video
 * replaces it on intersection a screen early. A visitor who never scrolls this
 * far pays for nothing.
 */
function Reel({
  area,
  item,
}: {
  area: string;
  item: Extract<WorkPiece, { kind: "reel" }>;
}) {
  const frame = useRef<HTMLElement>(null);
  const media = useRef<HTMLVideoElement>(null);
  const inRange = useRef(false);
  const [mounted, setMounted] = useState(false);
  const scrolling = useScrolling();

  /*
    **The video element is created only while the page is still, one reel at
    a time, and never removed.**

    Pausing the reels was the first fix for this band and it was not enough:
    the client still felt it lag. Measured on the production build with real
    wheel events, with every image and video request blocked so the tiles were
    empty boxes, this band still dropped five to seven frames per pass that the
    services band never dropped. The one thing every variant kept was the
    poster-to-video swap firing from the intersection observer in the middle
    of a scroll: creating a media element is a media player, a style and
    layout pass and a burst of garbage, and the trace showed exactly that,
    43ms of main-thread work landing inside single 16.7ms windows with a
    major GC in the worst of them.

    So the observer only records whether the tile is in range, and `settle`
    acts on that when the page is not moving: once from the observer, and
    once more each time `useScrolling` reports the page has stopped, 140ms
    after the last scroll event. A reader who scrolls straight through the
    wall sees posters and pays nothing.

    **Then the client stopped mid-wall, scrolled on, and saw the reels stall.**
    Measured with a rest halfway through the pass: the rest itself cost three
    frames of 58, 83 and 58ms, which was five media players being created in
    one React commit, and the far end of the pass cost another burst when
    seven were torn down together. Both landed while the page was still, so
    they were never scroll judder; they were the reels that had just started
    playing skipping frames while their neighbours were built or destroyed.
    Hence the other two rules. Mounts go through `enqueueMount`, which admits
    one every 90ms, so the reels come to life one after another rather than
    all at once. And nothing is ever unmounted: a reel that leaves the range
    is paused and kept, so scrolling back to it costs nothing and leaving
    it costs nothing. Nine paused elements is the ceiling, and a paused
    element out of view holds no decoder.

    Event callbacks and refs rather than `active` state mirrored through an
    effect: the project's lint rule refuses a `setState` in an effect body,
    and it is right to, since the mirror would run a render behind the event.
  */
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    let queued = false;
    let gone = false;

    const settle = () => {
      if (isScrolling()) return;
      if (!inRange.current) {
        media.current?.pause();
        return;
      }
      if (media.current) {
        void media.current.play().catch(() => {});
        return;
      }
      if (queued) return;
      queued = true;
      enqueueMount(() => {
        queued = false;
        if (!gone && inRange.current && !isScrolling()) setMounted(true);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inRange.current = entry.isIntersecting;
        settle();
      },
      {
        /*
          **A quarter of a screen early, not a whole one.** At `100%` every
          reel within a full viewport above or below counts as in range, which
          on a desktop is most of the wall at once. A quarter keeps the number
          in play close to what is actually on screen.
        */
        rootMargin: "25% 0px",
      },
    );
    observer.observe(node);
    const unsubscribe = subscribeScrolling(settle);
    return () => {
      gone = true;
      observer.disconnect();
      unsubscribe();
    };
  }, []);

  /*
    **The reels stop while the page is moving.** Measured through this band,
    six autoplaying videos take the frame budget from 8.3ms to 16.7ms and every
    other section on the site stays at 8.3; paused, this band measures the same
    as the rest of the page. Re-measured on the production build after the
    mount fix, with seven reels playing through a pass: fifteen to twenty-four
    long frames against three to nine paused. So they still stop, and start
    again the moment the page settles, which is also when anybody could
    actually watch one. Out of range they stay paused, see `settle`.

    `play()` returns a promise that rejects if a pause interrupts it, which
    happens on any flick that starts again before this settles. It is not a
    failure and there is nothing to recover, so it is swallowed rather than
    logged: an unhandled rejection here would fill the console on every scroll
    and `smoke.spec.ts` fails a route whose console is not clean.
  */
  useEffect(() => {
    const video = media.current;
    if (!video) return;
    if (scrolling || !inRange.current) video.pause();
    else void video.play().catch(() => {});
  }, [scrolling, mounted]);

  return (
    <figure
      ref={frame}
      className="work-tile"
      data-area={area}
      style={{ gridArea: area }}
    >
      {mounted ? (
        <video
          ref={media}
          className="h-full w-full object-cover"
          poster={item.poster}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-label={item.alt}
        >
          <source src={item.webm} type="video/webm" />
          <source src={item.mp4} type="video/mp4" />
        </video>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element -- already sized and encoded by `npm run media`. */
        <img
          src={item.poster}
          alt={item.alt}
          width={720}
          height={1280}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
    </figure>
  );
}

/**
 * One tile, one post, held still.
 *
 * It has been three things. A cross-fade first, which read as a flash rather
 * than a change, because an opacity swap has no direction and at the moment it
 * happens nothing on screen says what you just missed. Then a strip travelling
 * continuously, which was legible but put eighteen moving things around six
 * videos, and the reels are the part worth watching.
 *
 * Still is what the work needs. A mosaic that holds its position lets the
 * artwork be looked at, and it makes the six reels the only motion in the
 * section, which is what makes them read as the moving pieces rather than as
 * more of the same.
 */
function PostSlot({ area, item }: { area: string; item: WorkPiece }) {
  if (item.kind !== "post") return null;

  return (
    <figure className="work-tile" data-area={area} style={{ gridArea: area }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- already sized and encoded by `npm run media`. */}
      <img
        src={item.src}
        srcSet={`${item.small} 620w, ${item.src} 1080w`}
        sizes="(max-width: 48rem) 50vw, 20vw"
        width={item.width}
        height={item.height}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
