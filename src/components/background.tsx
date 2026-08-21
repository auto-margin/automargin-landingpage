import React from "react";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
  /**
   * Keep the top blue wash roughly viewport-sized so tall pages
   * (e.g. demo) don't stretch and dilute the gradient.
   */
  fixedWash?: boolean;
};

export const Background = ({
  children,
  variant = "top",
  className,
  fixedWash = false,
}: BackgroundProps) => {
  const useFixedTopWash = fixedWash && variant === "top";

  return (
    <div
      className={cn(
        "relative mx-2.5 mt-2.5 lg:mx-4",
        variant === "top" &&
          (useFixedTopWash
            ? "bg-background rounded-t-4xl rounded-b-2xl"
            : "from-primary/50 via-background to-background/80 rounded-t-4xl rounded-b-2xl bg-linear-to-b via-20%"),
        variant === "bottom" &&
          "from-background via-background to-primary/50 rounded-t-2xl rounded-b-4xl bg-linear-to-b",
        className,
      )}
    >
      {useFixedTopWash ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,36rem)] rounded-t-4xl bg-linear-to-b from-primary/50 via-background to-transparent via-55%"
        />
      ) : null}
      <div className={cn(useFixedTopWash && "relative")}>{children}</div>
    </div>
  );
};
