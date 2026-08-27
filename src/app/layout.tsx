import type { Metadata, Viewport } from "next";
import { PageFrame } from "@/components/layout/PageFrame";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { chillax, switzer } from "@/fonts/fonts";
import { SITE, openGraphFor } from "@/site";
import "./globals.css";

/**
 * Two families, declared once on the root element.
 *
 * `--font-chillax` is the display face and `--font-switzer` is the text face.
 * `src/styles/theme.css` maps them to `font-display` and `font-sans`, so no
 * component ever names a typeface: it asks for a role and gets whichever family
 * currently holds it.
 */
const fontVariables = [switzer.variable, chillax.variable].join(" ");

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
        <PageFrame>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PageFrame>
      </body>
    </html>
  );
}
