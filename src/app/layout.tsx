import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { PageFrame } from "@/components/layout/PageFrame";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { displayFace, hand, switzer } from "@/fonts/fonts";
import { SITE, openGraphFor } from "@/site";
import "./globals.css";

/**
 * Two families, declared once on the root element.
 *
 * `--font-display-face` is the display face and `--font-switzer` is the text face.
 * The variable is named for the ROLE, not the family, so swapping the typeface
 * again is a change to `fonts.ts` and nothing else. It was named `--font-chillax`
 * once and that name had to be chased through four files the day it changed.
 * `src/styles/theme.css` maps them to `font-display` and `font-sans`, so no
 * component ever names a typeface: it asks for a role and gets whichever family
 * currently holds it.
 */
const fontVariables = [switzer.variable, displayFace.variable, hand.variable].join(" ");

const title = "Kalaa, creative social media marketing agency";
const description =
  "Kalaa creates social media strategies, content, and campaigns that turn attention into real business growth.";

/**
 * Everything below `title` is inherited by every page, so a new page gets the
 * canonical pattern, the social tags and the robots policy for free and only
 * has to say what makes it different.
 */
export const metadata: Metadata = {
  // Makes every relative URL in this file absolute. Without it the canonical
  // ships as a path, which crawlers do not resolve.
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: openGraphFor({ path: "/", title, description }),
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * `themeColor` is a literal on purpose: a browser reads it before any CSS has
 * loaded, so it cannot come from a custom property. It is the one colour in the
 * codebase that is allowed to be written out, and `check-structure.mjs` records
 * that exemption with a reason. It is the sage, because the sage is what a
 * visitor sees at the edges of the page.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7fa99b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={SITE.locale} className={`${fontVariables} h-full antialiased`}>
      {/*
        The document is sage. The sheet inside it is white. Header, main and
        footer are declared once here so every page carries the same landmarks,
        and the footer stays outside <main>: nested inside it, a <footer> is not
        exposed as the contentinfo landmark and screen reader users cannot jump
        to it.
      */}
      <body className="frame-inset flex min-h-full flex-col bg-page font-sans text-body text-ink-body">
        {/*
          The sage strip above the masthead.

          The masthead sticks to `--frame` rather than to zero, so it rests
          inside the sage margin instead of scrolling it away. That leaves a
          gap the height of the frame between the top of the viewport and the
          top of the bar, and once the page has scrolled past the body's own
          top padding, the sheet fills that gap: hero cards travelled up
          through it and appeared ABOVE the navigation.

          This paints the frame colour across that strip, so the margin above
          the bar stays a margin. It is zero height on a phone, where `--frame`
          is zero and no gap exists.

          Fixed rather than sticky on purpose: it has to hold its position
          against a document that is scrolling underneath it.
        */}
        <div aria-hidden className="frame-strip-outer fixed z-50 bg-page" />
        <div aria-hidden className="frame-cap fixed rounded-t-token bg-page">
          <span className="frame-cap-line absolute rounded-t-token bg-frame-inner">
            <span className="frame-cap-sheet absolute rounded-t-token bg-sheet" />
          </span>
        </div>

        <MotionProvider>
        <PageFrame>
          <SiteHeader />

          {/*
            The pale band around the content, and the third step of the frame.

            The page nests four deep, outside in: the sage of the document, the
            white sheet, this sage ring, then the content on its own rounded
            surface. Before it existed everything below the hero was a bare
            white rectangle running edge to edge, which is what made the lower
            half of the page look unfinished rather than clean.

            The ring is the strong sage rather than the pale one, and it has a
            white band outside it, because a pale ring is the same colour as the
            hero field and the two merged: the frame read on three sides and
            vanished on the fourth.

            `overflow-hidden` belongs here rather than on `PageFrame`. It is what
            clips the content to the rounded corner, and putting it on the frame
            would silently break `position: sticky` on the masthead above.
          */}
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PageFrame>
        </MotionProvider>
      </body>
    </html>
  );
}
