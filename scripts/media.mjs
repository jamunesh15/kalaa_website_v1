/**
 * Turns whatever the team drops into web-ready work media.
 *
 * Drop posts in `assets/posts/` and reels in `assets/reels/`, then run
 * `npm run media`. The script also sweeps the two public folders people
 * naturally drop things into and moves anything it finds there into `assets/`
 * first, because a 58MB source video sitting under `public/` is a 58MB file on
 * the CDN whether or not any page links to it.
 *
 * Outputs go to `public/work/`, and `src/content/workMedia.ts` is rewritten with
 * what actually exists on disk. Nothing else needs editing.
 *
 * Re-running is cheap: a source whose output is newer than it is skipped, so
 * adding one reel to a folder of ten costs one encode.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = { posts: join(ROOT, "assets/posts"), reels: join(ROOT, "assets/reels") };
const OUT = { posts: join(ROOT, "public/work/posts"), reels: join(ROOT, "public/work/reels") };

/** Where people drop things by hand. Swept into `assets/` before anything runs. */
const DROP = { posts: join(ROOT, "public/servie_page_photo"), reels: join(ROOT, "public/work/reels") };

const IMAGE = /\.(jpe?g|png|webp)$/i;
const VIDEO = /\.(mp4|mov|m4v|webm|mkv)$/i;

/**
 * The post's long edge. 1080 is what Instagram itself serves, so anything
 * larger is detail no source actually has, stored at full price.
 */
const POST_W = 1080;

/** A second, smaller file for phones. A 1080px image on a 375px screen is four times the pixels it can show. */
const POST_SMALL_W = 620;
const POST_QUALITY = 80;

/**
 * Reels: how long a loop runs, and where it starts when the filename does not
 * say.
 *
 * Five seconds rather than six, and that is a weight decision rather than an
 * editorial one. These play in a grid where several are on screen at once, so
 * every one of them is a download the visitor did not ask for. Five seconds of
 * a piece is long enough to see what it is and short enough to loop without
 * looking like it was cut off.
 */
const CLIP_SECONDS = 5;
const START_FRACTION = 0.1;
/**
 * 720 wide because that is what the grid actually needs. A reel card is around
 * 300px across, and a 2x screen wants twice that, so 720 has headroom and 1080
 * would be three times the pixels any of these is ever drawn at.
 */
const REEL_W = 720;
const REEL_H = 1280;
const REEL_FPS = 24;

/**
 * The quality dials, and they were set by encoding and looking rather than by
 * picking a number. VP9 at 34 came out over a megabyte a clip, which is several
 * megabytes of video on one section. 36 halves that and the difference is not
 * visible at the size these are drawn; past 38 the flat brand colours in these
 * pieces start to band, which is exactly where compression begins to show.
 */
const VP9_CRF = "36";
const H264_CRF = "30";

for (const dir of [...Object.values(SRC), ...Object.values(OUT)]) mkdirSync(dir, { recursive: true });

/**
 * A slug per source, and never the same one twice.
 *
 * `11.png` and `11++.jpg` both reduce to "11", and the second silently
 * overwrote the first: 27 sources produced 26 files and nothing said so. The
 * suffix only appears on an actual collision, so ordinary names stay clean.
 */
function uniqueSlugs(files) {
  const seen = new Map();
  return files.map((file) => {
    const base = slugify(file);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return { file, slug: count === 1 ? base : `${base}-${count}` };
  });
}

const slugify = (name) =>
  basename(name, extname(name))
    .toLowerCase()
    .replace(/@[\d.]+(-[\d.]+)?$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** `name@12.mp4` starts at 12s. `name@12-4.mp4` starts at 12s and runs 4s. */
function clipWindow(file, duration) {
  const match = basename(file, extname(file)).match(/@([\d.]+)(?:-([\d.]+))?$/);
  if (match) return { start: Number(match[1]), length: Number(match[2] ?? CLIP_SECONDS) };
  const start = Math.min(duration * START_FRACTION, Math.max(0, duration - CLIP_SECONDS));
  return { start, length: CLIP_SECONDS };
}

const kb = (path) => Math.round(statSync(path).size / 1024);
const fresh = (source, output) => existsSync(output) && statSync(output).mtimeMs >= statSync(source).mtimeMs;

/**
 * Move hand-dropped sources out of `public/` before they are ever served.
 *
 * **It never overwrites a file already in the destination, and that guard is
 * the difference between this and destroying the originals.** For reels the
 * drop folder and the output folder are the same directory: people drop videos
 * into `public/work/reels` and the build writes its encodes back into it. So a
 * second run found `v1.mp4` sitting there, matched it as a video, and moved the
 * 429KB encode on top of the 26MB source it came from. Six sources, gone, and
 * the next run would then encode the encodes.
 *
 * **The test is the name without its extension, not the whole filename.** An
 * exact-name check was tried first and it only closed half the hole: `v1.mp4`
 * upstream stopped `v1.mp4` being swept, but the build also writes `v1.webm`,
 * which collides with nothing, so six encodes walked into `assets/reels` and
 * came back on the next run as six new reels called `v1-2` through `v6-2`. The
 * wall went from nine reels to fifteen, half of them duplicates re-encoded from
 * encodes.
 *
 * One source produces several outputs and they all share its stem, so the stem
 * is what identifies them. A file whose stem is already upstream is by
 * definition not a new drop. The `from === to` check above does not catch any
 * of this, because the two paths are only equal for posts.
 */
function sweep(from, to, pattern) {
  if (!existsSync(from) || from === to) return;
  const upstream = new Set(readdirSync(to).map((f) => basename(f, extname(f))));
  for (const entry of readdirSync(from)) {
    if (!pattern.test(entry)) continue;
    const source = join(from, entry);
    if (!statSync(source).isFile()) continue;
    if (upstream.has(basename(entry, extname(entry)))) continue;
    renameSync(source, join(to, entry));
    console.log(`  moved ${entry} out of public/`);
  }
}

function ffprobeDuration(file) {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
    { encoding: "utf8" },
  );
  return Number(out.trim());
}

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------
async function buildPosts() {
  const files = readdirSync(SRC.posts).filter((f) => IMAGE.test(f)).sort();
  const manifest = [];

  for (const { file, slug } of uniqueSlugs(files)) {
    const source = join(SRC.posts, file);
    const full = join(OUT.posts, `${slug}.webp`);
    const small = join(OUT.posts, `${slug}-sm.webp`);

    // `withoutEnlargement` so a 670px source is never upscaled into a bigger
    // file carrying no more detail than the original had.
    if (!fresh(source, full)) {
      await sharp(source)
        .resize({ width: POST_W, withoutEnlargement: true })
        .webp({ quality: POST_QUALITY, effort: 6 })
        .toFile(full);
    }
    if (!fresh(source, small)) {
      await sharp(source)
        .resize({ width: POST_SMALL_W, withoutEnlargement: true })
        .webp({ quality: POST_QUALITY, effort: 6 })
        .toFile(small);
    }

    const meta = await sharp(full).metadata();
    manifest.push({ slug, source, width: meta.width, height: meta.height });
  }
  return manifest;
}

// ---------------------------------------------------------------------------
// Reels
// ---------------------------------------------------------------------------
function buildReels() {
  const files = readdirSync(SRC.reels).filter((f) => VIDEO.test(f)).sort();
  const manifest = [];

  for (const { file, slug } of uniqueSlugs(files)) {
    const source = join(SRC.reels, file);
    const webm = join(OUT.reels, `${slug}.webm`);
    const mp4 = join(OUT.reels, `${slug}.mp4`);
    const poster = join(OUT.reels, `${slug}.jpg`);
    const { start, length } = clipWindow(file, ffprobeDuration(source));

    /*
     * Cover-crop to 9:16 rather than pad. Every source here is already 1080x1920
     * so nothing is lost, and a source that is not gets filled rather than
     * letterboxed, which is what the same clip does in a phone's own feed.
     *
     * `-an` because these autoplay. A video carrying an audio track will not
     * autoplay in any browser unless it is also muted, so the audio is bytes
     * spent on something nobody can ever hear.
     */
    const filter = `scale=${REEL_W}:${REEL_H}:force_original_aspect_ratio=increase,crop=${REEL_W}:${REEL_H},fps=${REEL_FPS}`;
    const trim = ["-ss", String(start), "-t", String(length)];

    if (!fresh(source, webm)) {
      ffmpeg([...trim, "-i", source, "-an", "-vf", filter,
        "-c:v", "libvpx-vp9", "-crf", VP9_CRF, "-b:v", "0",
        "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm]);
    }
    if (!fresh(source, mp4)) {
      // The H.264 fallback for engines without VP9 in WebM. `+faststart` moves
      // the index to the front of the file: without it a browser has to fetch
      // the whole thing before it can show the first frame.
      ffmpeg([...trim, "-i", source, "-an", "-vf", filter,
        "-c:v", "libx264", "-crf", H264_CRF, "-preset", "slow", "-profile:v", "main",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
    }
    if (!fresh(source, poster)) {
      // Half a second in, not frame zero, which is often black.
      ffmpeg(["-ss", String(start + 0.5), "-i", source, "-frames:v", "1",
        "-vf", `scale=${REEL_W}:${REEL_H}:force_original_aspect_ratio=increase,crop=${REEL_W}:${REEL_H}`,
        "-q:v", "6", poster]);
    }

    manifest.push({ slug, source, start });
  }
  return manifest;
}

// ---------------------------------------------------------------------------
const run = async () => {
  console.log("Sweeping hand-dropped sources out of public/ ...");
  sweep(DROP.posts, SRC.posts, IMAGE);
  sweep(DROP.reels, SRC.reels, VIDEO);

  console.log("Posts ...");
  const posts = await buildPosts();
  console.log("Reels ...");
  const reels = buildReels();

  let before = 0;
  let after = 0;
  const lines = [];

  for (const { slug, source } of posts) {
    before += statSync(source).size;
    after += statSync(join(OUT.posts, `${slug}.webp`)).size + statSync(join(OUT.posts, `${slug}-sm.webp`)).size;
    lines.push(`  post ${slug.padEnd(26)} ${String(kb(source)).padStart(6)}KB -> ${String(kb(join(OUT.posts, `${slug}.webp`))).padStart(5)}KB`);
  }
  for (const { slug, source, start } of reels) {
    before += statSync(source).size;
    after += statSync(join(OUT.reels, `${slug}.webm`)).size + statSync(join(OUT.reels, `${slug}.mp4`)).size + statSync(join(OUT.reels, `${slug}.jpg`)).size;
    lines.push(`  reel ${slug.padEnd(26)} ${String(kb(source)).padStart(6)}KB -> ${String(kb(join(OUT.reels, `${slug}.webm`))).padStart(5)}KB webm  ${String(kb(join(OUT.reels, `${slug}.mp4`))).padStart(5)}KB mp4  from ${start.toFixed(1)}s`);
  }

  console.log(lines.join("\n"));
  console.log(`\n  ${(before / 1048576).toFixed(1)}MB of sources -> ${(after / 1048576).toFixed(1)}MB shipped`);

  const list = (rows) => rows.join("\n");
  const manifest = [
    "/**",
    " * WRITTEN BY `npm run media`. Do not edit by hand.",
    " *",
    " * Every entry is a file that exists in `public/work/`. The captions and the",
    " * client names that go with them live in `src/content/work.ts`, which is hand",
    " * written, so regenerating this never destroys copy.",
    " */",
    "",
    "export type PostMedia = {",
    "  readonly slug: string;",
    "  readonly src: string;",
    "  readonly small: string;",
    "  readonly width: number;",
    "  readonly height: number;",
    "};",
    "",
    "export type ReelMedia = {",
    "  readonly slug: string;",
    "  readonly webm: string;",
    "  readonly mp4: string;",
    "  readonly poster: string;",
    "};",
    "",
    "export const POST_MEDIA: readonly PostMedia[] = [",
    list(posts.map((p) =>
      `  { slug: "${p.slug}", src: "/work/posts/${p.slug}.webp", small: "/work/posts/${p.slug}-sm.webp", width: ${p.width}, height: ${p.height} },`)),
    "];",
    "",
    "export const REEL_MEDIA: readonly ReelMedia[] = [",
    list(reels.map((r) =>
      `  { slug: "${r.slug}", webm: "/work/reels/${r.slug}.webm", mp4: "/work/reels/${r.slug}.mp4", poster: "/work/reels/${r.slug}.jpg" },`)),
    "];",
    "",
  ].join("\n");

  writeFileSync(join(ROOT, "src/content/workMedia.ts"), manifest);
  console.log(`\n  wrote src/content/workMedia.ts (${posts.length} posts, ${reels.length} reels)`);
};

await run();
