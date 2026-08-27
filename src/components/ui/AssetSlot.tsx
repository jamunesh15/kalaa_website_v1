import { SURFACE_LINED } from "@/components/ui/surface";

/**
 * A frame waiting for a real picture.
 *
 * The reference this site is built from gets most of its personality from 3D
 * characters and illustration, and none of those assets exist yet. The choice
 * was between building the layout around images that are not here, or filling
 * the gaps with stock, and stock on an agency's own site is worse than an
 * honest gap.
 *
 * So this holds the exact space the real asset will take, at the real aspect
 * ratio, and says out loud what belongs in it. The layout is therefore real to
 * judge: nothing will reflow when the pictures arrive.
 *
 * Transparent and dashed, so it never reads as a finished panel and so it does
 * not paint a white box over a coloured band.
 *
 * **Delete this component when the last slot is filled.** A placeholder that
 * outlives its purpose is how one ships to production.
 */
export type AssetTone = "onSheet" | "onAccent";

const TONES: Record<AssetTone, string> = {
  onSheet: "border-line text-ink-muted",
  onAccent: "border-on-accent/40 text-on-accent/70",
};

export function AssetSlot({
  label,
  ratio = "1 / 1",
  tone = "onSheet",
  className = "",
}: {
  label: string;
  ratio?: string;
  tone?: AssetTone;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      style={{ aspectRatio: ratio }}
      className={`${SURFACE_LINED} ${TONES[tone]} grid w-full place-items-center border-dashed p-4 text-center ${className}`}
    >
      <span className="font-mono text-small">{label}</span>
    </div>
  );
}
