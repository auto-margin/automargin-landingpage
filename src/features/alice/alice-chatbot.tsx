"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { Bot, MessageCircle, Minus, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "static" | "ai" | "fallback";
};

type AliceApiResponse = {
  answer?: string;
  source?: "static" | "ai" | "fallback";
  suggestions?: string[];
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I am Bot. Ask me about Auto-margin, pricing, the demo, supported files, supplier workflow, or how to contact the team.",
  source: "static",
};

const quickPrompts = [
  "What does Auto-margin do?",
  "How does pricing work?",
  "Can I try a demo?",
];
const MIN_TYPING_MS = 650;
const STORAGE_KEY = "automargin:bot-chat";
const MAX_STORED_MESSAGES = 20;

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function renderTextWithLinks(text: string) {
  const parts = text.split(
    /(\[[^\]]+\]\(\/[a-z0-9-/#]*\)|\s\/[a-z0-9-/]+|\bto@auto-margin\.com\b)/gi,
  );

  return parts.map((part, index) => {
    const trimmed = part.trim();

    const mappedLink = trimmed.match(/^\[([^\]]+)\]\((\/[a-z0-9-/#]*)\)$/i);
    if (mappedLink?.[1] && mappedLink?.[2]) {
      return (
        <a
          key={`${part}-${index}`}
          href={mappedLink[2]}
          className="font-medium underline underline-offset-4"
        >
          {mappedLink[1]}
        </a>
      );
    }

    if (trimmed.startsWith("/")) {
      return (
        <a
          key={`${part}-${index}`}
          href={trimmed}
          className="font-medium underline underline-offset-4"
        >
          {part}
        </a>
      );
    }

    if (trimmed.toLowerCase() === "to@auto-margin.com") {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${trimmed}`}
          className="font-medium underline underline-offset-4"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

export function AliceChatbot({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [suggestions, setSuggestions] = useState(quickPrompts);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const activeRequestRef = useRef(0);

  const transcript = useMemo(
    () =>
      messages
        .filter((message) => message.id !== "welcome")
        .slice(-6)
        .map(({ role, content }) => ({ role, content })),
    [messages],
  );

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    scrollArea.scrollTo({
      top: scrollArea.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending, open]);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }

      const saved = JSON.parse(raw) as {
        open?: unknown;
        suggestions?: unknown;
        messages?: unknown;
      };

      if (typeof saved.open === "boolean") {
        setOpen(saved.open);
      }

      if (
        Array.isArray(saved.suggestions) &&
        saved.suggestions.every((item) => typeof item === "string")
      ) {
        setSuggestions(saved.suggestions.slice(0, 3));
      }

      if (Array.isArray(saved.messages)) {
        const safeMessages = saved.messages
          .map((item): ChatMessage | null => {
            if (!item || typeof item !== "object") return null;
            const rawMessage = item as Record<string, unknown>;
            const role =
              rawMessage.role === "assistant" || rawMessage.role === "user"
                ? rawMessage.role
                : null;
            const content =
              typeof rawMessage.content === "string"
                ? rawMessage.content.slice(0, 1200)
                : "";
            if (!role || !content) return null;
            return {
              id:
                typeof rawMessage.id === "string" ? rawMessage.id : createId(),
              role,
              content,
              source:
                rawMessage.source === "static" ||
                rawMessage.source === "ai" ||
                rawMessage.source === "fallback"
                  ? rawMessage.source
                  : undefined,
            };
          })
          .filter((item): item is ChatMessage => Boolean(item))
          .slice(-MAX_STORED_MESSAGES);

        if (safeMessages.length) {
          setMessages(safeMessages);
        }
      }
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          open,
          suggestions,
          messages: messages.slice(-MAX_STORED_MESSAGES),
        }),
      );
    } catch {
      // Ignore storage failures; the chatbot should still work without memory.
    }
  }, [hydrated, messages, open, suggestions]);

  async function sendMessage(rawMessage: string) {
    const content = rawMessage.trim();
    if (!content || pending) return;
    const requestId = activeRequestRef.current + 1;
    activeRequestRef.current = requestId;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setPending(true);
    const startedAt = Date.now();

    try {
      const response = await fetch("/api/alice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          path: pathname,
          transcript,
        }),
      });

      const data = (await response.json()) as AliceApiResponse;
      const answer =
        data.answer ??
        "I could not answer that right now. Please try again or use the [Contact page](/contact).";

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_TYPING_MS) {
        await sleep(MIN_TYPING_MS - elapsed);
      }

      if (activeRequestRef.current !== requestId) return;

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: answer,
          source: data.source ?? "fallback",
        },
      ]);

      if (data.suggestions?.length) {
        setSuggestions(data.suggestions.slice(0, 3));
      }
    } catch {
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_TYPING_MS) {
        await sleep(MIN_TYPING_MS - elapsed);
      }

      if (activeRequestRef.current !== requestId) return;

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content:
            "I am temporarily unavailable. You can still reach Auto-margin on the [Contact page](/contact) or at to@auto-margin.com.",
          source: "fallback",
        },
      ]);
    } finally {
      if (activeRequestRef.current === requestId) {
        setPending(false);
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function minimizeChat() {
    setOpen(false);
  }

  function closeAndResetChat() {
    activeRequestRef.current += 1;
    setOpen(false);
    setInput("");
    setPending(false);
    setSuggestions(quickPrompts);
    setMessages([welcomeMessage]);
    window.sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-50 sm:right-5 sm:bottom-5",
        className,
      )}
    >
      {open ? (
        <section
          aria-label="Bot chatbot"
          className="border-border bg-background text-foreground flex h-[min(620px,calc(100vh-2rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border shadow-2xl sm:w-[390px]"
        >
          <header className="border-border flex items-center justify-between border-b px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-md">
                <Bot className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">Bot</h2>
                <p className="text-muted-foreground truncate text-xs">
                  Auto-margin assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={minimizeChat}
                aria-label="Minimize Bot"
              >
                <Minus className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={closeAndResetChat}
                aria-label="Close and reset Bot"
              >
                <X className="size-4" aria-hidden />
              </Button>
            </div>
          </header>

          <div
            ref={scrollAreaRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[86%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  <p>{renderTextWithLinks(message.content)}</p>
                  {message.role === "assistant" && message.source === "ai" ? (
                    <p className="mt-1 text-[11px] opacity-70">
                      Assistant response
                    </p>
                  ) : null}
                </div>
              </div>
            ))}

            {pending ? (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                  Bot is typing...
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-border border-t p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="border-border bg-background hover:bg-muted rounded-md border px-2.5 py-1.5 text-xs transition-colors"
                  onClick={() => void sendMessage(suggestion)}
                  disabled={pending}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-end gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Ask Bot..."
                className="max-h-28 min-h-11 resize-none text-sm"
                maxLength={600}
                disabled={pending}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || pending}
                aria-label="Send message"
              >
                <Send className="size-4" aria-hidden />
              </Button>
            </form>
          </div>
        </section>
      ) : (
        <Button
          type="button"
          size="lg"
          className="h-12 gap-2 rounded-full px-4 shadow-xl"
          onClick={() => setOpen(true)}
          aria-label="Open Bot chatbot"
        >
          <MessageCircle className="size-5" aria-hidden />
          <span>Ask</span>
        </Button>
      )}
    </div>
  );
}
