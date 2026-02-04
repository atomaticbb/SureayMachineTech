/*
 * Design: Forged Aesthetics - Plastic Shredder Blades Product Detail Page
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Download, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductDetailPlastic() {
  const bladeImages = [
    {
      url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80",
      title: "Plastic Shredder Blade - Front View",
    },
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
      title: "Plastic Shredder Blade - Cutting Edge",
    },
    {
      url: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&q=80",
      title: "Plastic Shredder Blade - Side Profile",
    },
    {
      url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
      title: "Plastic Shredder Blade - Installation",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bladeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bladeImages.length) % bladeImages.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const keyFeatures = [
    {
      title: "Sharp Cutting Angles",
      description: "Designed for clean plastic shearing",
    },
    {
      title: "Low Friction Coating",
      description: "Prevents material buildup",
    },
    {
      title: "Extended Blade Life",
      description: "Optimized for abrasive plastics",
    },
    {
      title: "Minimal Dust",
      description: "Consistent particle size output",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1920&q=80"
            alt="Plastic Shredder Blades"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="text-sm text-muted-foreground">
              Products / Plastic Processing
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              SHREDDER BLADES
              <span className="block text-primary mt-2">FOR PLASTIC</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              Specialized plastic shredder blades optimized for processing various plastic materials with minimal dust generation and consistent particle size
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                Request a Quote
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
              >
                <Download className="mr-2" size={20} />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blades Series Carousel */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Blades Series
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our plastic shredder blade designs
            </p>
          </div>

          <div className="relative max-w-3xl">
            <div className="aspect-[16/9] rounded-sm overflow-hidden border-2 border-border">
              <img
                src={bladeImages[currentImageIndex].url}
                alt={bladeImages[currentImageIndex].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border-2 border-border rounded-full flex items-center justify-center transition-all duration-300 hover:border-primary group"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-foreground group-hover:text-primary" size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border-2 border-border rounded-full flex items-center justify-center transition-all duration-300 hover:border-primary group"
              aria-label="Next image"
            >
              <ChevronRight className="text-foreground group-hover:text-primary" size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {bladeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Image Title */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground font-medium">
                {bladeImages[currentImageIndex].title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features & Benefits */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-black text-primary font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-background">
        <div className="container">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="space-y-8">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Technical Specifications
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Also Known As</h3>
                      <p className="text-muted-foreground">
                        Plastic granulator blades, plastic crusher knives, plastic shredder knives, plastic recycling blades, granulator knives, regrind blades
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Materials</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">T10A - Cost-effective for general plastics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">9CrSi - Enhanced wear resistance for HDPE/PP</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Cr12MoV - Premium grade for PVC and ABS</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">SKD11 - Maximum durability for continuous operation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Optional TiN/TiCN coating for reduced friction</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Hardness & Treatment</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Hardness: 56-60 HRC (optimized for plastics)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Precision heat treatment for toughness</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Mirror-polished cutting edges</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Grinding tolerance: ±0.02mm</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Dimensions</h3>
                      <p className="text-muted-foreground mb-3">
                        Available in standard sizes or customized to your machine specifications:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Length</div>
                          <div className="text-xs text-muted-foreground mt-1">50-1500mm</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Width</div>
                          <div className="text-xs text-muted-foreground mt-1">30-300mm</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Thickness</div>
                          <div className="text-xs text-muted-foreground mt-1">5-50mm</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Cutting Angle</div>
                          <div className="text-xs text-muted-foreground mt-1">20-45°</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Machine Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Single Shaft Shredders", "Double Shaft Shredders", "Granulators", "Plastic Crushers", "Plastic Grinders", "Recycling Lines"].map((machine, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {machine}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-8">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Applications & Materials
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Suitable Plastic Types</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">HDPE & PET Bottles</div>
                            <div className="text-sm text-muted-foreground">Beverage containers, milk jugs, detergent bottles</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">PVC Pipes & Profiles</div>
                            <div className="text-sm text-muted-foreground">Construction materials, window frames, siding</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Polypropylene (PP)</div>
                            <div className="text-sm text-muted-foreground">Packaging, automotive parts, containers</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">ABS & Polystyrene</div>
                            <div className="text-sm text-muted-foreground">Electronic housings, appliance parts</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Plastic Film & Sheets</div>
                            <div className="text-sm text-muted-foreground">Stretch wrap, agricultural film, packaging</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Rigid Plastic Components</div>
                            <div className="text-sm text-muted-foreground">Crates, pallets, industrial parts</div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Industry Applications</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Plastic Recycling Facilities</div>
                            <div className="text-sm text-muted-foreground">Post-consumer and post-industrial plastic recovery</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Manufacturing Plants</div>
                            <div className="text-sm text-muted-foreground">In-house regrind of production scrap</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Packaging Industry</div>
                            <div className="text-sm text-muted-foreground">Processing rejected packaging materials</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Automotive Recycling</div>
                            <div className="text-sm text-muted-foreground">Bumpers, dashboards, interior components</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">E-Waste Processing</div>
                            <div className="text-sm text-muted-foreground">Plastic housings from electronics</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-bold text-foreground mb-3">Performance Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">Uniform</div>
                        <div className="text-sm text-muted-foreground">Consistent particle size for reprocessing</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">Clean</div>
                        <div className="text-sm text-muted-foreground">Minimal dust generation during shredding</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">Efficient</div>
                        <div className="text-sm text-muted-foreground">High throughput with low energy consumption</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              See Our Blades in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch real-world performance demonstrations and installation guides
            </p>
            <a
              href="https://www.youtube.com/@machinerytest1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold"
            >
              Visit Our YouTube Channel
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Featured Video */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="aspect-video rounded-sm overflow-hidden border-2 border-border">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Plastic Shredder Blade Demonstration"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-card blade-cut-top overflow-hidden">
        <div className="absolute inset-0 z-0 forge-gradient opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Optimize Your Plastic Recycling Line?
            </h2>
            <p className="text-xl text-muted-foreground">
              Get a custom quote based on your plastic types and throughput requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                <Mail className="mr-2" size={20} />
                Request a Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                <Phone className="mr-2" size={20} />
                Talk to an Engineer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
