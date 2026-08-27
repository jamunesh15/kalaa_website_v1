import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { SITE } from "../src/site";
import { knownFinding } from "./known-findings";

/**
 * SEO is half of what this repository's standard covers, and none of it is
 * verifiable without loading the page. `build` will happily ship a page with no
 * canonical, a duplicate h1, or JSON-LD that does not parse.
 */

// Straight from the app's route registry, so adding a page brings it into
// every one of these checks without editing six files.
const PAGES = ROUTES.map((route) => route.path);

for (const path of PAGES) {
  test(`${path} carries the metadata a crawler needs`, async ({ page }) => {
    knownFinding(`${path} carries the metadata a crawler needs`);
    await page.goto(path);

    const title = await page.title();
    expect(title.length, "a page needs a title").toBeGreaterThan(10);
    expect(title.length, `title is ${title.length} chars, search results cut around 60`).toBeLessThanOrEqual(70);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description, "a page needs a meta description").toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    expect(description!.length, "descriptions are truncated past about 160 chars").toBeLessThanOrEqual(200);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical, "a page needs a canonical URL").toBeTruthy();
    expect(canonical, "the canonical must be absolute").toMatch(/^https?:\/\//);
  });

  test(`${path} has social card tags`, async ({ page }) => {
    knownFinding(`${path} has social card tags`);
    await page.goto(path);

    for (const property of ["og:title", "og:description", "og:url", "og:type"]) {
      const content = await page.locator(`meta[property="${property}"]`).first().getAttribute("content");
      expect(content, `${property} is missing`).toBeTruthy();
    }

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute("content");
    expect(twitterCard, "twitter:card is missing").toBeTruthy();
  });

  test(`${path} sets the three attributes every page needs`, async ({ page }) => {
    knownFinding(`${path} sets the three attributes every page needs`);
    await page.goto(path);

    const head = await page.evaluate(() => ({
      lang: document.documentElement.getAttribute("lang"),
      viewport: document.querySelector<HTMLMetaElement>('meta[name="viewport"]')?.content ?? null,
      themeColor: document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.content ?? null,
    }));

    // Without lang, a screen reader guesses the language and can read English
    // with the wrong pronunciation rules, and translation tools mis-detect it.
    expect(head.lang, "<html> has no lang attribute").toBeTruthy();

    // Without this, a phone renders the page at desktop width and zooms out,
    // which makes every responsive rule in the project irrelevant.
    expect(head.viewport, "no viewport meta tag").toBeTruthy();
    expect(head.viewport, "the viewport tag does not set width=device-width").toContain(
      "width=device-width",
    );

    // performance.md requires theme-color on every page. It colours the browser
    // chrome on mobile, and its absence is the sort of thing nobody notices
    // until the page looks unfinished on a phone.
    expect(head.themeColor, "no theme-color meta tag").toBeTruthy();
  });

  test(`${path} has exactly one h1 and no skipped heading levels`, async ({ page }) => {
    knownFinding(`${path} has exactly one h1 and no skipped heading levels`);
    await page.goto(path);

    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((node) => ({
        level: Number(node.tagName[1]),
        text: (node.textContent ?? "").trim().slice(0, 50),
      })),
    );

    const h1s = levels.filter((entry) => entry.level === 1);
    expect(h1s.length, `expected one h1, found ${h1s.length}: ${h1s.map((h) => h.text).join(" | ")}`).toBe(1);

    // A jump from h2 straight to h4 breaks the outline a screen reader and a
    // crawler both read the page structure from.
    const skips: string[] = [];
    for (let i = 1; i < levels.length; i += 1) {
      if (levels[i].level - levels[i - 1].level > 1) {
        skips.push(`h${levels[i - 1].level} "${levels[i - 1].text}" -> h${levels[i].level} "${levels[i].text}"`);
      }
    }
    expect(skips, `skipped heading levels:\n${skips.join("\n")}`).toEqual([]);
  });

  test(`${path} has alt text on every meaningful image`, async ({ page }) => {
    knownFinding(`${path} has alt text on every meaningful image`);
    await page.goto(path);

    const missing = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((img) => img.getAttribute("aria-hidden") !== "true" && img.alt === null)
        .map((img) => img.getAttribute("src") ?? "(no src)"),
    );

    // A decorative image is fine, but it has to say so with alt="" or
    // aria-hidden. A missing alt attribute is the unhandled case.
    expect(missing, `images with no alt attribute:\n${missing.join("\n")}`).toEqual([]);
  });
}

test("the structured data parses and describes real things", async ({ page }) => {
  await page.goto("/");

  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(blocks.length, "the landing page should carry JSON-LD").toBeGreaterThan(0);

  const seenTypes = new Set<string>();

  for (const raw of blocks) {
    let parsed: unknown;
    expect(() => {
      parsed = JSON.parse(raw);
    }, "JSON-LD must be valid JSON or search engines discard it silently").not.toThrow();

    const entries = Array.isArray(parsed) ? parsed : [parsed];
    for (const entry of entries as Record<string, unknown>[]) {
      const graph = (entry["@graph"] as Record<string, unknown>[]) ?? [entry];
      for (const node of graph) {
        const type = node["@type"];
        expect(type, `every JSON-LD node needs an @type: ${JSON.stringify(node).slice(0, 80)}`).toBeTruthy();
        if (typeof type === "string") seenTypes.add(type);
      }
    }
  }

  // A rewrite of page.tsx that quietly drops one of these nodes changes how the
  // page is understood by search and answer engines. Fail loudly if it happens,
  // so it comes back as a deliberate decision, not a silent regression.
  //
  // Add to this list as the page grows: FAQPage once there is an FAQ, HowTo
  // once there is a documented workflow, SoftwareApplication once the product
  // is described here.
  for (const required of ["Organization", "WebSite"] as const) {
    expect(seenTypes.has(required), `JSON-LD graph is missing @type "${required}"`).toBe(true);
  }
});

test("robots.txt points at the sitemap, and the sitemap lists every page", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots, "robots.txt must declare the sitemap").toMatch(/Sitemap:\s*https?:\/\//i);

  const host = SITE.url.replace(/^https?:\/\//, "");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of PAGES) {
    const expected = path === "/" ? `${host}/` : `${host}${path}`;
    expect(sitemap, `${path} is missing from the sitemap`).toContain(expected);
  }
});
