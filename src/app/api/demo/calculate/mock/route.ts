import { invalidBodyResponse, parseDemoRequest } from "../_shared";

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
      {
        error: "Demo limit reached. Please try again later.",
        limitReached: true,
      },
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
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return invalidBodyResponse();
  }

  const parsed = parseDemoRequest(body);
  if (!parsed.ok) return parsed.response;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();

      controller.enqueue(
        encoder.encode(sse({ stage: "received", success: true })),
      );
      await sleep(450);
      controller.enqueue(
        encoder.encode(sse({ stage: "parsing", success: true })),
      );
      await sleep(650);
      controller.enqueue(
        encoder.encode(sse({ stage: "market_fetch", success: true })),
      );
      await sleep(850);
      controller.enqueue(
        encoder.encode(sse({ stage: "calculating", success: true })),
      );
      await sleep(700);

      controller.enqueue(
        encoder.encode(
          sse({
            stage: "complete",
            success: true,
            carInput: "BMW X5 2020 30d xDrive, 85,000 km, diesel, automatic",
            carSummary: {
              brand: "BMW",
              model: "X5",
              modelYear: "2020",
              fuelType: "Diesel",
              transmission: "Automatic",
              mileage: "85000",
              drive: "Automatic",
              sourceCountry: "Germany",
              targetCountry: "Germany",
              purchasePrice: "26890.76",
              currency: "EUR",
              includesVat: true,
              finalBuyingPrice: "29448.00",
              bodyType: "SUV",
            },
            parsedCar: {
              brand: "BMW",
              model: "X5",
              modelYear: "2020",
              mileage: "85000",
              purchasePrice: "26890.76",
              currency: "EUR",
            },
            // Markets are an ARRAY, and each entry carries a different set of
            // `fields`: mobile.de returns prices only, AutoScout24 also returns
            // the profit calculation. Mirror the real pipeline exactly — this
            // mock previously described a contract that did not exist, which is
            // why the result panel shipped unable to read a single field.
            markets: [
              {
                key: "de",
                label: "Germany (mobile.de)",
                currency: "EUR",
                fields: {
                  mobiledeSearchLink:
                    "https://suchen.mobile.de/fahrzeuge/search.html?s=Car",
                  mobiledePrice1: "33900",
                  mobiledePrice2: "35350",
                  mobiledePrice3: "35600",
                  mobiledeQoc: 2552,
                },
              },
              {
                key: "ch",
                label: "Switzerland (AutoScout24)",
                currency: "CHF",
                fields: {
                  generatedLink: "https://www.autoscout24.ch/de/s/mo-x5/mk-bmw",
                  minPrice1: "36800",
                  minPrice2: "37900",
                  minPrice3: "38500",
                  lowestPriceFromAutoscout: "37733",
                  qoc: 388,
                  profitMargin: "28.1%",
                  finalProfit1: "5952.00",
                  finalProfit2: "3552.00",
                  profit3Amount: "9052.00",
                  sellingPriceB2C: "35400.00",
                  sellingPriceB2B: "33000.00",
                },
              },
            ],
            profitMin: "3552",
            profitMax: "9052",
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
