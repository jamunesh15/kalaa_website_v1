import { Section } from "@/components/ui/Section";
import type { FullArticle } from "@/content/types";
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
    <Section fill="bg-tint-sky" padding="py-14 lg:py-20" className="px-6">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,17rem)]">
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--masthead)+4.5rem)] lg:self-start">
          <ArticleContents sections={article.sections} />
        </div>

        <article className="min-w-0">
          {article.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[64ch] text-lead text-ink-body first:mt-0">
              {paragraph}
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

              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 max-w-[64ch] text-body text-ink-body">
                  {paragraph}
                </p>
              ))}

              {section.list ? (
                <ul className="mt-6 max-w-[64ch] space-y-3">
                  {section.list.map((item) => (
                    /* A rule rather than a dot, because a dot on every line is the tell. */
                    <li
                      key={item}
                      className="border-l-2 border-ink-sage/40 pl-4 text-body text-ink-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        {/* Third from `xl`, where there is room for it. Below that it follows the article. */}
        <div className="min-w-0 lg:col-span-2 xl:col-span-1 xl:sticky xl:top-[calc(var(--masthead)+4.5rem)] xl:self-start">
          <ArticleAside />
        </div>
      </div>
    </Section>
  );
}
