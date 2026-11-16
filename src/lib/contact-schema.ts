import { z } from "zod";

/** Shared contract for the contact form — used by client and /api/contact. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(120),
  subject: z
    .string()
    .trim()
    .min(3, "Give it a subject.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least 10 characters.")
    .max(2000, "Keep it under 2000 characters."),
  /** Honeypot — humans never see or fill this field; any value = silently dropped server-side. */
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
