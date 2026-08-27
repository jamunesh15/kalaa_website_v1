import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { knownFinding } from "./known-findings";

/**
 * Every link on the page goes somewhere.
 *
 * `engineering-hygiene.md` requires that renaming or removing a page updates
 * every link to it. Nothing else checks that, so a dead link ships silently and
 * is found by a visitor.
 */

// Straight from the app's route registry, so adding a page brings it into
// every one of these checks without editing six files.
const PAGES = ROUTES.map((route) => route.path);

type LinkInfo = { href: string; text: string; target: string | null; rel: string | null };

async function collectLinks(page: import("@playwright/test").Page): Promise<LinkInfo[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll("a")).map((a) => ({
      href: a.getAttribute("href") ?? "",
      text: (a.textContent ?? "").trim().slice(0, 40),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel"),
    })),
  );
}

for (const path of PAGES) {
  test(`${path} has no empty or placeholder links`, async ({ page }) => {
    knownFinding(`${path} has no empty or placeholder links`);
    await page.goto(path);
    const links = await collectLinks(page);

    const bad = links
      .filter((link) => !link.href || link.href === "#" || link.href.toLowerCase().startsWith("javascript:"))
      .map((link) => `"${link.text}" -> ${link.href || "(empty)"}`);

    expect(bad, `links that go nowhere:\n${bad.join("\n")}`).toEqual([]);
  });

  test(`${path} anchor links all have a target on the page`, async ({ page }) => {
    knownFinding(`${path} anchor links all have a target on the page`);
    await page.goto(path);
    const links = await collectLinks(page);
    const anchors = links.filter((link) => link.href.startsWith("#") && link.href.length > 1);

    const broken: string[] = [];
    for (const anchor of anchors) {
      const id = anchor.href.slice(1);
      const count = await page.locator(`[id="${id}"]`).count();
      if (count === 0) broken.push(`"${anchor.text}" -> ${anchor.href} (no element with that id)`);
      if (count > 1) broken.push(`"${anchor.text}" -> ${anchor.href} (${count} elements share that id)`);
    }

    expect(broken, `broken anchors:\n${broken.join("\n")}`).toEqual([]);
  });

  test(`${path} internal links all resolve`, async ({ page, request }) => {
    knownFinding(`${path} internal links all resolve`);
    await page.goto(path);
    const links = await collectLinks(page);

    const internal = [...new Set(
      links
        .map((link) => link.href)
        .filter((href) => href.startsWith("/") && !href.startsWith("//")),
    )];

    const dead: string[] = [];
    for (const href of internal) {
      const response = await request.get(href);
      if (response.status() >= 400) dead.push(`${response.status()} ${href}`);
    }

    expect(dead, `internal links that 404:\n${dead.join("\n")}`).toEqual([]);
  });

  test(`${path} opens external links safely`, async ({ page }) => {
    knownFinding(`${path} opens external links safely`);
    await page.goto(path);
    const links = await collectLinks(page);

    // target="_blank" without rel="noopener" lets the opened page reach back
    // through window.opener.
    const unsafe = links
      .filter((link) => link.target === "_blank" && !(link.rel ?? "").includes("noopener"))
      .map((link) => `"${link.text}" -> ${link.href}`);

    expect(unsafe, `target=_blank without rel=noopener:\n${unsafe.join("\n")}`).toEqual([]);
  });
}
