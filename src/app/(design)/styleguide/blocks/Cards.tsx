import { Block } from "../Block";
import { Card } from "@/components/ui/Card";
import type { CardFill } from "@/components/ui/Card";

/* The card, in every fill. */
const FILLS: { fill: CardFill; heading: string; body: string }[] = [
  {
    fill: "surface",
    heading: "Content that gets seen",
    body: "Posts and reels made for the way people actually scroll, not for a brand deck.",
  },
  {
    fill: "butter",
    heading: "Ads that pay for themselves",
    body: "Meta campaigns built around enquiries and revenue instead of reach.",
  },
  {
    fill: "sage",
    heading: "A presence worth finding",
    body: "Profiles, pages and websites that a customer can understand in one look.",
  },
  {
    fill: "peach",
    heading: "The system behind it",
    body: "Websites and software so the leads you win do not get lost after they arrive.",
  },
  {
    fill: "cloud",
    heading: "Reporting you can read",
    body: "What went out, what it cost, and how many people got in touch.",
  },
];

export function Cards() {
  return (
    <Block
      title="Cards"
      note="Same corner, same shadow, no outline. The fill is rhythm, and it never carries meaning."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FILLS.map((entry) => (
          <Card key={entry.fill} fill={entry.fill}>
            <h3 className="font-display text-display-m font-bold text-ink">{entry.heading}</h3>
            <p className="mt-3 text-body text-ink-body">{entry.body}</p>
          </Card>
        ))}
      </div>
    </Block>
  );
}
