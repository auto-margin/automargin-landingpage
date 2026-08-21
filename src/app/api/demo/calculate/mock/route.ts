import { invalidBodyResponse, parseDemoRequest } from "../_shared";

export const runtime = "nodejs";

/**
 * Development-only fixture for the landing demo.
 *
 * Every payload below mirrors the real contract exactly — field names, string
 * numbers, percent suffixes, absent-means-unmeasured — so the UI can be driven
 * through all of its states without spending the visitor's 3-runs-per-day quota
 * on the live pipeline. The numbers themselves are invented.
 *
 * Drive it from the page with `/demo?mockDemo=<mode>`.
 */
const MODES = [
  "success",
  "negative",
  "partial",
  "empty",
  "slow",
  "error",
  "timeout",
  "rateLimit",
  "cached",
  "unavailable",
  "truncated",
] as const;

type Mode = (typeof MODES)[number];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sse(data: unknown) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

const CAR_SUMMARY = {
  brand: "Volkswagen",
  model: "Tiguan R-Line",
  modelYear: "2022-03-01",
  engine: "147 kW",
  power: "147 kW",
  fuelType: "Diesel",
  transmission: "Automatic",
  mileage: "46800",
  drive: "Automatic",
  sourceCountry: "Germany",
  targetCountry: "Germany",
  purchasePrice: "31900",
  currency: "EUR",
  includesVat: true,
  finalBuyingPrice: "34496.00",
  bodyType: "SUV",
};

const DE_MARKET = {
  key: "de",
  label: "Germany (mobile.de)",
  currency: "EUR",
  fields: {
    mobiledeSearchLink:
      "https://suchen.mobile.de/fahrzeuge/search.html?isSearchRequest=true&s=Car",
    avgDaysToSellDe: 26,
    avgDaysToSellDeSoldN: 9109,
    mobiledePrice1: "35999",
    mobiledePrice2: "36990",
    mobiledePrice3: "37495",
    mobiledeQoc: 185,
    profit1MobiledePercent: "9.4",
  },
};

const CH_MARKET = {
  key: "ch",
  label: "Switzerland (AutoScout24)",
  currency: "CHF",
  fields: {
    generatedLink: "https://www.autoscout24.ch/de/s/mo-tiguan/mk-vw",
    minPrice1: "41890",
    minPrice2: "42490",
    minPrice3: "43950",
    lowestPriceFromAutoscout: "42776",
    qoc: 73,
    avgDaysToSellCh: 48,
    avgDaysToSellChSoldN: 96,
    sellingPriceB2C: "44400.00",
    sellingPriceB2B: "41700.00",
    profit1Amount: "4210.00",
    profit1Percent: "11.4",
    tcRelProfitAfterAllCosts: "10.8%",
  },
};

function successPayload(mode: Mode) {
  if (mode === "negative") {
    return {
      stage: "complete",
      success: true,
      carInput: "VW Tiguan R-Line 2022, 46800 km, Diesel, Automatic",
      carSummary: CAR_SUMMARY,
      markets: [
        {
          ...DE_MARKET,
          fields: { ...DE_MARKET.fields, profit1MobiledePercent: "-4.1" },
        },
        {
          ...CH_MARKET,
          fields: {
            ...CH_MARKET.fields,
            minPrice1: "28890",
            minPrice2: "29490",
            minPrice3: "29950",
            lowestPriceFromAutoscout: "29443",
            profit1Amount: "-5606.00",
            profit1Percent: "-16.3",
            tcRelProfitAfterAllCosts: "-14.6%",
          },
        },
      ],
      profitMin: "-5606",
      profitMax: "1240",
    };
  }

  if (mode === "partial") {
    // Every optional measurement absent: the UI must render dashes, never 0.
    return {
      stage: "complete",
      success: true,
      carSummary: {
        brand: "Volkswagen",
        model: "Tiguan R-Line",
        purchasePrice: "31900",
        currency: "EUR",
      },
      markets: [
        {
          key: "de",
          label: "Germany (mobile.de)",
          currency: "EUR",
          fields: {
            mobiledeSearchLink:
              "https://suchen.mobile.de/fahrzeuge/search.html?isSearchRequest=true&s=Car",
            mobiledePrice1: "35999",
            mobiledeQoc: 12,
          },
        },
        {
          key: "ch",
          label: "Switzerland (AutoScout24)",
          currency: "CHF",
          fields: {
            generatedLink: "https://www.autoscout24.ch/de/s/mo-tiguan/mk-vw",
            qoc: 4,
          },
        },
      ],
      profitMax: "1500",
    };
  }

  if (mode === "empty") {
    return {
      stage: "complete",
      success: true,
      carSummary: CAR_SUMMARY,
      markets: [
        {
          key: "de",
          label: "Germany (mobile.de)",
          currency: "EUR",
          fields: {},
        },
        {
          key: "ch",
          label: "Switzerland (AutoScout24)",
          currency: "CHF",
          fields: {},
        },
      ],
    };
  }

  return {
    stage: "complete",
    success: true,
    carInput: "VW Tiguan R-Line 2022, 46800 km, Diesel, Automatic",
    carSummary: CAR_SUMMARY,
    parsedCar: {
      brand: "Volkswagen",
      model: "Tiguan R-Line",
      modelYear: "2022-03-01",
      mileage: "46800",
      purchasePrice: "31900",
      currency: "EUR",
    },
    markets: [DE_MARKET, CH_MARKET],
    profitMin: "1240",
    profitMax: "4210",
  };
}

export async function POST(request: Request) {
  // The fixture never ships as a usable endpoint.
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const requested = url.searchParams.get("mode") ?? "success";
  const mode: Mode = (MODES as readonly string[]).includes(requested)
    ? (requested as Mode)
    : "success";

  if (mode === "rateLimit") {
    return Response.json(
      { success: false, code: "limit", limitReached: true },
      { status: 429 },
    );
  }

  if (mode === "unavailable") {
    return Response.json({ success: false, code: "upstream" }, { status: 503 });
  }

  if (mode === "cached") {
    return Response.json(
      {
        cached: true,
        limitReached: true,
        resultData: successPayload("success"),
      },
      { status: 200 },
    );
  }

  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return invalidBodyResponse();
  }

  const parsed = parseDemoRequest(body);
  if (!parsed.ok) return parsed.response;

  const step = mode === "slow" ? 9_000 : 600;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (data: unknown) =>
        controller.enqueue(encoder.encode(sse(data)));

      send({ stage: "started", message: "Starting analysis..." });
      await sleep(step);
      send({
        stage: "normalizing",
        message: "Analyzing your car description...",
      });
      await sleep(step);
      send({ stage: "saving", message: "Found: Volkswagen Tiguan R-Line" });
      await sleep(step);

      // Closes without a terminal frame — exercises the "no result" state.
      if (mode === "truncated") {
        controller.close();
        return;
      }

      send({
        stage: "links",
        message: "Generating search links for DE + CH...",
      });
      await sleep(step);

      if (mode === "error") {
        send({
          stage: "error",
          success: false,
          error: "Could not extract car data from the description",
          markets: [],
        });
        controller.close();
        return;
      }

      if (mode === "timeout") {
        send({
          stage: "error",
          success: false,
          timeout: true,
          error: "Analysis timed out",
        });
        controller.close();
        return;
      }

      send({ stage: "calculating", message: "Reading per-market results..." });
      await sleep(step);
      send({ stage: "done", message: "Analysis complete!" });
      send(successPayload(mode));
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
