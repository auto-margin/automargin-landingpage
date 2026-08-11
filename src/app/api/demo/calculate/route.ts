import { invalidBodyResponse, parseDemoRequest } from "./_shared";

import { checkDemoLimit } from "@/lib/rate-limit";
import { getClientIp, getRequestIdentity } from "@/lib/request-identity";

export const runtime = "nodejs";
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
  } catch {
    // Fail-open in development so UI testing never gets blocked.
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        {
          error: "Demo is temporarily unavailable. Please try again shortly.",
        },
        { status: 503 },
      );
    }
  }

  const upstream = process.env.LANDING_DEMO_CALCULATE_URL;
  if (!upstream) {
    return Response.json(
      { error: "Demo is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

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

  // Rate limit is documented as JSON 429.
  if (
    upstreamResponse.status === 429 &&
    contentType.includes("application/json")
  ) {
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

  // Pass through any non-stream errors as JSON/text.
  if (!upstreamResponse.ok || !contentType.includes("text/event-stream")) {
    const text = await upstreamResponse.text().catch(() => "");
    return new Response(text || "Unable to run demo right now.", {
      status: upstreamResponse.status || 500,
      headers: {
        "Content-Type": contentType || "text/plain; charset=utf-8",
      },
    });
  }

  // Stream SSE through to the client.
  return new Response(upstreamResponse.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
