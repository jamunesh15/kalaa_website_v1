import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { FooterArtifacts } from "@/components/layout/FooterArtifacts";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ChannelGlyph, PinGlyph, SocialGlyph } from "@/components/ui/Glyph";
import { FOCUS_RING, HOVER_PLATE, HOVER_TAPE, HOVER_TAPE_BARE } from "@/components/ui/surface";
import { getChannels, getServices, getSocials, getStudio } from "@/content";
import { LEGAL_LINKS, QUICK_LINKS } from "@/nav";
import { routeFor } from "@/routes";
import { SITE } from "@/site";

/* The footer, as the client drew it: a desk at the bottom of the page. */

/* The torn top edge of the band, in `objectBoundingBox` units. */
const TORN_TOP =
  "M0,0.0432 L0.0089,0.0546 L0.0179,0.0672 L0.0268,0.0806 L0.0357,0.0846 L0.0446,0.0710 L0.0536,0.0536 L0.0625,0.0622 L0.0714,0.0385 L0.0804,0.0198 L0.0893,0.0202 L0.0982,0.0315 L0.1071,0.0232 L0.1161,0.0120 L0.1250,0.0070 L0.1339,0.0000 L0.1429,0.0147 L0.1518,0.0097 L0.1607,0.0000 L0.1696,0.0055 L0.1786,0.0274 L0.1875,0.0373 L0.1964,0.0599 L0.2054,0.0362 L0.2143,0.0220 L0.2232,0.0060 L0.2321,0.0252 L0.2411,0.0338 L0.2500,0.0386 L0.2589,0.0417 L0.2679,0.0642 L0.2768,0.0674 L0.2857,0.0802 L0.2946,0.0975 L0.3036,0.1134 L0.3125,0.1046 L0.3214,0.1151 L0.3304,0.1147 L0.3393,0.1375 L0.3482,0.1181 L0.3571,0.1036 L0.3661,0.1089 L0.3750,0.1126 L0.3839,0.0890 L0.3929,0.0948 L0.4018,0.0936 L0.4107,0.0953 L0.4196,0.0935 L0.4286,0.1122 L0.4375,0.1062 L0.4464,0.1107 L0.4554,0.0908 L0.4643,0.0927 L0.4732,0.1117 L0.4821,0.1202 L0.4911,0.1425 L0.5000,0.1207 L0.5089,0.1152 L0.5179,0.1321 L0.5268,0.1245 L0.5357,0.1137 L0.5446,0.1316 L0.5536,0.1324 L0.5625,0.1119 L0.5714,0.1041 L0.5804,0.1235 L0.5893,0.1350 L0.5982,0.1309 L0.6071,0.1261 L0.6161,0.1468 L0.6250,0.1600 L0.6339,0.1600 L0.6429,0.1434 L0.6518,0.1340 L0.6607,0.1570 L0.6696,0.1333 L0.6786,0.1110 L0.6875,0.1339 L0.6964,0.1174 L0.7054,0.0944 L0.7143,0.0893 L0.7232,0.0867 L0.7321,0.0936 L0.7411,0.1131 L0.7500,0.0972 L0.7589,0.1016 L0.7679,0.1178 L0.7768,0.1296 L0.7857,0.1453 L0.7946,0.1394 L0.8036,0.1257 L0.8125,0.1416 L0.8214,0.1442 L0.8304,0.1508 L0.8393,0.1556 L0.8482,0.1326 L0.8571,0.1096 L0.8661,0.1023 L0.8750,0.1123 L0.8839,0.0921 L0.8929,0.0759 L0.9018,0.0601 L0.9107,0.0405 L0.9196,0.0544 L0.9286,0.0700 L0.9375,0.0520 L0.9464,0.0699 L0.9554,0.0929 L0.9643,0.0786 L0.9732,0.0869 L0.9821,0.1079 L0.9911,0.1170 L1.0000,0.1132 L1,1 L0,1 Z";

/* The back sheet's tear, and it is a different shape rather than the same one again. */
const TORN_BACK =
  "M0,0.0324 L0.0071,0.0306 L0.0143,0.0375 L0.0214,0.0422 L0.0286,0.0562 L0.0357,0.0743 L0.0429,0.0834 L0.0500,0.1012 L0.0571,0.1025 L0.0643,0.1011 L0.0714,0.1026 L0.0786,0.1192 L0.0857,0.1362 L0.0929,0.1593 L0.1000,0.1813 L0.1071,0.2076 L0.1143,0.2175 L0.1214,0.2177 L0.1286,0.2251 L0.1357,0.2464 L0.1429,0.2709 L0.1500,0.2953 L0.1571,0.3275 L0.1643,0.3559 L0.1714,0.3860 L0.1786,0.4021 L0.1857,0.4265 L0.1929,0.4404 L0.2000,0.4459 L0.2071,0.4483 L0.2143,0.4564 L0.2214,0.4685 L0.2286,0.4875 L0.2357,0.5078 L0.2429,0.5262 L0.2500,0.5426 L0.2571,0.5606 L0.2643,0.5848 L0.2714,0.6054 L0.2786,0.6108 L0.2857,0.6073 L0.2929,0.6042 L0.3000,0.6176 L0.3071,0.6270 L0.3143,0.6418 L0.3214,0.6565 L0.3286,0.6697 L0.3357,0.6855 L0.3429,0.6845 L0.3500,0.6856 L0.3571,0.6944 L0.3643,0.6973 L0.3714,0.7054 L0.3786,0.7021 L0.3857,0.6940 L0.3929,0.6881 L0.4000,0.6945 L0.4071,0.6941 L0.4143,0.6899 L0.4214,0.6856 L0.4286,0.6898 L0.4357,0.6892 L0.4429,0.6904 L0.4500,0.6920 L0.4571,0.6893 L0.4643,0.6904 L0.4714,0.6911 L0.4786,0.6906 L0.4857,0.6934 L0.4929,0.6871 L0.5000,0.6861 L0.5071,0.6813 L0.5143,0.6842 L0.5214,0.6858 L0.5286,0.6836 L0.5357,0.6777 L0.5429,0.6737 L0.5500,0.6652 L0.5571,0.6649 L0.5643,0.6647 L0.5714,0.6644 L0.5786,0.6687 L0.5857,0.6645 L0.5929,0.6716 L0.6000,0.6783 L0.6071,0.6733 L0.6143,0.6655 L0.6214,0.6658 L0.6286,0.6706 L0.6357,0.6631 L0.6429,0.6583 L0.6500,0.6621 L0.6571,0.6672 L0.6643,0.6668 L0.6714,0.6701 L0.6786,0.6651 L0.6857,0.6629 L0.6929,0.6660 L0.7000,0.6720 L0.7071,0.6642 L0.7143,0.6660 L0.7214,0.6726 L0.7286,0.6634 L0.7357,0.6644 L0.7429,0.6613 L0.7500,0.6599 L0.7571,0.6594 L0.7643,0.6616 L0.7714,0.6500 L0.7786,0.6360 L0.7857,0.6275 L0.7929,0.6186 L0.8000,0.6174 L0.8071,0.6060 L0.8143,0.5972 L0.8214,0.5876 L0.8286,0.5829 L0.8357,0.5835 L0.8429,0.5741 L0.8500,0.5711 L0.8571,0.5574 L0.8643,0.5410 L0.8714,0.5156 L0.8786,0.4945 L0.8857,0.4738 L0.8929,0.4505 L0.9000,0.4479 L0.9071,0.4407 L0.9143,0.4086 L0.9214,0.3615 L0.9286,0.3032 L0.9357,0.2549 L0.9429,0.2121 L0.9500,0.2003 L0.9571,0.1943 L0.9643,0.1707 L0.9714,0.1434 L0.9786,0.1080 L0.9857,0.0753 L0.9929,0.0448 L1.0000,0.0302 L1,1 L0,1 Z";

/* One link in a footer column. Its hover plate is the column's own tape. */
const COLUMN_LINK = `${FOCUS_RING} ${HOVER_TAPE} text-body text-ink-body hover:text-ink`;

export function SiteFooter() {
  const channels = getChannels();
  const whatsapp = channels.find((channel) => channel.icon === "whatsapp");
  const socials = getSocials();
  const services = getServices();
  const studio = getStudio();

  /* The year, read from the privacy policy's own date rather than from `new Date()`. */
  const year = routeFor("/privacy-policy").lastModified.slice(0, 4);

  return (
    <footer className="footer-screen relative flex flex-col overflow-hidden rounded-b-token border-t-token border-line bg-board">
      {/* The clip path lives in a zero-size SVG rather than in a stylesheet. */}
      <svg aria-hidden className="absolute h-0 w-0" focusable="false">
        <defs>
          <clipPath id="footer-torn" clipPathUnits="objectBoundingBox">
            <path d={TORN_TOP} />
          </clipPath>
          <clipPath id="footer-torn-back" clipPathUnits="objectBoundingBox">
            <path d={TORN_BACK} />
          </clipPath>
        </defs>
      </svg>

      {/* The front strip is short, and that number is load bearing. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[7%] bg-page/70 sm:h-[16%] lg:h-[44%]"
        style={{ clipPath: "url(#footer-torn-back)" }}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-page sm:h-28 lg:h-24"
        style={{ clipPath: "url(#footer-torn)" }}
      />

      <FooterArtifacts />

      {/* The words sit above both. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-10 lg:pt-8">
        {/* Centred below `md`, where the four columns stack into one, at the client's ask. */}
        <div className="grid gap-10 text-center md:grid-cols-2 md:gap-10 md:text-left lg:grid-cols-[1.45fr_0.85fr_1.1fr_1.15fr] lg:gap-10">
          <div>
            {/* `self-start` is not decoration. */}
            <BrandMark className="mx-auto h-9 w-auto self-start md:mx-0" decorative />

            <p className="mx-auto mt-5 max-w-[16ch] font-display text-display-m font-bold text-ink md:mx-0">
              Technology <span className="text-ink-sage">Growth Partners.</span>
            </p>

            {/* The CEO's line, given 2026-09-08. His phrasing was "Bring your business to online"; the stray "to" is a slip rather than a choice, so it ships as English. */}
            <p className="mx-auto mt-3 max-w-[38ch] text-body font-semibold text-ink md:mx-0">
              Bring your business online.
            </p>

            {/* The client's own sentence, from the live kalaa.io hero, serial comma included. */}
            <p className="mx-auto mt-2 max-w-[38ch] text-body text-ink-body md:mx-0">
              We help brands grow through purposeful design, storytelling, and data-driven
              marketing.
            </p>

            {/* The row of profiles draws nothing while there are none, which is correct rather than a gap rather than a placeholder. */}
            {socials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap justify-center gap-2.5 md:justify-start">
                {socials.map((social) => (
                  <li key={social.href}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`${FOCUS_RING} transition-token flex h-10 w-10 items-center justify-center rounded-full bg-action text-on-action hover:bg-action-hover`}
                    >
                      <SocialGlyph name={social.icon} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-labelledby="footer-quick-links">
            <TapeLabel id="footer-quick-links" tape="tape-1" tint="bg-tint-sage">
              Quick links
            </TapeLabel>
            <ul className="tape-column mt-5 space-y-1 md:-mx-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={COLUMN_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* The six real services, from the content layer. */}
          <nav aria-labelledby="footer-services">
            <TapeLabel id="footer-services" tape="tape-2" tint="bg-tint-violet">
              Services we provide
            </TapeLabel>
            <ul className="tape-column mt-5 space-y-1 md:-mx-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href="/#services" className={COLUMN_LINK}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <TapeLabel id="footer-contact" tape="tape-3" tint="bg-tint-peach">
              Contact
            </TapeLabel>

            {/* Each channel is a glyph and the thing it does. */}
            {/* A column, so each channel is a row of its own. */}
            <address className="tape-column mt-5 flex flex-col items-center space-y-2 not-italic md:items-start">
              {channels.map((channel) => (
                <ChannelRow
                  key={channel.label}
                  icon={<ChannelGlyph name={channel.icon} />}
                  href={channel.href}
                  external={channel.external}
                  label={channel.label}
                  name={channel.value}
                >
                  {channel.value}
                </ChannelRow>
              ))}

              <ChannelRow
                icon={<PinGlyph />}
                href={studio.href}
                external
                label="Studio"
                name={studio.lines.join(", ")}
              >
                {studio.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </ChannelRow>
            </address>

            {/* Opens WhatsApp, not the contact page. */}
            <div className="mt-3 flex justify-center md:justify-start">
              <ArrowButton
                href={whatsapp?.href ?? "/contact"}
                external={whatsapp?.external ?? false}
                width="fit"
              >
                Start a conversation
              </ArrowButton>
            </div>
          </div>
        </div>

      </div>

      {/* The colophon, at the foot of the sheet rather than at the end of the words. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-36 pt-10 sm:pb-40 lg:mt-auto lg:pb-7 lg:pt-6">
        {/* No rule above it. */}
        <div className="flex flex-col items-center gap-4 text-center lg:mx-auto lg:w-full lg:max-w-[56%] lg:flex-row lg:items-center lg:justify-between lg:text-left">
          {/* The business model line, the CEO's own words, given 2026-09-08. It sits in the colophon rather than in the brand block because it describes what the company IS to a partner, not what it sells to a visitor. */}
          <p className="text-small text-ink">
            &copy; {year} {SITE.name}, a Distribution Operating Company. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 lg:-mx-3 lg:justify-start">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    /* `whitespace-nowrap`: the legal column is narrow at some
                       widths and "Privacy policy" was breaking across two lines. */
                    className={`${FOCUS_RING} ${HOVER_PLATE} block whitespace-nowrap text-small text-ink hover:opacity-100`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* A column heading on a strip of tape. */
function TapeLabel({
  children,
  id,
  tape,
  tint,
}: {
  children: ReactNode;
  id: string;
  tape: string;
  tint: string;
}) {
  return (
    <h2
      id={id}
      /* `-ml-4` cancels the tape's own left padding, so the first letter of the label sits on the same vertical line as the. */
      className={`${tape} ${tint} inline-block px-4 py-2 text-label font-bold uppercase text-ink md:-ml-4`}
    >
      {children}
    </h2>
  );
}

/* One line of contact detail: a glyph, then the thing itself as the action. */
function ChannelRow({
  children,
  href,
  external,
  icon,
  label,
  name,
}: {
  children: ReactNode;
  href: string;
  external: boolean;
  icon: ReactNode;
  label: string;
  /** The value as one string, for the link's accessible name. */
  name: string;
}) {
  return (
    /* The glyph is inside the link, not beside it. */
    <Link
      href={href}
      /* Both tokens, not just `noreferrer`. */
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${label}, ${name}`}
      className={`${FOCUS_RING} ${HOVER_TAPE_BARE} inline-flex items-start gap-3 text-body text-ink-body hover:text-ink md:-ml-3`}
    >
      <span aria-hidden className="flex h-7 shrink-0 items-center text-ink-sage">
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </Link>
  );
}
