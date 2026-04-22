"use client";

import { PricingCard, type Plan } from "@/components/blocks/pricing-card";
import { cn } from "@/lib/utils";

const plans: Plan[] = [
  {
    name: "Starter",
    subtitle: "For small teams getting started with AutoMargin.",
    monthlyPrice: "€ 500",
    yearlyPrice: "€ 5 000",
    buttonText: "Get started",
    features: [
      "1 seat",
      "100 analyses / month",
      "Basic market analysis",
      "Email support",
    ],
  },
  {
    name: "Pro",
    subtitle: "For active dealers comparing offers every day.",
    monthlyPrice: "€ 1 500",
    yearlyPrice: "€ 15 000",
    buttonText: "Get started",
    features: [
      "All Starter features",
      "1,000 analyses / month",
      "5 seats included",
      "Advanced margin insights",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "For dealer groups and marketplaces with custom needs.",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    buttonText: "Contact us",
    features: [
      "All Pro features",
      "Unlimited seats",
      "Custom integrations & API",
      "SSO and compliance options",
      "Dedicated success manager",
    ],
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            Use Automargin for free with limitations. Upgrade to enable
            unlimited offers, enhanced security controls and additional
            features.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
