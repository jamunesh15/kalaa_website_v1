"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { PlayerGlyph } from "@/components/ui/Glyph";
import { SlideIn } from "@/components/ui/SlideIn";
import { Stars } from "@/components/ui/Stars";
import { FOCUS_RING } from "@/components/ui/surface";
import type { Testimonial } from "@/content/types";

/*
 * The video testimonials: one clip on the stage, the next and the last standing
 * either side of it.
 *
 * It was one client to a row, four rows deep, which measured 1,952px on a 950px
 * desktop screen and 2,821px on a phone: two screens of scrolling desktop and
 * three and a half on a phone, for four statements. Long enough that the section
 * read as an obstacle rather than as evidence.
 *
 * The fix is NOT two by two. Four cards in a grid put four statements on screen
 * at once, a reader meets them as a block and reads none of them, and that is
 * the objection the four rows existed to answer in the first place. A stage
 * keeps what the rows were protecting, which is one client speaking at a time,
 * and drops what made them long, which is repeating a whole card to do it.
 *
 * **THE FRAME IS 3:4 AND THE CROP COMES OFF THE FOOT.** The clips are 720 by
 * 1280, and at their own 9:16 every pixel of width costs 1.78 of height: 336
 * wide is 597 tall, 416 wide is 740, and the section stops fitting on a screen
 * long before the stage looks wide. 3:4 buys a third more width at the same
 * height, and the whole of that crop is taken off the BOTTOM through
 * `object-top`. That is the difference between this and the card it replaced,
 * which centred the crop and took the top of Vikas's head and the Saistar
 * banner above him. Nothing above the middle of any frame is ever cut.
 *
 * The two standing either side are POSTERS, not video: `next/image` on the
 * frame the clip starts at, so a page with four testimonials on it downloads no
 * video at all until somebody presses play.
 *
 * Choosing another client UNMOUNTS the stage, and that is the point rather than
 * an accident: a clip that was playing stops when its element goes, so two
 * voices can never run at once.
 *
 * The written and WhatsApp reviews are NOT here. They are a different kind of
 * evidence and get their own section.
 */

/*
 * The sheet alternates, sage then kraft, and stands 12px out of the stage.
 *
 * Sage on a sage band is a tint away from its own background, so that sheet
 * depends on the width to be seen at all. It alternates by WHO is playing rather
 * than by row, so the paper changes with the client and the swap is visible even
 * on a clip nobody has pressed yet.
 */
const MATS = ["bg-mat-sage", "bg-mat-kraft"] as const;

/*
 * The stage rises where it is. It does not arrive from the side.
 *
 * A sideways entrance pulls the eye across the page, and it is the same
 * objection the work wall settled: a row that travels in from off the page is a
 * row a reader watches instead of reads. These are statements from clients and
 * they should simply appear.
 */
const RISE = 32;

export function TestimonialWall({ items }: { items: readonly Testimonial[] }) {
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;

  const count = items.length;
  const index = active % count;
  const item = items[index];
  const previous = (index - 1 + count) % count;
  const next = (index + 1) % count;

  return (
    <div className="mt-10 lg:mt-12">
      <Dots items={items} active={index} onChoose={setActive} />

      <SlideIn from="up" travel={RISE}>
        {/*
         * The stage is WIDE and the pair beside it are SLIVERS, which is the
         * proportion the reference is built on: one thing being watched and two
         * edges of what is either side of it. Three portraits at three sizes,
         * which this was, read as a gallery instead, and the middle one looked
         * like a strip because nothing beside it was any narrower.
         *
         * `items-stretch`, so the slivers take their height from the stage. The
         * stage's height is its width times 16 over 9 and nothing else, so
         * hard coding a height for the pair would be a second source of truth
         * that goes stale the moment the stage changes width.
         */}
        <div className="relative mt-6 flex items-stretch justify-center gap-2 sm:mt-8 sm:gap-8 lg:gap-9">
          <Step direction="previous" name={items[previous].name} onChoose={() => setActive(previous)} />

          <Standing item={items[previous]} onChoose={() => setActive(previous)} />

          {/*
           * Keyed on the client, so choosing another one replaces the stage
           * rather than editing it, and the fade is the swap rather than
           * decoration on top of it. Opacity only: a transform here would drag
           * the torn mask through a re-raster on every frame.
           */}
          <motion.div
            key={item.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[17rem] shrink-0 sm:w-[22rem] lg:w-[24rem] xl:w-[26rem]"
          >
            <Stage item={item} mat={MATS[index % MATS.length]} />
          </motion.div>

          <Standing item={items[next]} onChoose={() => setActive(next)} />

          <Step direction="next" name={items[next].name} onChoose={() => setActive(next)} />
        </div>
      </SlideIn>
    </div>
  );
}

/*
 * Back and forward.
 *
 * The dots say how many there are and jump to one; these two say "the next one"
 * without a reader having to work out which dot that is, and they are the only
 * control on a phone, where the slivers are hidden. Centred against the stage
 * rather than the row, so they do not ride up as the names wrap underneath.
 *
 * **Below `lg` they sit ON the clip, and that is arithmetic rather than taste.**
 * The row is a 272px stage plus two 44px buttons, which is 360 before a single
 * gap, and the torn sheet stands 20px out of the stage on top of that: beside
 * the stage they need 40px of gap a phone does not have, and at the 8px it does
 * have the paper lays over them. Overlaid at the edges they cost the picture
 * 88px and nothing else. They rejoin the row at `lg`, where the strips do.
 *
 * The label names the client rather than the direction. "Next" tells a screen
 * reader user the button exists; "Show the testimonial from Vikas" tells them
 * what pressing it does.
 */
function Step({
  direction,
  name,
  onChoose,
}: {
  direction: "previous" | "next";
  name: string;
  onChoose: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChoose}
      aria-label={`Show the testimonial from ${name}`}
      data-step={direction}
      className={`${FOCUS_RING} absolute top-1/2 z-10 grid size-11 shrink-0 -translate-y-1/2 cursor-pointer place-items-center rounded-badge bg-action text-on-action transition-token hover:opacity-85 lg:static lg:translate-y-0 lg:self-center ${
        direction === "previous" ? "left-1" : "right-1"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`size-5 ${direction === "previous" ? "rotate-180" : ""}`}
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/*
 * Which of the four is on the stage.
 *
 * Buttons rather than tabs, and deliberately: tab semantics promise arrow key
 * navigation between them, and four dots a reader tabs through one at a time
 * keep that promise without having to make it. Each carries the client's name,
 * so a screen reader hears who it moves to rather than "button, 3".
 */
function Dots({
  items,
  active,
  onChoose,
}: {
  items: readonly Testimonial[];
  active: number;
  onChoose: (index: number) => void;
}) {
  return (
    <ul className="flex items-center justify-center gap-2">
      {items.map((item, index) => (
        <li key={item.slug}>
          <button
            type="button"
            onClick={() => onChoose(index)}
            aria-label={`Show the testimonial from ${item.name}`}
            aria-current={index === active}
            className={`${FOCUS_RING} transition-token block h-2 cursor-pointer rounded-token ${
              index === active ? "w-7 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/45"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}

/*
 * The client on the stage, at the size the camera shot them.
 *
 * Nothing downloads until somebody presses play: `preload="none"` and a poster.
 * The play badge sits at the FOOT of the clip rather than in the middle, because
 * centred it lands on the face.
 */
function Stage({ item, mat }: { item: Testimonial; mat: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  /* What he wrote, or what he said. Both are his; neither is ours. */
  const words = item.quote ?? item.spoken;

  return (
    <div>
      <div className="relative">
        {/*
         * The torn sheet behind the stage, the same one every card here sits
         * on, and it stands 20px out of the frame rather than 12.
         *
         * At 12 the tear read as a hairline against a 416px clip and the paper
         * device disappeared at the one place on this page it is largest. The
         * row's gaps went up with it: the sheet is drawn OUTSIDE the stage's
         * box, so a wider overhang eats the gap to the strips beside it, and
         * the two have to move together or the paper laps over a neighbour.
         */}
        <div aria-hidden className={`paper-mat absolute -inset-5 sm:-inset-7 ${mat}`} />

        <div className="relative aspect-[3/4] overflow-hidden rounded-token bg-ink shadow-soft">
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover object-top"
            poster={item.poster}
            /* `none`, so a reader who never presses play downloads no video. */
            preload="none"
            playsInline
            controls={started}
            onPlay={() => setStarted(true)}
          >
            <source src={item.mp4} type="video/mp4" />
          </video>

          {started ? null : (
            <>
              {/*
               * The whole frame is the target and the badge is its label, in
               * the MIDDLE of it, at the client's ask on 2026-09-10.
               *
               * It was a pill in a corner and it lost every argument it had
               * with the picture behind it: at the top it sat on a shop sign,
               * at the foot it sat in the caption's own scrim, and in both
               * places a reader had to go looking for it. The middle is the one
               * spot on a frame that is always the same distance from
               * everything else, and white on a shadow reads on any of these
               * four clips.
               */}
              <button
                type="button"
                onClick={() => void video.current?.play()}
                aria-label={`Play the testimonial from ${item.name}`}
                /* `z-10`, because the caption is drawn after this and its
                   scrim is solid ink at the foot: without it the badge sits
                   UNDER the darkest part of the picture and looks switched
                   off. The button itself has no background, so the words still
                   read through it. */
                className={`absolute inset-0 z-10 cursor-pointer ${FOCUS_RING}`}
              >
                {/*
                 * The bottom right corner, and that is the third place it has
                 * been. Every position measured against the middle of the frame
                 * lands on somebody: dead centre covers Vikas, 62% down covers
                 * Himanshu, because four clients filmed themselves at four
                 * distances from the camera and there is no share of the height
                 * that is empty on all four.
                 *
                 * A corner is the only spot that is decided by the frame rather
                 * than by what is in it. This one, because the words run along
                 * the foot from the left, so the badge takes the end of that
                 * line and the caption is padded to leave it room.
                 */}
                <span
                  aria-hidden
                  className="absolute right-4 bottom-4 grid size-14 place-items-center rounded-full bg-surface text-ink shadow-lift"
                >
                  <PlayerGlyph name="play" size={22} />
                </span>
              </button>

              {/*
               * The words, ON the clip.
               *
               * They were under it, on the sage band, and a block of display
               * type between the stage and the section's own foot read as a
               * second heading rather than as a caption. Here they are what the
               * reference does with them: the person, then what they said,
               * held on the picture of them saying it.
               *
               * The scrim is one hue fading to nothing, not two colours
               * crossing, and it is what carries the contrast: white type
               * dropped straight onto a frame is legible until the frame
               * changes. It is `pointer-events-none` so the press still reaches
               * the play target underneath, and it goes when the clip starts,
               * because by then the client is saying this out loud.
               */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink to-transparent p-4 pt-16 pr-20 text-on-action">
                <Stars rating={item.rating} />

                {words ? (
                  <blockquote className="mt-2 text-small font-medium">
                    &quot;{words}&quot;
                  </blockquote>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      {/*
       * Who that was, under the frame, the same way the slivers are named.
       *
       * `h-11` here and on the sliver's name, and the two have to MATCH. The
       * row stretches, so the slivers take their height from this whole column;
       * leave the two captions free to be different heights and the strips end
       * a few pixels above or below the clip they stand beside, which reads as
       * a misaligned row rather than as a caption that ran to two lines.
       *
       * `mt-8` clears the torn sheet, which now stands 28px out of the frame at
       * `sm` and up. At `mt-4` the paper laid over the client's own name.
       */}
      <div className="mt-8 h-11">
        <p className="text-small font-bold leading-tight text-ink">{item.name}</p>
        <p className="mt-0.5 text-label leading-tight text-ink-body">
          {[item.role, item.company].filter(Boolean).join(", ") || "Client"}
        </p>
      </div>
    </div>
  );
}

/*
 * The client either side of the one playing, as a sliver.
 *
 * A strip of their POSTER, taking its height from the stage, so the row reads as
 * one thing being watched with what is either side of it showing. Pressing one
 * brings it to the stage.
 *
 * **These get the width the band has going spare.** The stage cannot use it:
 * the clips are 9 by 16 and the frame is not allowed to crop, so every pixel of
 * width there costs 1.78 of height. The strips have no such arithmetic, because
 * they are a crop of a still by definition, so widening them is how the row
 * fills the band without the stage growing downward.
 *
 * **The strip is a still, not the clip.** Cropping a poster to a strip is a
 * preview; cropping the video would be cutting the frame, which is the thing
 * this section is not allowed to do. The strip is narrower than the frame and
 * the same height, so the crop takes the SIDES and every one of these clips is
 * a person sitting in the middle of it.
 *
 * Hidden below `lg`, not below `sm`. The row is two strips, a stage, two
 * arrows and four gaps, and at 640 that wanted 856px of a 600px column: the
 * strips appeared at `sm` and the section ran off the side of the page from
 * there to 1023. The width they need only exists at `lg`, and the numbers are
 * measured: 176 + 384 + 176 plus the buttons and gaps is 968 in the 984 a
 * 1024px screen has.
 */
function Standing({ item, onChoose }: { item: Testimonial; onChoose: () => void }) {
  return (
    <button
      type="button"
      onClick={onChoose}
      className={`${FOCUS_RING} group hidden w-[11rem] shrink-0 cursor-pointer flex-col text-left lg:flex xl:w-[18rem]`}
    >
      {/*
       * The PICTURE is held back, not the button. Dimming the whole control took
       * the name and the company down with it, and this row sits on the sage
       * band where body ink is already only 4.9:1. A label nobody can read is
       * not a smaller version of the label, it is a missing one.
       */}
      <span className="relative block flex-1 cursor-pointer overflow-hidden rounded-token bg-ink opacity-70 shadow-soft transition-token group-hover:opacity-100">
        <Image
          src={item.poster}
          alt=""
          fill
          sizes="(min-width: 1280px) 18rem, 11rem"
          className="object-cover"
        />
      </span>

      {/* The name only. A strip is 112px wide at its widest and "Founder,
          Avishtha Interiors" under one is three wrapped lines of small type;
          the company is under the stage, where there is room for it. `mt-8 h-11`
          matches the stage's caption so both images end level: change one and
          the strips stop lining up with the clip. */}
      <span className="mt-8 block h-11 text-small font-bold leading-tight text-ink">
        {item.name}
      </span>
    </button>
  );
}
