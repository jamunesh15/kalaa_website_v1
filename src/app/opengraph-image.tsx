import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_IMAGE } from "@/site";

/* The card people see when a link to this site is shared. */
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

        {/* The accent, spent once here as it is spent once on the page: a field, never an outline and never a button. */}
        <div style={{ display: "flex", height: 14, width: 240, background: "#ffd84d" }} />
      </div>
    ),
    size,
  );
}
