import { ArrowButton } from "@/components/ui/ArrowButton";
import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { getFaqItems } from "@/content";

/**
 * The questions, immediately before the ask.
 *
 * It sits here because an unanswered question is the most common reason
 * somebody reaches a contact button and does not press it. The section is the
 * last thing between the reader and the enquiry, so the objections get cleared
 * where they are actually being felt rather than several screens earlier.
 *
 * **One centred column, at the client's instruction.** It ran two columns
 * before, heading left and questions right, on the argument that a seventh
 * heading-over-content band in a row makes the page scroll like a checklist.
 * The cost of that argument was a tall empty space under a short heading, which
 * this project's own rules call out as reading like a failed load, and it took
 * a made-up text link at the bottom of the left column to fill.
 *
 * Stacked, the rows get the full measure and the questions are the widest thing
 * in the section, which is what they should be: this is the one band where the
 * content IS a list and a reader is scanning it for their own question. The
 * list is capped at `max-w-4xl` rather than running the full rail, because a
 * question stretched to 1240px puts its expand mark a screen away from its own
 * words.
 *
 * **No accordion library and no client component.** These are native `details`
 * elements, so all seven answers are in the server-rendered HTML whether or not
 * anything is open. That matters more here than anywhere else on the site: this
 * is the block a search engine lifts whole and an assistant reads aloud, and it
 * carries `FAQPage` markup built from the same array, which Google only honours
 * when the content is actually visible on the page.
 *
 * **Nothing is open on load.** The first row used to be, on the argument that
 * an open answer reads as answers rather than as seven closed doors. The client
 * cut it: one row hanging open is a question somebody chose for the reader, and
 * it makes the section start halfway through itself. Every answer is still in
 * the server-rendered HTML either way, so the markup and what a crawler reads
 * do not change.
 */
export function Faq() {
  const items = getFaqItems();

  return (
    <Section id="faq" fill="bg-surface">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          {/*
            "Before you ask" was the heading and it read as awkward: it puts the
            reader in the wrong position, as somebody about to bother you, and
            it does not say what the section contains. This is the phrase people
            already look for, and it is also the phrase that matches the
            `FAQPage` markup this section emits.
          */}
          <h2 className="font-display text-display-l font-bold text-ink">
            Frequently asked <HandAccent>questions</HandAccent>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lead text-ink-body">
            The things people want to know before they get in touch.
          </p>
        </div>

        {/*
          The rows keep their own text left aligned even though the heading over
          them is centred. Centring a list of seven questions of different
          lengths gives every row a different starting point, so the eye has to
          find the start of each one instead of running down a single edge.
        */}
        <ul className="mt-12 min-w-0 text-left">
          {items.map((item) => (
            <li key={item.slug} className="min-w-0">
              {/*
                **`name` is what makes this a real accordion, with no
                JavaScript.** Every `details` sharing a name behaves like a
                radio group: opening one closes the others, which is the
                behaviour asked for. The alternative was a client component
                holding an open index in state, and that would have cost this
                section the thing it exists for, which is seven answers sitting
                in the server-rendered HTML for a crawler to lift whole.

                Browsers without it simply let two rows sit open at once. That
                is the old behaviour rather than a broken one.
              */}
              <details className="faq-row group" name="faq">
                <summary className="flex items-start justify-between gap-6 py-6 text-ink">
                  {/*
                    `display-m` rather than body weight. A question set at the
                    size of a label reads as documentation; set large it reads
                    as the thing the reader was already thinking.
                  */}
                  <span className="min-w-0 font-display text-display-m font-bold">
                    {item.question}
                  </span>
                  <span aria-hidden className="faq-mark mt-2" />
                </summary>
                <p className="max-w-[62ch] pb-6 text-body text-ink-body">{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>

        {/*
          Under the rows rather than under the heading, which is where it
          belongs: it answers "my question was not in that list", and that is
          only true once the reader has been through the list.

          **A line and a button, not a sentence with a link buried in it.** It
          read "Something not covered here? Ask us directly" on one line, and
          the two halves were set differently: the question in `--ink-body` at
          regular weight, the link in `--ink` at bold with an underline. One
          line carrying two colours and two weights reads as half of it having
          failed to load, and it was reported exactly that way, twice.

          Matching the two up was not the fix. A thing you click is a control,
          and this site has one shape for that. So the sentence stays a
          sentence, in one colour at one weight, and the action underneath it is
          the same arrow button every other action on the site uses.
        */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
          {/*
            `text-lead`, the same size as the sentence under the heading, not
            the smaller body step. Stacked above a 48px button a body-size line
            reads as a caption for it; beside it at lead size the two are one
            sentence with its action on the end, which is what it is.

            It stacks below `sm`, where the pair is wider than a phone column
            and side by side would break the line mid-phrase.
          */}
          <p className="text-lead text-ink-body">Anything not covered here?</p>
          <ArrowButton href="/contact" width="fit">
            Ask us directly
          </ArrowButton>
        </div>
      </div>
    </Section>
  );
}
