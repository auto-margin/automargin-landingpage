"use server";

import { actionClient } from "./safe-action";

import { isHoneypotTriggered, isSubmissionTooFast } from "@/lib/anti-bot";
import { signupSchema } from "@/lib/auth-schema";
import { checkSignupLimit } from "@/lib/rate-limit";
import { getRequestIdentity } from "@/lib/request-identity";

export const signupAction = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput }) => {
    if (
      isHoneypotTriggered(parsedInput.website) ||
      isSubmissionTooFast(parsedInput.startedAt)
    ) {
      return {
        success: false,
        code: "INVALID_SUBMISSION",
        message: "Unable to sign up. Please try again.",
      };
    }

    const identity = await getRequestIdentity();
    const rateLimit = await checkSignupLimit(identity);
    if (!rateLimit.ok) {
      return {
        success: false,
        code: "RATE_LIMITED",
        message: "Too many attempts. Please wait a minute and try again.",
      };
    }

    const backendSignupUrl = process.env.BACKEND_SIGNUP_URL;
    if (!backendSignupUrl) {
      return {
        success: false,
        code: "SIGNUP_NOT_CONFIGURED",
        message: "Sign up is temporarily unavailable.",
      };
    }

    const response = await fetch(backendSignupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        name: parsedInput.name,
        email: parsedInput.email,
        password: parsedInput.password,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        code: "SIGNUP_FAILED",
        message: "Unable to create account right now.",
      };
    }

    return {
      success: true,
      message: "Account created successfully.",
    };
  });
