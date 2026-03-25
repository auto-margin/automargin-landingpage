"use server";
import { actionClient } from "./safe-action";

import { isHoneypotTriggered, isSubmissionTooFast } from "@/lib/anti-bot";
import { formSchema } from "@/lib/form-schema";
import { checkContactLimit } from "@/lib/rate-limit";
import { getRequestIdentity } from "@/lib/request-identity";

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    if (
      isHoneypotTriggered(parsedInput.website) ||
      isSubmissionTooFast(parsedInput.startedAt)
    ) {
      return {
        success: false,
        code: "INVALID_SUBMISSION",
        message: "Unable to submit right now. Please try again.",
      };
    }

    const identity = await getRequestIdentity();
    const rateLimit = await checkContactLimit(identity);
    if (!rateLimit.ok) {
      return {
        success: false,
        code: "RATE_LIMITED",
        message: "Too many attempts. Please wait a minute and try again.",
      };
    }

    const backendContactUrl = process.env.BACKEND_CONTACT_URL;
    if (!backendContactUrl) {
      return {
        success: false,
        code: "CONTACT_NOT_CONFIGURED",
        message: "Contact form is temporarily unavailable.",
      };
    }

    const response = await fetch(backendContactUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        name: parsedInput.name,
        email: parsedInput.email,
        company: parsedInput.company ?? "",
        employees: parsedInput.employees ?? "",
        message: parsedInput.message,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        code: "BACKEND_ERROR",
        message: "Unable to submit right now. Please try again shortly.",
      };
    }

    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
