/*
 * Design: Forged Aesthetics - Blogs page
 * Industry insights and company news
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Sparkles, Calendar, User } from "lucide-react";
import { Link } from "wouter";

export default function Blogs() {
  const blogPosts = [
    {
      title: "The Future of Industrial Recycling",
      excerpt:
        "Exploring emerging technologies and trends shaping the waste management industry in 2024 and beyond.",
      image: "/images/hero/hero.webp",
      date: "March 15, 2024",
      author: "Technical Team",
      category: "Industry Insights",
    },
    {
      title: "Maintenance Best Practices for Shredder Blades",
      excerpt:
        "Expert tips on extending blade life and maximizing operational efficiency for your recycling equipment.",
      image: "/images/hero/hero.webp",
      date: "March 10, 2024",
      author: "Engineering Team",
      category: "Technical Guides",
    },
    {
      title: "Choosing the Right Blade Material",
      excerpt:
        "A comprehensive guide to understanding different blade materials and their applications in various recycling scenarios.",
      image: "/images/hero/hero.webp",
      date: "March 5, 2024",
      author: "Product Team",
      category: "Product Knowledge",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Enhanced Design with Hero Background */}
      <section className="relative pt-32 pb-20 border-b border-border overflow-hidden min-h-[60vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hero.webp"
            alt="Blogs"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
              <Sparkles size={16} />
              Industry Insights
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Blog & News
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl drop-shadow-lg leading-relaxed">
              Industry insights, technical guides, and company updates from Sureay Machinery
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden hover:border-primary transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                  >
                    Read More
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative py-24 bg-card border-t border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              More Content Coming Soon
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay tuned for more industry insights, technical guides, and company updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
                >
                  Contact Us
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
