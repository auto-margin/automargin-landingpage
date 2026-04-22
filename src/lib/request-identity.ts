import { headers } from "next/headers";

import { createHash } from "node:crypto";

function firstIp(value: string) {
  const raw = (value ?? "").split(",")[0]?.trim() ?? "";
  if (!raw) return "";

  // Remove possible port (IPv4:port). Keep IPv6 as-is.
  const ipv4WithPort = raw.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::\d+)?$/);
  if (ipv4WithPort?.[1]) return ipv4WithPort[1];

  // Normalize IPv4-mapped IPv6 addresses like ::ffff:203.0.113.1
  const mapped = raw.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped?.[1]) return mapped[1];

  return raw;
}

export async function getRequestIdentity() {
  const requestHeaders = await headers();
  // Prefer CDN/proxy-provided client IP headers (order matters).
  const forwardedFor = requestHeaders.get("x-forwarded-for") ?? "";
  const vercelForwardedFor = requestHeaders.get("x-vercel-forwarded-for") ?? "";
  const realIp = requestHeaders.get("x-real-ip") ?? "";
  const cfConnectingIp = requestHeaders.get("cf-connecting-ip") ?? "";
  const trueClientIp = requestHeaders.get("true-client-ip") ?? "";

  const userAgent = requestHeaders.get("user-agent") ?? "unknown";
  const acceptLanguage = requestHeaders.get("accept-language") ?? "";

  const ip =
    firstIp(cfConnectingIp) ||
    firstIp(trueClientIp) ||
    firstIp(realIp) ||
    firstIp(vercelForwardedFor) ||
    firstIp(forwardedFor) ||
    "unknown";

  if (ip !== "unknown") {
    return ip;
  }

  // Fallback when IP isn't available: stable per browser-ish fingerprint.
  return createHash("sha256")
    .update(`${userAgent}|${acceptLanguage}`)
    .digest("hex");
}
