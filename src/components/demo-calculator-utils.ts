/**
 * Shape of the upstream landing pipeline's `complete` event. Every market
 * carries a different set of `fields` (mobile.de exposes prices only, while
 * AutoScout24 also returns the full profit calculation), so nothing below the
 * `fields` boundary can be typed as a fixed record — read it through the
 * accessors in this file rather than by hand.
 */
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
  fuelType?: string;
  transmission?: string;
  mileage?: string;
  drive?: string;
  bodyType?: string;
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

// Each list is ordered most-specific first and spans the known market shapes.
const SAMPLE_SIZE_KEYS = ["qoc", "mobiledeQoc"] as const;
const LINK_KEYS = ["generatedLink", "mobiledeSearchLink"] as const;
const MARGIN_KEYS = ["profitMargin", "tcRelProfitAfterAllCosts"] as const;
const PRICE_KEY_SETS = [
  ["minPrice1", "minPrice2", "minPrice3"],
  ["mobiledePrice1", "mobiledePrice2", "mobiledePrice3"],
] as const;

export function marketSampleSize(market: DemoMarket) {
  return toNumber(pickField(market, SAMPLE_SIZE_KEYS));
}

export function marketLink(market: DemoMarket) {
  const link = pickField(market, LINK_KEYS);
  return typeof link === "string" ? link : undefined;
}

export function marketMargin(market: DemoMarket) {
  const margin = pickField(market, MARGIN_KEYS);
  return typeof margin === "string" ? margin : undefined;
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

export function marketName(market: DemoMarket, index: number) {
  return market.label ?? market.key?.toUpperCase() ?? `Market ${index + 1}`;
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

export const DEMO_CAR_EXAMPLE =
  "BMW X5 2020 30d xDrive, 85,000 km, diesel, automatic, asking price 32,000 EUR";

export const recommendedFieldKeys = ["0", "1", "2", "3", "4"] as const;

const BRAND_TOKENS = [
  "audi",
  "bmw",
  "citroën",
  "citroen",
  "cupra",
  "dacia",
  "fiat",
  "ford",
  "honda",
  "hyundai",
  "jaguar",
  "jeep",
  "kia",
  "land rover",
  "lexus",
  "mazda",
  "mercedes",
  "mercedes-benz",
  "mini",
  "mitsubishi",
  "nissan",
  "opel",
  "peugeot",
  "porsche",
  "renault",
  "seat",
  "skoda",
  "škoda",
  "subaru",
  "suzuki",
  "tesla",
  "toyota",
  "volkswagen",
  "vw",
  "volvo",
] as const;

export function includesBrandToken(text: string) {
  const t = text.toLowerCase();
  return BRAND_TOKENS.some((b) => t.includes(b));
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
      // ignore invalid JSON events
    }
  }
  return events;
}

export function formatMoney(value?: number | string | null, currency?: string) {
  const amount = toNumber(value);
  if (amount == null) return "—";
  const cur = currency || "EUR";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toFixed(0)} ${cur}`;
  }
}

export function toneForSignal(signal?: string) {
  const s = (signal ?? "").toUpperCase();
  if (s === "MUSTHAVE" || s === "YES") {
    return "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300";
  }
  if (s === "MAYBE") {
    return "bg-amber-500/12 text-amber-700 ring-amber-500/20 dark:text-amber-300";
  }
  if (s === "NO") {
    return "bg-rose-500/12 text-rose-700 ring-rose-500/20 dark:text-rose-300";
  }
  return "bg-muted/40 text-muted-foreground ring-border";
}

export function signalLabel(signal?: string) {
  const s = (signal ?? "").toUpperCase();
  if (s === "MUSTHAVE" || s === "YES") return "YES";
  if (s === "NO") return "NO";
  if (s === "MAYBE") return "MAYBE";
  return "—";
}

export function getUrlLabel(raw: string) {
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname.length > 1 ? u.pathname : "";
    return { host, path, ok: true as const };
  } catch {
    return { host: raw, path: "", ok: false as const };
  }
}
