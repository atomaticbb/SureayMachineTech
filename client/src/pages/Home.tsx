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
      title: "Plastic Recycling",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    },
    {
      title: "Metal Recycling",
      image:
        "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
    },
    {
      title: "E-waste Recycling",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80",
    },
    {
      title: "Tire Recycling",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      title: "Industrial Waste",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    },
    {
      title: "Municipal Solid Waste",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    },
  ];

  const processSteps = [
    {
      step: "Step 1",
      title: "Customer Confirms Drawings",
      description:
        "Detailed technical review and specification confirmation with customer requirements",
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
    },
    {
      step: "Step 2",
      title: "Material Cutting",
      description:
        "Precision cutting of premium steel materials to exact dimensions",
      image:
        "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&q=80",
    },
    {
      step: "Step 3",
      title: "Quenching Process",
      description:
        "Controlled heat treatment to achieve optimal hardness and toughness",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
    },
    {
      step: "Step 4",
      title: "Initial Hardness Inspection After Quenching",
      description:
        "Rigorous hardness testing to verify heat treatment effectiveness",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    },
    {
      step: "Step 5",
      title: "Processing",
      description:
        "CNC machining and grinding to achieve precise cutting edges and tolerances",
      image:
        "https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80",
    },
    {
      step: "Step 6",
      title: "Inspection",
      description:
        "Comprehensive quality control including dimensional and visual inspection",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    },
    {
      step: "Step 7",
      title: "Final Product Storage",
      description:
        "Proper packaging and storage ensuring product protection until delivery",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
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

  // Auto-scroll for Our Process section
  useEffect(() => {
    const scrollContainer = processScrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const cardWidth = 320 + 24; // card width (w-80 = 320px) + gap (gap-6 = 24px)
    const totalCards = processSteps.length;

    const autoScroll = setInterval(() => {
      scrollPosition += cardWidth;

      // Reset to start when reaching the end
      if (scrollPosition >= cardWidth * totalCards) {
        scrollPosition = 0;
      }

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(autoScroll);
  }, [processSteps.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Full-bleed blade macro with forge gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-1_1770202027000_na1fn_aGVyby1zaHJlZGRlci1ibGFkZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTFfMTc3MDIwMjAyNzAwMF9uYTFmbl9hR1Z5YnkxemFISmxaR1JsY2kxaWJHRmtaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Kmv63yfN6MjO~ooADBDrMK8nxEM41ZOjtKHcFkPi6g6aF9ogQFMuENQHy5TOAdeSm9wseRWA3-Cl~W~ijsXbT338Lzx1SdfgumThADEx8arfZJtAq4PDumWbN0qkFiu~woIG1lXJgA6ICUvRMzCzp55IovEmX-ai3FomuKlodX4TR8izT8r76iln6zVTlaZ2ryB843EuX6EX4dAT5YQBYgOYZYWWWHOQAdSLzLpTkEv~eb7vSHojA2Ij1~3g07Vz8IsHOmoyxTJ7I2omkUFTnzg1l69BRCeidrWMMa3pVGELcL8Zu1eckK1NKGA8qXDwU-OEmK5HE6J2LbSyRQuoUQ__"
            alt="Shredder Blade"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight tracking-tight">
              ENGINEERING THE
              <span className="block text-primary mt-2">SHARPEST EDGE</span>
              FOR THE TOUGHEST WASTE
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Maximize your shredder's uptime with replacement blades designed
              for superior wear resistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 animate-forge-pulse"
              >
                Get a Trial Order Quote
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Find Your Blade
              </Button>
            </div>
          </div>
        </div>

        {/* Blade-cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background blade-cut-top"></div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Is Your Shredding Operation Held Back by These Issues?
            </h2>
            <p className="text-xl text-muted-foreground">
              Inefficient blades don't just cost money, they cost you production
              time and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
                title: "Premature Wear",
                description:
                  "Blades dulling too fast, forcing frequent changeovers and halting production lines.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
                title: "Unstable Performance",
                description:
                  "Inconsistent cutting quality leading to material jams and reprocessing needs.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
                title: "Excessive OEM Costs",
                description:
                  "Paying premium prices for brand-name replacement blades with standard durability.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80",
                title: "Quality Variance",
                description:
                  "Unpredictable lifespan between batches making maintenance planning impossible.",
              },
            ].map((issue, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {issue.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {issue.description}
                  </p>
                </CardContent>
              </Card>
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
            className="overflow-x-auto pb-4 scroll-smooth"
          >
            <div className="flex gap-6 min-w-max">
              {processSteps.map((process, index) => (
                <Card
                  key={index}
                  className="w-80 flex-shrink-0 overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={process.image}
                      alt={process.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="text-sm font-bold text-primary">
                      {process.step}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {process.title}
                    </h3>
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Shredder Blades for
                    </h3>
                    <p className="text-xl text-primary font-bold">
                      {app.title}
                    </p>
                    <ArrowRight
                      className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            ))}
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
                {manufacturingSteps.map((step, index) => (
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

          {/* Process Image */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-sm overflow-hidden aspect-video">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-3_1770202043000_na1fn_YmxhZGUtaGVhdC10cmVhdG1lbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTNfMTc3MDIwMjA0MzAwMF9uYTFmbl9ZbXhoWkdVdGFHVmhkQzEwY21WaGRHMWxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Rp4OcZEqGI7oZuizbcWo8Zzs5BeG95rp4N1KUZXoRhvFA~AAHjSFjRfC1Xcb63Kgg1EWkFAFzmXlA7SiJwNjYiyYmK5l9qOBmrEBZoFl6YPb9JHO~Ouyn4U0veqTzcMvTxVMMvZgehCtXAwziXjxm0oBemICptUeGnnBHMLb59Hsy0jqGAW2ashWrXQTKRoiQtQn7APFglajFAM7p3IlIM2GCpAoLou0rd5bMbok~plGjEYjX1HQSHRaabpOBLyOLxM69~xtzbLB3SdXMXisFPguIn8issEPEQljNM-2XT~JEe1wex5hJ-8JIViGWgY9fQNlWy4wdJjCdMZWLcyZHg__"
                alt="Heat Treatment Process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
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
                View Product Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
