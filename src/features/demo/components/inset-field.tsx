"use client";

import { cn } from "@/lib/utils";

/**
 * Shared styling for a control that sits inside an `InsetField`. The box owns
 * the border, background, padding and focus ring, so the control itself has to
 * give all of that up.
 */
export const INSET_CONTROL =
  "h-7 w-full rounded-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-sm dark:bg-transparent";

/** Same, for the Radix select trigger — its height is set through a data-attr. */
export const INSET_TRIGGER = `${INSET_CONTROL} h-7! justify-between dark:hover:bg-transparent`;

type InsetFieldProps = {
  /** Id of the control inside, so the label stays a real `<label for>`. */
  id: string;
  label: string;
  /** Rendered after the label in a lighter weight, e.g. "optional". */
  note?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * A field whose label lives inside the control's box, above the value.
 *
 * One box per field instead of label → control → hint means a third less
 * vertical space and a lot less loose text, and the label stays visible after
 * the field is filled in (which a placeholder does not).
 */
export function InsetField({
  id,
  label,
  note,
  error,
  className,
  children,
}: InsetFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div
        className={cn(
          "border-input dark:bg-input/30 rounded-lg border bg-transparent px-3 pt-2 pb-2 shadow-xs transition-[color,box-shadow]",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          error && "border-destructive focus-within:border-destructive",
        )}
      >
        <label
          htmlFor={id}
          className="text-muted-foreground mb-0.5 block text-xs font-medium"
        >
          {label}
          {note ? (
            <span className="font-normal opacity-80"> · {note}</span>
          ) : null}
        </label>
        {children}
      </div>

      {/*
        Always reserve one line for the message. Toggling an error must not
        grow the grid row and shove neighbouring fields down.
      */}
      <p
        id={`${id}-error`}
        aria-hidden={error ? undefined : true}
        className={cn(
          "ml-1 min-h-4 text-[12px] leading-4 font-medium",
          error
            ? "text-rose-700 dark:text-rose-300"
            : "invisible select-none",
        )}
      >
        {error || "\u00a0"}
      </p>
    </div>
  );
}
