import Image from "next/image";

import { useTranslations } from "next-intl";

import { DashedLine } from "@/components/dashed-line";

const FLAG_SIZE = 48;

type Market = {
  code: string;
  flagFile: string;
  /** Shown as muted card + "Coming soon" instead of listing metric */
  comingSoon?: boolean;
};

const MARKETS: Market[] = [
  { code: "DE", flagFile: "de" },
  {
    code: "FR",
    flagFile: "fr",
    comingSoon: true,
  },
  {
    code: "PL",
    flagFile: "pl",
    comingSoon: true,
  },
  { code: "IT", flagFile: "it" },
  {
    code: "CH",
    flagFile: "ch",
  },
  { code: "ES", flagFile: "es" },
  {
    code: "NL",
    flagFile: "nl",
    comingSoon: true,
  },
  { code: "BE", flagFile: "be" },
  { code: "SE", flagFile: "se" },
  {
    code: "CZ",
    flagFile: "cz",
  },
];

export function TopMarketsSection() {
  const t = useTranslations("Home.markets");

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
            {t("title")}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
            {t("description")}
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
                      {t(`countries.${item.code}.name`)}
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
                            {t("comingSoon")
                              .split("")
                              .map((char, index) => (
                                <span key={`${char}-${index}`}>
                                  {char === " " ? "\u00a0" : char}
                                </span>
                              ))}
                          </span>
                        </span>
                      ) : (
                        t(`countries.${item.code}.metric`)
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
