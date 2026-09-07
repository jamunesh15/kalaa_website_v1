import { ArrowButton } from "@/components/ui/ArrowButton";
import { HandAccent } from "@/components/ui/HandAccent";
import { Section } from "@/components/ui/Section";
import { getFaqItems } from "@/content";

/* The questions, immediately before the ask. */
export function Faq() {
  const items = getFaqItems();

  return (
    <Section id="faq" fill="bg-surface">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          {/* "Before you ask" was the heading and it read as awkward: it puts the reader in the wrong position, as somebody about to. */}
          <h2 className="font-display text-display-l font-bold text-ink">
            Frequently asked <HandAccent>questions</HandAccent>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lead text-ink-body">
            The things people want to know before they get in touch.
          </p>
        </div>

        {/* The rows keep their own text left aligned even though the heading over them is centred. */}
        <ul className="mt-12 min-w-0 text-left">
          {items.map((item) => (
            <li key={item.slug} className="min-w-0">
              {/* `name` is what makes this a real accordion, with no JavaScript. */}
              <details className="faq-row group" name="faq">
                <summary className="flex items-start justify-between gap-6 py-6 text-ink">
                  {/* `display-m` rather than body weight. */}
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

        {/* Under the rows rather than under the heading, which is where it belongs: it answers "my question was not in that list". */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
          {/* `text-lead`, the same size as the sentence under the heading, not the smaller body step. */}
          <p className="text-lead text-ink-body">Anything not covered here?</p>
          <ArrowButton href="/contact" width="fit">
            Ask us directly
          </ArrowButton>
        </div>
      </div>
    </Section>
  );
}
