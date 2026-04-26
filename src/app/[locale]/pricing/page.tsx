import React from "react";

import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Pricing } from "@/components/blocks/pricing";
import { PricingTable } from "@/components/blocks/pricing-table";
import { SalesPricingPage } from "@/components/blocks/sales-pricing-page";
import { ENABLE_SELF_SERVE_PRICING } from "@/lib/feature-flags";

const Page = () => {
  return (
    <Background>
      <SalesPricingPage />
      {ENABLE_SELF_SERVE_PRICING && (
        <>
          <Pricing className="py-28 text-center lg:pt-44 lg:pb-32" />
          <PricingTable />
        </>
      )}
      <FAQ className="pt-10" />
    </Background>
  );
};

export default Page;
