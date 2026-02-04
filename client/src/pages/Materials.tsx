/*
 * Design: Forged Aesthetics - Materials science and metallurgy showcase
 * Heat treatment visualization with forge gradients
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Flame, Gauge, Microscope, Zap } from "lucide-react";

export default function Materials() {
  const materialComparison = [
    {
      grade: "Economy",
      material: "Cr12MoV",
      hardness: "56-58 HRC",
      wearResistance: 60,
      toughness: 80,
      cost: "$",
    },
    {
      grade: "Standard",
      material: "D2 Steel",
      hardness: "58-60 HRC",
      wearResistance: 75,
      toughness: 70,
      cost: "$$",
    },
    {
      grade: "Premium",
      material: "SKD11",
      hardness: "60-62 HRC",
      wearResistance: 90,
      toughness: 75,
      cost: "$$$",
    },
    {
      grade: "Ultra",
      material: "Carbide Tipped",
      hardness: "65+ HRC",
      wearResistance: 100,
      toughness: 60,
      cost: "$$$$",
    },
  ];

  const processSteps = [
    {
      icon: Microscope,
      title: "Forging",
      description: "High-temperature forging aligns grain structure for maximum strength and eliminates internal voids",
      temp: "1200°C",
    },
    {
      icon: Gauge,
      title: "CNC Machining",
      description: "Precision 5-axis CNC machining ensures dimensional accuracy to ±0.05mm tolerance",
      temp: "20°C",
    },
    {
      icon: Flame,
      title: "Vacuum Heat Treatment",
      description: "Controlled atmosphere hardening prevents oxidation and ensures uniform hardness distribution",
      temp: "1050°C",
    },
    {
      icon: Zap,
      title: "Cryogenic Tempering",
      description: "Sub-zero treatment converts retained austenite to martensite for enhanced wear resistance",
      temp: "-196°C",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-4_1770202029000_na1fn_cHJlY2lzaW9uLW1hY2hpbmluZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTRfMTc3MDIwMjAyOTAwMF9uYTFmbl9jSEpsWTJsemFXOXVMVzFoWTJocGJtbHVady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=E71a6ZkfrH6O3EcKHhdGpdrPWi5nKb57brYANRzFKm~vfwArtyXGXZlPce7TXy6jBA0v7WckZpqBmVCrFyCjLJtTAKuX5TU9SB7z3zZuvK9b92~mfqZ2IDB95F88g81ESWHzQWuYjjq0opBIo834yZiAjOiC75uhAtZDMkn6yXLcHKXV6iTEdkPhd8Ivl8bS1uu8hgp~gU9ANtlh6c84fYFDMD7etuEcnk2OalFZ33bppcs3C~LT2SG3uTr~yMF4CuHWHWHvKEjMYurwT8I15t4-gXABxTDp7n6sb92QpOPXJRDTp5WUvkPSUAQurIx8yAYe7-~Z8eWUUjNE6COoyQ__"
            alt="Precision Machining"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              THE SCIENCE OF
              <span className="block text-primary mt-2">CUTTING</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Advanced metallurgy and precision heat treatment for blades that last longer
            </p>
          </div>
        </div>
      </section>

      {/* Material Comparison */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Material Grade Comparison
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the optimal balance between wear resistance, toughness, and cost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialComparison.map((material, index) => (
              <Card
                key={index}
                className={`bg-card border-border hover:border-primary transition-all duration-300 ${
                  material.grade === "Premium" ? "border-2 border-primary" : ""
                }`}
              >
                <CardContent className="p-6 space-y-6">
                  {material.grade === "Premium" && (
                    <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-sm inline-block">
                      RECOMMENDED
                    </div>
                  )}
                  <div>
                    <div className="text-3xl font-bold text-primary font-mono mb-2">
                      {material.material}
                    </div>
                    <div className="text-sm text-muted-foreground">{material.grade} Grade</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Wear Resistance</span>
                        <span className="text-foreground font-bold">{material.wearResistance}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${material.wearResistance}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Toughness</span>
                        <span className="text-foreground font-bold">{material.toughness}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${material.toughness}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Hardness</span>
                      <span className="text-foreground font-bold font-mono">{material.hardness}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">Cost</span>
                      <span className="text-primary font-bold">{material.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Manufacturing Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Precision at every step from raw steel to finished blade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-6 p-8 bg-background rounded-sm border border-border">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center">
                    <step.icon className="text-primary" size={32} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                    <span className="text-primary font-bold font-mono text-sm px-3 py-1 bg-primary/10 rounded-sm">
                      {step.temp}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Heat Treatment Visualization */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-sm overflow-hidden aspect-video">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-3_1770202043000_na1fn_YmxhZGUtaGVhdC10cmVhdG1lbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTNfMTc3MDIwMjA0MzAwMF9uYTFmbl9ZbXhoWkdVdGFHVmhkQzEwY21WaGRHMWxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Rp4OcZEqGI7oZuizbcWo8Zzs5BeG95rp4N1KUZXoRhvFA~AAHjSFjRfC1Xcb63Kgg1EWkFAFzmXlA7SiJwNjYiyYmK5l9qOBmrEBZoFl6YPb9JHO~Ouyn4U0veqTzcMvTxVMMvZgehCtXAwziXjxm0oBemICptUeGnnBHMLb59Hsy0jqGAW2ashWrXQTKRoiQtQn7APFglajFAM7p3IlIM2GCpAoLou0rd5bMbok~plGjEYjX1HQSHRaabpOBLyOLxM69~xtzbLB3SdXMXisFPguIn8issEPEQljNM-2XT~JEe1wex5hJ-8JIViGWgY9fQNlWy4wdJjCdMZWLcyZHg__"
                alt="Heat Treatment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  Vacuum Heat Treatment Process
                </h3>
                <p className="text-lg text-muted-foreground">
                  Controlled atmosphere prevents oxidation and ensures uniform hardness from 1025°C heating to sub-zero cooling
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Quality Control & Testing
            </h2>
            <p className="text-xl text-muted-foreground">
              100% inspection ensures every blade meets specification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Dimensional Inspection",
                description: "CMM coordinate measuring ensures ±0.05mm tolerance on all critical dimensions",
                metric: "±0.05mm",
              },
              {
                title: "Hardness Testing",
                description: "Rockwell hardness verification at multiple points across blade surface",
                metric: "58-62 HRC",
              },
              {
                title: "Metallurgical Analysis",
                description: "Grain structure and composition verification via optical microscopy",
                metric: "100% Pass",
              },
            ].map((test, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="text-5xl font-bold text-primary font-mono">{test.metric}</div>
                  <h3 className="text-xl font-bold text-foreground">{test.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{test.description}</p>
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
              Want to Learn More About Our Materials?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Download our technical specification sheet or speak with our metallurgy team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 animate-forge-pulse"
              >
                Download Tech Specs
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-12 py-6"
              >
                Contact Engineering Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
