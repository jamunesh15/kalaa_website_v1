import { Section } from "@/components/ui/Section";
import { HandAccent } from "@/components/ui/HandAccent";
import { ImpactCards, ImpactNote } from "@/sections/home/ImpactArtifacts";

/**
 * What the work actually did, as four numbers on paper.
 *
 * It sits between the process and the pricing, which is where the client asked
 * for it and is also the right place: a reader has just been shown how the work
 * is made and is about to be shown what it costs, and this is the answer to the
 * question that sits between those two.
 *
 * **The figures live in the artwork, not in this file.** Each card is a picture
 * carrying its own number and label, so the words a reader sees are inside the
 * image and the alt text in `impactArtifacts.ts` is the only other place they
 * exist. Nothing here can be edited to change 3.6X into anything else; that
 * takes new artwork.
 *
 * **The band is `--tint-mist`, an exact value the client gave: 239,241,236.**
 * Two other fields were tried on the way to it. Butter at 40 percent, on the
 * reasoning that these cards are cream paper and cream on a cool field reads as
 * pasted on, which is the fault the about section was rejected for twice; that
 * reasoning holds in general and does not bite here, because the cards carry
 * their own drop shadow and a torn colour edge, so they sit on the field rather
 * than float on it. Then cloud, which is the nearest thing the palette already
 * had and is wrong by eight points of blue: it leans cool and greys the sage in
 * the artwork, where this leans green and agrees with it.
 *
 * **Process directly above this is also cloud, at full strength.** Two bands of
 * one colour with nothing between them read as a single very long section, and
 * the seam a reader uses to tell one from the next is gone. It is left as the
 * client asked for; if it needs a seam, move `Process` to another tint rather
 * than paling this one. A faded version of the colour above is the fault this
 * section already fixed once in the about band: it does not read as two
 * sections, it reads as one that lost its colour.
 */
export function Impact() {
  return (
    <Section id="impact" fill="overflow-hidden bg-tint-mist" padding="py-14 sm:py-20 lg:py-24">
      <div className="grid gap-12 xl:grid-cols-[0.86fr_1.14fr] xl:items-center xl:gap-14">
        <div className="min-w-0 text-center xl:text-left">
          {/*
            The eyebrow and its short rule are gone, cut by the client across
            the site. The reference this band came from has one; this site now
            has none anywhere, which is the stronger position for it.
          */}
          {/*
            **"You can see" is set in the display face, not in handwriting.**
            The client's reference draws it as green script, and matching that
            means a third webfont bought for four words. This project ships two
            faces on purpose, both self-hosted, and the note artifact directly
            below is handwriting, so the voice is already in the composition
            without a font request to pay for it. The colour and the brush rule
            under it carry the same emphasis the script was doing.

            The marker on the hero is yellow and stays the hero's alone, which
            is why this is sage rather than accent.

            **`--ink-sage`, never `--tint-sage`.** The tint is a background at
            #dcebe5 and measured 1.1:1 on this band, so the phrase rendered as
            a pale ghost of itself; the frame sage is barely better at 2.5:1.
            The new token is the same hue taken down to 5.34:1. See the note
            beside it in `tokens.css`.

            **The accent phrase is set in the hand**, which is the third face
            this site now carries and the reason it carries one. An earlier pass
            set it in the display face on the argument that two faces was the
            rule; on screen that reads as a coloured phrase rather than as a
            different voice, and the note artifact directly below it is
            handwriting, so the section had one hand in the artwork and none in
            the type. See `fonts.ts` for what was weighed.

            A size bump comes with the face. Kalam's lowercase sits noticeably
            smaller than Satoshi's at the same point size, so matched on paper
            it reads as a smaller line rather than as the same line in another
            hand.
          */}
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

        {/*
          `min-w-0`. A grid item defaults to `min-width: auto` and refuses to
          shrink below its contents, which drags the copy column wide with it.
          That failure has been reported twice on this site as "the section is
          cut off".
        */}
        <div className="relative min-w-0">
          {/*
            Handwriting, matching the reference and the note artifact in the
            other column. `text-small` rather than `text-body` because Kalam
            runs small for its point size, so this lands at the same optical
            weight as body copy set in Switzer.
          */}
          <p className="mx-auto mb-6 max-w-[30ch] text-center font-hand text-[1.35rem] leading-snug text-ink xl:mx-0 xl:text-left">
            When strategy meets consistency, this is what happens.
          </p>
          <ImpactCards />

          {/*
            The hand-drawn arrow, pointing from the copy into the results.

            **Inline SVG rather than another artifact file.** It is two paths,
            it has to take its colour from the page rather than from a baked
            PNG, and at this size an image of a hairline is a picture of a
            hairline: it goes soft on a 2x screen and it is another request. The
            wobble in the curve is in the control points rather than in a filter.

            It only exists from `xl`, which is where the two columns sit side by
            side and the gap it points across exists. Below that the columns
            stack and an arrow pointing right points at the edge of the screen.

            `aria-hidden`, because it is a direction rather than information.
          */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            fill="none"
            className="pointer-events-none absolute -left-24 top-16 hidden h-28 w-28 text-ink xl:block"
          >
            {/*
              One long S rising left to right, drawn as two cubics that share a
              tangent at the middle so the join does not read as a corner. A
              first pass used a tighter curve with more wiggle in it and came
              back looking like a scribble: at this size the eye reads the
              overall sweep, not the wobble, and anything under about a 40 unit
              radius turns into noise.
            */}
            <path
              d="M4 96C26 90 30 62 52 52c22-10 26-30 42-42"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            {/*
              The head, as an open V rather than a filled triangle, so it reads
              as drawn with the same pen as the line.

              **Its barbs are set from the curve's exit angle, not from the
              axes.** The path leaves at 45 degrees up and right, so a head
              built from a horizontal and a vertical arm puts one of them along
              the line it is supposed to cap; on screen that arm disappeared
              into the curve and what was left read as a tick. These sit 25
              degrees either side of the reverse direction.
            */}
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
