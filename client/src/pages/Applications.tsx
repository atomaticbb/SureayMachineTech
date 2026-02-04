/*
 * Design: Forged Aesthetics - Applications page
 * Showcase shredder blade applications across different industries
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Applications() {
  const applications = [
    {
      title: "Plastic Recycling",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
      description:
        "High-performance blades designed for processing various plastic materials including HDPE, PET, PVC, and polypropylene.",
      materials: [
        "Plastic bottles and containers",
        "PVC pipes and profiles",
        "HDPE drums and tanks",
        "Polypropylene packaging",
        "Plastic film and sheets",
        "Rigid plastic components",
      ],
      benefits: [
        "Clean, uniform particle size",
        "Minimal dust generation",
        "Extended blade life on abrasive plastics",
      ],
    },
    {
      title: "Metal Recycling",
      image:
        "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
      description:
        "Heavy-duty blades engineered to handle ferrous and non-ferrous metals, aluminum cans, copper wire, and sheet metal scrap.",
      materials: [
        "Aluminum beverage cans",
        "Copper wire and cables",
        "Steel drums and barrels",
        "Sheet metal scrap",
        "Automotive body panels",
        "Appliance housings",
      ],
      benefits: [
        "Superior edge retention on hard metals",
        "Reduced maintenance downtime",
        "Consistent throughput rates",
      ],
    },
    {
      title: "Solid Waste",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
      description:
        "Robust blades for municipal solid waste processing, reducing volume for landfill diversion and material recovery.",
      materials: [
        "Household garbage",
        "Commercial refuse",
        "Bulky item waste",
        "Mixed municipal waste",
        "Mattresses and furniture",
        "Cardboard and paper products",
      ],
      benefits: [
        "High throughput capacity",
        "Resistance to contamination",
        "Long service life in harsh conditions",
      ],
    },
    {
      title: "E-Waste",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      description:
        "Specialized blades for electronic waste recycling, safely processing circuit boards, computer components, and consumer electronics.",
      materials: [
        "Computer cases and monitors",
        "Circuit boards and PCBs",
        "Mobile phones and tablets",
        "Printers and peripherals",
        "Electronic housings",
        "Battery packs (non-lithium)",
      ],
      benefits: [
        "Precise size reduction for material separation",
        "Minimal heat generation",
        "Safe processing of mixed materials",
      ],
    },
    {
      title: "Industrial Waste",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80",
      description:
        "Industrial-grade blades for manufacturing waste streams including production scrap, defective products, and process waste.",
      materials: [
        "Production line rejects",
        "Manufacturing scrap",
        "Textile and fabric waste",
        "Rubber and tire materials",
        "Composite materials",
        "Packaging waste",
      ],
      benefits: [
        "Customizable for specific waste streams",
        "High efficiency for continuous operation",
        "Cost-effective waste volume reduction",
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
              BLADE
              <span className="block text-primary mt-2">APPLICATIONS</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Engineered solutions for every recycling and waste processing
              challenge
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-16">
            {applications.map((app, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div
                    className={`relative aspect-video lg:aspect-auto overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent lg:bg-gradient-to-r"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {app.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    {/* Materials */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        Suitable Materials
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {app.materials.map((material, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2
                              className="text-primary flex-shrink-0 mt-0.5"
                              size={18}
                            />
                            <span className="text-sm text-muted-foreground">
                              {material}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        Key Benefits
                      </h3>
                      <ul className="space-y-2">
                        {app.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                        Request Application-Specific Quote
                        <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
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
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Consult with an Engineer
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
