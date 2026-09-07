import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { FooterArtifacts } from "@/components/layout/FooterArtifacts";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ChannelGlyph, PinGlyph, SocialGlyph } from "@/components/ui/Glyph";
import { FOCUS_RING, HOVER_PLATE, HOVER_PLATE_BARE } from "@/components/ui/surface";
import { getChannels, getServices, getSocials, getStudio } from "@/content";
import { LEGAL_LINKS, QUICK_LINKS } from "@/nav";
import { routeFor } from "@/routes";
import { SITE } from "@/site";

/**
 * The footer, as the client drew it: a desk at the bottom of the page.
 *
 * Mounted by the root layout outside `<main>`, so it is exposed as the
 * contentinfo landmark. A `<footer>` nested inside `<main>` is not, and it
 * disappears for a screen reader user while looking perfectly correct on
 * screen.
 *
 * Four columns of words on the sheet, a torn band of frame sage across the
 * bottom, and four objects lying across the tear. It replaces a scaffold that
 * was a mark, a row of links and one sentence, at the foot of a page whose
 * closing section is a torn sheet with hand-drawn marks on it. That scaffold
 * read as the place the design ran out.
 *
 * **The column headings sit on tape, and that is an instruction rather than a
 * default.** This project's rules turn down a small uppercase label, because
 * the eyebrow above a display heading is the most common template tell. These
 * are not that: they name four columns, they are drawn as torn tape in three
 * different shapes, and the client asked for them.
 *
 * **It fills the screen below the masthead, and it is built to fit inside it.**
 * Those are two rules and they meet in the middle. `footer-screen` sets a
 * minimum of one viewport less the bar and the frame, so that scrolled to the
 * end there is no strip of the section above showing between the masthead and
 * this: the client saw the closing band's sage in that gap and read it as a
 * seam. The height budget below is the other half of the same requirement,
 * because a footer TALLER than that screen cannot be seen at once.
 *
 * **The budget, and it is a constraint rather than a preference.** The client reads this site on a 125% scaled display, where the
 * page gets about 730 CSS pixels of height and the masthead is sticky over 72
 * of them. A footer taller than about 600 cannot be seen at once: scroll to the
 * end and its first two lines sit behind the bar, which is how this arrived.
 * Every value below that looks like arbitrary tightening is holding that
 * budget. It measures 566 and clears a 1280 by 700 window, the smallest laptop
 * worth designing for, by six pixels. **Check the height at 1536 by 736 before
 * adding a row to any column**, and remember the contact column is the tallest
 * of the four, so it is the one that decides.
 *
 * **The channels start straight under the tape.** There was a line of
 * invitation above them, "Have a project in mind", and the client cut it. It
 * was the only thing in the footer that asked rather than told, the closing
 * section two hundred pixels above already asks, and the button under the
 * channels is the ask in this column.
 *
 * **The band is `--page`, the frame's own sage, and that is why it works.** The
 * sheet tears away at the bottom of the page and the ground the whole
 * application sits on shows through, so the band and the frame below it are one
 * colour meeting at the rounded corner rather than a fifth tint invented for a
 * strip. The colophon stays above the tear, on the sheet: `--ink-muted` on the
 * sage is 2.9:1, the one combination in this palette that looks fine and is not
 * readable, and the contrast suite fails the build over it.
 *
 * **`overflow-hidden` is load bearing here and harmless.** The camera and the
 * coffee run off the left and right edges and have to be cut at the sheet, and
 * the band has to take the sheet's bottom corners. The warning against it is
 * about `PageFrame`, whose hidden overflow would break the sticky masthead
 * inside it. Nothing sticky lives in here.
 *
 * Every address and number reads from `src/content/contact.ts` and the service
 * names from `services.ts`, so nothing in this file is a second copy of
 * something a page already states.
 */

/**
 * The torn top edge of the band, in `objectBoundingBox` units.
 *
 * Generated once from a seeded correlated walk and pasted here rather than
 * computed at runtime: a tear that changed between renders is a hydration
 * mismatch, and one that changed between builds would make every screenshot
 * diff noise.
 *
 * 112 straight segments inside a 16% band, which at the size this is drawn puts
 * a segment at about twelve pixels and the whole tear at about twenty-eight.
 * The segment width is the closing section's; the depth is not, and the first
 * pass at 8.5% is why. As a fraction it matched that section exactly, but this
 * band is a third of that sheet's height, so the same fraction came out as a
 * fifteen pixel wobble across fourteen hundred: a deckle edge rather than a
 * tear. Depth has to be set in pixels on the screen, not in percentages of
 * whatever box it lands in.
 *
 * Straight segments and a correlated walk rather than curves and fresh noise:
 * smooth curves at this amplitude roll instead of ripping, and independent
 * noise oscillates. Paper fibres wander, so each step moves a little from the
 * last and is clamped to the band.
 */
const TORN_TOP =
  "M0,0.0432 L0.0089,0.0546 L0.0179,0.0672 L0.0268,0.0806 L0.0357,0.0846 L0.0446,0.0710 L0.0536,0.0536 L0.0625,0.0622 L0.0714,0.0385 L0.0804,0.0198 L0.0893,0.0202 L0.0982,0.0315 L0.1071,0.0232 L0.1161,0.0120 L0.1250,0.0070 L0.1339,0.0000 L0.1429,0.0147 L0.1518,0.0097 L0.1607,0.0000 L0.1696,0.0055 L0.1786,0.0274 L0.1875,0.0373 L0.1964,0.0599 L0.2054,0.0362 L0.2143,0.0220 L0.2232,0.0060 L0.2321,0.0252 L0.2411,0.0338 L0.2500,0.0386 L0.2589,0.0417 L0.2679,0.0642 L0.2768,0.0674 L0.2857,0.0802 L0.2946,0.0975 L0.3036,0.1134 L0.3125,0.1046 L0.3214,0.1151 L0.3304,0.1147 L0.3393,0.1375 L0.3482,0.1181 L0.3571,0.1036 L0.3661,0.1089 L0.3750,0.1126 L0.3839,0.0890 L0.3929,0.0948 L0.4018,0.0936 L0.4107,0.0953 L0.4196,0.0935 L0.4286,0.1122 L0.4375,0.1062 L0.4464,0.1107 L0.4554,0.0908 L0.4643,0.0927 L0.4732,0.1117 L0.4821,0.1202 L0.4911,0.1425 L0.5000,0.1207 L0.5089,0.1152 L0.5179,0.1321 L0.5268,0.1245 L0.5357,0.1137 L0.5446,0.1316 L0.5536,0.1324 L0.5625,0.1119 L0.5714,0.1041 L0.5804,0.1235 L0.5893,0.1350 L0.5982,0.1309 L0.6071,0.1261 L0.6161,0.1468 L0.6250,0.1600 L0.6339,0.1600 L0.6429,0.1434 L0.6518,0.1340 L0.6607,0.1570 L0.6696,0.1333 L0.6786,0.1110 L0.6875,0.1339 L0.6964,0.1174 L0.7054,0.0944 L0.7143,0.0893 L0.7232,0.0867 L0.7321,0.0936 L0.7411,0.1131 L0.7500,0.0972 L0.7589,0.1016 L0.7679,0.1178 L0.7768,0.1296 L0.7857,0.1453 L0.7946,0.1394 L0.8036,0.1257 L0.8125,0.1416 L0.8214,0.1442 L0.8304,0.1508 L0.8393,0.1556 L0.8482,0.1326 L0.8571,0.1096 L0.8661,0.1023 L0.8750,0.1123 L0.8839,0.0921 L0.8929,0.0759 L0.9018,0.0601 L0.9107,0.0405 L0.9196,0.0544 L0.9286,0.0700 L0.9375,0.0520 L0.9464,0.0699 L0.9554,0.0929 L0.9643,0.0786 L0.9732,0.0869 L0.9821,0.1079 L0.9911,0.1170 L1.0000,0.1132 L1,1 L0,1 Z";

/**
 * The back sheet's tear, and it is a different shape rather than the same one
 * again.
 *
 * The first build of this footer laid one flat strip of sage along the bottom
 * with a shallow tear on it. Against the client's drawing that reads as a rule,
 * not as paper: in the drawing the sage rises to roughly 45% of the footer at
 * the left and right and falls to about 14% through the middle, and it is that
 * swell, not the fibre, that makes it look like a sheet somebody tore and
 * dropped there.
 *
 * So this carries a smoothstepped swell through eleven control points with the
 * fibre drift riding on top of it, and the flat strip stays as the front sheet.
 * Two sheets at two heights in two tones of the same sage is what the drawing
 * actually has, and one shape cannot be both.
 */
const TORN_BACK =
  "M0,0.0324 L0.0071,0.0306 L0.0143,0.0375 L0.0214,0.0422 L0.0286,0.0562 L0.0357,0.0743 L0.0429,0.0834 L0.0500,0.1012 L0.0571,0.1025 L0.0643,0.1011 L0.0714,0.1026 L0.0786,0.1192 L0.0857,0.1362 L0.0929,0.1593 L0.1000,0.1813 L0.1071,0.2076 L0.1143,0.2175 L0.1214,0.2177 L0.1286,0.2251 L0.1357,0.2464 L0.1429,0.2709 L0.1500,0.2953 L0.1571,0.3275 L0.1643,0.3559 L0.1714,0.3860 L0.1786,0.4021 L0.1857,0.4265 L0.1929,0.4404 L0.2000,0.4459 L0.2071,0.4483 L0.2143,0.4564 L0.2214,0.4685 L0.2286,0.4875 L0.2357,0.5078 L0.2429,0.5262 L0.2500,0.5426 L0.2571,0.5606 L0.2643,0.5848 L0.2714,0.6054 L0.2786,0.6108 L0.2857,0.6073 L0.2929,0.6042 L0.3000,0.6176 L0.3071,0.6270 L0.3143,0.6418 L0.3214,0.6565 L0.3286,0.6697 L0.3357,0.6855 L0.3429,0.6845 L0.3500,0.6856 L0.3571,0.6944 L0.3643,0.6973 L0.3714,0.7054 L0.3786,0.7021 L0.3857,0.6940 L0.3929,0.6881 L0.4000,0.6945 L0.4071,0.6941 L0.4143,0.6899 L0.4214,0.6856 L0.4286,0.6898 L0.4357,0.6892 L0.4429,0.6904 L0.4500,0.6920 L0.4571,0.6893 L0.4643,0.6904 L0.4714,0.6911 L0.4786,0.6906 L0.4857,0.6934 L0.4929,0.6871 L0.5000,0.6861 L0.5071,0.6813 L0.5143,0.6842 L0.5214,0.6858 L0.5286,0.6836 L0.5357,0.6777 L0.5429,0.6737 L0.5500,0.6652 L0.5571,0.6649 L0.5643,0.6647 L0.5714,0.6644 L0.5786,0.6687 L0.5857,0.6645 L0.5929,0.6716 L0.6000,0.6783 L0.6071,0.6733 L0.6143,0.6655 L0.6214,0.6658 L0.6286,0.6706 L0.6357,0.6631 L0.6429,0.6583 L0.6500,0.6621 L0.6571,0.6672 L0.6643,0.6668 L0.6714,0.6701 L0.6786,0.6651 L0.6857,0.6629 L0.6929,0.6660 L0.7000,0.6720 L0.7071,0.6642 L0.7143,0.6660 L0.7214,0.6726 L0.7286,0.6634 L0.7357,0.6644 L0.7429,0.6613 L0.7500,0.6599 L0.7571,0.6594 L0.7643,0.6616 L0.7714,0.6500 L0.7786,0.6360 L0.7857,0.6275 L0.7929,0.6186 L0.8000,0.6174 L0.8071,0.6060 L0.8143,0.5972 L0.8214,0.5876 L0.8286,0.5829 L0.8357,0.5835 L0.8429,0.5741 L0.8500,0.5711 L0.8571,0.5574 L0.8643,0.5410 L0.8714,0.5156 L0.8786,0.4945 L0.8857,0.4738 L0.8929,0.4505 L0.9000,0.4479 L0.9071,0.4407 L0.9143,0.4086 L0.9214,0.3615 L0.9286,0.3032 L0.9357,0.2549 L0.9429,0.2121 L0.9500,0.2003 L0.9571,0.1943 L0.9643,0.1707 L0.9714,0.1434 L0.9786,0.1080 L0.9857,0.0753 L0.9929,0.0448 L1.0000,0.0302 L1,1 L0,1 Z";

/**
 * One link in a footer column. Written once so the two columns cannot drift.
 *
 * It carries `HOVER_PLATE`, the same lift the masthead links take, so a link is
 * a link wherever it is on the page. The list around it needs the matching
 * `-mx-3`: the plate is made of padding, and left uncompensated it indents the
 * column against the tape label over it.
 */
const COLUMN_LINK = `${FOCUS_RING} ${HOVER_PLATE} block text-body text-ink-body hover:text-ink`;

export function SiteFooter() {
  const channels = getChannels();
  const whatsapp = channels.find((channel) => channel.icon === "whatsapp");
  const socials = getSocials();
  const services = getServices();
  const studio = getStudio();

  /**
   * The year, read from the privacy policy's own date rather than from
   * `new Date()`.
   *
   * A live year changes what the server renders without anything in the
   * repository changing, which makes every build a different document and every
   * screenshot comparison noise. This changes when the policy does.
   */
  const year = routeFor("/privacy-policy").lastModified.slice(0, 4);

  return (
    <footer className="footer-screen relative flex flex-col overflow-hidden rounded-b-token border-t-token border-line bg-board">
      {/*
        The clip path lives in a zero-size SVG rather than in a stylesheet.
        `clip-path: polygon()` cannot hold this many points readably, and a
        `url()` reference needs the element to exist in the document.
        `absolute h-0 w-0` keeps it out of the layout without `display: none`,
        which would stop Firefox resolving the reference at all.
      */}
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

      {/*
        **The front strip is short, and that number is load bearing.** It ran to
        160px and put the copyright line on solid `--page`, which is 2.9:1
        against `--ink-muted` and fails the contrast suite. The back sheet is
        the one allowed to be tall, because its tear has fallen away to nothing
        through the middle where the colophon sits; the front strip's edge is
        level, so every pixel of its height is height the words have to clear.

        Two sheets, and the second is why this reads as paper rather than as a
        band. The back one is the pale sage that rises at both ends and falls
        away through the middle; the front one is the solid strip along the
        bottom. Same hue at two opacities, so what separates them is the torn
        edge itself rather than a second colour.

        The back sheet's height is a percentage because the swell in its tear is
        drawn in its own coordinates, and the percentage steps DOWN steeply as
        the screen narrows. That is not only about the footer being twice as
        tall when the columns stack. **Below `lg` the colophon runs the full
        width, so it has to clear the sheet's HIGHEST point rather than its
        lowest**, and the swell puts that at the two ends. `--ink-muted` on the
        sage is 2.9:1, so a copyright line resting on a corner of it is a
        contrast failure the suite fails the build over. At `lg` the colophon is
        inset to the middle, where the tear has fallen away, which is what lets
        the sheet be half the footer there and a twelfth of it on a phone.
      */}
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

      {/*
        The words sit above both. The artifacts are positioned and carry their
        own stacking order, so without this the camera would land on top of the
        copyright rather than beside it.
      */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-10 lg:pt-8">
        {/*
          Centred below `md`, where the four columns stack into one, at the
          client's ask. Side by side each column has its own left edge to hang
          from; stacked on a phone, four left-set blocks read as a list that
          slid to one side of the screen.
        */}
        <div className="grid gap-10 text-center md:grid-cols-2 md:gap-10 md:text-left lg:grid-cols-[1.45fr_0.85fr_1.1fr_1.15fr] lg:gap-10">
          <div>
            {/*
              `self-start` is not decoration. A flex parent at its default
              `align-items: stretch` pulls this image out to the full width of
              its column and squashes it flat against the height set here.
              `w-auto` cannot save it: stretch wins.
            */}
            <BrandMark className="mx-auto h-9 w-auto self-start md:mx-0" decorative />

            <p className="mx-auto mt-5 max-w-[16ch] font-display text-display-m font-bold text-ink md:mx-0">
              Creative social media <span className="text-ink-sage">marketing agency.</span>
            </p>

            {/*
              The client's own sentence, from the live kalaa.io hero, serial
              comma included. A footer is the last place to start writing new
              claims about what a business does.
            */}
            <p className="mx-auto mt-3 max-w-[38ch] text-body text-ink-body md:mx-0">
              We help brands grow through purposeful design, storytelling, and data-driven
              marketing.
            </p>

            {/*
              The row of profiles draws nothing while there are none, which is
              correct rather than a gap rather than a placeholder `#`, which
              fails `tests/links.spec.ts`. See `SOCIALS` in
              `src/content/contact.ts`.

              **Black buttons, not the pale sage they started as.** Sage circles
              on the cream ground were about a colour and a half apart from it,
              so the row took a second look to find. Black is the site's own
              action colour, the same one the buttons carry, and three small
              marks of it read as controls at a glance without competing with
              the ask underneath.
            */}
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
            <ul className="mt-5 space-y-1 md:-mx-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={COLUMN_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/*
            The six real services, from the content layer.

            They all point at `/#services`, because that is where they are
            written up and there are no service pages yet. The day each one has
            a page of its own the href comes off the service rather than being
            written here.
          */}
          <nav aria-labelledby="footer-services">
            <TapeLabel id="footer-services" tape="tape-2" tint="bg-tint-violet">
              Services we provide
            </TapeLabel>
            <ul className="mt-5 space-y-1 md:-mx-3">
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

            {/*
              Each channel is a glyph and the thing it does. `<address>` is the
              element for contact details, and `not-italic` because a browser
              sets it in italic by default, which is a typeface decision made in
              1994 rather than one made here.
            */}
            {/*
              A column, so each channel is a row of its own. The links are
              `inline-flex`, and on a 430px phone the email and the number were
              short enough to share a line while the rest stacked, which read as
              a mistake rather than a layout. Centred on a phone, left from `md`.
            */}
            <address className="mt-5 flex flex-col items-center space-y-2 not-italic md:items-start">
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

            {/*
              Opens WhatsApp, not the contact page. The client asked for it:
              the column above already lists every channel, so the one action
              at its foot should be the quickest of them, and the row that says
              "Send a message" three lines up points at the same chat. `mt-3`
              rather than `mt-6`, also at his ask; the address's last line
              carries its own leading and the old margin read as a hole.
            */}
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

      {/*
        The colophon, at the foot of the sheet rather than at the end of the
        words. One row rather than two headed columns, because filing two links
        under a heading is filing for its own sake.

        **It sits on the sage, and that is the client's call.** It used to close
        the cream area with the artwork below it, which put the last line of the
        footer in the middle of the footer. `mt-auto` against the footer's
        column layout drops it to the bottom of whatever height the screen
        gives, so on a tall window it travels down with the paper instead of
        leaving a hole underneath itself.

        **Ink, not muted, and that is not a style choice.** Muted on the sage is
        2.9:1 and fails the contrast suite. Ink is 7.1:1 on the solid strip and
        9.5:1 on the pale sheet above it. The hover is an opacity step for the
        same reason: every palette colour that would read as "hovered" fails
        against this field.

        Bottom only from `lg`. Below that the two objects lie along the same
        foot and there is no width to share with them, so it keeps its place
        above the artwork and the padding that clears it.
      */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-36 pt-10 sm:pb-40 lg:mt-auto lg:pb-7 lg:pt-6">
        {/*

          No rule above it. There was one and the client cut it.

          **It is narrower than the columns above it, and that is the client's
          drawing rather than a centring habit.** It runs about 56% of the sheet,
          which is what leaves the outer fifths free for the camera on one side
          and the coffee on the other. Run full width it lands on both. A
          percentage rather than a fixed `max-w`, so that clearance holds at
          every width above `lg` rather than only at the one it was checked at.

          It goes side by side at `lg`, not at `sm`. Measured at 768px the two
          halves sit close enough to read as one collided line.
        */}
        <div className="flex flex-col items-center gap-4 text-center lg:mx-auto lg:w-full lg:max-w-[56%] lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <p className="text-small text-ink">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 lg:-mx-3 lg:justify-start">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${FOCUS_RING} ${HOVER_PLATE} block text-small text-ink hover:opacity-100`}
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

/**
 * A column heading on a strip of tape.
 *
 * The `id` is the heading's, and each column's `<nav>` points its
 * `aria-labelledby` at it, so a screen reader announces "Quick links,
 * navigation" rather than three unnamed navigations in a row.
 */
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
      /*
        **`-ml-4` cancels the tape's own left padding**, so the first letter of
        the label sits on the same vertical line as the first letter of every
        link under it. The strip needs the padding: the clip path chews its ends
        and text running to the edge would be cut by the tear. Without the pull
        the whole column reads as indented by sixteen pixels against the one
        beside it, which is what the client saw.
      */
      className={`${tape} ${tint} inline-block px-4 py-2 text-label font-bold uppercase text-ink md:-ml-4`}
    >
      {children}
    </h2>
  );
}

/**
 * One line of contact detail: a glyph, then the thing itself as the action.
 *
 * The glyph is `aria-hidden` and the link carries the label instead, because
 * "Email, hey@kalaa.io" read out is useful and a decorative envelope is not.
 */
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
    /*
      **The glyph is inside the link, not beside it.** It sat outside as a
      sibling, so the hover plate lit up around the words and left the mark
      stranded on the cream next to it, which the client saw straight away. A
      row that reads as one thing has to be one thing: the whole row is the
      target now, and the plate covers what a reader thinks they are pressing.

      `items-start`, so a three line address keeps its glyph beside the FIRST
      line rather than floating down to the middle of the block. The glyph is
      centred inside a box the height of that line: an 18px mark aligned to the
      top of a 28px line box sits above the letters it labels, and at this size
      that reads as a mark that missed rather than as a deliberate offset.

      The padding now lives on the link, so the `-ml-3` that cancels it is here
      too: without it the whole contact column sits twelve pixels right of the
      tape label over it.
    */
    <Link
      href={href}
      /*
        Both tokens, not just `noreferrer`. Modern browsers imply `noopener`
        from it, and `tests/links.spec.ts` checks for the word itself rather
        than for the behaviour, which is the right check: the implication is a
        browser default and this is a security property worth stating.
      */
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${label}, ${name}`}
      className={`${FOCUS_RING} ${HOVER_PLATE_BARE} inline-flex items-start gap-3 text-body text-ink-body hover:text-ink md:-ml-3`}
    >
      <span aria-hidden className="flex h-7 shrink-0 items-center text-ink-sage">
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </Link>
  );
}
