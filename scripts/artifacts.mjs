/**
 * Supplied artwork, from what the client sends to what actually ships.
 *
 * Drop a PNG or JPEG in one of the source folders below and run
 * `npm run artifacts`. Output goes to `public/` as WebP and the matching module
 * under `src/content/` is rewritten with the real pixel dimensions, so nothing
 * on a page guesses an aspect ratio and nothing reflows once an image loads.
 *
 * **Separate from `npm run media` on purpose.** That script owns client work:
 * posts and reels, at Instagram's own ratios, in a grid. These are fixed
 * compositions, they are not client work, and folding them into a pipeline that
 * renames by slug and rewrites a different content file would couple two things
 * that change for entirely different reasons.
 *
 * **Output filenames carry a content hash, and that is not a nicety.** Next's
 * image optimiser caches by URL, and that cache outlived deleting
 * `.next/cache`, restarting the dev server and a hard reload: three times in
 * one afternoon a replaced artifact kept rendering as the picture it replaced,
 * while the raw file served from `public/` was provably correct. A name that
 * changes with the bytes cannot collide with a stale entry, in the optimiser,
 * in a browser or on a CDN.
 *
 * **Opaque artwork sources are keyed automatically.** Some cutout artwork
 * arrives without an alpha channel, one of them with the transparency
 * checkerboard painted in as black pixels. Those sets get their background
 * flood-filled away from the border and are then trimmed to the artwork. See
 * `lib/dropBackground.mjs` for why a flood fill rather than a colour threshold.
 * Photograph sets opt out so they stay intact.
 *
 * **Why the sources leave `public/`.** Anything under `public/` is served,
 * whether or not a page links to it, so 8MB of PNG sitting there is 8MB on the
 * CDN and in every deployment. `assets/` is gitignored and the WebP is
 * committed, which is the same arrangement the reels use.
 */
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";
import { dropBackground } from "./lib/dropBackground.mjs";

const ROOT = process.cwd();

/**
 * Every set of supplied artwork this script owns.
 *
 * One script rather than one per folder, because the interesting parts, the
 * background keying, the content hash and the generated dimensions, are the
 * same problem every time and a second copy of them would drift.
 */
const SETS = [
  {
    src: join(ROOT, "assets/landing"),
    out: join(ROOT, "public/landing"),
    manifest: join(ROOT, "src/content/heroMedia.ts"),
    type: "HeroMedia",
    constant: "HERO_MEDIA",
    urlBase: "/landing",
    quality: 88,
  },
  {
    src: join(ROOT, "assets/process"),
    out: join(ROOT, "public/process"),
    manifest: join(ROOT, "src/content/cardMedia.ts"),
    type: "CardMedia",
    constant: "CARD_MEDIA",
    urlBase: "/process",
    quality: 88,
    longEdge: 1200,
    keyBackground: false,
  },
  {
    /*
      The about board, as twelve separate objects rather than one picture of a
      desk. They are laid out and animated individually, so each one has to
      arrive with its own alpha and its own baked shadow intact.

      1200 rather than 800: every other artifact on the site is drawn at about
      250 CSS pixels, and the plan sheet in this set is drawn at roughly 640.
      82 rather than 88 because these are flat paper and photographs rather than
      the landing set's hard-edged cutouts, and the extra six points buy bytes
      rather than legibility.

      `keyBackground` is ON, and the reasoning that first turned it off was
      wrong. Four of the twelve are opaque, and the guess was that the plan
      sheet's border IS the sheet, so a flood inward would eat the artwork.
      Rendered on the board it was obvious that it is not: there is a white
      margin around a cream sheet, and unkeyed it drew a white rectangle across
      the top of a cream board. The flood stops at the sheet edge because the
      sheet is a different colour from the margin, which is the whole premise of
      flooding inward rather than thresholding on colour.
    */
    src: join(ROOT, "assets/about"),
    out: join(ROOT, "public/about"),
    manifest: join(ROOT, "src/content/aboutMedia.ts"),
    type: "AboutMedia",
    constant: "ABOUT_MEDIA",
    urlBase: "/about",
    quality: 82,
    longEdge: 1200,
  },
  {
    /*
      The impact board: one clipped note and four result cards.

      **These carry their own text, which nothing else in these sets does.** A
      card reads "3.6X" and "MORE REACH" in the artwork itself, so the encode
      has to hold small type legibly rather than just paper texture. Hence 90
      rather than the about board's 82, and 1600 rather than 1200: a card is
      drawn at roughly 380 CSS pixels and needs to survive a 2x screen, and
      compression artefacts around black type on cream are visible in a way that
      artefacts on a photograph of a desk are not.

      Because the type lives in the picture, every one of these needs real alt
      text naming its figure and its label. That is in `impactArtifacts.ts`, and
      it is not decorative repetition of something said elsewhere: for these
      five, the artwork is the only place the words exist.

      `keyBackground` is ON. Four of the five arrived opaque on white, and a
      white rectangle on a tinted band is the fault the about set was fixed for.
    */
    src: join(ROOT, "assets/impact"),
    out: join(ROOT, "public/impact"),
    manifest: join(ROOT, "src/content/impactMedia.ts"),
    type: "ImpactMedia",
    constant: "IMPACT_MEDIA",
    urlBase: "/impact",
    quality: 90,
    longEdge: 1600,
  },
  {
    /*
      The four pieces scattered around the footer: a camera, a coffee cup on a
      torn note, and two clipped notes.

      **Two of the four arrived with the transparency checkerboard painted in as
      real pixels**, which is the case `dropBackground` was written for. It
      samples the border rather than taking a colour, so it finds both squares
      of the chequer and floods inward from the edge. A plain threshold would
      have taken the camera's silver top plate with it.

      1200 rather than 800 because the largest of these is drawn at roughly
      340 CSS pixels and has to survive a 2x screen. Two of them carry
      handwriting in the artwork, so the encode has to hold a pen line rather
      than only paper texture, which is the same reason the impact set is not
      at the default either.
    */
    src: join(ROOT, "assets/footer"),
    out: join(ROOT, "public/footer"),
    manifest: join(ROOT, "src/content/footerMedia.ts"),
    type: "FooterMedia",
    constant: "FOOTER_MEDIA",
    urlBase: "/footer",
    quality: 84,
    longEdge: 900,
    /*
      The chequer inside the camera strap's loop, which is background enclosed
      by artwork and so unreachable from the border. Measured on the source, as
      a fraction of its width and height. See `lib/dropBackground.mjs`.
    */
    seeds: { f1: [[0.4926, 0.8479]] },
  },
  {
    /*
      The contact page's six pieces: two still lifes for the opening, the
      checklist the brief section is built around, and three notes.

      1200 rather than 900, because the opening arrangement draws its largest
      piece at roughly 520 CSS pixels against the footer's 260, and four of the
      six carry handwriting that has to survive a 2x screen.

      Two of them arrived opaque on the same cream the page is printed on, so
      keying is on: unkeyed they draw a cream rectangle with a hard edge, which
      is the fault the about board was fixed for.
    */
    src: join(ROOT, "assets/contact"),
    out: join(ROOT, "public/contact"),
    manifest: join(ROOT, "src/content/contactMedia.ts"),
    type: "ContactMedia",
    constant: "CONTACT_MEDIA",
    urlBase: "/contact",
    quality: 86,
    longEdge: 1200,
    /*
      **`c6` must not be keyed, and it is the case that shows why keying cannot
      be decided per folder.** Its note is cream paper photographed on a cream
      ground, so the flood that walks in from the border finds no edge to stop
      at: it runs straight through the note and clears 90% of the picture,
      leaving a ghost of the handwriting on nothing. Every other piece in this
      set has a green sheet or an envelope under it for the flood to stop
      against. Left as a rectangle it sits on the page's own cream and the join
      does not show.
    */
    opaque: ["c6"],
  },
];

const SOURCE = /\.(png|jpe?g)$/i;

/**
 * The long edge, and it is arithmetic rather than a round number.
 *
 * The widest thing either set is ever drawn at is around 250 CSS pixels. 800
 * covers that at three times density with room to spare, and anything larger is
 * detail no screen on this site will ever draw.
 */
const LONG_EDGE = 800;

/**
 * The default, for flat artwork.
 *
 * Paper cutouts sit still at the largest size any image on the site is shown,
 * and they are mostly flat colour, where a compression artefact in a soft wall
 * is visible. Encoded at 80, 88 and 95 and compared: 88 is where the gradients
 * stop banding and 95 buys nothing but bytes.
 *
 * A set can override it, and the card photographs do. Photographs carry noise
 * that hides artefacts, and at 88 three of the four came out LARGER than their
 * already-compressed JPEG sources, which is a pipeline making things worse.
 */
const QUALITY = 88;

async function main() {
  let ran = false;
  for (const set of SETS) {
    if (!existsSync(set.src)) continue;
    ran = (await convert(set)) || ran;
  }
  if (!ran) {
    console.error("Nothing to convert. Put source images in assets/landing or assets/process.");
    process.exit(1);
  }
}

async function convert({
  src,
  out,
  manifest,
  type,
  constant,
  urlBase,
  quality = QUALITY,
  longEdge = LONG_EDGE,
  keyBackground = true,
  seeds = {},
  opaque = [],
}) {
  const sources = readdirSync(src).filter((file) => SOURCE.test(file)).sort();
  if (sources.length === 0) return false;

  mkdirSync(out, { recursive: true });

  const entries = [];
  let before = 0;
  let after = 0;

  for (const file of sources) {
    const source = join(src, file);
    const slug = basename(file, extname(file));
    const image =
      keyBackground && !opaque.includes(slug)
        ? await transparent(source, seeds[slug] ?? [])
        : source;
    const encoded = await sharp(image)
      .resize({ width: longEdge, height: longEdge, fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();
    const hash = createHash("sha256").update(encoded).digest("hex").slice(0, 8);
    const name = `${slug}-${hash}.webp`;
    const target = join(out, name);

    // Every earlier build of this slug goes, so `public/` never accumulates
    // orphans nothing links to.
    for (const old of readdirSync(out)) {
      if (old.startsWith(`${slug}-`) && old.endsWith(".webp") && old !== name) {
        rmSync(join(out, old));
      }
    }

    writeFileSync(target, encoded);

    const meta = await sharp(target).metadata();
    entries.push({ slug, name, width: meta.width, height: meta.height });
    before += statSync(source).size;
    after += statSync(target).size;
    const kb = (path) => Math.round(statSync(path).size / 1024);
    console.log(
      `  ${slug.padEnd(6)} ${String(kb(source)).padStart(5)}KB -> ` +
        `${String(kb(target)).padStart(4)}KB  ${meta.width}x${meta.height}  ${hash}`,
    );
  }

  writeFileSync(manifest, buildManifest(entries, { type, constant, urlBase }), "utf8");
  console.log(
    `  ${Math.round(before / 1048576)}MB of source into ${Math.round(after / 1024)}KB shipped, ` +
      `${entries.length} entries.`,
  );
  return true;
}

/**
 * A PNG buffer with the background gone, or the source untouched if it already
 * has an alpha channel.
 *
 * The tolerance is found rather than configured, because opaque artifacts need
 * very different ones: a flat cream field is uniform and keys at 12, while a
 * chequered one is two colours plus the compression noise between them and
 * needs 26. A number that suits either ruins the other, and asking the next
 * person to guess one per file is how this stops being run at all.
 *
 * So it escalates. Clearing less than a tenth of the frame means the fill was
 * stopped almost immediately by noise at the border rather than by the artwork,
 * so it tries again with more room. It stops at 30: past that the fill starts
 * eating pale paper, and a hole in the middle of an artifact is worse than a
 * background left on.
 *
 * A photograph has no flat background to remove, and its border is busy enough
 * that the fill clears almost nothing and gives up on its own.
 */
async function transparent(source, seeds = []) {
  const probe = await sharp(source).metadata();
  if (probe.hasAlpha) return source;

  for (const tolerance of [12, 20, 26, 30]) {
    const { data, info } = await sharp(source)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const cleared = dropBackground(
      { data, width: info.width, height: info.height },
      tolerance,
      seeds,
    );

    if (cleared / (info.width * info.height) < 0.1) {
      if (tolerance < 30) continue;
      return source;
    }

    return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 0 })
      .png()
      .toBuffer();
  }
  return source;
}

/**
 * The manifest is generated so the dimensions cannot be wrong.
 *
 * A width and height typed by hand is a guess that survives until somebody
 * replaces an image with one of a different shape, and then the page reserves
 * the wrong box and the screen shifts as it loads.
 */
function buildManifest(entries, { type, constant, urlBase }) {
  const rows = entries
    .map(
      (entry) =>
        `  { slug: "${entry.slug}", src: "${urlBase}/${entry.name}", ` +
        `width: ${entry.width}, height: ${entry.height} },`,
    )
    .join("\n");

  return [
    "// Generated by `npm run artifacts`. Do not edit by hand.",
    "//",
    "// Dimensions are read off the encoded file rather than typed, so the box the",
    "// page reserves always matches the image that lands in it. Filenames carry a",
    "// content hash, because Next's image optimiser caches by URL and a replaced",
    "// picture under an old name keeps serving the old picture.",
    "",
    `export type ${type} = {`,
    "  readonly slug: string;",
    "  readonly src: string;",
    "  readonly width: number;",
    "  readonly height: number;",
    "};",
    "",
    `export const ${constant}: readonly ${type}[] = [`,
    rows,
    "];",
    "",
  ].join("\n");
}

await main();
