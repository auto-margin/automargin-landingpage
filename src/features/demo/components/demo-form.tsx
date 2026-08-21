"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";

import { Car, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BrandField } from "@/features/demo/components/brand-field";
import {
  INSET_CONTROL,
  INSET_TRIGGER,
  InsetField,
} from "@/features/demo/components/inset-field";
import {
  CURRENCY_OPTIONS,
  CURRENT_YEAR,
  type DemoFormErrors,
  type DemoFormValues,
  type DemoInputMode,
  EARLIEST_YEAR,
  EXAMPLE_FORM,
  EXAMPLE_PASTE,
  FUEL_OPTIONS,
  GEARBOX_OPTIONS,
  PASTE_MAX_LENGTH,
  validateDemoForm,
  validatePasteText,
} from "@/features/demo/form-model";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const ANY = "any";

/** Tailwind `sm` is 640px — below that the demo is paste-only. */
const PASTE_ONLY_MQ = "(max-width: 639px)";

function subscribePasteOnlyViewport(onChange: () => void) {
  const mq = window.matchMedia(PASTE_ONLY_MQ);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPasteOnlyViewport() {
  return window.matchMedia(PASTE_ONLY_MQ).matches;
}

/** Mobile/narrow viewports only expose paste — fields stay in state for desktop. */
function usePasteOnlyViewport() {
  return useSyncExternalStore(
    subscribePasteOnlyViewport,
    getPasteOnlyViewport,
    () => false,
  );
}

/** Visual order of the required fields; drives focus on a failed submit. */
const REQUIRED_ORDER: (keyof DemoFormValues)[] = [
  "brand",
  "model",
  "regYear",
  "mileage",
  "price",
];

/**
 * Radix keeps a hidden native `<select>` in sync with the controlled value, but
 * its `<option>` list only exists while the dropdown is open. When the value
 * changes with the dropdown closed — restoring a saved draft, for instance —
 * the browser cannot match it, and Radix bubbles the resulting empty string
 * back through `onValueChange`, silently wiping the field. A real selection
 * always carries one of the listed values, so anything else is dropped.
 */
function onlyKnown(
  options: readonly string[],
  apply: (value: string) => void,
): (value: string) => void {
  return (value) => {
    if (!options.includes(value)) return;
    apply(value);
  };
}

const YEARS = Array.from(
  { length: CURRENT_YEAR + 1 - EARLIEST_YEAR + 1 },
  (_, index) => String(CURRENT_YEAR + 1 - index),
);

const MONTHS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);

/** Quiet divider-style heading: the workspace already carries the big badge. */
function SectionHeading({
  id,
  icon,
  title,
  subtitle,
  trailing,
  /** Mobile paste-only: workspace already shows the title — keep a11y only. */
  visuallyHidden = false,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  trailing?: React.ReactNode;
  visuallyHidden?: boolean;
}) {
  if (visuallyHidden) {
    return (
      <h2 id={id} className="sr-only">
        {title}
      </h2>
    );
  }

  return (
    <header className="border-border/60 flex flex-col gap-3 border-b pb-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
      <h2 id={id} className="sr-only">
        {title}
      </h2>
      <div
        className="hidden min-w-0 flex-1 items-center gap-x-3 gap-y-1 sm:flex sm:flex-wrap"
        aria-hidden
      >
        <p className="text-foreground ml-0.25 flex items-center gap-2 text-sm leading-none font-medium select-none">
          <span className="text-muted-foreground">{icon}</span>
          {title}
        </p>
        <div className="text-muted-foreground text-xs">{subtitle}</div>
      </div>
      {trailing}
    </header>
  );
}

function InputModeSwitch({
  value,
  onChange,
  disabled,
  pasteLabel,
  fieldsLabel,
  label,
}: {
  value: DemoInputMode;
  onChange: (mode: DemoInputMode) => void;
  disabled: boolean;
  pasteLabel: string;
  fieldsLabel: string;
  label: string;
}) {
  const options: { mode: DemoInputMode; optionLabel: string }[] = [
    { mode: "paste", optionLabel: pasteLabel },
    { mode: "fields", optionLabel: fieldsLabel },
  ];

  return (
    <div
      role="tablist"
      aria-label={label}
      className="bg-muted/60 flex w-full rounded-lg p-1 sm:inline-flex sm:w-auto sm:shrink-0"
    >
      {options.map(({ mode, optionLabel }) => {
        const selected = value === mode;
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={disabled}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:flex-none",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
              selected
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              disabled && "pointer-events-none opacity-50",
            )}
            onClick={() => onChange(mode)}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
}

type DemoFormProps = {
  values: DemoFormValues;
  onChange: (patch: Partial<DemoFormValues>) => void;
  onSubmit: (snapshot: DemoFormValues) => void;
  onReplace: (values: DemoFormValues) => void;
  disabled: boolean;
};

export function DemoForm({
  values,
  onChange,
  onSubmit,
  onReplace,
  disabled,
}: DemoFormProps) {
  const t = useTranslations("DemoPage.form");
  const tw = useTranslations("DemoPage.workspace");
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const uid = useId();
  const pasteOnlyViewport = usePasteOnlyViewport();

  const errors: DemoFormErrors = useMemo(
    () => validateDemoForm(values),
    [values],
  );
  const errorCount = Object.keys(errors).length;

  const fieldId = (name: string) => `${uid}-${name}`;

  function errorFor(name: keyof DemoFormValues) {
    const code = errors[name];
    if (!code) return undefined;
    if (!showErrors && !touched[name]) return undefined;
    return t(`errors.${code}`);
  }

  function markTouched(name: keyof DemoFormValues) {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  }

  const isPasteMode = pasteOnlyViewport || values.inputMode === "paste";

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (disabled) return;

    if (isPasteMode) {
      const pasteError = validatePasteText(values.pasteText);
      if (pasteError) {
        setShowErrors(true);
        setTimeout(() => {
          document.getElementById(fieldId("pasteText"))?.focus();
        }, 0);
        return;
      }
      onSubmit({ ...values, inputMode: "paste" });
      return;
    }

    if (errorCount > 0) {
      setShowErrors(true);
      // Focus after the errors have rendered, so the field announces the
      // message that is now wired to it through aria-describedby.
      const firstInvalid = REQUIRED_ORDER.find((name) => errors[name]);
      if (firstInvalid) {
        setTimeout(() => {
          document.getElementById(fieldId(firstInvalid))?.focus();
        }, 0);
      }
      return;
    }
    onSubmit({ ...values, inputMode: "fields" });
  }

  const describedBy = (name: string, error?: string) =>
    error ? `${fieldId(name)}-error` : undefined;

  const brandError = errorFor("brand");
  const modelError = errorFor("model");
  const yearError = errorFor("regYear");
  const mileageError = errorFor("mileage");
  const priceError = errorFor("price");

  const pasteErrorCode = validatePasteText(values.pasteText);
  const pasteError =
    showErrors && pasteErrorCode ? t(`errors.${pasteErrorCode}`) : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("space-y-8", pasteOnlyViewport && "space-y-5")}
    >
      <section
        aria-labelledby={`${uid}-vehicle`}
        className={cn("space-y-5", pasteOnlyViewport && "space-y-4")}
      >
        <SectionHeading
          id={`${uid}-vehicle`}
          icon={<Car className="size-4" aria-hidden />}
          title={t("vehicleTitle")}
          visuallyHidden={pasteOnlyViewport}
          subtitle={
            // Stack both copy lines so switching modes never shifts the header.
            <span className="grid">
              <span
                className={cn(
                  "col-start-1 row-start-1",
                  !isPasteMode && "invisible",
                )}
              >
                {t("vehicleSubtitlePaste")}
              </span>
              <span
                className={cn(
                  "col-start-1 row-start-1",
                  isPasteMode && "invisible",
                )}
              >
                {t("vehicleSubtitle")}
              </span>
            </span>
          }
          trailing={
            <div className="hidden w-full sm:block sm:w-auto">
              <InputModeSwitch
                value={values.inputMode}
                disabled={disabled}
                label={t("inputModeLabel")}
                pasteLabel={t("inputModePaste")}
                fieldsLabel={t("inputModeFields")}
                onChange={(inputMode) => {
                  onChange({ inputMode });
                  setShowErrors(false);
                }}
              />
            </div>
          }
        />

        {/*
          Desktop: both modes share one grid cell so toggling never jumps the
          footer. Mobile is paste-only — fields stay out of the DOM layout so
          they cannot inflate the card height.
        */}
        <div className={pasteOnlyViewport ? undefined : "grid"}>
          <div
            className={cn(
              pasteOnlyViewport
                ? "flex min-h-0 flex-col"
                : "col-start-1 row-start-1 flex min-h-0 flex-col",
              // Always show paste below `sm`; on larger screens follow the mode.
              !isPasteMode && "sm:invisible",
            )}
            inert={
              !isPasteMode && !pasteOnlyViewport ? true : undefined
            }
          >
            <InsetField
              id={fieldId("pasteText")}
              label={t("pasteLabel")}
              error={pasteError}
              className={cn(
                "flex min-h-0 flex-col",
                !pasteOnlyViewport &&
                  "flex-1 [&>div:first-child]:flex [&>div:first-child]:min-h-0 [&>div:first-child]:flex-1 [&>div:first-child]:flex-col",
              )}
            >
              <Textarea
                id={fieldId("pasteText")}
                rows={pasteOnlyViewport ? 4 : 5}
                value={values.pasteText}
                disabled={disabled}
                maxLength={PASTE_MAX_LENGTH}
                placeholder={t("pastePlaceholder")}
                aria-invalid={Boolean(pasteError) || undefined}
                aria-describedby={describedBy("pasteText", pasteError)}
                className={cn(
                  INSET_CONTROL,
                  "resize-none leading-relaxed",
                  pasteOnlyViewport ? "min-h-24" : "min-h-28 flex-1",
                )}
                onChange={(event) =>
                  onChange({
                    pasteText: event.target.value.slice(0, PASTE_MAX_LENGTH),
                  })
                }
              />
            </InsetField>
          </div>

          {!pasteOnlyViewport && (
          <div
            className={cn(
              "col-start-1 row-start-1",
              isPasteMode && "invisible",
            )}
            inert={isPasteMode ? true : undefined}
          >
            <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          <InsetField
            id={fieldId("brand")}
            label={t("brand")}
            error={brandError}
          >
            <BrandField
              id={fieldId("brand")}
              value={values.brand}
              onChange={(brand) => onChange({ brand })}
              onBlur={() => markTouched("brand")}
              disabled={disabled}
              invalid={Boolean(brandError)}
              describedBy={describedBy("brand", brandError)}
              placeholder={t("brandPlaceholder")}
              listLabel={t("brandListLabel")}
              freeTextHint={t("brandFreeText")}
              openLabel={t("brandToggle")}
            />
          </InsetField>

          <InsetField
            id={fieldId("model")}
            label={t("model")}
            error={modelError}
          >
            <Input
              id={fieldId("model")}
              className={INSET_CONTROL}
              value={values.model}
              disabled={disabled}
              maxLength={80}
              autoComplete="off"
              aria-invalid={Boolean(modelError) || undefined}
              aria-describedby={describedBy("model", modelError)}
              placeholder={t("modelPlaceholder")}
              onChange={(event) => onChange({ model: event.target.value })}
              onBlur={() => markTouched("model")}
            />
          </InsetField>

          <InsetField
            id={fieldId("regYear")}
            label={t("registration")}
            error={yearError}
          >
            <div className="flex items-center gap-1">
              <Select
                value={values.regMonth || ANY}
                disabled={disabled}
                onValueChange={onlyKnown([ANY, ...MONTHS], (month) =>
                  onChange({ regMonth: month === ANY ? "" : month }),
                )}
              >
                <SelectTrigger
                  aria-label={t("registrationMonth")}
                  className={cn(INSET_TRIGGER, "w-20 shrink-0")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>{t("monthAny")}</SelectItem>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-muted-foreground shrink-0" aria-hidden>
                /
              </span>

              <Select
                value={values.regYear}
                disabled={disabled}
                onValueChange={onlyKnown(YEARS, (regYear) => {
                  onChange({ regYear });
                  markTouched("regYear");
                })}
              >
                <SelectTrigger
                  id={fieldId("regYear")}
                  aria-label={t("registrationYear")}
                  aria-invalid={Boolean(yearError) || undefined}
                  aria-describedby={describedBy("regYear", yearError)}
                  className={INSET_TRIGGER}
                >
                  <SelectValue placeholder={t("registrationYear")} />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </InsetField>

          <InsetField
            id={fieldId("mileage")}
            label={t("mileage")}
            error={mileageError}
          >
            <div className="flex items-center gap-2">
              <Input
                id={fieldId("mileage")}
                className={INSET_CONTROL}
                value={values.mileage}
                disabled={disabled}
                inputMode="numeric"
                maxLength={9}
                autoComplete="off"
                aria-invalid={Boolean(mileageError) || undefined}
                aria-describedby={describedBy("mileage", mileageError)}
                placeholder="46800"
                onChange={(event) =>
                  onChange({
                    mileage: event.target.value.replace(/[^\d\s.,]/g, ""),
                  })
                }
                onBlur={() => markTouched("mileage")}
              />
              <span
                className="text-muted-foreground shrink-0 text-sm"
                aria-hidden
              >
                km
              </span>
            </div>
          </InsetField>

          <InsetField id={fieldId("fuel")} label={t("fuel")}>
            <Select
              value={values.fuel || ANY}
              disabled={disabled}
              onValueChange={onlyKnown([ANY, ...FUEL_OPTIONS], (fuel) =>
                onChange({ fuel: fuel === ANY ? "" : fuel }),
              )}
            >
              <SelectTrigger id={fieldId("fuel")} className={INSET_TRIGGER}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>{t("notSpecified")}</SelectItem>
                {FUEL_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {t(`fuelOptions.${option}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InsetField>

          <InsetField id={fieldId("gearbox")} label={t("gearbox")}>
            <Select
              value={values.gearbox || ANY}
              disabled={disabled}
              onValueChange={onlyKnown([ANY, ...GEARBOX_OPTIONS], (gearbox) =>
                onChange({ gearbox: gearbox === ANY ? "" : gearbox }),
              )}
            >
              <SelectTrigger id={fieldId("gearbox")} className={INSET_TRIGGER}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>{t("notSpecified")}</SelectItem>
                {GEARBOX_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {t(`gearboxOptions.${option}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InsetField>

          <InsetField
            id={fieldId("price")}
            label={t("price")}
            error={priceError}
          >
            <div className="flex items-center gap-2">
              <Input
                id={fieldId("price")}
                className={INSET_CONTROL}
                value={values.price}
                disabled={disabled}
                inputMode="numeric"
                maxLength={10}
                autoComplete="off"
                aria-invalid={Boolean(priceError) || undefined}
                aria-describedby={describedBy("price", priceError)}
                placeholder="31900"
                onChange={(event) =>
                  onChange({
                    price: event.target.value.replace(/[^\d\s.,]/g, ""),
                  })
                }
                onBlur={() => markTouched("price")}
              />
              <Select
                value={values.currency}
                disabled={disabled}
                onValueChange={onlyKnown(CURRENCY_OPTIONS, (currency) =>
                  onChange({ currency }),
                )}
              >
                <SelectTrigger
                  aria-label={t("currency")}
                  className={cn(INSET_TRIGGER, "w-16 shrink-0")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </InsetField>

          <InsetField
            id={fieldId("power")}
            label={t("power")}
            note={t("optional")}
          >
            <Input
              id={fieldId("power")}
              className={INSET_CONTROL}
              value={values.power}
              disabled={disabled}
              maxLength={24}
              autoComplete="off"
              placeholder="147 kW"
              onChange={(event) => onChange({ power: event.target.value })}
            />
          </InsetField>

          <InsetField
            id={fieldId("notes")}
            label={t("notes")}
            note={t("optional")}
            className="sm:col-span-2 lg:col-span-3"
          >
            <Textarea
              id={fieldId("notes")}
              rows={2}
              value={values.notes}
              disabled={disabled}
              maxLength={200}
              placeholder={t("notesPlaceholder")}
              className={cn(INSET_CONTROL, "min-h-12 resize-none")}
              onChange={(event) => onChange({ notes: event.target.value })}
            />
          </InsetField>
            </div>
          </div>
          )}
        </div>
      </section>

      <div
        className={cn(
          "border-border/60 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
          pasteOnlyViewport && "gap-3 border-t-0 pt-1",
        )}
      >        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="submit"
            size="lg"
            disabled={disabled}
            className="h-12 flex-1 px-8 text-[0.95rem] leading-none sm:flex-none"
          >
            {t("submit")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="h-12 gap-2"
            disabled={disabled}
            onClick={() => {
              if (isPasteMode) {
                onReplace({
                  ...values,
                  inputMode: pasteOnlyViewport ? values.inputMode : "paste",
                  pasteText: EXAMPLE_PASTE,
                });
              } else {
                onReplace({ ...EXAMPLE_FORM, pasteText: values.pasteText });
              }
              setShowErrors(false);
              setTouched({});
            }}
          >
            <Wand2 className="size-4" aria-hidden />
            {t("useExample")}
          </Button>
        </div>

        {/* Sits with the submit button: this is the moment the visitor agrees
            to it, and it replaces the running "x of y fields" commentary. */}
        <div className="text-muted-foreground space-y-1 text-xs leading-relaxed sm:max-w-sm sm:text-left">
          <p>{tw("rateLimitNotice")}</p>
          <p>
            {tw("privacyAgreement")}{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              {tw("privacyLink")}
            </Link>
            .
          </p>
          <p>{tw("abuseNotice")}</p>
        </div>
      </div>
    </form>
  );
}
