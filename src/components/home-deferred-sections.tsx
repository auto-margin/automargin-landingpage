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
      <TestimonialsSection className="pt-10 lg:pt-12" />
    </>
  );
}
