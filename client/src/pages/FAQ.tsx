/**
 * FAQ.tsx
 * Frequently Asked Questions page with FAQ Schema for SEO
 */

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { generateFAQSchema, renderJsonLd, type FAQItem } from "@/utils/product-schema";
import { getSEO } from "@/utils/seo-config";
import { ChevronDown } from "lucide-react";

// ── FAQ Data ──────────────────────────────────────────────────────────────

const BLADE_FAQS: FAQItem[] = [
  {
    question: "What is the lead time for custom blade manufacturing?",
    answer:
      "Standard replacement blades typically ship within 5-7 business days. Custom blade orders with specific dimensions or metallurgy requirements typically take 2-3 weeks from approved engineering drawings to shipment. Expedited production is available for urgent orders.",
  },
  {
    question: "What blade materials do you offer and how do I choose?",
    answer:
      "We offer a range of tool steels including D2 (high chromium), DC53 (improved D2), M2 HSS (high-speed steel), H13 (hot work tool steel), and solid carbide. Material selection depends on your application: D2 for general plastic recycling, DC53 for improved toughness, M2/carbide for abrasive materials like fiberglass, and H13 for hot cutting applications. Our engineering team can recommend the optimal material based on your specific process.",
  },
  {
    question: "Do you provide exact OEM replacement blades?",
    answer:
      "Yes, we manufacture exact-match OEM replacement blades for most major equipment brands including Herbold, Pallmann, Cumberland, Erema, and others. Provide us with your current blade dimensions, brand, and machine model, and we'll deliver precision replacements at competitive pricing with faster delivery than OEM channels.",
  },
  {
    question: "What tolerances can you achieve on blade dimensions?",
    answer:
      "Our CNC grinding and precision manufacturing capabilities achieve: thickness tolerance ±0.001-0.002mm, parallelism within 0.002mm, and runout ≤0.02mm on rotary blades. For metal slitting knives, we maintain ±0.001mm thickness tolerance across OD up to 420mm. All blades are CMM inspected with full dimensional reports provided.",
  },
  {
    question: "What is deep cryogenic treatment and when is it recommended?",
    answer:
      "Deep cryogenic processing (DCP) involves cooling blades to -196°C after heat treatment to transform residual austenite into martensite, increasing carbide density and wear resistance by 12-18%. We recommend DCP for blades operating in abrasive environments such as glass-filled plastics, PET bottle recycling, and high-throughput granulation where extended blade life justifies the additional processing cost.",
  },
  {
    question: "Can blades be re-sharpened and how many times?",
    answer:
      "Most of our blades can be re-sharpened 3-5 times depending on initial thickness and wear pattern. Granulator and shredder blades typically allow 4-6 regrinds. We offer regrinding services with dimensional inspection, or can provide grinding specifications for in-house maintenance. TiN or DLC coatings can be reapplied after regrinding to restore full performance.",
  },
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer:
      "We have no minimum order quantity for standard replacement blades—you can order a single blade if needed. For custom blade specifications with unique dimensions or special tooling requirements, we typically request a minimum order of 10-20 pieces to justify setup costs. Contact us to discuss your specific needs.",
  },
  {
    question: "Do you offer blade coating options?",
    answer:
      "Yes, we offer several coating options: TiN (titanium nitride) for friction reduction and corrosion resistance, DLC (diamond-like carbon) for extreme hardness and anti-stick properties, and Teflon coating for adhesive-heavy materials. Coating selection depends on your material and environment—our team can recommend the best option.",
  },
  {
    question: "How do I determine when blades need replacement?",
    answer:
      "Replace blades when you notice: increased motor current draw (>15% above baseline), visible edge rounding or chipping under magnification, poor cut quality with increased dust or fines generation, or dimensional drift in slit width/cut length. Establishing a preventive replacement schedule based on throughput tonnage is more cost-effective than reactive replacement after quality degradation.",
  },
  {
    question: "What quality certifications does Sureay hold?",
    answer:
      "Sureay Machinery is ISO 9001:2015 certified with zero non-conformances in our latest external audit. Our quality management system covers design, manufacturing, heat treatment, inspection, and traceability. All blades include material certifications, heat lot traceability, and dimensional inspection reports. We follow strict in-process controls with SPC monitoring on critical dimensions.",
  },
  {
    question: "How should I store spare blades to prevent corrosion?",
    answer:
      "Store blades in a climate-controlled environment (15-25°C, <60% humidity) in their original protective packaging. Apply a light coating of anti-corrosion oil if blades will be stored >6 months. Keep blades separated with protective spacers to prevent edge contact. Coated blades (TiN, DLC) are more resistant to storage corrosion than uncoated tool steel.",
  },
  {
    question: "Can you manufacture blades from customer-supplied drawings?",
    answer:
      "Yes, we regularly manufacture blades from customer-supplied CAD files (DXF, DWG, STEP) or detailed 2D drawings with dimensions and tolerances. We'll review drawings for manufacturability and provide a DFM (design for manufacturing) analysis if any modifications are recommended. First-article inspection reports are provided for approval before full production runs.",
  },
];

const TECHNICAL_FAQS: FAQItem[] = [
  {
    question: "What is the difference between shear slitting and crush cutting?",
    answer:
      "Shear slitting uses two rotating circular blades (top male, bottom female) with a precise gap creating a scissor action that cleanly shears the web. Crush/score cutting uses a hardened blade pressed against a rubber-covered anvil roll to compress and separate the material. Shear slitting provides cleaner edges for paper and thin plastics, while crush cutting is preferred for adhesive-coated materials and multi-layer laminates where shear slitting would cause delamination.",
  },
  {
    question: "How does blade clearance affect cut quality in slitting?",
    answer:
      "Blade clearance (gap between male and female rotary knives) critically affects edge quality: too tight causes blade friction and premature wear, too wide causes material tearing and dust generation. Optimal clearance is typically 5-10% of material thickness for most films and papers. Clearance must be rechecked after blade regrinding as dimensional changes affect the gap.",
  },
  {
    question: "Why do tissue log saw blades need mirror polish finish?",
    answer:
      "Mirror polish (Ra <0.2) on tissue log saw blades prevents cellulose fiber adhesion and minimizes friction heat buildup at high rotational speeds (>2500 RPM). Rough surfaces create micro-anchoring points for fiber accumulation, leading to edge buildup, increased cutting force, and fiber pull that damages tissue quality. The polished surface also extends blade life by reducing abrasive wear from cellulose fibers.",
  },
  {
    question: "What causes 'potato-chipping' in plastic granulation and how can blades prevent it?",
    answer:
      "Potato-chipping (curved, non-uniform regrind particles) occurs when rotor-stator clearance is excessive or blade edges are dull, causing material to bend rather than shear cleanly. Precision-ground blades with sharp V-edge geometry and proper clearance (0.15-0.30mm depending on material thickness) create clean shear cuts producing uniform, cubic regrind. Regular blade inspection and timely regrinding maintain optimal clearance and edge sharpness.",
  },
  {
    question: "How does hardness affect blade performance and when should I use softer blades?",
    answer:
      "Higher hardness (60-64 HRC) provides better wear resistance and edge retention but increases brittleness and chipping risk under impact loading. Lower hardness (56-58 HRC) offers better toughness for impact-dominant applications like heavy shredding of rigid plastics or metal scrap. The optimal hardness balances wear resistance with impact toughness based on your specific material and cutting forces—our metallurgy team can recommend the ideal specification.",
  },
];

// ── FAQ Component ─────────────────────────────────────────────────────────

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-6 text-left transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold leading-tight">{question}</h3>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function FAQ() {
  const [openIndexGeneral, setOpenIndexGeneral] = useState<number | null>(0);
  const [openIndexTech, setOpenIndexTech] = useState<number | null>(null);

  const seo = getSEO("faq");
  const allFAQs = [...BLADE_FAQS, ...TECHNICAL_FAQS];
  const faqSchema = generateFAQSchema(allFAQs);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sureay.com/faq" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sureay.com/faq" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />

        {/* FAQ Schema */}
        <script type="application/ld+json">{renderJsonLd(faqSchema)}</script>
      </Helmet>

      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Expert answers to common questions about blade manufacturing, materials, and applications"
      />

      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* General FAQs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              General Questions
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {BLADE_FAQS.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndexGeneral === index}
                  onToggle={() =>
                    setOpenIndexGeneral(openIndexGeneral === index ? null : index)
                  }
                />
              ))}
            </div>
          </section>

          {/* Technical FAQs */}
          <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Technical Questions
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {TECHNICAL_FAQS.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndexTech === index}
                  onToggle={() =>
                    setOpenIndexTech(openIndexTech === index ? null : index)
                  }
                />
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <div className="mt-16 bg-primary/5 dark:bg-primary/10 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our engineering team is ready to assist with technical specifications, material
              selection, and custom blade design for your specific application.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
