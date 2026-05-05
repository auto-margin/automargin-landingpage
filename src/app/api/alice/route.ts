import {
  findStaticAliceAnswer,
  getAliceAiSuggestions,
  getAliceFallbackCopy,
  getAliceInstructions,
  getAliceUnavailableAnswer,
  resolveAliceLocale,
  type AliceAnswer,
} from "@/features/alice/knowledge";
import { checkAliceLimit } from "@/lib/rate-limit";
import { getRequestIdentity } from "@/lib/request-identity";

export const runtime = "nodejs";

type AliceMessage = {
  role: "user" | "assistant";
  content: string;
};

type AliceRequest = {
  message?: unknown;
  path?: unknown;
  locale?: unknown;
  transcript?: unknown;
};

type AliceResponse = AliceAnswer & {
  source: "static" | "ai" | "fallback";
};

const MAX_MESSAGE_LENGTH = 600;
const MAX_TRANSCRIPT_MESSAGES = 6;
const MODEL = process.env.ALICE_MODEL ?? "gpt-5-nano";

function cleanText(value: unknown, maxLength = MAX_MESSAGE_LENGTH) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanTranscript(value: unknown): AliceMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_TRANSCRIPT_MESSAGES)
    .map((item): AliceMessage | null => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Record<string, unknown>;
      const role = raw.role === "assistant" ? "assistant" : "user";
      const content = cleanText(raw.content, 500);
      if (!content) return null;
      return { role, content };
    })
    .filter((item): item is AliceMessage => Boolean(item));
}

function json(data: AliceResponse, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function unavailableAnswer(locale: ReturnType<typeof resolveAliceLocale>): AliceResponse {
  return {
    source: "fallback",
    ...getAliceUnavailableAnswer(locale),
  };
}

async function callOpenAI({
  message,
  locale,
  path,
  transcript,
}: {
  message: string;
  locale: ReturnType<typeof resolveAliceLocale>;
  path: string;
  transcript: AliceMessage[];
}): Promise<AliceResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return unavailableAnswer(locale);

  const input = [
    ...transcript.map((item) => ({
      role: item.role,
      content: item.content,
    })),
    {
      role: "user" as const,
      content: message,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      instructions: getAliceInstructions(locale, path),
      input,
      max_output_tokens: 220,
      store: false,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return unavailableAnswer(locale);
  }

  const data = (await response.json()) as { output_text?: unknown };
  const answer = cleanText(data.output_text, 1200);

  if (!answer) return unavailableAnswer(locale);

  return {
    source: "ai",
    answer,
    suggestions: getAliceAiSuggestions(locale),
  };
}

export async function POST(request: Request) {
  let body: AliceRequest;
  try {
    body = (await request.json()) as AliceRequest;
  } catch {
    const locale = resolveAliceLocale("en");
    const fallbackCopy = getAliceFallbackCopy(locale);
    return json(
      {
        source: "fallback",
        answer: fallbackCopy.unreadableMessage,
      },
      400,
    );
  }

  const message = cleanText(body.message);
  const path = cleanText(body.path, 160);
  const locale = resolveAliceLocale(body.locale);
  const transcript = cleanTranscript(body.transcript);
  const fallbackCopy = getAliceFallbackCopy(locale);

  if (!message || message.length < 2) {
    return json(
      {
        source: "fallback",
        answer: fallbackCopy.shortMessage,
      },
      400,
    );
  }

  const staticAnswer = findStaticAliceAnswer(locale, message);
  if (staticAnswer) {
    return json({ source: "static", ...staticAnswer });
  }

  try {
    const identity = await getRequestIdentity();
    const rateLimit = await checkAliceLimit(identity);

    if (!rateLimit.ok) {
      return json(
        {
          source: "fallback",
          answer: fallbackCopy.rateLimit,
          suggestions: getAliceAiSuggestions(locale),
        },
        429,
      );
    }
  } catch {
    if (process.env.NODE_ENV === "production") {
      return json(unavailableAnswer(locale), 503);
    }
  }

  try {
    return json(await callOpenAI({ message, locale, path, transcript }));
  } catch {
    return json(unavailableAnswer(locale), 503);
  }
}
