import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HandAccent } from "@/components/ui/HandAccent";
import { getClientLogos } from "@/content";
import type { ClientLogo } from "@/content/types";

/**
 * Client proof: three rows of logo cards, each moving against the one above it.
 *
 * This replaces a hexagon wall with Kalaa's own mark fixed in the middle of it.
 * The wall had two problems. The mark is already in the masthead and the footer,
 * so a third copy at the centre of the client section put Kalaa's logo in the
 * one place the section exists to give to somebody else. And a hexagon crops a
 * logo from four directions at once: a wide wordmark either shrinks until it is
 * unreadable or runs into the angled sides.
 *
 * A rectangular card does not crop anything, which is why every site that shows
 * client logos uses one.
 *
 * The directions alternate, and that is the point of three rows rather than one
 * long track: rows moving the same way read as one block sliding, rows moving
 * against each other read as a wall that keeps producing more names.
 */
export function ClientLogos() {
  const logos = getClientLogos();

  if (logos.length === 0) {
    return null;
  }

  /*
    Dealt round rather than sliced into thirds, so the rows stay within one card
    of each other however many logos the content file holds. Slicing leaves the
    last row short by whatever the remainder happens to be.
  */
  const rows = [0, 1, 2].map((row) => logos.filter((_, index) => index % 3 === row));

  return (
    <Section id="clients" fill="bg-tint-sage" padding="py-12 sm:py-16 lg:py-20">
      <SectionHeading
        align="center"
        title={<>130+ clients, one innovative <HandAccent wrap>line of work</HandAccent></>}
        lead="From first posts to full campaigns, Kalaa keeps brands visible where their customers already spend time."
      />

      {/*
        On the rail, the same one the heading starts from.

        The first version ran the rows full bleed to the sheet edges, on the
        argument that a row which stops has two hard edges where cards appear
        and vanish. That argument was wrong about which problem is worse. A
        heading beginning at the gutter above cards beginning 110px further left
        is a broken boundary, and the eye reads it as a mistake immediately,
        while a faded edge inside the rail reads as a row carrying on.

        `overflow-hidden` here rather than on the section band, because the
        track is three copies wide and has to be cut at the rail, not at the
        sheet. Without it the section's own clip would let the cards back out
        past the gutter, which is the bug this comment exists to prevent
        somebody reintroducing.
      */}
      <div className="logo-row-mask mt-9 grid gap-4 overflow-hidden sm:mt-12 sm:gap-5">
        {rows.map((rowLogos, row) => (
          <LogoRow key={row} logos={rowLogos} direction={row % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </Section>
  );
}

/**
 * One row.
 *
 * Three copies of the same list, not two. The track slides by exactly one copy,
 * so the second arrives where the first began and the loop has no seam; the
 * third is what keeps a card under the right-hand edge of a wide screen at the
 * moment the track resets. Two copies is enough on a laptop and shows an empty
 * strip on a 1920 monitor, which is the kind of bug that only ever appears on
 * somebody else's machine.
 *
 * Only the first copy is read: the other two are `aria-hidden`, so a screen
 * reader hears the client list once rather than three times.
 */
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
      {[0, 1, 2].map((copy) => (
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
                /*
                 * Lazy, and it used to be eager. The band sits about 2,200px
                 * down the page, and every logo in it is duplicated across
                 * three copies of the row to make the ticker seamless, so eager
                 * meant several dozen image requests competing with the first
                 * paint for a section nobody has scrolled to yet. Browsers load
                 * lazy images on a generous margin rather than at the edge of
                 * the viewport, so these still arrive before they are needed.
                 */
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
