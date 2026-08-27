import { expect, test, type Page } from "@playwright/test";
import { knownFinding } from "./known-findings";

/**
 * The one file in this suite that runs with motion switched on.
 *
 * Everything else asks for `prefers-reduced-motion: reduce`, for good reasons
 * recorded in `playwright.config.ts`: Playwright will not click a moving
 * element, and the layout, content and metadata checks read the same either
 * way. The cost of that default is this: with reduced motion set, every reveal
 * on the page renders in its final state, so the entire animated path is
 * invisible to the suite.
 *
 * A reveal that played in reverse shipped through a fully green run for exactly
 * that reason. These tests exist to close that hole, so they override the
 * context option for this file only.
 */
test.use({ contextOptions: { reducedMotion: "no-preference" } });

/**
 * Wait until the page has stopped moving.
 *
 * Written when Lenis owned the scroll position and eased toward its target, so
 * `scrollTo` returned long before the page had arrived and before the observer
 * had a chance to fire. Lenis was removed in the v2 redesign and scrolling is
 * native again, so this usually settles on the first sample. It is kept because
 * it is still the honest way to wait: polling for a scroll position unchanged
 * across several samples is what actually means "settled", and a fixed sleep is
 * either flaky or slow, and usually both.
 */
async function settle(page: Page) {
  await page.waitForFunction(
    () => {
      const w = window as typeof window & { __y?: number; __still?: number };
      const y = Math.round(window.scrollY);
      w.__still = w.__y === y ? (w.__still ?? 0) + 1 : 0;
      w.__y = y;
      return (w.__still ?? 0) >= 3;
    },
    undefined,
    { polling: 100, timeout: 20_000 },
  );
}

/** The index of the first reveal that starts well below the fold. */
async function firstRevealBelowTheFold(page: Page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>(".kalaa-reveal")).findIndex(
      (node) => node.getBoundingClientRect().top > window.innerHeight * 1.5,
    ),
  );
}

test.describe("scroll reveals", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
  });

  /**
   * The complement of the test below, and it has to come first.
   *
   * Without it, the regression test can be satisfied by revealing everything on
   * load, which passes while removing the animation altogether.
   */
  test("a reveal has not fired before the reader reaches it", async ({ page }) => {
    knownFinding("a reveal has not fired before the reader reaches it");
    const index = await firstRevealBelowTheFold(page);
    expect(index, "no reveal starts below the fold, so nothing here is proven").toBeGreaterThan(-1);

    await expect(page.locator(".kalaa-reveal").nth(index)).not.toHaveClass(/kalaa-reveal-in/);
  });

  /**
   * The regression this file was written for.
   *
   * Driving the observer from `entry.isIntersecting` alone is the obvious
   * implementation and it fails twice: the element is hidden the moment its top
   * leaves the screen, which fades out a tall section while it is still being
   * read, and it is revealed again when it re-enters through the top edge on
   * the way back up, which plays the whole section backwards under a reader who
   * has already read it.
   *
   * A reveal is a downward gesture. Once it has played, scrolling up must not
   * take it back.
   */
  test("a reveal is never taken back once the reader has scrolled past it", async ({ page }) => {
    knownFinding("a reveal is never taken back once the reader has scrolled past it");
    const index = await firstRevealBelowTheFold(page);
    expect(index, "no reveal starts below the fold, so nothing here is proven").toBeGreaterThan(-1);

    const target = page.locator(".kalaa-reveal").nth(index);

    // Down to it: this is the reveal itself.
    await target.scrollIntoViewIfNeeded();
    await settle(page);
    await expect(target, "the reveal never fired on the way down").toHaveClass(/kalaa-reveal-in/);

    // Past it, far enough that it sits entirely above the viewport.
    await page.evaluate((i) => {
      const node = document.querySelectorAll<HTMLElement>(".kalaa-reveal")[i];
      const bottom = window.scrollY + node.getBoundingClientRect().bottom;
      window.scrollTo(0, bottom + window.innerHeight);
    }, index);
    await settle(page);

    const above = await target.evaluate((node) => node.getBoundingClientRect().bottom < 0);
    expect(above, "the element never got above the viewport, so the check is meaningless").toBe(true);

    await expect(
      target,
      "the reveal was undone when the element left the top of the viewport, so scrolling back up replays it in reverse",
    ).toHaveClass(/kalaa-reveal-in/);
  });
});

/**
 * The hydrated layout at phone widths.
 *
 * Everything in `responsive.spec.ts` runs under `reducedMotion: "reduce"`, and
 * several components on this site render a static fallback in that state and
 * something interactive once they have mounted. That means the whole suite has
 * been checking one of two layouts, and the one it never sees is the one most
 * visitors get.
 *
 * It cost a real bug. `GrowthLoopRing` swaps in a horizontal card row below
 * `lg:`, and because a grid item defaults to `min-width: auto` that row took
 * the column out to 1296px on a 375px screen. The heading sharing the column
 * stopped wrapping and the section was clipped down its right-hand side. Every
 * automated check passed, because every automated check was rendering the
 * vertical fallback instead.
 *
 * `scrollWidth` against `clientWidth` is the whole assertion, and it is enough:
 * it was 1337 against 375 when this was broken.
 */
const PHONE_WIDTHS = [320, 375, 390, 414];

for (const width of PHONE_WIDTHS) {
  test(`the hydrated page fits a ${width}px screen`, async ({ page }) => {
    knownFinding(`the hydrated page fits a ${width}px screen`);
    await page.setViewportSize({ width, height: 780 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    // The interactive branches only exist after mount. Without this the test
    // measures the fallback and reproduces the blind spot it was written for.
    await expect(page.locator("#process")).toBeVisible();
    await page.locator("#process").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);

    const measured = await page.evaluate(() => {
      const root = document.documentElement;
      const vw = root.clientWidth;

      // Named offenders, so a failure says which element rather than only that
      // the number is wrong. Anything a clipping ancestor hides is skipped:
      // several compositions here are drawn larger than their frame on purpose.
      const offenders: string[] = [];
      for (const node of document.body.querySelectorAll<HTMLElement>("*")) {
        const box = node.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) continue;
        if (box.right <= vw + 1) continue;

        let parent = node.parentElement;
        let clipped = false;
        while (parent) {
          if (getComputedStyle(parent).overflowX !== "visible") { clipped = true; break; }
          parent = parent.parentElement;
        }
        if (clipped) continue;

        const section = node.closest("section")?.id ?? "(outside a section)";
        offenders.push(
          `<${node.tagName.toLowerCase()}> in #${section} reaches ${Math.round(box.right)} of ${vw}`,
        );
        if (offenders.length >= 6) break;
      }

      return { vw, scrollWidth: root.scrollWidth, offenders };
    });

    expect(
      measured.offenders,
      `elements past the right edge once the page has hydrated:\n${measured.offenders.join("\n")}`,
    ).toEqual([]);

    expect(
      measured.scrollWidth,
      `the hydrated page is ${measured.scrollWidth}px wide in a ${measured.vw}px viewport. ` +
        `The usual cause is a horizontally scrolling row inside a grid or flex parent with no ` +
        `min-w-0: the item will not shrink below its content, so the column takes the width of ` +
        `the whole row and every sibling in that column inherits it.`,
    ).toBe(measured.vw);
  });
}
