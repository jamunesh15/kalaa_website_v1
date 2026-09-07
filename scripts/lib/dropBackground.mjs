/**
 * Removes a flat background from an image that has no alpha of its own.
 *
 * Two supplied artifacts arrived opaque. One had the transparency checkerboard
 * painted into it as actual black pixels; the other sat on a flat cream field.
 * Both need the same thing and neither can have it by a plain colour threshold,
 * because each contains its own background colour inside the artwork: the first
 * has a black binder clip and black ink, the second is cream paper on a cream
 * ground.
 *
 * So this floods inward from the border rather than testing pixels
 * independently. A pixel is cleared only when it both looks like the background
 * AND is joined to the edge of the image by a path of pixels that also do. The
 * clip in the middle stays black, because nothing connects it to the outside.
 *
 * The background colours are read off the border rather than passed in, which
 * is what makes the chequered one work: sampling finds both squares, and a
 * pixel matching either counts as background.
 *
 * **What flooding cannot reach, and why `seeds` exists.** A background region
 * enclosed by artwork is not joined to the edge, so it survives. The camera in
 * the footer set is the case: the chequer inside the loop of its strap is
 * ringed by black webbing on every side, and it came through as a pale patch
 * hanging in the middle of the loop. There is no general rule that clears it
 * safely. Clearing every palette-matching region wherever it sits takes the
 * camera's silver top plate with it, which is 25,000 pixels of artwork against
 * the hole's 15,000, so size cannot separate them either. A seed is a person
 * pointing at the hole once, in the file that documents the set.
 */

/**
 * Clears the connected background to full transparency, in place.
 *
 * @param {{data: Buffer, width: number, height: number}} raw RGBA pixels.
 * @param {number} tolerance Per-channel distance that still counts as a match.
 * @param {readonly [number, number][]} seeds Extra starting points, as fractions
 *   of width and height, for background the border cannot reach. A seed that
 *   does not land on a background-coloured pixel does nothing, so a slightly
 *   wrong one is inert rather than destructive.
 * @returns {number} How many pixels were cleared.
 */
export function dropBackground({ data, width, height }, tolerance = 22, seeds = []) {
  const palette = samplePalette(data, width, height, tolerance);
  const seen = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (seen[i]) return;
    seen[i] = 1;
    if (!matches(data, i, palette, tolerance)) return;
    queue.push(i);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  for (const [fx, fy] of seeds) {
    push(Math.round(fx * (width - 1)), Math.round(fy * (height - 1)));
  }

  let cleared = 0;
  while (queue.length > 0) {
    const i = queue.pop();
    data[i * 4 + 3] = 0;
    cleared += 1;
    const x = i % width;
    const y = (i - x) / width;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }
  return cleared;
}

/** Every distinct colour along the outer border, deduped within tolerance. */
function samplePalette(data, width, height, tolerance) {
  const palette = [];
  const consider = (x, y) => {
    const i = (y * width + x) * 4;
    const rgb = [data[i], data[i + 1], data[i + 2]];
    if (palette.some((p) => near(p, rgb, tolerance))) return;
    palette.push(rgb);
  };
  for (let x = 0; x < width; x += 1) {
    consider(x, 0);
    consider(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    consider(0, y);
    consider(width - 1, y);
  }
  return palette;
}

function matches(data, i, palette, tolerance) {
  const o = i * 4;
  const rgb = [data[o], data[o + 1], data[o + 2]];
  return palette.some((p) => near(p, rgb, tolerance));
}

function near(a, b, tolerance) {
  return (
    Math.abs(a[0] - b[0]) <= tolerance &&
    Math.abs(a[1] - b[1]) <= tolerance &&
    Math.abs(a[2] - b[2]) <= tolerance
  );
}
