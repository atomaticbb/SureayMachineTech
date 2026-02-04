/*
 * Design: Forged Aesthetics - About page with company story and values
 * Industrial imagery with forge aesthetic elements
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowRight, Award, Factory, Globe, Users } from "lucide-react";

export default function About() {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Countries Served" },
    { number: "10,000+", label: "Blade Designs" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  const values = [
    {
      icon: Factory,
      title: "Manufacturing Excellence",
      description: "State-of-the-art CNC machining centers and heat treatment facilities ensure consistent quality and precision in every blade we produce.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving recycling facilities and shredder operators worldwide with responsive support and fast international shipping.",
    },
    {
      icon: Users,
      title: "Customer Partnership",
      description: "We work closely with our customers to understand their unique challenges and develop solutions that maximize uptime and reduce costs.",
    },
    {
      icon: Award,
      title: "Quality Commitment",
      description: "ISO 9001 certified processes and rigorous quality control ensure every blade meets or exceeds OEM specifications.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-2_1770202043000_na1fn_c2hyZWRkZXItbWFjaGluZS1vcGVyYXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTJfMTc3MDIwMjA0MzAwMF9uYTFmbl9jMmh5WldSa1pYSXRiV0ZqYUdsdVpTMXZjR1Z5WVhScGIyNC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=m2YQ~h4KExwt4q43UV1NAPaNgcAMVusyYgM4eep8-2x9B~SLKoNRbJj3zI0brtto5euOQXjlHhPVKvKphfEEz8BWSMjJQAm22n9Zre0aICxGkHnerUtXMnfUCZNHLKWvqD6dy53E~C8XCXT2O2dEwdSO4t9FS8cx8Q~P4~P2OrhKT-Avv39qM1OdA~cLAC6snVpcv71DLPZ6WFh9WUvtMKKPtPUesww-yKxuoSt4UUGChDEWXxMMoX~s5bgWKctxOyHl9Uw8OSjdBGB-IhOb8x2ONQe8H6~G-AKGtDCkQROUwbtLzuC2g8ktpz8KORorAj4DJ-K66X5of-SDFW512g__"
            alt="Factory"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              ENGINEERING
              <span className="block text-primary mt-2">BLADE EXCELLENCE</span>
              SINCE 2010
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Liqun Machinery specializes in precision-engineered replacement shredder blades for the global recycling industry
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-5xl md:text-6xl font-black text-primary font-mono">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
              Our Story
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2010 in Zhangjiagang, Jiangsu Province, Liqun Machinery began with a simple mission: to provide 
                recycling facilities with high-quality replacement shredder blades at fair prices. Our founder, a former 
                metallurgical engineer, recognized that many operators were paying premium prices for OEM parts that didn't 
                last as long as they should.
              </p>
              
              <p>
                We invested heavily in understanding the science of blade performance—not just the geometry, but the 
                metallurgy, heat treatment, and real-world wear patterns. By combining advanced CNC machining with 
                precision heat treatment processes, we developed blades that consistently outperform standard replacements.
              </p>
              
              <p>
                Today, we serve customers in over 50 countries, from small recycling operations to large industrial 
                facilities. Our engineering team has reverse-engineered thousands of blade designs, building a comprehensive 
                database that allows us to quickly provide exact replacements for virtually any shredder model.
              </p>
              
              <p className="text-foreground font-semibold">
                What sets us apart isn't just our manufacturing capability—it's our commitment to understanding each 
                customer's specific challenges and delivering solutions that maximize their equipment uptime and profitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="flex gap-6 p-8 bg-card rounded-sm border border-border hover:border-primary transition-all duration-300 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="text-primary" size={32} />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="relative py-24 bg-card blade-cut-top">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  State-of-the-Art Manufacturing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our 15,000 square meter facility in Zhangjiagang houses advanced CNC machining centers, 
                  vacuum heat treatment furnaces, and comprehensive quality control equipment.
                </p>
                <ul className="space-y-3">
                  {[
                    "20+ CNC machining centers with 5-axis capability",
                    "Vacuum heat treatment furnaces with precise temperature control",
                    "CMM coordinate measuring machines for dimensional verification",
                    "Metallurgical lab with optical microscopy and hardness testing",
                    "ISO 9001:2015 certified quality management system",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80"
                  alt="Manufacturing Facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Certifications & Standards
            </h2>
            <p className="text-xl text-muted-foreground">
              Committed to international quality and safety standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {["ISO 9001:2015", "CE Certified", "SGS Verified", "RoHS Compliant"].map((cert, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <Award className="mx-auto text-primary mb-4" size={48} />
                  <h3 className="text-lg font-bold text-foreground">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-card blade-cut-top">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Partner With Us
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Experience the Liqun difference in blade quality and customer service
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
                Schedule Factory Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
