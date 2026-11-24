import { useId, useRef, useState, type FormEvent } from "react";
import { Check, Paperclip, Upload } from "lucide-react";
import type { ContactSubmissionResponse } from "@shared/types";
import { ContactFormSchema } from "@shared/validators/contact";
import { trackLead } from "@/lib/gtag";

const ACCEPTED_EXTENSIONS = [
  "pdf",
  "dxf",
  "dwg",
  "step",
  "stp",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
];
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const FIELDS = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    autoComplete: "given-name",
    required: true,
    maxLength: 50,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    autoComplete: "family-name",
    required: true,
    maxLength: 50,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "tel",
    required: false,
  },
  {
    name: "company",
    label: "Company Name",
    type: "text",
    autoComplete: "organization",
    required: false,
    maxLength: 100,
  },
] as const;

interface InquiryFormProps {
  productName?: string;
  messagePlaceholder?: string;
  formLocation?: string;
  eventCategory?: string;
}

export default function InquiryForm({
  productName,
  messagePlaceholder = "Tell us the part or machine model, quantity and any material or delivery requirements.",
  formLocation = "homepage_bottom",
  eventCategory = "homepage_rfq",
}: InquiryFormProps) {
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [invalidField, setInvalidField] = useState("");
  const [result, setResult] = useState<ContactSubmissionResponse | null>(null);

  function selectFile(file?: File) {
    if (!file) return;
    setInvalidField("");
    if (file.size > MAX_FILE_BYTES) {
      setError("Please choose a file no larger than 15 MB.");
      return;
    }
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setError(
        "Please upload a PDF, CAD drawing (DXF, DWG, STEP, STP) or image (JPG, PNG, WebP, GIF)."
      );
      return;
    }
    setAttachment(file);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const raw = new FormData(form);
    const values = {
      firstName: String(raw.get("firstName") ?? "").trim(),
      lastName: String(raw.get("lastName") ?? "").trim(),
      email: String(raw.get("email") ?? "").trim(),
      phone: String(raw.get("phone") ?? "").trim(),
      company: String(raw.get("company") ?? "").trim(),
      message: String(raw.get("message") ?? "").trim(),
      ...(productName ? { productName } : {}),
    };
    const validation = ContactFormSchema.safeParse(values);
    if (!validation.success) {
      const issue = validation.error.issues[0];
      const field = String(issue.path[0] ?? "");
      setError(issue.message);
      setInvalidField(field);
      const control = form.elements.namedItem(field);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    submitting.current = true;
    setLoading(true);
    setError("");
    setInvalidField("");
    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, value));
    if (attachment) body.append("attachment", attachment, attachment.name);

    try {
      const response = await fetch("/api/contact", { method: "POST", body });
      const data = (await response.json()) as ContactSubmissionResponse;
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "We couldn't send your inquiry. Please try again."
        );
      }
      setResult(data);
      setAttachment(null);
      trackLead(
        { email: values.email, phone: values.phone },
        {
          event_category: eventCategory,
          form_location: formLocation,
          ...(productName ? { product_name: productName } : {}),
        }
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We couldn't send your inquiry. Please try again."
      );
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  if (result) {
    const emailSent = result.data?.emailSent !== false;
    return (
      <div
        role="status"
        className="flex min-h-64 flex-col items-start justify-center gap-4 py-8"
      >
        <Check className="size-8 text-navy" aria-hidden="true" />
        <h3 className="text-2xl font-semibold text-navy">
          Thank you for your inquiry.
        </h3>
        <p className="max-w-prose text-description leading-relaxed text-slate-600">
          {emailSent
            ? "Our team will review your requirements and get back to you."
            : "Your inquiry has been saved. If it is urgent, please email lynn@sureay.com or contact us on WhatsApp."}
        </p>
      </div>
    );
  }

  const inputClass =
    "block h-11 w-full min-w-0 rounded-none border border-input bg-white px-3 text-[16px] text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2";
  const labelClass =
    "mb-1 block text-[14px] font-semibold leading-5 text-slate-800";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Request a quote"
      aria-busy={loading}
      className="grid gap-3"
    >
      {productName && (
        <p className="border-l-2 border-navy bg-slate-50 px-3 py-2 text-[14px] leading-5 text-navy">
          <span className="font-semibold">Product: </span>
          {productName}
        </p>
      )}
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        {FIELDS.map(field => (
          <div
            key={field.name}
            className={field.name === "email" ? "col-span-2" : "min-w-0"}
          >
            <label htmlFor={`${id}-${field.name}`} className={labelClass}>
              {field.label}
              {field.required && <span aria-hidden="true"> *</span>}
            </label>
            <input
              id={`${id}-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              maxLength={"maxLength" in field ? field.maxLength : undefined}
              aria-invalid={invalidField === field.name || undefined}
              aria-describedby={
                invalidField === field.name ? `${id}-error` : undefined
              }
              className={inputClass}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={labelClass}>
          What do you need? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          maxLength={1000}
          rows={4}
          placeholder={messagePlaceholder}
          aria-invalid={invalidField === "message" || undefined}
          aria-describedby={
            invalidField === "message" ? `${id}-error` : undefined
          }
          className="block min-h-20 w-full resize-y rounded-none border border-input bg-white px-3 py-2 text-[16px] leading-5 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2"
        />
      </div>
      <div>
        <input
          ref={fileInput}
          id={`${id}-attachment`}
          type="file"
          accept={ACCEPTED_EXTENSIONS.map(extension => `.${extension}`).join(
            ","
          )}
          aria-label="Upload a drawing or photo"
          className="hidden"
          onChange={event => {
            selectFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        <div
          className={`flex items-center border border-dashed ${dragOver ? "border-navy bg-slate-50" : "border-input"}`}
        >
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            onDragOver={event => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={event => {
              event.preventDefault();
              setDragOver(false);
              selectFile(event.dataTransfer.files[0]);
            }}
            className="flex min-h-16 min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left hover:bg-slate-50"
          >
            {attachment ? (
              <Paperclip
                className="size-5 shrink-0 text-navy"
                aria-hidden="true"
              />
            ) : (
              <Upload
                className="size-5 shrink-0 text-navy"
                aria-hidden="true"
              />
            )}
            <span className="min-w-0">
              <span className="block truncate text-[14px] font-semibold leading-5 text-navy">
                {attachment ? attachment.name : "Upload a drawing or photo"}
              </span>
              <span className="block text-[12px] leading-4 text-slate-600">
                {attachment
                  ? `${(attachment.size / 1024).toFixed(0)} KB · Click to replace`
                  : "Optional · PDF, CAD or image · Max 15 MB"}
              </span>
            </span>
          </button>
          {attachment && (
            <button
              type="button"
              onClick={() => {
                setAttachment(null);
                setError("");
              }}
              className="min-h-11 shrink-0 px-3 text-[14px] font-semibold text-navy underline underline-offset-4"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[14px] leading-5 text-red-700"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="min-h-11 w-full bg-navy px-6 py-2 text-[16px] font-semibold text-white transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600"
      >
        {loading ? "Sending…" : "Submit inquiry"}
      </button>
      <p className="text-[12px] leading-4 text-slate-600">
        Your drawings remain your IP. We use your details to respond to your
        inquiry.{" "}
        <a
          href="/terms#products-quotations"
          className="text-navy underline underline-offset-2"
        >
          Terms
        </a>
        {" · "}
        <a
          href="/privacy-policy"
          className="text-navy underline underline-offset-2"
        >
          Privacy
        </a>
      </p>
    </form>
  );
}
