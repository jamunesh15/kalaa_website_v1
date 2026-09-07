import type { Metadata } from "next";
import { ContactBrief } from "@/sections/contact/ContactBrief";
import { ContactHero } from "@/sections/contact/ContactHero";
import { ContactStudio } from "@/sections/contact/ContactStudio";
import { ContactWays } from "@/sections/contact/ContactWays";
import { JsonLd } from "@/seo/JsonLd";
import { contactPage, siteGraph } from "@/seo/graph";
import { SITE, openGraphFor } from "@/site";

const path = "/contact";
const title = "Contact";

/* Verbatim from the live kalaa.io/contact. */
const description =
  "Contact Kalaa, a creative digital marketing and social media marketing agency. Let's work together to build your brand, create engaging content, and drive growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: openGraphFor({ path, title: `${title} | ${SITE.name}`, description }),
};

/* The contact page, as a running order. */
export default function Contact() {
  return (
    <>
      <JsonLd data={siteGraph(contactPage())} />

      <ContactHero />
      <ContactWays />
      <ContactBrief />
      <ContactStudio />
    </>
  );
}
