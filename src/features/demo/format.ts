"use client";

import { useMemo } from "react";

import { useLocale } from "next-intl";

/** Rendered wherever the pipeline could not measure a value. */
export const DASH = "—";

/**
 * Routing locales are not all valid BCP-47 tags — `dk` is the route segment for
 * Danish, whose language tag is `da`. Map before handing anything to `Intl`.
 */
const INTL_LOCALES: Record<string, string> = {
  en: "en-GB",
  sv: "sv-SE",
  de: "de-DE",
  es: "es-ES",
  dk: "da-DK",
};

export function toIntlLocale(locale: string) {
  return INTL_LOCALES[locale] ?? locale;
}

export type DemoFormatters = {
  /** Currency amount, no decimals. Falls back to a dash when unmeasured. */
  money: (value?: number | null, currency?: string) => string;
  /**
   * Profit/loss range. Normalises min/max order. When the whole range is a
   * loss, amounts render as positives so the label can say “loss” instead of
   * stacking minus signs (`-€3,978 – -€5,852`).
   */
  moneyRange: (
    min?: number | null,
    max?: number | null,
    currency?: string,
    options?: { asLoss?: boolean },
  ) => { text: string; kind: "profit" | "loss" | "mixed" | "empty" };
  /** Plain integer with locale grouping. */
  count: (value?: number | null) => string;
  /** Percentage from percent units (`-16.3` renders as `-16.3 %`). */
  percent: (value?: number | null) => string;
  /** Day count, e.g. `26 days` is rendered by the caller around this number. */
  days: (value?: number | null) => string;
  /** `2022-03-01` becomes `03/2022`; a bare `2022` stays `2022`. */
  registration: (value?: string | null) => string;
};

export function useDemoFormatters(): DemoFormatters {
  const locale = useLocale();

  return useMemo(() => {
    const intlLocale = toIntlLocale(locale);

    const money = (value?: number | null, currency?: string) => {
      if (value == null || !Number.isFinite(value)) return DASH;
      const code = currency && /^[A-Z]{3}$/.test(currency) ? currency : "EUR";
      try {
        return new Intl.NumberFormat(intlLocale, {
          style: "currency",
          currency: code,
          maximumFractionDigits: 0,
        }).format(value);
      } catch {
        return `${Math.round(value)} ${code}`;
      }
    };

    const moneyRange = (
      min?: number | null,
      max?: number | null,
      currency?: string,
      options?: { asLoss?: boolean },
    ) => {
      const values = [min, max].filter(
        (value): value is number => value != null && Number.isFinite(value),
      );
      if (values.length === 0) return { text: DASH, kind: "empty" as const };

      const asLoss =
        options?.asLoss === true ||
        values.every((value) => value <= 0);

      if (asLoss) {
        const absValues = values.map((value) => Math.abs(value));
        const lo = Math.min(...absValues);
        const hi = Math.max(...absValues);
        return {
          text:
            lo === hi
              ? money(lo, currency)
              : `${money(lo, currency)} – ${money(hi, currency)}`,
          kind: "loss" as const,
        };
      }

      if (values.length === 1) {
        return { text: money(values[0], currency), kind: "profit" as const };
      }

      const lo = Math.min(values[0], values[1]);
      const hi = Math.max(values[0], values[1]);

      if (lo >= 0) {
        return {
          text: `${money(lo, currency)} – ${money(hi, currency)}`,
          kind: "profit" as const,
        };
      }
      return {
        text: `${money(lo, currency)} – ${money(hi, currency)}`,
        kind: "mixed" as const,
      };
    };

    const count = (value?: number | null) => {
      if (value == null || !Number.isFinite(value)) return DASH;
      return new Intl.NumberFormat(intlLocale).format(value);
    };

    const percent = (value?: number | null) => {
      if (value == null || !Number.isFinite(value)) return DASH;
      return new Intl.NumberFormat(intlLocale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }).format(value / 100);
    };

    const days = (value?: number | null) => {
      if (value == null || !Number.isFinite(value)) return DASH;
      return new Intl.NumberFormat(intlLocale, {
        maximumFractionDigits: 0,
      }).format(value);
    };

    const registration = (value?: string | null) => {
      if (!value) return DASH;
      const iso = /^(\d{4})-(\d{2})-\d{2}$/.exec(value);
      if (iso) return `${iso[2]}/${iso[1]}`;
      const yearOnly = /^\d{4}$/.exec(value);
      if (yearOnly) return value;
      return value;
    };

    return { money, moneyRange, count, percent, days, registration };
  }, [locale]);
}
