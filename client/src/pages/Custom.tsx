/*
 * Design: Forged Aesthetics - Custom OEM services page
 * Focus on engineering capabilities and custom manufacturing
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Ruler,
  Send,
  Upload,
} from "lucide-react";

export default function Custom() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 forge-gradient opacity-50"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              CAN'T FIND YOUR PART?
              <span className="block text-primary mt-2">WE BUILD IT.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Custom blade manufacturing from your drawings, samples, or
              specifications
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              3 Easy Steps to Custom Blades
            </h2>
            <p className="text-xl text-muted-foreground">
              From concept to delivery in as little as 2-3 weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: Upload,
                title: "Send us a Sample/Drawing",
                description:
                  "Upload CAD files, technical drawings, or ship us a physical sample. We accept PDF, DWG, STEP, and IGES formats.",
              },
              {
                step: "02",
                icon: Ruler,
                title: "We Confirm Design",
                description:
                  "Our engineering team reviews specifications, suggests optimizations, and provides a detailed quote within 24-48 hours.",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Production & Delivery",
                description:
                  "Rapid prototyping or full production runs. Quality inspection and express shipping to your facility.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 group"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="text-primary" size={32} />
                    </div>
                    <span className="text-6xl font-bold text-primary/20 font-mono">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-24 bg-card blade-cut-top blade-cut-bottom">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Custom Manufacturing Capabilities
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced equipment and experienced engineers for complex
              geometries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Reverse Engineering",
                description:
                  "3D scanning and measurement of worn or damaged blades to recreate exact specifications",
              },
              {
                title: "Material Substitution",
                description:
                  "Upgrade to premium steel grades for enhanced performance without design changes",
              },
              {
                title: "Geometry Optimization",
                description:
                  "Engineering analysis to improve cutting efficiency and blade lifespan",
              },
              {
                title: "Prototype Development",
                description:
                  "Small batch production for testing before committing to full production runs",
              },
              {
                title: "Complex Profiles",
                description:
                  "Multi-axis CNC machining for intricate blade geometries and mounting patterns",
              },
              {
                title: "Surface Treatments",
                description:
                  "Coating options including TiN, TiCN, and chrome plating for specialized applications",
              },
              {
                title: "Assembly Services",
                description:
                  "Complete rotor assemblies with blades pre-installed and balanced",
              },
              {
                title: "Technical Support",
                description:
                  "Ongoing consultation for blade selection, maintenance, and troubleshooting",
              },
            ].map((capability, index) => (
              <Card
                key={index}
                className="bg-background border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Submit Your Custom Request
              </h2>
              <p className="text-xl text-muted-foreground">
                Upload your drawings or describe your requirements below
              </p>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-8 space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-border rounded-sm p-12 text-center hover:border-primary transition-colors cursor-pointer group">
                  <Upload
                    className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-4"
                    size={48}
                  />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Drop files here or click to upload
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    PDF, DWG, STEP, IGES, or photos of existing blades (Max
                    50MB)
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground">
                      Company
                    </Label>
                    <Input
                      id="company"
                      placeholder="Company name"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machine" className="text-foreground">
                      Machine Make/Model *
                    </Label>
                    <Input
                      id="machine"
                      placeholder="e.g., WEIMA WLK 15"
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-foreground">
                    Estimated Quantity
                  </Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 100 pieces per year"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your requirements, material preferences, or any special considerations..."
                    rows={6}
                    className="bg-background border-border"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-sm">
                  <FileText
                    className="text-primary flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">
                      Secure & Confidential:
                    </span>{" "}
                    All submissions are protected by NDA. We typically respond
                    within 24 hours with preliminary feedback and quote
                    timeline.
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 animate-forge-pulse"
                >
                  Submit Request
                  <Send className="ml-2" size={20} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative py-24 bg-card blade-cut-top">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Custom Project Examples
            </h2>
            <p className="text-xl text-muted-foreground">
              Real solutions for unique challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Obsolete Machine Parts",
                challenge:
                  "Customer had a 20-year-old shredder with discontinued blade design",
                solution:
                  "Reverse engineered from worn sample, upgraded to SKD11 steel for 40% longer life",
                result: "Delivered 200 pieces in 3 weeks",
              },
              {
                title: "Performance Upgrade",
                challenge:
                  "Standard OEM blades wearing out too quickly on abrasive e-waste",
                solution:
                  "Redesigned edge geometry and added tungsten carbide inserts",
                result: "Blade life increased from 3 months to 14 months",
              },
              {
                title: "Cost Reduction",
                challenge:
                  "Paying $180/blade for OEM parts with 6-week lead time",
                solution:
                  "Direct manufacturing with equivalent D2 steel and 2-week turnaround",
                result: "Reduced cost to $95/blade, saved $17,000 annually",
              },
            ].map((study, index) => (
              <Card
                key={index}
                className="bg-background border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-primary">
                    {study.title}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold text-foreground">
                        Challenge:
                      </span>
                      <p className="text-muted-foreground mt-1">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">
                        Solution:
                      </span>
                      <p className="text-muted-foreground mt-1">
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-primary">Result:</span>
                      <p className="text-foreground mt-1 font-medium">
                        {study.result}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Ready to Discuss Your Project?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Talk to our engineering team about your custom blade requirements
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6 animate-forge-pulse"
            >
              Schedule Engineering Call
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
