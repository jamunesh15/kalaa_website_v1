import type { SchemaNode } from "@/seo/graph";

/* Renders a structured data block. */
export function JsonLd({ data }: { data: SchemaNode }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
