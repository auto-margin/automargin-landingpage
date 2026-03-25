import { cn } from "@/lib/utils";

type SpinnerLoaderProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-2",
};

export const SpinnerLoader = ({
  className,
  size = "md",
}: SpinnerLoaderProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-blue-500 border-t-transparent",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
};
