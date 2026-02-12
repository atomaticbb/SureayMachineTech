/*
 * Design: Forged Aesthetics - Applications page
 * Showcase shredder blade applications across different industries
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Applications() {
  const applications = [
    {
      title: "Plastic Waste",
      image: "/images/applications/Plastic-Waste-Recycling.webp",
      description:
        "High-performance blades designed for processing various plastic materials including HDPE, PET, PVC, and polypropylene.",
    },
    {
      title: "Metal Scrap",
      image: "/images/applications/Metal-Waste-Recycling.webp",
      description:
        "Heavy-duty blades engineered to handle ferrous and non-ferrous metals, aluminum cans, copper wire, and sheet metal scrap.",
    },
    {
      title: "Solid Waste",
      image: "/images/applications/Solid-Waste-Recycling.webp",
      description:
        "Robust blades for municipal solid waste processing, reducing volume for landfill diversion and material recovery.",
    },
    {
      title: "Electronic Waste",
      image: "/images/applications/Electronic-Waste-Recycling.webp",
      description:
        "Specialized blades for electronic waste recycling, safely processing circuit boards, computer components, and consumer electronics.",
    },
    {
      title: "Tires & Rubber",
      image: "/images/applications/Tires-Waste-Recycling.webp",
      description:
        "Durable blades specifically designed for tire recycling, rubber products, and elastomer materials with excellent cut resistance.",
    },
    {
      title: "Industrial Waste",
      image: "/images/applications/Instudries-Waste-Recycling.webp",
      description:
        "Industrial-grade blades for manufacturing waste streams including production scrap, defective products, and process waste.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Enhanced Design with Hero Background */}
      <section className="relative pt-32 pb-20 border-b border-border overflow-hidden min-h-[60vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hero.webp"
            alt="Applications"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
              <Sparkles size={16} />
              Industrial Applications
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Blade Applications
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl drop-shadow-lg leading-relaxed">
              Engineered solutions for every recycling and waste processing challenge
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {app.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {app.description}
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                      Request Quote
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom overflow-hidden">
        <div className="absolute inset-0 z-0 forge-gradient opacity-20"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Not Sure Which Blade Fits Your Application?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our technical team can analyze your specific waste stream and
              recommend the optimal blade configuration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
                >
                  Consult with an Engineer
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                View All Products
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
