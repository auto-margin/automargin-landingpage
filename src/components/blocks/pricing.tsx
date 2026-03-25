"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  subtitle: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonText: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    subtitle: "For small teams getting started with AutoMargin.",
    monthlyPrice: "€ 500",
    yearlyPrice: "€ 5 000",
    buttonText: "Get started",
    features: [
      "1 user",
      "100 offers per month",
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
      "1000 offers per month",
      "5 users included",
      "Advanced margin insights",
      "Priority support",
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
      "Unlimited users",
      "Custom integrations & API",
      "SSO and compliance options",
      "Dedicated success manager",
    ],
  },
];

function PricingCard({ plan }: { plan: Plan }) {
  const [isAnnual, setIsAnnual] = useState(false);

  const isEnterprise = plan.name === "Enterprise";
  const isPrimary = plan.name === "Pro";
  const hasToggle = !isEnterprise;

  const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isEnterprise ? "" : isAnnual ? "per year" : "per month";

  return (
    <Card
      className={cn(
        "border-border/60 bg-card/80 relative flex h-full flex-col rounded-2xl border shadow-sm",
        isPrimary &&
          "border-primary/70 bg-primary/5 ring-primary/50 shadow-lg ring-1",
      )}
    >
      {isPrimary && (
        <div className="pointer-events-none absolute top-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-[-55%] items-center">
          <span className="bg-primary text-primary-foreground rounded-full px-5 py-1 text-xs font-semibold tracking-wider shadow">
            BEST SELLER
          </span>
        </div>
      )}

      <CardContent
        className={cn("flex h-full flex-col gap-6 px-6 py-6 md:px-7 md:py-7")}
      >
        <div className="space-y-3">
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            {plan.name}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold md:text-4xl">{price}</span>
            {period && (
              <span className="text-muted-foreground inline text-xs font-medium sm:hidden lg:inline">
                {period}
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-sm">{plan.subtitle}</p>
        </div>

        {hasToggle && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <Switch
              checked={isAnnual}
              onCheckedChange={() => setIsAnnual(!isAnnual)}
              aria-label={`${plan.name}: toggle annual billing`}
            />
            <span>{isAnnual ? "Billed annually" : "Billed monthly"}</span>
          </div>
        )}

        <div className="space-y-3 text-sm">
          {plan.features.map((feature) => (
            <div
              key={feature}
              className="text-muted-foreground flex items-center gap-2"
            >
              <Check className="text-primary h-4 w-4 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <Button
            className="w-full"
            variant={isPrimary ? "default" : "outline"}
          >
            {plan.buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

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
