import { Section } from "@/components/ui/Section";
import { getProcessSteps } from "@/content";
import { ProcessPath } from "@/sections/home/ProcessPath";

/**
 * A month with Kalaa, in the order it happens.
 *
 * A line you follow, and this is the reason: a sequence and a set of
 * alternatives are different things, and drawing them the same way tells the
 * reader nothing about which one they are looking at. Services is a grid you
 * pick from. This is a path, so it is drawn as one.
 *
 * It was a list of rows with the whole right half of the rail empty, which is
 * the "heading block with nothing beside it" tell from this project's own list.
 * The five steps are now points on a rising line, from a reference the client
 * supplied. `ProcessPath` holds the geometry and the note on what was left
 * behind in that reference.
 *
 * The numbers are real here. `src/content/process.ts` puts it plainly: if two
 * of these could swap places they should be one step. That is what separates a
 * legitimate counter from the decorative `01 02 03` that gets put on any three
 * items to make them look organised.
 *
 * On a sage band, so the page alternates rather than running white all the way
 * down. Body text on the pale sage is fine; `--ink-muted` on it is not, and
 * nothing here uses it.
 */
export function Process() {
  const steps = getProcessSteps();

  return (
    <Section id="process" fill="bg-tint-cloud">
      <ProcessPath steps={steps} />
    </Section>
  );
}
