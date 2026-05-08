export type DemoStageEvent = {
  stage?: string;
  success?: boolean;
  message?: string;
  error?: string;
  limitReached?: boolean;
  recommendation?: {
    signal?: "MUSTHAVE" | "YES" | "MAYBE" | "NO" | string;
    text?: string;
    bestMarket?: string;
  };
  markets?: Record<
    string,
    {
      targetPrice?: number;
      currency?: string;
      profit?: number;
      profitPct?: number;
      signal?: string;
      listings?: {
        min?: number;
        median?: number;
        max?: number;
        sampleSize?: number;
      };
    }
  >;
  sources?: Record<string, string>;
  car?: {
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    fuelType?: string;
  };
  sourcePriceEur?: number;
  savedCarId?: number;
};

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

export function formatMoney(value?: number, currency?: string) {
  if (value == null || Number.isNaN(value)) return "—";
  const cur = currency || "EUR";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toFixed(0)} ${cur}`;
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

