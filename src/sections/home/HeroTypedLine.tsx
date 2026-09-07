"use client";

import { useEffect, useState } from "react";

/**
 * The line under the headline, typing itself out one service at a time.
 *
 * The device is taken from bgmediaagency.in, and it is taken as the reference
 * actually has it rather than as it looked in a screenshot. Measured on the
 * running site: their h1 does not animate at all. The movement is on the line
 * below it, a fixed lead followed by a phrase that types, holds, deletes and is
 * replaced. Animating the headline would have been the obvious reading and the
 * wrong one, and it would also have cost this page its LCP element.
 *
 * The lead is fixed so the sentence is always grammatical mid-keystroke, and
 * the first phrase leads with the exact words the page needs to be found for.
 *
 * Three things here are not decoration:
 *
 * - **The server renders the first phrase in full.** Nothing about the markup
 *   depends on the motion preference, which is the rule `MotionProvider` exists
 *   to enforce; the loop starts in an effect, after hydration, and a visitor who
 *   has asked for less movement simply keeps the sentence that was already
 *   there. A crawler gets a real sentence rather than an empty span.
 * - **The visible line is `aria-hidden` and the real sentence sits beside it.**
 *   A screen reader following the animated node would announce the same clause
 *   letter by letter, forever.
 * - **The box is reserved by the longest phrase**, drawn hidden underneath. A
 *   phrase that grows from "Meta ads" to "social media management" wraps to two
 *   lines on a phone, and the paragraph under it would move every four seconds.
 */

/** The offer, in the order a visitor cares about it. First is the SEO phrase. */
const PHRASES = [
  "social media management",
  "reels and posts",
  "Meta ads",
  "websites and software",
];

/*
  British spelling, to match "recognise" and "organised" in the copy already on
  the page. The reference this device comes from is American and writes
  "specialize"; one site cannot hold both.
*/
const LEAD = "We specialise in ";

/*
  Keystroke timings, in milliseconds. Deleting is faster than typing because a
  reader is not reading it, and the hold is long enough to finish the phrase
  twice over.
*/
const TYPE_MS = 58;
const DELETE_MS = 28;
const HOLD_MS = 1700;
const BLANK_MS = 320;

const LONGEST = PHRASES.reduce((a, b) => (a.length >= b.length ? a : b));

export function HeroTypedLine() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(PHRASES[0].length);
  const [deleting, setDeleting] = useState(false);
  const [running, setRunning] = useState(false);

  /*
    Reading the preference in an effect rather than during render is what keeps
    the server and the browser writing the same markup. `useReducedMotion`
    returns null on the server, so branching on it up there is a hydration bug
    dressed as care.
  */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setRunning(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!running) return;

    const phrase = PHRASES[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && count === phrase.length) delay = HOLD_MS;
    if (deleting && count === 0) delay = BLANK_MS;

    const timer = window.setTimeout(() => {
      if (deleting && count === 0) {
        setDeleting(false);
        setIndex((current) => (current + 1) % PHRASES.length);
        return;
      }
      if (!deleting && count === phrase.length) {
        setDeleting(true);
        return;
      }
      setCount((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [running, index, count, deleting]);

  return (
    <p className="mt-4 text-lead text-ink-body sm:mt-5">
      <span className="sr-only">
        {LEAD}
        {PHRASES.join(", ")}.
      </span>

      <span aria-hidden className="typed-line">
        <span className="typed-line-sizer">
          {LEAD}
          <span className="font-bold">{LONGEST}</span>
        </span>
        <span className="typed-line-live">
          {LEAD}
          <span className="font-bold text-ink">{PHRASES[index].slice(0, count)}</span>
          <span className="typed-caret" />
        </span>
      </span>
    </p>
  );
}
