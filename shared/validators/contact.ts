import { z } from "zod";

export const ContactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .max(50, "Name must be at most 50 characters")
      .optional(),
    firstName: z
      .string()
      .trim()
      .max(50, "First name must be at most 50 characters")
      .optional(),
    lastName: z
      .string()
      .trim()
      .max(50, "Last name must be at most 50 characters")
      .optional(),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().optional(),
    company: z
      .string()
      .trim()
      .max(100, "Company name must be at most 100 characters")
      .optional(),
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(1000, "Message must be at most 1000 characters"),
    inquiryType: z.string().optional(),
    productName: z
      .string()
      .trim()
      .max(200, "Product name must be at most 200 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Legacy forms still send one name field or omit it altogether.
    if (data.firstName !== undefined || data.lastName !== undefined) {
      if (!data.firstName) {
        ctx.addIssue({
          code: "custom",
          path: ["firstName"],
          message: "First name is required",
        });
      }
      if (!data.lastName) {
        ctx.addIssue({
          code: "custom",
          path: ["lastName"],
          message: "Last name is required",
        });
      }
    }
  })
  .transform(data => ({
    ...data,
    name:
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`
        : data.name,
  }));

export type ContactFormData = z.infer<typeof ContactFormSchema>;
