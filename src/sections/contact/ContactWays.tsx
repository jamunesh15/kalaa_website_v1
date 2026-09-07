import { ArrowButton } from "@/components/ui/ArrowButton";
import { ChannelGlyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { HandAccent } from "@/components/ui/HandAccent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideIn } from "@/components/ui/SlideIn";
import { getChannels } from "@/content";

/**
 * The three ways in, side by side, each with its own button.
 *
 * **Buttons, not underlined links.** The client's drawing has an underlined
 * value with an arrow after it and the client corrected that to controls: an
 * underline is a link inside a paragraph, and these are the actions the page
 * exists for.
 *
 * **The order is WhatsApp, email, phone, which is not the order the content
 * module holds them in.** That list is ordered as a stranger would pick one and
 * the footer prints it that way. Here the drawing leads with WhatsApp, and it
 * is right to: it is the fastest of the three for this business and the
 * shortest thing a reader has to commit to. Ordered explicitly rather than by
 * reordering the module, so the footer does not change under a decision made
 * about this page.
 *
 * The circles are three different tints, and that is rhythm rather than
 * meaning. Nothing on this site encodes information in which colour something
 * happens to be: a reader cannot learn a code they were never shown.
 */
const ORDER = ["whatsapp", "mail", "phone"] as const;

const TINTS: Record<string, string> = {
  whatsapp: "bg-tint-sage",
  mail: "bg-tint-peach",
  phone: "bg-tint-violet",
};

export function ContactWays() {
  const channels = getChannels();
  const ordered = ORDER.map((icon) => channels.find((channel) => channel.icon === icon)).filter(
    (channel) => channel !== undefined,
  );

  return (
    <Section fill="overflow-hidden">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/*
          Narrowed so it breaks after "way", which is how the client's drawing
          sets it. Left to the column it runs on one line and the block reads as
          a sentence rather than as a heading.

          **`rem`, not `ch`.** `ch` resolves against the element it is set on,
          and this wrapper inherits body size while the heading inside it is
          display size, so `max-w-[15ch]` came out around 130px and broke the
          line into four.
        */}
        <SectionHeading
          title={
            <>
              Reach us <HandAccent>however you like</HandAccent>.
            </>
          }
          className="lg:max-w-[26rem]"
        />

        {/*
          The written line sits opposite the heading rather than under it. It is
          an aside in the client's own voice, and set under the heading it would
          read as the section's subtitle, which is a different and more
          important thing than it is.
        */}
        <div className="lg:pb-2 lg:text-right">
          <p className="max-w-[24ch] font-hand text-[1.4rem] leading-snug text-ink-sage lg:ml-auto">
            Different ways. Same open conversation.
          </p>

          {/*
            The brush mark under it, tapered at both ends, which a
            `border-bottom` cannot be. That taper is the whole difference
            between a drawn mark and a rule, and the drawing has one here.
          */}
          <svg
            aria-hidden
            viewBox="0 0 200 10"
            preserveAspectRatio="none"
            className="mt-2 h-2 w-40 text-ink-sage lg:ml-auto"
          >
            <path d="M2 7C40 2 120 1 198 4C120 8 40 9 2 7Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/*
        Divided by rules rather than boxed as cards. Three cards here would be
        the fourth card treatment on this site and would say these are three
        products; a rule says they are three doors into the same room. The rule
        is on the left of each column and only from `sm`, because stacked it
        would separate nothing.
      */}
      {/*
        **No rules between the columns.** They were there to say "three doors
        into the same room" rather than "three products", and the client cut
        them: three headings with space around them say it without drawing a
        line, and those lines were the only vertical strokes on the page.

        Each column arrives from the side it sits on, so the row assembles
        outwards rather than appearing all at once.
      */}
      <ul className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {ordered.map((channel, index) => (
          /*
            The `li` stays and the arrival goes inside it. A `ul` whose children
            are divs is not a list to anything that reads structure, and the
            motion wrapper is a div.
          */
          <li key={channel.label} className="min-w-0">
            <SlideIn from={index === 2 ? "right" : "left"} delay={index * 0.08}>
            <span
              aria-hidden
              className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-ink ${
                TINTS[channel.icon]
              }`}
            >
              {/*
                30px inside a 72px circle. At the glyph's default 18 the mark
                sat in the middle of a lot of tint and read as a bullet rather
                than as an icon, which is what the client meant by everything
                looking small.
              */}
              <ChannelGlyph name={channel.icon} size={30} />
            </span>

            <h3 className="mt-6 font-display text-display-m font-bold text-ink">{channel.label}</h3>
            <p className="mt-2 max-w-[30ch] text-body text-ink-body">{channel.blurb}</p>

            {/*
              `ArrowButton`, the site's own control: a black pill with the arrow
              in a white badge that swipes across on hover. The flat arrow this
              replaced was a second button treatment invented for one page.

              **Base size, the same as the two in the opening band.** These were
              `sm` and the page then had two button heights in three screens,
              which reads as one of them being more important than the other.
              Every control on this page is one thickness.

              The address and the number used to sit under it. The client cut
              them: both are in the footer on every page, and a value printed
              under a button that already performs it is the same fact twice.
            */}
            <div className="mt-6">
              <ArrowButton href={channel.href} width="fit" external={channel.external}>
                {channel.action}
              </ArrowButton>
            </div>
            </SlideIn>
          </li>
        ))}
      </ul>
    </Section>
  );
}
