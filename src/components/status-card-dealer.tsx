import { cn } from "@/lib/utils";

type StatusCardDealerProps = {
  className?: string;
  /** Number of dealers surfaced in the mock summary. */
  dealerCount?: number;
  /** Response rate label, e.g. percentage. */
  responseRatePercent?: number;
};

export const StatusCardDealer = ({
  className,
  dealerCount = 12,
  responseRatePercent = 94,
}: StatusCardDealerProps) => {
  return (
    <div
      className={cn(
        "bg-background border-border/80 relative flex min-h-[288px] w-[168px] shrink-0 flex-col overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm",
        "text-[11px] leading-snug sm:w-[176px] sm:text-xs lg:min-h-[308px] lg:w-[184px] lg:text-[13px]",
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between gap-6 px-3.5 py-5 sm:px-4 sm:py-6">
        <div>
          <p className="text-foreground font-semibold tracking-tight">
            Dealer info
          </p>
          <div
            className="bg-border/70 my-3 h-px w-8 rounded-full"
            aria-hidden
          />
          <p className="text-muted-foreground">
            {dealerCount} verified dealers matched your filters in this run.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Response rate:{" "}
            <span className="font-semibold text-sky-600 dark:text-sky-400">
              {responseRatePercent}%
            </span>
          </p>
          <p className="text-muted-foreground/80 text-[10px] sm:text-[11px] lg:text-xs">
            Profiles synced across EU marketplaces.
          </p>
        </div>
      </div>
    </div>
  );
};
