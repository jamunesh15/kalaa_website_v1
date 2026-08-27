#!/usr/bin/env node
/**
 * Screenshot a running page, headlessly.
 *
 *   node scripts/shot.mjs <url> <outfile> [width] [height] [full]
 *
 * This exists so the page can be looked at without a browser open. Chromium is
 * already installed for the Playwright suite, so it costs nothing extra.
 *
 * `document.fonts.ready` matters: both faces load with `display: swap`, so a
 * screenshot taken too early is a picture of the fallback stack, which is
 * exactly the thing you would not want to be judging a layout against.
 */
import { chromium } from "@playwright/test";

const [url, out, w = "1440", h = "900", full = ""] = process.argv.slice(2);

if (!url || !out) {
  console.error("usage: node scripts/shot.mjs <url> <outfile> [width] [height] [full]");
  process.exit(1);
}

/**
 * `channel: "chromium"` forces the full browser rather than the headless shell.
 *
 * The shell is what Playwright launches by default and what the test suite
 * uses, and on this machine it answers `Page.captureScreenshot` with "Unable to
 * capture screenshot". The full build has no such problem. Worth knowing before
 * anyone tries to make this faster by dropping the channel.
 */
const browser = await chromium.launch({ channel: "chromium" });
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out, fullPage: full === "full" });
await browser.close();
console.log("saved", out);
