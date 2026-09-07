import { ArrowButton } from "@/components/ui/ArrowButton";
import { ChannelGlyph } from "@/components/ui/Glyph";
import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { getChannels } from "@/content";
import { HERO_ARTIFACTS } from "@/content/contactArtifacts";
import { ContactArtifacts } from "@/sections/contact/ContactArtifacts";
import { SlideIn } from "@/components/ui/SlideIn";

/**
 * The top of the contact page: the ask, two ways to answer it, and the desk.
 *
 * **Two buttons, and both are `ArrowButton`.** The pair is the point: WhatsApp
 * is the fast one and email is the considered one, and a reader who has just
 * read "have a project, an idea, or just want to say hello" is choosing between
 * exactly those two moods, so the second one is drawn the other way round: a
 * white pill with the arrow in a black badge. Two black pills side by side give
 * a reader no idea which one the page would rather they pressed.
 *
 * **No label above the heading.** The drawing has a tape strip reading CONTACT
 * over it and the client cut those from every section on this page. The
 * masthead, the tab title and the h1 all say what this page is already.
 *
 * **`overflow-hidden` on the band, and it is not decoration.** The artwork
 * starts translated more than half its own width to the right, so between the
 * page loading and the arrival playing it sticks out past the sheet and the
 * document grows a horizontal scrollbar. Every other arrangement on this site
 * sits inside a clipped band for the same reason.
 *
 * The stroke under the accent is the site's own brush mark, tapered at both
 * ends, which a `border-bottom` cannot be. That taper is the whole difference
 * between a drawn mark and a rule.
 */
export function ContactHero() {
  const channels = getChannels();
  const whatsapp = channels.find((channel) => channel.icon === "whatsapp");
  const email = channels.find((channel) => channel.icon === "mail");

  return (
    <Section fill="overflow-hidden bg-board" padding="pb-14 pt-12 lg:pb-20 lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
        {/*
          The copy slides in from the left as the still life arrives from the
          right, at the client's ask: one side moving and the other simply
          there read as half a page.
        */}
        <SlideIn from="left" className="min-w-0">
          <h1 className="max-w-[13ch] font-display text-display-xl font-black text-ink">
            Let&apos;s create what&apos;s next{" "}
            {/*
              The stroke is inside the heading and wrapped around the accent
              rather than placed under the block, so it sits under the word it
              marks however the line happens to break. Set below the h1 it drew
              itself under whatever word started the last line, which on this
              measure was "next".
            */}
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

          {/*
            The invitation, and it promises nothing that has not been agreed.
            No response time, no free audit: a contact page is the worst place
            on a site to make a promise nobody has signed up to.
          */}
          <p className="mt-6 max-w-[38ch] text-lead text-ink-body">
            Have a project, an idea, or just want to say hello? We would love to hear from you.
          </p>

          {/*
            A column on a phone, a row from `sm`, and each button is the size
            of its own label at every width. Two other arrangements shipped
            first and the client rejected both: full width, and a pair matched
            to the wider label. His rule is that no button on this site is
            wider than what it says.
          */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            {whatsapp ? (
              <ArrowButton href={whatsapp.href} width="fit" external={whatsapp.external}>
                <span className="flex items-center gap-2.5">
                  <ChannelGlyph name="whatsapp" />
                  {whatsapp.action}
                </span>
              </ArrowButton>
            ) : null}

            {email ? (
              <ArrowButton href={email.href} width="fit" tone="light" external={email.external}>
                <span className="flex items-center gap-2.5">
                  <ChannelGlyph name="mail" />
                  {email.action}
                </span>
              </ArrowButton>
            ) : null}
          </div>
        </SlideIn>

        {/*
          **It runs off the right edge of the sheet**, which is what the client's
          drawing does and what stops the band reading as a photograph placed in
          a column. The negative margin cancels the container's own gutter, so
          the artwork ends where the paper does rather than where the text grid
          does.
        */}
        <ContactArtifacts pieces={HERO_ARTIFACTS} ratio={1.34} className="lg:-mr-16 xl:-mr-24" eager />
      </div>
    </Section>
  );
}
