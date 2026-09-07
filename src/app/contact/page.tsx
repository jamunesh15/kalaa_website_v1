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

/**
 * Verbatim from the live kalaa.io/contact.
 *
 * It is the only description on the site that names the agency's own category
 * in the first six words, which is what keeps it worth carrying across rather
 * than rewriting to match the landing page's voice.
 */
const description =
  "Contact Kalaa, a creative digital marketing and social media marketing agency. Let's work together to build your brand, create engaging content, and drive growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: openGraphFor({ path, title: `${title} | ${SITE.name}`, description }),
};

/**
 * The contact page, as a running order.
 *
 * **There is no form, and that is settled rather than pending.** This
 * repository has no backend, so a form would post nowhere and show a success
 * message anyway, which is a lie told to a customer at the exact moment they
 * decided to trust one. Every action here is a direct channel the reader owns:
 * their mail client, their dialer, their WhatsApp. If a hosted form endpoint is
 * added later it is one component and one environment variable, and it goes
 * above the channels rather than instead of them.
 *
 * The order is the client's drawing: the ask with two ways to answer it, the
 * three channels laid out properly, what to put in the message, then where we
 * are. It runs from the fastest thing a reader can do to the slowest.
 *
 * **No tape label above any of these sections.** The drawing has one over each
 * and the client cut them all. The headings say what the sections are.
 *
 * The v1 version of this page ran to 844 lines and opened with four service
 * cards.
 */
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
