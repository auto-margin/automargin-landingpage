import Link from "next/link";

import { Check, CreditCard, RefreshCw, Settings, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

const bullets = [
  "Spot undervalued listings in one glance while you stay on the marketplace page.",
  "Compare ask price to market context so you move before the competition.",
  "Works alongside your workflow—no copy-paste between tabs or spreadsheets.",
];

function ExtensionMockup() {
  const bars = [40, 72, 55, 88, 62, 95, 58, 78, 50, 84, 66, 90];

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="border-primary/20 bg-card/40 ring-border/50 dark:border-primary/25 dark:bg-card/25 dark:ring-border/40 space-y-6 rounded-2xl border p-5 shadow-sm ring-1 sm:p-6"
        aria-hidden
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-foreground text-sm font-semibold tracking-tight">
            Auto-margin
          </span>
          <div className="text-muted-foreground flex items-center gap-2">
            <Settings className="size-4 opacity-80" aria-hidden />
            <Sun className="size-4 opacity-80" aria-hidden />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-primary/15 text-primary ring-primary/20 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1">
              Deal signal
            </span>
            <span className="text-muted-foreground text-xs">
              vs. market band
            </span>
          </div>

          <div className="border-border bg-muted/50 grid gap-3 rounded-lg border p-3">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-[0.65rem] font-medium tracking-wide uppercase">
                  List price
                </p>
                <p className="text-foreground font-display text-xl font-semibold tracking-tight">
                  €18,400
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-[0.65rem] font-medium tracking-wide uppercase">
                  Suggested range
                </p>
                <p className="text-primary font-display text-xl font-semibold tracking-tight">
                  €17.1k – €19.2k
                </p>
              </div>
            </div>
            <div className="border-border flex items-center justify-between gap-2 border-t border-dashed pt-3">
              <p className="text-muted-foreground text-xs">
                Margin headroom vs. typical retail
              </p>
              <span className="text-primary text-sm font-semibold tabular-nums">
                +6.2%
              </span>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-2 text-[0.65rem] font-medium tracking-wide uppercase">
              Local comps (sample)
            </p>
            <div className="flex h-14 items-end gap-1 px-0.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="bg-primary/70 min-w-0 flex-1 rounded-t-[3px]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="text-muted-foreground border-border flex items-center justify-between border-t pt-3 text-xs">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="size-3.5 opacity-80" aria-hidden />
              Synced from live listings
            </span>
            <span className="text-primary font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrowserExtensionHero() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <p className="text-primary mb-4 text-xs font-medium tracking-wide uppercase">
            Built for dealers who check prices manually
          </p>
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Auto-margin browser extension
          </h1>
          <p className="text-muted-foreground mt-5 text-xl md:text-3xl">
            Your assistant for checking prices and surfacing better vehicle
            deals while you browse - without leaving the listing.
          </p>
          <ul className="mt-8 max-w-160 space-y-3">
            {bullets.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="bg-primary/20 text-primary ring-primary/30 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ring-1">
                  <Check className="size-3.5 stroke-[2.5]" aria-hidden />
                </span>
                <span className="text-muted-foreground text-sm leading-snug md:text-base">
                  {line}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
              <Button asChild>
                <Link href="/contact">Get extension access</Link>
              </Button>
            </div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <CreditCard className="size-4 shrink-0 opacity-80" aria-hidden />
              No credit card required
            </p>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center max-lg:pt-10 lg:pl-10">
          <ExtensionMockup />
        </div>
      </div>
    </section>
  );
}
