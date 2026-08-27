import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { knownFinding } from "./known-findings";

/**
 * The copy rules from `references/content.md`, checked against what actually
 * renders rather than against the source.
 *
 * The em dash rule is here because it is the one that gets broken most often. A
 * rule broken that often is a rule nothing enforces.
 */

// Straight from the app's route registry, so adding a page brings it into
// every one of these checks without editing six files.
const PAGES = ROUTES.map((route) => route.path);

/** Visible text only. Script and style contents are not copy. */
async function visibleText(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        // Code and terminal samples are quoted material, not prose.
        if (parent.closest("code, pre")) return NodeFilter.FILTER_REJECT;
        return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const chunks: string[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) chunks.push(node.textContent!.trim());
    return chunks.join("\n");
  });
}

/** Lines carrying a banned character, quoted back so the failure is actionable. */
function offenders(text: string, pattern: RegExp) {
  return text
    .split("\n")
    .filter((line) => pattern.test(line))
    .map((line) => line.slice(0, 90));
}

for (const path of PAGES) {
  test(`${path} uses no em dashes`, async ({ page }) => {
    knownFinding(`${path} uses no em dashes`);
    await page.goto(path);
    const found = offenders(await visibleText(page), /—/);

    expect(found, `em dashes in visible copy:\n${found.join("\n")}`).toEqual([]);
  });

  test(`${path} uses no ellipsis character or curly quotes`, async ({ page }) => {
    knownFinding(`${path} uses no ellipsis character or curly quotes`);
    await page.goto(path);
    const text = await visibleText(page);

    // A literal "..." is sometimes a real placeholder in an input; the single
    // ellipsis glyph is the typographic tell the rule is about.
    expect(offenders(text, /…/), "ellipsis characters").toEqual([]);
    expect(offenders(text, /[‘’“”]/), "curly quotes, use straight ones").toEqual([]);
  });

  test(`${path} avoids the negative-parallelism tell`, async ({ page }) => {
    knownFinding(`${path} avoids the negative-parallelism tell`);
    await page.goto(path);
    const text = await visibleText(page);

    // "not just X, it's Y" and its variants.
    const found = offenders(text, /\bnot (just|only|merely)\b[^.!?]{0,60}\b(it'?s|but)\b/i);
    expect(found, `negative parallelism:\n${found.join("\n")}`).toEqual([]);
  });

  test(`${path} avoids the AI vocabulary set`, async ({ page }) => {
    knownFinding(`${path} avoids the AI vocabulary set`);
    await page.goto(path);
    const text = await visibleText(page);

    const banned = [
      "delve", "leverage", "seamless", "robust", "elevate", "unlock", "empower",
      "streamline", "foster", "testament", "tapestry", "vibrant", "pivotal",
      "intricate", "underscore", "realm", "boasts", "nestled",
      "in today's fast-paced world", "at its core", "in the realm of",
    ];

    const found = banned
      .map((word) => ({ word, lines: offenders(text, new RegExp(`\\b${word}\\b`, "i")) }))
      .filter((entry) => entry.lines.length > 0)
      .map((entry) => `"${entry.word}": ${entry.lines[0]}`);

    expect(found, `AI vocabulary in visible copy:\n${found.join("\n")}`).toEqual([]);
  });

  test(`${path} has no heading long enough to wrap badly on a phone`, async ({ page }) => {
    knownFinding(`${path} has no heading long enough to wrap badly on a phone`);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);

    const tooLong = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((node) => ({
          level: node.tagName,
          text: (node.textContent ?? "").trim(),
          lines: Math.round(
            node.getBoundingClientRect().height /
              parseFloat(getComputedStyle(node).lineHeight || "1"),
          ),
        }))
        .filter((entry) => entry.lines > 4)
        .map((entry) => `${entry.level} wraps to ${entry.lines} lines: "${entry.text.slice(0, 60)}"`),
    );

    expect(tooLong, `headings wrapping too far on a 375px screen:\n${tooLong.join("\n")}`).toEqual([]);
  });
}
