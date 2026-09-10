import { ArrowButton } from "@/components/ui/ArrowButton";
import { ChannelGlyph } from "@/components/ui/Glyph";
import { Section } from "@/components/ui/Section";
import { HandAccent } from "@/components/ui/HandAccent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideIn } from "@/components/ui/SlideIn";
import { getChannels } from "@/content";

/* The three ways in, side by side, each with its own button. */
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
        {/* Narrowed so it breaks after "way", which is how the client's drawing sets it. */}
        <SectionHeading
          title={
            <>
              Reach us <HandAccent>however you like</HandAccent>.
            </>
          }
          className="lg:max-w-[26rem]"
        />

        {/* The written line sits opposite the heading rather than under it. */}
        <div className="lg:pb-2 lg:text-right">
          <p className="max-w-[24ch] font-hand text-[1.4rem] leading-snug text-ink-sage lg:ml-auto">
            Different ways. Same open conversation.
          </p>

          {/* The brush mark under it, tapered at both ends, which a `border-bottom` cannot be. */}
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

      {/* Divided by rules rather than boxed as cards. */}
      {/* No rules between the columns. */}
      {/* `items-stretch` so every column is the height of the tallest, which is
          what lets each button sit on one line at the foot of its own column. */}
      <ul className="mt-10 grid items-stretch gap-10 sm:grid-cols-3 sm:gap-8">
        {ordered.map((channel, index) => (
          /* The `li` stays and the arrival goes inside it. */
          <li key={channel.label} className="min-w-0">
            <SlideIn from={index === 2 ? "right" : "left"} delay={index * 0.08} className="flex h-full flex-col">
            <span
              aria-hidden
              className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-ink ${
                TINTS[channel.icon]
              }`}
            >
              {/* 30px inside a 72px circle. */}
              <ChannelGlyph name={channel.icon} size={30} />
            </span>

            <h3 className="mt-6 font-display text-display-m font-bold text-ink">{channel.label}</h3>
            <p className="mt-2 max-w-[30ch] text-body text-ink-body">{channel.blurb}</p>

            {/*
             * `mt-auto`, so the three buttons line up.
             *
             * They used to sit `mt-6` under their own paragraph, and the three
             * blurbs run to two, three and two lines, so the buttons landed at
             * three different heights and the row read as broken.
             */}
            {/* `ArrowButton`, the site's own control: a black pill with the arrow in a white badge that swipes across on hover. */}
            <div className="mt-auto pt-6">
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
