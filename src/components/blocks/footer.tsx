import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const SLOGAN_LINE1 = "Less time sorting deals.";
const EMAIL = "to@auto-margin.com";

const LINKEDIN_URL = "https://linkedin.com/company/automargin";
const WHATSAPP_URL = "https://wa.me/+41566185544";

export function Footer() {
  const navigation = [
    { name: "Product", href: "/#feature-modern-teams" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="bg-background text-foreground pt-24 pb-12 lg:pt-32 lg:pb-16">
      <div className="container">
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
              className="w-full rounded-full md:w-auto"
              asChild
            >
              <Link href="/demo">Try Demo</Link>
            </Button>
            <Button size="lg" className="w-full rounded-full md:w-auto" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Slogan – start-aligned, above circle in stack order */}
        <div className="mt-16 text-start md:mt-24 lg:mt-28">
          <h2 className="text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="text-foreground block">{SLOGAN_LINE1}</span>
          </h2>
        </div>

        {/* Bottom row: contact buttons left (same style as "Read our Customer Stories"), attribution + legal right */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 sm:mt-14 sm:flex-row sm:items-end">
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
