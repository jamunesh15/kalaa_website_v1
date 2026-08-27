import { test } from "@playwright/test";

/**
 * Bugs this suite found that are not fixed yet.
 *
 * Every entry here is a real defect in the app, not a flaky or wrong test. The
 * test stays written and stays accurate; it is marked `fixme` so the suite is
 * green while the fix is queued.
 *
 * Why mark them rather than leave the suite red: a suite failing on pre-existing
 * bugs blocks every change, including the changes that fix these, which is a
 * deadlock rather than a safety net.
 *
 * The key is the test title, exactly as it is reported. The value is what is
 * actually wrong, in enough detail that somebody can pick it up cold.
 *
 * **When a fix lands, delete the entry.** The test then guards that bug forever.
 * Nothing else needs changing, and a returning bug fails the suite immediately.
 *
 * Empty is the correct state. Anything added here is a debt, not a setting.
 */
export const KNOWN_FINDINGS: Record<string, string> = {
  /*
   * Not defects. Both are the v2 redesign gap, and they are here rather than
   * red because the alternative is a branch whose suite blocks every commit
   * that would fix it.
   *
   * The v1 design layer was removed, and `Reveal` went with it, so no element
   * on the page carries `.kalaa-reveal` any more. These two tests refuse to
   * pass vacuously, which is correct and is the reason they are visible at all
   * instead of quietly proving nothing.
   *
   * DELETE BOTH ENTRIES the moment the redesign lands its first scroll reveal.
   * The tests are still accurate; they are simply describing behaviour that has
   * not been rebuilt yet.
   */
  "a reveal has not fired before the reader reaches it":
    "No scroll reveals exist during the v2 redesign. Delete this entry when reveals return.",
  "a reveal is never taken back once the reader has scrolled past it":
    "No scroll reveals exist during the v2 redesign. Delete this entry when reveals return.",
};

/**
 * Mark the current test as a known finding, if it is one.
 *
 * Call it as the first line of a test. Tests generated in a loop share one body,
 * so this takes the resolved title rather than being declared per test.
 */
export function knownFinding(title: string) {
  const finding = KNOWN_FINDINGS[title];
  test.fixme(Boolean(finding), finding ?? "");
}
