import { ArrowButton } from "@/components/ui/ArrowButton";
import { PinGlyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideIn } from "@/components/ui/SlideIn";
import { getStudio } from "@/content";

/**
 * Where Kalaa is, with a map beside it.
 *
 * **The map is queried by address, not pinned by coordinate.** The only
 * latitude and longitude anyone has belongs to the previous office, and a pin
 * invented for this one would be a false statement drawn on a map. The embed
 * asks Google for the address and shows whatever Google holds for it, which is
 * a claim Google is making rather than one this site is. Swap the query for a
 * pinned coordinate the day somebody sends the real one.
 *
 * `loading="lazy"` because it is the heaviest thing on the page and it is at
 * the bottom of it: an iframe that loads on arrival costs the reader a third
 * party's whole map stack before they have scrolled to it.
 *
 * **A button, not an underlined link.** The client corrected that across this
 * page: an underline is a link inside a paragraph, and this is the action the
 * section is for.
 *
 * This is also the only place on the site that says where Kalaa is, which makes
 * it the page that answers "social media marketing agency in Surat".
 */
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

          {/*
            Centred below `md` with the heading above it, at the client's ask;
            the button under it follows. Side by side with the map the column
            has its own left edge again.
          */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-4 md:text-left">
            <span aria-hidden className="flex h-7 shrink-0 items-center text-ink-sage">
              <PinGlyph />
            </span>

            {/*
              Two lines here, not the three the footer sets. The client asked
              for it wrapped, and this column is wide enough to carry the
              second and third together: the footer column is not, which is
              why the content module keeps them as three and each page joins
              them the way its own measure allows.
            */}
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
          {/*
            The written mark over the map, which the drawing has beside it. It
            is `lg` only: stacked, the map is directly under the address and the
            line has nothing to point at.
          */}
          <div className="mb-3 hidden items-end justify-end gap-2 lg:flex">
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

          {/*
            The frame carries the site's one corner and its soft shadow, and the
            iframe is `block` inside it: an inline frame sits on the text
            baseline and leaves a few pixels of its own background under itself,
            which reads as a misaligned edge on a rounded card.
          */}
          {/*
            **The map is mounted rather than dropped in.** It sat as a single
            hairline frame and read as isolated, which is what a bright white
            rectangle does on a pale sheet: nothing about it belonged to the
            page around it. It is matted now, a sage border of its own with the
            map inset in it, the way a picture is framed. That band of colour is
            what ties it to the rest of the section.

            **The frame is styled; the map inside it cannot be.** It is a
            third-party document, so nothing on this page can reach its colours.
            What a parent CAN do is filter the rendered frame, and a small
            desaturation with a touch of contrast takes Google's blue and its
            signage down toward this site's palette without making the streets
            unreadable.
          */}
          <div className="rounded-token bg-tint-sage p-2 shadow-soft">
            <div className="map-frame overflow-hidden rounded-token border-token border-ink/10">
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
