"use client";

import { useMemo } from "react";

import { useRouter as useNextRouter } from "next/navigation";

import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const LOCALES: ReadonlyArray<{
  locale: Locale;
  label: string;
}> = [
  { locale: "en", label: "EN" },
  { locale: "sv", label: "SV" },
  { locale: "de", label: "DE" },
  { locale: "es", label: "ES" },
  { locale: "dk", label: "DK" },
] as const;

const LOCALE_NAMES: Record<Locale, Record<Locale, string>> = {
  en: {
    en: "English",
    sv: "Swedish",
    de: "German",
    es: "Spanish",
    dk: "Danish",
  },
  sv: {
    en: "Engelska",
    sv: "Svenska",
    de: "Tyska",
    es: "Spanska",
    dk: "Danska",
  },
  de: {
    en: "Englisch",
    sv: "Schwedisch",
    de: "Deutsch",
    es: "Spanisch",
    dk: "Dänisch",
  },
  es: {
    en: "Inglés",
    sv: "Sueco",
    de: "Alemán",
    es: "Español",
    dk: "Danés",
  },
  dk: {
    en: "Engelsk",
    sv: "Svensk",
    de: "Tysk",
    es: "Spansk",
    dk: "Dansk",
  },
};

function setLocaleCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function LanguageSelector() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  const safePathname = useMemo(() => {
    // Guard against weird relative values that would create `/sv/en`.
    if (!pathname) return "/";
    if (pathname.startsWith("/")) return pathname;
    return `/${pathname}`;
  }, [pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label={t("language")}
          title={t("language")}
        >
          <Globe className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {LOCALES.map((opt) => {
          const active = opt.locale === locale;
          return (
            <DropdownMenuItem
              key={opt.locale}
              onSelect={() => {
                if (active) return;
                setLocaleCookie(opt.locale);
                router.replace(safePathname, { locale: opt.locale });
                nextRouter.refresh();
              }}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-sm">{LOCALE_NAMES[locale][opt.locale]}</span>
              {active ? <Check className="size-4 opacity-70" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
