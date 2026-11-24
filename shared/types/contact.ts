export interface ContactFormData {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  inquiryType?: string;
  productName?: string;
}

export interface ContactSubmissionData {
  contactId: string;
  emailSent: boolean;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  data?: ContactSubmissionData;
}
