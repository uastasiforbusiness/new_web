/**
 * Markdown content negotiation utilities for AI agents.
 *
 * Converts server-rendered HTML to Markdown on-the-fly when a client sends
 * `Accept: text/markdown`. Implements the pattern documented at
 * https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 * and https://llmstxt.org/.
 *
 * Why this exists: Cloudflare's "Markdown for Agents" (dashboard toggle) is a
 * paid Pro+ feature. This module provides the same content-negotiation
 * behavior in the Worker for free.
 */
import TurndownService from "turndown";
import { JSDOM } from "jsdom";

/**
 * Create a fresh turndown instance per request. Turndown mutates its internal
 * DOM reference on convert, so sharing a singleton across concurrent requests
 * in the Worker would be unsafe.
 */
function createTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    hr: "---",
  });

  // Turndown walks the DOM we hand it; we already strip chrome via
  // querySelectorAll before conversion, so these remove() calls are a
  // second-pass safety net.
  td.remove(["script", "style", "noscript", "iframe", "template"]);

  return td;
}

/**
 * Convert an HTML string to Markdown.
 *
 * - Prepends YAML frontmatter with title/description/image extracted from
 *   <meta> tags, matching the Cloudflare Markdown for Agents output format.
 * - Appends JSON-LD blocks as fenced ```json blocks at the end.
 */
export function htmlToMarkdown(html: string, baseUrl: string): string {
  // Extract metadata before stripping scripts.
  const title = extractMeta(html, "og:title") || extractTitleTag(html);
  const description = extractMeta(html, "og:description") || extractMeta(html, "description");
  const image = extractMeta(html, "og:image");

  // Pull JSON-LD blocks out before turndown strips scripts.
  const jsonLdBlocks = extractJsonLd(html);

  // Parse with jsdom so turndown has a DOM to walk.
  const dom = new JSDOM(html, { url: baseUrl });
  const document = dom.window.document;

  // Strip non-content elements directly on the DOM before conversion.
  document.querySelectorAll("script, style, noscript, iframe, template").forEach((n) => n.remove());
  document.querySelectorAll("nav, footer, header, [aria-hidden='true']").forEach((n) => n.remove());

  const body = document.body;
  if (!body) {
    return "";
  }

  const turndown = createTurndown();
  let markdown = turndown.turndown(body).trim();

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
    const origin = base.origin;
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
  if (/[:#\n'"{}\[\]]/.test(value)) {
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
