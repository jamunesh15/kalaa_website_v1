import type { SVGProps } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Section } from "@/components/ui/Section";
import { getAboutPillars } from "@/content";
import { AboutArtifacts } from "@/sections/home/AboutArtifacts";
import { HandAccent } from "@/components/ui/HandAccent";
import { AboutCopy } from "@/sections/home/AboutCopy";

/**
 * About Kalaa, as the client's own board.
 *
 * The artwork is the section, and it is ten separate objects rather than one
 * picture of a desk: the plan sheet, two posts, two notes, the content pillars,
 * the swatches, a still life and a month of checked-off work, each arriving
 * from the edge nearest where it lands. `AboutArtifacts` holds the motion and
 * `aboutArtifacts.ts` holds the coordinates. Kalaa's product is imagery, so an
 * about section that describes the work in prose while the work itself sits in
 * a folder is the weaker version of this page.
 *
 * **No marked word in this heading.** The butter marker is the hero's device
 * and it is spent on one word there. A second one two sections down stops being
 * the mark on the headline and becomes a highlighter the site reaches for, and
 * the accent is meant to be spent once as a field at the closing ask anyway.
 *
 * The copy beside it therefore stays short. Four words with one line each, not
 * four paragraphs. Anything longer competes with a picture it cannot win
 * against.
 *
 * The band is sky, at the client's instruction.
 */

/**
 * **Sky was rejected here once and is back because the client asked for it back
 * after seeing the alternative.** Read this before changing it again.
 *
 * The recorded objection was that a cool blue field under cream paper split the
 * section into two worlds, cool on the left and warm on the right, with nothing
 * joining them. That objection was raised against the twelve-piece board, where
 * the artifacts were small and scattered and the field was most of what the eye
 * saw. The board is now six large objects covering far more of the column, so
 * there is less bare field for the split to happen across. Whether that is
 * enough is the client's call and the client has made it.
 *
 * The other constraint still stands and is not a preference: cream paper on a
 * saturated band reads as cutouts pasted onto it, which got this section
 * rejected twice, once as "colours mismatched" and once as "everything
 * floating". The sky tint is pale enough at full strength to stay on the right
 * side of that. If it ever looks pasted rather than laid down, take the field
 * down toward `bg-tint-sky/55` rather than reaching for a different colour.
 *
 * Two other fields have been through here. Sage at 55 percent was correct until
 * the hero directly above settled on sage at full strength: two sage bands in a
 * row, one of them faded, does not read as two sections, it reads as the hero
 * losing its colour. Butter at 40 percent solved that warm, and was replaced by
 * this.
 */
export function About() {
  const pillars = getAboutPillars();

  return (
    <Section id="about" fill="overflow-hidden bg-tint-sky" padding="py-12 sm:py-16 lg:py-14">
      <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-stretch xl:gap-6">
        {/*
          The copy column spans the board rather than sitting centred against
          it, and the two now start and finish on the same line. Centred, about
          600px of copy against an 879px board left a hole above the label that
          read as a section that had failed to load; top-aligned put the same
          hole under the button. Neither is fixable from one side, so the board
          came down to roughly square and this column stretches to meet it.
        */}
        <AboutCopy>
          {/* The section eyebrow is gone, cut by the client across the site. */}
          <div className="max-w-3xl">
            {/*
              **No accent marker here. The yellow is the hero's alone.** This
              heading carried one on "real growth." and the client's instruction
              is that the colour is reserved for the first screen. A marker that
              appears on two headings is not a marker, it is a heading style,
              and the one on the hero stops meaning anything the moment a second
              one exists. Plain ink, and the size does the emphasis.

              Two lines, at the same instruction, and it cost words rather than
              a measure. The copy column is 412px at 1440 and this sets at 40px,
              where "We turn what your business has into" measures 643px: the
              old sentence could not break in two at any `max-w` because half of
              it did not fit on a line. Shortened, it sets 396px and 292px and
              breaks itself.

              A measure rather than a `<br />`, because this column narrows
              through four breakpoints and a forced break cannot follow it down.
              `26ch` is wider than the column at every one of them, so the column
              is what decides; it is here to stop the heading running long if
              this section is ever given a wider one.
            */}
            <h2 className="mx-auto max-w-[26ch] font-display text-display-l font-bold text-ink xl:mx-0">
              We turn your business into <HandAccent>real growth.</HandAccent>
            </h2>
            {/*
              Shortened from "Your story, your products and your customers. We
              shape them into content and campaigns that people notice, remember
              and act on." Twenty-two words set three long lines against a
              heading of three short ones, and the column read as a paragraph
              with a title rather than as a statement. The cut is words, not
              measure: narrowing `max-w` would have made the same sentence four
              lines instead of three.
            */}
            <p className="mx-auto mt-5 max-w-[38ch] text-lead text-ink-body xl:mx-0">
              Your story, your products, your customers. We turn them into
              content people notice and act on.
            </p>
          </div>

          {/*
            Two columns on a phone rather than four, because four titles as long
            as "Distribution" in a 375px row leave a column about 80px wide and
            every one of them wraps.

            Four the rest of the way up, which is only possible because the two
            column layout starts at `xl` and not at `lg`. Tried at `lg` and
            measured: a 1024px screen gives the copy column 345px, so a cell is
            86px and the four lines run to 3, 3, 3 and 4. Dropping to two by two
            there fixed the wrap and made the copy column 200px taller than the
            board beside it, which put the hole back under the artwork. Stacking
            until 1280 fixes both: the copy gets the full rail, four fit across
            it at one line each, and the board gets the full rail under it.
          */}
          {/*
            No rules at all now, horizontal or vertical, and both went at the
            client's instruction.

            **The vertical ones came out because the row has no width to spare
            and they were the only thing that could give.** The ask was for
            space between these four, and the obvious answer, more padding in
            each cell, is not available: measured at 1440, the strip is 438px,
            so a cell is 109px, and "Distribution" sets 93px of that. There are
            eight pixels of slack in the whole column. Four more per side and
            the longest title wraps, which is the fault the four-across layout
            exists to avoid and is why it does not start until `xl`.

            The other ways to buy the space all cost more than they are worth.
            Widening the copy column to 0.86fr takes 85px off the board, which
            undoes the enlargement the artifacts were just given. Dropping the
            titles to `text-small` frees thirteen pixels and leaves the row
            still tight. So the rules went instead, and what actually read as
            cramped was the rules sitting a few pixels off the words rather than
            the words being close to each other.

            The horizontal hairline above the row went earlier, the same way. It
            had gone in because the client's reference has one drawn exactly
            that way, and the original argument against it turned out to be the
            right one: a full-width rule draws a lid over four things standing
            side by side and turns them into a panel hanging off the paragraph.

            **The band around this row is 48px on both sides, and getting there
            meant deleting the rule's leftovers.** `pt-9` existed to hold the
            row clear of the hairline above it. With the hairline gone it was
            just padding stacked on the `mt-12` margin, and the two measured
            84px above the row against 40px below: the group read as belonging
            to the button rather than sitting between two things. One margin
            now, matched by the button's own.

            That spacing is what tells a reader the sentence has finished and
            something of a different kind starts here, which was the job the
            rules were doing.
          */}
          <ul className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            {pillars.map((pillar) => {
              const Icon = ICONS[pillar.icon];
              return (
                /*
                  Left aligned, not centred, and it is the column that decides
                  rather than the row.

                  Everything else down this column starts on the same 40px edge:
                  the label, the heading, the paragraph, the button. These four
                  were centred inside their own cells, so the icon landed 27px
                  in and each title started somewhere different depending on how
                  long the word was. Measured, "Strategy" and "Distribution" did
                  not begin in the same place as each other, let alone as the
                  sentence above them.

                  It also puts each icon over its own word instead of over the
                  middle of an invisible cell, which is what makes the disc read
                  as belonging to the label under it.

                  `px-1` went with the centring. A left edge is only an edge if
                  nothing is nudging it, and four pixels of padding on a cell
                  that starts the column is four pixels of misalignment.
                */
                /*
                  Below `xl` the whole column is centred at the client's ask,
                  these four with it: a centred heading over four left-set
                  cells reads as two sections. The left edge argument above
                  is about the two-column layout, where it still holds.
                */
                <li key={pillar.title} className="min-w-0 text-center xl:pr-3 xl:text-left">
                  {/*
                    The disc is a tint of the frame sage over the band, not white.
                    White on `--tint-sage` reads lighter than the field it sits
                    in, so four of them punched holes in the band and pulled the
                    eye before the words did. A tint of the same hue sits back
                    and lets the glyph carry the contrast.
                  */}
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-page/20 text-ink xl:mx-0">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-4 text-body font-bold text-ink">{pillar.title}</p>
                  <p className="mt-1 text-small text-ink-body">{pillar.line}</p>
                </li>
              );
            })}
          </ul>

          {/*
            `fit`, and no `max-w`. This button stands alone, so the fixed 17rem
            it used to be given only decided how much empty black sat between
            the label and the badge.
          */}
          <div className="mt-12 flex justify-center xl:justify-start">
            <ArrowButton href="/contact" width="fit">
              Let&apos;s grow together
            </ArrowButton>
          </div>
        </AboutCopy>

        {/*
          `min-w-0` again. A grid item defaults to `min-width: auto` and refuses
          to shrink below its content, which drags the copy column wide with it.
        */}
        {/*
          Two bleeds, and both written as arbitrary min-widths on purpose.
          Tailwind orders a named variant after an arbitrary one regardless of
          which is wider, so `xl:-mr-5` beside `min-[1400px]:-mr-13` leaves the
          20px bleed winning at 1440 and the wider rule dead. Measured: the
          board stayed 798px. Same variant kind for both and they sort by width.

          The amounts are what the section can give away without clipping. Below
          1336 the container has not hit its cap, so the only slack is the 20px
          gutter. Above 1400 the cap leaves the centring margin as well, and 52px
          is what fits at 1400 with the board still inside the band.
        */}
        {/*
          The board is dropped a little against the copy beside it, and only at
          `xl` where the two are actually side by side.

          Both columns start on the section's top edge, but they do not start on
          the same THING: the copy opens with a small uppercase label and the
          board opens with the top edge of a large sheet. Flush, the sheet reads
          as higher than the heading it sits beside, because a label is a much
          lighter object than a sheet of paper and the eye lines up the weight
          rather than the boxes. The offset puts the sheet's top nearer the
          heading's cap line.

          Padding rather than a margin, so the column's grid cell keeps its full
          height and `items-stretch` still has something to stretch. A margin
          shortens the cell and the row height goes with it.
        */}
        <div className="min-w-0 min-[1280px]:-mr-5 min-[1280px]:w-[calc(100%+1.25rem)] min-[1280px]:pt-12 min-[1400px]:-mr-13 min-[1400px]:w-[calc(100%+3.25rem)]">
          <AboutArtifacts />
        </div>
      </div>
    </Section>
  );
}

/**
 * Four line glyphs, drawn rather than imported.
 *
 * They are the same stroke weight and the same 24 unit box, so the four badges
 * are one set rather than four icons that happen to sit in a row. A pack would
 * bring its own weights and its own corner radii into a project that has one of
 * each.
 */
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
