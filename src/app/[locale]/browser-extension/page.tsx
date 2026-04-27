import type { Metadata } from "next";

import { Background } from "@/components/background";
import { BrowserExtensionHero } from "@/components/blocks/browser-extension-hero";
import { Testimonials } from "@/components/blocks/testimonials";
import { DashedLine } from "@/components/dashed-line";

export const metadata: Metadata = {
  title: "Browser extension",
  description:
    "Auto-margin browser extension - check prices and surface better vehicle deals while you browse marketplaces.",
  openGraph: {
    title: "Browser extension | Auto-margin",
    description: "See list prices in context and spot stronger deals while you browse.",
  },
};

export default function BrowserExtensionPage() {
  return (
    <Background>
      <BrowserExtensionHero />
      <DashedLine className="mx-auto max-w-[80%]" />
      <Testimonials dashedLineClassName="hidden" />
    </Background>
  );
}
