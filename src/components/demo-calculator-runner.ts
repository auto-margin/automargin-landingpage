"use client";

import { parseSseDataLines, type DemoStageEvent } from "@/components/demo-calculator-utils";

export function getDemoEndpoint(searchParams: URLSearchParams) {
  const mockMode = searchParams.get("mockDemo");
  const useMock = mockMode && process.env.NODE_ENV !== "production";
  return useMock
    ? `/api/demo/calculate/mock?mode=${encodeURIComponent(
        mockMode === "1" ? "success" : mockMode,
      )}`
    : "/api/demo/calculate";
}

export async function streamDemoEvents(res: Response, onEvents: (events: DemoStageEvent[]) => void) {
  const contentType = res.headers.get("content-type") ?? "";
  if (!res.ok || !contentType.includes("text/event-stream") || !res.body) {
    const text = await res.text().catch(() => "");
    return { ok: false as const, errorText: text || null, isJson: false as const };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split(/\n\n/);
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      const next = parseSseDataLines(part);
      if (next.length) onEvents(next);
    }
  }

  return { ok: true as const };
}

