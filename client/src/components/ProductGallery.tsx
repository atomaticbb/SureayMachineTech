/**
 * ProductGallery Component - Image gallery with thumbnails
 * Used in MachineDetail page for displaying product images
 */

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[]; // Array of image URLs [main, img2, img3, img4]
  alt: string; // Alt text for images
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
        <img
          src={images[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/images/products/machinery.webp";
          }}
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedIndex === index
                  ? "border-[#003366] ring-2 ring-[#003366] ring-opacity-30"
                  : "border-slate-200 dark:border-slate-700 hover:border-[#FF6600]"
              }`}
            >
              <img
                src={img}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover p-2"
                onError={(e) => {
                  e.currentTarget.src = "/images/products/machinery.webp";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
