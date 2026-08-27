#!/usr/bin/env node
/**
 * Coding structure checks that lint and build cannot make.
 *
 *   npm run check:structure
 *
 * The principle, from `coding-structure.md`: detect, do not assume. None of the
 * rules below are an opinion imposed on this repository. Each one was derived by
 * reading what the code already does, and each flags only the files that depart
 * from it. When the existing pattern is correct and readable, that pattern is
 * the rule. When a departure is legitimate, it goes in ALLOWED with a reason, so
 * the checker never cries wolf and nobody is tempted to switch it off.
 *
 * Exit 1 on any finding.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");

/**
 * Departures that are correct. Each needs a reason a person can check, because
 * an allowlist without reasons becomes a place to hide problems.
 */
const ALLOWED = [
  {
    rule: "no-hardcoded-colours",
    file: "src/app/opengraph-image.tsx",
    why: "Rendered by Satori, which cannot read CSS custom properties. Tokens are not available here.",
  },
  {
    rule: "no-hardcoded-colours",
    file: "src/app/apple-icon.tsx",
    why: "Same as opengraph-image: Satori cannot resolve CSS variables.",
  },
  {
    rule: "no-hardcoded-colours",
    file: "src/app/layout.tsx",
    why: "The themeColor viewport export must be a literal colour; a browser reads it before any CSS.",
  },
];

/**
 * Real findings that are queued to be fixed rather than accepted.
 *
 * Kept apart from ALLOWED on purpose. ALLOWED means "correct, and will stay
 * this way". KNOWN means "wrong, and somebody is going to fix it". Putting a bug
 * in ALLOWED would quietly turn it into the standard.
 *
 * These print at the end of a run and do not fail it, for the same reason the
 * failing tests are marked fixme: a checker that blocks every change on
 * pre-existing findings blocks the changes that fix them too.
 *
 * **Delete the entry when the fix lands.** The rule then guards it from then on.
 * Empty is the correct state.
 */
const KNOWN = [];

const matches = (list, rule, file) =>
  list.some((entry) => entry.rule === rule && entry.file === file.replace(/\\/g, "/"));

const findings = [];
const known = [];
const report = (rule, file, detail) => {
  const path = file.replace(/\\/g, "/");
  if (matches(ALLOWED, rule, path)) return;
  (matches(KNOWN, rule, path) ? known : findings).push({ rule, file: path, detail });
};

/** Every file under a directory, skipping build output. */
function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(SRC);
const codeFiles = files.filter((f) => /\.(ts|tsx)$/.test(f));
const rel = (f) => relative(ROOT, f).replace(/\\/g, "/");

// ---------------------------------------------------------------------------
// 1. Imports use the @/ alias
//
// Detected: every cross-directory import in src/ already uses @/, which
// tsconfig maps to ./src/*. A deep relative import breaks the moment a file
// moves, and it is harder to read.
// ---------------------------------------------------------------------------
for (const file of codeFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/from\s+["'](\.\.\/\.\.\/[^"']*)["']/g)) {
    report("imports-use-alias", rel(file), `deep relative import: ${match[1]}`);
  }
}

// ---------------------------------------------------------------------------
// 2. A component file is named after what it exports
//
// Detected: src/components holds PascalCase .tsx files, each exporting a symbol
// of the same name, and camelCase .ts for non-component modules.
// ---------------------------------------------------------------------------
const componentFiles = codeFiles.filter(
  (f) => rel(f).startsWith("src/components/") && f.endsWith(".tsx"),
);

for (const file of componentFiles) {
  const name = rel(file).split("/").pop().replace(/\.tsx$/, "");

  if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
    report("component-file-naming", rel(file), `expected PascalCase, got "${name}"`);
    continue;
  }

  const source = readFileSync(file, "utf8");
  const exportsName =
    new RegExp(`export\\s+(default\\s+)?(function|const|class)\\s+${name}\\b`).test(source) ||
    new RegExp(`export\\s*\\{[^}]*\\b${name}\\b`).test(source) ||
    new RegExp(`export\\s+default\\s+${name}\\b`).test(source);

  if (!exportsName) {
    report("component-file-naming", rel(file), `does not export a symbol called "${name}"`);
  }
}

// ---------------------------------------------------------------------------
// 3. Colours come from tokens
//
// Detected: src/app/globals.css declares the palette as CSS custom properties
// and components reference them through Tailwind class names. A literal colour
// in a component is a value that no longer changes with the theme.
// ---------------------------------------------------------------------------
// The lookbehind keeps numeric HTML entities out of it. `&#9733;` is a star
// character, not a four-digit colour, and flagging it teaches people to ignore
// this rule.
//
// No `\b` before rgb/hsl, and that is deliberate. Tailwind writes arbitrary
// values with underscores standing in for spaces, so a colour arrives as
// `shadow-[0_18px_40px_-16px_rgba(19,18,17,0.35)]`. The character before `rgba`
// is `_`, which is a word character, so `\brgba?\(` finds no boundary there and
// silently matches nothing. That is the single most common way a literal colour
// actually gets into this codebase, and the rule was blind to all of it.
const COLOUR = /(?<!&)#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|rgba?\(|hsla?\(/;

for (const file of codeFiles.filter((f) => f.endsWith(".tsx"))) {
  for (const [index, line] of readFileSync(file, "utf8").split("\n").entries()) {
    if (COLOUR.test(line)) {
      report("no-hardcoded-colours", rel(file), `line ${index + 1}: ${line.trim().slice(0, 70)}`);
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// 4. `focus:outline-none` always comes with a replacement ring
//
// This is the one way a focus indicator actually goes missing. Nobody sets out
// to remove it; they suppress the browser's default ring in order to draw the
// project's own, and the second half gets lost in a refactor. The element stays
// perfectly reachable by keyboard and becomes invisible while it has focus, so
// a keyboard user tabs into the dark. Nothing about the page looks wrong.
//
// Checked here in the source rather than in the browser suite, and that was not
// the first choice. A rendered check is stronger in principle, because it also
// catches a ring that is present but overridden. It could not be made
// trustworthy: `:focus-visible` is what every ring on this site keys off, and it
// does not reliably match focus moved by script, so a rendered check either
// leans on real Tab traversal, which quietly under-collects when Playwright runs
// several workers at once, or on programmatic focus, which reports the first
// focusable element in the document as ringless on every route. Both fail in the
// direction that matters: they can pass having checked almost nothing.
//
// A source rule cannot see an overridden ring. It is deterministic, it runs in
// milliseconds, and it catches the mistake people actually make.
// ---------------------------------------------------------------------------
const SUPPRESSES_OUTLINE = /focus:outline-none/;
const DRAWS_A_RING = /focus-visible:(ring|outline|border|bg|shadow)/;

for (const file of codeFiles.filter((f) => f.endsWith(".tsx"))) {
  const source = readFileSync(file, "utf8");

  // Per className string rather than per line, so a class list wrapped across
  // several lines is judged whole. Splitting on the quote characters that open
  // and close them is enough here: these are Tailwind class lists, not prose.
  for (const [index, chunk] of source.split(/className=\{?/).entries()) {
    if (index === 0) continue;
    // Up to the end of the attribute, so the next element's classes are not
    // read as if they belonged to this one.
    const classList = chunk.split(/\n\s*(?:>|\/>|[a-zA-Z-]+=)/)[0];
    if (!SUPPRESSES_OUTLINE.test(classList)) continue;
    if (DRAWS_A_RING.test(classList)) continue;

    const line = source.slice(0, source.indexOf(chunk)).split("\n").length;
    report(
      "focus-ring-required",
      rel(file),
      `line ~${line}: focus:outline-none with no focus-visible replacement`,
    );
    break;
  }
}

// ---------------------------------------------------------------------------
// 5. No empty directories
//
// An empty folder is either a leftover or an intention nobody finished. Both
// mislead the next person about where code is supposed to go.
// ---------------------------------------------------------------------------
function emptyDirs(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (walk(full).length === 0) out.push(full);
    else emptyDirs(full, out);
  }
  return out;
}

for (const dir of emptyDirs(SRC)) {
  report("no-empty-folders", rel(dir), "directory contains no files");
}

// ---------------------------------------------------------------------------
// 6. Every component is used, and documented
//
// AGENTS.md is where this repository records its shared components, in
// backticks. A component nothing imports and nothing documents is orphaned, and
// nothing would ever lead anyone to it.
// ---------------------------------------------------------------------------
const allSource = codeFiles.map((f) => readFileSync(f, "utf8")).join("\n");
const agentsMd = readFileSync(join(ROOT, "AGENTS.md"), "utf8");

for (const file of componentFiles) {
  const name = rel(file).split("/").pop().replace(/\.tsx$/, "");

  const documented = agentsMd.includes(`\`${name}\``);
  const importedSomewhere = new RegExp(`from\\s+["'][^"']*${name}["']`).test(allSource);

  // A primitive named in AGENTS.md is offered for reuse on purpose, so having no
  // caller yet is a decision rather than dead code. One that is neither used nor
  // documented is simply orphaned.
  if (!importedSomewhere && !documented) {
    report(
      "component-is-used",
      rel(file),
      `"${name}" is never imported and is not documented in AGENTS.md`,
    );
  }

  if (!documented) {
    report(
      "component-is-documented",
      rel(file),
      `"${name}" is not named in AGENTS.md, so nothing tells the next person it exists`,
    );
  }
}

// ---------------------------------------------------------------------------
// 7. Every public page is in the route registry
//
// src/routes.ts drives the sitemap and every browser test. A page missing from
// it is absent from the sitemap and silently skipped by the whole suite, which
// is a failure that looks exactly like a pass.
//
// The test suite checks this too. It is repeated here so one fast command
// reports the whole structural picture without starting a browser.
// ---------------------------------------------------------------------------
const routesFile = join(SRC, "routes.ts");

if (existsSync(routesFile)) {
  const registered = new Set(
    [...readFileSync(routesFile, "utf8").matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]),
  );

  const appDir = join(SRC, "app");
  const found = [];
  const walkPages = (dir, urlPath) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith("(") || entry.name === "api") continue;
      const next = join(dir, entry.name);
      const nextUrl = `${urlPath}/${entry.name}`;
      if (existsSync(join(next, "page.tsx")) || existsSync(join(next, "page.ts"))) {
        found.push(nextUrl);
      }
      walkPages(next, nextUrl);
    }
  };

  if (existsSync(join(appDir, "page.tsx"))) found.push("/");
  if (existsSync(appDir)) walkPages(appDir, "");

  for (const path of found) {
    if (!registered.has(path)) {
      report("page-is-registered", "src/routes.ts", `no entry for "${path}"`);
    }
  }
  for (const path of registered) {
    if (!found.includes(path)) {
      report("page-is-registered", "src/routes.ts", `entry for "${path}" has no page behind it`);
    }
  }
}

// ---------------------------------------------------------------------------

if (known.length > 0) {
  console.log(`\n${known.length} known finding(s), queued to be fixed, not blocking:\n`);
  for (const entry of known) console.log(`  ${entry.rule}: ${entry.file}`);
  console.log("\nRemove each from KNOWN in scripts/check-structure.mjs as it is fixed.\n");
}

if (findings.length === 0) {
  console.log("Structure checks passed.");
  process.exit(0);
}

const byRule = new Map();
for (const finding of findings) {
  if (!byRule.has(finding.rule)) byRule.set(finding.rule, []);
  byRule.get(finding.rule).push(finding);
}

console.error(`\n${findings.length} structure finding(s).\n`);
for (const [rule, entries] of byRule) {
  console.error(`  ${rule}`);
  for (const entry of entries) console.error(`    ${entry.file}: ${entry.detail}`);
  console.error("");
}
console.error("If a finding is legitimate, add it to ALLOWED in scripts/check-structure.mjs");
console.error("with a reason, rather than removing the rule.\n");
process.exit(1);
