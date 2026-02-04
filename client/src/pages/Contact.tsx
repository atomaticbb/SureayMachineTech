/*
 * Design: Forged Aesthetics - Contact Us page
 * Two-column layout with factory background
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Factory Background */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/atwthpmfUJ1KdGMP3YZhNS/sandbox/JHe2l9yPfpfDg5Wy1OgpOo-img-2_1770202043000_na1fn_c2hyZWRkZXItbWFjaGluZS1vcGVyYXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYXR3dGhwbWZVSjFLZEdNUDNZWmhOUy9zYW5kYm94L0pIZTJsOXlQZnBmRGc1V3kxT2dwT28taW1nLTJfMTc3MDIwMjA0MzAwMF9uYTFmbl9jMmh5WldSa1pYSXRiV0ZqYUdsdVpTMXZjR1Z5WVhScGIyNC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=m2YQ~h4KExwt4q43UV1NAPaNgcAMVusyYgM4eep8-2x9B~SLKoNRbJj3zI0brtto5euOQXjlHhPVKvKphfEEz8BWSMjJQAm22n9Zre0aICxGkHnerUtXMnfUCZNHLKWvqD6dy53E~C8XCXT2O2dEwdSO4t9FS8cx8Q~P4~P2OrhKT-Avv39qM1OdA~cLAC6snVpcv71DLPZ6WFh9WUvtMKKPtPUesww-yKxuoSt4UUGChDEWXxMMoX~s5bgWKctxOyHl9Uw8OSjdBGB-IhOb8x2ONQe8H6~G-AKGtDCkQROUwbtLzuC2g8ktpz8KORorAj4DJ-K66X5of-SDFW512g__"
            alt="Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/95 to-background"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              GET IN
              <span className="block text-primary mt-2">TOUCH</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Request a quote, ask technical questions, or discuss your blade requirements
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Left Column - Contact Form */}
            <div>
              <Card className="bg-card border-border">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form and we'll get back to you within 24-48 hours
                    </p>
                  </div>

                  <form className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          className="bg-background border-border"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="bg-background border-border"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-foreground">Company</Label>
                        <Input
                          id="company"
                          placeholder="Your Company Ltd."
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    {/* Inquiry Details */}
                    <div className="space-y-2">
                      <Label htmlFor="inquiry-type" className="text-foreground">Inquiry Type *</Label>
                      <Select required>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quote">Request a Quote</SelectItem>
                          <SelectItem value="technical">Technical Question</SelectItem>
                          <SelectItem value="order">Order Status</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        className="bg-background border-border"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 animate-forge-pulse"
                    >
                      Send Message
                      <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="bg-card border-border">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Phone</h4>
                        <p className="text-muted-foreground">+86 512 5820 6666</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM CST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">WhatsApp</h4>
                        <p className="text-muted-foreground">+86 138 1234 5678</p>
                        <p className="text-sm text-muted-foreground">24/7 Available</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Email</h4>
                        <p className="text-muted-foreground">info@liqunmachinery.com</p>
                        <p className="text-muted-foreground">sales@liqunmachinery.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Address</h4>
                        <p className="text-muted-foreground">
                          Zhangjiagang City<br />
                          Jiangsu Province, China
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Factory Map */}
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107350.36181634434!2d120.44!3d31.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b3c1c8e8e8e8e8%3A0x8e8e8e8e8e8e8e8e!2sZhangjiagang%2C%20Suzhou%2C%20Jiangsu%2C%20China!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-foreground mb-2">Visit Our Factory</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule a factory tour to see our manufacturing process and quality control firsthand
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
