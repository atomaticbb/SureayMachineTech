/*
 * Contact Page — "Engineering Inquiry & Quote Request"
 * B2B CRO-optimized: inquiry type selector, trust signals, smart form, dark contact card
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TrustBadges from "@/components/common/TrustBadges";
import {
  Send,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

type InquiryType = "Custom OEM Blade" | "Standard Part Replacement" | "Technical Support";

export default function Contact() {
  const [formData, setFormData] = useState({
    inquiryType: "Custom OEM Blade" as InquiryType,
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message sent successfully! We'll get back to you within 24 hours.");
        setFormData({
          inquiryType: "Custom OEM Blade",
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error: any) => {
            toast.error(error.message || "Validation error");
          });
        } else {
          toast.error(data.message || "Failed to send message. Please try again.");
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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Value-driven headline + trust signals
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/common/metal-industrial-1.webp"
            alt="Sureay precision manufacturing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-36 pb-20 lg:pt-44 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[2px] w-8 bg-[#FF6600]"></div>
              <span className="text-[#FF6600] tracking-[0.2em] text-xs font-bold uppercase">
                Contact Us
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
              Request Your Custom{" "}
              <span className="text-[#FF6600]">Blade Quote</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-8">
              Speak directly with our tooling engineers. We review every inquiry and respond with a detailed technical assessment.
            </p>

            {/* Trust Signal Row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                "24-Hour Technical Response",
                "Free Engineering Review",
                "Global Secure Shipping",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6600] flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TWO-COLUMN: Form (left) + Contact Info (right)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* ── LEFT: Engineering Inquiry Form (3 cols) ────────────────── */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">

                <h2 className="text-2xl font-bold text-[#003366] dark:text-white mb-1">
                  Submit Your Inquiry
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Fields marked with * are required
                </p>

                {/* File Upload Callout */}
                <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-[#003366] rounded-r-lg p-4 mb-8">
                  <FileText className="w-5 h-5 text-[#003366] dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#003366] dark:text-blue-300 mb-0.5">
                      Have a CAD file or drawing?
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Email your .DXF, .DWG, or PDF directly to{" "}
                      <a href="mailto:info@sureay.com" className="font-bold text-[#003366] dark:text-blue-400 underline">
                        info@sureay.com
                      </a>{" "}
                      for a faster quote.
                    </p>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                      Inquiry Type *
                    </Label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-shadow"
                    >
                      <option value="Custom OEM Blade">Custom OEM Blade</option>
                      <option value="Standard Part Replacement">Standard Part Replacement</option>
                      <option value="Technical Support">Technical Support</option>
                    </select>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Company + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                        Company
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your Company Ltd."
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please include machine brand, OEM part number, material requirements, or current blade issues..."
                      rows={6}
                      className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6600] hover:bg-[#E55A00] text-white font-bold text-base rounded-lg shadow-lg hover:shadow-[#FF6600]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* ── RIGHT: Contact Info (2 cols) ──────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Premium: Email + WhatsApp dark card */}
              <div className="relative bg-[#003366] rounded-2xl p-7 shadow-lg overflow-hidden">
                {/* SVG grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="contact-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contact-grid)" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6600]">
                    Fastest Response
                  </p>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">Email</p>
                      <a href="mailto:info@sureay.com" className="text-white font-bold text-base hover:text-[#FF6600] transition-colors">
                        info@sureay.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">WhatsApp</p>
                      <a
                        href="https://wa.me/8615655530829?text=Hi%2C%20I%27m%20interested%20in%20custom%20blade%20solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-bold text-base hover:text-[#FF6600] transition-colors"
                      >
                        +86 156-5553-0829
                      </a>
                      <p className="text-xs text-blue-300 mt-0.5">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary: Phone + Hours */}
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-7 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#003366]/10 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#003366] dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Phone</p>
                    <p className="text-slate-900 dark:text-white font-bold text-sm">+86 156-5553-0829</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#003366]/10 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#003366] dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Business Hours</p>
                    <p className="text-slate-900 dark:text-white font-bold text-sm">Mon – Fri, 9:00 AM – 6:00 PM</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">UTC+8 / China Standard Time</p>
                  </div>
                </div>
              </div>

              {/* Tertiary: Address (demoted) */}
              <div className="bg-slate-100 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700 p-7">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Factory Address</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Industrial Development Zone, Bowang Town<br />
                      Bowang District, Ma'anshan City<br />
                      Anhui Province, China
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST ANCHOR — Final subconscious trust signal
      ═══════════════════════════════════════════════════════════════════ */}
      <TrustBadges className="py-12 bg-slate-50 border-t border-slate-200" />

      <Footer />
    </div>
  );
}
