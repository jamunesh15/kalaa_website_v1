/**
 * Everything on this site that is not real yet, in one file.
 *
 * The client asked for placeholders while the real assets are gathered, and the
 * condition attached to that is this file: when somebody asks "what on this site
 * is still fake", the answer is one import away rather than a search.
 *
 * The rules these obey, from CLAUDE.md:
 *
 * - No placeholder names a business, quotes a person or states a price.
 * - No placeholder ever reaches JSON-LD. Structured data is read as fact.
 * - Images land in `public/placeholder/` at real social ratios, so nothing
 *   reflows on the day real work replaces them.
 *
 * **Delete this file when the last real asset lands.** A placeholder that
 * outlives its purpose is how one ships to production.
 */

/**
 * One piece of content flying into the hero.
 *
 * Position is a percentage inside the artifact box, and the box has a fixed
 * aspect ratio, so the whole composition scales from a phone to a desktop
 * without a second set of numbers. `from` is where it starts before it settles:
 * a push outward toward the nearest edge, in percent of the box.
 */
export type HeroArtifact = {
  readonly id: string;
  /**
   * The slug of a cutout in `HERO_MEDIA`.
   *
   * Transparent PNGs of paper artifacts, converted by `npm run artifacts` and
   * drawn with no frame at all. That is the device the reference uses: a
   * newspaper and a name badge lie on its ground rather than sitting inside
   * cards. The same artwork inside a white card reads as a picture of a thing.
   *
   * No ratio here. It comes off the encoded file, so the box the page reserves
   * cannot disagree with the image that lands in it.
   */
  readonly image: string;
  /**
   * The stage of the month this artifact belongs to.
   *
   * It rides on the artifact rather than being positioned separately, so
   * resizing or moving a sheet takes its label with it. Three loose chips were
   * placed by hand against the old composition and every layout change left one
   * of them stranded.
   *
   * Numbered, which this project's own rules normally rule out. The rule is
   * about a counter on rows where nothing depends on the order; here the order
   * is the entire content, and the sheets are arranged so reading order and
   * process order are the same thing.
   */
  readonly stage: string;
  /**
   * Which edge of its own artwork the stage tab straddles, and how far down it.
   *
   * The tab is a small butter strip sitting half on the sheet and half off it,
   * the way a tab sticks out of a folder. `labelTop` is a percentage of the
   * artwork's own height, so it stays where it was put at any size.
   *
   * A tab on the outward edge of an artifact near the sheet edge gets cut in
   * half by it, which only shows on a phone, where a tab is a much larger
   * share of the artwork it hangs off. So the two artifacts sitting against the
   * left and right edges point their tabs inward instead.
   */
  readonly labelSide: "left" | "right";
  readonly labelTop: number;
  /**
   * Hang this tab further off its sheet than the rest.
   *
   * A tab covers a fixed slice of the artwork behind it, and what that slice
   * costs depends entirely on what is printed there. On the calendar it landed
   * on the C of the handwritten "Content Calendar", which is the one word on
   * the sheet a reader actually reads. Pushed out to half its width, only the
   * tail of the tab touches the paper and the heading is clear.
   */
  readonly labelFar?: boolean;
  /**
   * Extra degrees on the tab alone, for artwork that is drawn on a slant.
   *
   * The tab already inherits `rotate` from the artifact, so for a sheet drawn
   * square this is nothing and stays unset. `a4` is not drawn square: measured
   * off its own alpha edge, the paper in that photograph leans 10.8 degrees
   * inside its own frame. So its tab was sitting at the 3 degrees the CSS gives
   * it while the sheet behind it read at nearly 14, and a tab that is meant to
   * look stuck to the paper looked laid over it.
   *
   * This is a property of the picture rather than of the layout, which is why
   * it lives per artifact and not in `Stage`. Re-measure it if the artwork is
   * ever replaced: fit a line to the topmost opaque pixel across the middle
   * 60 percent of the image and take the angle.
   */
  readonly labelRotate?: number;
  readonly width: number;
  readonly left: number;
  readonly top: number;
  readonly rotate: number;
  readonly from: { readonly x: number; readonly y: number };
  /** Seconds. Cards land first and the chips answer them. */
  readonly delay: number;
};

/**
 * The hero composition.
 *
 * Four paper artifacts, one per stage of a month, and the cluster is
 * deliberately weighted to the top of its box rather than centred in it. On a
 * full-screen hero a centred cluster runs off the bottom edge before the reader
 * has scrolled.
 *
 * **Built to a diagram, and the tilt took three attempts to read correctly.**
 * An early pass used minus four, six, minus seven and three, and the note came
 * back that half of them looked straight. The obvious reading was that they
 * were too gentle, so they went to sixteen, fourteen, twenty and nine, and the
 * note came back that they were tilted far too much. Both were right, and the
 * variable was never the amount: the first set leaned in different directions,
 * which at a small angle reads as four things sitting slightly wrong rather
 * than as a decision. Every sheet leans the same way now, so seven or eight
 * degrees is enough to be deliberate. Measured off the diagram.
 *
 * **Gentler, and still leaning left. Fourth attempt, settled 2026-09-02.**
 * "Tilt them right a little" was read as a mirror, so minus eight became plus
 * eight, a sixteen degree swing that passed through straight on the way. The
 * correction came back as a drawing, and the angles in it measure about minus
 * eight, minus eight, minus six and minus one: the same direction these always
 * leaned, drawn to say "less", not "the other way". So the lean stays left and
 * the amounts come down. Five, five, four and two.
 *
 * The set still agrees, which is the part that is not negotiable. At these
 * amounts it matters more, not less: at two degrees a sheet leaning against the
 * other three reads as a straightening error rather than as a tilt.
 *
 * **Nothing overlaps, and nothing is smaller.** Both were asked for and they
 * looked mutually exclusive for several passes, because the arrangement was
 * being placed as a free scatter: four sheets dropped at four angles in a
 * portrait column will always find each other. Read as two bands instead, one
 * pair high and one pair low, with a lane down the middle, the same four sheets
 * clear each other at a larger size than any scattered version managed. Each
 * pair is offset vertically so the bands do not read as rows.
 *
 * The offsets are what keep it from looking like a table: ideate sits at the
 * top of its band and create ten percent below it, plan at the top of the lower
 * band and publish eight percent below that.
 *
 * Four arrangements came before it, each recorded because the reason it failed
 * is not obvious. A two by two grid could not be aligned at all: four sheets of
 * one width have four different heights, because each photograph has its own
 * aspect ratio, so aligning tops leaves the bottoms ragged. A diagonal cascade
 * fixed the alignment and lost the loop. A ring on compass points kept the loop
 * and left a hole through the middle that read as a slide about a process. A
 * heavy overlap closed the hole and brought back the collisions these images
 * cause when they touch, because each one carries its own baked shadow.
 *
 * **They are cutouts on the sage, not pictures in frames.** Three versions came
 * before: flat tints inside a drawn post frame, which read as a UI mockup;
 * supplied desk photographs in the same frame, which brought their own greens
 * and browns and took the palette away from the site; and equipment cutouts,
 * which were the right device carrying the wrong objects.
 *
 * Two of the four arrived opaque, one with the transparency checkerboard
 * painted in as black pixels. `npm run artifacts` keys them: see
 * `scripts/lib/dropBackground.mjs`. `a2` still carries an invented brand
 * handle, an invented city and an invented like count printed on it, which is
 * recorded in `assets/landing/README.md` and wants regenerating.
 *
 * Coordinates are percentages of the artwork's own box, which is one column of
 * the hero grid and is itself capped by the page measure. That cap is the whole
 * reason it is written this way, and it was learned by removing it: positioning
 * against the full band instead let the cards grow with the viewport, so a
 * composition tuned at 1440 arrived at 1800 with 300px cards standing over the
 * headline. Percentages of a capped box hold their size; percentages of the
 * window do not.
 */
export const HERO_ARTIFACTS: readonly HeroArtifact[] = [
  {
    id: "ideate",
    image: "a4",
    stage: "01 Ideate",
    labelSide: "left",
    labelTop: 20,
    labelRotate: -11,
    width: 44,
    left: 6,
    top: 0,
    /*
      Shallower than the other three, and it is the one sheet that needs to be.
      This is the largest artifact and the one nearest the top of the frame, so
      the same angle that reads as a lean on a small card two thirds down reads
      as a bend on this one: the eye measures a tilt against the horizontal
      edges around it, and up here those are the masthead and the sheet edge,
      both dead level and both close. The label rides the same transform, so
      this number moves the yellow strip with the paper rather than leaving it
      at an angle the artwork no longer has.

      Still negative, which is the part that is not up for grabs. Sheets leaning
      in different directions read as several things sitting slightly wrong
      rather than as one arrangement, and that was learned here across three
      attempts. The amount was never the variable; the disagreement was.
    */
    rotate: -3,
    from: { x: 0, y: -60 },
    delay: 0,
  },
  {
    id: "plan",
    image: "a3",
    stage: "02 Plan",
    labelSide: "left",
    labelTop: 16,
    labelFar: true,
    width: 44,
    left: 6,
    top: 50,
    rotate: -5,
    from: { x: -70, y: 0 },
    delay: 0.12,
  },
  {
    id: "create",
    image: "a1",
    stage: "03 Create",
    labelSide: "right",
    labelTop: 70,
    width: 42,
    left: 52,
    top: 10,
    rotate: -4,
    from: { x: 70, y: -20 },
    delay: 0.24,
  },
  {
    id: "publish",
    image: "a2",
    stage: "04 Publish",
    labelSide: "right",
    labelTop: 80,
    width: 42,
    left: 52,
    top: 58,
    rotate: -2,
    from: { x: 20, y: 60 },
    delay: 0.36,
  },
];














