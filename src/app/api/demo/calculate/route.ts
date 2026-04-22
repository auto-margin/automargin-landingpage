export const runtime = "nodejs";

type DemoRequest = {
  input: string;
  sourceCountry: string;
};

export async function POST(request: Request) {
  let body: DemoRequest;
  try {
    body = (await request.json()) as DemoRequest;
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const input = typeof body?.input === "string" ? body.input.trim() : "";
  const sourceCountry =
    typeof body?.sourceCountry === "string" ? body.sourceCountry.trim() : "";

  if (!input || input.length < 10) {
    return Response.json(
      { success: false, message: "Please enter a longer car description." },
      { status: 400 },
    );
  }

  if (!sourceCountry) {
    return Response.json(
      { success: false, message: "Please select a source country." },
      { status: 400 },
    );
  }

  const upstream =
    process.env.LANDING_DEMO_CALCULATE_URL ??
    "https://test.auto-margin.com/api/landing/demo/calculate";

  const upstreamResponse = await fetch(upstream, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ input, sourceCountry }),
    cache: "no-store",
  });

  const contentType = upstreamResponse.headers.get("content-type") ?? "";

  // Rate limit is documented as JSON 429.
  if (upstreamResponse.status === 429 && contentType.includes("application/json")) {
    const json = await upstreamResponse.json().catch(() => null);
    return Response.json(json ?? { success: false, message: "Rate limit reached." }, {
      status: 429,
    });
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

