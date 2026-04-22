export const runtime = "nodejs";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sse(data: unknown) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") ?? "success";

  if (mode === "rateLimit") {
    return Response.json(
      { error: "Demo limit reached. Please try again later.", limitReached: true },
      { status: 429 },
    );
  }

  if (mode === "error") {
    return new Response("Upstream demo service unavailable.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Basic validation to exercise UI errors.
  let body: any = null;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const input = typeof body?.input === "string" ? body.input.trim() : "";
  const sourceCountry = typeof body?.sourceCountry === "string" ? body.sourceCountry.trim() : "";
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

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();

      controller.enqueue(encoder.encode(sse({ stage: "received", success: true })));
      await sleep(450);
      controller.enqueue(encoder.encode(sse({ stage: "parsing", success: true })));
      await sleep(650);
      controller.enqueue(encoder.encode(sse({ stage: "market_fetch", success: true })));
      await sleep(850);
      controller.enqueue(encoder.encode(sse({ stage: "calculating", success: true })));
      await sleep(700);

      controller.enqueue(
        encoder.encode(
          sse({
            stage: "complete",
            success: true,
            savedCarId: 15,
            car: {
              brand: "BMW",
              model: "320d",
              year: 2021,
              mileage: 45000,
              fuelType: "Diesel",
            },
            sourcePriceEur: 28000,
            eurToChfRate: 0.924,
            markets: {
              CH: {
                targetPrice: 37900,
                currency: "CHF",
                profit: 6524,
                profitPct: 17.2,
                signal: "YES",
                listings: { min: 28500, median: 37900, max: 49900, sampleSize: 20 },
              },
              DE: {
                targetPrice: 26500,
                currency: "EUR",
                profit: -1500,
                profitPct: -5.4,
                signal: "NO",
                listings: { min: 24000, median: 26500, max: 29900, sampleSize: 18 },
              },
              BE: {
                targetPrice: 24000,
                currency: "EUR",
                profit: -4000,
                profitPct: -14.3,
                signal: "NO",
                listings: { min: 22000, median: 24000, max: 27500, sampleSize: 14 },
              },
            },
            recommendation: {
              signal: "YES",
              text: "Good deal for CH based on current comps and margin band.",
              bestMarket: "CH",
            },
            sources: {
              CH: "https://www.autoscout24.ch/lst/bmw/320d",
              DE: "https://www.autoscout24.de/lst/bmw/320d",
              BE: "https://www.autoscout24.be/lst/bmw/320d",
            },
          }),
        ),
      );

      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

