import { isUpstreamSourceCountry } from "@/features/demo/contract";
import { isSupportedSourceMarket } from "@/features/demo/markets";

/** Contract limits for `carInput`: free text, 3–500 characters. */
const MIN_INPUT = 3;
const MAX_INPUT = 500;

export function parseDemoRequest(
  body: unknown,
):
  | { ok: true; input: string; sourceCountry: string }
  | { ok: false; response: Response } {
  const raw = body as { input?: unknown; sourceCountry?: unknown } | null;
  const input = typeof raw?.input === "string" ? raw.input.trim() : "";
  const sourceCountry =
    typeof raw?.sourceCountry === "string"
      ? raw.sourceCountry.trim().toUpperCase()
      : "";

  if (input.length < MIN_INPUT || input.length > MAX_INPUT) {
    return {
      ok: false,
      response: Response.json(
        { success: false, code: "invalidInput" },
        { status: 400 },
      ),
    };
  }

  // Upstream accepts uppercase codes only and 400s on anything else; `CH` is a
  // target market, not a source, so it is rejected here rather than upstream.
  if (!isUpstreamSourceCountry(sourceCountry)) {
    return {
      ok: false,
      response: Response.json(
        { success: false, code: "invalidMarket" },
        { status: 400 },
      ),
    };
  }

  // Narrower still: only the markets the demo renders end-to-end are offered.
  if (!isSupportedSourceMarket(sourceCountry)) {
    return {
      ok: false,
      response: Response.json(
        { success: false, code: "unsupportedMarket" },
        { status: 400 },
      ),
    };
  }

  return { ok: true, input, sourceCountry };
}

export function invalidBodyResponse() {
  return Response.json(
    { success: false, code: "invalidBody" },
    { status: 400 },
  );
}
