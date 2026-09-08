import { ArrowButton } from "@/components/ui/ArrowButton";
import { PinGlyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideIn } from "@/components/ui/SlideIn";
import { getStudio } from "@/content";

/* Where Kalaa is, with a map beside it. */
/* Four torn edges in box units, for the sheet under the map. */
const TORN_SHEET =
  "M0.0000,0.0277 L0.0208,0.0306 L0.0417,0.0509 L0.0625,0.0493 L0.0833,0.0497 L0.1042,0.0539 L0.1250,0.0387 L0.1458,0.0393 L0.1667,0.0455 L0.1875,0.0596 L0.2083,0.0401 L0.2292,0.0307 L0.2500,0.0110 L0.2708,0.0259 L0.2917,0.0352 L0.3125,0.0132 L0.3333,0.0363 L0.3542,0.0586 L0.3750,0.0600 L0.3958,0.0600 L0.4167,0.0436 L0.4375,0.0203 L0.4583,0.0216 L0.4792,0.0005 L0.5000,0.0000 L0.5208,0.0000 L0.5417,0.0000 L0.5625,0.0000 L0.5833,0.0000 L0.6042,0.0164 L0.6250,0.0174 L0.6458,0.0241 L0.6667,0.0241 L0.6875,0.0319 L0.7083,0.0298 L0.7292,0.0192 L0.7500,0.0431 L0.7708,0.0600 L0.7917,0.0600 L0.8125,0.0600 L0.8333,0.0511 L0.8542,0.0382 L0.8750,0.0280 L0.8958,0.0074 L0.9167,0.0202 L0.9375,0.0154 L0.9583,0.0320 L0.9792,0.0266 L1.0000,0.0486 L1.0000,0.0208 L1.0000,0.0417 L1.0000,0.0625 L1.0000,0.0833 L0.9741,0.1042 L0.9406,0.1250 L0.9100,0.1458 L0.9395,0.1667 L0.9540,0.1875 L0.9873,0.2083 L0.9529,0.2292 L0.9627,0.2500 L0.9614,0.2708 L0.9780,0.2917 L0.9649,0.3125 L1.0000,0.3333 L0.9694,0.3542 L0.9727,0.3750 L0.9898,0.3958 L1.0000,0.4167 L1.0000,0.4375 L1.0000,0.4583 L1.0000,0.4792 L1.0000,0.5000 L0.9893,0.5208 L1.0000,0.5417 L1.0000,0.5625 L1.0000,0.5833 L0.9940,0.6042 L1.0000,0.6250 L1.0000,0.6458 L1.0000,0.6667 L1.0000,0.6875 L0.9915,0.7083 L0.9975,0.7292 L1.0000,0.7500 L0.9698,0.7708 L0.9798,0.7917 L1.0000,0.8125 L1.0000,0.8333 L1.0000,0.8542 L0.9920,0.8750 L1.0000,0.8958 L1.0000,0.9167 L0.9957,0.9375 L1.0000,0.9583 L0.9700,0.9792 L0.9880,1.0000 L0.9792,0.9400 L0.9583,0.9447 L0.9375,0.9651 L0.9167,0.9749 L0.8958,0.9831 L0.8750,0.9700 L0.8542,0.9816 L0.8333,0.9954 L0.8125,0.9719 L0.7917,0.9911 L0.7708,0.9843 L0.7500,0.9673 L0.7292,0.9724 L0.7083,0.9862 L0.6875,0.9678 L0.6667,0.9772 L0.6458,0.9626 L0.6250,0.9400 L0.6042,0.9400 L0.5833,0.9400 L0.5625,0.9400 L0.5417,0.9469 L0.5208,0.9400 L0.5000,0.9511 L0.4792,0.9400 L0.4583,0.9403 L0.4375,0.9428 L0.4167,0.9400 L0.3958,0.9543 L0.3750,0.9400 L0.3542,0.9400 L0.3333,0.9495 L0.3125,0.9617 L0.2917,0.9800 L0.2708,0.9676 L0.2500,0.9453 L0.2292,0.9534 L0.2083,0.9732 L0.1875,0.9842 L0.1667,0.9709 L0.1458,0.9647 L0.1250,0.9851 L0.1042,0.9901 L0.0833,0.9670 L0.0625,0.9685 L0.0417,0.9488 L0.0208,0.9627 L0.0000,0.9867 L0.0000,0.9792 L0.0052,0.9583 L0.0000,0.9375 L0.0000,0.9167 L0.0000,0.8958 L0.0000,0.8750 L0.0000,0.8542 L0.0000,0.8333 L0.0308,0.8125 L0.0521,0.7917 L0.0221,0.7708 L0.0379,0.7500 L0.0296,0.7292 L0.0043,0.7083 L0.0000,0.6875 L0.0111,0.6667 L0.0422,0.6458 L0.0263,0.6250 L0.0497,0.6042 L0.0646,0.5833 L0.0576,0.5625 L0.0343,0.5417 L0.0518,0.5208 L0.0371,0.5000 L0.0559,0.4792 L0.0226,0.4583 L0.0558,0.4375 L0.0843,0.4167 L0.0900,0.3958 L0.0900,0.3750 L0.0900,0.3542 L0.0682,0.3333 L0.0900,0.3125 L0.0662,0.2917 L0.0490,0.2708 L0.0713,0.2500 L0.0894,0.2292 L0.0665,0.2083 L0.0371,0.1875 L0.0620,0.1667 L0.0848,0.1458 L0.0584,0.1250 L0.0531,0.1042 L0.0542,0.0833 L0.0212,0.0625 L0.0246,0.0417 L0.0338,0.0208 Z";

export function ContactStudio() {
  const studio = getStudio();

  return (
    <Section id="studio" fill="overflow-hidden" padding="py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <SlideIn from="left" className="min-w-0">
          <SectionHeading
            title={<>Visit our office.</>}
            lead="We are in Surat, Gujarat, and always happy to meet, work together, or just have a good conversation."
          />

          {/* Centred below `md` with the heading above it, at the client's ask; the button under it follows. */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-4 md:text-left">
            <span aria-hidden className="flex h-7 shrink-0 items-center text-ink-sage">
              <PinGlyph />
            </span>

            {/* Two lines here, not the three the footer sets. */}
            <address className="not-italic">
              <span className="block font-display text-display-m font-bold text-ink">Kalaa</span>
              <span className="mt-1 block text-body text-ink-body">
                <span className="block">{studio.lines[0]}</span>
                <span className="block">{studio.lines.slice(1).join(", ")}</span>
              </span>
            </address>
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <ArrowButton href={studio.href} width="fit" external>
              Get directions
            </ArrowButton>
          </div>
        </SlideIn>

        <SlideIn from="right" delay={0.08}>
          {/* The written mark over the map, which the drawing has beside it. */}
          <div className="mb-12 hidden items-end justify-end gap-2 lg:flex">
            <p className="font-hand text-[1.3rem] leading-tight text-ink-sage">Find us here.</p>
            <svg
              aria-hidden
              viewBox="0 0 40 34"
              fill="none"
              className="mb-1 h-7 w-8 text-ink"
            >
              <path
                d="M3 3c9 1 16.5 5.5 22 13.5 2.2 3.2 4 7 5.4 11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M22.5 24.5 30.8 29.5 36 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* A torn sage sheet under the map, laid a touch askew, the same paper the notes and bands use; the flat padded frame read as a border. */}
          <div className="relative">
            <svg aria-hidden className="absolute h-0 w-0" focusable="false">
              <defs>
                <clipPath id="map-torn" clipPathUnits="objectBoundingBox">
                  <path d={TORN_SHEET} />
                </clipPath>
              </defs>
            </svg>
            <div
              aria-hidden
              className="absolute -inset-x-4 -inset-y-6 -rotate-1 bg-tint-sage lg:-inset-x-8 lg:-inset-y-9"
              style={{ clipPath: "url(#map-torn)" }}
            />
            <div className="map-frame relative overflow-hidden rounded-token shadow-soft">
              <iframe
                title={`Map showing Kalaa at ${studio.lines.join(", ")}`}
                src={studio.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[17rem] w-full border-0 lg:h-[22rem]"
              />
            </div>
          </div>
        </SlideIn>
      </div>
    </Section>
  );
}
