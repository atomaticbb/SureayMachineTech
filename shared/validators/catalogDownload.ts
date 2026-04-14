import { z } from "zod";

export const CatalogDownloadSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(254),
  productId: z.string().max(100).optional(),
});

export type CatalogDownloadData = z.infer<typeof CatalogDownloadSchema>;
