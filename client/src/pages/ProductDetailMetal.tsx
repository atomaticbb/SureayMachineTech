/*
 * Design: Forged Aesthetics - Metal Shredder Blades Product Detail Page
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2, Download, Mail, Phone } from "lucide-react";

export default function ProductDetailMetal() {
  const keyFeatures = [
    {
      title: "Superior Hardness",
      description: "58-62 HRC for cutting steel, aluminum, and copper",
    },
    {
      title: "Precision Ground",
      description: "Clean, burr-free cuts with extended edge life",
    },
    {
      title: "Heat Treated",
      description: "Vacuum treatment for uniform hardness",
    },
    {
      title: "Heavy-Duty",
      description: "Engineered for scrap metal yards",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
            alt="Metal Shredder Blades"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="text-sm text-muted-foreground">
              Products / Metal Processing
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              SHREDDER BLADES
              <span className="block text-primary mt-2">FOR METAL</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              Heavy-duty blades engineered to handle ferrous and non-ferrous metals with exceptional edge retention and minimal downtime
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
                        Metal shearing blades, guillotine shear blades, gantry shear blades, circular shear blades, metal cutting knives, scrap metal blades
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Materials</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">6CrW2Si - Cost-effective for cold-rolled plates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Cr12MoV - Hot plates and stainless steel</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">H13/H13K - High-temperature thermal shearing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">W6Mo5CrV2 (6542) - High-speed steel applications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">W18Cr4V - Extreme wear resistance</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Hardness & Treatment</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Hardness: 58-62 HRC (customizable)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Vacuum heat treatment for uniform hardness</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Deep freezing process for stability</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                            <span className="text-muted-foreground">Precision grinding to ±0.01mm tolerance</span>
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
                          <div className="font-mono text-sm text-foreground">Custom Length</div>
                          <div className="text-xs text-muted-foreground mt-1">Up to 3000mm</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Custom Width</div>
                          <div className="text-xs text-muted-foreground mt-1">Up to 500mm</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Custom Thickness</div>
                          <div className="text-xs text-muted-foreground mt-1">10-100mm</div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-center">
                          <div className="font-mono text-sm text-foreground">Mounting Holes</div>
                          <div className="text-xs text-muted-foreground mt-1">Per drawing</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Machine Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Gantry Shearing Machines", "Guillotine Shears", "Circular Slitting Machines", "Scrap Metal Shredders", "Alligator Shears", "Rotary Shears"].map((machine, idx) => (
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
                      <h3 className="text-xl font-bold text-foreground mb-4">Suitable Materials</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Aluminum & Aluminum Alloys</div>
                            <div className="text-sm text-muted-foreground">Beverage cans, window frames, automotive parts</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Copper & Copper Wire</div>
                            <div className="text-sm text-muted-foreground">Electrical cables, plumbing pipes, radiators</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Steel & Stainless Steel</div>
                            <div className="text-sm text-muted-foreground">Sheet metal, drums, automotive bodies, appliances</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Mixed Metal Scrap</div>
                            <div className="text-sm text-muted-foreground">Industrial waste, demolition materials</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="font-semibold text-foreground">Thin to Medium-Thick Plates</div>
                            <div className="text-sm text-muted-foreground">Cold-rolled and hot-rolled steel sheets</div>
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
                            <div className="font-semibold text-foreground">Scrap Metal Recycling Yards</div>
                            <div className="text-sm text-muted-foreground">High-volume processing of mixed metal waste</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Automotive Recycling</div>
                            <div className="text-sm text-muted-foreground">Dismantling and processing end-of-life vehicles</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Steel Mills & Rolling Mills</div>
                            <div className="text-sm text-muted-foreground">Cutting and slitting steel strips and coils</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Metal Processing Centers</div>
                            <div className="text-sm text-muted-foreground">Fabrication shops and service centers</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-foreground">Appliance Recycling</div>
                            <div className="text-sm text-muted-foreground">Processing refrigerators, washers, and HVAC units</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-bold text-foreground mb-3">Performance Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">30-50%</div>
                        <div className="text-sm text-muted-foreground">Longer blade life vs. standard grades</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">Clean</div>
                        <div className="text-sm text-muted-foreground">Burr-free cuts reduce secondary processing</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">Minimal</div>
                        <div className="text-sm text-muted-foreground">Downtime for blade changes</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-card blade-cut-top overflow-hidden">
        <div className="absolute inset-0 z-0 forge-gradient opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Upgrade Your Metal Shredder Blades?
            </h2>
            <p className="text-xl text-muted-foreground">
              Get a custom quote based on your machine specifications and material requirements
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
