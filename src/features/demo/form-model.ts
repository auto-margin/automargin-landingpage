import { resolveBrand } from "@/features/demo/brands";

/**
 * Upstream always takes one `carInput` string ("the whole offer line as-is").
 * Visitors can enter that either by pasting a free-text offer, or by filling
 * structured fields which `buildCarInput` composes into the same line.
 */
export type DemoInputMode = "fields" | "paste";

export type DemoFormValues = {
  inputMode: DemoInputMode;
  brand: string;
  model: string;
  regMonth: string;
  regYear: string;
  mileage: string;
  fuel: string;
  gearbox: string;
  power: string;
  price: string;
  currency: string;
  notes: string;
  /** Free-text offer used when `inputMode` is `"paste"`. Cap matches upstream. */
  pasteText: string;
};

export const FUEL_OPTIONS = [
  "diesel",
  "petrol",
  "hybrid",
  "plugin",
  "electric",
  "other",
] as const;

export const GEARBOX_OPTIONS = ["manual", "automatic"] as const;

export const CURRENCY_OPTIONS = ["EUR", "CHF"] as const;

/** Words handed to the upstream parser; deliberately English, not localised. */
const FUEL_TERMS: Record<string, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  plugin: "Plug-in hybrid",
  electric: "Electric",
  other: "",
};

const GEARBOX_TERMS: Record<string, string> = {
  manual: "Manual",
  automatic: "Automatic",
};

export const CURRENT_YEAR = 2026;
export const EARLIEST_YEAR = 1990;

export const EMPTY_FORM: DemoFormValues = {
  inputMode: "fields",
  brand: "",
  model: "",
  regMonth: "",
  regYear: "",
  mileage: "",
  fuel: "",
  gearbox: "",
  power: "",
  price: "",
  currency: "EUR",
  notes: "",
  pasteText: "",
};

/** Prefill used by the "Use an example" affordance in fields mode. */
export const EXAMPLE_FORM: DemoFormValues = {
  inputMode: "fields",
  brand: "Volkswagen",
  model: "Tiguan 2.0 TDI R-Line 4Motion",
  regMonth: "03",
  regYear: "2022",
  mileage: "46800",
  fuel: "diesel",
  gearbox: "automatic",
  power: "147 kW",
  price: "31900",
  currency: "EUR",
  notes: "DSG, first owner, full service history",
  pasteText: "",
};

/** Prefill used by the "Use an example" affordance in paste mode. */
export const EXAMPLE_PASTE =
  "Volkswagen Tiguan 2.0 TDI R-Line 4Motion, 03/2022, 46,800 km, diesel, automatic, 147 kW, asking price 31,900 EUR. DSG, first owner, full service history";

export const PASTE_MAX_LENGTH = 500;
export const PASTE_MIN_LENGTH = 12;

export type DemoFieldError =
  | "brandRequired"
  | "modelRequired"
  | "yearRequired"
  | "yearRange"
  | "mileageRequired"
  | "mileageRange"
  | "priceRequired"
  | "priceRange"
  | "pasteRequired"
  | "pasteTooShort";

export type DemoFormErrors = Partial<
  Record<keyof DemoFormValues, DemoFieldError>
>;

/** Digits only — dealers paste "46.800", "46 800" and "46,800" alike. */
export function parseDigits(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  if (!cleaned) return undefined;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function validateDemoForm(values: DemoFormValues): DemoFormErrors {
  const errors: DemoFormErrors = {};

  if (!values.brand.trim()) errors.brand = "brandRequired";
  if (!values.model.trim()) errors.model = "modelRequired";

  const year = parseDigits(values.regYear);
  if (!values.regYear.trim()) errors.regYear = "yearRequired";
  else if (year == null || year < EARLIEST_YEAR || year > CURRENT_YEAR + 1) {
    errors.regYear = "yearRange";
  }

  const mileage = parseDigits(values.mileage);
  if (!values.mileage.trim()) errors.mileage = "mileageRequired";
  else if (mileage == null || mileage > 1_500_000)
    errors.mileage = "mileageRange";

  const price = parseDigits(values.price);
  if (!values.price.trim()) errors.price = "priceRequired";
  else if (price == null || price < 100 || price > 5_000_000) {
    errors.price = "priceRange";
  }

  return errors;
}

export function isFormComplete(values: DemoFormValues) {
  return Object.keys(validateDemoForm(values)).length === 0;
}

export type DemoPasteError = "pasteRequired" | "pasteTooShort";

export function validatePasteText(text: string): DemoPasteError | undefined {
  const trimmed = text.trim();
  if (!trimmed) return "pasteRequired";
  if (trimmed.length < PASTE_MIN_LENGTH) return "pasteTooShort";
  return undefined;
}

export function isPasteComplete(text: string) {
  return validatePasteText(text) == null;
}

/** Ready to run in whichever mode the visitor is currently using. */
export function isDemoInputReady(values: DemoFormValues) {
  return values.inputMode === "paste"
    ? isPasteComplete(values.pasteText)
    : isFormComplete(values);
}

export function normalizePasteText(text: string) {
  return text.trim().slice(0, PASTE_MAX_LENGTH);
}

/** Builds the upstream `carInput` for the active input mode. */
export function resolveCarInput(values: DemoFormValues) {
  if (values.inputMode === "paste") {
    return normalizePasteText(values.pasteText);
  }
  return buildCarInput(values);
}

function registrationLabel(values: DemoFormValues) {
  const year = values.regYear.trim();
  if (!year) return "";
  const month = values.regMonth.trim();
  return month ? `${month.padStart(2, "0")}/${year}` : year;
}

/**
 * Builds the single offer line upstream expects. Kept plain ASCII with simple
 * separators: the parser reads "46800 km" more reliably than "46.800 km", and
 * the contract caps `carInput` at 500 characters.
 */
export function buildCarInput(values: DemoFormValues) {
  const brand = resolveBrand(values.brand);
  const parts: string[] = [];

  const headline = [brand, values.model.trim(), values.notes.trim()]
    .filter(Boolean)
    .join(" ");
  if (headline) parts.push(headline);

  const registration = registrationLabel(values);
  if (registration) parts.push(registration);

  const mileage = parseDigits(values.mileage);
  if (mileage != null) parts.push(`${mileage} km`);

  const fuel = FUEL_TERMS[values.fuel];
  if (fuel) parts.push(fuel);

  const gearbox = GEARBOX_TERMS[values.gearbox];
  if (gearbox) parts.push(gearbox);

  const power = values.power.trim();
  if (power) parts.push(power);

  const price = parseDigits(values.price);
  if (price != null) parts.push(`${price} ${values.currency}`);

  return parts.join(", ").slice(0, 500);
}

const STORAGE_KEY = "am.demo.draft.v1";

/**
 * Keeps what the visitor typed across an accidental reload. Session-scoped and
 * versioned so a shape change cannot resurrect an incompatible draft.
 *
 * Read through `useSyncExternalStore`: the snapshot is the raw string, so the
 * server can answer `null` and the client can answer the stored draft without
 * a hydration mismatch. Storage is written to but never subscribed to — the
 * draft only seeds the first render, after which React state owns the values.
 */
export function subscribeToDraft() {
  return () => {};
}

export function getDraftSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getServerDraftSnapshot(): string | null {
  return null;
}

/** Parses a snapshot into a complete form, dropping anything unrecognised. */
export function parseDraft(raw: string | null): DemoFormValues | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<DemoFormValues>;
    const merged = { ...EMPTY_FORM };
    for (const key of Object.keys(EMPTY_FORM) as (keyof DemoFormValues)[]) {
      const value = parsed[key];
      if (key === "inputMode") {
        if (value === "fields" || value === "paste") merged.inputMode = value;
        continue;
      }
      if (typeof value === "string") {
        const max = key === "pasteText" ? PASTE_MAX_LENGTH : 200;
        merged[key] = value.slice(0, max);
      }
    }
    return merged;
  } catch {
    return null;
  }
}

export function writeDraft(values: DemoFormValues) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Private-mode storage quotas are not worth breaking the form over.
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
