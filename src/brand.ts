/**
 * The Kalaa K, as geometry, so every rendering of the mark is the same shape.
 *
 * The mark appears in five places: the masthead, the footer, the favicon, the
 * apple touch icon and the share card. The first two set the letter in Fraunces
 * and get its real outline. The other three cannot: `favicon.ico` is a bitmap
 * built by a script, and the two `ImageResponse` icons are rendered by Satori,
 * which has no access to the font next/font downloads as woff2.
 *
 * So those three draw the K from the strokes below instead, and the strokes are
 * shaped to match Fraunces rather than a default sans: a heavier stem than
 * arms, and slab serifs at every terminal. Without them the tab icon read as a
 * different letterform to the one in the header, which is what a person notices
 * immediately even though every automated check passes.
 *
 * Coordinates are fractions of the icon's size, so one definition serves 16px
 * and 1200px alike. `w` is stroke width in the same units.
 *
 * `scripts/make-favicon.mjs` imports this file. Change the shape here and the
 * favicon, the touch icon and the share card all follow.
 */
export type Stroke = {
  readonly ax: number;
  readonly ay: number;
  readonly bx: number;
  readonly by: number;
  readonly w: number;
};

export const K_STROKES: readonly Stroke[] = [
  // The stem, heaviest stroke in the letter.
  { ax: 0.33, ay: 0.21, bx: 0.33, by: 0.79, w: 0.15 },

  // The two arms, lighter than the stem, meeting it just above the middle.
  { ax: 0.37, ay: 0.51, bx: 0.73, by: 0.21, w: 0.11 },
  { ax: 0.37, ay: 0.51, bx: 0.76, by: 0.79, w: 0.13 },

  // Slab serifs. These are what make it read as the same letter as the
  // Fraunces K in the masthead rather than as a plain geometric one.
  { ax: 0.23, ay: 0.215, bx: 0.43, by: 0.215, w: 0.07 },
  { ax: 0.23, ay: 0.785, bx: 0.43, by: 0.785, w: 0.07 },
  { ax: 0.65, ay: 0.215, bx: 0.82, by: 0.215, w: 0.07 },
  { ax: 0.68, ay: 0.785, bx: 0.85, by: 0.785, w: 0.07 },
];

/** The strokes as SVG line elements, for anything that can render SVG. */
export function kStrokesAt(size: number) {
  return K_STROKES.map((stroke) => ({
    x1: stroke.ax * size,
    y1: stroke.ay * size,
    x2: stroke.bx * size,
    y2: stroke.by * size,
    width: stroke.w * size,
  }));
}
