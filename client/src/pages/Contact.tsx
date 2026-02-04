/*
 * Design: Forged Aesthetics - Contact Us page
 * Dedicated contact and inquiry page separate from Custom OEM
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
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 forge-gradient opacity-50"></div>

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

      {/* Contact Info Cards */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                content: "Zhangjiagang City\nJiangsu Province, China",
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "+86 512 5820 6666\nMon-Fri 9AM-6PM CST",
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "info@liqunmachinery.com\nsales@liqunmachinery.com",
              },
              {
                icon: Clock,
                title: "Response Time",
                content: "24-48 Hours\nFor all inquiries",
              },
            ].map((item, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-8 space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24-48 hours
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className="bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Your Company Ltd."
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
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
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="machine" className="text-foreground">Machine Make/Model (if applicable)</Label>
                    <Input
                      id="machine"
                      placeholder="e.g., WEIMA WLK 15, SSI Quad 40"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry, including quantity requirements, delivery timeline, or any specific questions..."
                      rows={8}
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-sm">
                    <Mail className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground">Privacy Guarantee:</span> Your information is secure 
                      and will only be used to respond to your inquiry. We never share contact details with third parties.
                    </div>
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
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-24 bg-card blade-cut-top">
        <div className="container">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Location
            </h2>
            <p className="text-xl text-muted-foreground">
              Visit our manufacturing facility in Zhangjiagang, Jiangsu Province
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-secondary rounded-sm overflow-hidden border border-border">
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
          </div>

          {/* Office Hours */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="bg-background border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Business Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="text-foreground font-bold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="text-foreground font-bold">9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground font-bold">Closed</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Zone</span>
                      <span className="text-foreground font-bold">CST (UTC+8)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emergency Support</span>
                      <span className="text-foreground font-bold">24/7 Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="text-primary font-bold">24-48 Hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
