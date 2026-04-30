import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: ReactNode;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  hoverText: string;
  hideDescriptionOnMobile?: boolean;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  hoverText,
  hideDescriptionOnMobile = false,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      // Keep it flatter and closer to the hero section.
      "bg-background border shadow-sm",
      "transform-gpu",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className="text-primary h-10 w-10 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-card-foreground text-xl font-semibold">{name}</h3>
        <p
          className={cn(
            "text-muted-foreground max-w-lg",
            hideDescriptionOnMobile && "hidden sm:block",
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden",
        )}
      >
        <p className="text-primary text-sm font-medium">{hoverText}</p>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex",
      )}
    >
      <p className="text-primary text-sm font-medium">{hoverText}</p>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/2 group-hover:dark:bg-white/5" />
  </div>
);

export { BentoCard, BentoGrid };
