"use client";

import dynamic from "next/dynamic";

const PricingSection = dynamic(
  () => import("@/components/blocks/pricing").then((m) => m.Pricing),
  { ssr: false },
);

const TestimonialsSection = dynamic(
  () => import("@/components/blocks/testimonials").then((m) => m.Testimonials),
  { ssr: false },
);

export function HomeDeferredSections() {
  return (
    <>
      <PricingSection />
      <TestimonialsSection />
    </>
  );
}
