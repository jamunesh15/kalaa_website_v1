import type { Metadata } from "next";
import { getServices } from "@/content";
import { Impact } from "@/sections/home/Impact";
import { Services } from "@/sections/home/Services";
import { ServiceList } from "@/sections/services/ServiceList";
import { ServicesHero } from "@/sections/services/ServicesHero";
import { ClosingCta } from "@/sections/shared/ClosingCta";
import { JsonLd } from "@/seo/JsonLd";
import { servicesPage, siteGraph } from "@/seo/graph";
import { SITE, openGraphFor } from "@/site";

const path = "/services";
const title = "Services";

const description =
  "Social media management, content, Meta and Google ads, websites and software, brand and growth strategy. What each service involves and what Kalaa delivers each month.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: openGraphFor({ path, title: `${title} | ${SITE.name}`, description }),
};

/*
 * The services page, as a running order.
 *
 * The home page keeps its services section as the overview. This exists because
 * a section cannot be found: an anchor shares its URL with the page it sits on,
 * so `/#services` can never rank for a service or be cited by an answer engine.
 * A page can.
 *
 * The order is his, given 2026-09-08: the board, then the home page's own
 * services block as the overview, then the six in full, then the impact
 * numbers. `Services` and `Impact` are those sections reused rather than
 * copied, so the two pages cannot drift apart. A reader arriving here from
 * search has seen neither.
 */
export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <JsonLd data={siteGraph(servicesPage(services))} />

      <ServicesHero />
      <Services />
      <ServiceList services={services} />
      <Impact />
      <ClosingCta />
    </>
  );
}
