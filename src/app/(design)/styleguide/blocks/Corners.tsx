import { Block } from "../Block";
import { CornerPicker } from "../CornerPicker";

/* The corner, which is the one decision still open. */
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
