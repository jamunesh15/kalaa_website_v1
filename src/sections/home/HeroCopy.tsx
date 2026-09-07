"use client";

import { motion } from "motion/react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { HeroTypedLine } from "@/sections/home/HeroTypedLine";

/**
 * The left half of the hero, arriving from the left.
 *
 * The artifacts on the right have always animated in and the copy beside them
 * was still, which read as half a composition waking up. This is the other
 * half, and it moves as **one block**.
 *
 * That is the correction, and it was made by looking at the alternative. The
 * first attempt staggered the five elements individually, label then heading
 * then typing line then paragraph then button, each on its own delay. It looked
 * broken rather than sequenced: mid-animation the screen holds a headline alone
 * in an empty field, and the reader's eye is asked to follow five separate
 * arrivals in a third of a second. The right hand side is already doing that,
 * on purpose, because it is four separate objects. The left hand side is one
 * paragraph of thought and it should land like one.
 *
 * It starts invisible and 80px to the left, and arrives at both at once.
 *
 * **The fade may never carry a delay.** The heading inside this block is the
 * largest thing on the first screen, so it is the element the browser measures
 * LCP against, and an element at `opacity: 0` counts as not yet painted. The
 * measurement is taken at the first frame the block renders above zero opacity,
 * not at the end of the fade, so a fade that begins immediately costs about a
 * frame. A `delay` on it would be added to the site's load score in full, on
 * every visit. An earlier version of this file avoided opacity altogether for
 * that reason and the client asked for the fade back; this is the version of it
 * that is close to free.
 *
 * The opacity runs on its own tween rather than on the spring. A spring
 * approaches its target asymptotically, so opacity spends a long tail at 0.98
 * and the block reads as arriving twice. The movement springs, the fade does
 * not.
 *
 * Nothing branches on the motion preference. `MotionProvider` sets
 * `reducedMotion="user"`, which drops the transform and lets the block settle on
 * its end value, and the reasoning for handling it there rather than here is
 * written out in that file: a component that asks `useReducedMotion` during
 * render is a hydration bug, because the server cannot know the answer.
 */

/*
  Heavier and slower than the artifacts' spring. One block of type carries more
  visual weight than a single sheet of paper, and it should not overshoot: paper
  that bounces reads as weight, a paragraph that bounces reads as a wobble.
*/
const SPRING = { type: "spring", stiffness: 52, damping: 18, mass: 1.1 } as const;

/**
 * The arrival, as variants, so it can play more than once.
 *
 * **`whileInView` with `once: false`, which is banned everywhere else on this
 * site and is correct here.** The rule exists because resetting a reveal on any
 * exit means scrolling UP past a section runs its whole introduction backwards
 * under a reader who has already read it. That is what `useReplayOnScrollDown`
 * was written to avoid and what every other section uses.
 *
 * The hero is the one section that cannot hit that failure, because there is
 * nothing above it to scroll up from. It is only ever left downward and only
 * ever returned to upward, so "reset on exit" and "reset once the reader has
 * scrolled away" are the same event here.
 *
 * Going back is instant. A spring on the way out animates the column away from
 * a reader who is already moving past it, which is movement nobody asked for in
 * a direction nobody is looking.
 */
const REVEAL = {
  hidden: { opacity: 0, x: -80, transition: { duration: 0 } },
  shown: {
    opacity: 1,
    x: 0,
    transition: { ...SPRING, opacity: { duration: 0.5, ease: "easeOut" } },
  },
} as const;

export function HeroCopy() {
  return (
    <motion.div
      className="min-w-0 text-center lg:flex lg:flex-col lg:justify-center lg:text-left"
      variants={REVEAL}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/*
        The headline is outcome-led, which is a change of kind rather than of
        wording. "Creative work, strategic marketing" described what Kalaa does;
        "We turn social media into steady revenue" says what the reader gets, and
        it names the channel while it does it.

        It replaced three earlier lines. The client's own "Where Creativity Meets
        Strategy" carried the mood but not the service. "Social media management
        that gets you seen" named the service and said nothing about the work
        being any good. "We turn attention into revenue" named no channel at all.

        **Two lines of matched length, and both halves are measured.** At 64px
        against the 644px column, line one sets 620px and line two 606px once the
        marker's own padding is counted, so the heading reads as a block with a
        straight right edge rather than a long line over a short one. That is
        what "steady" is doing in the copy: "into revenue" alone measures 394px
        and left the second line two thirds the length of the first.

        "Your" cannot come back. "We turn your social media" needs 769px, so the
        only break it allows splits "social media" across lines and cuts the
        phrase the headline exists to say. The three-line version that avoided
        the split ran the heading to 248px and read long.

        An earlier note here recorded 645px for "We turn social media" and ruled
        the line out on that basis. The figure was wrong and has been remeasured:
        it did not account for the -0.02em tracking the display size carries.

        The break is load-bearing. Any replacement wants both halves inside 620px
        and within about 40px of each other, or the block loses its edge and the
        line goes back to three.

        **This line is provisional by the client's own instruction.** It stays
        until a better one turns up, so treat it as swappable rather than
        settled, and measure the break again when it is swapped.

        The marker sits on "revenue", the payoff word, rather than on the first
        word. One accent word.

        The service list lives in the typing line below, so the paragraph does
        not carry it. The same list in both places is one piece of information
        shown twice inside one component.

        **There is no label above the heading, and it is not coming back.**
        "WELCOME TO KALAA" sat here because the client asked for it kept from
        the live site, and on 2026-09-07 the client cut it along with every
        other section eyebrow. That returns the page to what CLAUDE.md says in
        the first place: a small uppercase line over a heading is the most
        common template tell there is.
      */}

      {/*
        The text column is the wider of the two, and that is measured rather than
        chosen: line one needs 620px at this size and a narrower column breaks it
        mid-phrase no matter what the markup says.

        No max-width and no `text-balance`. The headline sets its own break, so
        both of them fight it: a character measure broke the first line early,
        and balancing then evened the lines out and moved it again. When the copy
        decides where the line ends, nothing else may have an opinion.
      */}
      <h1 className="hero-headline mt-4 font-display text-display-xl font-black text-ink">
        We turn social media
        <br />
        into steady{" "}
        {/*
          **The marker and the hand on one word, which is the only place the two
          devices are allowed to meet.** Everywhere else they are kept apart: the
          yellow is the hero's alone and never appears on another heading, and
          the hand marks the payoff phrase on the four story bands. Here the
          payoff word is the same word the marker sits on, so stacking them is
          not two devices fighting, it is one word carrying both.

          The box is retuned for the face rather than inherited, and it took two
          passes. Kalam sets smaller and sits differently in its em box than
          Satoshi, so the display face's padding left the paper loose around the
          word; the first correction then over-corrected the other way and put
          0.3em under the baseline, which is a band of yellow below the letters
          with nothing in it. "Revenue" has no descender, so there is nothing
          down there to leave room for.

          0.16em under and 0.1em over is where the yellow sits on the letters
          rather than around them. Re-measure both if the word ever changes: a
          payoff word with a descender, a `g` or a `y`, needs the lower figure
          back.
        */}
        <span className="inline-block rounded-token bg-accent px-[0.16em] pt-[0.1em] pb-[0.16em] font-hand text-[1.12em] font-bold leading-[0.93]">
          revenue
        </span>
      </h1>

      <HeroTypedLine />

      <p className="mx-auto mt-2 max-w-[46ch] text-body text-ink-body sm:mt-3 lg:mx-0">
        We plan the month, make the work, run the ads, and report what it did.
      </p>

      {/*
        The same arrow button the about section ends on, at the client's
        instruction, so the two calls to action on the first two screens are one
        control rather than two designs. `fit` because it stands alone: see the
        note in `ArrowButton` on why a lone one sized to a column parks its
        badge at the far end with a stripe of black in between.

        "Get free strategy call" replaced "See what we would do first". The old
        line described what the visitor would receive and left them to work out
        that it was free and that it was a call; this names the thing and its
        price in four words. Both point at the same contact page.
      */}
      {/*
        Centred below `lg` along with the rest of the column, at the client's
        ask: on a phone the copy is alone on the screen and a left-set block
        with a left-set button read as pushed to one side of it.
      */}
      <div className="mt-7 flex justify-center lg:justify-start">
        <ArrowButton href="/contact" width="fit">
          Get free strategy call
        </ArrowButton>
      </div>
    </motion.div>
  );
}
