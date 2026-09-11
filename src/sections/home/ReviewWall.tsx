import Image from "next/image";
import { OffscreenPause } from "@/motion/OffscreenPause";
import { SlideIn } from "@/components/ui/SlideIn";
import { Stars } from "@/components/ui/Stars";
import { FOCUS_RING } from "@/components/ui/surface";
import type { WrittenReview } from "@/content/types";

/*
 * The messages clients sent, pinned to the page as torn slips.
 *
 * Every card carries the words twice: set as type, and as the message itself,
 * which arrives when a reader hovers, tabs to it or taps it. The type is what
 * makes the section readable at a glance and searchable; the screenshot is what
 * makes it believed. A wall of chat screenshots alone is unreadable at card size
 * and a wall of quotes alone is a wall of claims.
 *
 * FOUR COLUMNS, two on a phone, each drifting on its own and each against its
 * neighbours.
 *
 * It was three horizontal rows first and they were wrong for this. A row carries
 * every card past at the same height, so each message is read in the same place
 * and the whole thing is a ticker. Columns at their own offsets put each message
 * somewhere the eye has not just been, which is what makes a wall of one-line
 * quotes look composed instead of queued.
 *
 * There is no arrow to press, so no message sits behind a control a reader has
 * to find. Thirteen of these do not fit on a page as a static grid, and a grid
 * deep enough to hold them is a wall a reader scrolls past rather than reads.
 *
 * HOVER HOLDS THE COLUMN IT IS OVER, and only that one. A moving card cannot be
 * read, and every card here also hides a screenshot behind it that a reader has
 * to hover to see; without the hold the two gestures fight and the message
 * arrives under a card already leaving. The rule is in `utilities.css`, on the
 * track itself, so the other columns keep going.
 *
 * The columns are STAGGERED at rest as well as moving: each starts part of a
 * card lower than the one before it, so they never line up into rows even
 * for the instant they would otherwise pass through one.
 *
 * The pictures are cut and redacted by `scripts/whatsapp.mjs`. No phone number
 * survives into the files, rather than being covered up in the browser.
 */
const TILTS = ["-rotate-[1.5deg]", "rotate-[1.5deg]"] as const;
const MATS = ["bg-mat-kraft", "bg-mat-sage"] as const;

/*
 * How far the block rises. Small on purpose.
 *
 * An earlier version brought each card in from the corner it was nearest, up to
 * 56% of its own height away. At that distance a card spends its entrance
 * sitting on top of the row above it, half faded, and two cards show through
 * each other; scrolling re-arms the reveal, so they appear to wander.
 *
 * It is now one rise on the whole block rather than one per card. A per-card
 * entrance inside a marquee fires on a card that is already moving, so the two
 * transforms compound and the slip arrives crabwise.
 */
const RISE = 28;

/*
 * Four columns, dealt round-robin so no column is all screenshots or all badges.
 *
 * Two of the four show at every width below `lg`, at the client's ask: a phone
 * gets two narrow columns rather than one wide one, which is what makes the
 * band read as a wall instead of as a queue. The other two are simply not
 * placed there, so nothing is lost, and each column still holds three or four
 * slips, which is what keeps a copy taller than the window it travels in.
 */
const COLUMNS = 4;

function dealIntoRows<T>(items: readonly T[], rows: number): T[][] {
  const out: T[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, index) => out[index % rows].push(item));
  return out.filter((row) => row.length > 0);
}

export function ReviewWall({ items }: { items: readonly WrittenReview[] }) {
  if (items.length === 0) return null;

  const columns = dealIntoRows(items, COLUMNS);

  return (
    /*
     * The height is FIXED and the columns are clipped to it. A vertical marquee
     * needs a window to travel inside; without one the list simply makes the
     * page taller and nothing appears to move.
     */
    <SlideIn from="up" travel={RISE}>
      <OffscreenPause className="review-rails review-rails-mask mt-16 grid h-[28rem] grid-cols-2 gap-4 overflow-hidden sm:h-[36rem] sm:gap-10 lg:mt-20 lg:h-[34rem] lg:grid-cols-4 lg:gap-8">
        {columns.map((columnItems, column) => (
          <ReviewRail
            key={column}
            items={columnItems}
            /* Up, down, up, down. Speeds differ per column in `utilities.css`,
               or four columns at two speeds read as two columns and a copy. */
            direction={column % 2 === 0 ? "up" : "down"}
            column={column}
          />
        ))}
      </OffscreenPause>
    </SlideIn>
  );
}

/* One drifting column. */
function ReviewRail({
  items,
  direction,
  column,
}: {
  items: readonly WrittenReview[];
  direction: "up" | "down";
  column: number;
}) {
  /* The resting stagger. Part of a card each, so no two columns share an edge
     and the field never resolves into rows. */
  const OFFSETS = ["", "sm:pt-14", "lg:pt-7", "lg:pt-20"] as const;

  return (
    <div className={`min-w-0 ${OFFSETS[column % OFFSETS.length]}`}>
      <ul
        className={`grid gap-8 sm:gap-10 ${
          direction === "up" ? "review-rail-up" : "review-rail-down"
        }`}
      >
        {/* Two copies, paired with `-50%` in the keyframe. See the note there. */}
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item.slug}-${index}`}
            /* The duplicate is scenery. Without this a screen reader reads every
               message twice and the section claims twice the clients it has. */
            aria-hidden={index >= items.length || undefined}
            className="min-w-0"
          >
            <div className={`relative ${TILTS[(index + column) % TILTS.length]}`}>
              {/* The torn sheet behind the slip. */}
              <div
                aria-hidden
                className={`paper-mat absolute -inset-3 sm:-inset-4 ${
                  MATS[(index + column) % MATS.length]
                }`}
              />

              <ReviewSlip item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* One message: the words, and the message they were typed in. */
function ReviewSlip({ item }: { item: WrittenReview }) {
  const who = [item.role, item.company].filter(Boolean).join(", ") || "Client";

  return (
    <article className="group relative h-full min-h-[9rem] overflow-hidden rounded-token bg-surface shadow-soft sm:min-h-[10rem] lg:min-h-[11rem]">
      <div
        className={`flex h-full flex-col justify-between gap-3 p-3 sm:p-4 lg:p-5 ${
          item.shot ? "transition-token group-hover:opacity-0 group-focus-within:opacity-0" : ""
        }`}
      >
        <Stars rating={item.rating} />

        {/*
         * Verbatim, Gujarati and English mixed, because that is how these
         * clients wrote them. Tidying one into English would be rewriting a
         * quote, and the screenshot underneath would then disagree with it.
         */}
        {/* `text-body` on a phone, where two columns leave a card 151px wide and
            display type is four words a line. It steps up the moment there is
            room for it. */}
        <blockquote className="font-display text-body font-bold text-ink sm:text-display-m">
          &quot;{item.quote}&quot;
        </blockquote>

        <div className="flex items-center gap-3">
          {item.avatar ? (
            <Image
              src={item.avatar}
              alt=""
              width={40}
              height={40}
              className="size-8 shrink-0 rounded-token object-cover sm:size-10"
            />
          ) : null}
          <div className="min-w-0">
            <p className="text-small font-bold leading-tight text-ink">{item.name}</p>
            <p className="mt-0.5 text-label leading-tight text-ink-muted">{who}</p>
          </div>
        </div>
      </div>

      {/*
       * The message, held behind the words until somebody asks for it.
       *
       * Only where there IS one. Four of these came off the review badge rather
       * than a chat, so there is nothing behind them, and a card that offers a
       * reveal and then does nothing is worse than a card that never offered.
       *
       * The shots are padded to 16 by 9 by the script, and the card is at least
       * that shape at the width it is read at, so `object-cover` shows a whole
       * message rather than the middle of one. Narrower than that it crops the
       * sides, and `object-left` is why the sentence survives: a chat bubble
       * sits against the left of its window, so a centred crop would keep the
       * wallpaper and lose the words.
       */}
      {item.shot ? (
        <>
          <Image
            src={item.shot}
            alt={`The message ${item.name} sent, in the chat it was sent in`}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-left opacity-0 transition-token group-hover:opacity-100 group-focus-within:opacity-100"
          />

          {/*
           * A real button, because hover alone reaches a mouse and nobody else.
           * Tapping it on a phone focuses it and holds the message open; tabbing
           * to it does the same, and the card's own ring shows where focus is.
           */}
          <button
            type="button"
            aria-label={`Show the message ${item.name} sent`}
            className={`absolute inset-0 cursor-pointer ${FOCUS_RING}`}
          />
        </>
      ) : null}

    </article>
  );
}
