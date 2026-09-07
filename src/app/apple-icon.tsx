import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The icon iOS uses for a home screen shortcut.
 *
 * Without it, adding the site to a home screen produces a screenshot of the
 * page instead of an icon. Served from `/apple-icon`, and a test pins that
 * path: an icon URL is an address that has already been cached by the time
 * anyone notices it moved.
 *
 * **The real mark, not a drawing of it.** This route used to build a K out of
 * line segments from a `src/brand.ts` module, in crimson on cream, because the
 * project had no logo file and Satori cannot read the woff2 that `next/font`
 * downloads. Both halves of that are now wrong: there is a real logo, and those
 * were the previous design's colours. Satori reads PNG, so `scripts/brand.mjs`
 * cuts the badge out of the client's file and leaves one here for it.
 *
 * Read at module scope. Every page on this site is prerendered, so this runs at
 * build time with the repository on disk.
 */
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
          /*
            Flattened onto the badge's own black rather than left transparent.
            iOS composites a touch icon on a ground of its own and then applies
            its own rounded mask, so a transparent one lands as a black square
            with the badge floating inside it, rounded twice. Filling the canvas
            with the badge's black lets the system mask do the rounding, which
            is what every other icon on the home screen does.

            The logo's own black, sampled from the file, and **not** `--action`.
            Those are two different blacks: the badge is pure #000000 and the
            site's ink is #14131a, and the four-value difference is invisible in
            isolation and perfectly visible as a seam where they meet, which is
            what the first attempt at this shipped. Nothing here should track the
            palette. It has to track the artwork.

            A literal because Satori renders without a browser and cannot read a
            CSS custom property. Recorded in `ALLOWED` in
            `scripts/check-structure.mjs`.
          */
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
