"use client";

import dynamic from "next/dynamic";

import { ENABLE_SELF_SERVE_PRICING } from "@/lib/feature-flags";

const PricingSection = dynamic(
  () => import("@/components/blocks/pricing").then((m) => m.Pricing),
  { ssr: false },
);

const SalesPricingSection = dynamic(
  () =>
    import("@/components/blocks/sales-pricing-section").then(
      (m) => m.SalesPricingSection,
    ),
  { ssr: false },
);

const MarketFeedDivider = dynamic(
  () =>
    import("@/components/blocks/market-feed-divider").then(
      (m) => m.MarketFeedDivider,
    ),
  { ssr: false },
);

const TestimonialsSection = dynamic(
  () => import("@/components/blocks/testimonials").then((m) => m.Testimonials),
  { ssr: false },
);

export function HomeDeferredSections() {
  return (
    <>
      {ENABLE_SELF_SERVE_PRICING ? (
        <PricingSection className="pb-10 lg:pb-12" />
      ) : (
        <SalesPricingSection className="pb-10 lg:pb-12" />
      )}
      <MarketFeedDivider />
      <TestimonialsSection className="pt-[74px] lg:pt-[106px]" />
    </>
  );
}
