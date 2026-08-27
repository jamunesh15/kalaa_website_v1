import { Block } from "../Block";
import { CornerPicker } from "../CornerPicker";

/**
 * The corner, which is the one decision still open.
 *
 * Whichever wins becomes `--radius` and applies to every button, input, card,
 * image frame and panel on the site. There is no second value. v1 split it
 * between square surfaces and rounded controls, and that split is most of why
 * the old page read as assembled rather than designed.
 */
export function Corners() {
  return (
    <Block
      title="Corner"
      note="Press one and the whole page changes with it, including the blocks above and below. Judge it on the buttons and the cards together, not on a swatch."
    >
      <CornerPicker />
    </Block>
  );
}
