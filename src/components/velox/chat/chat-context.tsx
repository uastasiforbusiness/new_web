"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

/**
 * Global chat state so any CTA across the site can open the in-page
 * WhatsApp concierge instead of bouncing the visitor out to wa.me.
 *
 * openChat(presetMessage?) opens the concierge popup and, once the visitor
 * reaches the chat phase, pre-fills the input with presetMessage (one time).
 */
type ChatContextValue = {
  open: boolean;
  presetMessage: string | null;
  openChat: (presetMessage?: string) => void;
  closeChat: () => void;
  clearPreset: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetMessage, setPresetMessage] = useState<string | null>(null);

  const openChat = useCallback((presetMessage?: string) => {
    setPresetMessage(presetMessage ?? null);
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
  }, []);

  const clearPreset = useCallback(() => {
    setPresetMessage(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        open,
        presetMessage,
        openChat,
        closeChat,
        clearPreset,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within <ChatProvider>");
  return ctx;
}