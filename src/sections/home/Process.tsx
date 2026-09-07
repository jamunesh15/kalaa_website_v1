import { Section } from "@/components/ui/Section";
import { getProcessSteps } from "@/content";
import { ProcessPath } from "@/sections/home/ProcessPath";

/* A month with Kalaa, in the order it happens. */
export function Process() {
  const steps = getProcessSteps();

  return (
    <Section id="process" fill="bg-tint-cloud">
      <ProcessPath steps={steps} />
    </Section>
  );
}
