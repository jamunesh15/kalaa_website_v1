import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { FOCUS_RING } from "@/components/ui/surface";
import type { ArticleFlow, ArticleSubsection, ArticleTable, FullArticle } from "@/content/types";
import { ArticleAside } from "@/sections/article/ArticleAside";
import { ArticleContents } from "@/sections/article/ArticleContents";

/*
 * The article, with its contents on one side and the ask on the other.
 *
 * NO `overflow-x-clip` on this band, and that is load bearing. Any overflow other
 * than visible makes the section the sticky context, so both rails below stop
 * sticking to the viewport and slide under the masthead instead. Nothing here
 * travels sideways, and the mats are held in by the section's own `px-6`.
 *
 * The offset is read off the masthead token rather than typed, because the two
 * have to move together: at less than this the rail's own sheet goes under the
 * bar before the rail does.
 *
 * Both rails are `sticky`, which the project's own rules otherwise rule out. He
 * asked for this arrangement by pointing at it, and an explicit instruction
 * outranks a default. Nothing here pins a whole section or takes the scroll: the
 * page scrolls normally and two narrow columns hold their place while it does.
 *
 * `scroll-mt` on each heading is not decoration either. Without it the masthead
 * covers the heading a contents link just jumped to.
 */
export function ArticleBody({ article }: { article: FullArticle }) {
  return (
    <Section fill="bg-tint-sky" padding="py-14 lg:py-20" className="px-3 md:px-6">
      <div className="grid gap-12 lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
        {/*
         * The contents and the article share a grid of their own, and that is
         * what stops the contents at the article's last line. A sticky item
         * travels the whole of its containing block, not its row: with the ask
         * as a second row of the same grid below `xl`, the list slid on into
         * that row and the card was painted over it.
         */}
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--masthead)+4.5rem)] lg:self-start">
            {/* The questions get a line in the contents when there are any. */}
            <ArticleContents
              sections={
                article.faq?.length
                  ? [...article.sections, { id: "faq", heading: "Frequently asked questions", body: [] }]
                  : article.sections
              }
            />
          </div>

          <article className="min-w-0">
            {article.intro.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-[64ch] text-lead text-ink-body first:mt-0">
                <Inline text={paragraph} />
              </p>
            ))}

            {/*
             * No reveal on the body. Four sections arriving identically is the
             * repeated-reveal tell, and animating a paragraph somebody is already
             * reading is worse than not animating it at all. The motion on this
             * page is at the top and at the foot, where a reader is arriving.
             */}
            {article.sections.map((section) => (
              <section key={section.id}>
                <h2
                  id={section.id}
                  className="mt-14 scroll-mt-28 font-display text-display-l font-bold text-ink"
                >
                  {section.heading}
                </h2>

                <Blocks part={section} />

                {/* `h3` under the section's `h2`, so the outline never skips a level. */}
                {section.subsections?.map((part) => (
                  <div key={part.id}>
                    <h3
                      id={part.id}
                      className="mt-10 scroll-mt-28 font-display text-display-m font-bold text-ink"
                    >
                      {part.heading}
                    </h3>
                    <Blocks part={part} />
                  </div>
                ))}
              </section>
            ))}

            {/*
             * The questions, as the same accordion the home page uses, and as
             * `FAQPage` in the page's JSON-LD. The answers sit inside closed
             * `details`, which is still in the document: a crawler reads them and
             * a screen reader reaches them, so marking them up is marking up what
             * is on the page.
             */}
            {article.faq?.length ? (
              <section>
                <h2 id="faq" className="mt-14 scroll-mt-28 font-display text-display-l font-bold text-ink">
                  Frequently asked questions
                </h2>
                <ul className="mt-4 max-w-[64ch]">
                  {article.faq.map((item) => (
                    <li key={item.question} className="min-w-0">
                      <details className="faq-row group" name="article-faq">
                        <summary className="flex items-start justify-between gap-6 py-5 text-ink">
                          <span className="min-w-0 font-display text-display-m font-bold">
                            {item.question}
                          </span>
                          <span aria-hidden className="faq-mark mt-2" />
                        </summary>
                        <p className="pb-5 text-body text-ink-body">{item.answer}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        </div>

        {/* Third from `xl`, where there is room for it. Below that it follows the article. */}
        <div className="min-w-0 lg:mt-10 xl:mt-0 xl:sticky xl:top-[calc(var(--masthead)+4.5rem)] xl:self-start">
          <ArticleAside />
        </div>
      </div>
    </Section>
  );
}

/* One part of an article, in a fixed order: prose, list, table, diagram, prose. */
function Blocks({ part }: { part: ArticleSubsection }) {
  return (
    <>
      <Paragraphs lines={part.body} />

      {part.list ? (
        <ul className="mt-6 max-w-[64ch] space-y-3">
          {part.list.map((item) => (
            /*
             * The site's own arrow, the one in the Contact button and the
             * testimonial controls, rather than a new device. Not a dot, which
             * was rejected as the template tell, and not a tick, because some
             * of these lists are mistakes and a tick beside one reads as
             * approval. `mt-1.5` puts the 16px mark on the centre of the first
             * 28px line, so it lines up with the words rather than the block.
             */
            <li key={item} className="flex gap-3 text-body text-ink-body">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1.5 size-4 shrink-0 text-ink"
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
              <span className="min-w-0">
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {part.table ? <Table table={part.table} /> : null}
      {part.flow ? <Flow flow={part.flow} /> : null}
      {part.after ? <Paragraphs lines={part.after} /> : null}
    </>
  );
}

function Paragraphs({ lines }: { lines: readonly string[] }) {
  return lines.map((paragraph) => (
    <p key={paragraph} className="mt-5 max-w-[64ch] text-body text-ink-body">
      <Inline text={paragraph} />
    </p>
  ));
}

/*
 * A table on a white card, the same surface every card on the site sits on.
 *
 * **Below `sm` every row stacks into a card of its own**, the row heading on
 * top and each value under it with its column name beside it. Three columns at
 * 375px leave about 70px each, and measured that way five of the first seven
 * tables scrolled sideways, which on a phone means columns nobody finds.
 *
 * It stays a real `<table>` at every width rather than a list swapped in for
 * phones, and that is the SEO half of the decision: Google indexes the phone
 * rendering, so a table hidden on phones is a table it may never see. Changing
 * `display` on table parts strips their semantics in some browsers, so each
 * part carries its ARIA role explicitly to put them back.
 *
 * The column name inside each cell is a real span rather than CSS content: on a
 * phone the header row is hidden, so the span is what a screen reader hears,
 * and from `sm` the span is `display: none` and the header row takes over.
 */
function Table({ table }: { table: ArticleTable }) {
  return (
    <div className="mt-7 max-w-[64ch] min-w-0 overflow-x-auto rounded-token bg-surface shadow-soft">
      <table role="table" className="block w-full border-collapse text-left text-small sm:table">
        <caption className="block px-5 pt-4 pb-2 text-left text-small font-bold text-ink sm:table-caption sm:pb-1">
          {table.caption}
        </caption>
        <thead role="rowgroup" className="hidden sm:table-header-group">
          <tr role="row" className="border-b border-line">
            {table.head.map((cell) => (
              <th
                key={cell}
                role="columnheader"
                scope="col"
                className="px-5 py-3 align-bottom font-bold text-ink"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup" className="block sm:table-row-group">
          {table.rows.map((row) => (
            <tr
              key={row[0]}
              role="row"
              className="block border-t border-line px-5 py-3 sm:table-row sm:border-t-0 sm:border-b sm:p-0 sm:last:border-b-0"
            >
              {row.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={index}
                    role="rowheader"
                    scope="row"
                    className="block pb-1 align-top font-bold text-ink sm:table-cell sm:px-5 sm:py-3"
                  >
                    <Inline text={cell} />
                  </th>
                ) : (
                  <td
                    key={index}
                    role="cell"
                    className="block py-0.5 align-top text-ink-body sm:table-cell sm:px-5 sm:py-3"
                  >
                    <span className="font-bold text-ink sm:hidden">{table.head[index]}: </span>
                    <Inline text={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*
 * Steps drawn as a column of cards joined by arrows.
 *
 * A column rather than a row, and on purpose: the article runs at 64 characters
 * wide, and four cards across that measure are four cards of cramped type. A
 * column reads top to bottom on every width without a breakpoint deciding how.
 */
function Flow({ flow }: { flow: ArticleFlow }) {
  return (
    <figure className="mt-7 max-w-[64ch]">
      <figcaption className="text-small font-bold text-ink">{flow.caption}</figcaption>
      <ol className="mt-4">
        {flow.steps.map((step, index) => (
          <li key={step.title}>
            {index > 0 ? <Arrow /> : null}
            <div className="rounded-token bg-surface px-5 py-4 shadow-soft">
              <p className="font-display text-body font-bold text-ink">
                <span className="text-ink-body">{index + 1}.</span> {step.title}
              </p>
              <p className="mt-1 text-small text-ink-body">
                <Inline text={step.text} />
              </p>
            </div>
          </li>
        ))}
      </ol>
      {flow.loop ? (
        <p className="mt-3 flex items-start gap-2 text-small text-ink-body">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 size-4 shrink-0"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
          </svg>
          <span>{flow.loop}</span>
        </p>
      ) : null}
    </figure>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto my-1.5 block size-5 text-ink-body"
    >
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

/*
 * The two marks an article body may carry, and nothing else.
 *
 * `**strong**` for the emphasis the client's own copy uses, and `[words](/path)`
 * for a link to another page on this site. The link pattern only matches a path
 * that starts with `/`, so an article can never link off the site by accident
 * and a stray bracket in a sentence stays a bracket.
 *
 * The link is underlined, not merely coloured: inside a paragraph, colour alone
 * is not enough to tell a link from its sentence, and it is the one place on the
 * site where somebody reading has no other cue.
 */
const MARKS = /(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\))/g;
const LINK = /^\[([^\]]+)\]\((\/[^)\s]*)\)$/;

function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = text.split(MARKS).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = LINK.exec(part);
    if (link) {
      return (
        <Link
          key={index}
          href={link[2]}
          className={`${FOCUS_RING} rounded-token font-medium text-ink underline decoration-ink-sage underline-offset-4 hover:decoration-ink`}
        >
          {link[1]}
        </Link>
      );
    }

    return part;
  });

  return <>{parts}</>;
}
