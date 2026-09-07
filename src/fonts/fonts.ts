import { Kalam } from "next/font/google";
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
 * The display face.
 *
 * Satoshi, used at 900. A clean geometric grotesque with no novelty in it: the
 * headline gets its presence from weight and size rather than from quirks in
 * the letterforms.
 *
 * Third face in this slot, and the two it replaced are worth recording so
 * neither comes back by accident. **Chillax** was rounded to the point of
 * reading as a children's brand at display size. **Clash Display** fixed that
 * and brought its own problem: enough character in the a, the g and the y that
 * it drew attention to itself rather than to the words.
 *
 * Six faces were set on the same headline, at the same size, on the real field
 * and looked at side by side before this one. Satoshi was the runner up on that
 * comparison and is now the choice.
 */
export const displayFace = localFont({
  src: [
    { path: "./satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "./satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display-face",
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

/**
 * The hand, for the two lines in the impact section that are handwritten.
 *
 * **This is the third face and it took an explicit instruction to add.** Two
 * was the rule and the reason is still right: a third face is a third thing to
 * download and one more chance for the page to look assembled from parts. It is
 * here because the impact section's reference draws two lines as handwriting,
 * the artwork in that section is handwritten, and the alternative on screen was
 * an accent phrase set in the display face pretending to be an accent.
 *
 * Kalam, by Indian Type Foundry, which is who drew Satoshi and Switzer as well,
 * so the three come from one hand even though this one is a different kind of
 * face. Identified from the reference rather than guessed at.
 *
 * **`next/font/google` here, `next/font/local` above, and the difference is
 * smaller than it looks.** The note beside the display face rules the Google
 * loader out, and that objection is about its catalogue rather than about the
 * loader: it is where Inter and the other template faces live. The loader
 * itself downloads the file at build time and serves it from this origin, so
 * there is still no request to a third party when somebody opens the page, and
 * still no layout shift. Fontshare does not carry Kalam or it would be local
 * like the others.
 *
 * Two weights, not four. It sets two short lines and nothing else, and every
 * weight is another file on the wire.
 */
export const hand = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand-face",
  display: "swap",
});
