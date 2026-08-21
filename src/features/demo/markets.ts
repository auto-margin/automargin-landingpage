import type { UpstreamSourceCountry } from "@/features/demo/contract";

/**
 * Purchase markets the demo runs against.
 *
 * The visitor never picks one. The request carries a single `sourceCountry` —
 * where the car is bought — and the pipeline decides which markets to compare
 * against; with `DE` it always answers with Germany and Switzerland. There is
 * no target-country parameter, so a country chooser would have nothing to
 * change. Germany is the only source wired end-to-end today, and this list is
 * what the API route validates against.
 *
 * Switzerland can never appear here: upstream rejects `CH` as a source country
 * with `400 Invalid source country` (verified 2026-08-20). It is a target
 * market and comes back inside `markets[]` of every result.
 */
export type DemoSourceMarket = {
  code: UpstreamSourceCountry;
  supported: boolean;
};

export const DEMO_SOURCE_MARKETS: readonly DemoSourceMarket[] = [
  { code: "DE", supported: true },
];

export const DEFAULT_SOURCE_MARKET: UpstreamSourceCountry = "DE";

const SUPPORTED = new Set(
  DEMO_SOURCE_MARKETS.filter((market) => market.supported).map(
    (market) => market.code,
  ),
);

export function isSupportedSourceMarket(
  value: string,
): value is UpstreamSourceCountry {
  return SUPPORTED.has(value as UpstreamSourceCountry);
}
