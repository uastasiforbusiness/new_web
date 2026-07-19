/**
 * Markdown content negotiation utilities for AI agents.
 *
 * Converts server-rendered HTML to Markdown on-the-fly when a client sends
 * `Accept: text/markdown`. Uses node-html-markdown (DOM-free, ~40 KB)
 * instead of jsdom + turndown (~5 MB) for Cloudflare Workers compatibility.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
import { NodeHtmlMarkdown } from "node-html-markdown";

// Tags whose entire subtree should be removed before conversion.
const STRIP_TAGS = [
  "script", "style", "noscript", "iframe", "template",
  "nav", "footer", "header",
];

// Singleton instance — node-html-markdown is stateless and safe to share.
const nhm = new NodeHtmlMarkdown({
  bulletMarker: "-",
  codeFence: "```",
});

/**
 * Convert an HTML string to Markdown.
 *
 * - Prepends YAML frontmatter with title/description/image extracted from
 *   <meta> tags, matching the Cloudflare Markdown for Agents output format.
 * - Strips chrome (nav, footer, scripts) via pre-processing regex.
 * - Appends JSON-LD blocks as fenced ```json blocks at the end.
 */
export function htmlToMarkdown(html: string, baseUrl: string): string {
  // Extract metadata before stripping scripts.
  const title = extractMeta(html, "og:title") || extractTitleTag(html);
  const description = extractMeta(html, "og:description") || extractMeta(html, "description");
  const image = extractMeta(html, "og:image");

  // Pull JSON-LD blocks out before we strip script tags.
  const jsonLdBlocks = extractJsonLd(html);

  // Strip chrome elements (and their children) before conversion.
  // We use regex instead of a DOM because we don't have jsdom.
  for (const tag of STRIP_TAGS) {
    html = html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi"), "");
  }
  // Also strip elements with aria-hidden="true" (presentational only).
  html = html.replace(/<[^>]+aria-hidden=["']true["'][^>]*>[\s\S]*?<\/[^>]+>/gi, "");

  // Convert to markdown — no DOM needed, node-html-markdown parses the
  // string directly using its own lightweight HTML parser.
  let markdown = nhm.translate(html).trim();

  // Make relative URLs absolute so agents can follow them.
  markdown = absolutizeUrls(markdown, baseUrl);

  // Frontmatter (only when we have at least one field).
  const frontmatter: string[] = ["---"];
  if (title) frontmatter.push(`title: ${yamlScalar(title)}`);
  if (description) frontmatter.push(`description: ${yamlScalar(description)}`);
  if (image) frontmatter.push(`image: ${yamlScalar(image)}`);
  frontmatter.push("---\n");
  const header = frontmatter.length > 2 ? frontmatter.join("\n") + "\n" : "";

  // JSON-LD at the end, as Cloudflare does.
  let footer = "";
  if (jsonLdBlocks.length > 0) {
    footer =
      "\n\n## Structured data\n\n" +
      jsonLdBlocks.map((block) => "```json\n" + block + "\n```").join("\n\n");
  }

  return header + markdown + footer;
}

/**
 * Rough token estimate. GPT-family tokenizers average ~4 chars/token for
 * English; close enough for the x-markdown-tokens advisory header.
 */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

// --- helpers -------------------------------------------------------------

function extractMeta(html: string, name: string): string | null {
  // Handles both <meta name="X"> and <meta property="X">.
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escapeRegex(name)}["'][^>]*content=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  return m ? decodeEntities(m[1]).trim() : null;
}

function extractTitleTag(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? decodeEntities(m[1]).trim() : null;
}

function extractJsonLd(html: string): string[] {
  const blocks: string[] = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1].trim();
    if (raw) blocks.push(raw);
  }
  return blocks;
}

function absolutizeUrls(markdown: string, baseUrl: string): string {
  try {
    const base = new URL(baseUrl);
    return markdown.replace(/\]\((\/?[^)\s]*)\)/g, (full, p1) => {
      if (/^https?:\/\//i.test(p1) || p1.startsWith("#") || p1.startsWith("mailto:")) {
        return full;
      }
      const resolved = new URL(p1, base).toString();
      return `](${resolved})`;
    });
  } catch {
    return markdown;
  }
}

function yamlScalar(value: string): string {
  // Quote if it contains characters that need escaping in YAML.
  if (/[:#\n'\"{}\[\]]/.test(value)) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
