import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { AppChrome } from "@/components/app-chrome";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Auto-margin - Better deals, better intake",
    template: "%s | Auto-margin",
  },
  description:
    "Auto-margin helps dealers review incoming offers, control intake, and focus on the suppliers and cars that create margin.",
  keywords: [
    "Auto-margin",
    "car offer",
    "profitability",
    "market intelligence",
    "car sourcing",
    "car trading",
    "dealer intake",
    "supplier management",
    "car comparison",
    "car pricing",
    "car market",
    "car market intelligence",
    "car market comparison",
  ],
  authors: [{ name: "Auto-margin" }],
  creator: "Auto-margin",
  publisher: "Auto-margin",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "Auto-margin - Better deals, better intake",
    description:
      "Auto-margin helps dealers review incoming offers, control intake, and focus on the suppliers and cars that create margin.",
    siteName: "Auto-margin",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Auto-margin - Better deals, better intake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto-margin - Better deals, better intake",
    description:
      "Auto-margin helps dealers review incoming offers, control intake, and focus on the suppliers and cars that create margin.",
    images: ["/og-image.jpg"],
    creator: "@auto-margin",
    site: "https://auto-margin.com",
  },
  alternates: {
    canonical: "https://auto-margin.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const h = await headers();
  const locale = h.get("x-next-intl-locale") ?? "en";

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <AppChrome>{children}</AppChrome>
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
