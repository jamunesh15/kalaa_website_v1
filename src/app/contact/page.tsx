import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SITE, openGraphFor } from "@/site";

const path = "/contact";
const title = "Contact";
const description =
  "Talk to Kalaa about social media, content, Meta ads and websites, and what growing your business online would look like.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: openGraphFor({ path, title: `${title} | ${SITE.name}`, description }),
};

/**
 * The contact page, still a scaffold.
 *
 * The v1 version was 844 lines. This page has one job, taking an enquiry, and
 * it gets rebuilt with the rest of the site rather than patched into the new
 * look.
 */
export default function Contact() {
  return (
    <Section>
      <h1 className="font-display text-display-l text-ink">Let&apos;s talk.</h1>
      <p className="mt-5 max-w-2xl text-lead text-ink-muted">
        Tell us what you sell and who you sell it to, and we will come back with what we would do
        first.
      </p>
    </Section>
  );
}
