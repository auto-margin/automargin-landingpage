"use client";

import { useState } from "react";

import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export type Plan = {
  name: string;
  subtitle: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonText: string;
  features: string[];
};

export function PricingCard({ plan }: { plan: Plan }) {
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

      <CardContent className="flex h-full flex-col gap-6 px-6 py-6 md:px-7 md:py-7">
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
            asChild
            className="w-full"
            variant={isPrimary ? "default" : "outline"}
          >
            <Link href="/contact">{plan.buttonText}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

