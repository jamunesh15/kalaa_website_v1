import localFont from "next/font/local";

/**
 * The site's two faces, self-hosted.
 *
 * Not `next/font/google`. That loader is fine, but its catalogue is where the
 * generic faces live, and v1 shipped Inter, which is the single most common
 * signal that a page came out of a template. Both of these are from Fontshare,
 * by Indian Type Foundry, free for commercial use. See `README.md` beside this
 * file for the licence and for how to re-download them.
 *
 * Self-hosting through `next/font/local` means no request to a third party, no
 * layout shift, and the files are in the repository rather than at the end of a
 * URL somebody else controls.
 */

/**
 * The display face. Rounded, warm, and the reason the page reads as friendly
 * before anyone has read a word of it.
 *
 * Chosen from three candidates set on the same sentence. Clash Display was
 * louder and safer, Panchang was odder; both are deleted rather than kept
 * around, because an unused font in a repository is a decision waiting to be
 * relitigated.
 *
 * 700 is the top of the family. Headings that need more weight than this have
 * to get it from size, not from a heavier cut that does not exist.
 */
export const chillax = localFont({
  src: [
    { path: "./chillax-500.woff2", weight: "500", style: "normal" },
    { path: "./chillax-600.woff2", weight: "600", style: "normal" },
    { path: "./chillax-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-chillax",
  display: "swap",
});

/**
 * The text face.
 *
 * Switzer is a neutral grotesque with slightly warm terminals, which is what a
 * text face has to be here. The display face carries the personality; a body
 * face with opinions of its own fights it, and the page ends up shouting twice.
 */
export const switzer = localFont({
  src: [
    { path: "./switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./switzer-600.woff2", weight: "600", style: "normal" },
    { path: "./switzer-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});
