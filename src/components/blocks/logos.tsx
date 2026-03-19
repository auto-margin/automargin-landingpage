import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { cn } from "@/lib/utils";

type Company = {
  name: string;
  logo: string;
  hoverLogo: string;
  width: number;
  height: number;
  href: string;
  /** If true, default logo is shown at full opacity (no fade). */
  fullOpacity?: boolean;
};

export const Logos = () => {
  const topRowCompanies = [
    {
      name: "Lacentrale",
      logo: "/markets/lacentrale2.svg",
      hoverLogo: "/markets/lacentrale.svg",
      width: 152,
      height: 32,
      href: "https://lacentrale.fr",
    },
    {
      name: "Autoscout",
      logo: "/markets/autoscout2.svg",
      hoverLogo: "/markets/autoscout.svg",
      width: 184,
      height: 32,
      href: "https://autoscout24.at",
    },
    {
      name: "Mobile.de",
      logo: "/markets/mobilede2.svg",
      hoverLogo: "/markets/mobilede.svg",
      width: 162,
      height: 32,
      href: "https://mobile.de",
    },
    {
      name: "Autobazar",
      logo: "/markets/autobazar2.svg",
      hoverLogo: "/markets/autobazar.svg",
      width: 152,
      height: 32,
      href: "https://www.autobazar.eu",
    },
  ];

  const bottomRowCompanies = [
    {
      name: "Otomoto",
      logo: "/markets/otomoto2.svg",
      hoverLogo: "/markets/otomoto.svg",
      width: 138,
      height: 32,
      href: "https://otomoto.pl",
    },
    {
      name: "Cochenet",
      logo: "/markets/cochenet2.svg",
      hoverLogo: "/markets/cochenet.svg",
      width: 132,
      height: 32,
      href: "https://cochenet.net",
    },
    {
      name: "Sauto",
      logo: "/markets/sauto2.svg",
      hoverLogo: "/markets/sauto.svg",
      width: 126,
      height: 32,
      href: "https://sauto.cz",
    },
    {
      name: "Autogidas",
      logo: "/markets/autogidas2.svg",
      hoverLogo: "/markets/autogidas.svg",
      width: 85,
      height: 32,
      href: "https://autogidas.lt/",
    },
    {
      name: "Trusted.eu",
      logo: "/markets/trusted-eu2.svg",
      hoverLogo: "/markets/trusted-eu.svg",
      width: 116,
      height: 32,
      href: "https://trusted.eu",
      fullOpacity: true,
    },
  ];

  return (
    <section className="overflow-hidden pt-8 pb-28 lg:pt-0 lg:pb-32">
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            We cover all the biggest markets. <br className="max-md:hidden" />
            <span className="text-muted-foreground">
              From dealer networks down to car prices.
            </span>
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 4 logos */}
          <LogoRow companies={topRowCompanies} gridClassName="grid-cols-4" />

          {/* Bottom row - 5 logos */}
          <LogoRow
            companies={bottomRowCompanies}
            gridClassName="grid-cols-5"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

type LogoRowProps = {
  companies: Company[];
  gridClassName: string;
  direction?: "left" | "right";
};

const LogoRow = ({ companies, gridClassName, direction }: LogoRowProps) => {
  return (
    <>
      {/* Desktop static version */}
      <div className="hidden md:block">
        <div
          className={cn(
            "grid items-center justify-items-center gap-x-20 lg:gap-x-28",
            gridClassName,
          )}
        >
          {companies.map((company, index) => (
            <Link
              href={company.href}
              target="_blank"
              key={index}
              className="group relative inline-flex items-center justify-center"
            >
              {/* Default (grayscale) logo */}
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className={cn(
                  "object-contain transition-opacity group-hover:opacity-0",
                  company.fullOpacity ? "opacity-100" : "opacity-30",
                )}
              />
              {/* Hover (color) logo */}
              <Image
                src={company.hoverLogo}
                alt=""
                width={company.width}
                height={company.height}
                className="pointer-events-none absolute inset-0 object-contain opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile marquee version */}
      <div className="md:hidden">
        <Marquee direction={direction} pauseOnHover>
          {companies.map((company, index) => (
            <Link
              href={company.href}
              target="_blank"
              key={index}
              className="group relative mx-8 inline-flex items-center justify-center"
            >
              {/* Default (grayscale) logo */}
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className={cn(
                  "object-contain transition-opacity group-hover:opacity-0",
                  company.fullOpacity ? "opacity-100" : "opacity-90",
                )}
              />
              {/* Hover (color) logo */}
              <Image
                src={company.hoverLogo}
                alt=""
                width={company.width}
                height={company.height}
                className="pointer-events-none absolute inset-0 object-contain opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </>
  );
};
