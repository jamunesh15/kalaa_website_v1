import { getFaqItems } from "@/content";
import { About } from "@/sections/home/About";
import { Capabilities } from "@/sections/home/Capabilities";
import { ClientLogos } from "@/sections/home/ClientLogos";
import { Faq } from "@/sections/home/Faq";
import { Hero } from "@/sections/home/Hero";
import { Impact } from "@/sections/home/Impact";
import { Pricing } from "@/sections/home/Pricing";
import { Process } from "@/sections/home/Process";
import { ClosingCta } from "@/sections/shared/ClosingCta";
import { Services } from "@/sections/home/Services";
import { Testimonials } from "@/sections/home/Testimonials";
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
      <Testimonials />
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
