/**
 * ApplicationGallery Component
 * Displays a grid of applications showcasing what can be built with the machine
 */

import React from "react";
import { ApplicationItem } from "@/data/machines";

interface ApplicationGalleryProps {
  applications: ApplicationItem[];
}

export default function ApplicationGallery({ applications }: ApplicationGalleryProps) {
  if (!applications || applications.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#003366] font-bold text-3xl mb-4">Industry Applications</h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Our industrial machinery delivers exceptional results across diverse manufacturing and recycling applications, from metal processing to waste management solutions.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {applications.map((application, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden aspect-[4/5] group cursor-pointer">
              {/* Image */}
              <img
                src={application.img}
                alt={application.title}
                loading="lazy"
                width={400}
                height={500}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = "/images/products/machinery.webp";
                }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg">{application.title}</h3>
                <div className="w-0 group-hover:w-12 h-1 bg-[#FF6600] transition-all duration-300 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
