import { apiClient } from "./client";
import type { ContactFormData, ContactSubmissionResponse } from "@shared/types";

/**
 * 提交联系表单
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactSubmissionResponse> => {
  const response = await apiClient.post<ContactSubmissionResponse>(
    "/contact",
    data
  );
  return response.data;
};
