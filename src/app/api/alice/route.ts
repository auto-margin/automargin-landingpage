import {
  ALICE_SITE_CONTEXT,
  findStaticAliceAnswer,
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

function unavailableAnswer(): AliceResponse {
  return {
    source: "fallback",
    answer:
      "I can answer common Auto-margin questions here, but the assistant fallback is temporarily unavailable. For anything specific, use the [Contact page](/contact) or email to@auto-margin.com.",
    suggestions: ["How does pricing work?", "What does Auto-margin do?"],
  };
}

function buildInstructions(path: string) {
  return `You are ALICE, the concise assistant for the Auto-margin landing page.
Use only the provided Auto-margin context and the current conversation.
If the user asks for something outside Auto-margin, politely say you can only help with Auto-margin, its website, pricing, demo, guidebook, contact, and product information.
Do not invent prices, legal claims, integrations, guarantees, or availability.
Prefer directing users to the Contact page at /contact for sales, partnership, support, custom pricing, account, or private-data questions.
Keep answers under 90 words.
Current page path: ${path || "/"}

Auto-margin context:
${ALICE_SITE_CONTEXT}`;
}

async function callOpenAI({
  message,
  path,
  transcript,
}: {
  message: string;
  path: string;
  transcript: AliceMessage[];
}): Promise<AliceResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return unavailableAnswer();

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
      instructions: buildInstructions(path),
      input,
      max_output_tokens: 220,
      store: false,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return unavailableAnswer();
  }

  const data = (await response.json()) as { output_text?: unknown };
  const answer = cleanText(data.output_text, 1200);

  if (!answer) return unavailableAnswer();

  return {
    source: "ai",
    answer,
    suggestions: ["Contact sales", "Try the demo"],
  };
}

export async function POST(request: Request) {
  let body: AliceRequest;
  try {
    body = (await request.json()) as AliceRequest;
  } catch {
    return json(
      {
        source: "fallback",
        answer: "I could not read that message. Please try again.",
      },
      400,
    );
  }

  const message = cleanText(body.message);
  const path = cleanText(body.path, 160);
  const transcript = cleanTranscript(body.transcript);

  if (!message || message.length < 2) {
    return json(
      {
        source: "fallback",
        answer: "Send me a short question about Auto-margin and I will help.",
      },
      400,
    );
  }

  const staticAnswer = findStaticAliceAnswer(message);
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
          answer:
            "I have reached the question limit for this browser/IP window. I can still help with common Auto-margin topics like pricing, demo, files, markets, and contact.",
          suggestions: ["How does pricing work?", "Contact sales"],
        },
        429,
      );
    }
  } catch {
    if (process.env.NODE_ENV === "production") {
      return json(unavailableAnswer(), 503);
    }
  }

  try {
    return json(await callOpenAI({ message, path, transcript }));
  } catch {
    return json(unavailableAnswer(), 503);
  }
}
