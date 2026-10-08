// file: lib/newsletter-validations.ts
import { z } from "zod";

export const newsletterSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(160, "Title must be 160 characters or fewer."),
  content: z.string().trim().min(1, "Content is required.").max(50000, "Content is too long."),
  image: z.string().trim().url("Image must be a valid URL.").max(2048).optional().or(z.literal("")),
  status: z.enum(["Draft", "Schedule", "Sent"]),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
