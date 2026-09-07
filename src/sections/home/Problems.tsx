import { Section } from "@/components/ui/Section";
import { HandAccent } from "@/components/ui/HandAccent";
import { getProblems } from "@/content";
import { ProblemDeck } from "@/sections/home/ProblemDeck";

/* The section that makes the services list land. */
export function Problems() {
  const problems = getProblems();

  return (
    <Section id="problems" fill="bg-tint-peach">
      <div className="max-w-2xl">
        <h2 className="font-display text-display-l font-bold text-ink">
          <HandAccent>Sound familiar?</HandAccent>
        </h2>
        <p className="mt-4 text-lead text-ink-body">
          None of this means you are bad at your business. It means nobody is running the part of
          it that happens on a phone.
        </p>
      </div>

      <ProblemDeck problems={problems} />
    </Section>
  );
}
