import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import HomeHero from "@/components/home/HomeHero";
import HomeStatsStrip from "@/components/home/HomeStatsStrip";
import AuthorityCarousel from "@/components/home/AuthorityCarousel";
import ManufacturingBlocks from "@/components/home/ManufacturingBlocks";
import TabEcosystem from "@/components/home/TabEcosystem";
import NewsGrid from "@/components/home/NewsGrid";
import TechnicalFAQ from "@/components/home/TechnicalFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";
import IndustryOemPipeline from "@/components/industry/IndustryOemPipeline";

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
      url: "https://www.sureay.com/products/rotary-slitter-knives",
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
      <SEO
        title="Industrial Blades Manufacturer for Recycling, Metal & Converting"
        description="Sureay manufactures industrial blades, shredder knives, slitter tooling, and custom OEM machine knives for plastic recycling, metal processing, and paper converting lines worldwide."
        canonicalUrl="/"
        keywords="industrial blades manufacturer, custom machine knives, shredder blades, granulator knives, slitter blades, shear blades, OEM custom blades"
      />
      <Helmet>
        <script type="application/ld+json">{ITEM_LIST_LD}</script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 pt-[68px]">
        <Navbar />
        <HomeHero />
        <HomeStatsStrip />
        <AuthorityCarousel />
        <TabEcosystem />
        <ManufacturingBlocks />
        <IndustryOemPipeline />
        <TechnicalFAQ />
        <NewsGrid />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
