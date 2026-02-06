/*
 * Design: Forged Aesthetics - Contact Us page
 * Two-column layout with factory background
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error: any) => {
            toast.error(error.message || "Validation error");
          });
        } else {
          toast.error(data.message || "Failed to send message. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Factory Background */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/common/metal-industrial-1.webp"
            alt="Factory"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-foreground">
              GET IN
              <span className="block text-primary mt-2">TOUCH</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Request a quote, ask technical questions, or discuss your blade
              requirements
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-stretch">
            {/* Left Column - Contact Form */}
            <div className="flex">
              <Card className="bg-card border-border w-full">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form and we'll get back to you within 24-48
                      hours
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          className="bg-background border-border"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="bg-background border-border"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-foreground">
                          Company
                        </Label>
                        <Input
                          id="company"
                          placeholder="Your Company Ltd."
                          className="bg-background border-border"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="bg-background border-border"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        className="bg-background border-border"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 animate-forge-pulse"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Info */}
            <div className="flex">
              {/* Contact Information */}
              <Card className="bg-card border-border w-full">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">
                      Contact Information
                    </h2>
                    <p className="text-muted-foreground">
                      Reach out to us through any of these channels
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          Phone
                        </h4>
                        <p className="text-muted-foreground">
                          +86 155 5175 7389
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mon-Fri 9AM-6PM CST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          WhatsApp
                        </h4>
                        <p className="text-muted-foreground">
                          +86 155 5175 7389
                        </p>
                        <p className="text-sm text-muted-foreground">
                          24/7 Available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          Email
                        </h4>
                        <p className="text-muted-foreground">
                          info@shredderbladesdirect.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          Address
                        </h4>
                        <p className="text-muted-foreground">
                          Bowang High-tech Industrial Development Zone
                          <br />
                          Ma'anshan City, China
                        </p>
                      </div>
                    </div>
                  </div>
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
