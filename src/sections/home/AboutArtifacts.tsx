"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { ABOUT_ARTIFACTS, type AboutArtifact } from "@/content/aboutArtifacts";
import { ABOUT_MEDIA } from "@/content/aboutMedia";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/**
 * A month of Kalaa's work, arriving from every edge and settling into a board.
 *
 * Same device as the hero, and taken from the same place: surya.website, on its
 * own, without its cream ground or its desk metaphor. It earns a second showing
 * here because the two are doing different jobs. The hero shows four objects
 * and says "we make these". This shows six and says "this is what a month
 * looks like", which is the question an about section exists to answer.
 *
 * **Two triggers, and the second one is the whole design of this file.**
 *
 * The sheet arrives on its own, when the board first comes into view. The five
 * objects that lie on it arrive together, in one gesture, from every side, and
 * they do not begin until the part of the board they occupy is actually on
 * screen.
 *
 * That last clause is the requirement and it is easy to miss. This board is
 * taller than it is deep in objects: the plan sheet takes the top three
 * quarters and the five artifacts sit across the bottom quarter. A single
 * trigger on the whole box therefore fires while the artifacts are still below
 * the fold, so they finish arriving somewhere the reader cannot see and are
 * simply there when the row scrolls up. A sentinel spanning the artifact row
 * is what ties the arrival to the thing arriving.
 *
 * **They arrive together, not in sequence.** Every earlier version staggered
 * them, on the reasoning that a sequence reads as a board being laid out. It
 * does not; it reads as pieces straggling in, and it was rejected as such. One
 * delay for all five, and the only thing that differs between them is the
 * direction they come from.
 *
 * A scroll-linked version of this was built and was wrong: it scrubbed each
 * piece against scroll position so the board assembled and disassembled under
 * the reader's finger. That is a different effect from the one asked for, which
 * is an arrival that plays once, at the right moment, at its own speed.
 *
 * **No `artifact-shadow` here, and that is the difference from the hero.**
 * These were supplied with their own shadows already baked into the alpha, so
 * the filter that lifts the hero's cutouts would give each of them a second
 * shadow at a second angle. The hero's set was asked for without one for
 * exactly that reason. Check the source before adding it back.
 */

/**
 * One spring for all six.
 *
 * The number has been round the houses. It began at stiffness 22, mass 1.45,
 * which read as sluggish. It was set to the hero's 58 / 1, which read as
 * hurried, then to 40 / 1.15, which still did. Settling time goes as the square
 * root of mass over stiffness, so those are 0.257, 0.131, 0.170 and this is
 * 0.202: slower than any of the quick ones and still well clear of the first.
 *
 * It can afford to be slower than the hero's now for a reason it could not
 * before. The hero plays on load, against a visitor who is waiting for the page.
 * This plays when a reader has scrolled to the row and is looking straight at
 * it, so the arrival is the thing they are watching rather than something in
 * the way of it.
 */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/**
 * The board's pieces, arriving.
 *
 * `from` is a percentage of the piece's own size, so one set of numbers works
 * for a polaroid and for the plan sheet alike, and each piece travels in from
 * the edge nearest where it lands: the sheet down from the top, the snapshot in
 * from the left, the notebook up from the bottom, the phone in from the right.
 *
 * **Going back is instant, and that is a bug fix rather than a shortcut.** The
 * hook re-arms this board when the reader scrolls up past it, so it can play
 * again on the way back down. On a spring, re-arming sent all six pieces home
 * over a full second: sheets sliding up and fading out, above the section,
 * under a reader who is moving the other way. The sheet starts 82% of its own
 * height above where it lands, so what that actually looked like was a ghost
 * poster floating over the top of the section as you scrolled away from it.
 * `duration: 0` makes the reset invisible. The board is off screen when it
 * happens, and the arrival is the only thing anyone should ever see move.
 */
const PIECE: Variants = {
  hidden: (item: AboutArtifact) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.9,
    transition: { duration: 0 },
  }),
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: SPRING,
  },
};

/**
 * The tilt is a second element, and it has to be.
 *
 * Motion overwrites an element's whole `transform`, so a wrapper animating
 * position and a rotation animating on the same node is one of them winning.
 * The artifact also arrives leaning further over than it settles, which is what
 * stops the pieces looking placed rather than dropped.
 */
const TILT: Variants = {
  hidden: (item: AboutArtifact) => ({ rotate: item.rotate - 12, transition: { duration: 0 } }),
  shown: (item: AboutArtifact) => ({ rotate: item.rotate, transition: SPRING }),
};

/**
 * What width this piece is actually drawn at, per breakpoint.
 *
 * One shared `sizes` for the whole board was a real bug and not a small one:
 * every piece claimed 260px, so the optimiser served the plan sheet a 256px
 * variant for a slot 652px wide and its column headings turned to mush. `sizes`
 * is a promise about layout, and six objects at six widths cannot share one.
 *
 * Above `lg` the board settles near 800px, so a piece is its own percentage of
 * that. Between `sm` and `lg` the board runs the full rail, so the percentage is
 * a percentage of the viewport. Below `sm` the phone arrangement applies and the
 * piece is wider again.
 */
function sizesFor(item: AboutArtifact) {
  const phone = item.phone?.width ?? item.width;
  return `(min-width: 1024px) ${Math.round(item.width * 8)}px, (min-width: 640px) ${item.width}vw, ${phone}vw`;
}

export function AboutArtifacts() {
  const sheet = useReplayOnScrollDown();
  const objects = useReplayOnScrollDown();

  return (
    /*
      A fixed ratio with everything positioned by percentage inside it, so one
      set of coordinates serves every width above `sm`. The phone gets its own
      ratio and its own five pieces, the same row under the same sheet at a
      size that survives 375px; the arithmetic is in `aboutArtifacts.ts`.

      No `min-height` here. A minimum taller than the ratio wants overrides the
      ratio without moving a single coordinate, and since every piece is
      positioned as a percentage of the box, the whole arrangement quietly
      stretches apart on the one screen size where the minimum wins. The grid
      row takes its height from this box instead, and the copy column stretches
      to meet it.

      **There is no ground under this box, and that was arrived at the hard
      way.** `board-ground` paints `--board` here, and it was added because the
      artifacts are cream paper and read as cutouts floating on a saturated mint
      band. It worked, and it was still wrong: the reference has one continuous
      field running behind the copy and the artwork alike, and a cream panel
      under half of it is a second surface the reference does not have. It also
      frames the composition, which makes every object inside it read smaller
      than the same object on an open field.

      The real fault was the band, not the missing panel. Paling the field puts
      the paper on the same footing without introducing a panel, and that is
      what `About` now does. The class is still in `utilities.css`; do not reach
      for it again without reading this.
    */
    <div aria-hidden className="relative aspect-[1.2/1] w-full overflow-visible sm:aspect-[1.24/1]">
      {/*
        The sentinel, and it draws nothing.

        It spans the band of the board the five objects occupy, from just under
        the sheet's last bullet row to the lowest edge any piece reaches, and it
        exists only so an intersection observer has something the right shape to
        watch. `amount: 0.45` means the arrival starts once nearly half that
        band is on screen, which is the point a reader would say the artifacts
        are visible.

        It is `absolute` and has no size of its own beyond those percentages, so
        it cannot affect layout, and it carries no paint.
      */}
      <motion.div
        {...objects.handlers}
        className="pointer-events-none absolute inset-x-0"
        style={{ top: "51%", height: "45%" }}
        viewport={{ amount: 0.45 }}
      />

      {ABOUT_ARTIFACTS.map((item, index) => {
        const media = ABOUT_MEDIA.find((entry) => entry.slug === item.image);
        if (!media) return null;

        /*
          The sheet is index 0 and watches the whole box; everything else waits
          for the sentinel. Two triggers rather than one delay, because a delay
          is a guess about how fast somebody scrolls and this is not.
        */
        const isSheet = index === 0;
        const shown = isSheet ? sheet.shown : objects.shown;

        return (
          <motion.div
            key={item.id}
            /*
              The coordinates go in as custom properties rather than as `left`,
              `top` and `width` directly, because an inline style cannot hold a
              media query and this board needs a different arrangement below
              `sm`. `about-piece` chooses between the two sets.

              Document order is stacking order, so the phone written last lies
              over the corner of the notebook written before it, which is the
              order paper lands on a desk.
            */
            className={`about-piece absolute${item.phone === null ? " about-piece-wide-only" : ""}`}
            style={
              {
                "--piece-left": `${item.left}%`,
                "--piece-top": `${item.top}%`,
                "--piece-width": `${item.width}%`,
                ...(item.phone
                  ? {
                      "--piece-phone-left": `${item.phone.left}%`,
                      "--piece-phone-top": `${item.phone.top}%`,
                      "--piece-phone-width": `${item.phone.width}%`,
                    }
                  : null),
                zIndex: index + 1,
              } as CSSProperties
            }
            {...(isSheet ? sheet.handlers : null)}
            viewport={isSheet ? { amount: 0.1 } : undefined}
            custom={item}
            variants={PIECE}
            initial="hidden"
            animate={shown ? "shown" : "hidden"}
          >
            <motion.div custom={item} variants={TILT}>
              <Image
                src={media.src}
                alt=""
                width={media.width}
                height={media.height}
                sizes={sizesFor(item)}
                className="block h-auto w-full"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "low" : "auto"}
                unoptimized
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
