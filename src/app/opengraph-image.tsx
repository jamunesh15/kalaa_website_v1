import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_IMAGE } from "@/site";

/**
 * The card people see when a link to this site is shared.
 *
 * 1200x630 is not a preference. A different ratio gets cropped differently by
 * each platform, which is how a share card ends up with half a word in it.
 *
 * **The real mark, and the site's own words.** This card used to draw a K from
 * line segments in crimson on cream and carry a headline nobody had approved.
 * All three were leftovers from the previous design. The mark is now the
 * client's own file, cut and converted by `scripts/brand.mjs` because Satori
 * reads PNG and neither WebP nor AVIF, and the copy is the hero's copy, which
 * came from the live kalaa.io and ships verbatim everywhere it appears.
 *
 * The type renders in Satori's fallback sans rather than in Satoshi, and that
 * is a constraint rather than a choice: `next/font` downloads woff2, and Satori
 * reads TTF, OTF and WOFF. Which is the argument for the mark being artwork
 * rather than a letterform. Artwork is the same everywhere; a letter is only as
 * good as whether the renderer happens to have the font.
 *
 * The colours are literals because Satori cannot resolve CSS custom properties.
 * Recorded in `ALLOWED` in `scripts/check-structure.mjs`; keep them in step with
 * `src/styles/tokens.css` by hand.
 */
const LOGO = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/kalaa-logo.png"),
).toString("base64")}`;

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
          background: "#f4f7f5",
          padding: "72px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="" width={278} height={100} />

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#14131a",
              fontWeight: 800,
              maxWidth: 900,
            }}
          >
            Where Creativity Meets Strategy
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#33313d", maxWidth: 880 }}>
            We help brands grow through purposeful design, storytelling, and data-driven marketing.
          </div>
        </div>

        {/*
          The accent, spent once here as it is spent once on the page: a field,
          never an outline and never a button. A hairline in butter would be
          invisible against the sheet at 1.38:1.
        */}
        <div style={{ display: "flex", height: 14, width: 240, background: "#ffd84d" }} />
      </div>
    ),
    size,
  );
}
