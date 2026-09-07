import type { SVGProps } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Section } from "@/components/ui/Section";
import { getAboutPillars } from "@/content";
import { AboutArtifacts } from "@/sections/home/AboutArtifacts";
import { HandAccent } from "@/components/ui/HandAccent";
import { AboutCopy } from "@/sections/home/AboutCopy";

/* About Kalaa, as the client's own board. */

/* Sky was rejected here once and is back because the client asked for it back after seeing the alternative. */
export function About() {
  const pillars = getAboutPillars();

  return (
    <Section id="about" fill="overflow-hidden bg-tint-sky" padding="py-12 sm:py-16 lg:py-14">
      <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-stretch xl:gap-6">
        {/* The copy column spans the board rather than sitting centred against it, and the two now start and finish on the same. */}
        <AboutCopy>
          {/* The section eyebrow is gone, cut by the client across the site. */}
          <div className="max-w-3xl">
            {/* No accent marker here. */}
            <h2 className="mx-auto max-w-[26ch] font-display text-display-l font-bold text-ink xl:mx-0">
              We turn your business into <HandAccent>real growth.</HandAccent>
            </h2>
            {/* Shortened from "Your story, your products and your customers. */}
            <p className="mx-auto mt-5 max-w-[38ch] text-lead text-ink-body xl:mx-0">
              Your story, your products, your customers. We turn them into
              content people notice and act on.
            </p>
          </div>

          {/* Two columns on a phone rather than four, because four titles as long as "Distribution" in a 375px row leave a column. */}
          {/* No rules at all now, horizontal or vertical, and both went at the client's instruction. */}
          <ul className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            {pillars.map((pillar) => {
              const Icon = ICONS[pillar.icon];
              return (
                /* Left aligned, not centred, and it is the column that decides rather than the row. */
                /* Below `xl` the whole column is centred at the client's ask, these four with it: a centred heading over four left-set. */
                <li key={pillar.title} className="min-w-0 text-center xl:pr-3 xl:text-left">
                  {/* The disc is a tint of the frame sage over the band, not white. */}
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-page/20 text-ink xl:mx-0">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-4 text-body font-bold text-ink">{pillar.title}</p>
                  <p className="mt-1 text-small text-ink-body">{pillar.line}</p>
                </li>
              );
            })}
          </ul>

          {/* `fit`, and no `max-w`. */}
          <div className="mt-12 flex justify-center xl:justify-start">
            <ArrowButton href="/contact" width="fit">
              Let&apos;s grow together
            </ArrowButton>
          </div>
        </AboutCopy>

        {/* `min-w-0` again. */}
        {/* Two bleeds, and both written as arbitrary min-widths on purpose. */}
        {/* The board is dropped a little against the copy beside it, and only at `xl` where the two are actually side by side. */}
        <div className="min-w-0 min-[1280px]:-mr-5 min-[1280px]:w-[calc(100%+1.25rem)] min-[1280px]:pt-12 min-[1400px]:-mr-13 min-[1400px]:w-[calc(100%+3.25rem)]">
          <AboutArtifacts />
        </div>
      </div>
    </Section>
  );
}

/* Four line glyphs, drawn rather than imported. */
const ICONS = {
  strategy: TargetIcon,
  content: PencilIcon,
  distribution: SendIcon,
  growth: TrendIcon,
} as const;

function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 12 20.5 3.5" />
    </svg>
  );
}

function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16z" />
      <path d="M15 5l4 4" />
    </svg>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M21 3 3 10.5l7.5 3L14 21z" />
      <path d="M10.5 13.5 21 3" />
    </svg>
  );
}

function TrendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 17.5 10 11l4 4 6-7.5" />
      <path d="M15 7.5h5v5" />
    </svg>
  );
}
