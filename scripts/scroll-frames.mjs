#!/usr/bin/env node
/**
 * Scroll frame times through one section, with real wheel events.
 *
 * This is how the work band's judder was found and how the fix was proved.
 * Run it against a PRODUCTION server (dev mode adds its own stalls):
 *
 *   npx next build && npx next start -p 3100
 *   EXP_URL=http://localhost:3100/ node scripts/scroll-frames.mjs baseline 3
 *   EXP_URL=http://localhost:3100/ node scripts/scroll-frames.mjs control:services 3
 *
 * Modes: baseline | control:<section id> | novideo (reel requests blocked) |
 * nomedia (every /work/ request blocked) | noshadow | noradius | noboth |
 * hideimg. Add --trace on the last rep for a Chrome trace summary.
 *
 * Read the WARM reps, not the cold one: the first pass through a band pays
 * for image requests and always shows a few long frames. A healthy band on
 * a 120Hz machine reads "median 8.3 ... >20ms 0"; compare the band you are
 * looking at with a control band in the same run, never with a number from
 * another day.
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";

const mode = process.argv[2] ?? "baseline"; // baseline | novideo | nomedia
const reps = Number(process.argv[3] ?? 3);
const doTrace = process.argv.includes("--trace");
const url = process.env.EXP_URL ?? "http://localhost:3000/";

const browser = await chromium.launch({ channel: "chromium" });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
if (mode === "novideo") await ctx.route(/\/work\/reels\/.*\.(webm|mp4)(\?.*)?$/, (r) => r.abort());
if (mode === "nomedia") await ctx.route(/\/work\//, (r) => r.abort());
const page = await ctx.newPage();
// nopause: reels keep playing while the page moves (the pause in WorkWall becomes a no-op)
if (mode === "nopause") await page.addInitScript(() => { HTMLMediaElement.prototype.pause = function () {}; });
const CSS = {
  noshadow: ".work-tile{box-shadow:none!important}",
  noradius: ".work-tile{border-radius:0!important;overflow:visible!important}",
  noboth: ".work-tile{box-shadow:none!important;border-radius:0!important;overflow:visible!important}",
  hideimg: ".work-tile img{visibility:hidden!important}",
};
const SECTION = mode.startsWith("control:") ? mode.slice(8) : "work";
await page.addInitScript(() => {
  window.__ev = [];
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      for (const n of m.addedNodes) if (n.nodeName === "VIDEO") window.__ev.push({ t: performance.now(), k: "video+" });
      for (const n of m.removedNodes) if (n.nodeName === "VIDEO") window.__ev.push({ t: performance.now(), k: "video-" });
    }
  });
  document.addEventListener("DOMContentLoaded", () => mo.observe(document.documentElement, { childList: true, subtree: true }));
  new PerformanceObserver((l) => l.getEntries().forEach((e) => {
    if (e.name.includes("/work/")) window.__ev.push({ t: e.responseEnd, k: "res " + e.name.split("/work/")[1].split("?")[0] + " " + Math.round(e.transferSize / 1024) + "k" });
  })).observe({ type: "resource", buffered: true });
  new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__ev.push({ t: e.startTime, k: "LONGTASK " + Math.round(e.duration) + "ms" }))).observe({ type: "longtask", buffered: true });
});
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
if (CSS[mode]) await page.addStyleTag({ content: CSS[mode] });

const stats = (gaps) => {
  const s = [...gaps].sort((a, b) => a - b);
  const q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return `frames ${s.length} median ${q(0.5).toFixed(1)} p95 ${q(0.95).toFixed(1)} worst ${s[s.length - 1].toFixed(1)} >20ms ${s.filter((g) => g > 20).length} >33ms ${s.filter((g) => g > 33).length}`;
};

async function wheelPass(label) {
  const work = await page.evaluate((sel) => {
    const s = document.querySelector("#" + sel);
    return { top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight };
  }, SECTION);
  await page.evaluate((top) => scrollTo({ top: Math.max(0, top - 400), behavior: "instant" }), work.top);
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    window.__rec = []; window.__stop = false; window.__evStart = performance.now();
    let last = performance.now();
    window.__maxPlaying = 0;
    const tick = (now) => {
      window.__rec.push([now, now - last]); last = now;
      const playing = [...document.querySelectorAll("video")].filter((v) => !v.paused).length;
      if (playing > window.__maxPlaying) window.__maxPlaying = playing;
      if (!window.__stop) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await page.mouse.move(960, 540);
  const steps = Math.ceil((work.h + 800) / 80);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, 80);
    await page.waitForTimeout(30);
    // EXP_STOP_MID: rest halfway so the reels in view mount and start playing, then carry on
    if (process.env.EXP_STOP_MID && i === Math.floor(steps / 2)) await page.waitForTimeout(900);
  }
  await page.waitForTimeout(400);
  const { rec, ev, videos, maxPlaying } = await page.evaluate(() => {
    window.__stop = true;
    return { rec: window.__rec, ev: window.__ev.filter((e) => e.t >= window.__evStart), videos: document.querySelectorAll("video").length, maxPlaying: window.__maxPlaying };
  });
  const gaps = rec.slice(1).map((r) => r[1]);
  console.log(`\n[${mode}] ${label}: ${stats(gaps)}  videos mounted at end: ${videos}  most playing in one frame: ${maxPlaying}`);
  const t0 = rec[0][0];
  for (const [now, gap] of rec.slice(1)) {
    if (gap <= 20) continue;
    const inWin = ev.filter((e) => e.t >= now - gap - 5 && e.t <= now + 1).map((e) => e.k);
    const counts = {};
    for (const k of inWin) { const key = k.startsWith("res ") ? "res(" + (k.includes("reels") ? "reel" : "post") + ")" : k; counts[key] = (counts[key] ?? 0) + 1; }
    console.log(`   +${Math.round(now - t0)}ms gap ${gap.toFixed(0)}ms  <- ${Object.entries(counts).map(([k, c]) => c > 1 ? `${k} x${c}` : k).join(", ") || "(nothing recorded)"}`);
  }
}

function analyzeTrace(path) {
  const { traceEvents } = JSON.parse(fs.readFileSync(path, "utf8"));
  const names = {};
  for (const e of traceEvents) if (e.ph === "M" && e.name === "thread_name") names[`${e.pid}:${e.tid}`] = e.args.name;
  const byThread = {};
  for (const e of traceEvents) if (e.ph === "X" && names[`${e.pid}:${e.tid}`] === "CrRendererMain") (byThread[`${e.pid}:${e.tid}`] ??= []).push(e);
  const perThread = {};
  for (const e of traceEvents) if (e.ph === "X" && e.dur > 6000) {
    const n = (names[`${e.pid}:${e.tid}`] ?? "?").replace(/\d+/g, "");
    (perThread[n] ??= []).push(e);
  }
  for (const [n, evs] of Object.entries(perThread)) {
    evs.sort((a, b) => b.dur - a.dur);
    console.log(`  thread ${n}: ${evs.length} events >6ms; longest: ` + evs.slice(0, 6).map((e) => `${e.name}${e.args?.data?.type ? " " + e.args.data.type : ""} ${(e.dur / 1000).toFixed(0)}`).join(" | "));
  }
  const main = (Object.values(byThread).sort((a, b) => b.length - a.length)[0] ?? []).sort((a, b) => a.ts - b.ts);
  const tops = main.filter((e) => /RunTask/.test(e.name) && e.dur > 20000);
  console.log(`\nTRACE: ${tops.length} main-thread tasks over 20ms`);
  for (const t of tops) {
    const kids = main.filter((e) => e !== t && e.ts >= t.ts && e.ts + (e.dur ?? 0) <= t.ts + t.dur && e.dur > 500 && !/RunTask/.test(e.name));
    const agg = {};
    for (const k of kids) {
      const d = k.args?.data ?? {};
      const key = k.name + (d.functionName ? ` ${d.functionName}` : "") + (d.type ? ` ${d.type}` : "") + (d.url ? ` ${String(d.url).split("/").slice(-1)[0].slice(0, 30)}` : "");
      agg[key] = (agg[key] ?? 0) + k.dur;
    }
    console.log(`  task ${Math.round(t.dur / 1000)}ms: ` + Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([n, d]) => `${n} ${(d / 1000).toFixed(1)}`).join(" | "));
  }
}

try {
for (let i = 1; i <= reps; i++) {
  const tracing = doTrace && i === reps;
  const tracePath = "C:/Users/DELL/AppData/Local/Temp/claude/F--tech-up-labs-capkala/1c6ccb61-510b-4818-932f-00da4f5a4abf/scratchpad/trace.json";
  if (tracing) await browser.startTracing(page, { path: tracePath, categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "toplevel", "blink", "v8.execute", "loading"] });
  await wheelPass(`rep ${i}${i === 1 ? " (cold)" : " (warm)"}`);
  if (tracing) { await browser.stopTracing(); analyzeTrace(tracePath); }
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(800);
}
} catch (e) { console.error("EXP ERROR", e.message); }
await browser.close();
