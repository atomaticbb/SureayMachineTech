/*
 * Design: Forged Aesthetics - Product catalog with blade-cut sections
 * Grid layout with metal texture cards and forge orange accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Products() {
  const productCategories = [
    {
      title: "Single Shaft Shredder Blades",
      description: "High-torque single shaft blades for primary size reduction of bulky materials",
      specs: ["D2/SKD11 Steel", "58-62 HRC", "Custom Dimensions"],
      image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
    },
    {
      title: "Dual Shaft Shredder Blades",
      description: "Interlocking blade pairs for aggressive cutting of tough materials",
      specs: ["Carbide Tipped Options", "Hook & Flat Designs", "WEIMA/SSI Compatible"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    },
    {
      title: "Granulator Blades",
      description: "Precision ground blades for fine particle size reduction",
      specs: ["Mirror Finish Edge", "±0.05mm Tolerance", "Extended Lifespan"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    },
    {
      title: "Hook Blades",
      description: "Specialized hook geometry for fiber and textile processing",
      specs: ["Anti-Wrap Design", "Self-Cleaning", "Reduced Downtime"],
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80",
    },
    {
      title: "Shredder Block Knives",
      description: "Heavy-duty block knives for industrial waste shredders",
      specs: ["Through-Hardened", "Multiple Cutting Edges", "Cost-Effective"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    },
    {
      title: "Custom OEM Blades",
      description: "Engineered to your exact specifications and drawings",
      specs: ["Reverse Engineering", "Sample Matching", "24-48hr Quotes"],
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80",
    },
  ];

  const compatibleBrands = [
    {
      name: "WEIMA",
      models: "WLK, WL, WKS Series",
    },
    {
      name: "SSI",
      models: "Quad, Dual, Single Shaft",
    },
    {
      name: "UNTHA",
      models: "RS, XR, LR Series",
    },
    {
      name: "VECOPLAN",
      models: "VAZ, VIZ, VHZ Series",
    },
    {
      name: "LINDNER",
      models: "Jupiter, Micromat, Komet",
    },
    {
      name: "HAMMEL",
      models: "VB, VC, VD Series",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-5_1770202027000_na1fn_YmxhZGUtYXJyYXktZGlzcGxheQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTVfMTc3MDIwMjAyNzAwMF9uYTFmbl9ZbXhoWkdVdFlYSnlZWGt0WkdsemNHeGhlUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Js9imFTDcB1slekk~p7nz6y-L5eaeU2UYFJzNDaXuqQVgH8guHPcsWeRxCHHLDqBi~i3GKAfTe9mvfyNYBlS7ywoOqVRztrBAPXyCZ7inKfzcKJhWJhZI8-ODtpvYK0Qm~nOjIb04u~FnlesHX3n6yDUuncqfGv~ZxJj~H28iJ65tHe6rPIQYAWktAsZQu~FuxxdN0OXJR~STWunEt-0pW47PTNbfXjZ~QFqGWrzhrDz3M4Ruvdcx1sdszJ9p~iYoqYdPZfLhmoQhdDRCHhXkl5HjTdNHxUohpuVGdl2dD-INs8apcHjU-D4kdHIlgTi2imFivr2fb4MA18rDEBw4w__"
            alt="Blade Array"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              PREMIUM REPLACEMENT
              <span className="block text-primary mt-2">SHREDDER BLADES</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Direct manufacturer compatible with WEIMA, SSI, Vecoplan, and more. Save 30% on factory direct pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Shop by Blade Type
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each blade type is engineered for specific applications and material characteristics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 group overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                        <span className="text-sm text-muted-foreground">{spec}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground group-hover:animate-forge-pulse"
                  >
                    View Models
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Brands */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Shop by Machine Brand
            </h2>
            <p className="text-xl text-muted-foreground">
              Direct replacement blades for leading shredder manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {compatibleBrands.map((brand, index) => (
              <Card
                key={index}
                className="bg-background border-border hover:border-primary transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8 space-y-4 text-center">
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors font-mono">
                    {brand.name}
                  </h3>
                  <p className="text-muted-foreground">{brand.models}</p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary-foreground hover:bg-primary"
                  >
                    View Compatible Blades
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Material Options */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Material Grade Options
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the right steel grade based on your application requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card border-border hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-4xl font-bold text-primary font-mono">D2</div>
                <h3 className="text-2xl font-bold text-foreground">Standard Grade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Excellent wear resistance for general recycling applications. 58-60 HRC hardness.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Cost-effective</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Good toughness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Proven reliability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-primary relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-sm">
                RECOMMENDED
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="text-4xl font-bold text-primary font-mono">SKD11</div>
                <h3 className="text-2xl font-bold text-foreground">Premium Grade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Superior wear resistance with enhanced toughness. 60-62 HRC hardness.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">30-50% longer life</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Better edge retention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Reduced downtime</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-4xl font-bold text-primary font-mono">TC</div>
                <h3 className="text-2xl font-bold text-foreground">Carbide Tipped</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Maximum wear resistance for extreme applications. Tungsten carbide inserts.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Longest lifespan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Abrasive materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">Premium investment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-card blade-cut-top">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Can't Find Your Part?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              We manufacture custom blades to your exact specifications
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 animate-forge-pulse"
            >
              Request Custom Quote
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
