/*
 * Design: Forged Aesthetics - Products catalog page
 * Showcasing 3 main product categories
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Products() {
  const products = [
    {
      id: "single-shaft-shredder-blades",
      title: "Single Shaft Shredder Blades",
      slug: "/products/single-shaft-shredder-blades",
      image:
        "/images/products/single-shaft-blades.webp",
      description:
        "High-performance single shaft shredder blades engineered for maximum wear resistance and superior cutting efficiency across diverse waste materials.",
      features: [
        "Available in standard sizes: 35×35×23, 40×40×25, 45×45×22, 50×50×30, 80×80×25mm",
        "High alloy tool steel construction for extended service life",
        "Customizable dimensions for specific machine models",
        "Optimized heat treatment for impact resistance",
        "Suitable for tires, plastics, biomass, wood, and textiles",
      ],
      applications: [
        "Plastic recycling",
        "Tire shredding",
        "Wood processing",
        "Textile waste",
      ],
    },
    {
      id: "multi-shaft-shredder-blades",
      title: "Multi Shaft Shredder Blades",
      slug: "/products/multi-shaft-shredder-blades",
      image:
        "/images/products/mutil-shaft-blades.webp",
      description:
        "Heavy-duty multi shaft shredder blades designed for dual and quad shaft shredders, delivering exceptional cutting performance and durability for industrial waste processing.",
      features: [
        "Materials: 6CrW2Si, Cr12MoV, H13, H13K, W6Mo5CrV2, W18Cr4V",
        "Superior hardness (58-62 HRC) for demanding applications",
        "Precision ground cutting edges for clean, efficient cuts",
        "Vacuum heat treatment for uniform hardness distribution",
        "Ideal for metal recycling, e-waste, and heavy-duty waste streams",
      ],
      applications: [
        "Metal recycling",
        "E-waste processing",
        "Industrial waste",
        "Automotive parts",
      ],
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {products.map(product => (
              <Card
                key={product.id}
                className="overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 group flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content Section */}
                <CardContent className="p-6 flex flex-col flex-grow space-y-4">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {product.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Applications */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {product.applications.slice(0, 4).map((app, idx) => (
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
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
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
                10+ years of manufacturing excellence delivering
                precision-engineered solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-black text-primary font-mono">
                    01
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Premium Materials
                </h3>
                <p className="text-muted-foreground">
                  High-alloy tool steel and specialized heat treatment for
                  maximum durability
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-black text-primary font-mono">
                    02
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Custom Solutions
                </h3>
                <p className="text-muted-foreground">
                  Tailored dimensions and specifications to match your exact
                  machine requirements
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-black text-primary font-mono">
                    03
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Global Shipping
                </h3>
                <p className="text-muted-foreground">
                  Fast delivery worldwide with comprehensive quality assurance
                  and support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="relative py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Engineered Metallurgy for Different Shaft
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From raw steel to precision-hardened cutting edges, every step is
              controlled for consistency
            </p>
          </div>

          {/* Manufacturing Steps Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>

              <div className="space-y-12">
                {[
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
                ].map((step, index) => (
                  <div key={index} className="relative flex gap-8 items-start">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-sm bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                      <span className="text-2xl font-bold text-primary font-mono">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
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
              Our technical team can recommend the optimal blade configuration
              for your specific application
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
