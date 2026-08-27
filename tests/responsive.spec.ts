import { expect, test, type Page } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { knownFinding } from "./known-findings";

/**
 * The checks `responsive-and-a11y.md` describes as impossible without a browser.
 *
 * A static read of the markup catches the common breakages. It does not catch a
 * layout that is technically fluid and still overflows, and it cannot see a
 * rendered font size. These do both, at the widths that actually matter.
 */

/**
 * The widths worth checking, not a sample of convenient ones.
 *
 * 320 is the narrowest screen still in real use and the one that breaks first.
 * 390 is the common modern phone. 768 is the tablet boundary where most
 * `md:` rules switch. 1024 is the small laptop, and it matters because it is
 * usually the first width where a `lg:` layout has to fit in far less room than
 * it was designed at. 1440 is the common desktop and 1920 catches layouts that
 * only hold together up to a max-width.
 */
const VIEWPORTS = [
  { name: "small phone", width: 320, height: 720 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "small laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1920, height: 1080 },
];

// Straight from the app's route registry, so adding a page brings it into
// every one of these checks without editing six files.
const PAGES = ROUTES.map((route) => route.path);

/**
 * Every section has to be reachable on a phone, not merely present.
 *
 * This exists because the site failed it silently for a long time. The masthead
 * links were `hidden md:block` with no menu behind them, so under 768px a
 * visitor could reach exactly one destination and nothing else on the site.
 * Every other check here passed throughout: nothing overflowed, nothing
 * overlapped, no text shrank. A layout can be perfectly responsive and still
 * have no way to get anywhere, and that is what this catches.
 */
test("every section is reachable from a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const reachable = async () =>
    page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>('header a[href*="#"]'))
        .filter((node) => node.offsetParent !== null)
        .map((node) => new URL(node.href, window.location.href).hash),
    );

  const closed = await reachable();

  // The button that opens the menu, found by what it does rather than by a
  // class, so restyling it does not break this.
  const toggle = page.getByRole("button", { name: /menu/i });
  await expect(
    toggle,
    "no menu control on a phone, so any link hidden below `md:` is unreachable",
  ).toBeVisible();

  await toggle.click();
  const opened = await reachable();

  // Everything the desktop masthead offers has to be here too. A menu that
  // opens but lists fewer places than the wide layout is the same bug, smaller.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const onDesktop = await reachable();

  const missing = onDesktop.filter((hash) => !opened.includes(hash));

  expect(
    missing,
    `reachable on desktop but not from the phone menu: ${missing.join(", ")}\n` +
      `phone with menu closed: ${closed.join(", ")}\n` +
      `phone with menu open: ${opened.join(", ")}`,
  ).toEqual([]);
});

/** Elements that stick out past the viewport, named so a failure is actionable. */
async function findOverflowingElements(page: Page) {
  return page.evaluate(() => {
    const limit = document.documentElement.clientWidth;
    const offenders: string[] = [];

    /**
     * True when some ancestor clips this element horizontally.
     *
     * Not a way to excuse overflow. The question this check asks is whether
     * anything sticks out past the viewport where a visitor can see it, and an
     * element inside a container with `overflow-x: hidden` or `clip` cannot,
     * however large its own box is. The container is still measured on its own
     * account, so real overflow is still caught, one level up.
     *
     * Without this, any composition drawn larger than its frame on purpose
     * reports every shape it contains. A cropped illustration is a deliberate
     * technique, and `getBoundingClientRect` reports untruncated geometry, so
     * the test was failing on pixels nobody has ever seen.
     */
    const isClipped = (node: Element) => {
      let parent = node.parentElement;
      while (parent) {
        if (getComputedStyle(parent).overflowX !== "visible") return true;
        parent = parent.parentElement;
      }
      return false;
    };

    for (const node of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
      const box = node.getBoundingClientRect();
      if (box.width === 0 && box.height === 0) continue;
      // 1px of slack: sub-pixel rounding puts full-width elements marginally over.
      if (box.right <= limit + 1 && box.left >= -1) continue;
      if (isClipped(node)) continue;

      const id = node.id ? `#${node.id}` : "";
      const cls =
        typeof node.className === "string"
          ? `.${node.className.split(/\s+/).filter(Boolean).slice(0, 3).join(".")}`
          : "";
      offenders.push(`<${node.tagName.toLowerCase()}${id}${cls}> right=${Math.round(box.right)} limit=${limit}`);
      if (offenders.length >= 8) break;
    }

    return offenders;
  });
}

for (const viewport of VIEWPORTS) {
  for (const path of PAGES) {
    test(`${path} has no horizontal overflow at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      knownFinding(`${path} has no horizontal overflow at ${viewport.name} (${viewport.width}px)`);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(path, { waitUntil: "networkidle" });

      const scrollsSideways = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      const offenders = await findOverflowingElements(page);

      expect(
        offenders,
        `elements wider than the ${viewport.width}px viewport:\n${offenders.join("\n")}`,
      ).toEqual([]);
      expect(scrollsSideways, "the page itself must never scroll sideways").toBe(false);
    });
  }
}

/**
 * Read every visible piece of text: where it sits, and how big it renders.
 *
 * Measured from the rendered page rather than from the stylesheet, because a
 * size written in `rem`, a `clamp()`, or a breakpoint step all resolve to
 * something different per device, and the only honest question is what the
 * reader actually gets.
 */
async function readText(page: Page) {
  /**
   * Wait for the real typeface before measuring anything.
   *
   * `networkidle` is not the same signal. It resolves when the network settles,
   * and a webfont can still be a frame or two away from swapping in; under
   * several parallel workers it regularly is. Everything below is a measurement
   * of rendered type, so taken too early it describes the fallback face, whose
   * ascent and line box differ from Fraunces.
   *
   * The symptom is specific and was mistaken for a real defect once already:
   * the overlap check reported "Say hello" overlapping "Contact" on the contact
   * hero, on one engine, only when the full suite ran. In isolation it passed
   * every time. The display type is set at `leading-[0.95]`, tight enough that
   * a different face's ascender reaches the eyebrow twelve pixels above it.
   */
  await page.evaluate(() => document.fonts.ready);

  return page.evaluate(() => {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const items: {
      key: string;
      text: string;
      px: number;
      rem: number;
      box: { top: number; left: number; right: number; bottom: number };
      lines: { top: number; left: number; right: number; bottom: number }[];
      flow: boolean;
    }[] = [];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    let index = 0;

    while ((node = walker.nextNode())) {
      const text = node.textContent?.trim();
      if (!text || text.length < 3) continue;

      const element = node.parentElement as HTMLElement | null;
      if (!element || !element.offsetParent) continue;
      // Decoration is layered on purpose and is not read.
      if (element.closest('[aria-hidden="true"]')) continue;

      const style = getComputedStyle(element);
      const range = document.createRange();
      range.selectNodeContents(node);

      /**
       * One box per rendered line, not the single box around all of them.
       *
       * getBoundingClientRect returns the union, so a sentence wrapping over two
       * lines produces a rectangle covering both, plus the empty space at the
       * end of the first line. Compared against a neighbour that legitimately
       * sits in that gap, it reads as a collision when nothing is touching.
       */
      const lines = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
      if (!lines.length) continue;

      const rect = range.getBoundingClientRect();

      items.push({
        // Position in document order, so the same text can be matched between
        // two viewport widths without relying on the string being unique.
        key: `${index++}`,
        text: text.slice(0, 40),
        px: parseFloat(style.fontSize),
        rem: +(parseFloat(style.fontSize) / root).toFixed(3),
        box: {
          top: rect.top + window.scrollY,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom + window.scrollY,
        },
        lines: lines.map((r) => ({
          top: r.top + window.scrollY,
          left: r.left,
          right: r.right,
          bottom: r.bottom + window.scrollY,
        })),
        // Absolutely positioned and fixed elements are layered deliberately, so
        // an intersection there is a design decision rather than a defect.
        flow: style.position === "static" || style.position === "relative",
      });
    }

    return items;
  });
}

for (const path of PAGES) {
  test(`${path} never makes text smaller on a phone than on a desktop`, async ({ page }) => {
    knownFinding(`${path} never makes text smaller on a phone than on a desktop`);
    // The rule this enforces has no number in it, which is the point. Display
    // type is supposed to scale down so a heading fits a narrow screen. Body
    // text and below are not, because the phone is the device held closest to
    // the face and read in the worst light, so shrinking text there makes the
    // one case that is already hardest harder still.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path, { waitUntil: "networkidle" });
    const desktop = await readText(page);

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path, { waitUntil: "networkidle" });
    const phone = await readText(page);

    const byKey = new Map(desktop.map((item) => [item.key, item]));

    const shrunk = phone
      .map((small) => {
        const large = byKey.get(small.key);
        if (!large || large.text !== small.text) return null;
        // Display type is allowed, and expected, to come down on a phone.
        // Anything at or below body size is not.
        if (large.rem > 1) return null;
        if (small.px >= large.px) return null;
        return `${small.px}px on a phone against ${large.px}px on a desktop: "${small.text}"`;
      })
      .filter(Boolean);

    expect(shrunk, `text that gets smaller on the smallest screen:\n${shrunk.join("\n")}`).toEqual([]);
  });

  test(`${path} renders no text below the legibility floor`, async ({ page }) => {
    knownFinding(`${path} renders no text below the legibility floor`);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path, { waitUntil: "networkidle" });

    /**
     * 12px, measured rather than read off the stylesheet.
     *
     * The test above compares a phone against a desktop, so type that is
     * equally tiny on both passes it. This is the absolute floor, and it is
     * deliberately low: 12px is where small print stops being small and starts
     * being unreadable, and the mono labels on this site sit exactly there.
     *
     * `readText` already skips anything inside `aria-hidden`, which is the
     * whole exemption. Type inside a mock interface is illustration, drawn at
     * whatever size the illustration needs and hidden from assistive
     * technology because the real copy beside it says the same thing. Text a
     * visitor is expected to read has no such excuse. The distinction is the
     * point: shrinking real copy below the floor fails, and if something is
     * genuinely decoration it has to say so.
     */
    const FLOOR_PX = 12;

    const tooSmall = (await readText(page))
      .filter((item) => item.px < FLOOR_PX)
      .map((item) => `${item.px}px: "${item.text}"`);

    expect(
      tooSmall,
      `text rendered below ${FLOOR_PX}px that is not marked decorative:\n${tooSmall.join("\n")}`,
    ).toEqual([]);
  });

  test(`${path} has no text sitting on top of other text on a phone`, async ({ page }) => {
    knownFinding(`${path} has no text sitting on top of other text on a phone`);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path, { waitUntil: "networkidle" });

    const items = (await readText(page)).filter((item) => item.flow);

    // Two pieces of text occupying the same space is unreadable, and it is the
    // failure a narrow screen produces most often: something that sat side by
    // side at desktop width refuses to wrap and lands on its neighbour.
    // Overflow tests do not catch it, because nothing leaves the page.
    const collisions: string[] = [];
    for (let i = 0; i < items.length && collisions.length < 6; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        /**
         * Substantially on top of each other, not merely touching.
         *
         * A line box is taller than the distance between lines, so consecutive
         * lines of a tightly-led heading genuinely overlap by a fraction of
         * their height with nothing wrong. Any pixel of intersection therefore
         * reports every tight heading on the page and no true failures.
         *
         * Text actually printed over text overlaps most of both boxes, so the
         * halfway mark separates the two cleanly.
         */
        const hit = items[i].lines.some((a) =>
          items[j].lines.some((b) => {
            const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (overlapX <= 0 || overlapY <= 0) return false;

            const minWidth = Math.min(a.right - a.left, b.right - b.left);
            const minHeight = Math.min(a.bottom - a.top, b.bottom - b.top);
            return overlapX > minWidth / 2 && overlapY > minHeight / 2;
          }),
        );
        if (hit) {
          collisions.push(`"${items[i].text}" overlaps "${items[j].text}"`);
          break;
        }
      }
    }

    expect(collisions, `text overlapping other text at 375px:\n${collisions.join("\n")}`).toEqual([]);
  });
}
