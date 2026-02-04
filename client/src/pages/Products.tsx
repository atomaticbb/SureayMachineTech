/*
 * Design: Forged Aesthetics - Products catalog page
 * Showcasing 3 main product categories
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Products() {
  const products = [
    {
      id: "single-shaft",
      title: "Single Shaft Shredder Blades",
      slug: "/products/single-shaft",
      image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
      description: "High-performance single shaft shredder blades engineered for maximum wear resistance and superior cutting efficiency across diverse waste materials.",
      features: [
        "Available in standard sizes: 35×35×23, 40×40×25, 45×45×22, 50×50×30, 80×80×25mm",
        "High alloy tool steel construction for extended service life",
        "Customizable dimensions for specific machine models",
        "Optimized heat treatment for impact resistance",
        "Suitable for tires, plastics, biomass, wood, and textiles",
      ],
      applications: ["Plastic recycling", "Tire shredding", "Wood processing", "Textile waste", "General waste"],
    },
    {
      id: "metal",
      title: "Shredder Blades for Metal",
      slug: "/products/metal",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      description: "Heavy-duty metal shredder blades designed to handle ferrous and non-ferrous metals with exceptional edge retention and minimal downtime.",
      features: [
        "Materials: 6CrW2Si, Cr12MoV, H13, H13K, W6Mo5CrV2, W18Cr4V",
        "Superior hardness (58-62 HRC) for cutting steel, aluminum, copper",
        "Precision ground cutting edges for clean, burr-free cuts",
        "Vacuum heat treatment for uniform hardness distribution",
        "Ideal for scrap metal yards and automotive recycling",
      ],
      applications: ["Aluminum cans", "Copper wire", "Steel drums", "Automotive parts", "Appliance housings"],
    },
    {
      id: "plastic",
      title: "Shredder Blades for Plastic",
      slug: "/products/plastic",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
      description: "Specialized plastic shredder blades optimized for processing various plastic materials with minimal dust generation and consistent particle size.",
      features: [
        "Materials: T10A, 9CrSi, Cr12MoV for different plastic types",
        "Sharp cutting angles designed for clean plastic shearing",
        "Low friction coating options to prevent material buildup",
        "Extended blade life on abrasive plastics like PVC and ABS",
        "Compatible with single and double shaft shredders",
      ],
      applications: ["HDPE/PET bottles", "PVC pipes", "Polypropylene packaging", "Plastic film", "Rigid plastics"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 forge-gradient opacity-30"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              OUR
              <span className="block text-primary mt-2">PRODUCTS</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Precision-engineered shredder blades for every application
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all duration-300 group flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                </div>

                <CardContent className="p-8 flex-1 flex flex-col space-y-6">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      {product.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Applications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={product.slug}>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                      View Details
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom overflow-hidden">
        <div className="absolute inset-0 z-0 forge-gradient opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose Our Shredder Blades?
              </h2>
              <p className="text-xl text-muted-foreground">
                10+ years of manufacturing excellence delivering precision-engineered solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-black text-primary font-mono">01</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Premium Materials</h3>
                <p className="text-muted-foreground">
                  High-alloy tool steel and specialized heat treatment for maximum durability
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-black text-primary font-mono">02</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Custom Solutions</h3>
                <p className="text-muted-foreground">
                  Tailored dimensions and specifications to match your exact machine requirements
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-black text-primary font-mono">03</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Global Shipping</h3>
                <p className="text-muted-foreground">
                  Fast delivery worldwide with comprehensive quality assurance and support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Need Help Choosing the Right Blade?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our technical team can recommend the optimal blade configuration for your specific application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Get Expert Consultation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
