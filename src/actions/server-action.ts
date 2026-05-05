"use server";

import { Resend } from "resend";

import { actionClient } from "./safe-action";

import { isHoneypotTriggered, isSubmissionTooFast } from "@/lib/anti-bot";
import { formSchema } from "@/lib/form-schema";
import { checkContactLimit } from "@/lib/rate-limit";
import { getRequestIdentity } from "@/lib/request-identity";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    try {
      if (
        isHoneypotTriggered(parsedInput.website) ||
        isSubmissionTooFast(parsedInput.startedAt)
      ) {
        return {
          success: false,
          code: "INVALID_SUBMISSION",
          message: "Please wait a moment and try again.",
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

      const resendApiKey = process.env.RESEND_API_KEY;
      const resendFromEmail = process.env.RESEND_FROM_EMAIL;
      const contactToEmail = process.env.CONTACT_TO_EMAIL;

      if (!resendApiKey || !resendFromEmail || !contactToEmail) {
        return {
          success: false,
          code: "CONTACT_NOT_CONFIGURED",
          message: "Contact form is temporarily unavailable.",
        };
      }

      const resend = new Resend(resendApiKey);
      const company = parsedInput.company?.trim() || "Not provided";
      const employees = parsedInput.employees?.trim() || "Not provided";
      const html = `
        <h2>New contact form submission</h2>
        <p><strong>Inquiry type:</strong> ${escapeHtml(parsedInput.inquiryType)}</p>
        <p><strong>Name:</strong> ${escapeHtml(parsedInput.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(parsedInput.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Employees:</strong> ${escapeHtml(employees)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(parsedInput.message).replaceAll("\n", "<br />")}</p>
      `;
      const text = [
        "New contact form submission",
        `Inquiry type: ${parsedInput.inquiryType}`,
        `Name: ${parsedInput.name}`,
        `Email: ${parsedInput.email}`,
        `Company: ${company}`,
        `Employees: ${employees}`,
        "Message:",
        parsedInput.message,
      ].join("\n");

      const { data, error } = await resend.emails.send({
        from: resendFromEmail,
        to: [contactToEmail],
        replyTo: parsedInput.email,
        subject: `Contact form: ${parsedInput.inquiryType} from ${parsedInput.name}`,
        html,
        text,
      });

      if (error) {
        console.error("Resend send failed", {
          error,
          to: contactToEmail,
          from: resendFromEmail,
        });
        return {
          success: false,
          code: "EMAIL_SEND_FAILED",
          message: "Unable to submit right now. Please try again shortly.",
        };
      }

      if (!data?.id) {
        console.error("Resend send returned no message id", {
          data,
          to: contactToEmail,
          from: resendFromEmail,
        });
        return {
          success: false,
          code: "EMAIL_NOT_ACCEPTED",
          message: "Unable to submit right now. Please try again shortly.",
        };
      }

      return {
        success: true,
        message: "Form submitted successfully",
      };
    } catch (error) {
      console.error("Unexpected contact form error", error);

      return {
        success: false,
        code: "UNEXPECTED_ERROR",
        message: "Contact form is temporarily unavailable. Please try again.",
      };
    }
  });
