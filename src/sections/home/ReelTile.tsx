"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { PlayerGlyph } from "@/components/ui/Glyph";
import { FOCUS_RING } from "@/components/ui/surface";
import { isScrolling, subscribeScrolling } from "@/motion/useScrolling";
import { ReelControls } from "@/sections/home/ReelControls";
import { closeReel, openReel, useOpenReel, type Reel } from "@/sections/home/reelPlayerStore";

/* A reel card: a poster, then a silent loop when nearly on screen, and on tap the whole reel with its sound, played right here. */
export function ReelTile({
  item,
  fill = false,
  className = "",
  style,
}: {
  item: Reel;
  /** The tile fills its grid area rather than carrying 9:16 itself. */
  fill?: boolean;
  /** For the span a phone gives it, where the tile is its own row. */
  className?: string;
  style?: CSSProperties;
}) {
  const active = useOpenReel()?.slug === item.slug;

  return (
    <figure
      className={`work-tile min-w-0 ${fill ? "" : "aspect-[9/16]"} ${active ? "shadow-lift" : ""} ${className}`}
      style={style}
    >
      {active ? <ReelPlayback item={item} /> : <ReelLoop item={item} />}
    </figure>
  );
}

/* Admits one loop mount every 90ms. */
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

/* The silent five-second loop, and the tap that starts the real thing. */
function ReelLoop({ item }: { item: Reel }) {
  const frame = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLVideoElement>(null);
  const inRange = useRef(false);
  const [mounted, setMounted] = useState(false);

  /* Nothing here touches a video while the page moves: a resume restarts a decoder and that is a dropped frame. */
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    let queued = false;
    let gone = false;

    /* Runs at rest only: play if within a screen, pause if further, create if missing. The loops keep running while a reel plays with sound, at his ask. */
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
        /* A full screen each way, so a loop is already playing before it scrolls into view. */
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

  /* A freshly created loop starts at once if it is still in range. */
  useEffect(() => {
    const video = media.current;
    if (!video || !mounted) return;
    if (inRange.current) void video.play().catch(() => {});
    else video.pause();
  }, [mounted]);

  return (
    <div ref={frame} className="h-full w-full">
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
          /* Asked for up front at low priority, the same as the post wall: a poster
           * that arrives when the tile is already on screen reads as a slow page. */
          fetchPriority="low"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
      {/* The whole card starts the reel with its sound, and the mark says so. */}
      <button
        type="button"
        onClick={() => openReel(item)}
        aria-label="Play this reel with sound"
        className="absolute inset-0 flex cursor-pointer items-end p-2.5 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent sm:p-3"
      >
        <span
          aria-hidden
          className="grid size-8 place-items-center rounded-full bg-surface text-ink shadow-soft"
        >
          <PlayerGlyph name="play" size={14} />
        </span>
      </button>
    </div>
  );
}

const SEEK_STEP = 5;

/* The whole reel with its sound, in the card, with the controls along its bottom edge. */
function ReelPlayback({ item }: { item: Reel }) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(item.duration);

  /* Starts with sound, since the tap on the card is the permission browsers want, and pauses when the card leaves the screen. */
  useEffect(() => {
    const media = video.current;
    const node = box.current;
    if (!media || !node) return;
    /* The card takes the keys, not a button, so no ring appears after a mouse tap. */
    node.focus({ preventScroll: true });
    media.muted = false;
    void media.play().catch(() => {
      /* Sound refused, so play silent rather than not at all. */
      media.muted = true;
      void media.play().catch(() => {});
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) media.pause();
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const media = video.current;
    if (!media) return;
    if (media.paused) void media.play().catch(() => {});
    else media.pause();
  };

  const seekTo = (seconds: number) => {
    const media = video.current;
    if (media) media.currentTime = Math.min(Math.max(seconds, 0), duration);
  };

  const toggleMute = () => {
    const media = video.current;
    if (media) media.muted = !media.muted;
  };

  /* Keys, unless the control under focus already owns the key. */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const onSeekBar = target.tagName === "INPUT";
    const onButton = target.tagName === "BUTTON";
    const media = video.current;
    if (!media) return;

    switch (event.key) {
      case " ":
        if (onButton) return;
        break;
      case "k":
        break;
      case "m":
        toggleMute();
        return;
      case "Escape":
        closeReel();
        return;
      case "ArrowLeft":
        if (onSeekBar) return;
        event.preventDefault();
        seekTo(media.currentTime - SEEK_STEP);
        return;
      case "ArrowRight":
        if (onSeekBar) return;
        event.preventDefault();
        seekTo(media.currentTime + SEEK_STEP);
        return;
      case "Home":
        if (onSeekBar) return;
        event.preventDefault();
        seekTo(0);
        return;
      case "End":
        if (onSeekBar) return;
        event.preventDefault();
        seekTo(duration);
        return;
      default:
        return;
    }
    event.preventDefault();
    toggle();
  };

  /* A landscape piece shows whole, with bands; a portrait one fills the card as its loop did. */
  const fit = item.fullWidth > item.fullHeight ? "object-contain" : "object-cover";

  return (
    <div ref={box} tabIndex={-1} className="relative h-full w-full bg-ink outline-none" onKeyDown={onKeyDown}>
      <video
        ref={video}
        src={item.full}
        poster={item.poster}
        preload="auto"
        playsInline
        loop
        aria-label={item.alt}
        className={`h-full w-full cursor-pointer ${fit}`}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />

      <button
        type="button"
        onClick={closeReel}
        aria-label="Back to the preview"
        className={`absolute top-2 right-2 grid size-8 cursor-pointer place-items-center rounded-full bg-surface text-ink shadow-soft transition-token hover:bg-tint-cloud ${FOCUS_RING}`}
      >
        <PlayerGlyph name="close" size={16} />
      </button>

      <ReelControls
        playing={playing}
        muted={muted}
        time={time}
        duration={duration}
        onToggle={toggle}
        onSeek={seekTo}
        onMute={toggleMute}
      />
    </div>
  );
}
