#!/usr/bin/env node
/**
 * Every copy of Kalaa's mark, generated from one file.
 *
 *   node scripts/brand.mjs
 *
 * The rule this exists to keep is that the masthead, the footer, the browser
 * tab, the touch icon and the share card all show the **same artwork**. A
 * visitor sees the tab and the header in one glance, and a mark that differs
 * between them reads as a mistake even when each looks right alone. The way
 * that rule gets broken is never a decision: it is five places each being told
 * separately what the logo is, and one of them being updated.
 *
 * So there is one input, `public/brand/kalaa_logo.avif`, the client's own file.
 * Replacing the logo means replacing that file and running this. Nothing else.
 *
 * **Lossless, everywhere.** The source is AVIF, which is already lossy, so any
 * lossy re-encode is a second generation of loss on artwork that is almost
 * entirely hard black edges against transparency. That is exactly where WebP
 * ringing shows, and exactly at the size a masthead draws. Lossless from the
 * decoded pixels costs 8.2KB against 4.4KB and adds nothing to the picture,
 * which is the point.
 *
 * **No upscaling.** The source is 512x184 and the badge inside it is 185x184.
 * Nothing here is enlarged past that: resampling up buys resolution the file
 * never had and charges bytes for it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public/brand/kalaa_logo.avif");

/**
 * The badge, measured rather than assumed.
 *
 * The lockup is the badge, a gap, then the wordmark, and the icons need the
 * badge alone. Scanning the alpha channel for the first fully empty column
 * finds the gap wherever it is, so a redrawn logo with different spacing still
 * cuts correctly instead of shipping a favicon with a sliver of a K in it.
 */
async function badgeBox() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const inked = [];
  for (let x = 0; x < width; x += 1) {
    let hit = false;
    for (let y = 0; y < height; y += 1) {
      if (data[(y * width + x) * channels + 3] > 8) {
        hit = true;
        break;
      }
    }
    inked.push(hit);
  }

  let start = inked.indexOf(true);
  if (start < 0) throw new Error("the source logo has no opaque pixels");
  let end = start;
  while (end + 1 < width && inked[end + 1]) end += 1;
  return { left: start, top: 0, width: end - start + 1, height };
}

const badge = async () => sharp(SOURCE).ensureAlpha().extract(await badgeBox());

/** A square canvas around the badge, with its transparency intact. */
const square = async (size) =>
  (await badge()).resize({ width: size, height: size, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

/**
 * A .ico is a container, and the modern form of it holds PNGs verbatim, so this
 * is a header plus a directory plus the files. Three sizes because a browser
 * picks per context: 16 for the tab, 32 for the bookmark bar, 48 for the
 * Windows shortcut. One 32 stretched to all three is how a tab icon ends up
 * looking soft.
 */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;
  const directory = entries.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...directory, ...entries.map((entry) => entry.png)]);
}

const box = await badgeBox();
const written = [];
const record = (path) => written.push([path, (readFileSync(join(ROOT, path)).length / 1024).toFixed(1)]);

/* The lockup the masthead and the footer render. */
await sharp(SOURCE).webp({ lossless: true, effort: 6 }).toFile(join(ROOT, "public/brand/kalaa-logo.webp"));
record("public/brand/kalaa-logo.webp");

/*
 * PNG copies of the same two pieces, for Satori.
 *
 * The share card and the touch icon are rendered by Satori, which reads PNG and
 * JPEG and neither WebP nor AVIF. Without these it cannot draw the real mark at
 * all, and the previous build shows where that leads: it drew a K from line
 * segments instead, in a colour this palette no longer contains, and shipped a
 * different logo to the share card than to the masthead.
 */
await sharp(SOURCE).png({ compressionLevel: 9 }).toFile(join(ROOT, "public/brand/kalaa-logo.png"));
record("public/brand/kalaa-logo.png");

await (await square(box.height)).png({ compressionLevel: 9 }).toFile(join(ROOT, "public/brand/kalaa-mark.png"));
record("public/brand/kalaa-mark.png");

/*
 * The tab icon. Transparency kept, so the tab bar shows through around the
 * badge's rounded corners rather than boxing it in white.
 */
const sizes = [16, 32, 48];
const entries = [];
for (const size of sizes) {
  entries.push({ size, png: await (await square(size)).png({ compressionLevel: 9 }).toBuffer() });
}
writeFileSync(join(ROOT, "src/app/favicon.ico"), ico(entries));
record("src/app/favicon.ico");

console.log(`badge cut at x=${box.left}..${box.left + box.width - 1} (${box.width}x${box.height})`);
for (const [path, kb] of written) console.log(`  ${path.padEnd(34)} ${kb.padStart(6)} KB`);
