type DemoRequest = {
  input: string;
  sourceCountry: string;
};

export function parseDemoRequest(body: unknown):
  | { ok: true; input: string; sourceCountry: string }
  | { ok: false; response: Response } {
  const input =
    typeof (body as any)?.input === "string" ? (body as any).input.trim() : "";
  const sourceCountry =
    typeof (body as any)?.sourceCountry === "string"
      ? (body as any).sourceCountry.trim()
      : "";

  if (!input || input.length < 10) {
    return {
      ok: false,
      response: Response.json(
        { success: false, message: "Please enter a longer car description." },
        { status: 400 },
      ),
    };
  }

  if (!sourceCountry) {
    return {
      ok: false,
      response: Response.json(
        { success: false, message: "Please select a source country." },
        { status: 400 },
      ),
    };
  }

  return { ok: true, input, sourceCountry };
}

export function invalidBodyResponse() {
  return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
}

