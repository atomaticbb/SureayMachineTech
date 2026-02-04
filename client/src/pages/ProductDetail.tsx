/*
 * Design: Forged Aesthetics - Single Shaft Shredder Blades product detail page
 * Comprehensive product information with YouTube video showcase
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Package,
  Ruler,
  Shield,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const specifications = [
    { label: "Material Grade", value: "D2 / SKD11 / Carbide Tipped" },
    { label: "Hardness", value: "58-62 HRC" },
    { label: "Tolerance", value: "±0.05mm" },
    { label: "Surface Finish", value: "Ground & Polished" },
    { label: "Edge Angle", value: "Customizable (30°-45°)" },
    { label: "Mounting Holes", value: "Standard or Custom Pattern" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Extended Lifespan",
      description:
        "30-50% longer service life compared to standard OEM blades through optimized heat treatment",
    },
    {
      icon: Zap,
      title: "High Torque Design",
      description:
        "Engineered for single shaft shredders with high torque, low-speed operation",
    },
    {
      icon: Ruler,
      title: "Precision Machined",
      description:
        "CNC machining to ±0.05mm tolerance ensures perfect fit and balanced operation",
    },
    {
      icon: Package,
      title: "Universal Compatibility",
      description:
        "Direct replacement for WEIMA, SSI, Vecoplan, UNTHA, and other major brands",
    },
  ];

  const compatibleMachines = [
    {
      brand: "WEIMA",
      models: [
        "WLK 4",
        "WLK 6",
        "WLK 8",
        "WLK 10",
        "WLK 13",
        "WLK 15",
        "WLK 18",
        "WLK 20",
      ],
    },
    {
      brand: "SSI",
      models: [
        "Shred-Pax 40HP",
        "Shred-Pax 50HP",
        "Shred-Pax 75HP",
        "Shred-Pax 100HP",
      ],
    },
    {
      brand: "UNTHA",
      models: ["RS30", "RS40", "RS50", "RS60", "RS70", "RS80", "RS100"],
    },
    {
      brand: "VECOPLAN",
      models: ["VAZ 1300", "VAZ 1500", "VAZ 1700", "VAZ 2000", "VAZ 2500"],
    },
  ];

  const bladeImages = [
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
      title: "Single Shaft Blade - Front View",
    },
    {
      url: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&q=80",
      title: "Single Shaft Blade - Side Profile",
    },
    {
      url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
      title: "Single Shaft Blade - Cutting Edge Detail",
    },
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
      title: "Single Shaft Blade - Installation",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % bladeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + bladeImages.length) % bladeImages.length
    );
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-5_1770202027000_na1fn_YmxhZGUtYXJyYXktZGlzcGxheQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTVfMTc3MDIwMjAyNzAwMF9uYTFmbl9ZbXhoWkdVdFlYSnlZWGt0WkdsemNHeGhlUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Js9imFTDcB1slekk~p7nz6y-L5eaeU2UYFJzNDaXuqQVgH8guHPcsWeRxCHHLDqBi~i3GKAfTe9mvfyNYBlS7ywoOqVRztrBAPXyCZ7inKfzcKJhWJhZI8-ODtpvYK0Qm~nOjIb04u~FnlesHX3n6yDUuncqfGv~ZxJj~H28iJ65tHe6rPIQYAWktAsZQu~FuxxdN0OXJR~STWunEt-0pW47PTNbfXjZ~QFqGWrzhrDz3M4Ruvdcx1sdszJ9p~iYoqYdPZfLhmoQhdDRCHhXkl5HjTdNHxUohpuVGdl2dD-INs8apcHjU-D4kdHIlgTi2imFivr2fb4MA18rDEBw4w__"
            alt="Single Shaft Blades"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary rounded-sm">
              <span className="text-primary font-bold text-sm">
                PREMIUM REPLACEMENT BLADE
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              SINGLE SHAFT
              <span className="block text-primary mt-2">SHREDDER BLADES</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              High-torque single shaft blades engineered for superior wear
              resistance and extended service life in demanding recycling
              applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 animate-forge-pulse"
              >
                Request a Quote
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                <Download className="mr-2" size={20} />
                Download Spec Sheet
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
              Explore our single shaft shredder blade designs
            </p>
          </div>

          {/* Horizontal Card Grid */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentImageIndex * (100 / bladeImages.length)}%)`,
              }}
            >
              {bladeImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <Card className="overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-center font-medium text-foreground">
                        {image.title}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
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
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Key Features & Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-card rounded-sm border border-border hover:border-primary transition-all duration-300 group space-y-4"
              >
                <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
                <TabsTrigger
                  value="specs"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Applications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-8">
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-background rounded-sm border border-border"
                        >
                          <span className="text-muted-foreground font-medium">
                            {spec.label}
                          </span>
                          <span className="text-foreground font-bold font-mono">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-6 bg-primary/10 rounded-sm border border-primary">
                      <h4 className="text-lg font-bold text-foreground mb-3">
                        Custom Dimensions Available
                      </h4>
                      <p className="text-muted-foreground">
                        We can manufacture blades to your exact specifications.
                        Standard sizes range from 200mm to 1000mm in length with
                        various thickness options (15mm, 20mm, 25mm, 30mm,
                        40mm). Contact us with your machine model or drawings
                        for a custom quote.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="mt-8">
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      Ideal Applications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Plastic Recycling",
                          description:
                            "HDPE, PET, PVC pipes, bottles, containers, and rigid plastics",
                        },
                        {
                          title: "Wood Processing",
                          description:
                            "Pallets, construction lumber, furniture waste, and wood composites",
                        },
                        {
                          title: "E-Waste Recycling",
                          description:
                            "Computer cases, monitors, circuit boards, and electronic housings",
                        },
                        {
                          title: "Municipal Solid Waste",
                          description:
                            "Household waste, commercial refuse, and bulky item reduction",
                        },
                        {
                          title: "Paper & Cardboard",
                          description:
                            "Corrugated boxes, paper rolls, and packaging materials",
                        },
                        {
                          title: "Tire Recycling",
                          description:
                            "Passenger and truck tires for rubber granulate production",
                        },
                      ].map((app, index) => (
                        <div
                          key={index}
                          className="p-6 bg-background rounded-sm border border-border hover:border-primary transition-all duration-300"
                        >
                          <h4 className="text-lg font-bold text-foreground mb-2">
                            {app.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {app.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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
              Watch real-world performance demonstrations and installation
              guides
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
                title="Single Shaft Shredder Blade Demonstration"
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
      <section className="relative py-32 bg-card blade-cut-top">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Ready to Upgrade Your Blades?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Get a custom quote for your specific machine model and application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 animate-forge-pulse"
              >
                Request a Quote
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-12 py-6"
              >
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
