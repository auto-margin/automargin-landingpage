import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

type MarketFeedItem = {
  code: string;
  country: string;
  volume: string;
  change: string;
  down?: boolean;
};

const markets: MarketFeedItem[] = [
  { code: "CZ", country: "Czechia", volume: "0.32M", change: "+0.2%" },
  { code: "DE", country: "Germany", volume: "2.34M", change: "+0.4%" },
  {
    code: "IT",
    country: "Italy",
    volume: "0.72M",
    change: "-0.1%",
    down: true,
  },
  { code: "ES", country: "Spain", volume: "0.94M", change: "+0.1%" },
  { code: "SE", country: "Sweden", volume: "0.41M", change: "+0.3%" },
  { code: "CH", country: "Switzerland", volume: "0.29M", change: "+0.5%" },
  {
    code: "BE",
    country: "Belgium",
    volume: "0.41M",
    change: "-0.2%",
    down: true,
  },
  { code: "KR", country: "South Korea", volume: "0.18M", change: "+0.2%" },
  { code: "CN", country: "China", volume: "3.08M", change: "+0.7%" },
] as const;

export function MarketFeedDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border/70 bg-background/70 overflow-hidden border-y",
        className,
      )}
      aria-hidden
    >
      <div className="flex h-9 items-center">
        <div className="border-border/60 bg-background text-muted-foreground z-10 flex h-full shrink-0 items-center gap-3 border-r px-4 text-xs whitespace-nowrap sm:px-8">
          <span className="bg-primary size-1.5 rounded-full" />
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
            EU Market Feed
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l to-transparent" />
          <Marquee repeat={3} className="py-0 [--duration:34s] [--gap:0rem]">
            {markets.map((market) => (
              <div
                key={market.code}
                className="border-border/60 flex h-9 shrink-0 items-center gap-3 border-r px-8 text-xs whitespace-nowrap"
              >
                <span className="text-muted-foreground/70 font-mono text-[10px] font-bold tracking-[0.14em]">
                  {market.code}
                </span>
                <span className="text-foreground font-medium">
                  {market.country}
                </span>
                <span className="text-muted-foreground font-mono">
                  {market.volume}
                </span>
                <span
                  className={cn(
                    "font-mono font-bold",
                    market.down ? "text-red-700" : "text-emerald-700",
                  )}
                >
                  {market.change}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
