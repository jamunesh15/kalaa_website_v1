import Image from "next/image";
import { CheckGlyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/ui/SlideIn";
import { SERVICE_DETAIL_MEDIA } from "@/content/serviceDetailMedia";
import type { Service } from "@/content/types";

/*
 * The six services in full, in the site's own language.
 *
 * The first version of this page was hairlines and body copy on a white sheet,
 * and it was rejected on sight for the right reason: every other page here is
 * made of torn paper, tinted bands and real work, so a plain page reads as a
 * different site. The band rotation is the home page's rhythm and the torn
 * sheet is the same `paper-mat` the blog cards are mounted on.
 *
 * The pictures are the six supplied on 2026-09-08, one per service in the order
 * he named them. They are mounted rather than cut out, which is why they come
 * from `SERVICE_DETAIL_MEDIA` and not from the board's set: the board's pieces
 * are keyed to transparency and three of these six are light artwork on a light
 * ground, which keying destroys.
 */

/** One band per service, in the order the home page uses them. */
const BANDS = [
  "bg-tint-sage",
  "bg-tint-butter",
  "bg-tint-peach",
  "bg-tint-violet",
  "bg-tint-sky",
  "bg-tint-cloud",
];

/*
 * The disc under each tick is white on every band, not a rotation.
 *
 * A tint disc on a tint band is a disc that has disappeared, and the tick needs
 * something to sit on. White is the one value that reads against all six.
 */
const DISC = "bg-surface";

export function ServiceList({ services }: { services: readonly Service[] }) {
  return (
    <>
      {services.map((service, index) => {
        /* Picture right for the first, left for the second, so the page alternates rather than marching. */
        const pictureFirst = index % 2 === 1;
        const picture = SERVICE_DETAIL_MEDIA.find((entry) => entry.slug === service.image);

        return (
          <Section
            key={service.slug}
            id={service.slug}
            fill={`overflow-hidden ${BANDS[index % BANDS.length]}`}
            /* Tighter than the home page's bands: six of these run back to back and each one has to fit a screen. */
            padding="py-10 sm:py-12 lg:py-14"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <SlideIn
                from={pictureFirst ? "right" : "left"}
                className={`min-w-0 ${pictureFirst ? "lg:order-2" : ""}`}
              >
                <h2 className="max-w-[16ch] font-display text-display-l font-bold text-ink">
                  {service.title}
                </h2>

                <p className="mt-4 max-w-[46ch] text-lead text-ink-body">
                  {service.summary}
                </p>

                {/* The method, which is what somebody comparing two agencies is reading for. */}
                <p className="mt-4 max-w-[52ch] text-body text-ink-body">
                  {service.detail}
                </p>

                <ul className="mt-7 grid gap-3">
                  {service.delivers.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-body font-medium text-ink"
                    >
                      <span
                        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-ink ${DISC}`}
                      >
                        <CheckGlyph />
                      </span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </SlideIn>

              {/* Mounted on the torn sheet the rest of the site puts pictures on. */}
              <SlideIn
                from={pictureFirst ? "left" : "right"}
                className={`min-w-0 ${pictureFirst ? "lg:order-1" : ""}`}
              >
                {picture ? (
                  <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem] lg:max-w-[29.5rem]">
                    <div
                      aria-hidden
                      className="paper-mat absolute -inset-4 bg-mat-sage sm:-inset-6"
                    />
                    <div className="rounded-token relative overflow-hidden bg-surface shadow-soft">
                      <Image
                        src={picture.src}
                        alt={service.alt}
                        width={picture.width}
                        height={picture.height}
                        sizes="(min-width: 1024px) 30rem, 88vw"
                        className="block h-auto w-full"
                      />
                    </div>
                  </div>
                ) : null}
              </SlideIn>
            </div>
          </Section>
        );
      })}
    </>
  );
}
