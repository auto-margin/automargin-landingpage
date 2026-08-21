/**
 * Typed view over the landing demo pipeline
 * (`POST /api/landing/calculate-profit`, SSE).
 *
 * Source of truth: "For Kim — Landing demo API contract (payload + response),
 * 20.08.md", verified against a live run on 2026-08-20.
 *
 * Two things make this layer necessary:
 *
 * 1. Every market in `markets[]` names the same measurement differently —
 *    Switzerland reports `qoc` / `generatedLink` / `profit1Percent`, Germany
 *    reports `mobiledeQoc` / `mobiledeSearchLink` / `profit1MobiledePercent` —
 *    so nothing below the `fields` boundary can be typed as a fixed record.
 * 2. "A field that could not be measured is simply absent — render a dash,
 *    never 0." Every accessor therefore returns `undefined`, never a zero.
 */

/** Source markets the upstream service accepts (uppercase only). */
export const UPSTREAM_SOURCE_COUNTRIES = [
  "DE",
  "SE",
  "NL",
  "IT",
  "FR",
  "AT",
  "BE",
  "ES",
] as const;

export type UpstreamSourceCountry = (typeof UPSTREAM_SOURCE_COUNTRIES)[number];

export function isUpstreamSourceCountry(
  value: string,
): value is UpstreamSourceCountry {
  return (UPSTREAM_SOURCE_COUNTRIES as readonly string[]).includes(value);
}

export type DemoMarketFields = Record<string, string | number | boolean | null>;

export type DemoMarket = {
  key?: string;
  label?: string;
  currency?: string;
  fields?: DemoMarketFields;
};

export type DemoCarSummary = {
  brand?: string;
  model?: string;
  modelYear?: string;
  engine?: string;
  power?: string;
  fuelType?: string;
  transmission?: string;
  drive?: string;
  bodyType?: string;
  mileage?: string;
  sourceCountry?: string;
  targetCountry?: string;
  purchasePrice?: string;
  currency?: string;
  includesVat?: boolean;
  finalBuyingPrice?: string;
};

export type DemoStageEvent = {
  stage?: string;
  success?: boolean;
  /** Set locally when the result came from upstream's per-IP cache. */
  cached?: boolean;
  message?: string;
  error?: string;
  limitReached?: boolean;
  timeout?: boolean;
  carInput?: string;
  carSummary?: DemoCarSummary;
  parsedCar?: Partial<DemoCarSummary>;
  markets?: DemoMarket[];
  profitMin?: string;
  profitMax?: string;
};

/** Upstream sends every number as a string, and percentages carry a "%". */
export function toNumber(value?: string | number | boolean | null) {
  if (typeof value === "number")
    return Number.isFinite(value) ? value : undefined;
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[%\s]/g, "").replace(/,/g, "");
  if (!cleaned) return undefined;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function pickField(market: DemoMarket | undefined, keys: readonly string[]) {
  const fields = market?.fields;
  if (!fields) return undefined;
  for (const key of keys) {
    const value = fields[key];
    if (value != null && value !== "") return value;
  }
  return undefined;
}

function pickFieldByPattern(market: DemoMarket | undefined, pattern: RegExp) {
  const fields = market?.fields;
  if (!fields) return undefined;
  for (const [key, value] of Object.entries(fields)) {
    if (!pattern.test(key)) continue;
    if (value != null && value !== "") return value;
  }
  return undefined;
}

/*
 * Key lists are ordered most-specific first and span the known market shapes.
 * The `*_PATTERN` fallbacks catch a market we have not seen yet: the
 * days-to-sell fields carry the market code as a suffix (`avgDaysToSellCh`,
 * `avgDaysToSellDe`, and the matching `…SoldN` sample sizes).
 */
const SAMPLE_SIZE_KEYS = ["qoc", "mobiledeQoc"] as const;
const LINK_KEYS = ["generatedLink", "mobiledeSearchLink"] as const;
const HOLDING_DAYS_KEYS = ["avgDaysToSellCh", "avgDaysToSellDe"] as const;
const HOLDING_DAYS_PATTERN = /^avgDaysToSell(?!.*SoldN$)[A-Za-z]+$/;
const SOLD_SAMPLE_KEYS = [
  "avgDaysToSellChSoldN",
  "avgDaysToSellDeSoldN",
] as const;
const SOLD_SAMPLE_PATTERN = /^avgDaysToSell[A-Za-z]+SoldN$/;
/*
 * All four are "profit after all costs" measures. The contract names the first
 * two as the demo's margin field; the other two are aliases observed on live
 * runs and are only read when the primary field is absent.
 */
const MARGIN_PERCENT_KEYS = [
  "profit1Percent",
  "profit1MobiledePercent",
  "profitMargin",
  "tcRelProfitAfterAllCosts",
] as const;
const MARGIN_AMOUNT_KEYS = [
  "profit1Amount",
  "tcAbsProfitAfterAllCosts",
] as const;
const AVERAGE_COMPARABLE_KEYS = [
  "lowestPriceFromAutoscout",
  "lowestPriceTargetCountry",
] as const;
const SELLING_B2C_KEYS = ["sellingPriceB2C"] as const;
const SELLING_B2B_KEYS = ["sellingPriceB2B"] as const;
const PRICE_KEY_SETS = [
  ["minPrice1", "minPrice2", "minPrice3"],
  ["mobiledePrice1", "mobiledePrice2", "mobiledePrice3"],
] as const;

/** How many comparable cars the market search found (`qoc`). */
export function marketSampleSize(market: DemoMarket) {
  return toNumber(pickField(market, SAMPLE_SIZE_KEYS));
}

/** Deep link to the marketplace search behind the comparison. */
export function marketLink(market: DemoMarket) {
  const link = pickField(market, LINK_KEYS);
  return typeof link === "string" && /^https?:\/\//i.test(link)
    ? link
    : undefined;
}

/** Median days-to-sell for this car's segment in that market. */
export function marketHoldingDays(market: DemoMarket) {
  return toNumber(
    pickField(market, HOLDING_DAYS_KEYS) ??
      pickFieldByPattern(market, HOLDING_DAYS_PATTERN),
  );
}

/** Confirmed sales in the sample behind the median (90-day window on CH). */
export function marketSoldSample(market: DemoMarket) {
  return toNumber(
    pickField(market, SOLD_SAMPLE_KEYS) ??
      pickFieldByPattern(market, SOLD_SAMPLE_PATTERN),
  );
}

/** Margin against the cheapest comparable, after all costs, in percent. */
export function marketMarginPercent(market: DemoMarket) {
  return toNumber(pickField(market, MARGIN_PERCENT_KEYS));
}

/** The same margin as an absolute amount in the market's currency. */
export function marketMarginAmount(market: DemoMarket) {
  return toNumber(pickField(market, MARGIN_AMOUNT_KEYS));
}

export function marketSellingPriceB2C(market: DemoMarket) {
  return toNumber(pickField(market, SELLING_B2C_KEYS));
}

export function marketSellingPriceB2B(market: DemoMarket) {
  return toNumber(pickField(market, SELLING_B2B_KEYS));
}

/** Ascending comparison price points, whichever naming the market uses. */
export function marketPricePoints(market: DemoMarket) {
  for (const keys of PRICE_KEY_SETS) {
    const points = keys
      .map((key) => toNumber(market.fields?.[key]))
      .filter((value): value is number => value != null);
    if (points.length) return points;
  }
  return [];
}

/**
 * Average of the comparable asking prices. Upstream returns it directly; when it
 * does not, derive it from the price points rather than dropping the reference.
 */
export function marketAverageComparable(market: DemoMarket) {
  const reported = toNumber(pickField(market, AVERAGE_COMPARABLE_KEYS));
  if (reported != null) return reported;
  const points = marketPricePoints(market);
  if (points.length < 2) return undefined;
  return points.reduce((sum, value) => sum + value, 0) / points.length;
}

export function marketName(market: DemoMarket, index: number) {
  return market.label ?? market.key?.toUpperCase() ?? `Market ${index + 1}`;
}

export function marketCode(market: DemoMarket, index: number) {
  return (market.key ?? String(index + 1)).toUpperCase();
}

/** True when the market carried no measurement we can present. */
export function marketIsEmpty(market: DemoMarket) {
  return (
    marketPricePoints(market).length === 0 &&
    marketSampleSize(market) == null &&
    marketMarginPercent(market) == null &&
    marketHoldingDays(market) == null
  );
}

/** The all-in buying price (purchase price plus upstream's cost model). */
export function buyingPrice(car?: DemoCarSummary) {
  return toNumber(car?.finalBuyingPrice) ?? toNumber(car?.purchasePrice);
}

/**
 * A repeat run inside upstream's per-IP cache window does not stream. It answers
 * with JSON carrying the previous run under `resultData` — documented as a 429,
 * but observed in practice as a 200 with `cached: true`. Normalise either into
 * the same `complete` event the stream produces, so a cached run renders as a
 * result instead of surfacing raw JSON in the error box.
 */
export function cachedResultToEvent(payload: unknown): DemoStageEvent | null {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;
  const data = root.resultData;
  if (!data || typeof data !== "object") return null;

  const result = data as Record<string, unknown>;
  const markets = result.markets;
  if (!Array.isArray(markets)) return null;

  return {
    stage: "complete",
    success: true,
    cached: true,
    carInput: result.carInput as string | undefined,
    carSummary: result.carSummary as DemoStageEvent["carSummary"],
    parsedCar: result.parsedCar as DemoStageEvent["parsedCar"],
    markets: markets as DemoStageEvent["markets"],
    profitMin: (result.profitMin ?? root.profitMin) as string | undefined,
    profitMax: (result.profitMax ?? root.profitMax) as string | undefined,
  };
}

export function parseSseDataLines(chunk: string) {
  const events: DemoStageEvent[] = [];
  const lines = chunk.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.replace(/^data:\s?/, "");
    if (!payload || payload === "[DONE]") continue;
    try {
      events.push(JSON.parse(payload) as DemoStageEvent);
    } catch {
      // A partial or malformed frame is not worth failing the whole run over.
    }
  }
  return events;
}
