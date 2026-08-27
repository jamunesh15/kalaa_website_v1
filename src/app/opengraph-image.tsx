import { ImageResponse } from "next/og";
import { kStrokesAt } from "@/brand";
import { OG_IMAGE, SITE } from "@/site";

/**
 * The card people see when a link to this site is shared.
 *
 * 1200x630 is not a preference. A different ratio gets cropped differently by
 * each platform, which is how a share card ends up with half a word in it.
 *
 * The colours here are literals because Satori renders this without a browser
 * and cannot resolve CSS custom properties. That exemption is recorded in
 * `ALLOWED` in `scripts/check-structure.mjs`. Keep them in step with the tokens
 * in `globals.css` by hand.
 */
export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf7f0",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, color: "#131211" }}>
          {/*
            The K is drawn from the shared strokes in `src/brand.ts`, not set as
            a letter. Satori cannot read the woff2 next/font downloads, so a
            letter here would render in a fallback sans and show a different
            mark to the favicon and the masthead.
          */}
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              background: "#e5124f",
            }}
          >
            <svg width={44} height={44} viewBox="0 0 44 44" fill="none">
              {kStrokesAt(44).map((stroke) => (
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
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              color: "#131211",
              maxWidth: 1000,
              fontWeight: 600,
            }}
          >
            Make your brand impossible to scroll past.
          </div>
          <div style={{ fontSize: 32, color: "#55524d", maxWidth: 900 }}>
            Creative social media marketing that turns attention into growth.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
