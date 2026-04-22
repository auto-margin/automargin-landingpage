import type { MetadataRoute } from "next";

function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "https://auto-margin.com";
  return raw.replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const routes = [
    "/",
    "/about",
    "/pricing",
    "/faq",
    "/contact",
    "/enterprise",
    "/privacy",
    "/browser-extension",
    "/demo",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
