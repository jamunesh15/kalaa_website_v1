import { Section } from "@/components/ui/Section";
import { HandAccent } from "@/components/ui/HandAccent";
import { getProblems } from "@/content";
import { ProblemDeck } from "@/sections/home/ProblemDeck";

/**
 * The section that makes the services list land.
 *
 * A service list read cold is a menu. The same list read after somebody has
 * recognised their own problem is a solution, so this sits between the promise
 * and the offer and does one job: say the thing the visitor already knows is
 * wrong, in the words they would use.
 *
 * Deliberately not "why you need social media". Every agency site has that
 * section and they all say visibility, engagement, trust, growth. This one is
 * about the reader rather than about the industry, which is also why it is the
 * section a business owner will actually finish.
 *
 * **The cards build into a receding deck as you scroll.** Each sticks a little
 * lower than the one before, arrives bent and standing up, and is then pushed
 * back and scaled down as the next one covers it. The sticking is native
 * `position: sticky`, so the page still scrolls at exactly the speed the reader
 * asks for and no library owns the scroll. The motion lives in `ProblemDeck`
 * and `ProblemCard`, which are client components for that reason alone.
 *
 * Worth recording because it is a rule this project set and then lifted on
 * purpose: CLAUDE.md rules out pinned scroll sections. The reason behind that
 * rule is scroll hijacking, which this is not. It was lifted deliberately.
 *
 * **Every card is the same colour**, which took three tries to arrive at. White
 * cards on the band read as blank paper. Cycling butter, sage and cloud gave
 * each card two competing colours once a photograph was in it, and four cards
 * between them put five colours on one screen. One surface per card, with the
 * picture inset inside it, leaves the band as the only colour in the section
 * and lets the photographs be the thing that changes.
 */
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
