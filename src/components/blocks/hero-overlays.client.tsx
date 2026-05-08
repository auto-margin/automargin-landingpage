"use client";

import dynamic from "next/dynamic";

const HeroImageOverlays = dynamic(
  () =>
    import("@/components/blocks/hero-image-overlays").then(
      (m) => m.HeroImageOverlays,
    ),
  { ssr: false },
);

export function HeroOverlaysClient() {
  return <HeroImageOverlays />;
}

