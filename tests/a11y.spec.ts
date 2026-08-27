import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { knownFinding } from "./known-findings";

/**
 * Accessibility and valid-markup checks that need a rendered page.
 *
 * Each of these is a rule already written down in
 * `.claude/skills/web-standard/references/responsive-and-a11y.md`. None of
 * them can be verified by reading the source, which is why this kind of bug
 * ships: `lint` and `build` both pass on every one of them.
 */

// Straight from the app's route registry, so adding a page brings it into
// every one of these checks without editing six files.
const PAGES = ROUTES.map((route) => route.path);

for (const path of PAGES) {
  test(`${path} has no duplicate DOM ids`, async ({ page }) => {
    knownFinding(`${path} has no duplicate DOM ids`);
    await page.goto(path);

    const duplicates = await page.evaluate(() => {
      const counts = new Map<string, number>();
      for (const node of Array.from(document.querySelectorAll("[id]"))) {
        counts.set(node.id, (counts.get(node.id) ?? 0) + 1);
      }
      return [...counts.entries()]
        .filter(([, count]) => count > 1)
        .map(([id, count]) => {
          const tags = Array.from(document.querySelectorAll(`[id="${id}"]`))
            .map((n) => n.tagName.toLowerCase())
            .join(", ");
          return `id="${id}" used ${count} times on: ${tags}`;
        });
    });

    // A repeated id makes <label for> ambiguous and breaks anchor navigation,
    // and it is invalid HTML.
    expect(duplicates, `duplicate ids:\n${duplicates.join("\n")}`).toEqual([]);
  });

  test(`${path} exposes the landmarks a screen reader navigates by`, async ({ page }) => {
    knownFinding(`${path} exposes the landmarks a screen reader navigates by`);
    await page.goto(path);

    // A <footer> nested inside <main> is not exposed as contentinfo, so the
    // landmark disappears even though the element is there.
    const landmarks = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      return {
        hasMain: !!document.querySelector("main"),
        hasFooterElement: !!footer,
        footerIsInsideMain: footer ? !!footer.closest("main") : null,
      };
    });

    expect(landmarks.hasMain, "the page needs a <main>").toBe(true);

    // Whether a page carries a footer is a design decision. Whether a footer it
    // does carry is reachable as a landmark is not, so only that is asserted.
    if (!landmarks.hasFooterElement) return;

    expect(
      landmarks.footerIsInsideMain,
      "a <footer> inside <main> is not the contentinfo landmark, move it out",
    ).toBe(false);
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
}

for (const path of PAGES) {
  test(`${path} has readable contrast on every piece of text`, async ({ page }) => {
    knownFinding(`${path} has readable contrast on every piece of text`);
    await page.goto(path);

    // The thresholds are WCAG AA, which responsive-and-a11y.md requires.
    // Reading it off the rendered colours is both faster and more reliable than
    // checking it by eye.
    const result = await page.evaluate(() => {
      /**
       * Colours are resolved by painting them, not by parsing the string.
       *
       * Parsing looks obvious and is wrong. Tailwind emits `oklab(0.99 0.00004
       * 0.00002 / 0.7)` for any colour with an opacity modifier, and reading the
       * first three numbers as red, green and blue turns near-white into
       * near-black. That produces a page full of confident, completely false
       * failures.
       *
       * A 1x1 canvas hands the problem to the browser's own colour engine, which
       * understands every notation it can emit, now and later, and composites
       * alpha correctly while it is at it.
       */
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

      type RGB = { r: number; g: number; b: number };

      /** Paint layers bottom-up and read back what a viewer would see. */
      const paint = (layers: string[]): RGB => {
        ctx.clearRect(0, 0, 1, 1);
        for (const layer of layers) {
          ctx.fillStyle = layer;
          ctx.fillRect(0, 0, 1, 1);
        }
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return { r, g, b };
      };

      /** True when a colour string is fully opaque, asked of the canvas. */
      const isOpaque = (colour: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data[3] === 255;
      };

      const luminance = ({ r, g, b }: RGB) => {
        const channel = (value: number) => {
          const v = value / 255;
          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
      };

      /**
       * Every background layer above this element, bottom-most first.
       *
       * Returns null only where a layer is an image or a gradient, because then
       * there is genuinely no single colour behind the text to measure.
       */
      const backgroundLayers = (element: Element | null): string[] | null => {
        const layers: string[] = [];
        while (element) {
          const style = getComputedStyle(element);
          if (style.backgroundImage !== "none") return null;
          const colour = style.backgroundColor;
          if (colour && !/,\s*0\)$/.test(colour)) {
            layers.unshift(colour);
            if (isOpaque(colour)) break;
          }
          element = element.parentElement;
        }
        return layers.length ? layers : null;
      };

      const failures: string[] = [];
      let checked = 0;
      let unmeasurable = 0;

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent?.trim();
        if (!text || text.length < 3) continue;

        const element = node.parentElement;
        if (!element || !(element as HTMLElement).offsetParent) continue;
        if (element.closest("script, style, noscript")) continue;

        // Decoration is exempt, and the markup is where that gets declared.
        // WCAG excludes pure decoration from the contrast rules, and an element
        // marked aria-hidden has been deliberately taken out of the accessible
        // tree by whoever wrote it.
        //
        // This is the one exemption. It is not a way to silence a real failure,
        // because hiding readable content from assistive technology to pass a
        // contrast check trades one accessibility problem for a worse one.
        if (element.closest('[aria-hidden="true"]')) continue;

        const style = getComputedStyle(element);
        const layers = backgroundLayers(element);

        if (!layers) {
          unmeasurable += 1;
          continue;
        }

        checked += 1;
        // Paint the background stack, then the text colour on top of it, so
        // translucent text is judged on what a reader actually sees.
        const behind = luminance(paint(layers));
        const foreground = luminance(paint([...layers, style.color]));
        const ratio =
          (Math.max(foreground, behind) + 0.05) / (Math.min(foreground, behind) + 0.05);

        const size = parseFloat(style.fontSize);
        const bold = Number(style.fontWeight) >= 700;
        // WCAG counts 24px, or 18.66px when bold, as large text.
        const isLarge = size >= 24 || (size >= 18.66 && bold);
        const required = isLarge ? 3 : 4.5;

        if (ratio < required) {
          failures.push(
            `${ratio.toFixed(2)}:1 where ${required}:1 is needed, ` +
              `${Math.round(size)}px${bold ? " bold" : ""}, "${text.slice(0, 45)}"`,
          );
        }
      }

      return { checked, unmeasurable, failures };
    });

    expect(
      result.checked,
      "no text could be measured at all, which means this check is not doing anything",
    ).toBeGreaterThan(0);

    expect(
      result.failures,
      `text below the contrast the rules require ` +
        `(${result.checked} measured, ${result.unmeasurable} skipped over images or translucency):\n` +
        result.failures.join("\n"),
    ).toEqual([]);
  });
}

for (const path of PAGES) {
  test(`${path} keeps every form control at or above the root text size`, async ({ page }) => {
    knownFinding(`${path} keeps every form control at or above the root text size`);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);

    // Measured against the root size the page actually renders at, not a number
    // written here. One rem is whatever the reader has chosen, so comparing to it
    // keeps holding for somebody who has raised their browser's default text
    // size, which a fixed threshold would quietly stop doing for exactly them.
    //
    // Safari zooms the whole page when a focused control sits below that size,
    // and getting back out is awkward enough that it reads as a broken page.
    const tooSmall = await page.evaluate(() => {
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize);

      return Array.from(document.querySelectorAll<HTMLElement>("input, select, textarea"))
        .filter((node) => node.offsetParent !== null)
        .map((node) => ({
          control: node.getAttribute("name") || node.id || node.tagName.toLowerCase(),
          rem: +(parseFloat(getComputedStyle(node).fontSize) / root).toFixed(3),
        }))
        .filter((entry) => entry.rem < 1);
    });

    expect(
      tooSmall,
      `form controls rendering below 1rem: ${JSON.stringify(tooSmall)}`,
    ).toEqual([]);
  });

  test(`${path} reaches every link by keyboard alone`, async ({ page }) => {
    knownFinding(`${path} reaches every link by keyboard alone`);
    await page.goto(path);

    // A link that cannot be tabbed to does not exist for a keyboard user, and it
    // looks completely normal on screen. The usual causes are a negative
    // tabindex left behind by a refactor, or a div dressed up as a link.
    const unreachable = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))
        .filter((node) => node.offsetParent !== null)
        .filter((node) => Number(node.getAttribute("tabindex")) < 0)
        .map((node) => `"${(node.textContent ?? "").trim().slice(0, 30)}" -> ${node.getAttribute("href")}`),
    );

    expect(
      unreachable,
      `links removed from the tab order:\n${unreachable.join("\n")}`,
    ).toEqual([]);
  });

}
