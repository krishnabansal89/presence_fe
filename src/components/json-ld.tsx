/**
 * Renders a JSON-LD structured-data script tag. Server component — the object
 * is serialized at render time and emitted into the HTML for search engines.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // structured data is static and author-controlled (no user input)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
