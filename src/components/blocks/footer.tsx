import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const EMAIL = "to@auto-margin.com";

const LINKEDIN_URL = "https://linkedin.com/company/auto-margin";
const WHATSAPP_URL = "https://wa.me/+41566185544";

export function Footer() {
  const t = useTranslations("Footer");
  const navigation = [
    { name: t("navigation.product"), href: "/#feature-modern-teams" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.pricing"), href: "/pricing" },
    { name: t("navigation.faq"), href: "/faq" },
  ];

  const legal = [{ name: t("privacy"), href: "/privacy" }];

  return (
    <footer className="bg-background text-foreground pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="container lg:grid lg:grid-rows-[auto,1fr,auto] lg:gap-0">
        {/* Top row: small = left 2x2 nav (Product, About Us / Pricing, FAQ), right = Book a Demo, Contact Us; md+ = single row nav + CTAs */}
        <div className="flex flex-row flex-wrap items-start justify-between gap-6 md:items-center md:gap-4">
          <nav className="md:w-auto">
            {/* Small: 2-col grid — row1: Product, About Us; row2: Pricing, FAQ */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-left md:hidden">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground text-sm font-medium transition-colors hover:opacity-80"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Desktop: single row with all nav links */}
            <ul className="hidden flex-wrap items-center gap-4 gap-y-2 sm:gap-6 md:flex">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground text-sm font-medium transition-colors hover:opacity-80"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-2 md:shrink-0 md:flex-row md:gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
              asChild
            >
              <Link href="/demo">{t("tryDemo")}</Link>
            </Button>
            <Button size="lg" className="w-full md:w-auto" asChild>
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
          </div>
        </div>

        {/* Slogan – start-aligned, above circle in stack order */}
        <div className="mt-16 self-center py-2 text-start md:mt-24 lg:mt-0 lg:py-12">
          <h2 className="text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:-ml-0.5 lg:text-7xl xl:-ml-1 xl:text-8xl">
            <span className="text-foreground block">{t("slogan")}</span>
          </h2>
        </div>

        {/* Bottom row: contact buttons left (same style as "Read our Customer Stories"), attribution + legal right */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 sm:mt-14 sm:flex-row sm:items-end lg:mt-0">
          {/* On mobile: email same width as the two buttons below (wrapper width = buttons row via spacer); sm+ unchanged */}
          <div className="relative inline-flex w-max flex-col gap-2 sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <div className="h-10 w-0 flex-shrink-0 sm:hidden" aria-hidden />
            <Button
              variant="outline"
              className="absolute top-0 right-0 left-0 w-full shadow-md sm:static sm:right-auto sm:left-auto sm:w-auto"
              asChild
            >
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </Button>
            <div className="flex flex-row gap-3 sm:contents">
              <Button variant="outline" className="shadow-md" asChild>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button variant="outline" className="shadow-md" asChild>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:items-end">
            <ul className="flex flex-wrap items-center justify-start gap-6 sm:justify-end">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="text-muted-foreground text-sm">© Automargin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
