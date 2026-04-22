import { Suspense } from "react";

import { Background } from "@/components/background";
import { DemoCalculator } from "@/components/demo-calculator";

export default function DemoPage() {
  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-4xl">
          <header className="text-center">
            <p className="text-chart-1 mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              Live profit demo
            </p>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Try AutoMargin on a real car offer.
            </h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm md:text-base">
              Describe any car you&apos;re considering and we&apos;ll show you
              how AutoMargin could analyze its profit potential using live
              market data from major leading marketplaces.
            </p>
          </header>

          <div className="border-border/60 bg-card/60 mt-8 rounded-3xl border p-6 shadow-sm md:mt-10 md:p-8">
            <p className="text-foreground text-sm font-semibold">
              What this demo shows
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              This is a limited demo to illustrate how a single vehicle price
              validation can look in Auto-margin.
            </p>

            {/* Mobile: collapsible lists to reduce scroll (simple) */}
            <div className="mt-6 grid gap-4 md:hidden">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-1/40 [&::-webkit-details-marker]:hidden">
                  <span className="text-foreground text-sm font-semibold">
                    Included (demo)
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-muted-foreground size-4 transition-transform group-open:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
                  <li>Single-vehicle validation from text input</li>
                  <li>Market comparison and a simple recommendation signal</li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-1/40 [&::-webkit-details-marker]:hidden">
                  <span className="text-foreground text-sm font-semibold">
                    Not included
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-muted-foreground size-4 transition-transform group-open:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
                  <li>Batch screening of supplier lists</li>
                  <li>File upload or auto-upload from email</li>
                  <li>Dealer insight / dealer-fit signals</li>
                  <li>Integrations, exports, dashboards</li>
                  <li>Full vehicle data enrichment and workflows</li>
                  <li>…and more</li>
                </ul>
              </details>
            </div>

            {/* Desktop/tablet: show both lists side-by-side */}
            <div className="mt-6 hidden gap-6 md:grid md:grid-cols-2">
              <div>
                <p className="text-foreground text-sm font-semibold">
                  Included (demo)
                </p>
                <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
                  <li>Single-vehicle validation from text input</li>
                  <li>Market comparison and a simple recommendation signal</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  Not included
                </p>
                <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
                  <li>Batch screening of supplier lists</li>
                  <li>File upload or auto-upload from email</li>
                  <li>Dealer insight / dealer-fit signals</li>
                  <li>Integrations, exports, dashboards</li>
                  <li>Full vehicle data enrichment and workflows</li>
                  <li>…and more</li>
                </ul>
              </div>
            </div>
          </div>

          <Suspense
            fallback={
              <div
                className="border-border/60 bg-muted/20 mt-8 min-h-[320px] rounded-2xl border p-6 md:min-h-[400px] md:p-8"
                aria-hidden
              />
            }
          >
            <DemoCalculator />
          </Suspense>
        </div>
      </section>
    </Background>
  );
}
