import { headers } from "next/headers";

import { createHash } from "node:crypto";

export async function getRequestIdentity() {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for") ?? "";
  const realIp = requestHeaders.get("x-real-ip") ?? "";
  const userAgent = requestHeaders.get("user-agent") ?? "unknown";
  const ip = forwardedFor.split(",")[0]?.trim() || realIp || "unknown";

  if (ip !== "unknown") {
    return ip;
  }

  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
}
