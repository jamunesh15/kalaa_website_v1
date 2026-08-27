import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/seo/JsonLd";
import { siteGraph } from "@/seo/graph";

/**
 * The landing page, as a running order and nothing else.
 *
 * When a section is built it gets its own file under `src/sections/home/` and
 * one line here. This file never holds markup. The previous build of this site
 * put seventeen sections in one file and it ran to 1,323 lines.
 *
 * The order is an argument: what you get, what we do, how it runs, what it
 * looks like, then the ask. Changing the order changes what the page says.
 *
 * Nothing is designed yet. The reference has not been chosen. See CLAUDE.md.
 */
const SECTIONS = [
  { id: "services", heading: "Services", note: "Posts, reels, Meta ads, websites and software." },
  { id: "process", heading: "Process", note: "How a month with Kalaa actually runs." },
  { id: "work", heading: "Work", note: "What we have made, once there is real work to show." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={siteGraph()} />

      <Section>
        <h1 className="max-w-3xl font-display text-display-xl font-semibold text-ink">
          Kalaa
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-muted">
          Nothing here is designed yet. The scaffold builds, passes every check, and is
          waiting on a reference and a decision about artwork.
        </p>
      </Section>

      {SECTIONS.map((section) => (
        <Section key={section.id} id={section.id}>
          <h2 className="font-display text-display-m font-semibold text-ink">{section.heading}</h2>
          <p className="mt-3 text-ink-muted">{section.note}</p>
        </Section>
      ))}
    </>
  );
}
