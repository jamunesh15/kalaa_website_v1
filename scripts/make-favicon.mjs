#!/usr/bin/env node
/**
 * Builds `src/app/favicon.ico` from the shared mark geometry.
 *
 *   node scripts/make-favicon.mjs
 *
 * Committed rather than run on every build, because a favicon changes about
 * once a year and nobody should need a toolchain to check one out. Re-run it
 * whenever `src/brand.ts` changes and commit the result.
 *
 * The strokes come from `src/brand.ts`, which is the same definition the
 * masthead, the footer, the touch icon and the share card draw from. That is
 * the whole point: the letterform in the browser tab and the one in the header
 * were visibly different when they were produced by different means, and no
 * automated check can see that.
 *
 * Three sizes go into the one file so the tab, the bookmark bar and the Windows
 * taskbar each get a bitmap rendered for their size rather than one scaled
 * badly to all three. The payloads are PNG inside ICO, which every browser
 * since IE11 reads and which keeps the alpha channel.
 */
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { K_STROKES } from "../src/brand.ts";

/** Matches `--accent` and `--on-accent` in `src/app/globals.css`. */
const ACCENT = [0xe5, 0x12, 0x4f];
const ON_ACCENT = [0xff, 0xff, 0xff];

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

/**
 * Signed distance to a square-capped stroke.
 *
 * This used to clamp to the segment and take the euclidean distance, which is
 * a capsule: round caps, by construction. That is fine on the stem and the
 * arms and wrong on the four slab serifs, which are barely three times their
 * own width long. A round cap adds half the stroke width at each end, so on a
 * serif that short the caps are most of the stroke and it renders as a
 * lozenge rather than a slab. In the masthead at 36px the serifs are about
 * 2.5px thick and 7px long, which is exactly where this shows.
 *
 * Square caps keep the extent the geometry was drawn for and cut the ends
 * flat. This is the box distance in the stroke's own frame: "along" runs down
 * the axis, "across" runs perpendicular, and the half-extents are the
 * half-length plus the cap, and the half-width.
 *
 * BrandMark.tsx sets strokeLinecap="square" for the same reason. Both have to
 * agree: this file and that component are two renderings of one definition,
 * and the whole point of src/brand.ts is that they cannot disagree about the
 * shape. Change one, change the other, and re-run this script.
 */
function signedDistanceToStroke(px, py, ax, ay, bx, by, halfWidth) {
  const dx = bx - ax;
  const dy = by - ay;
  const length = Math.hypot(dx, dy);
  if (length === 0) return Math.hypot(px - ax, py - ay) - halfWidth;

  const ux = dx / length;
  const uy = dy / length;
  const rx = px - ax;
  const ry = py - ay;

  const along = rx * ux + ry * uy;
  const across = -rx * uy + ry * ux;

  const qx = Math.abs(along - length / 2) - (length / 2 + halfWidth);
  const qy = Math.abs(across) - halfWidth;

  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
}

/**
 * Rasterises the mark by distance field rather than by plotting pixels.
 *
 * Taking the minimum signed distance across every stroke gives clean joins
 * where the arms meet the stem and where the serifs meet their terminals, with
 * no overlap seams, and it leaves a fractional edge to antialias against.
 */
function drawIcon(size) {
  const pixels = Buffer.alloc(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      // Sample at the pixel centre, or every stroke sits half a pixel high.
      const px = x + 0.5;
      const py = y + 0.5;

      let signed = Infinity;
      for (const stroke of K_STROKES) {
        const distance = signedDistanceToStroke(
          px,
          py,
          stroke.ax * size,
          stroke.ay * size,
          stroke.bx * size,
          stroke.by * size,
          (stroke.w * size) / 2,
        );
        signed = Math.min(signed, distance);
      }

      // One pixel of feather, clamped, so 16px stays crisp.
      const coverage = Math.max(0, Math.min(1, 0.5 - signed));

      const offset = (y * size + x) * 4;
      for (let c = 0; c < 3; c += 1) {
        pixels[offset + c] = Math.round(ACCENT[c] + (ON_ACCENT[c] - ACCENT[c]) * coverage);
      }
      pixels[offset + 3] = 0xff;
    }
  }

  return pixels;
}

function encodePng(size, pixels) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // colour type: RGBA
  header[10] = 0; // deflate
  header[11] = 0; // adaptive filtering
  header[12] = 0; // no interlace

  // Each scanline carries a leading filter byte. Zero means "none", which costs
  // a little size and keeps this encoder short enough to read.
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y += 1) {
    raw[y * stride] = 0;
    pixels.copy(raw, y * stride + 1, y * size * 4, (y + 1) * size * 4);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const sizes = [16, 32, 48];
const images = sizes.map((size) => encodePng(size, drawIcon(size)));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + sizes.length * 16;
const entries = sizes.map((size, index) => {
  const entry = Buffer.alloc(16);
  entry[0] = size; // 0 would mean 256
  entry[1] = size;
  entry[2] = 0; // palette size, 0 for truecolour
  entry[3] = 0; // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(images[index].length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += images[index].length;
  return entry;
});

const ico = Buffer.concat([header, ...entries, ...images]);
writeFileSync("src/app/favicon.ico", ico);

console.log(`wrote src/app/favicon.ico  ${ico.length} bytes  sizes: ${sizes.join(", ")}`);
