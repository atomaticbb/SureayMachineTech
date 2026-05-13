import { useRef, useState } from "react";
import type { ContactSubmissionResponse } from "@shared/types";

const ACCEPTED_EXTS = ".pdf,.dxf,.dwg,.step,.stp,.jpg,.jpeg,.png,.webp,.gif";
const MAX_FILE_MB = 15;

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ContactRFQ({
  productName,
}: { productName?: string } = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitNotice, setSubmitNotice] = useState("");
  const [emailNoticeOnly, setEmailNoticeOnly] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File helpers ─────────────────────────────────────────────────────────
  const applyFile = (file: File | null | undefined) => {
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`File exceeds ${MAX_FILE_MB} MB limit.`);
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!["pdf", "dxf", "dwg", "step", "stp", "jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      setError("Invalid file type. Accepted: .pdf .dxf .dwg .step .stp .jpg .jpeg .png .webp .gif");
      return;
    }
    setError("");
    setAttachment(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    applyFile(e.dataTransfer.files?.[0]);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitNotice("");
    setEmailNoticeOnly(false);

    const raw = new FormData(e.currentTarget);
    const requirements = raw.get("message") as string;

    // Build multipart payload — lets the browser set Content-Type + boundary
    const fd = new FormData();
    fd.append("email", raw.get("email") as string);
    const productPrefix = productName ? `[Product: ${productName}] ` : "";
    fd.append("message", `${productPrefix}${requirements}`);
    if (attachment) fd.append("attachment", attachment, attachment.name);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
        // Do NOT set Content-Type — browser must set it with the multipart boundary
      });

      const json = (await res
        .json()
        .catch(() => ({}))) as ContactSubmissionResponse;

      if (!res.ok) {
        throw new Error(json.message || "Submission failed. Please try again.");
      }

      const emailSent = json.data?.emailSent ?? true;
      setSubmitNotice(
        json.message ||
          (emailSent
            ? "Our engineering team will review your requirements and respond within 24 hours."
            : "Your inquiry has been saved. If your request is urgent, please contact us by email or WhatsApp.")
      );
      setEmailNoticeOnly(!emailSent);
      setSubmitted(true);
      setAttachment(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-10 lg:mb-14">
          <p className="text-slate-500 font-bold text-xs  tracking-[0.3em] mb-3">
            Reach Our Team
          </p>
          <h2 className="font-black text-2xl md:text-3xl lg:text-[36px] text-[#003366]   tracking-tight leading-[1.05]">
            Get in Touch with Our Engineers
          </h2>
          <div className="w-16 h-[3px] bg-slate-300 mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Contact channels */}
          <div className="flex flex-col gap-6 py-10">
            <div>
              <h3 className="font-black text-2xl text-[#003366] tracking-tight leading-[1.05] mb-1">
                Contact Our Team
              </h3>
              <p className="text-sm text-slate-600">
                Discuss your requirements directly with our engineers.
              </p>
            </div>

            {/* Email */}
            <a href="mailto:lynn@sureay.com" className="group block">
              <div className="bg-slate-50 p-5 border border-slate-200 hover:border-[#003366] hover:shadow-lg transition-all duration-300 rounded-none">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#e8eef5] rounded-none flex items-center justify-center group-hover:bg-[#d0dcea] transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-[#003366]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-400 font-bold  tracking-widest mb-1">
                      Email Us
                    </div>
                    <div className="text-sm font-bold text-[#003366] group-hover:text-[#003366] transition-colors truncate">
                      lynn@sureay.com
                    </div>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#003366]/8 border border-[#003366]/20 px-2 py-0.5">
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#003366]" />
                      <span className="text-[10px] font-black text-[#003366]  tracking-widest">
                        Engineer Response within 2 Hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+8618005550657" className="group block">
              <div className="bg-slate-50 p-5 border border-slate-200 hover:border-[#003366] hover:shadow-lg transition-all duration-300 rounded-none">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#e8eef5] rounded-none flex items-center justify-center group-hover:bg-[#d0dcea] transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-[#003366]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-slate-400 font-bold  tracking-widest mb-1">
                      Call Us
                    </div>
                    <div className="text-sm font-bold text-[#003366] group-hover:text-[#003366] transition-colors">
                      +86 180 0555 0657
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8618005550657"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-slate-50 p-5 border border-slate-200 hover:border-[#003366] hover:shadow-lg transition-all duration-300 rounded-none">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#e8eef5] rounded-none flex items-center justify-center group-hover:bg-[#d0dcea] transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-[#003366]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-slate-400 font-bold  tracking-widest">
                        WhatsApp
                      </span>
                      <span className="relative flex items-center">
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        Online
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#003366] group-hover:text-[#003366] transition-colors">
                      Chat with Engineer
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5  tracking-widest">
                      Direct Technical Support
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Right: Quote form */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-none p-8 flex flex-col">
            <h3 className="font-black text-2xl text-[#003366] tracking-tight leading-[1.05] mb-1">
              Request a Quote
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Our engineering team responds within 24 hours.
            </p>

            {submitted ? (
              /* ── Success state ─────────────────────────────────────── */
              <div className="flex-1 flex flex-col items-center justify-center gap-5 py-10 text-center">
                <div className="w-14 h-14 bg-[#003366] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-[11px] text-[#003366]  tracking-[0.25em] mb-2">
                    {emailNoticeOnly ? "Inquiry Saved" : "RFQ Received"}
                  </p>
                  <p className="font-black text-2xl text-[#001f4d]  tracking-tight leading-tight mb-3">
                    {emailNoticeOnly ? "Request Logged." : "Thank You."}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {submitNotice ||
                      "Our engineering team will review your requirements and respond within 24 hours."}
                  </p>
                  {emailNoticeOnly && (
                    <p className="text-xs text-[#003366] leading-relaxed max-w-xs mx-auto mt-3 font-semibold">
                      For urgent requests, email lynn@sureay.com or use WhatsApp
                      for immediate follow-up.
                    </p>
                  )}
                </div>
                <div className="w-full border-t border-slate-100 pt-5">
                  <p className="font-mono text-[9px] text-slate-400  tracking-[0.25em]">
                    ■ ISO 9001:2015 · CMM VERIFIED · OEM GRADE
                  </p>
                </div>
              </div>
            ) : (
              /* ── Form ──────────────────────────────────────────────── */
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col gap-4"
              >
                {productName && (
                  <div className="flex items-center gap-3 px-4 py-2.5 border border-[#001f4d]/20 bg-[#001f4d]/5">
                    <span className="font-mono text-[9px] text-[#001f4d]  tracking-widest font-black flex-shrink-0">
                      Product
                    </span>
                    <span className="font-bold text-sm text-[#001f4d] truncate">
                      {productName}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-800  tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-3 min-h-[48px] border border-slate-200 rounded-none text-sm focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 transition-all"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-800  tracking-wider mb-1.5">
                    What do you need? *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="E.g., OEM replacement blades for Vecoplan VA 2000, D2 steel, qty 20, delivery to Germany..."
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-none text-sm focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 transition-all resize-none"
                    required
                  />
                </div>

                {/* ── CAD / Technical Drawing Upload ────────────────── */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800  tracking-wider mb-1.5">
                    CAD / Drawing{" "}
                    <span className="text-slate-400 normal-case tracking-normal font-normal">
                      (optional · max {MAX_FILE_MB} MB)
                    </span>
                  </label>

                  {/* Hidden native file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_EXTS}
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Attach CAD or technical drawing"
                  />

                  {attachment ? (
                    /* ── File selected ─────────────────────────────── */
                    <div className="flex items-center justify-between gap-3 px-3 py-2.5 border border-[#003366] bg-[#003366]/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <svg
                          className="w-4 h-4 flex-shrink-0 text-[#003366]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#003366] truncate">
                            {attachment.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {fmtSize(attachment.size)} ·{" "}
                            {attachment.name.split(".").pop()?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachment(null)}
                        className="flex-shrink-0 text-[10px] font-bold text-slate-400 hover:text-red-600  tracking-widest transition-colors"
                        aria-label="Remove attachment"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    /* ── Drop / click zone ─────────────────────────── */
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={e =>
                        e.key === "Enter" && fileInputRef.current?.click()
                      }
                      onDragOver={e => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`flex items-center gap-3 px-4 py-3 border-2 border-dashed cursor-pointer transition-colors ${
                        dragOver
                          ? "border-[#003366] bg-slate-50"
                          : "border-slate-200 hover:border-[#003366] hover:bg-slate-50"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-slate-600  tracking-wide">
                          Upload CAD / Technical Drawing
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          .DXF · .DWG · .PDF · .STEP · .STP — click or drag
                          &amp; drop
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-xs font-bold text-red-600  tracking-wide border border-red-200 bg-red-50 px-3 py-2">
                    ✕ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#003366] border border-[#003366] hover:bg-white hover:text-[#003366] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 min-h-[48px] font-black text-sm  tracking-widest transition-all duration-300 rounded-none shadow-md"
                >
                  {loading ? "Sending…" : "Get a Quote →"}
                </button>
                <p className="text-xs text-slate-400 text-center">
                  No spam — we only use your email to respond to this inquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
