import {
  ArrowDown,
  ArrowUp,
  Landmark,
  ListFilter,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";

type SupplierRow = {
  initials: string;
  supplier: string;
  margin: string;
  trend?: "up" | "down";
  cars: number;
  profit: string;
  score: string;
  scoreTone: "grow" | "core" | "watch";
  avatarClassName: string;
  marginClassName: string;
};

const ROWS: SupplierRow[] = [
  {
    initials: "FA",
    supplier: "Fr Automobils",
    margin: "19.5%",
    cars: 12,
    profit: "EUR46k",
    score: "89 · Grow",
    scoreTone: "grow",
    avatarClassName: "bg-primary",
    marginClassName: "text-primary-on-muted",
  },
  {
    initials: "CT",
    supplier: "Currus Trading",
    margin: "20.0%",
    cars: 8,
    profit: "EUR36k",
    score: "86 · Grow",
    scoreTone: "grow",
    avatarClassName: "bg-chart-2",
    marginClassName: "text-primary-on-muted",
  },
  {
    initials: "V",
    supplier: "VWFS",
    margin: "19.4%",
    trend: "up",
    cars: 21,
    profit: "EUR119k",
    score: "82 · Grow",
    scoreTone: "grow",
    avatarClassName: "bg-chart-3",
    marginClassName: "text-primary-on-muted",
  },
  {
    initials: "TA",
    supplier: "Tavi Auto Group",
    margin: "21.6%",
    trend: "down",
    cars: 2,
    profit: "EUR9k",
    score: "62 · Core",
    scoreTone: "core",
    avatarClassName: "bg-chart-3",
    marginClassName: "text-primary-on-muted",
  },
  {
    initials: "AP",
    supplier: "Alex Puller",
    margin: "13.8%",
    trend: "down",
    cars: 44,
    profit: "EUR192k",
    score: "56 · Watch",
    scoreTone: "watch",
    avatarClassName: "bg-chart-3",
    marginClassName: "text-muted-foreground",
  },
] as const;

type DealerVerificationInboxMockProps = {
  className?: string;
};

/** Compact supplier-network table for the "Supplier verification" bento tile. */
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
          <span className="text-xs font-semibold tracking-tight">Network</span>
          <span className="text-muted-foreground shrink-0 text-[10px] font-medium">
            ·
          </span>
          <span className="text-muted-foreground truncate text-[10px] font-medium tracking-tight">
            Supplier insight
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2">
          <MoreHorizontal className="size-3.5" aria-hidden />
          <ListFilter className="size-3.5" aria-hidden />
          <Landmark className="size-3.5" aria-hidden />
        </div>
      </header>

      <div className="bg-muted/35 text-muted-foreground border-border grid grid-cols-[1.7fr_1fr_0.65fr_1.05fr_1fr] border-b px-2 py-2 text-[8px] font-bold tracking-[0.08em] uppercase sm:text-[9px]">
        <span>Supplier</span>
        <span>Avg margin</span>
        <span>Cars</span>
        <span>Total profit</span>
        <span>Score</span>
      </div>

      <ul className="divide-border bg-background/70 min-h-0 flex-1 divide-y overflow-hidden">
        {ROWS.map((row) => (
          <li
            key={row.supplier}
            className="text-foreground grid grid-cols-[1.7fr_1fr_0.65fr_1.05fr_1fr] items-center px-2 py-2 text-[10px] font-semibold sm:py-2.5 sm:text-[11px]"
          >
            <div className="flex min-w-0 items-center gap-2">
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-[8px] font-black text-white sm:size-7 sm:text-[9px]",
                  row.avatarClassName,
                )}
                aria-hidden
              >
                {row.initials}
              </div>
              <span className="truncate">{row.supplier}</span>
            </div>

            <div className={cn("flex items-center gap-1", row.marginClassName)}>
              <span>{row.margin}</span>
              {row.trend === "up" ? (
                <ArrowUp className="size-3" aria-hidden />
              ) : null}
              {row.trend === "down" ? (
                <ArrowDown className="text-destructive size-3" aria-hidden />
              ) : null}
            </div>

            <span>{row.cars}</span>
            <span>{row.profit}</span>
            <span
              className={cn(
                "w-fit rounded-full px-2 py-1 text-[8px] font-black whitespace-nowrap sm:text-[9px]",
                row.scoreTone === "grow" &&
                  "bg-primary text-primary-foreground",
                row.scoreTone === "core" &&
                  "border-primary/20 bg-primary/10 text-primary-on-muted border",
                row.scoreTone === "watch" &&
                  "bg-muted text-muted-foreground border-border border",
              )}
            >
              {row.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
