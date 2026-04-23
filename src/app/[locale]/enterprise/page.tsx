import type { Metadata } from "next";

import { Background } from "@/components/background";
import { EnterpriseHero } from "@/components/blocks/enterprise-hero";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Enterprise-grade market intelligence for bulk screening, multi-market evaluation, and dealer-level insights.",
  openGraph: {
    title: "Enterprise | Auto-margin",
    description:
      "Bulk screening, structural demand detection, dealer intelligence, and multi-market evaluation.",
  },
};

export default function EnterprisePage() {
  return (
    <Background>
      <EnterpriseHero />
    </Background>
  );
}

