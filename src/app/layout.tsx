import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { PageFrame } from "@/components/layout/PageFrame";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { displayFace, hand, switzer } from "@/fonts/fonts";
import { SITE, openGraphFor } from "@/site";
import "./globals.css";

/* Two families, declared once on the root element. */
const fontVariables = [switzer.variable, displayFace.variable, hand.variable].join(" ");

const title = "Kalaa, creative social media marketing agency";
const description =
  "Kalaa creates social media strategies, content, and campaigns that turn attention into real business growth.";

/* Everything below `title` is inherited by every page, so a new page gets the canonical pattern, the social tags and the. */
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

/* `themeColor` is a literal on purpose: a browser reads it before any CSS has loaded, so it cannot come from a custom. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7fa99b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={SITE.locale} className={`${fontVariables} h-full antialiased`}>
      {/* The Feedspace badge in the hero: warm its three hosts early, but run its loader only after hydration, since it writes into the badge's div and React must own that DOM first. */}
      <head>
        <link rel="preconnect" href="https://js.feedspace.io" />
        <link rel="preconnect" href="https://embed.feedspace.io" />
        <link rel="preconnect" href="https://api.feedspace.io" />
      </head>
      {/* The document is sage. */}
      <body className="frame-inset flex min-h-full flex-col bg-page font-sans text-body text-ink-body">
        {/* The sage strip above the masthead. */}
        <div aria-hidden className="frame-strip-outer fixed z-50 bg-page" />
        <div aria-hidden className="frame-cap fixed rounded-t-token bg-page">
          <span className="frame-cap-line absolute rounded-t-token bg-frame-inner">
            <span className="frame-cap-sheet absolute rounded-t-token bg-sheet" />
          </span>
        </div>

        <MotionProvider>
        <PageFrame>
          <SiteHeader />

          {/* The pale band around the content, and the third step of the frame. */}
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PageFrame>
        </MotionProvider>
        <Script src="https://js.feedspace.io/v1/embed/embed.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
