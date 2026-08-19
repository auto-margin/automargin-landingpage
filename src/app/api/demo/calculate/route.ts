import { invalidBodyResponse, parseDemoRequest } from "./_shared";

import { checkDemoLimit } from "@/lib/rate-limit";
import { getClientIp, getRequestIdentity } from "@/lib/request-identity";

export const runtime = "nodejs";

// Development only: dump what the upstream pipeline actually returns. The
// result panel was once built against the mock's invented contract and shipped
// unable to read a single field, so keep this available for contract drift.
const DEBUG_UPSTREAM = process.env.NODE_ENV !== "production";

// Production keeps the 1-run-per-IP-per-24h demo limit; development does not.
const ENFORCE_DEMO_LIMIT = process.env.NODE_ENV === "production";

function hasCachedResult(body: string) {
  try {
    const parsed = JSON.parse(body) as { resultData?: { markets?: unknown } };
    return Array.isArray(parsed?.resultData?.markets);
  } catch {
    return false;
  }
}

function logUpstream(label: string, payload: string) {
  if (!DEBUG_UPSTREAM) return;
  // eslint-disable-next-line no-console
  console.log(`[demo/upstream] ${label}: ${payload}`);
}

/**
 * Passes every byte straight through while inspecting the SSE frames, so the
 * response keeps streaming (the pipeline runs for up to ~3 minutes and must not
 * be buffered).
 */
function teeUpstreamForDebug(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = "";

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        controller.enqueue(chunk);

        buffer += decoder.decode(chunk, { stream: true });
        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";

        for (const frame of frames) {
          for (const line of frame.split("\n")) {
            if (!line.startsWith("data:")) continue;
            const raw = line.slice(5).trim();
            if (!raw) continue;
            if (raw.includes('"complete"') || raw.includes('"error"')) {
              logUpstream("terminal event", raw);
            } else {
              logUpstream("stage", raw);
            }
          }
        }
      },
    }),
  );
}
// Upstream pipeline can take up to ~3 minutes; keep the function alive for the full run.
export const maxDuration = 180;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidBodyResponse();
  }

  const parsed = parseDemoRequest(body);
  if (!parsed.ok) return parsed.response;
  const { input, sourceCountry } = parsed;

  // The 1-run-per-24h limit makes the demo untestable locally, so it is only
  // enforced in production. Upstream applies its own per-IP limit regardless,
  // so this does not hand out unlimited real pipeline runs.
  if (ENFORCE_DEMO_LIMIT) {
    try {
      const identity = await getRequestIdentity();
      const rateLimit = await checkDemoLimit(identity);
      if (!rateLimit.ok) {
        return Response.json(
          {
            error: "Demo limit reached. Please try again within 24 hours.",
            limitReached: true,
          },
          { status: 429 },
        );
      }
    } catch (err) {
      // Never let production run unprotected if the limiter is unreachable.
      // eslint-disable-next-line no-console
      console.error("[demo/calculate] rate-limit check failed:", err);
      return Response.json(
        {
          error: "Demo is temporarily unavailable. Please try again shortly.",
        },
        { status: 503 },
      );
    }
  }

  const upstream =
    process.env.LANDING_DEMO_CALCULATE_URL ??
    "https://you.auto-margin.com/api/landing/calculate-profit";

  const clientIp = await getClientIp();

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(upstream, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...(clientIp !== "unknown" ? { "X-Forwarded-For": clientIp } : {}),
      },
      body: JSON.stringify({
        carInput: input,
        sourceCountry,
        website: "",
      }),
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { error: "Demo service is unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  // Honeypot trip on the upstream side: silently drop, matching upstream's 204.
  if (upstreamResponse.status === 204) {
    return new Response(null, { status: 204 });
  }

  const contentType = upstreamResponse.headers.get("content-type") ?? "";

  // A repeat run inside upstream's cache window is not a stream. It is
  // documented as a 429 carrying the previous result, but is actually served as
  // a 200 with `cached: true`. Either way, forward the cached payload so the
  // visitor sees their result; only fall back to the limit copy when there is
  // no result to show.
  if (contentType.includes("application/json")) {
    const text = await upstreamResponse.text().catch(() => "");
    logUpstream(`json ${upstreamResponse.status}`, text);

    if (hasCachedResult(text)) {
      return new Response(text, {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    if (upstreamResponse.status === 429) {
      // Don't leak upstream copy — keep demo policy consistent on the landing page.
      return Response.json(
        {
          error: "Demo limit reached. Please try again within 24 hours.",
          message: "Demo limit reached. One demo run per IP / 24 hours.",
          limitReached: true,
        },
        { status: 429 },
      );
    }

    return new Response(text || "Unable to run demo right now.", {
      status: upstreamResponse.ok ? 502 : upstreamResponse.status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  // Pass through any non-stream errors as JSON/text.
  if (!upstreamResponse.ok || !contentType.includes("text/event-stream")) {
    const text = await upstreamResponse.text().catch(() => "");
    logUpstream(`non-stream ${upstreamResponse.status} (${contentType})`, text);
    return new Response(text || "Unable to run demo right now.", {
      status: upstreamResponse.status || 500,
      headers: {
        "Content-Type": contentType || "text/plain; charset=utf-8",
      },
    });
  }

  // Stream SSE through to the client.
  const outgoing =
    DEBUG_UPSTREAM && upstreamResponse.body
      ? teeUpstreamForDebug(upstreamResponse.body)
      : upstreamResponse.body;

  return new Response(outgoing, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
