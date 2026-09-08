"use client";

import { useEffect, useState } from "react";

/* The line under the headline, typing itself out one service at a time. */

/**
 * The offer, in the order a visitor cares about it. First is the SEO phrase, and
 * social media leads whatever else is added.
 *
 * Every phrase is lifted from `services.ts`, so the line cannot promise
 * something the site does not sell. Four of the six are the technology side,
 * which is the point of the line: social media is what Kalaa is known for and
 * the software is what the CEO wants a visitor to learn.
 *
 * Six is the ceiling: at roughly three and a half seconds each, a longer
 * rotation takes half a minute to show itself and nobody waits that long.
 *
 * Keep every phrase at or under the length of "social media management". The
 * line reserves its width from the longest of them, so a longer entry widens the
 * hero for all of them and shifts the layout.
 */
const PHRASES = [
  "social media management",
  "websites and software",
  "custom software",
  "landing pages",
  "Meta and Google ads",
  "business growth",
];

/* British spelling, to match "recognise" and "organised" in the copy already on the page. */
const LEAD = "We specialise in ";

/* Keystroke timings, in milliseconds. */
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

  /* Reading the preference in an effect rather than during render is what keeps the server and the browser writing the same. */
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
