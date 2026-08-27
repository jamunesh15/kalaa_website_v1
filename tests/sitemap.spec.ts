import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { PROJECT } from "./project.config";

/**
 * `lastmod` must describe the page, not the deploy.
 *
 * The rule is in `references/seo.md` under "lastmod is a claim about one page,
 * not a build timestamp": only the page that actually changed gets a new date,
 * and that same date appears everywhere the page states it.
 *
 * None of this is visible to lint or build. A sitemap that stamps every page
 * with the current time compiles perfectly and is worse than having no lastmod
 * at all, because Google drops the signal for the whole site once it stops
 * matching what really changes.
 */

/** Every <url> entry, as a url plus its declared lastmod. */
async function sitemapEntries(request: import("@playwright/test").APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();

  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((block) => {
    const pick = (tag: string) =>
      block[1].match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim() ?? null;
    return { url: pick("loc"), lastmod: pick("lastmod") };
  });
}

test("every sitemap entry declares a lastmod", async ({ request }) => {
  const entries = await sitemapEntries(request);

  expect(entries.length, "the sitemap has no <url> entries at all").toBeGreaterThan(0);

  const missing = entries.filter((entry) => !entry.lastmod).map((entry) => entry.url);
  expect(missing, `entries with no lastmod:\n${missing.join("\n")}`).toEqual([]);
});

test("lastmod is a real modification date, not the time the site was built", async ({ request }) => {
  const entries = await sitemapEntries(request);
  const now = Date.now();

  // The suite builds the site immediately before running, so a lastmod produced
  // by new Date() lands within a couple of minutes of this check. A genuine
  // modification date is set when the content was written, not at build time,
  // so it can never be this recent. Fifteen minutes leaves room for a slow
  // build without letting a build stamp through.
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  const stamped = entries
    .filter((entry) => entry.lastmod && now - new Date(entry.lastmod).getTime() < FIFTEEN_MINUTES)
    .map((entry) => `${entry.url} -> ${entry.lastmod}`);

  expect(
    stamped,
    `these say they changed minutes ago, which means lastmod is a build timestamp:\n${stamped.join("\n")}`,
  ).toEqual([]);
});

test("pages do not all share one identical lastmod", async ({ request }) => {
  const entries = await sitemapEntries(request);
  // Asserted rather than skipped. The registry says how many routes exist, so
  // a short sitemap means the request failed or the sitemap is broken, and
  // skipping on that turns a real failure into a silent pass.
  expect(
    entries.length,
    `the sitemap returned ${entries.length} entries but src/routes.ts declares ${ROUTES.length}`,
  ).toBe(ROUTES.length);

  // Separate pages change on separate days. One value shared to the second by
  // every entry is a single new Date() handed to all of them, which means
  // editing one page silently re-dates the rest.
  const distinct = new Set(entries.map((entry) => entry.lastmod));

  expect(
    distinct.size,
    `all ${entries.length} pages report the same lastmod (${[...distinct][0]}), so editing one re-dates every other page`,
  ).toBeGreaterThan(1);
});

test("the date a page shows and the date the sitemap claims agree", async ({ page, request }) => {
  // Reported as skipped rather than passing on an empty loop, so a project that
  // has no self-dating page says so out loud instead of looking checked.
  test.skip(
    PROJECT.datedPages.length === 0,
    "no page in this project prints its own date, see tests/project.config.ts",
  );

  const entries = await sitemapEntries(request);

  for (const path of PROJECT.datedPages) {
    await page.goto(path);

    // The page prints its own "Last updated" line. A reader can see both that
    // and the sitemap, so the two disagreeing is a contradiction anyone can
    // catch and nothing in the toolchain would notice.
    const shown = await page.locator("body").innerText();
    const match = shown.match(/Last updated\s+(\d{4}-\d{2}-\d{2})/i);
    // Asserted rather than skipped. This page is listed as printing its date, so
    // the line is always there. If it is missing, either the page did not render
    // or somebody removed the date, and both are worth failing on rather than
    // quietly not checking.
    expect(
      match,
      `no "Last updated <date>" line on ${path}, so the sitemap date cannot be cross-checked`,
    ).toBeTruthy();

    const entry = entries.find((item) => item.url?.replace(/\/$/, "").endsWith(path));
    expect(entry, `${path} is not in the sitemap`).toBeTruthy();

    const sitemapDate = entry!.lastmod!.slice(0, 10);
    expect(
      sitemapDate,
      `${path} says it was last updated ${match![1]} and the sitemap says ${sitemapDate}`,
    ).toBe(match![1]);
  }
});

test("every page under src/app is registered in src/routes.ts", () => {
  // The registry drives the sitemap and every browser test in tests/. A page
  // that exists but is not registered is invisible to all of them: absent from
  // the sitemap, and silently excluded from the checks, with nothing going red.
  // That silence is what this catches.
  const appDir = join(process.cwd(), "src", "app");
  const found: string[] = [];

  const walk = (dir: string, urlPath: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      // Route groups (bracketed folders) do not appear in the URL, and api
      // folders are endpoints rather than pages.
      if (entry.name.startsWith("(") || entry.name === "api") continue;

      const next = join(dir, entry.name);
      const nextUrl = urlPath + "/" + entry.name;
      if (existsSync(join(next, "page.tsx")) || existsSync(join(next, "page.ts"))) {
        found.push(nextUrl);
      }
      walk(next, nextUrl);
    }
  };

  if (existsSync(join(appDir, "page.tsx"))) found.push("/");
  walk(appDir, "");

  const registered = new Set(ROUTES.map((route) => route.path));
  const missing = found.filter((path) => !registered.has(path));
  const stale = [...registered].filter((path) => !found.includes(path));

  expect(
    missing,
    "pages with no entry in src/routes.ts, so they are missing from the sitemap and from every test:\n" +
      missing.join("\n"),
  ).toEqual([]);
  expect(
    stale,
    "entries in src/routes.ts with no page behind them:\n" + stale.join("\n"),
  ).toEqual([]);
});

test("no route is registered twice", () => {
  const paths = ROUTES.map((route) => route.path);
  const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);

  expect(duplicates, "duplicate entries in src/routes.ts: " + duplicates.join(", ")).toEqual([]);
});
