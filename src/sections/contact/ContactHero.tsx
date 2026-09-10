import { ArrowButton } from "@/components/ui/ArrowButton";
import { ChannelGlyph } from "@/components/ui/Glyph";
import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { getChannels } from "@/content";
import { HERO_ARTIFACTS } from "@/content/contactArtifacts";
import { ArtifactStage } from "@/components/ui/ArtifactStage";
import { CONTACT_MEDIA } from "@/content/contactMedia";
import { SlideIn } from "@/components/ui/SlideIn";

/* The top of the contact page: the ask, two ways to answer it, and the desk. */
export function ContactHero() {
  const channels = getChannels();
  const whatsapp = channels.find((channel) => channel.icon === "whatsapp");
  const email = channels.find((channel) => channel.icon === "mail");

  return (
    <Section fill="overflow-hidden bg-board" padding="pb-14 pt-12 lg:pb-20 lg:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-8 lg:gap-10">
        {/* The copy slides in from the left as the still life arrives from the right, at the client's ask: one side moving and the. */}
        <SlideIn from="left" className="min-w-0">
          <h1 className="max-w-[13ch] font-display text-display-xl font-black text-ink">
            Let&apos;s create what&apos;s next{" "}
            {/* The stroke is inside the heading and wrapped around the accent rather than placed under the block, so it sits under the. */}
            <span className="inline-block">
              <HandAccent wrap>together</HandAccent>
              <svg
                aria-hidden
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="mt-1 block h-2 w-full text-ink-sage"
              >
                <path d="M2 7C40 2 120 1 198 4C120 8 40 9 2 7Z" fill="currentColor" />
              </svg>
            </span>
          </h1>

          {/* The invitation, and it promises nothing that has not been agreed. */}
          <p className="mt-6 max-w-[38ch] text-lead text-ink-body">
            Have a project, an idea, or just want to say hello? We would love to hear from you.
          </p>

          {/* A column on a phone, a row from `sm`, and each button is the size of its own label at every width. */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            {whatsapp ? (
              <ArrowButton href={whatsapp.href} width="fit" external={whatsapp.external}>
                <span className="flex items-center gap-2.5">
                  <ChannelGlyph name="whatsapp" size={22} />
                  {whatsapp.action}
                </span>
              </ArrowButton>
            ) : null}

            {email ? (
              <ArrowButton href={email.href} width="fit" tone="light" external={email.external}>
                <span className="flex items-center gap-2.5">
                  <ChannelGlyph name="mail" size={20} />
                  {email.action}
                </span>
              </ArrowButton>
            ) : null}
          </div>
        </SlideIn>

        {/* It runs off the right edge of the sheet, which is what the client's drawing does and what stops the band reading as a. */}
        <ArtifactStage media={CONTACT_MEDIA} pieces={HERO_ARTIFACTS} ratio={1.34} className="lg:-mr-16 xl:-mr-24" eager />
      </div>
    </Section>
  );
}
