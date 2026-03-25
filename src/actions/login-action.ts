"use server";

import { actionClient } from "./safe-action";

import { isHoneypotTriggered, isSubmissionTooFast } from "@/lib/anti-bot";
import { loginSchema } from "@/lib/auth-schema";
import { checkLoginLimit } from "@/lib/rate-limit";
import { getRequestIdentity } from "@/lib/request-identity";

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    if (
      isHoneypotTriggered(parsedInput.website) ||
      isSubmissionTooFast(parsedInput.startedAt)
    ) {
      return {
        success: false,
        code: "INVALID_SUBMISSION",
        message: "Unable to log in. Please try again.",
      };
    }

    const identity = await getRequestIdentity();
    const rateLimit = await checkLoginLimit(identity);
    if (!rateLimit.ok) {
      return {
        success: false,
        code: "RATE_LIMITED",
        message: "Too many attempts. Please wait a minute and try again.",
      };
    }

    const backendLoginUrl = process.env.BACKEND_LOGIN_URL;
    if (!backendLoginUrl) {
      return {
        success: false,
        code: "LOGIN_NOT_CONFIGURED",
        message: "Login is temporarily unavailable.",
      };
    }

    const response = await fetch(backendLoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        email: parsedInput.email,
        password: parsedInput.password,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        code: "AUTH_FAILED",
        message: "Unable to log in with those credentials.",
      };
    }

    return {
      success: true,
      message: "Logged in successfully.",
    };
  });
