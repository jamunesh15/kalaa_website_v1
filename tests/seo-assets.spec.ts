import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/routes";
import { knownFinding } from "./known-findings";

/**
 * Icons, social images, and every image the page ships.
 *
 * `seo.md` treats an image URL as an address Google has indexed rather than an
 * implementation detail, and a missing favicon or a broken og:image is invisible
 * in code review: nothing warns, the page just looks wrong in a tab or renders
 * as a blank card when somebody shares it.
 */

// Straight from the app's route registry, so adding a page brings it into
// every one of these checks without editing six files.
const PAGES = ROUTES.map((route) => route.path);

/** Absolute URL for a possibly relative asset path. */
const absolute = (href: string, baseURL: string) => new URL(href, baseURL).toString();

/**
 * The same asset, but served by the build under test.
 *
 * Tags like og:image have to be absolute for crawlers, so they point at the
 * production host. Fetching that address here would check whatever is currently
 * deployed instead of the code in this working tree, which is the opposite of
 * what this suite is for: the change under test could be broken and the run
 * would still pass, or the deployed site could be mid-rollout and a correct
 * change would fail.
 *
 * Keeping the path and swapping the origin tests the right build while leaving
 * the absoluteness of the tag itself asserted separately.
 */
const onLocalServer = (href: string, baseURL: string) => {
  const target = new URL(href, baseURL);
  const local = new URL(baseURL);
  target.protocol = local.protocol;
  target.host = local.host;
  return target.toString();
};

/**
 * A meta tag's content, or null when the tag is absent.
 *
 * Playwright's getAttribute waits for the element, so calling it on a missing
 * tag burns the whole timeout and reports "test timeout" instead of naming the
 * tag that is missing. Reading the DOM directly fails immediately and usefully.
 */
const metaContent = (page: import("@playwright/test").Page, property: string) =>
  page.evaluate(
    (sel) => document.querySelector<HTMLMetaElement>(sel)?.content ?? null,
    `meta[property="${property}"], meta[name="${property}"]`,
  );

test("the site has a favicon and an apple touch icon that both load", async ({ page, request, baseURL }) => {
  await page.goto("/");

  const icons = await page.evaluate(() =>
    Array.from(document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')).map((node) => ({
      rel: node.getAttribute("rel") ?? "",
      href: node.getAttribute("href") ?? "",
    })),
  );

  expect(icons.length, "the page declares no icon at all").toBeGreaterThan(0);
  expect(
    icons.some((icon) => icon.rel.includes("icon") && !icon.rel.includes("apple")),
    "no favicon declared, browsers will show a blank tab icon",
  ).toBe(true);
  expect(
    icons.some((icon) => icon.rel === "apple-touch-icon"),
    "no apple-touch-icon, an iOS home screen shortcut gets a screenshot instead",
  ).toBe(true);

  for (const icon of icons) {
    const response = await request.get(absolute(icon.href, baseURL!));
    expect(response.status(), `${icon.rel} at ${icon.href} does not load`).toBe(200);
    expect(
      response.headers()["content-type"] ?? "",
      `${icon.rel} is not served as an image`,
    ).toMatch(/image\//);
  }
});

/**
 * The icon paths, pinned.
 *
 * Google fetches the icon separately, caches it against this exact address, and
 * shows it beside every result on mobile. Rename or move the file and the old
 * address 404s, so the icon disappears from search until Google crawls again,
 * which takes weeks. Nothing in the codebase warns about that, and the damage is
 * only visible in search results, which is why it is worth a test rather than a
 * note in a document.
 *
 * Replacing the image at the same path is fine and this does not stop it. Only
 * the address is pinned.
 */
const PINNED_ICONS = [
  {
    rel: "icon",
    // The root path Google checks even with no <link> tag. Owning it is the
    // whole point, so this is the one that must not move.
    pathname: "/favicon.ico",
    file: "src/app/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    pathname: "/apple-icon",
    file: "src/app/apple-icon.tsx",
  },
];

for (const icon of PINNED_ICONS) {
  test(`the ${icon.rel} is still served from ${icon.pathname}`, async ({ page, baseURL }) => {
    await page.goto("/");

    const declared = await page.evaluate(
      (rel) =>
        Array.from(document.querySelectorAll<HTMLLinkElement>(`link[rel~="${rel}"]`)).map(
          (node) => node.getAttribute("href") ?? "",
        ),
      icon.rel,
    );

    expect(
      declared.length,
      `no <link rel="${icon.rel}"> on the page. If the icon was removed, search results lose it permanently`,
    ).toBeGreaterThan(0);

    // Frameworks append a content hash as a query to bust the browser cache.
    // That changes with the image and is harmless, so compare paths only.
    const paths = declared.map((href) => new URL(href, baseURL!).pathname);

    expect(
      paths,
      `the ${icon.rel} moved. It is now at ${paths.join(", ")} instead of ${icon.pathname}. ` +
        `Google has the old address cached and will show a blank icon until it re-crawls. ` +
        `Put the file back at ${icon.file}, or 301 the old path and update this test on purpose.`,
    ).toContain(icon.pathname);
  });
}

test("only one icon is declared for each rel", async ({ page }) => {
  await page.goto("/");

  // Competing <link rel="icon"> tags let the crawler and the browser disagree
  // about which file is the real one.
  const counts = await page.evaluate(() => ({
    icon: document.querySelectorAll('link[rel~="icon"]:not([rel~="apple-touch-icon"])').length,
    apple: document.querySelectorAll('link[rel~="apple-touch-icon"]').length,
  }));

  expect(counts.icon, "more than one favicon declared").toBeLessThanOrEqual(1);
  expect(counts.apple, "more than one apple-touch-icon declared").toBeLessThanOrEqual(1);
});

/**
 * The favicon must not be the one the framework ships with.
 *
 * Every other check on this file passes for the default: it exists, it loads,
 * it is an image, it sits at the right path, and nothing blocks it. So a site
 * can ship with the framework's logo in the browser tab and in Google's search
 * results with a completely green suite, which is exactly what happened here
 * and was caught by a person looking at the tab rather than by any test.
 *
 * Matching the known default by hash rather than trying to judge the artwork.
 * A test cannot tell a good icon from a bad one, but it can tell that nobody
 * replaced the placeholder, and that is the failure that actually occurs.
 */
const FRAMEWORK_DEFAULT_FAVICON_MD5 = "c30c7d42707a47a3f4591831641e50dc";

test("the favicon is the project's own, not the framework default", async ({ request, baseURL }) => {
  const response = await request.get(absolute("/favicon.ico", baseURL!));
  expect(response.status(), "/favicon.ico does not load").toBe(200);

  const hash = createHash("md5").update(await response.body()).digest("hex");

  expect(
    hash,
    "the favicon is still the one Next.js ships with. It loads and passes every " +
      "other check here, so nothing else catches it, but the browser tab and the " +
      "search result both show the framework logo instead of the brand.",
  ).not.toBe(FRAMEWORK_DEFAULT_FAVICON_MD5);
});

test("the favicon is crawlable", async ({ request }) => {
  // A favicon blocked by robots.txt is the same as a missing one: Google cannot
  // fetch it, so it shows nothing.
  const robots = await (await request.get("/robots.txt")).text();
  const blocked = robots
    .split("\n")
    .filter((line) => /^\s*disallow:/i.test(line))
    .map((line) => line.split(":")[1]?.trim())
    .filter((rule) => rule && rule !== "/" && "/favicon.ico".startsWith(rule));

  expect(blocked, `robots.txt blocks the favicon via: ${blocked.join(", ")}`).toEqual([]);
});

for (const path of PAGES) {
  test(`${path} has a social share image that loads at the right size`, async ({ page, request, baseURL }) => {
    knownFinding(`${path} has a social share image that loads at the right size`);
    await page.goto(path);

    const ogImage = await metaContent(page, "og:image");
    expect(ogImage, "og:image is missing, shared links render as a blank card").toBeTruthy();
    expect(ogImage, "og:image must be absolute, crawlers do not resolve relative paths").toMatch(/^https?:\/\//);

    const url = onLocalServer(ogImage!, baseURL!);
    const response = await request.get(url);
    expect(response.status(), `og:image does not load: ${ogImage}`).toBe(200);
    expect(response.headers()["content-type"] ?? "").toMatch(/image\//);

    // seo.md specifies 1200x630. A different ratio gets cropped unpredictably by
    // each platform, which is how a share card ends up with half a word in it.
    const size = await page.evaluate(
      (src) =>
        new Promise<{ w: number; h: number }>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = () => reject(new Error("could not decode og:image"));
          img.src = src;
        }),
      url,
    );
    expect(size, `og:image should be 1200x630, got ${size.w}x${size.h}`).toEqual({ w: 1200, h: 630 });
  });

  test(`${path} declares the social image dimensions and alt text`, async ({ page }) => {
    knownFinding(`${path} declares the social image dimensions and alt text`);
    await page.goto(path);

    for (const property of ["og:image:width", "og:image:height"]) {
      const value = await metaContent(page, property);
      expect(value, `${property} is missing, so the card reflows while the image loads`).toBeTruthy();
    }

    const alt = await metaContent(page, "og:image:alt");
    expect(alt, "og:image:alt is missing").toBeTruthy();
  });

  test(`${path} ships no broken or unsized images`, async ({ page, request, baseURL }) => {
    knownFinding(`${path} ships no broken or unsized images`);
    await page.goto(path, { waitUntil: "networkidle" });

    const images = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img")).map((img) => ({
        src: img.currentSrc || img.src,
        loaded: img.complete && img.naturalWidth > 0,
        hasWidth: img.hasAttribute("width") || getComputedStyle(img).aspectRatio !== "auto",
        hasHeight: img.hasAttribute("height") || getComputedStyle(img).aspectRatio !== "auto",
        alt: img.getAttribute("alt"),
      })),
    );

    const broken = images.filter((img) => !img.loaded).map((img) => img.src);
    expect(broken, `images that failed to load:\n${broken.join("\n")}`).toEqual([]);

    // Without dimensions or an aspect ratio the layout jumps as each image
    // arrives, which is the usual cause of a bad CLS score.
    const unsized = images.filter((img) => !img.hasWidth || !img.hasHeight).map((img) => img.src);
    expect(
      unsized,
      `images with no width/height or aspect-ratio (causes layout shift):\n${unsized.join("\n")}`,
    ).toEqual([]);

    for (const img of images) {
      const response = await request.get(absolute(img.src, baseURL!));
      expect(response.status(), `image 404s: ${img.src}`).toBeLessThan(400);
    }
  });

  test(`${path} serves every image from an allowed host`, async ({ page, baseURL }) => {
    knownFinding(`${path} serves every image from an allowed host`);
    await page.goto(path, { waitUntil: "networkidle" });

    const origin = new URL(baseURL!).origin;
    const remote = await page.evaluate(
      (pageOrigin) =>
        Array.from(document.querySelectorAll("img"))
          .map((img) => img.currentSrc || img.src)
          .filter((src) => src.startsWith("http") && new URL(src).origin !== pageOrigin)
          .map((src) => new URL(src).host),
      origin,
    );

    // Moving images to a new host resets their image-search history and needs
    // an entry in next.config images.remotePatterns. Neither happens by
    // accident, so a new host appearing here should be a deliberate decision.
    const hosts = [...new Set(remote)];
    expect(hosts, `images served from a host other than the site itself:\n${hosts.join("\n")}`).toEqual([]);
  });
}

test("titles and descriptions are unique per page", async ({ page }) => {
  const seen: { path: string; title: string; description: string }[] = [];

  for (const path of PAGES) {
    await page.goto(path);
    seen.push({
      path,
      title: await page.title(),
      description: (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
    });
  }

  // Two pages sharing a title or description compete with each other in search
  // and Search Console reports both as duplicates.
  for (const field of ["title", "description"] as const) {
    const values = seen.map((entry) => entry[field]);
    const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
    expect(duplicates, `pages sharing the same ${field}: ${duplicates.join(" | ")}`).toEqual([]);
  }
});

for (const path of PAGES) {
  test(`${path} keeps canonical, og:url and the sitemap in agreement`, async ({ page, request }) => {
    knownFinding(`${path} keeps canonical, og:url and the sitemap in agreement`);
    await page.goto(path);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const ogUrl = await metaContent(page, "og:url");

    expect(canonical, "no canonical").toBeTruthy();
    expect(ogUrl, "no og:url").toBeTruthy();

    // These three describe the same address. When one is updated and the others
    // are not, the page tells crawlers two different stories about where it lives.
    const normalise = (url: string) => url.replace(/\/$/, "").toLowerCase();
    expect(normalise(ogUrl!), "og:url and canonical disagree").toBe(normalise(canonical!));

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap, `${canonical} is not in the sitemap`).toContain(
      normalise(canonical!).replace(/^https?:\/\//, "").replace(/^www\./, ""),
    );
  });
}
