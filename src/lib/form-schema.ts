import * as z from "zod";

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

const lettersAndSpaces = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const messageAllowedChars = /^[A-Za-z0-9 !?,.\n\r]+$/;

function hasOnlyNumbers1To99(input: string) {
  const matches = input.match(/\d+/g);
  if (!matches) return true;
  return matches.every((raw) => {
    const num = Number(raw);
    return Number.isInteger(num) && num >= 1 && num <= 99;
  });
}

export const formSchema = z.object({
  inquiryType: z
    .enum(["registration", "business", "careers", "other"], {
      message: "Please select an item",
    }),
  name: z
    .string({ message: "Full name is required" })
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(25, "Full name must be 25 characters or less")
    .regex(lettersAndSpaces, "Full name can only contain letters a–z"),
  email: z
    .string({ message: "Email address is required" })
    .trim()
    .min(5, "Email address must be at least 5 characters")
    .max(40, "Email address must be 40 characters or less")
    .email("Please enter a valid email address"),
  company: z
    .string()
    .trim()
    .max(35, "Company name must be 35 characters or less")
    .refine((value) => value === "" || value.length >= 3, {
      message: "Company name must be at least 3 characters",
    })
    .refine((value) => value === "" || lettersAndSpaces.test(value), {
      message: "Company name can only contain letters a–z",
    }),
  employees: z.string().min(1, "Please select an item").optional(),
  message: z
    .string({ message: "Message is required" })
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(120, "Message must be 120 characters or less")
    .refine((value) => messageAllowedChars.test(value), {
      message: 'Message can only include letters, numbers, spaces, and ! ? . ,',
    })
    .refine((value) => hasOnlyNumbers1To99(value), {
      message: "Numbers must be between 1 and 99",
    }),
  agree: z.boolean().refine((value) => value, {
    message: "This field is required",
  }),
  website: z.string(),
  startedAt: z.number().int().positive(),
});
