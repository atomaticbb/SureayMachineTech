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
import { useTranslation } from "@/lib/useTranslation";

type InquiryType =
  | "Custom OEM Blade"
  | "Standard Part Replacement"
  | "Technical Support";

const INQUIRY_TYPES: { value: InquiryType; labelKey: string }[] = [
  { value: "Custom OEM Blade", labelKey: "contactPage.inquiry.custom" },
  { value: "Standard Part Replacement", labelKey: "contactPage.inquiry.replacement" },
  { value: "Technical Support", labelKey: "contactPage.inquiry.support" },
];

const TRUST_STAMPS = [
  "contactPage.trust.iso",
  "contactPage.trust.export",
  "contactPage.trust.ce",
  "contactPage.trust.warranty",
];

const ACCEPTED_EXTS = ".pdf,.dxf,.dwg,.step,.stp,.jpg,.jpeg,.png,.webp,.gif";
const MAX_FILE_MB = 15;

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Contact() {
  const { t } = useTranslation();
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

  const applyFile = (file: File | null | undefined) => {
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(t("contactPage.toast.fileTooLarge"));
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!["pdf", "dxf", "dwg", "step", "stp", "jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      toast.error(t("contactPage.toast.invalidType"));
      return;
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(t("contactPage.toast.success"));
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
            toast.error(error.message || t("contactPage.toast.validationError"));
          });
        } else {
          toast.error(data.message || t("contactPage.toast.failure"));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contactPage.toast.unexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <SEO
        title={t("contactPage.seo.title")}
        description={t("contactPage.seo.description")}
        canonicalUrl="/contact"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="bg-white pt-[74px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-4 lg:pt-20 lg:pb-12">
          <p className="text-[11px] font-semibold tracking-[0.28em]  text-slate-400 mb-6">
            {t("contactPage.hero.eyebrow")}
          </p>

          <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black text-[#001f4d]  tracking-tight leading-none mb-7 max-w-3xl">
            {t("contactPage.hero.headline")}
          </h1>

          <div className="w-12 h-[3px] bg-[#001f4d] mb-7" />

          <p className="text-slate-500 text-[16px] leading-relaxed max-w-2xl">
            {t("contactPage.hero.body")}
          </p>
        </div>
      </section>

      {/* 2. FORM + DIRECTORY */}
      <section className="border-t border-b border-slate-200">
        <div className="lg:grid lg:grid-cols-12">
          {/* LEFT: Form */}
          <div className="lg:col-span-7 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 lg:p-8">
            <p className="font-mono text-[10px] text-slate-400 tracking-[0.35em]  mb-2">
              {t("contactPage.form.formRef")}
            </p>
            <h2 className="text-2xl font-black text-[#001f4d]  tracking-tight mb-6">
              {t("contactPage.form.heading")}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Inquiry Type Tiles */}
              <div>
                <p className="font-bold text-[10px] tracking-widest text-slate-500  mb-3">
                  {t("contactPage.form.inquiryTypeLabel")} *
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-slate-200">
                  {INQUIRY_TYPES.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({ ...prev, inquiryType: type.value }))
                      }
                      className={`px-4 py-4 font-mono text-[10px] font-bold tracking-[0.15em]  text-left border-r border-slate-200 last:border-r-0 transition-none ${
                        formData.inquiryType === type.value
                          ? "bg-[#001f4d] text-white"
                          : "bg-white text-slate-500 hover:bg-slate-50 hover:text-[#001f4d]"
                      }`}
                    >
                      {t(type.labelKey)}
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
                    {t("contactPage.form.nameLabel")} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t("contactPage.form.namePlaceholder")}
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
                    {t("contactPage.form.emailLabel")} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("contactPage.form.emailPlaceholder")}
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
                    {t("contactPage.form.companyLabel")}
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder={t("contactPage.form.companyPlaceholder")}
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
                    {t("contactPage.form.phoneLabel")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder={t("contactPage.form.phonePlaceholder")}
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
                  {t("contactPage.form.messageLabel")} *
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder={t("contactPage.form.messagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm p-3 rounded-none focus:outline-none focus:border-[#001f4d] transition-colors resize-none"
                />
              </div>

              {/* CAD upload */}
              <div>
                <p className="font-bold text-[10px] tracking-widest text-slate-500  mb-2">
                  {t("contactPage.form.cadLabel")}{" "}
                  <span className="text-slate-400 normal-case tracking-normal font-normal">
                    ({t("common.optional")} · max {MAX_FILE_MB} MB)
                  </span>
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_EXTS}
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label={t("contactPage.form.cadAriaLabel")}
                />

                {attachment ? (
                  <div className="border border-[#001f4d] bg-slate-50 px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
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
                      aria-label={t("common.remove")}
                    >
                      [ × {t("common.remove").toUpperCase()} ]
                    </button>
                  </div>
                ) : (
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
                      {t("contactPage.form.cadDropZoneTitle")}
                    </p>
                    <p className="font-mono text-[11px] text-slate-500 tracking-wide leading-relaxed">
                      {t("contactPage.form.cadDropZoneHint")}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400 mt-1">
                      .DXF · .DWG · .PDF · .STEP · .STP · .JPG · .PNG · .WEBP — max {MAX_FILE_MB} MB
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#001f4d] text-white border-2 border-[#001f4d] px-8 py-5 font-black text-sm  tracking-[0.2em] hover:bg-white hover:text-[#001f4d] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? t("contactPage.form.submitting")
                  : t("contactPage.form.submit")}
              </button>
            </form>
          </div>

          {/* RIGHT: Directory */}
          <div className="lg:col-span-5 bg-[#001f4d] p-6 lg:p-8 flex flex-col">
            <div className="mt-8 lg:mt-[2.75rem] mb-12">
              <p className="font-mono text-[10px] text-white/50 tracking-widest  mb-3">
                {t("contactPage.directory.emailLabel")}
              </p>
              <a
                data-u="lynn"
                data-d="sureay.com"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  gtagEvent("email_click", { link_location: "contact_page" });
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

            <div className="mb-12">
              <p className="font-mono text-[10px] text-white/50 tracking-widest  mb-3">
                {t("contactPage.directory.whatsappLabel")}
              </p>
              <a
                href="https://wa.me/8618005550657?text=Hi%2C%20I%27m%20interested%20in%20custom%20blade%20solutions"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtagEvent("whatsapp_click", { link_location: "contact_page" })}
                className="block text-[clamp(1.25rem,5vw,2rem)] lg:text-3xl font-black text-white  tracking-tight leading-none hover:text-white/70 transition-colors"
              >
                +86 180-0555-0657
              </a>
            </div>

            <div className="border-t border-white/20 pt-8 mt-auto">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-xs text-white/50 tracking-widest  mb-1.5">
                    {t("contactPage.directory.factoryLabel")}
                  </p>
                  <p className="font-sans text-sm text-white leading-relaxed">
                    {t("contactPage.directory.factoryLine1")}
                    <br />
                    {t("contactPage.directory.factoryLine2")}
                    <br />
                    {t("contactPage.directory.factoryLine3")}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xs text-white/50 tracking-widest  mb-1.5">
                    {t("contactPage.directory.hoursLabel")}
                  </p>
                  <p className="font-sans text-sm text-white leading-relaxed">
                    {t("contactPage.directory.hoursValue")}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xs text-white/50 tracking-widest  mb-1.5">
                    {t("contactPage.directory.responseLabel")}
                  </p>
                  <p className="font-sans text-sm text-white leading-relaxed">
                    {t("contactPage.directory.responseValue")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST STAMPS */}
      <section className="bg-[#001f4d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {TRUST_STAMPS.map((stampKey, i) => (
              <div
                key={i}
                className="px-6 py-6 lg:px-10 lg:py-7 flex items-center justify-center text-center"
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/70  leading-snug">
                  {t(stampKey)}
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
