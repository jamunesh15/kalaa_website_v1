"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { HERO_ARTIFACTS } from "@/content/placeholder";
import { HERO_MEDIA } from "@/content/heroMedia";
import { SURFACE } from "@/components/ui/surface";

/**
 * The things Kalaa makes, arriving from every edge and settling.
 *
 * This is the one device taken from surya.website, and it is taken on its own:
 * not the cream ground, not the desk, not the notepad or the sticky note. An
 * entrance animation, played once, on arrival.
 *
 * It is not a scroll effect and it never takes the scroll. The page moves
 * natively the whole time.
 *
 * Marked `aria-hidden` on purpose. Everything it says is already said by the
 * heading and the paragraph beside it, so exposing seven floating fragments to a
 * screen reader would add noise rather than information. **That changes the day
 * real client work goes in these frames**: a photograph of somebody's work is
 * content, and it will need real alt text and a real caption.
 *
 * Only this layer is a client component. The heading is server-rendered and
 * never animates, because it is the largest thing on the screen and therefore
 * the element the browser measures LCP against.
 */

/**
 * The spring every artifact lands on.
 *
 * One set of numbers for all four, because the thing that makes motion read as
 * designed rather than as a pile of effects is that everything moves the same
 * way. Only the delay differs, so they arrive as a sequence rather than a burst.
 *
 * Each sheet arrives from the edge nearest where it lands, so the ring builds
 * outward in order rather than four things converging on one point. The delays
 * are what make it a sequence rather than a burst.
 */
const SPRING = { type: "spring", stiffness: 58, damping: 15, mass: 1 } as const;

/**
 * The arrival and the reset, as variants.
 *
 * `custom` carries the artifact, because every sheet comes in from the edge
 * nearest where it lands and takes its own place in the sequence. The delay is
 * on `shown` only: a stagger on the way out is a queue of paper leaving, which
 * is not a thing anyone needs to watch.
 */
type Piece = (typeof HERO_ARTIFACTS)[number];

const PIECE: Variants = {
  hidden: (item: Piece) => ({
    opacity: 0,
    x: `${item.from.x}%`,
    y: `${item.from.y}%`,
    scale: 0.92,
    transition: { duration: 0 },
  }),
  shown: (item: Piece) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { ...SPRING, delay: item.delay },
  }),
};

/**
 * The tilt, on its own element.
 *
 * Motion writes an element's whole `transform`, so a wrapper carrying position
 * and a rotation on the same node is one of them winning. The artifact arrives
 * leaning further over than it settles, which is what stops four sheets looking
 * placed rather than dropped.
 */
const TILT: Variants = {
  hidden: (item: Piece) => ({
    rotate: item.rotate + (item.rotate > 0 ? 12 : -12),
    transition: { duration: 0 },
  }),
  shown: (item: Piece) => ({ rotate: item.rotate, transition: { ...SPRING, delay: item.delay } }),
};

/**
 * One paper artifact, lying on the sage.
 *
 * No card, no frame, no background. The shadow is `artifact-shadow` in
 * `utilities.css`, a `drop-shadow` filter rather than a `box-shadow`, so it
 * follows the artwork's alpha outline: these sheets have torn edges and curled
 * corners, and a rectangular shadow behind one is the giveaway that it is a
 * picture of paper rather than paper.
 *
 * It was removed for one build, on the reasoning that a cast shadow is the
 * strongest cue that a thing is three dimensional and these are meant to read
 * flat. Without it they read as printed onto the sage rather than lying on it,
 * which is worse: the sage is a field, not a page. The shadow is what lifts
 * them.
 *
 * `sizes` is worth stating. The wider artifact is 62 percent of a column capped
 * near 548px, so the browser is told to fetch for about 340px rather than for
 * the whole viewport, which is what it assumes when nobody says.
 */
function ObjectArtifact({ slug }: { slug: string }) {
  const media = HERO_MEDIA.find((item) => item.slug === slug);
  if (!media) return null;

  return (
    <Image
      src={media.src}
      alt=""
      width={media.width}
      height={media.height}
      sizes="(min-width: 1024px) 340px, 55vw"
      className="artifact-shadow block h-auto w-full"
      loading="eager"
      fetchPriority="low"
    />
  );
}

/**
 * The stage name, as a tab straddling the edge of its own sheet.
 *
 * Half on the paper and half off it, the way a tab sticks out of a folder.
 * Centring it on the edge rather than sitting it inside means it never covers
 * the sheet's own handwritten heading, and never floats free of the artifact it
 * belongs to either.
 *
 * `labelTop` is a percentage of the artwork's height rather than a pixel
 * offset, so a tab stays where it was put when the sheets are resized. They
 * have been resized five times.
 *
 * Smaller on a phone, and it overhangs less there too. A tab is a fixed number
 * of pixels hanging off artwork that scales with the box, so at 375px a
 * desktop-sized tab is a third of the sheet it belongs to and the sheets
 * nearest the edges had theirs sliced off by the sheet edge. Straddling by a
 * quarter instead of a half keeps the whole label on the page while still
 * reading as a tab.
 *
 * It lives inside the rotated element, so it leans with the paper. A tab held
 * level against a tilted sheet reads as interface drawn over a photograph,
 * which is the thing this composition is trying not to be.
 *
 * Butter, and this is the fourth version of these labels. They were butter
 * pills inside the corner, then plain small caps set outside the artwork, and
 * the plain version lost the thing the accent was doing: naming four steps
 * quietly enough to be skipped. Spending the accent here does mean the first
 * screen now carries it on the marked headline word and on four tabs.
 */
function Stage({
  label,
  side,
  top,
  far = false,
  rotate = 0,
}: {
  label: string;
  side: "left" | "right";
  top: number;
  far?: boolean;
  rotate?: number;
}) {
  /*
    Written out in full rather than assembled from parts. Tailwind finds classes
    by scanning source text for complete strings, so `sm:-translate-x-${reach}`
    generates no CSS at all: the class lands on the element and nothing is
    defined for it. Nothing errors and the element simply does not move, which
    is a very slow bug to find.
  */
  const REACH = {
    left: {
      near: "left-0 -translate-x-1/4 sm:-translate-x-1/3",
      far: "left-0 -translate-x-1/4 sm:-translate-x-1/2",
    },
    right: {
      near: "right-0 translate-x-1/4 sm:translate-x-1/3",
      far: "right-0 translate-x-1/4 sm:translate-x-1/2",
    },
  } as const;

  const edge = REACH[side][far ? "far" : "near"];

  return (
    <span
      /*
        `rotate` composes with the tilt this tab inherits from the artifact
        wrapper rather than replacing it, so a sheet drawn on a slant can have
        its tab lie parallel to the paper while a square one needs nothing. See
        `labelRotate` in `placeholder.ts` for where the number comes from.
      */
      style={{ top: `${top}%`, rotate: `${rotate}deg` }}
      className={`${SURFACE} ${edge} absolute z-10 whitespace-nowrap bg-accent px-2 py-0.5 text-label font-bold text-ink sm:px-2.5 sm:py-1 sm:text-small`}
    >
      {label}
    </span>
  );
}

export function HeroArtifacts() {
  return (
    /*
     * A fixed aspect ratio with everything positioned by percentage inside it.
     * On a wide screen the box takes the height the hero gives it rather than
     * setting its own. A fixed ratio inside a full-screen hero is a composition
     * floating in a field of sage: the section is as tall as the viewport and
     * the artwork is as tall as its own arithmetic says, and the two have
     * nothing to do with each other.
     *
     * Stacked on a phone there is no height to inherit, so it falls back to a
     * ratio, and the ratio is roughly square because a cycle is as tall as it is
     * wide. A wide box was right when this held four small cards and is wrong
     * for a ring of four overlapping sheets.
     *
     * That is what lets one set of coordinates serve every screen width: the box
     * shrinks and the composition shrinks with it, instead of needing a second
     * arrangement for phones.
     *
     * `overflow-visible` is deliberate. Artifacts are meant to sit slightly
     * outside the box; the section above clips them against the sheet edge,
     * which is what makes them look like objects on it rather than in a frame.
     */
    <div aria-hidden className="relative aspect-[1/1.2] w-full sm:aspect-[1/1.05] lg:aspect-auto lg:h-full">
      {HERO_ARTIFACTS.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute"
          /*
            Earlier sheets sit ON TOP of later ones, which is the opposite of
            the order they are written in and is not a style choice. A stage
            label lives in its sheet's bottom left corner, and the next sheet
            along the diagonal covers exactly that corner: in document order the
            first three labels were each partly hidden by the sheet after them,
            which only showed at 375px, where a label is nearly as wide as the
            sheet carrying it. The label cannot be lifted out on its own,
            because the transform on this wrapper makes it a stacking context of
            its own, so the sheet is lifted instead. It reads as a hand of cards
            fanned with the first one showing, which is what it is.
          */
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: `${item.width}%`,
            zIndex: HERO_ARTIFACTS.length - index,
          }}
          /*
           * One `initial` for everyone, and reduced motion is handled by the
           * transition instead. Branching this on `still` is a hydration bug
           * rather than a style choice: `useReducedMotion` cannot know the
           * preference during server rendering, so it returns null there and
           * true in a reduced-motion browser. The server sent the arriving
           * state and the client wanted the settled one, React found five style
           * properties disagreeing on the first element of the hero, and threw
           * the whole tree away and rebuilt it on the client. It cost every
           * reduced-motion visitor a re-render of the first screen and showed up
           * only as a console error nobody was reading.
           *
           * `animate` already targets the settled state, so the zero duration
           * transition below lands there on the first frame. Same result, and
           * nothing that is rendered depends on a value the server cannot have.
           */
          /*
            Variants and `whileInView` rather than a plain `animate`, so the
            arrival plays again when a reader comes back up to the top of the
            page instead of being spent on the first load.

            `once: false` is banned everywhere else here, because resetting on
            any exit runs a section's introduction backwards under somebody
            scrolling up past it. The hero cannot hit that: nothing sits above
            it, so it is only ever left downward and only ever returned to
            upward. Reset on exit and reset when the reader has gone are the
            same event on this one section.

            The reset is instant for the same reason it is on the about board:
            four sheets flying back to their entry positions on a spring, off
            screen, is a second of work nobody sees and a second where the page
            is animating for no reason.
          */
          variants={PIECE}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.2 }}
          custom={item}
        >
          {/*
            The tilt lives on this inner element rather than on the positioned
            wrapper, so the label below it stays level while the artwork leans.
            It carries the entrance rotation too: the artifact arrives a little
            further over than it settles.
          */}
          <motion.div className="relative" variants={TILT} custom={item}>
            <ObjectArtifact slug={item.image} />
            <Stage
              label={item.stage}
              side={item.labelSide}
              top={item.labelTop}
              far={item.labelFar}
              rotate={item.labelRotate}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
