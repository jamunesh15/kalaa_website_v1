import { SURFACE_LINED } from "@/components/ui/surface";

/* A frame waiting for a real picture. */
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
