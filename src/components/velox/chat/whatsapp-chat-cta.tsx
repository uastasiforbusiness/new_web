"use client";

import { MessageCircle } from "lucide-react";
import { useChat } from "./chat-context";

type Props = {
  message: string;
  label: string;
  className?: string;
  align?: "block" | "inline";
};

/**
 * Chat CTA that opens the in-page concierge instead of navigating out to wa.me.
 * Works in server components via this client island.
 */
export function WhatsAppChatCta({ message, label, className }: Props) {
  const { openChat } = useChat();
  return (
    <button
      type="button"
      onClick={() => openChat(message)}
      className={className}
    >
      <MessageCircle size={17} className="text-gold" />
      <span>{label}</span>
    </button>
  );
}