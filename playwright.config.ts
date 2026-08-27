import { defineConfig, devices } from "@playwright/test";

/**
 * Browser checks for the site.
 *
 * These exist because `lint` and `build` only prove the code compiles. They say
 * nothing about whether the page renders, whether the console is clean, or
 * whether the contrast is readable, and those are the failures a person
 * actually notices.
 *
 * Port 3100 rather than 3000, so a run never collides with a dev server
 * somebody already has open.
 */
const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  /**
   * No retries, deliberately.
   *
   * A retry turns a flaky test green and teaches everyone to ignore it. If
   * something here is unreliable, that is a bug in the test or in the page and
   * it should be fixed rather than re-rolled.
   */
  retries: 0,

  /**
   * Capped, because the suite runs three engines.
   *
   * Playwright defaults to half the cores, which oversubscribes the machine at
   * three engines and makes tests time out under load while passing in seconds
   * on their own. Fewer workers makes the run deterministic, which matters more
   * than the extra minute, since a suite that fails at random is a suite people
   * learn to re-run instead of read.
   */
  workers: 4,

  /**
   * Headroom for a loaded machine, not for a slow page.
   *
   * These are generous enough that contention does not produce a false failure,
   * and tight enough that a genuinely broken page still fails quickly. If
   * something needs longer than this, it is waiting on the wrong thing.
   */
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],

  use: {
    baseURL,

    /**
     * Ask for reduced motion.
     *
     * Playwright will not click an element until it has stopped moving, so any
     * mount or scroll reveal is paid for on every test in every engine. None of
     * these tests are about the animation: what they check, layout, content,
     * metadata and accessibility, is identical either way, and a real visitor
     * with reduced motion set sees exactly this path.
     */
    contextOptions: { reducedMotion: "reduce" },
    // Kept only for failures. A passing run leaves nothing behind to clean up.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /**
   * Three engines, not three browsers.
   *
   * Chrome, Edge, Brave, Opera and Arc are all Blink, so testing one covers
   * them. Firefox is Gecko. Safari is WebKit, and that one is not optional:
   * on iOS every browser is WebKit underneath, so a WebKit bug reaches every
   * iPhone visitor whatever they installed.
   *
   * WebKit is also where the differences actually are. `overflow: clip`,
   * newer viewport units and strict date parsing all behave differently there,
   * and each of them fails quietly rather than loudly.
   */
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],

  /**
   * Tests run against a production build, not `next dev`.
   *
   * Dev mode hides real problems: it skips the production bundling that breaks
   * client/server boundaries, and it adds its own console noise that would have
   * to be filtered out of the "console is clean" assertion.
   */
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    /**
     * Never reuse a server, even locally.
     *
     * Playwright's default is to reuse anything already answering on this port,
     * which skips the whole command above, including the build. That is fast and
     * quietly wrong: a server from an earlier checkout can still be sitting on
     * this port, so a run would test the old build and pass without ever loading
     * the change under test.
     *
     * A suite that goes green against code it did not run is worse than no
     * suite. Rebuilding every time costs about fifteen seconds and removes that
     * whole class of false pass.
     */
    reuseExistingServer: false,
    timeout: 240_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
