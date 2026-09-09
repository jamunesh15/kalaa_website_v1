import { getFaqItems } from "@/content";
import { About } from "@/sections/home/About";
import { Capabilities } from "@/sections/home/Capabilities";
import { ClientLogos } from "@/sections/home/ClientLogos";
import { Faq } from "@/sections/home/Faq";
import { Hero } from "@/sections/home/Hero";
import { Impact } from "@/sections/home/Impact";
import { Pricing } from "@/sections/home/Pricing";
import { Posts } from "@/sections/home/Posts";
import { Process } from "@/sections/home/Process";
import { Reels } from "@/sections/home/Reels";
import { ClosingCta } from "@/sections/shared/ClosingCta";
import { Services } from "@/sections/home/Services";
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
      <Reels />
      <Posts />

      <Process />
      <Impact />
      <Pricing />
      <Faq />

      <ClosingCta />
    </>
  );
}
