import * as z from "zod";

const antiBotFields = {
  website: z.string(),
  startedAt: z.number().int().positive(),
};

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  ...antiBotFields,
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  ...antiBotFields,
});
