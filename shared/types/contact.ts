export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
}
