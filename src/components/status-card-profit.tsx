import { cn } from "@/lib/utils";

type StatusCardProfitProps = {
  className?: string;
  count?: number;
  averageMarginPercent?: number;
};

export const StatusCardProfit = ({
  className,
  count = 51,
  averageMarginPercent = 16.04,
}: StatusCardProfitProps) => {
  return (
    <div
      className={cn(
        "bg-background border-border/80 relative shrink-0 overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm",
        "w-[248px] max-lg:text-xs sm:w-[288px] lg:w-[332px] lg:text-sm xl:w-[372px]",
        className,
      )}
    >
      <div className="py-2.5 pr-3 pl-3.5 lg:py-4 lg:pr-4 lg:pl-5">
        <p className="text-foreground text-xs font-semibold lg:text-sm">
          Result
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-snug lg:text-sm">
          Found {count} cars with good{" "}
          <span className="hidden sm:inline">potential</span> profit.
        </p>
        <p className="text-muted-foreground mt-1 text-xs leading-snug lg:text-sm">
          Average profit margin:{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {averageMarginPercent.toFixed(2)}%
          </span>
        </p>
      </div>
    </div>
  );
};
