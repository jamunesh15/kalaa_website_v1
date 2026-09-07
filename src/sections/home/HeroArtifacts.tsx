"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { HERO_ARTIFACTS } from "@/content/placeholder";
import { HERO_MEDIA } from "@/content/heroMedia";
import { SURFACE } from "@/components/ui/surface";

/* The things Kalaa makes, arriving from every edge and settling. */

/* The spring every artifact lands on. */
const SPRING = { type: "spring", stiffness: 58, damping: 15, mass: 1 } as const;

/* The arrival and the reset, as variants. */
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

/* The tilt, on its own element. */
const TILT: Variants = {
  hidden: (item: Piece) => ({
    rotate: item.rotate + (item.rotate > 0 ? 12 : -12),
    transition: { duration: 0 },
  }),
  shown: (item: Piece) => ({ rotate: item.rotate, transition: { ...SPRING, delay: item.delay } }),
};

/* One paper artifact, lying on the sage. */
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

/* The stage name, as a tab straddling the edge of its own sheet. */
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
  /* Written out in full rather than assembled from parts. */
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
      /* `rotate` composes with the tilt this tab inherits from the artifact wrapper rather than replacing it, so a sheet drawn. */
      style={{ top: `${top}%`, rotate: `${rotate}deg` }}
      className={`${SURFACE} ${edge} absolute z-10 whitespace-nowrap bg-accent px-2 py-0.5 text-label font-bold text-ink sm:px-2.5 sm:py-1 sm:text-small`}
    >
      {label}
    </span>
  );
}

export function HeroArtifacts() {
  return (
    /* A fixed aspect ratio with everything positioned by percentage inside it. */
    <div aria-hidden className="relative aspect-[1/1.2] w-full sm:aspect-[1/1.05] lg:aspect-auto lg:h-full">
      {HERO_ARTIFACTS.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute"
          /* Earlier sheets sit ON TOP of later ones, which is the opposite of the order they are written in and is not a style. */
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: `${item.width}%`,
            zIndex: HERO_ARTIFACTS.length - index,
          }}
          /* One `initial` for everyone, and reduced motion is handled by the transition instead. */
          /* Variants and `whileInView` rather than a plain `animate`, so the arrival plays again when a reader comes back up to the. */
          variants={PIECE}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.2 }}
          custom={item}
        >
          {/* The tilt lives on this inner element rather than on the positioned wrapper, so the label below it stays level while the. */}
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
