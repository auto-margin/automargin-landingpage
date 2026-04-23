import { PricingCard, type Plan } from "@/components/blocks/pricing-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type EnterprisePricingCtaProps = {
  className?: string;
};

export function EnterprisePricingCta({ className }: EnterprisePricingCtaProps) {
  const enterprisePlan: Plan = {
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
  };

  return (
    <section className={cn("py-16 lg:py-20", className)}>
      <div className="container grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-xl">
          <p className="text-chart-1 text-xs font-medium tracking-wide uppercase">
            Enterprise plan
          </p>
          <h2 className="text-foreground mt-4 text-4xl font-semibold tracking-tight">
            Get a custom package built around your workflow.
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
            For dealer groups, sourcing desks, and marketplaces that need bulk
            screening, multi-market evaluation, and deeper signals. Talk to us
            and we’ll tailor the setup, limits, and integrations to your team.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/contact">Contact sales</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">Compare plans</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[340px] lg:mx-0 lg:justify-self-end">
          <div className="am-animated-border rounded-2xl">
            <PricingCard plan={enterprisePlan} />
          </div>
        </div>
      </div>
    </section>
  );
}

