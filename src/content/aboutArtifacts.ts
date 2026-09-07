/**
 * The about board, as a laid-out set of objects rather than one picture.
 *
 * Every coordinate is a percentage of the box the section gives this
 * composition, and the box has a fixed ratio, so one set of numbers serves
 * every screen width: the box shrinks and the board shrinks with it. Pixel
 * offsets would need a second arrangement for phones and a third for tablets,
 * and the three would drift apart the first time anything moved.
 *
 * Only `width` is set. Height comes from the artwork's own ratio, which is why
 * the manifest carries real pixel dimensions.
 *
 * **Six objects, not twelve, and that is the client's edit.** The board used to
 * carry the plan sheet and eleven pieces under it: two more posts, a second
 * note, the results card, the swatch tag, the content pillars and a still life.
 * It was read as busy, and the diagnosis was right for a reason worth writing
 * down. Twelve objects in a fixed box means twelve small objects, and a photo
 * of somebody's work is only evidence if you can see what is in it. At the old
 * widths a polaroid was 14% of the board and its caption was unreadable at any
 * screen size we ship.
 *
 * What is left is the sheet plus the five that each say something different:
 * the brand snapshot, the plan note, one post, the month's checklist and the
 * results on a phone. Discover, plan, make, schedule, measure. Removing the
 * duplicates cost the board nothing it was actually saying.
 *
 * **The freed space went into size rather than into spacing.** The five now run
 * 19% to 26% of the board against 9% to 22% before, which is a little under
 * half again as large, and they still interlock rather than sitting in a line
 * with gaps. See the note on the bottom row below: that was learned once
 * already and survives the edit.
 *
 * **The sheet's geometry is unchanged and everything below is derived from
 * it.** `a1` is 92% of the board wide at a 1.506 ratio, so it is 66% of the
 * board tall. Its words end at 0.629 of its own height, which is 41.5% of the
 * board, and its paper runs to 66%. That is the band the row below has to land
 * in: a piece starting above 41.5% buries `Goals`, `Calendar` and `Sales`, and
 * a piece starting below 66% has no paper to rest on and reads as hanging in
 * the field. Every top here is between 56 and 64.
 *
 * The sheet was extended once to make that band exist. `assets/about/a1.png`
 * shipped 1200 by 634 with only 11.5% blank paper under its last bullet row,
 * which left a polaroid resting a fifth of itself on paper. The flat cream band
 * above its bottom edge was stretched by 173px, ink and printed edge untouched.
 * **Re-derive every top above if that artwork changes again.**
 *
 * The board ratio falls out of the same arithmetic rather than being chosen.
 * Every piece is a percentage of the board width, so its height as a fraction
 * of the board is proportional to the ratio and the whole stack scales with it.
 * It stays at 1.08 to 1 through this edit: the lowest piece now settles at 93%
 * rather than 97%, which is the slack the removed row used to take up, and
 * tightening the ratio to close it would push the enlarged pieces back into the
 * sheet's words.
 *
 * **The row runs under the sheet rather than beside it**, rather than starting
 * where the paper ends. Laid out with a clean gap the two read as two separate
 * strips with a bare stripe of field between, which is what "no connection
 * between the second and third" meant on the twelve-piece version. Every piece
 * here tucks under the sheet, and each one overlaps its neighbour by one to
 * five percent of the board.
 *
 * **The right-hand pieces stop at 98%, not 100%.** The board used to be drawn
 * at 122% of its column with a negative margin to match, which put its right
 * edge 71px past the viewport and sliced the phone in half against the
 * section's `overflow-hidden`. The bleed is now the container gutter and no
 * more, so the whole board is on screen.
 *
 * Order is also stacking order: later entries sit on top, which is the order
 * paper lands on a desk. The phone is last because in the reference it lies
 * over the corner of the notebook.
 *
 * **The phone arrangement has its own tops and they are not the wide ones.**
 * They were once overwritten by a regex that rewrote every `top:` in a block,
 * `phone:` included, and it does not show in any gate: five artifacts landed on
 * top of each other on a 375px screen while lint, the structure check and the
 * build all stayed green. If these are ever rewritten in bulk again, bound the
 * replacement to the first `top:` after `left:` or write the array out in full,
 * and look at 375px afterwards.
 *
 * **The phone arrangement is five of the six**, and the one it leaves out is
 * the phone artwork. It is the wide composition redrawn, not a different one:
 * the sheet across the top and the four objects in ONE row under it, pinned
 * over its bottom edge, at 27% each rather than 23% so they read at 375px.
 * A two-row version shipped first, two objects beside the sheet and two under
 * them in a 1 to 1.58 box, and the client called it broken: the lower pair
 * floated in open field a long way below the sheet, which on the wide board
 * is the paper they are all pinned to. The box is 1.2 to 1 below `sm`, which
 * is what the row needs to clear its bottom at 91%.
 * See `about-piece` in `utilities.css` for how the two sets are chosen between,
 * and note that an inline style cannot hold a media query, which is why they
 * are custom properties rather than two class lists.
 */
export type AboutArtifact = {
  readonly id: string;
  /** Slug in `ABOUT_MEDIA`. */
  readonly image: string;
  /** Percentages of the composition box. */
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly rotate: number;
  /** Where it travels in from, as a percentage of its own size. */
  readonly from: { readonly x: number; readonly y: number };
  readonly delay: number;
  /**
   * Where this piece goes below `sm`, and whether it goes there at all.
   *
   * `null` means the phone arrangement leaves it out. Omitted means it keeps
   * its wide coordinates, which nothing currently does and which is the point:
   * a piece that wants the same place at both sizes says nothing.
   */
  readonly phone?: { readonly left: number; readonly top: number; readonly width: number } | null;
};

export const ABOUT_ARTIFACTS: readonly AboutArtifact[] = [
  {
    id: "plan",
    image: "a1",
    left: 4,
    top: 0,
    width: 92,
    rotate: -2,
    from: { x: 0, y: -82 },
    delay: 0.02,
    phone: { left: 2, top: 0, width: 96 },
  },
  {
    id: "snapshot",
    image: "a2",
    left: 0,
    top: 51,
    width: 23,
    rotate: -5,
    from: { x: -92, y: 10 },
    delay: 0.1,
    phone: { left: 0, top: 50, width: 27 },
  },
  {
    id: "note-plan",
    image: "a3",
    left: 20,
    top: 51,
    width: 24,
    rotate: 2,
    from: { x: -40, y: 70 },
    delay: 0.18,
    phone: { left: 22, top: 50, width: 27 },
  },
  {
    id: "post-arrival",
    image: "a4",
    left: 42,
    top: 51,
    width: 23,
    rotate: -2,
    from: { x: 0, y: 92 },
    delay: 0.26,
    phone: { left: 44, top: 50, width: 27 },
  },
  {
    id: "month",
    image: "a11",
    left: 62,
    top: 56,
    width: 25,
    rotate: 2,
    from: { x: 24, y: 96 },
    delay: 0.34,
    phone: { left: 68, top: 55, width: 28 },
  },
  {
    id: "phone",
    image: "a12",
    left: 84,
    top: 60,
    width: 15,
    rotate: 8,
    from: { x: 92, y: 60 },
    delay: 0.42,
    phone: null,
  },
];
