import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/home/HomeHero";
import AuthorityCarousel from "@/components/home/AuthorityCarousel";
import ManufacturingBlocks from "@/components/home/ManufacturingBlocks";
import TabEcosystem from "@/components/home/TabEcosystem";
import NewsGrid from "@/components/home/NewsGrid";
import TechnicalFAQ from "@/components/home/TechnicalFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["Organization", "Manufacturer"],
  name: "Sureay Machinery Manufacturing Co., Ltd.",
  alternateName: "Sureay Machinery",
  url: "https://www.sureay.com",
  logo: "https://www.sureay.com/sureay.svg",
  foundingDate: "2008",
  description:
    "Precision industrial blades, cutting knives and recycling machine solutions for plastic, metal, and paper industries. ISO 9001:2015 certified OEM/ODM manufacturer.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+86-156-5553-0829",
      contactType: "sales",
      email: "lynn@sureay.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CN",
  },
});

const ITEM_LIST_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industrial Blades & Recycling Solutions",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Plastic Recycling Blades",
      url: "https://www.sureay.com/products/shredder-blades",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Metal Processing Knives",
      url: "https://www.sureay.com/products/rotary-cutter-blades",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Paper & Tissue Blades",
      url: "https://www.sureay.com/products/tissue-log-saw-blades",
    },
  ],
});

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Precision Industrial Blades | Sureay </title>
        <meta
          name="description"
          content="ISO 9001:2015 certified OEM manufacturer of precision industrial blades, granulator knives and recycling machine solutions. ±0.002 mm tolerance. Global export since 2008."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sureay.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sureay.com/" />
        <meta property="og:title" content="Precision Industrial Blades & Recycling Solutions | Sureay Machinery" />
        <meta
          property="og:description"
          content="ISO 9001:2015 certified OEM manufacturer of precision industrial blades, granulator knives and recycling machine solutions."
        />
        <meta property="og:image" content="https://www.sureay.com/images/hero/homehero.webp" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON_LD}</script>
        <script type="application/ld+json">{ITEM_LIST_LD}</script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 pt-[68px]">
        <Navbar />
        <HomeHero />
        <AuthorityCarousel />
        <ManufacturingBlocks />
        <TabEcosystem />
        <NewsGrid />
        <TechnicalFAQ />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
