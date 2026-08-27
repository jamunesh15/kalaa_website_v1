import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { PROJECT } from "./project.config";

/**
 * Does the page actually render, and is the console clean?
 *
 * This is the check `build` cannot make. A page that compiles can still throw
 * on hydration, 404 an asset, or render nothing at all.
 */

/** Console noise that is not ours and would fail every run if left in. */
const IGNORED_CONSOLE = [
  /favicon/i,
  /Download the React DevTools/i,

  /**
   * Warnings the test harness causes, not the page.
   *
   * Firefox tags anything injected by the automation driver with
   * `debugger eval code`, and Playwright's own visibility and actionability
   * checks read layout, which makes Firefox warn that layout was forced before
   * load. The site never emits it: open the page in Firefox by hand and the
   * console is clean.
   *
   * Matching on the source rather than the wording is deliberate. It keeps this
   * narrow to code that is definitionally not shipped, instead of muting a class
   * of warning the page could legitimately produce one day.
   */
  /debugger eval code/,
];

function watchConsole(page: import("@playwright/test").Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error" && message.type() !== "warning") return;
    const text = message.text();
    if (IGNORED_CONSOLE.some((pattern) => pattern.test(text))) return;
    errors.push(`${message.type()}: ${text}`);
  });

  // An uncaught exception never reaches the console listener, so it needs its own.
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));

  return errors;
}

for (const route of ROUTES) {
  test(`${route.path} renders with a clean console`, async ({ page }) => {
    const problems = watchConsole(page);
    const failedRequests: string[] = [];

    page.on("response", (response) => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto(route.path, { waitUntil: "networkidle" });

    await expect(page).toHaveTitle(PROJECT.titlePattern);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    expect(problems, `console problems:\n${problems.join("\n")}`).toEqual([]);
    expect(failedRequests, `failed requests:\n${failedRequests.join("\n")}`).toEqual([]);
  });
}

test("the shared page skeleton is on the page", async ({ page }) => {
  await page.goto("/");

  // Primary navigation and the footer bracket every page. If either is missing
  // the layout has broken rather than the content.
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});

test("the crawler endpoints answer", async ({ request }) => {
  for (const path of PROJECT.crawlerEndpoints) {
    const response = await request.get(path);
    expect(response.status(), `${path} should be reachable`).toBe(200);
    expect((await response.text()).trim().length, `${path} should not be empty`).toBeGreaterThan(0);
  }
});
