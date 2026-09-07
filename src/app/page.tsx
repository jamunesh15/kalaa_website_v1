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

/* The landing page, as a running order and nothing else. */

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
