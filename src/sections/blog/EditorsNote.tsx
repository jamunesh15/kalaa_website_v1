import { EDITORS_NOTE } from "@/content/blog";

/* Who writes here, beside the featured piece. No rules around it: the column's own space sets it apart. */
export function EditorsNote() {
  return (
    <div className="lg:pl-4">
      <h2 className="text-small font-medium uppercase tracking-[0.08em] text-ink-sage">
        {EDITORS_NOTE.title}
      </h2>

      <p className="mt-4 text-body text-ink-body">{EDITORS_NOTE.body}</p>

      <p className="mt-6 font-hand text-[1.35rem] leading-snug text-ink">{EDITORS_NOTE.signoff}</p>
    </div>
  );
}
