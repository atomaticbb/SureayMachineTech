import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import HomeHero from "@/components/home/HomeHero";
import AuthorityCarousel from "@/components/home/AuthorityCarousel";
import ManufacturingBlocks from "@/components/home/ManufacturingBlocks";
import TabEcosystem from "@/components/home/TabEcosystem";
import NewsGrid from "@/components/home/NewsGrid";
import TechnicalFAQ from "@/components/home/TechnicalFAQ";
import ContactRFQ from "@/components/home/ContactRFQ";
import HomeTestimonials from "@/components/home/HomeTestimonials";
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
      url: "https://sureay.com/products/twin-shaft-blades-recycling",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Rotary Slitter Knives for Film & Flexible Packaging Converting",
      url: "https://sureay.com/products/rotary-slitter-knives",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Metal Foil & Strip Slitter Knives",
      url: "https://sureay.com/products/metal-foil-strip-slitter-knives",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Paper & Tissue Blades",
      url: "https://sureay.com/products/tissue-log-saw-blades",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Granulator Blades",
      url: "https://sureay.com/products/granulator-blades",
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
        <AuthorityCarousel />
        <TabEcosystem />
        <ManufacturingBlocks />
        <IndustryOemPipeline />
        <HomeTestimonials />
        <TechnicalFAQ />
        <NewsGrid />
        <ContactRFQ />
        <Footer />
      </div>
    </>
  );
}
