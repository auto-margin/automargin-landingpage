"use client";

import { useCallback, useRef, useState } from "react";

import {
  cachedResultToEvent,
  type DemoStageEvent,
  parseSseDataLines,
} from "@/features/demo/contract";

export type DemoRunStatus = "idle" | "running" | "success" | "error";

export type DemoErrorKind =
  | "limit"
  | "network"
  | "noResult"
  | "parse"
  | "timeout"
  | "unavailable"
  | "upstream";

export type DemoRunState = {
  status: DemoRunStatus;
  /** Index into `RUN_STAGES`; drives the progress meter during a run. */
  stageIndex: number;
  stageKey: string;
  result: DemoStageEvent | null;
  errorKind: DemoErrorKind | null;
  /** `performance.now()` at submit — used for the elapsed-time readout. */
  startedAt: number | null;
};

/**
 * Stage order observed on a live run: started → normalizing → saving → links →
 * calculating → done, then the terminal `complete` event. Older builds emitted
 * `received` / `parsing` / `market_fetch`, so the matcher works on keywords and
 * never moves the meter backwards.
 */
export const RUN_STAGES = [
  "queued",
  "reading",
  "identifying",
  "searching",
  "comparing",
  "finishing",
] as const;

export type RunStage = (typeof RUN_STAGES)[number];

function stageIndexFor(stage?: string) {
  const value = (stage ?? "").toLowerCase();
  if (!value) return 0;
  if (value.includes("start") || value.includes("receiv")) return 0;
  if (value.includes("normaliz") || value.includes("pars")) return 1;
  if (value.includes("sav") || value.includes("extract")) return 2;
  if (value.includes("link") || value.includes("search")) return 3;
  if (
    value.includes("calcul") ||
    value.includes("market") ||
    value.includes("compar")
  )
    return 4;
  if (value.includes("done") || value.includes("complet")) return 5;
  return 1;
}

const IDLE_STATE: DemoRunState = {
  status: "idle",
  stageIndex: 0,
  stageKey: RUN_STAGES[0],
  result: null,
  errorKind: null,
  startedAt: null,
};

/**
 * Guards against a run that neither completes nor errors. The API route caps
 * itself at 180 s (upstream times out at ~3 min), so the client waits a little
 * longer before declaring a timeout of its own.
 */
const CLIENT_TIMEOUT_MS = 195_000;

/** How long each progress step holds on a cache hit, so the meter still feels live. */
const CACHED_STAGE_MS = 480;

function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = setTimeout(() => resolve(), ms);
    const onAbort = () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

export type DemoRunRequest = {
  carInput: string;
  sourceCountry: string;
};

/**
 * Read at submit time rather than through `useSearchParams`: that hook forces
 * the whole workspace behind a Suspense boundary that Next.js streams in late,
 * and the boundary then never hydrates — the form renders but nothing responds.
 * The mock switch is a development affordance, so reading `location` inside the
 * click handler is both sufficient and cheaper.
 */
export function getDemoEndpoint() {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return "/api/demo/calculate";
  }
  const mockMode = new URLSearchParams(window.location.search).get("mockDemo");
  if (!mockMode) return "/api/demo/calculate";
  const mode = mockMode === "1" ? "success" : mockMode;
  return `/api/demo/calculate/mock?mode=${encodeURIComponent(mode)}`;
}

export function useDemoRun() {
  const [state, setState] = useState<DemoRunState>(IDLE_STATE);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef = useRef(false);

  const cleanup = useCallback(() => {
    runningRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const finishWithError = useCallback(
    (errorKind: DemoErrorKind) => {
      cleanup();
      setState((prev) => ({ ...prev, status: "error", errorKind }));
    },
    [cleanup],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    cleanup();
    setState(IDLE_STATE);
  }, [cleanup]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    cleanup();
    setState(IDLE_STATE);
  }, [cleanup]);

  const run = useCallback(
    async ({ carInput, sourceCountry }: DemoRunRequest) => {
      // A second submit while one is in flight would burn the visitor's daily
      // quota on a duplicate of the run they are already watching.
      if (runningRef.current) return;
      runningRef.current = true;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({
        status: "running",
        stageIndex: 0,
        stageKey: RUN_STAGES[0],
        result: null,
        errorKind: null,
        startedAt:
          typeof performance !== "undefined" ? performance.now() : Date.now(),
      });

      timeoutRef.current = setTimeout(() => {
        if (!runningRef.current) return;
        controller.abort();
        finishWithError("timeout");
      }, CLIENT_TIMEOUT_MS);

      let response: Response;
      try {
        response = await fetch(getDemoEndpoint(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: carInput, sourceCountry }),
          signal: controller.signal,
        });
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        finishWithError("network");
        return;
      }

      const contentType = response.headers.get("content-type") ?? "";

      // Upstream drops honeypot hits with an empty 204; treat it as "no result"
      // rather than leaving the panel spinning forever.
      if (response.status === 204) {
        finishWithError("noResult");
        return;
      }

      if (contentType.includes("application/json")) {
        const json = (await response.json().catch(() => null)) as {
          limitReached?: boolean;
        } | null;

        // A run served from upstream's per-IP cache arrives as JSON rather than
        // a stream, flagged limitReached even though it carries the full
        // previous result. Walk the progress stages before revealing it so a
        // cache hit still feels like a real analysis.
        const cached = cachedResultToEvent(json);
        if (cached) {
          try {
            for (let i = 0; i < RUN_STAGES.length; i++) {
              if (controller.signal.aborted || !runningRef.current) return;
              setState((prev) =>
                prev.status !== "running"
                  ? prev
                  : {
                      ...prev,
                      stageIndex: i,
                      stageKey: RUN_STAGES[i],
                    },
              );
              await delay(CACHED_STAGE_MS, controller.signal);
            }
          } catch (error) {
            if ((error as Error)?.name === "AbortError") return;
            finishWithError("network");
            return;
          }

          if (controller.signal.aborted || !runningRef.current) return;
          cleanup();
          setState({
            status: "success",
            stageIndex: RUN_STAGES.length - 1,
            stageKey: RUN_STAGES[RUN_STAGES.length - 1],
            result: cached,
            errorKind: null,
            startedAt: null,
          });
          return;
        }

        // Never surface upstream's own copy to visitors: it is English-only and
        // advertises a signup flow that does not exist here.
        if (json?.limitReached === true || response.status === 429) {
          finishWithError("limit");
          return;
        }
        finishWithError(response.status >= 500 ? "unavailable" : "upstream");
        return;
      }

      if (!response.ok || !contentType.includes("text/event-stream")) {
        finishWithError(response.status >= 500 ? "unavailable" : "upstream");
        return;
      }

      if (!response.body) {
        finishWithError("noResult");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalEvent: DemoStageEvent | null = null;

      // Advances the progress meter and hands back the terminal frame, if any.
      const consume = (events: DemoStageEvent[]) => {
        let terminal: DemoStageEvent | null = null;
        for (const event of events) {
          if (event.stage === "complete" || event.stage === "error") {
            terminal = event;
            continue;
          }
          const nextIndex = stageIndexFor(event.stage);
          setState((prev) =>
            prev.status !== "running" || nextIndex <= prev.stageIndex
              ? prev
              : {
                  ...prev,
                  stageIndex: nextIndex,
                  stageKey: RUN_STAGES[nextIndex],
                },
          );
        }
        return terminal;
      };

      try {
        while (!finalEvent) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split(/\n\n/);
          buffer = frames.pop() ?? "";
          for (const frame of frames) {
            finalEvent = consume(parseSseDataLines(frame)) ?? finalEvent;
          }
        }
        if (!finalEvent && buffer.trim()) {
          finalEvent = consume(parseSseDataLines(buffer));
        }
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        finishWithError("network");
        return;
      } finally {
        // The pipeline keeps the connection open after the terminal frame.
        controller.abort();
      }

      cleanup();

      const terminal: DemoStageEvent | null = finalEvent;

      if (!terminal) {
        setState((prev) => ({
          ...prev,
          status: "error",
          errorKind: "noResult",
        }));
        return;
      }

      if (terminal.stage === "error" || terminal.success === false) {
        const errorKind: DemoErrorKind = terminal.timeout
          ? "timeout"
          : terminal.limitReached
            ? "limit"
            : "parse";
        setState((prev) => ({ ...prev, status: "error", errorKind }));
        return;
      }

      setState({
        status: "success",
        stageIndex: RUN_STAGES.length - 1,
        stageKey: RUN_STAGES[RUN_STAGES.length - 1],
        result: terminal,
        errorKind: null,
        startedAt: null,
      });
    },
    [cleanup, finishWithError],
  );

  return { state, run, cancel, reset };
}
