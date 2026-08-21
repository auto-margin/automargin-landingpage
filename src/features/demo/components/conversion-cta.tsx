"use client";

import { useEffect, useState } from "react";

import { ArrowRight, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dialog } from "radix-ui";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Small delayed CTA after the visitor has skimmed the numbers. Portaled as a
 * dialog so it never grows the result layout.
 */
const REVEAL_DELAY_MS = 16000;

const BENEFIT_KEYS = ["0", "1", "2"] as const;

export function ConversionCta({
  onCtaClick,
}: {
  onCtaClick: (target: "contact" | "pricing") => void;
}) {
  const t = useTranslations("DemoPage.cta");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), REVEAL_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          aria-describedby="demo-cta-body"
          className="bg-card border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-5 shadow-xl sm:p-6"
        >
          <Dialog.Close
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
            aria-label={t("dismiss")}
          >
            <X className="size-4" aria-hidden />
          </Dialog.Close>

          <Dialog.Title className="text-foreground pr-8 text-lg font-semibold tracking-tight text-balance">
            {t("title")}
          </Dialog.Title>
          <Dialog.Description
            id="demo-cta-body"
            className="text-muted-foreground mt-2 text-sm leading-relaxed"
          >
            {t("body")}
          </Dialog.Description>

          <ul className="mt-4 space-y-2">
            {BENEFIT_KEYS.map((key) => (
              <li
                key={key}
                className="text-foreground flex items-start gap-2 text-sm"
              >
                <Check
                  className="text-primary dark:text-foreground mt-0.5 size-4 shrink-0"
                  aria-hidden
                />
                {t(`benefits.${key}`)}
              </li>
            ))}
            <li className="text-muted-foreground pl-6 text-sm">
              {t("benefits.more")}
            </li>
          </ul>

          <div className="mt-5">
            <Button
              asChild
              size="lg"
              className="h-11 w-full gap-2 text-[0.95rem] leading-none"
              onClick={() => onCtaClick("contact")}
            >
              <Link href="/contact">
                {t("primary")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
