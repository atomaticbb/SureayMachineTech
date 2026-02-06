import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().max(100, "Company name must be at most 100 characters").optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must be at most 1000 characters"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
