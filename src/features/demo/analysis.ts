import {
  buyingPrice,
  type DemoCarSummary,
  type DemoMarket,
  type DemoStageEvent,
  marketAverageComparable,
  marketCode,
  marketHoldingDays,
  marketIsEmpty,
  marketLink,
  marketMarginAmount,
  marketMarginPercent,
  marketName,
  marketPricePoints,
  marketSampleSize,
  marketSellingPriceB2B,
  marketSellingPriceB2C,
  marketSoldSample,
  toNumber,
} from "@/features/demo/contract";

export type DemoMarketView = {
  id: string;
  code: string;
  name: string;
  currency: string;
  holdingDays?: number;
  soldSample?: number;
  comparedCount?: number;
  compareLink?: string;
  marginPercent?: number;
  marginAmount?: number;
  pricePoints: number[];
  averageComparable?: number;
  sellingB2C?: number;
  sellingB2B?: number;
  isEmpty: boolean;
};

/**
 * How the headline verdict is derived. Thresholds are ours, not the pipeline's,
 * and are explained in the methodology line under the country rows.
 *
 * - profit  ≥ 5% after costs → green “Would make profit”
 * - thin    0–5%             → amber “Wouldn't buy”
 * - negative < 0             → red “Would lose money”
 */
export const VERDICT_THRESHOLDS = { profit: 5, thin: 0 } as const;

export type DemoVerdict = "profit" | "thin" | "negative" | "unknown";

export type DemoAnalysis = {
  car?: DemoCarSummary;
  cached: boolean;
  markets: DemoMarketView[];
  /** Market with the highest margin — the one the headline verdict describes. */
  best?: DemoMarketView;
  profitMin?: number;
  profitMax?: number;
  profitCurrency: string;
  buyingPrice?: number;
  /** Asking/purchase price before upstream's all-in cost model, when available. */
  askingPrice?: number;
  purchaseCurrency: string;
  verdict: DemoVerdict;
  /** False when every market came back without a single usable measurement. */
  hasMeasurements: boolean;
};

function toMarketView(market: DemoMarket, index: number): DemoMarketView {
  return {
    id: market.key ?? String(index),
    code: marketCode(market, index),
    name: marketName(market, index),
    currency: market.currency ?? "EUR",
    holdingDays: marketHoldingDays(market),
    soldSample: marketSoldSample(market),
    comparedCount: marketSampleSize(market),
    compareLink: marketLink(market),
    marginPercent: marketMarginPercent(market),
    marginAmount: marketMarginAmount(market),
    pricePoints: marketPricePoints(market),
    averageComparable: marketAverageComparable(market),
    sellingB2C: marketSellingPriceB2C(market),
    sellingB2B: marketSellingPriceB2B(market),
    isEmpty: marketIsEmpty(market),
  };
}

export function verdictFor(marginPercent?: number): DemoVerdict {
  if (marginPercent == null) return "unknown";
  if (marginPercent >= VERDICT_THRESHOLDS.profit) return "profit";
  if (marginPercent >= VERDICT_THRESHOLDS.thin) return "thin";
  return "negative";
}

export function buildAnalysis(event: DemoStageEvent): DemoAnalysis {
  const car =
    event.carSummary ?? (event.parsedCar as DemoCarSummary | undefined);
  const markets = (event.markets ?? []).map(toMarketView);

  let best: DemoMarketView | undefined;
  for (const market of markets) {
    if (market.marginPercent == null) continue;
    if (!best || market.marginPercent > (best.marginPercent ?? -Infinity)) {
      best = market;
    }
  }

  const purchaseCurrency = car?.currency ?? "EUR";
  const askingPrice = toNumber(car?.purchasePrice);
  const allIn = buyingPrice(car);

  return {
    car,
    cached: event.cached === true,
    markets,
    best,
    profitMin: toNumber(event.profitMin),
    profitMax: toNumber(event.profitMax),
    // The headline range is reported in the purchase currency.
    profitCurrency: purchaseCurrency,
    askingPrice,
    buyingPrice: allIn,
    purchaseCurrency,
    verdict: verdictFor(best?.marginPercent),
    hasMeasurements: markets.some((market) => !market.isEmpty),
  };
}
