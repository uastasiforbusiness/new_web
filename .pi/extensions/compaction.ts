/**
 * Project compaction for B LEADER.
 *
 * Hooks `session_before_compact` and runs the summarizer with the instructions
 * from `.pi/COMPACTION.md`. Falls back to pi's default compaction on any error
 * or missing model, so compaction can never break the session.
 *
 * Based on the official example: examples/extensions/custom-compaction.ts
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { convertToLlm, serializeConversation } from "@earendil-works/pi-coding-agent";

const INSTRUCTIONS_PATH = ".pi/COMPACTION.md";

export default function (pi: ExtensionAPI) {
  pi.on("session_before_compact", async (event, ctx) => {
    const { preparation, signal } = event;
    const { messagesToSummarize, turnPrefixMessages, tokensBefore, firstKeptEntryId, previousSummary } = preparation;

    // Use the session's current model; default compaction if none.
    const model = ctx.model;
    if (!model) {
      return;
    }

    // Read project compaction instructions; default compaction if unreadable.
    let instructions: string;
    try {
      instructions = await readFile(join(ctx.cwd, INSTRUCTIONS_PATH), "utf8");
    } catch {
      return;
    }

    const allMessages = [...messagesToSummarize, ...turnPrefixMessages];
    const conversationText = serializeConversation(convertToLlm(allMessages));
    const previousContext = previousSummary ? `\n\nPrevious session summary for context:\n${previousSummary}` : "";

    const summaryMessages = [
      {
        role: "user" as const,
        content: [
          {
            type: "text" as const,
            text: `You are a conversation summarizer for the B LEADER project. Follow these instructions strictly:

${instructions}${previousContext}

<conversation>
${conversationText}
</conversation>`,
          },
        ],
        timestamp: Date.now(),
      },
    ];

    try {
      const response = await ctx.modelRegistry.complete(
        model,
        { messages: summaryMessages },
        {
          maxTokens: 8192,
          signal,
          cacheRetention: "none",
        },
      );

      const summary = response.content
        .filter((c): c is { type: "text"; text: string } => c.type === "text")
        .map((c) => c.text)
        .join("\n");

      if (!summary.trim()) {
        return; // empty summary -> default compaction
      }

      return {
        compaction: {
          summary,
          firstKeptEntryId,
          tokensBefore,
          usage: response.usage,
        },
      };
    } catch {
      return; // error -> default compaction
    }
  });
}
