import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* The icon iOS uses for a home screen shortcut. */
const MARK = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/kalaa-mark.png"),
).toString("base64")}`;

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          /* Flattened onto the badge's own black rather than left transparent. */
          background: "#000000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK} alt="" width={150} height={150} />
      </div>
    ),
    size,
  );
}
