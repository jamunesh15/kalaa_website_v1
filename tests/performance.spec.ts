import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { knownFinding } from "./known-findings";

/**
 * The parts of `references/performance.md` a browser can prove.
 *
 * Speed is not a separate concern from SEO, `seo.md` says so outright, so
 * leaving this unchecked means half the search rules are enforced and half are
 * on trust.
 *
 * Read the two measurements differently, because they are not equally honest:
 *
 * - **CLS is a layout calculation.** It does not care how fast the machine is,
 *   so the 0.1 threshold from the rules applies here exactly as it applies in
 *   the field. Trust this one.
 * - **LCP is a stopwatch on this machine**, which has a local server and no
 *   network in the way. It will always look better here than on a phone on
 *   mobile data, so the budget below is a regression guard, not a field
 *   measurement. It catches "this got much worse", not "this is fast enough for
 *   a real visitor".
 */

const CLS_LIMIT = 0.1;
const LCP_BUDGET_MS = 2500;

type Vitals = { cls: number; lcp: number };

async function measure(page: import("@playwright/test").Page, path: string): Promise<Vitals> {
  await page.goto(path, { waitUntil: "networkidle" });

  // Shifts keep arriving after load, as fonts settle and anything deferred
  // arrives. Measuring immediately would report a flattering zero.
  await page.waitForTimeout(1500);

  return page.evaluate(
    () =>
      new Promise<Vitals>((resolve) => {
        let cls = 0;
        let lcp = 0;

        // buffered: true collects entries from before this ran, which is the
        // only way to see shifts and paints that happened during load.
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as PerformanceEntry[]) {
            const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
            // A shift the user caused by tapping is not a defect.
            if (!shift.hadRecentInput) cls += shift.value;
          }
        }).observe({ type: "layout-shift", buffered: true });

        new PerformanceObserver((list) => {
          lcp = list.getEntries().at(-1)?.startTime ?? 0;
        }).observe({ type: "largest-contentful-paint", buffered: true });

        setTimeout(() => resolve({ cls: +cls.toFixed(4), lcp: Math.round(lcp) }), 800);
      }),
  );
}

for (const route of ROUTES) {
  test(`${route.path} does not shift as it loads`, async ({ page, browserName }) => {
    knownFinding(`${route.path} does not shift as it loads`);
    // Chromium only, and this is a capability gap rather than a hidden failure:
    // layout-shift and largest-contentful-paint are not implemented in WebKit or
    // Gecko, so there is nothing to read there.
    test.skip(browserName !== "chromium", "layout-shift is a Chromium-only API");

    const { cls } = await measure(page, route.path);

    expect(
      cls,
      `cumulative layout shift is ${cls}, over the ${CLS_LIMIT} the rules allow. ` +
        `Something is moving after it renders: an image or embed with no width and height, ` +
        `a font swapping to different metrics, or content being inserted above existing content.`,
    ).toBeLessThanOrEqual(CLS_LIMIT);
  });

  test(`${route.path} paints its main content within budget`, async ({ page, browserName }) => {
    knownFinding(`${route.path} paints its main content within budget`);
    test.skip(browserName !== "chromium", "largest-contentful-paint is a Chromium-only API");

    const { lcp } = await measure(page, route.path);

    expect(
      lcp,
      `largest contentful paint is ${lcp}ms against a ${LCP_BUDGET_MS}ms budget. ` +
        `This is measured on a fast machine against a local server, so a real visitor is slower. ` +
        `Treat it as a regression: something on the critical path got heavier.`,
    ).toBeLessThanOrEqual(LCP_BUDGET_MS);
  });

  test(`${route.path} loads its images the right way round`, async ({ page }) => {
    knownFinding(`${route.path} loads its images the right way round`);
    await page.goto(route.path, { waitUntil: "networkidle" });

    const wrong = await page.evaluate(() => {
      const problems: string[] = [];

      for (const img of Array.from(document.querySelectorAll("img"))) {
        const box = img.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) continue;

        const src = (img.currentSrc || img.src || "(no src)").split("/").pop();
        const aboveFold = box.top < window.innerHeight;
        const lazy = img.getAttribute("loading") === "lazy";

        // Lazy-loading the first image the visitor sees delays the very paint
        // LCP measures. It is the single most common way to make a page feel
        // slow while every other number looks fine.
        if (aboveFold && lazy) {
          problems.push(`${src}: above the fold but loading="lazy", which delays LCP`);
        }
        if (!aboveFold && !lazy) {
          problems.push(`${src}: below the fold but not loading="lazy", so it competes with the first paint`);
        }
      }

      return problems;
    });

    expect(wrong, `image loading problems:\n${wrong.join("\n")}`).toEqual([]);
  });
}
