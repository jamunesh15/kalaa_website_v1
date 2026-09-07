"use client";

import { motion } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Section } from "@/components/ui/Section";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";

/* The ask, as a torn sheet taped to the desk. */

/* The tear, in `objectBoundingBox` units so one path fits both sheets whatever size they end up. */
const TORN =
  "M0,0 L1,0 L1,0.9630 L0.9896,0.9634 L0.9792,0.9674 L0.9688,0.9671 L0.9583,0.9623 L0.9479,0.9587 L0.9375,0.9580 L0.9271,0.9580 L0.9167,0.9580 L0.9063,0.9610 L0.8958,0.9585 L0.8854,0.9590 L0.8750,0.9580 L0.8646,0.9580 L0.8542,0.9580 L0.8438,0.9580 L0.8333,0.9593 L0.8229,0.9589 L0.8125,0.9632 L0.8021,0.9661 L0.7917,0.9693 L0.7813,0.9679 L0.7708,0.9642 L0.7604,0.9610 L0.7500,0.9627 L0.7396,0.9580 L0.7292,0.9580 L0.7188,0.9580 L0.7083,0.9580 L0.6979,0.9580 L0.6875,0.9585 L0.6771,0.9580 L0.6667,0.9580 L0.6563,0.9592 L0.6458,0.9621 L0.6354,0.9580 L0.6250,0.9605 L0.6146,0.9593 L0.6042,0.9580 L0.5938,0.9587 L0.5833,0.9644 L0.5729,0.9668 L0.5625,0.9686 L0.5521,0.9663 L0.5417,0.9640 L0.5313,0.9633 L0.5208,0.9661 L0.5104,0.9684 L0.5000,0.9730 L0.4896,0.9683 L0.4792,0.9686 L0.4688,0.9703 L0.4583,0.9709 L0.4479,0.9692 L0.4375,0.9732 L0.4271,0.9739 L0.4167,0.9692 L0.4063,0.9642 L0.3958,0.9668 L0.3854,0.9727 L0.3750,0.9713 L0.3646,0.9760 L0.3542,0.9703 L0.3438,0.9747 L0.3333,0.9798 L0.3229,0.9784 L0.3125,0.9782 L0.3021,0.9769 L0.2917,0.9794 L0.2813,0.9736 L0.2708,0.9682 L0.2604,0.9685 L0.2500,0.9635 L0.2396,0.9657 L0.2292,0.9642 L0.2188,0.9585 L0.2083,0.9593 L0.1979,0.9616 L0.1875,0.9643 L0.1771,0.9588 L0.1667,0.9585 L0.1563,0.9580 L0.1458,0.9617 L0.1354,0.9610 L0.1250,0.9663 L0.1146,0.9667 L0.1042,0.9620 L0.0938,0.9604 L0.0833,0.9650 L0.0729,0.9693 L0.0625,0.9643 L0.0521,0.9668 L0.0417,0.9683 L0.0313,0.9727 L0.0208,0.9761 L0.0104,0.9761 L0.0000,0.9761 Z";

/** The three lines on the right, which are the offer in the client's own voice. */
const PROMISES = ["Strategy that's thoughtful.", "Content that connects.", "Growth that shows."];

/** The board's spring, which is now the one every arrival on this site uses. */
const SPRING = { type: "spring", stiffness: 32, damping: 15, mass: 1.3 } as const;

/** Instant on the way back, so nothing plays in reverse behind a reader. */
const OUT = { duration: 0 } as const;

export function ClosingCta() {
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <Section fill="overflow-hidden bg-tint-sage" padding="py-16 sm:py-20 lg:py-24">
      {/* The clip path lives in a zero-size SVG rather than in a stylesheet. */}
      <svg aria-hidden className="absolute h-0 w-0" focusable="false">
        <defs>
          <clipPath id="cta-torn" clipPathUnits="objectBoundingBox">
            <path d={TORN} />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        {...handlers}
        className="relative mx-auto max-w-6xl pt-5"
        viewport={{ amount: 0.3 }}
        initial="hidden"
        animate={shown ? "shown" : "hidden"}
      >
        {/* The sage sheet under the cream one, offset down and left and carrying the same tear. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 -bottom-3 -left-2 top-12 bg-page/60"
          style={{ clipPath: "url(#cta-torn)" }}
          variants={{
            hidden: { opacity: 0, y: 26, transition: OUT },
            shown: { opacity: 1, y: 0, transition: SPRING },
          }}
        />

        {/* One strip of tape, top left, and it hangs over the sheet's edge. */}
        {/* The tape lands after the paper and rotates as it does, from a steeper angle than it settles at. */}
        <motion.span
          aria-hidden
          className="absolute left-8 top-1 z-10 h-8 w-24 origin-center rounded-[1px] bg-[#d9cdb4]/85 sm:left-12 sm:h-9 sm:w-28"
          variants={{
            hidden: { opacity: 0, rotate: -64, y: -14, transition: OUT },
            shown: { opacity: 1, rotate: -28, y: 0, transition: { ...SPRING, delay: 0.16 } },
          }}
        />

        <motion.div
          className="relative bg-board px-6 pb-24 pt-14 sm:px-12 sm:pb-28 sm:pt-16 lg:px-16"
          style={{ clipPath: "url(#cta-torn)" }}
          variants={{
            hidden: { opacity: 0, y: 34, transition: OUT },
            shown: { opacity: 1, y: 0, transition: { ...SPRING, delay: 0.06 } },
          }}
        >
          {/* `pb-24` is not spacing, it is clearance. */}
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="relative min-w-0 text-center lg:text-left">
              {/* The arrow, curling in at the heading from the left margin. */}
              <motion.svg
                aria-hidden
                viewBox="0 0 84 104"
                className="pointer-events-none absolute -left-16 -top-3 hidden h-24 w-16 text-ink-sage xl:block"
                variants={{
                  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", transition: OUT },
                  shown: {
                    opacity: 1,
                    clipPath: "inset(0 0% 0 0)",
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.34 },
                  },
                }}
              >
                <path d="M12.71,7.47L14.62,8.88L16.35,10.36L17.92,11.92L19.35,13.54L20.65,15.23L21.83,16.99L22.91,18.81L23.89,20.69L24.78,22.64L25.61,24.65L26.38,26.72L27.09,28.84L27.77,31.01L28.42,33.24L29.05,35.51L29.67,37.81L30.30,40.16L30.94,42.54L31.60,44.95L32.30,47.38L33.04,49.83L33.84,52.29L34.71,54.76L35.66,57.23L36.69,59.71L37.83,62.17L39.07,64.62L40.44,67.05L41.93,69.45L43.57,71.83L45.36,74.16L47.31,76.45L49.42,78.69L51.72,80.87L54.20,82.99L56.88,85.05L59.77,87.03L62.87,88.94L66.19,90.76L69.75,92.49L70.25,91.51L66.86,89.57L63.71,87.58L60.80,85.54L58.11,83.45L55.63,81.32L53.36,79.15L51.27,76.94L49.35,74.70L47.59,72.44L45.99,70.14L44.53,67.82L43.19,65.49L41.96,63.13L40.84,60.76L39.82,58.38L38.87,55.98L38.00,53.58L37.19,51.18L36.43,48.77L35.70,46.37L35.01,43.98L34.33,41.60L33.67,39.23L33.00,36.89L32.32,34.57L31.61,32.28L30.87,30.02L30.08,27.80L29.24,25.63L28.33,23.51L27.34,21.44L26.26,19.43L25.08,17.50L23.79,15.64L22.39,13.87L20.85,12.19L19.19,10.61L17.37,9.13L15.41,7.77L13.29,6.53Z" fill="currentColor" />
                <path d="M71.19,91.09L57.23,75.33L68.81,92.91Z M69.90,90.65L53.05,93.31L70.10,93.35Z" fill="currentColor" />
              </motion.svg>

              <h2 className="mx-auto max-w-[18ch] font-display text-display-l font-bold text-ink lg:mx-0">
                Let&apos;s turn your attention into{" "}
                <span className="font-hand text-[1.18em] font-bold leading-[0.9] text-ink-sage">
                  real business results
                </span>
                .
              </h2>

              {/* A brush stroke under the accent rather than a border. */}
              <svg
                aria-hidden
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="mx-auto mt-3 h-2 w-44 text-ink-sage lg:mx-0"
              >
                <path
                  d="M2 7C40 2 120 1 198 4C120 8 40 9 2 7Z"
                  fill="currentColor"
                />
              </svg>

              <p className="mx-auto mt-6 max-w-[34ch] text-lead text-ink-body lg:mx-0">
                Good content starts conversations. Great strategy drives growth.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <ArrowButton href="/contact" width="fit">
                  Let&apos;s talk
                </ArrowButton>
              </div>
            </div>

            {/* The rule is on the left of this column and only from `lg`, where the two sit side by side. */}
            <div className="relative min-w-0 text-center lg:border-l lg:border-ink/15 lg:pl-14 lg:text-left">
              {/* The marks in the corner. */}
              <svg
                aria-hidden
                viewBox="0 0 40 30"
                fill="none"
                className="absolute -top-6 right-0 hidden h-7 w-9 text-tint-violet sm:block"
                style={{ color: "#a89ad6" }}
              >
                <path d="M8 20 12 4M20 18 26 6M30 22 37 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>

              {/* The three lines are the one place a stagger is right. */}
              <ul className="space-y-3 pt-2">
                {PROMISES.map((line, index) => (
                  <motion.li
                    key={line}
                    className="font-hand text-[1.45rem] leading-snug text-ink"
                    variants={{
                      hidden: { opacity: 0, y: 12, transition: OUT },
                      shown: {
                        opacity: 1,
                        y: 0,
                        transition: { ...SPRING, delay: 0.24 + index * 0.09 },
                      },
                    }}
                  >
                    {line}
                  </motion.li>
                ))}
              </ul>

              <svg
                aria-hidden
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="mx-auto mt-4 h-2 w-40 text-ink-sage lg:mx-0"
              >
                <path d="M2 7C40 2 120 1 198 4C120 8 40 9 2 7Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
