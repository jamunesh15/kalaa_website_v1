import type { Metadata } from "next";
import { routeFor } from "@/routes";
import { SITE, openGraphFor } from "@/site";

const path = "/privacy-policy";
const title = "Privacy policy";
const description =
  "How Kalaa collects, uses, stores and protects personal data, and the choices and rights you have over the information we hold about you.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: openGraphFor({
    path,
    title: `${title} | ${SITE.name}`,
    description,
    type: "article",
  }),
};

/* The privacy policy. */
export default function PrivacyPolicy() {
  const lastUpdated = routeFor(path).lastModified;

  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-4 text-sm text-ink-muted">Last updated {lastUpdated}</p>

      <p className="mt-8 text-ink-body">
        This policy explains what personal data {SITE.name} collects, why we
        collect it, and what you can do about it. It applies to this website and
        to the {SITE.name} product.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink">
        What we collect
      </h2>
      <p className="mt-4 text-ink-body">
        Account details you give us when you sign up, the social accounts you
        connect, the content you schedule through the product, and basic usage
        data about how the service is used.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
        How we use it
      </h2>
      <p className="mt-4 text-ink-body">
        To run the service, to publish and measure the content you schedule, to
        support you when you ask for help, and to keep the service secure. We do
        not sell personal data.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
        How long we keep it
      </h2>
      <p className="mt-4 text-ink-body">
        For as long as your account is open, and after that only for as long as
        we are required to by law or need it to resolve a dispute.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
        Your rights
      </h2>
      <p className="mt-4 text-ink-body">
        You can ask for a copy of the data we hold about you, ask us to correct
        it, or ask us to delete it and close your account.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">
        Contact
      </h2>
      <p className="mt-4 text-ink-body">
        Write to us at privacy@kalaa.io with any question about this policy or
        about the data we hold.
      </p>
    </article>
  );
}
