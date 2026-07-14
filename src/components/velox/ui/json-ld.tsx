/**
 * JSON-LD utility component.
 * Inyecta structured data en el <head> desde cualquier Server Component.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
