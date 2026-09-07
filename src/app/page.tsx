import { getFaqItems } from "@/content";
import { About } from "@/sections/home/About";
import { Capabilities } from "@/sections/home/Capabilities";
import { ClientLogos } from "@/sections/home/ClientLogos";
import { ClosingCta } from "@/sections/home/ClosingCta";
import { Faq } from "@/sections/home/Faq";
import { Hero } from "@/sections/home/Hero";
import { Impact } from "@/sections/home/Impact";
import { Pricing } from "@/sections/home/Pricing";
import { Process } from "@/sections/home/Process";
import { Services } from "@/sections/home/Services";
import { Work } from "@/sections/home/Work";
import { JsonLd } from "@/seo/JsonLd";
import { faqPage, siteGraph } from "@/seo/graph";

/**
 * The landing page, as a running order and nothing else.
 *
 * Each section is one file under `src/sections/home/` and one line here. This
 * file never holds markup. The previous build of this site put seventeen
 * sections in one file and it ran to 1,323 lines.
 *
 * The order is an argument: what you get, what we do, what we have made, how it
 * runs, what it costs, who it is for, then the ask. Changing the order changes
 * what the page says.
 *
 * Work sits before Process, so the proof arrives before the method. A reader
 * shown how the month runs before they have seen anything Kalaa made is being
 * asked to care about process on trust.
 *
 * **Process is on the sheet rather than on white, and that is a consequence of
 * the move rather than a separate decision.** Work and Process were both pure
 * white, and putting them next to each other erased the boundary between them:
 * the mosaic stopped and a field of white ran on into the next heading, which
 * reads as a section the design forgot rather than as two sections. Work keeps
 * white, because the artwork is the thing that has to lift.
 *
 * **Sectors is gone, removed at the client's instruction.** It listed the trades
 * Kalaa works with as a scrolling row under a "Who we work with" heading. Worth
 * knowing what left with it, in case the question comes back: it was the only
 * place on the page that answered the one the work mosaic raises, which is
 * whether a reader's own trade is in there. Nothing answers that now. The
 * files are not in git, so a copy went to the session scratchpad rather than
 * being deleted outright.
 *
 * Pricing sits after Process and before the ask on purpose. A price read before
 * anybody knows what the month contains is a number with nothing behind it; read
 * straight after the five steps it is a number attached to the work just
 * described, and the closing ask then follows it immediately.
 *
 */

export default function Home() {
  return (
    <>
      <JsonLd data={siteGraph(faqPage(getFaqItems()))} />

      <Hero />
      <About />
      <Services />
      <ClientLogos />
      <Capabilities />
      <Work />

      <Process />
      <Impact />
      <Pricing />
      <Faq />

      <ClosingCta />
    </>
  );
}
