import Image from "next/image";

import { DashedLine } from "@/components/dashed-line";

const FLAG_SIZE = 48;

type Market = {
  code: string;
  flagFile: string;
  country: string;
  metric: string;
  /** Shown as muted card + "Coming soon" instead of listing metric */
  comingSoon?: boolean;
};

const MARKETS: Market[] = [
  { code: "DE", flagFile: "de", country: "Germany", metric: "2.3M+ listings" },
  {
    code: "FR",
    flagFile: "fr",
    country: "France",
    metric: "1.2M+ listings",
    comingSoon: true,
  },
  {
    code: "PL",
    flagFile: "pl",
    country: "Poland",
    metric: "870K+ listings",
    comingSoon: true,
  },
  { code: "IT", flagFile: "it", country: "Italy", metric: "720K+ listings" },
  {
    code: "CH",
    flagFile: "ch",
    country: "Switzerland",
    metric: "540K+ listings",
  },
  { code: "ES", flagFile: "es", country: "Spain", metric: "660K+ listings" },
  {
    code: "NL",
    flagFile: "nl",
    country: "Netherlands",
    metric: "540K+ listings",
    comingSoon: true,
  },
  { code: "BE", flagFile: "be", country: "Belgium", metric: "410K+ listings" },
  { code: "SE", flagFile: "se", country: "Sweden", metric: "380K+ listings" },
  {
    code: "CZ",
    flagFile: "cz",
    country: "Czech Republic",
    metric: "320K+ listings",
  },
];

export function TopMarketsSection() {
  return (
    <section
      id="top-markets"
      className="pb-20 md:pt-4 md:pb-28 lg:pt-12 lg:pb-32"
      aria-labelledby="top-markets-heading"
    >
      <div className="container">
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
        </div>
        <header className="mx-auto mt-10 max-w-3xl text-center sm:mt-14 lg:mt-16">
          <h2
            id="top-markets-heading"
            className="font-display text-foreground text-2xl tracking-tight md:text-4xl lg:text-5xl"
          >
            Data from top markets
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
            Listing volume and market context by country - used automatically
            when you evaluate profitability.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:mt-16 lg:grid-cols-5">
          {MARKETS.map((item) => {
            const soon = item.comingSoon === true;
            return (
              <li key={item.code}>
                <article
                  data-coming-soon={soon ? "" : undefined}
                  className={
                    soon
                      ? "bg-muted/50 text-muted-foreground border-muted-foreground/15 flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-3 py-5 text-center shadow-none sm:px-4 sm:py-6"
                      : "bg-card text-card-foreground border-border flex h-full flex-col items-center justify-center gap-3 rounded-2xl border px-3 py-5 text-center shadow-sm transition-[box-shadow,transform] duration-200 hover:shadow-md sm:px-4 sm:py-6"
                  }
                >
                  <div
                    className={
                      soon
                        ? "bg-muted/80 relative size-11 shrink-0 overflow-hidden rounded-full opacity-90 ring-1 ring-black/5 sm:size-12"
                        : "bg-muted relative size-11 shrink-0 overflow-hidden rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-black/5 sm:size-12"
                    }
                    aria-hidden
                  >
                    <Image
                      src={`/flags/${item.flagFile}.svg`}
                      alt=""
                      width={FLAG_SIZE}
                      height={FLAG_SIZE}
                      loading="lazy"
                      fetchPriority="low"
                      unoptimized
                      className={
                        soon
                          ? "size-full object-cover opacity-80 grayscale"
                          : "size-full object-cover opacity-80"
                      }
                    />
                  </div>
                  <div className="flex min-h-0 flex-col gap-1">
                    <h3
                      className={
                        soon
                          ? "font-display text-muted-foreground text-sm font-semibold tracking-tight sm:text-base"
                          : "font-display text-foreground text-sm font-semibold tracking-tight sm:text-base"
                      }
                    >
                      {item.country}
                    </h3>
                    <p
                      className={
                        soon
                          ? "text-muted-foreground text-xs font-medium sm:text-sm"
                          : "text-muted-foreground text-xs sm:text-sm"
                      }
                    >
                      {soon ? (
                        <span className="wave-container inline-block">
                          <span className="wave-text inline-block whitespace-nowrap">
                            <span>C</span>
                            <span>o</span>
                            <span>m</span>
                            <span>i</span>
                            <span>n</span>
                            <span>g</span>
                            <span>{"\u00a0"}</span>
                            <span>s</span>
                            <span>o</span>
                            <span>o</span>
                            <span>n</span>
                          </span>
                        </span>
                      ) : (
                        item.metric
                      )}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
