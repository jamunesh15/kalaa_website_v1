import type { SchemaNode } from "@/seo/graph";

/**
 * Renders a structured data block.
 *
 * `JSON.stringify` rather than a template literal, so a stray quote or newline
 * in a description cannot produce invalid JSON. Search engines discard a block
 * that fails to parse without reporting anything, which is the quietest way for
 * a page's structured data to stop existing.
 */
export function JsonLd({ data }: { data: SchemaNode }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
