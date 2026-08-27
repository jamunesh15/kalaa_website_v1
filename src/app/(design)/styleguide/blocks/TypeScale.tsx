import { Block } from "../Block";

/**
 * The scale. Every size the site is allowed to use.
 *
 * A heading picks a step. It never invents a size, which is how a page ends up
 * with a 27px heading nothing else on the site matches.
 *
 * The display steps are fluid between a phone and a desktop, so what is shown
 * here changes with the window. That is the point: there is no width at which a
 * heading is suddenly too big for the screen it is on.
 */
const STEPS = [
  { token: "text-display-xl", label: "Display XL", display: true },
  { token: "text-display-l", label: "Display L", display: true },
  { token: "text-display-m", label: "Display M", display: true },
  { token: "text-lead", label: "Lead", display: false },
  { token: "text-body", label: "Body", display: false },
  { token: "text-small", label: "Small", display: false },
  { token: "text-label", label: "Label", display: false },
];

export function TypeScale() {
  return (
    <Block title="Type scale" note="Seven steps. Nothing on the site sits between two of them.">
      <div className="flex flex-col gap-6">
        {STEPS.map((step) => (
          <div key={step.token}>
            <p className="font-mono text-small text-ink-muted">{step.token}</p>
            <p className={`${step.token} ${step.display ? "font-display" : ""} text-ink`}>
              {step.label}, more leads and more revenue
            </p>
          </div>
        ))}
      </div>
    </Block>
  );
}
