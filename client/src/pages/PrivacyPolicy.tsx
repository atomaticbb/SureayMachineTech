import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import { motion } from "framer-motion";

const EFFECTIVE_DATE = "2026-06-11";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function Section({
  id,
  title,
  children,
  delay = 0,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      id={id}
      className="mb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <h2 className="text-white font-black text-xs tracking-[0.3em] mb-5 pb-3 border-b border-slate-800">
        {title}
      </h2>
      <div className="text-slate-400 text-[15px] leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy — Sureay Machinery Technology"
        description="Privacy policy for sureay.com — data collection, cookies, Google Analytics, Google Ads tracking, GDPR rights, and contact information."
        canonicalUrl="/privacy-policy"
      />
      <Navbar />
      <main className="bg-[#0a0f1a] min-h-screen">
        {/* ── Header ── */}
        <div className="bg-[#001f4d] border-b border-[#003366]">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
            <motion.p
              className="text-[10px] font-black tracking-[0.35em] text-[#e8b84b] mb-4"
              {...FADE_UP}
            >
              LEGAL
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              PRIVACY POLICY
            </motion.h1>
            <motion.p
              className="text-slate-400 text-[13px] font-semibold tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              EFFECTIVE DATE: {EFFECTIVE_DATE} &nbsp;·&nbsp; SUREAY MACHINERY
              TECHNOLOGY CO., LTD.
            </motion.p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
          <Section id="introduction" title="1. INTRODUCTION" delay={0.1}>
            <p>
              Sureay Machinery Technology Co., Ltd. ("Sureay", "we", "us", or
              "our") operates the website{" "}
              <a
                href="https://sureay.com"
                className="text-[#e8b84b] hover:text-white transition-colors"
              >
                https://sureay.com
              </a>
              . This Privacy Policy explains how we collect, use, and share
              information when you visit our website or submit an inquiry.
            </p>
            <p>
              By using this website you agree to the practices described in
              this policy. If you are located in the European Economic Area
              (EEA), additional rights under the General Data Protection
              Regulation (GDPR) apply — see Section 8.
            </p>
          </Section>

          <Section id="data-collected" title="2. DATA WE COLLECT" delay={0.15}>
            <p>
              <span className="text-white font-semibold">
                Contact form submissions
              </span>{" "}
              — When you fill in our enquiry or quote-request form we collect:
              your name, company name, email address, phone number, message
              content, and any technical files you attach (drawings, PDFs,
              STEP/DXF/DWG files). This information is stored in our database
              and forwarded to our sales team via email.
            </p>
            <p>
              <span className="text-white font-semibold">
                Cookies and tracking technologies
              </span>{" "}
              — We use cookies and similar technologies to operate the website,
              measure performance, and deliver advertising. See Section 5 for
              details.
            </p>
            <p>
              <span className="text-white font-semibold">
                Usage and device data
              </span>{" "}
              — When you browse our website, analytics tools automatically
              collect data such as: IP address (anonymised), browser type and
              version, operating system, referring URL, pages visited, time
              spent on pages, and click events.
            </p>
          </Section>

          <Section id="how-we-use" title="3. HOW WE USE YOUR DATA" delay={0.2}>
            <ul className="space-y-3 list-none">
              {[
                [
                  "Responding to inquiries",
                  "We use contact form data exclusively to process your quote request or technical enquiry and to follow up with you.",
                ],
                [
                  "Website improvement",
                  "Aggregated analytics data helps us understand which pages and products are most useful to our visitors.",
                ],
                [
                  "Advertising and remarketing",
                  "We use Google Ads to show relevant advertisements to previous website visitors on other websites and Google properties. Conversion data helps us measure the effectiveness of our advertising campaigns.",
                ],
                [
                  "Legal and security",
                  "We may use data to detect fraud, enforce our terms, or comply with applicable law.",
                ],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="text-[#e8b84b] font-black mt-0.5 shrink-0">
                    —
                  </span>
                  <span>
                    <span className="text-white font-semibold">{title}: </span>
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="third-parties"
            title="4. THIRD-PARTY SERVICES"
            delay={0.25}
          >
            <p>
              We share data with the following third-party services. Each
              service operates under its own privacy policy.
            </p>

            {/* Google Analytics */}
            <div className="border border-slate-800 p-5 bg-[#0d1520]">
              <p className="text-white font-black text-xs tracking-[0.25em] mb-3">
                GOOGLE ANALYTICS 4
              </p>
              <p>
                We use Google Analytics 4 (GA4) to collect anonymised
                behavioral data about how visitors use this website (pages
                viewed, session duration, events). GA4 places cookies on your
                device and sends this data to Google LLC servers, which may be
                located in the United States.
              </p>
              <p className="mt-2">
                Google uses this data as described in the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  Google Privacy Policy
                </a>
                . You can opt out via{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </div>

            {/* Google Ads */}
            <div className="border border-slate-800 p-5 bg-[#0d1520]">
              <p className="text-white font-black text-xs tracking-[0.25em] mb-3">
                GOOGLE ADS — CONVERSION TRACKING & REMARKETING
              </p>
              <p>
                We use Google Ads for conversion tracking and remarketing.
                When you visit our website, Google places a cookie or uses
                similar identifiers to record your visit. If you later see a
                Sureay advertisement on another site or Google property, this
                is served by Google based on your prior visit to sureay.com.
              </p>
              <p className="mt-2">
                This allows us to: (a) measure when an ad click leads to a
                form submission (conversion tracking), and (b) show our ads
                to previous visitors who may be interested in our products
                (remarketing). No personally identifiable information is
                passed to Google for this purpose.
              </p>
              <p className="mt-2">
                You can opt out of personalised advertising at{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  Google Ads Settings
                </a>{" "}
                or via the{" "}
                <a
                  href="https://optout.networkadvertising.org"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  NAI opt-out tool
                </a>
                .
              </p>
            </div>

            {/* Resend */}
            <div className="border border-slate-800 p-5 bg-[#0d1520]">
              <p className="text-white font-black text-xs tracking-[0.25em] mb-3">
                RESEND (EMAIL DELIVERY)
              </p>
              <p>
                Contact form submissions are delivered to our team via Resend,
                an email infrastructure provider. Form data is transmitted
                securely and is not used by Resend for any purpose other than
                delivery. See the{" "}
                <a
                  href="https://resend.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  Resend Privacy Policy
                </a>
                .
              </p>
            </div>
          </Section>

          <Section id="cookies" title="5. COOKIES" delay={0.3}>
            <p>
              We use the following categories of cookies. You can manage or
              withdraw consent at any time via the cookie banner on this site
              or your browser settings.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-white font-black tracking-widest py-3 pr-4 text-xs">
                      CATEGORY
                    </th>
                    <th className="text-left text-white font-black tracking-widest py-3 pr-4 text-xs">
                      COOKIES
                    </th>
                    <th className="text-left text-white font-black tracking-widest py-3 text-xs">
                      PURPOSE
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  {[
                    [
                      "Essential",
                      "Session cookies",
                      "Required for the website to function. Cannot be disabled.",
                    ],
                    [
                      "Analytics",
                      "_ga, _ga_*",
                      "Google Analytics 4 — measures page views, sessions, and user behaviour. Anonymised.",
                    ],
                    [
                      "Advertising",
                      "_gcl_au, _gcl_aw, IDE",
                      "Google Ads — conversion tracking and remarketing. Links ad clicks to form submissions.",
                    ],
                  ].map(([cat, cookie, purpose]) => (
                    <tr
                      key={cat}
                      className="border-b border-slate-800 align-top"
                    >
                      <td className="py-3 pr-4 text-white font-semibold whitespace-nowrap">
                        {cat}
                      </td>
                      <td className="py-3 pr-4 font-mono text-[#e8b84b] whitespace-nowrap">
                        {cookie}
                      </td>
                      <td className="py-3">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="retention" title="6. DATA RETENTION" delay={0.35}>
            <p>
              <span className="text-white font-semibold">Contact form data</span>{" "}
              is retained in our database for up to 3 years to allow follow-up
              on enquiries and to maintain sales records, after which it is
              deleted or anonymised.
            </p>
            <p>
              <span className="text-white font-semibold">Analytics data</span>{" "}
              is retained by Google Analytics for 14 months by default.
            </p>
            <p>
              <span className="text-white font-semibold">Advertising cookies</span>{" "}
              set by Google Ads expire after 90 days.
            </p>
          </Section>

          <Section
            id="data-transfers"
            title="7. INTERNATIONAL DATA TRANSFERS"
            delay={0.4}
          >
            <p>
              Sureay is based in China. Data you submit may be transferred to
              and processed in China. For visitors in the EEA: data processed
              by Google Analytics and Google Ads is transferred to the United
              States under Google's Standard Contractual Clauses approved by
              the European Commission.
            </p>
          </Section>

          <Section
            id="gdpr-rights"
            title="8. YOUR RIGHTS (GDPR — EEA VISITORS)"
            delay={0.45}
          >
            <p>
              If you are located in the European Economic Area, you have the
              following rights under the GDPR regarding your personal data:
            </p>
            <ul className="space-y-3 list-none">
              {[
                [
                  "Right of access",
                  "Request a copy of the personal data we hold about you.",
                ],
                [
                  "Right to rectification",
                  "Ask us to correct inaccurate or incomplete data.",
                ],
                [
                  "Right to erasure",
                  "Request deletion of your personal data where there is no overriding legitimate reason to retain it.",
                ],
                [
                  "Right to restrict processing",
                  "Ask us to pause processing of your data under certain circumstances.",
                ],
                [
                  "Right to data portability",
                  "Receive your data in a structured, machine-readable format.",
                ],
                [
                  "Right to object",
                  "Object to processing based on our legitimate interests, including direct marketing.",
                ],
                [
                  "Right to withdraw consent",
                  "Where processing is based on consent (e.g. analytics cookies), you may withdraw it at any time without affecting prior processing.",
                ],
              ].map(([right, desc]) => (
                <li key={right} className="flex gap-3">
                  <span className="text-[#e8b84b] font-black mt-0.5 shrink-0">
                    —
                  </span>
                  <span>
                    <span className="text-white font-semibold">{right}: </span>
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              To exercise any of these rights, contact us at the address in
              Section 9. We will respond within 30 days. You also have the
              right to lodge a complaint with your local data protection
              authority.
            </p>
          </Section>

          <Section id="contact" title="9. CONTACT US" delay={0.5}>
            <p>
              For privacy-related requests, questions, or complaints, contact
              us at:
            </p>
            <div className="border border-slate-800 p-5 bg-[#0d1520] space-y-2">
              <p className="text-white font-semibold">
                Sureay Machinery Technology Co., Ltd.
              </p>
              <p>Industrial Development Zone, Bowang Town, Bowang District, Ma'anshan City, Anhui Province, China</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:lynn@sureay.com"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  lynn@sureay.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+8618005550657"
                  className="text-[#e8b84b] hover:text-white transition-colors"
                >
                  +86 180 0555 0657
                </a>
              </p>
            </div>
          </Section>

          <Section id="updates" title="10. CHANGES TO THIS POLICY" delay={0.55}>
            <p>
              We may update this policy from time to time. Changes will be
              posted on this page with an updated effective date. We encourage
              you to review this page periodically.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
