/*
 * Contact.tsx — "Engineering Inquiry & Quote Request"
 * Swiss Brutalist · High-End Corporate Industrial
 * Zero radius · No icons · No shadows · Deep Navy + White palette
 */

import { useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import { toast } from "sonner";
import { gtagEvent } from "@/lib/gtag";

type InquiryType =
  | "Custom OEM Blade"
  | "Standard Part Replacement"
  | "Technical Support";

const INQUIRY_TYPES: InquiryType[] = [
  "Custom OEM Blade",
  "Standard Part Replacement",
  "Technical Support",
];

const TRUST_STAMPS = [
  "ISO 9001:2015 CERTIFIED",
  "EXPORT AUTHORITY GRADE A",
  "CE STANDARDS COMPLIANT",
  "GLOBAL WARRANTY SECURE",
];

const ACCEPTED_EXTS = ".pdf,.dxf,.dwg,.step,.stp,.jpg,.jpeg,.png,.webp,.gif";
const MAX_FILE_MB = 15;

// Human-readable file size
function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    inquiryType: "Custom OEM Blade" as InquiryType,
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // ── File selection helpers ───────────────────────────────────────────────
  const applyFile = (file: File | null | undefined) => {
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File exceeds ${MAX_FILE_MB} MB limit.`);
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!["pdf", "dxf", "dwg", "step", "stp", "jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      toast.error("Invalid file type. Allowed: .pdf .dxf .dwg .step .stp .jpg .jpeg .png .webp .gif");
      return;
    }
    setAttachment(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0]);
    // Reset so the same file can be re-selected after removal
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    applyFile(e.dataTransfer.files?.[0]);
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Build multipart/form-data — browser sets Content-Type + boundary
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("message", formData.message);
      fd.append("inquiryType", formData.inquiryType);
      if (formData.phone) fd.append("phone", formData.phone);
      if (formData.company) fd.append("company", formData.company);
      if (attachment) fd.append("attachment", attachment, attachment.name);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: fd,
        // Do NOT set Content-Type — browser must set it with the multipart boundary
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          "Message sent successfully! We'll get back to you within 24 hours."
        );
        gtagEvent("generate_lead", {
          event_category: "contact_form",
          inquiry_type: formData.inquiryType,
        });
        setFormData({
          inquiryType: "Custom OEM Blade",
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setAttachment(null);
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error: { message?: string }) => {
            toast.error(error.message || "Validation error");
          });
        } else {
          toast.error(
            data.message || "Failed to send message. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title="Contact & RFQ — Partner With Sureay Blades"
        description="Submit a blade engineering inquiry or request a quote. Reach our technical team via form, email or WhatsApp. CAD file uploads accepted."
        canonicalUrl="/contact"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          1. THE AUTHORITY HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white pt-[74px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-4 lg:pt-20 lg:pb-12">
          <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-6">
            Engineering Inquiry & Quote Request
          </p>

          <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black text-[#001f4d]  tracking-tight leading-none mb-7 max-w-3xl">
            Partner With Sureay Engineering
          </h1>

          <div className="w-12 h-[3px] bg-[#001f4d] mb-7" />

          <p className="text-slate-500 text-[16px] leading-relaxed max-w-2xl">
            Every inquiry receives a direct technical assessment from our
            engineering team within 24 hours. Describe your application — we'll
            engineer the optimal blade specification.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. THE COMMAND GRID (Form + Directory)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-slate-200">
        <div className="lg:grid lg:grid-cols-12">
          {/* ── LEFT: The White Paper Form (col-span-7) ─────────────────── */}
          <div className="lg:col-span-7 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 lg:p-8">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.35em]  mb-2">
              [ FORM REF: SY-INQ-001 ]
            </p>
            <h2 className="text-2xl font-black text-[#001f4d]  tracking-tight mb-6">
              Submit Your Inquiry
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Inquiry Type Tiles */}
              <div>
                <p className="font-bold text-[10px] tracking-widest text-slate-500  mb-3">
                  Inquiry Type *
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-slate-200">
                  {INQUIRY_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({ ...prev, inquiryType: type }))
                      }
                      className={`px-4 py-4 font-mono text-[10px] font-bold tracking-[0.15em]  text-left border-r border-slate-200 last:border-r-0 transition-none ${
                        formData.inquiryType === type
                          ? "bg-[#001f4d] text-white"
                          : "bg-white text-slate-500 hover:bg-slate-50 hover:text-[#001f4d]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-bold text-[10px] tracking-widest text-slate-500  mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm p-3 rounded-none focus:outline-none focus:border-[#001f4d] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-[10px] tracking-widest text-slate-500  mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm p-3 rounded-none focus:outline-none focus:border-[#001f4d] transition-colors"
                  />
                </div>
              </div>

              {/* Company + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block font-bold text-[10px] tracking-widest text-slate-500  mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your Company Ltd."
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm p-3 rounded-none focus:outline-none focus:border-[#001f4d] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-bold text-[10px] tracking-widest text-slate-500  mb-2"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm p-3 rounded-none focus:outline-none focus:border-[#001f4d] transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-bold text-[10px] tracking-widest text-slate-500  mb-2"
                >
                  Project Details *
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Please include machine brand, OEM part number, material requirements, or current blade issues..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm p-3 rounded-none focus:outline-none focus:border-[#001f4d] transition-colors resize-none"
                />
              </div>

              {/* ── CAD File Upload Zone ───────────────────────────────── */}
              <div>
                <p className="font-bold text-[10px] tracking-widest text-slate-500  mb-2">
                  CAD / Technical Drawing{" "}
                  <span className="text-slate-400 normal-case tracking-normal font-normal">
                    (optional · max {MAX_FILE_MB} MB)
                  </span>
                </p>

                {/* Hidden native input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_EXTS}
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Attach CAD or technical drawing"
                />

                {attachment ? (
                  /* ── File selected state ─────────────────────────────── */
                  <div className="border border-[#001f4d] bg-slate-50 px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Sharp paperclip mark */}
                      <span className="font-mono text-[#001f4d] text-base flex-shrink-0 select-none">
                        [ ⊡ ]
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] font-bold text-[#001f4d]  tracking-wide truncate">
                          {attachment.name}
                        </p>
                        <p className="font-mono text-[10px] text-slate-400 tracking-wide">
                          {fmtSize(attachment.size)} ·{" "}
                          {attachment.name.split(".").pop()?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      className="flex-shrink-0 font-mono text-[10px] font-bold text-slate-400 hover:text-red-600  tracking-widest transition-colors"
                      aria-label="Remove attachment"
                    >
                      [ × REMOVE ]
                    </button>
                  </div>
                ) : (
                  /* ── Drop / click zone ───────────────────────────────── */
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
                    className={`border-2 border-dashed py-5 px-4 text-center cursor-pointer transition-colors ${
                      dragOver
                        ? "border-[#001f4d] bg-slate-50"
                        : "border-slate-300 hover:border-[#001f4d] hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-mono text-sm font-bold text-[#001f4d]  tracking-wide mb-1">
                      [ ATTACH CAD / DRAWINGS / PHOTOS ]
                    </p>
                    <p className="font-mono text-[11px] text-slate-500 tracking-wide leading-relaxed">
                      Click or drag &amp; drop a file here
                    </p>
                    <p className="font-mono text-[10px] text-slate-400 mt-1">
                      .DXF · .DWG · .PDF · .STEP · .STP · .JPG · .PNG · .WEBP — max {MAX_FILE_MB} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#001f4d] text-white border-2 border-[#001f4d] px-8 py-5 font-black text-sm  tracking-[0.2em] hover:bg-white hover:text-[#001f4d] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "[ TRANSMITTING... ]" : "SUBMIT INQUIRY ↗"}
              </button>
            </form>
          </div>

          {/* ── RIGHT: The Navy Directory (col-span-5) ──────────────────── */}
          <div className="lg:col-span-5 bg-[#001f4d] p-6 lg:p-8 flex flex-col">
            {/* Email */}
            <div className="mt-8 lg:mt-[2.75rem] mb-12">
              <p className="font-mono text-[10px] text-white/50 tracking-widest  mb-3">
                Direct Email
              </p>
              {/* Obfuscated: reversed string + CSS rtl renders as lynn@sureay.com */}
              <a
                data-u="lynn"
                data-d="sureay.com"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  const el = e.currentTarget as HTMLAnchorElement;
                  window.location.href = `mailto:${el.dataset.u}@${el.dataset.d}`;
                }}
                className="block text-[clamp(1.25rem,5vw,2rem)] lg:text-3xl font-black text-white  tracking-tight leading-none break-all hover:text-white/70 transition-colors cursor-pointer"
              >
                <span
                  style={{ unicodeBidi: "bidi-override", direction: "rtl" }}
                >
                  moc.yaerus@nnyl
                </span>
              </a>
            </div>

            {/* WhatsApp */}
            <div className="mb-12">
              <p className="font-mono text-[10px] text-white/50 tracking-widest  mb-3">
                Global WhatsApp
              </p>
              <a
                href="https://wa.me/8618005550657?text=Hi%2C%20I%27m%20interested%20in%20custom%20blade%20solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[clamp(1.25rem,5vw,2rem)] lg:text-3xl font-black text-white  tracking-tight leading-none hover:text-white/70 transition-colors"
              >
                +86 180-0555-0657
              </a>
            </div>

            {/* Footer metadata */}
            <div className="border-t border-white/20 pt-8 mt-auto">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-xs text-white/50 tracking-widest  mb-1.5">
                    Factory Address
                  </p>
                  <p className="font-sans text-sm text-white leading-relaxed">
                    Industrial Development Zone, Bowang Town
                    <br />
                    Bowang District, Ma'anshan City
                    <br />
                    Anhui Province, China
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xs text-white/50 tracking-widest  mb-1.5">
                    Operating Hours
                  </p>
                  <p className="font-sans text-sm text-white leading-relaxed">
                    Mon – Fri &nbsp;09:00 – 18:00 CST (UTC+8)
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xs text-white/50 tracking-widest  mb-1.5">
                    Response Protocol
                  </p>
                  <p className="font-sans text-sm text-white leading-relaxed">
                    All inquiries acknowledged within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. METROLOGY STAMPS (Trust Badges)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#001f4d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {TRUST_STAMPS.map((stamp, i) => (
              <div
                key={i}
                className="px-6 py-6 lg:px-10 lg:py-7 flex items-center justify-center text-center"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/70  leading-snug">
                  {stamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
