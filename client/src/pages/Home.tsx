/*
 * Design: Forged Aesthetics (锻造美学)
 * Hero: Full-bleed blade macro with forge orange gradient overlay
 * Sharp diagonal cuts, heat treatment colors, metal textures throughout
 * Typography: Orbitron for headings, Exo 2 for body, Space Mono for specs
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Flame,
  Gauge,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "wouter";

export default function Home() {
  const processScrollRef = useRef<HTMLDivElement>(null);
  const compatibleBrands = [
    "WEIMA",
    "SSI",
    "UNTHA",
    "VECOPLAN",
    "LINDNER",
    "HAMMEL",
  ];

  const applications = [
    {
      title: "Metal Recycling",
      image:
        "/images/applications/Metal-Waste-Recycling.webp",
    },
    {
      title: "Plastic Recycling",
      image:
        "/images/applications/Plastic-Waste-Recycling.webp",
    },
    {
      title: "E-waste Recycling",
      image:
        "/images/applications/Electronic-Waste-Recycling.webp",
    },
    {
      title: "Tire Recycling",
      image:
        "/images/applications/Tires-Waste-Recycling.webp",
    },
    {
      title: "Industrial Waste",
      image:
        "/images/applications/Instudries-Waste-Recycling.webp",
    },
    {
      title: "Municipal Solid Waste",
      image:
        "/images/applications/Solid-Waste-Recycling.webp",
    },
  ];

  const processSteps = [
    {
      step: "Step 1",
      title: "Customer Confirms Drawings",
      description:
        "Detailed technical review and specification confirmation with customer requirements",
      image:
        "/images/process/1-Raw Material Selection.webp",
    },
    {
      step: "Step 2",
      title: "Material Cutting",
      description:
        "Precision cutting of premium steel materials to exact dimensions",
      image:
        "/images/process/2-Material Choosing.webp",
    },
    {
      step: "Step 3",
      title: "Quenching Process",
      description:
        "Controlled heat treatment to achieve optimal hardness and toughness",
      image:
        "/images/process/3-Heat Treatment.webp",
    },
    {
      step: "Step 4",
      title: "Initial Hardness Inspection After Quenching",
      description:
        "Rigorous hardness testing to verify heat treatment effectiveness",
      image:
        "/images/process/7-Quality Inspection.webp",
    },
    {
      step: "Step 5",
      title: "Processing",
      description:
        "CNC machining and grinding to achieve precise cutting edges and tolerances",
      image:
        "/images/process/4-CNC Machining.webp",
    },
    {
      step: "Step 6",
      title: "Inspection",
      description:
        "Comprehensive quality control including dimensional and visual inspection",
      image:
        "/images/process/5-Grinding.webp",
    },
    {
      step: "Step 7",
      title: "Final Product Storage",
      description:
        "Proper packaging and storage ensuring product protection until delivery",
      image:
        "/images/process/8-Packaging.webp",
    },
  ];

  const manufacturingSteps = [
    {
      title: "Material Selection",
      description: "Premium D2/SKD11 steel with verified composition",
    },
    {
      title: "CNC Machining",
      description: "Precision cutting to ±0.05mm tolerance",
    },
    {
      title: "Vacuum Heat Treatment",
      description: "Controlled hardening to 58-62 HRC",
    },
    {
      title: "Cryogenic Tempering",
      description: "Enhanced toughness and wear resistance",
    },
    {
      title: "Final Inspection",
      description: "100% quality verification before shipping",
    },
  ];

  // Auto-carousel for Our Process section
  useEffect(() => {
    const container = processScrollRef.current;
    if (!container) return;

    const carouselTrack = container.querySelector('div');
    if (!carouselTrack) return;

    let currentIndex = 0;
    const cardWidth = 384 + 24; // card width (w-96 = 384px) + gap (gap-6 = 24px)
    const maxIndex = 4; // Move 4 times to show step 7 on the right side, then reset

    const autoCarousel = setInterval(() => {
      currentIndex++;

      if (currentIndex > maxIndex) {
        // Reset to start
        carouselTrack.style.transition = 'none';
        currentIndex = 0;
        carouselTrack.style.transform = 'translateX(0px)';

        // Re-enable transition for next animation
        setTimeout(() => {
          carouselTrack.style.transition = 'transform 700ms ease-in-out';
        }, 50);
      } else {
        // Normal smooth transition to next position
        carouselTrack.style.transition = 'transform 700ms ease-in-out';
        const offset = -(currentIndex * cardWidth);
        carouselTrack.style.transform = `translateX(${offset}px)`;
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(autoCarousel);
  }, [processSteps.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Full-bleed blade macro with forge gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/shredder-blades.webp"
            alt="Shredder Blade"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tight">
              ENGINEERING THE SHARPEST EDGE
              FOR THE TOUGHEST WASTE
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 animate-forge-pulse"
                >
                  Get a Trial Order Quote
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Find Your Blade
              </Button> */}
            </div>
          </div>
        </div>

        {/* Blade-cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background blade-cut-top"></div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Is Your Shredding Operation Held Back by These Issues?
            </h2>
            <p className="text-lg text-muted-foreground">
              Inefficient blades cost you production time and money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              {
                title: "Premature Wear",
                description:
                  "Blades dulling too fast, forcing frequent changeovers",
              },
              {
                title: "Unstable Performance",
                description:
                  "Inconsistent cutting quality leading to material jams",
              },
              {
                title: "Excessive OEM Costs",
                description:
                  "Paying premium prices for standard durability",
              },
              {
                title: "Quality Variance",
                description:
                  "Unpredictable lifespan making maintenance planning impossible",
              },
            ].map((issue, index) => (
              <Card
                key={index}
                className="bg-card border-t-4 border-t-primary border-border hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-xl font-bold text-primary font-mono">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {issue.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-24 bg-card">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Shredder Blades Application
            </h2>
            <p className="text-xl text-muted-foreground">
              Optimized blade performance for every challenge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-sm aspect-[4/3] cursor-pointer"
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      Shredder Blades for
                    </h3>
                    <p className="text-xl font-bold text-amber-400">
                      {app.title}
                    </p>
                    <ArrowRight
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Compatible Brands Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Compatible With Major Brands
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Direct replacement blades for leading shredder manufacturers
              worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {compatibleBrands.map((brand, index) => (
              <div
                key={index}
                className="aspect-square flex items-center justify-center bg-card border border-border rounded-sm hover:border-primary transition-all duration-300 group"
              >
                <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors font-mono">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From customer confirmation to final delivery, every step ensures
              precision and quality
            </p>
          </div>

          <div
            ref={processScrollRef}
            className="overflow-hidden pb-4"
          >
            <div className="flex gap-6">
              {processSteps.map((process, index) => (
                <Card
                  key={index}
                  className="w-96 flex-shrink-0 overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 group p-0"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={process.image}
                      alt={process.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">
                        {process.step}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
                        {process.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {process.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-card blade-cut-top">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Ready to Extend Your Blade Life?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Get a free consultation and sample quote tailored to your shredder
              model
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 animate-forge-pulse"
                >
                  Request a Quote
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-12 py-6"
              >
                View Product Catalog
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
