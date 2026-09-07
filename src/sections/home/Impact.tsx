import { Section } from "@/components/ui/Section";
import { HandAccent } from "@/components/ui/HandAccent";
import { ImpactCards, ImpactNote } from "@/sections/home/ImpactArtifacts";

/* What the work actually did, as four numbers on paper. */
export function Impact() {
  return (
    <Section id="impact" fill="overflow-hidden bg-tint-mist" padding="py-14 sm:py-20 lg:py-24">
      <div className="grid gap-12 xl:grid-cols-[0.86fr_1.14fr] xl:items-center xl:gap-14">
        <div className="min-w-0 text-center xl:text-left">
          {/* The eyebrow and its short rule are gone, cut by the client across the site. */}
          {/* "You can see" is set in the display face, not in handwriting. */}
          <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-display-l font-bold text-ink xl:mx-0">
            We turn attention into real business{" "}
            <HandAccent>you can see.</HandAccent>
          </h2>

          <p className="mx-auto mt-6 max-w-[40ch] text-lead text-ink-body xl:mx-0">
            Our work doesn&apos;t stop at likes and views. We focus on what actually moves your
            business forward.
          </p>

          <div className="mt-10 flex justify-center xl:justify-start">
            <ImpactNote />
          </div>
        </div>

        {/* `min-w-0`. */}
        <div className="relative min-w-0">
          {/* Handwriting, matching the reference and the note artifact in the other column. */}
          <p className="mx-auto mb-6 max-w-[30ch] text-center font-hand text-[1.35rem] leading-snug text-ink xl:mx-0 xl:text-left">
            When strategy meets consistency, this is what happens.
          </p>
          <ImpactCards />

          {/* The hand-drawn arrow, pointing from the copy into the results. */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            fill="none"
            className="pointer-events-none absolute -left-24 top-16 hidden h-28 w-28 text-ink xl:block"
          >
            {/* One long S rising left to right, drawn as two cubics that share a tangent at the middle so the join does not read as a. */}
            <path
              d="M4 96C26 90 30 62 52 52c22-10 26-30 42-42"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            {/* The head, as an open V rather than a filled triangle, so it reads as drawn with the same pen as the line. */}
            <path
              d="M90 22 94 10 82 14"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Section>
  );
}
