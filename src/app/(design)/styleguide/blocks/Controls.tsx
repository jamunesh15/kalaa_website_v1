import { Block } from "../Block";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

/**
 * The pressable surfaces, and the gesture they share.
 *
 * Hover one and it rises two pixels while its shadow deepens to match. That is
 * one idea, defined once in the `liftable` utility, and every other pressable
 * thing on the site reuses it rather than inventing a hover of its own.
 *
 * Tab to them as well as hovering. The focus ring is added rather than
 * replacing the browser default, so there is no half of it to lose later.
 */
export function Controls() {
  return (
    <Block
      title="Controls"
      note="Hover and press each one. Then tab through them, because a keyboard user has to see where they are."
    >
      <div className="flex flex-wrap items-center gap-4">
        <Button>Get a proposal</Button>
        <Button variant="secondary">See our work</Button>
        <Button href="/contact">A link that looks like a button</Button>
        <Pill>Social media</Pill>
        <Pill>Meta ads</Pill>
      </div>

      <div className="mt-8 rounded-token bg-accent p-8">
        <p className="text-body text-on-accent">
          The black button works on the accent field precisely because the field is light. That is
          the whole argument for a light accent beside a black-and-white logo: the colour can sit
          behind everything and the mark still wins.
        </p>
        <div className="mt-5">
          <Button>Get a proposal</Button>
        </div>
      </div>
    </Block>
  );
}
