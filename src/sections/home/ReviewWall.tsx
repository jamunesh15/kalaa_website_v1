import Image from "next/image";
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
 * It is not a slider. A message a reader has to press an arrow to reach is a
 * message most readers never see, and six fit on the page in two rows.
 *
 * Three across, and the width is what sets the height: these are one line each,
 * so a card wide enough for two of them stands twice as tall as its words and
 * reads as a card somebody forgot to finish. At a third of the row the 16 by 9
 * the shot needs comes out at roughly the height the words need anyway.
 *
 * The tilt alternates and it is the RESTING state, never the entrance. Every
 * slip hanging at the same angle is a pattern, every slip at its own angle is a
 * mess, and one angle mirrored reads as paper put down by hand. It is set once
 * in CSS and never animated: each slip sits on a torn sheet cut with
 * `mask-image`, and rotating a masked element re-rasterises the mask on every
 * frame.
 *
 * The pictures are cut and redacted by `scripts/whatsapp.mjs`. No phone number
 * survives into the files, rather than being covered up in the browser.
 */
const TILTS = ["-rotate-[1.5deg]", "rotate-[1.5deg]"] as const;
const MATS = ["bg-mat-kraft", "bg-mat-sage"] as const;

/*
 * How far a slip rises. Small on purpose.
 *
 * An earlier version brought each one in from the corner it was nearest, up to
 * 56% of its own height away. At that distance a card spends its entrance
 * sitting on top of the row above it, half faded, and two cards show through
 * each other; scrolling re-arms the reveal, so they appear to wander. A rise
 * shorter than the gap between rows cannot overlap anything.
 */
const RISE = 28;

export function ReviewWall({ items }: { items: readonly WrittenReview[] }) {
  if (items.length === 0) return null;

  return (
    /*
     * The list clips horizontally, and its negative margin is what makes that
     * safe: the clip edge lands on the section's own gutter, so a slip travelling
     * in from the side is cut off at the page margin instead of widening the
     * document, while the torn sheets, which stand outside their cards, are
     * still inside the clip and still show on all four sides.
     */
    <div className="-mx-5 overflow-x-clip px-5">
      <ul className="mt-16 grid gap-12 px-1 sm:grid-cols-2 sm:gap-14 lg:mt-20 lg:grid-cols-3 lg:gap-16">
        {items.map((item, index) => (
          <li key={item.slug} className="min-w-0">
            <SlideIn from="up" travel={RISE} delay={(index % 3) * 0.05} className="h-full">
              <div className={`relative h-full ${TILTS[index % TILTS.length]}`}>
                {/* The torn sheet behind the slip. */}
                <div
                  aria-hidden
                  className={`paper-mat absolute -inset-4 sm:-inset-6 ${MATS[index % MATS.length]}`}
                />

                <ReviewSlip item={item} />
              </div>
            </SlideIn>
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
    <article className="group relative h-full min-h-[13rem] overflow-hidden rounded-token bg-surface shadow-soft sm:min-h-[11rem] lg:min-h-[13rem]">
      <div
        className={`flex h-full flex-col justify-between gap-4 p-5 lg:p-6 ${
          item.shot ? "transition-token group-hover:opacity-0 group-focus-within:opacity-0" : ""
        }`}
      >
        <Stars rating={item.rating} />

        {/*
         * Verbatim, Gujarati and English mixed, because that is how these
         * clients wrote them. Tidying one into English would be rewriting a
         * quote, and the screenshot underneath would then disagree with it.
         */}
        <blockquote className="font-display text-display-m font-bold text-ink">
          &ldquo;{item.quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-3">
          {item.avatar ? (
            <Image
              src={item.avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-token object-cover"
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
