import { Car, Landmark, ListFilter, MoreHorizontal, User } from "lucide-react";

import { cn } from "@/lib/utils";

const ROWS: { title: string; subtitle: string }[] = [
  {
    title: "Munich Motors AG",
    subtitle:
      "Above typical retail for this segment — strong brand mix (BMW / Audi heavy).",
  },
  {
    title: "Nordic Auto OÜ",
    subtitle: "Luxury-focused stock; last sale closed above guide 4 days ago.",
  },
  {
    title: "Vienne Cars Sàrl",
    subtitle:
      "Pricing slightly under market median — faster turns, mostly volume brands.",
  },
  {
    title: "Stockholm Bilhandel AB",
    subtitle:
      "Below market on high-mileage units — clearance style; recent sale: 12% under comparable list.",
  },
  {
    title: "Rhine Valley Motors GmbH",
    subtitle: "Ask aligned with DE-CH arbitrage window.",
  },
];

type DealerVerificationInboxMockProps = {
  className?: string;
};

/** Compact inbox-style UI for the “Dealer verification” bento tile (no raster image). */
export function DealerVerificationInboxMock({
  className,
}: DealerVerificationInboxMockProps) {
  return (
    <div
      className={cn(
        "border-border bg-background text-foreground flex h-full min-h-0 flex-col overflow-hidden rounded-md border shadow-sm",
        className,
      )}
    >
      <header className="border-border flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-2">
        <div className="flex min-w-0 items-baseline gap-1.5">
          <span className="text-xs font-semibold tracking-tight">Inbox</span>
          <span className="text-muted-foreground shrink-0 text-[10px] font-medium">
            ·
          </span>
          <span className="text-muted-foreground truncate text-[10px] font-medium tracking-tight">
            Dealer insight
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2">
          <MoreHorizontal className="size-3.5" aria-hidden />
          <ListFilter className="size-3.5" aria-hidden />
          <Landmark className="size-3.5" aria-hidden />
        </div>
      </header>
      <ul className="divide-border min-h-0 flex-1 divide-y overflow-hidden">
        {ROWS.map((row) => (
          <li
            key={row.title}
            className="flex items-center gap-2 px-2 py-1.5 sm:py-2"
          >
            <div className="relative shrink-0">
              <div
                className="bg-primary flex size-7 items-center justify-center rounded-full sm:size-8"
                aria-hidden
              >
                <Car className="text-primary-foreground size-3 sm:size-3.5" />
              </div>
              <span
                className="bg-primary ring-background absolute top-0 right-0 z-10 size-1.5 translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
                aria-hidden
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] leading-tight font-semibold sm:text-xs">
                {row.title}
              </p>
              <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[9px] leading-snug sm:text-[10px]">
                {row.subtitle}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5">
              <div
                className="bg-primary/15 flex size-6 items-center justify-center rounded-full sm:size-7"
                aria-hidden
              >
                <User className="text-primary size-3 sm:size-3.5" />
              </div>
              <span className="text-muted-foreground text-[8px] tabular-nums sm:text-[9px]">
                12:33am
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
