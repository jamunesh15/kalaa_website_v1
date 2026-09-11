"use client";

import type { ReactNode } from "react";
import { PlayerGlyph } from "@/components/ui/Glyph";
import { FOCUS_RING } from "@/components/ui/surface";

/* The card's control bar: play or pause, where you are, and the sound. */
export function ReelControls({
  playing,
  muted,
  time,
  duration,
  onToggle,
  onSeek,
  onMute,
}: {
  playing: boolean;
  muted: boolean;
  time: number;
  duration: number;
  onToggle: () => void;
  onSeek: (seconds: number) => void;
  onMute: () => void;
}) {
  const shown = Math.min(time, duration);

  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-ink/70 px-2 py-1.5 text-on-action">
      <ControlButton label={playing ? "Pause" : "Play"} onClick={onToggle}>
        <PlayerGlyph name={playing ? "pause" : "play"} size={16} />
      </ControlButton>

      <input
        type="range"
        /* `text-base`: no form control on this site sits below 1rem. */
        className="reel-seek text-base"
        min={0}
        max={duration || 0}
        step={0.1}
        value={shown}
        onChange={(event) => onSeek(Number(event.currentTarget.value))}
        aria-label="Position"
        aria-valuetext={`${clock(shown)} of ${clock(duration)}`}
      />

      {/* The clock needs room a phone card does not have. */}
      <span className="hidden text-label tabular-nums sm:inline">{clock(shown)}</span>

      <ControlButton label={muted ? "Sound on" : "Sound off"} onClick={onMute}>
        <PlayerGlyph name={muted ? "muted" : "sound"} size={16} />
      </ControlButton>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-full transition-token hover:bg-surface/15 ${FOCUS_RING}`}
    >
      {children}
    </button>
  );
}

/* m:ss */
function clock(seconds: number): string {
  const whole = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}
