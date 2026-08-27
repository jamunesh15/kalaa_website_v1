import { ImageResponse } from "next/og";
import { kStrokesAt } from "@/brand";

/**
 * The icon iOS uses for a home screen shortcut.
 *
 * Without it, adding the site to a home screen produces a screenshot of the
 * page instead of an icon. Served from `/apple-icon`, and a test pins that
 * path: moving it costs the icon everywhere it has already been cached.
 *
 * The K is drawn from the shared strokes in `src/brand.ts` rather than set as
 * text. Satori has no access to Fraunces, which next/font downloads as woff2,
 * so setting a letter here would render it in a fallback sans and show a
 * different letterform to the masthead and the favicon.
 *
 * The colours are literals because Satori cannot resolve CSS custom
 * properties. That exemption is recorded in `ALLOWED` in
 * `scripts/check-structure.mjs`; keep them in step with `globals.css` by hand.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const strokes = kStrokesAt(180);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#e5124f",
        }}
      >
        <svg width={180} height={180} viewBox="0 0 180 180" fill="none">
          {strokes.map((stroke) => (
            <line
              key={`${stroke.x1}-${stroke.y1}-${stroke.x2}-${stroke.y2}`}
              x1={stroke.x1}
              y1={stroke.y1}
              x2={stroke.x2}
              y2={stroke.y2}
              stroke="#ffffff"
              strokeWidth={stroke.width}
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
