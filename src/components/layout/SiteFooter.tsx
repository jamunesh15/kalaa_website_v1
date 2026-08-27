import Link from "next/link";
import { FOCUS_RING } from "@/components/ui/surface";
import { FOOTER_LINKS } from "@/nav";
import { SITE } from "@/site";

/**
 * The footer.
 *
 * Mounted by the root layout outside `<main>`, so it is exposed as the
 * contentinfo landmark. Links come from `src/nav.ts` rather than being written
 * again here, which is what stopped the footer drifting out of step with the
 * masthead the last time a section was added.
 *
 * It stays on the sheet rather than on the sage. Text on the frame is the one
 * combination in this palette that fails contrast at muted weight, and a footer
 * is exactly where muted text goes.
 */
export function SiteFooter() {
  return (
    <footer className="mt-16 rounded-b-token border-t-token border-line bg-sheet">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-12">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${FOCUS_RING} transition-token rounded-token text-body text-ink-muted hover:text-ink`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-small text-ink-muted">
          {SITE.name}, creative social media marketing agency.
        </p>
      </div>
    </footer>
  );
}
