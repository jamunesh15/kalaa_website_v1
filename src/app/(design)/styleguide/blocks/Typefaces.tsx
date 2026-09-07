import { Block } from "../Block";

/* The two faces, as specimens rather than as a comparison. */
const DISPLAY_STEPS = [
  { weight: 700, label: "Bold, the top of the family" },
  { weight: 600, label: "Semibold" },
  { weight: 500, label: "Medium" },
];

export function Typefaces() {
  return (
    <Block
      title="Typefaces"
      note="Chillax for display, Switzer for text. Two families is the ceiling; a third is a tell in itself."
    >
      <div className="flex flex-col gap-10">
        {DISPLAY_STEPS.map((step) => (
          <div key={step.weight}>
            <p className="text-label uppercase text-ink-muted">
              Chillax {step.weight}, {step.label}
            </p>
            <p
              className="mt-3 font-display text-display-l text-ink"
              style={{ fontWeight: step.weight }}
            >
              Kalaa grows your business online.
            </p>
          </div>
        ))}

        <div>
          <p className="text-label uppercase text-ink-muted">Switzer, reading size</p>
          <p className="mt-3 max-w-2xl text-body text-ink-body">
            Kalaa runs social media for businesses that want more enquiries, not more impressions.
            Posts, reels, Meta ads, and the websites and software behind them. The point of a
            paragraph in a style guide is to be long enough to read properly, because a text face
            that looks fine in one line can still be tiring in five.
          </p>
        </div>
      </div>
    </Block>
  );
}
