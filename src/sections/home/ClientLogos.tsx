import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getClientLogos } from "@/content";
import { OffscreenPause } from "@/motion/OffscreenPause";
import type { ClientLogo } from "@/content/types";

/* Client proof: three rows of logo cards, each moving against the one above it. */
export function ClientLogos() {
  const logos = getClientLogos();

  if (logos.length === 0) {
    return null;
  }

  /* Dealt round rather than sliced into thirds, so the rows stay within one card of each other however many logos the. */
  const rows = [0, 1, 2].map((row) => logos.filter((_, index) => index % 3 === row));

  return (
    <Section id="clients" fill="bg-tint-sage" padding="py-12 sm:py-16 lg:py-20">
      <SectionHeading
        align="center"
        title={<>130+ clients, one innovative <HandAccent wrap>line of work</HandAccent></>}
        lead="From first posts to full campaigns, Kalaa keeps brands visible where their customers already spend time."
      />

      {/* On the rail, the same one the heading starts from. */}
      <OffscreenPause className="logo-row-mask mt-9 grid gap-4 overflow-hidden sm:mt-12 sm:gap-5">
        {rows.map((rowLogos, row) => (
          <LogoRow key={row} logos={rowLogos} direction={row % 2 === 0 ? "left" : "right"} />
        ))}
      </OffscreenPause>
    </Section>
  );
}

/* One row. */
function LogoRow({
  logos,
  direction,
}: {
  logos: readonly ClientLogo[];
  direction: "left" | "right";
}) {
  if (logos.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex w-max ${direction === "left" ? "logo-row-left" : "logo-row-right"}`}
    >
      {/* Two copies, paired with `-50%` in the keyframe. See the note there. */}
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy > 0 || undefined}
          className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5"
        >
          {logos.map((logo) => (
            <li
              key={`${copy}-${logo.image}`}
              className="flex h-24 w-44 shrink-0 items-center justify-center rounded-token bg-surface px-6 shadow-soft sm:h-28 sm:w-52"
            >
              <Image
                src={logo.image}
                alt={copy === 0 ? logo.name : ""}
                width={logo.width}
                height={logo.height}
                sizes="(max-width: 640px) 11rem, 13rem"
                /* Lazy, and it used to be eager. */
                loading="lazy"
                className="max-h-14 w-auto max-w-full object-contain sm:max-h-16"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
