"use client";

import { useId, useRef, useState } from "react";

import { Check, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { searchBrands } from "@/features/demo/brands";
import { INSET_CONTROL } from "@/features/demo/components/inset-field";
import { cn } from "@/lib/utils";

type BrandFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  placeholder: string;
  listLabel: string;
  freeTextHint: string;
  openLabel: string;
};

/**
 * Editable combobox over the make list (WAI-ARIA 1.2 pattern).
 *
 * Free text always wins: whatever the visitor types is submitted verbatim when
 * it does not match a suggestion, so an unlisted make can never be rejected.
 * That is the whole point of the field — the previous demo gated submission on
 * a hard-coded brand list and silently refused everything outside it.
 */
export function BrandField({
  id,
  value,
  onChange,
  onBlur,
  disabled,
  invalid,
  describedBy,
  placeholder,
  listLabel,
  freeTextHint,
  openLabel,
}: BrandFieldProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = open ? searchBrands(value) : [];
  const hasSuggestions = suggestions.length > 0;

  function commit(brand: string) {
    onChange(brand);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      const total = suggestions.length;
      if (!total) return;
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((prev) => (prev + delta + total) % total);
      return;
    }

    if (event.key === "Enter" && open && activeIndex >= 0) {
      const picked = suggestions[activeIndex];
      if (picked) {
        event.preventDefault();
        commit(picked);
      }
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "Tab") setOpen(false);
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        role="combobox"
        autoComplete="off"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={
          open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
        }
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={cn(INSET_CONTROL, "pr-8")}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // Let a click on an option land before the list unmounts.
          blurTimerRef.current = setTimeout(() => {
            setOpen(false);
            setActiveIndex(-1);
            onBlur?.();
          }, 120);
        }}
      />

      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          setOpen((prev) => !prev);
          inputRef.current?.focus();
        }}
        className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-8 items-center justify-center disabled:opacity-50"
      >
        <span className="sr-only">{openLabel}</span>
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && hasSuggestions ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={listLabel}
          className="bg-popover text-popover-foreground absolute z-30 mt-3 -ml-3 max-h-60 w-[calc(100%+1.5rem)] overflow-y-auto rounded-lg border p-1 shadow-md"
          onMouseDown={() => {
            if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
          }}
        >
          {suggestions.map((brand, index) => {
            const selected = brand === value;
            return (
              <li
                key={brand}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(brand)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm",
                  index === activeIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground",
                )}
              >
                {brand}
                {selected ? <Check className="size-4" aria-hidden /> : null}
              </li>
            );
          })}
          <li
            role="presentation"
            className="text-muted-foreground border-border/60 mt-1 border-t px-3 py-2 text-xs"
          >
            {freeTextHint}
          </li>
        </ul>
      ) : null}
    </div>
  );
}
