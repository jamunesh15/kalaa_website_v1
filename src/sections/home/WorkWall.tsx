"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkPiece } from "@/content/types";
import { isScrolling, subscribeScrolling } from "@/motion/useScrolling";

/* One mosaic of real work, mixed rather than filed by format. */

/* The tiles, and which format each one holds. */
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

/* Admits one reel mount every 90ms. */
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

/* A reel is a poster image until it is nearly on screen, and only then a video. */
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

  /* Nothing here touches a video while the page moves: a resume restarts a decoder and that is a dropped frame. */
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    let queued = false;
    let gone = false;

    /* Runs at rest only: play if within a screen, pause if further, create if missing. */
    const apply = () => {
      if (isScrolling()) return;
      const video = media.current;
      if (video) {
        if (inRange.current) void video.play().catch(() => {});
        else video.pause();
        return;
      }
      if (!inRange.current || queued) return;
      queued = true;
      enqueueMount(() => {
        queued = false;
        if (!gone && inRange.current && !isScrolling()) setMounted(true);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inRange.current = entry.isIntersecting;
        apply();
      },
      {
        /* A full screen each way, so a reel is already playing before it scrolls into view. */
        rootMargin: "100% 0px",
      },
    );
    observer.observe(node);
    /* When the page settles, mount whatever came into range while it moved. */
    const unsubscribe = subscribeScrolling(apply);
    return () => {
      gone = true;
      observer.disconnect();
      unsubscribe();
    };
  }, []);

  /* A freshly created reel starts at once if it is still in range. */
  useEffect(() => {
    const video = media.current;
    if (!video || !mounted) return;
    if (inRange.current) void video.play().catch(() => {});
    else video.pause();
  }, [mounted]);

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

/* One tile, one post, held still. */
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
