import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/common/SEO";
import { motion } from "framer-motion";

const EFFECTIVE_DATE = "2026-06-11";

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

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service — Sureay Machinery Technology"
        description="Terms and conditions governing use of sureay.com and engagement with Sureay Machinery Technology Co., Ltd. for industrial blade products and OEM services."
      />
      <Navbar />
      <main className="bg-[#0a0f1a] min-h-screen">
        {/* ── Header ── */}
        <div className="bg-[#001f4d] border-b border-[#003366]">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
            <motion.p
              className="text-[10px] font-black tracking-[0.35em] text-[#e8b84b] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              LEGAL
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              TERMS OF SERVICE
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
          <Section id="acceptance" title="1. ACCEPTANCE OF TERMS" delay={0.1}>
            <p>
              By accessing or using{" "}
              <a
                href="https://sureay.com"
                className="text-[#e8b84b] hover:text-white transition-colors"
              >
                https://sureay.com
              </a>{" "}
              (the "Website"), you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree, please do not use the Website.
            </p>
            <p>
              These Terms apply to all visitors, prospective buyers, and
              anyone who submits an enquiry or interacts with the Website.
              Sureay Machinery Technology Co., Ltd. ("Sureay", "we", "us")
              reserves the right to update these Terms at any time. Continued
              use of the Website after changes constitutes acceptance.
            </p>
          </Section>

          <Section id="website-use" title="2. USE OF THE WEBSITE" delay={0.15}>
            <p>You agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="space-y-2 list-none">
              {[
                "Attempt to gain unauthorised access to any part of the Website or its servers.",
                "Use automated tools to scrape, crawl, or harvest content or data without our prior written consent.",
                "Transmit any unsolicited commercial communications or malicious code.",
                "Misrepresent your identity, affiliation, or the purpose of your enquiry.",
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#e8b84b] font-black mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="products-quotations" title="3. PRODUCTS & QUOTATIONS" delay={0.2}>
            <p>
              <span className="text-white font-semibold">Product information:</span>{" "}
              Specifications, dimensions, material grades, and images on the
              Website are provided for reference only. Actual product
              specifications are confirmed in writing at the time of order.
              Sureay reserves the right to modify specifications without
              prior notice.
            </p>
            <p>
              <span className="text-white font-semibold">Quotations:</span>{" "}
              Any quotation provided by Sureay — whether via the Website
              contact form, email, or other channel — is an invitation to
              treat, not a binding offer. A contract is formed only upon
              Sureay's written order confirmation and receipt of any agreed
              deposit.
            </p>
            <p>
              <span className="text-white font-semibold">Pricing:</span>{" "}
              All prices quoted are exclusive of applicable taxes, duties,
              and shipping costs unless stated otherwise in writing. Prices
              are subject to change without notice until an order is
              confirmed.
            </p>
            <p>
              <span className="text-white font-semibold">Custom OEM orders:</span>{" "}
              Technical drawings, samples, and specifications submitted by
              buyers remain the intellectual property of the buyer. Sureay
              will not share submitted designs with third parties without
              written consent.
            </p>
          </Section>

          <Section id="intellectual-property" title="4. INTELLECTUAL PROPERTY" delay={0.25}>
            <p>
              All content on the Website — including but not limited to text,
              product photographs, technical diagrams, the Sureay logo, and
              software — is owned by or licensed to Sureay and is protected
              by applicable copyright and trademark laws.
            </p>
            <p>
              You may view and print content for personal, non-commercial
              reference purposes only. You must not reproduce, redistribute,
              or create derivative works from any Website content without
              Sureay's prior written permission.
            </p>
          </Section>

          <Section id="disclaimers" title="5. DISCLAIMERS" delay={0.3}>
            <p>
              The Website and its content are provided "as is" without
              warranties of any kind, express or implied, including warranties
              of merchantability, fitness for a particular purpose, or
              non-infringement. Sureay does not warrant that the Website will
              be uninterrupted, error-free, or free of viruses.
            </p>
            <p>
              Product suitability for a specific application is the
              responsibility of the buyer. Sureay's technical recommendations
              are provided in good faith but do not constitute a guarantee of
              performance.
            </p>
          </Section>

          <Section id="liability" title="6. LIMITATION OF LIABILITY" delay={0.35}>
            <p>
              To the fullest extent permitted by applicable law, Sureay
              shall not be liable for any indirect, incidental, special, or
              consequential damages arising out of or in connection with your
              use of the Website, including loss of profit, loss of data, or
              business interruption.
            </p>
            <p>
              Sureay's total aggregate liability for any claim arising from
              use of the Website shall not exceed the amount paid by you to
              Sureay in the three months preceding the claim, or USD 100,
              whichever is greater.
            </p>
          </Section>

          <Section id="third-party-links" title="7. THIRD-PARTY LINKS" delay={0.4}>
            <p>
              The Website may contain links to third-party websites
              (including LinkedIn, YouTube, and WhatsApp). These links are
              provided for convenience only. Sureay has no control over the
              content of those sites and accepts no responsibility for them
              or for any loss or damage that may arise from your use of them.
            </p>
          </Section>

          <Section id="governing-law" title="8. GOVERNING LAW" delay={0.45}>
            <p>
              These Terms are governed by and construed in accordance with
              the laws of the People's Republic of China. Any disputes
              arising out of or in connection with these Terms shall be
              subject to the exclusive jurisdiction of the courts of Anhui
              Province, China.
            </p>
            <p>
              For buyers located in jurisdictions with mandatory consumer
              or commercial protection laws, nothing in these Terms limits
              any rights you have under applicable local law.
            </p>
          </Section>

          <Section id="contact" title="9. CONTACT" delay={0.5}>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <div className="border border-slate-800 p-5 bg-[#0d1520] space-y-2">
              <p className="text-white font-semibold">
                Sureay Machinery Technology Co., Ltd.
              </p>
              <p>No. 36 Liudao, Taihu County, Anqing, Anhui, China 246400</p>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
