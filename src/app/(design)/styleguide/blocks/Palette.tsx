import { Block } from "../Block";
import { TokenValue } from "../TokenValue";

/* The palette, and the job each colour holds. */
const SWATCHES = [
  { token: "--page", swatch: "bg-page", role: "The sage frame. Ink or body text only, never muted." },
  { token: "--sheet", swatch: "bg-sheet", role: "The white sheet the site is printed on." },
  { token: "--ink", swatch: "bg-ink", role: "Headings and high-emphasis text." },
  { token: "--accent", swatch: "bg-accent", role: "The field behind things. Never a button." },
  { token: "--action", swatch: "bg-action", role: "Buttons. The logo's own black." },
  { token: "--tint-butter", swatch: "bg-tint-butter", role: "Card fill. Rhythm, not meaning." },
  { token: "--tint-peach", swatch: "bg-tint-peach", role: "Card fill. Rhythm, not meaning." },
  { token: "--tint-sage", swatch: "bg-tint-sage", role: "Card fill. Rhythm, not meaning." },
  { token: "--tint-cloud", swatch: "bg-tint-cloud", role: "Card fill. Rhythm, not meaning." },
];

export function Palette() {
  return (
    <Block
      title="Palette"
      note="Values are read from the live stylesheet, so this page cannot describe a colour the site is not using."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SWATCHES.map((entry) => (
          <div key={entry.token} className="rounded-token border-token border-line">
            <div className={`${entry.swatch} h-20 rounded-t-token border-b-token border-line`} />
            <div className="p-4">
              <TokenValue name={entry.token} />
              <p className="mt-2 text-small text-ink-body">{entry.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-2xl text-small text-ink-body">
        <p>
          Two facts worth knowing before changing anything here. Muted text on the sage frame
          measures 2.9:1 and fails; ink on sage is 7.1:1 and body is 4.9:1, so those two are
          allowed and muted is not.
        </p>
        <p className="mt-3">
          The accent against the white sheet is 1.38:1. That is a hue difference rather than a
          luminance one, which is fine for a large field and useless for a hairline, so nothing is
          ever outlined in it.
        </p>
      </div>
    </Block>
  );
}
