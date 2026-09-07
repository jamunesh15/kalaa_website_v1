import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cards } from "./blocks/Cards";
import { Controls } from "./blocks/Controls";
import { Corners } from "./blocks/Corners";
import { Palette } from "./blocks/Palette";
import { TypeScale } from "./blocks/TypeScale";
import { Typefaces } from "./blocks/Typefaces";
import { Section } from "@/components/ui/Section";

/* The style tile. */
export const metadata: Metadata = {
  title: "Style tile",
  robots: { index: false, follow: false },
};

export default function Styleguide() {
  // Development only. In a production build this route answers 404 like any
  // path that was never written.
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section className="border-b-token border-line">
        <p className="text-label uppercase text-ink-muted">Not part of the site</p>
        <h1 className="mt-4 max-w-3xl font-display text-display-xl text-ink">
          The design system, before any page is built.
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-muted">
          Two things on this page are still open: the display face and the corner. Everything else
          is decided. Pick those two and the home page can be built against them.
        </p>
      </Section>

      <Typefaces />
      <TypeScale />
      <Palette />
      <Corners />
      <Controls />
      <Cards />
    </>
  );
}
