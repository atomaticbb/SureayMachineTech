/**
 * VideoShowcase Component
 * Displays an immersive video showcase of the machine in action
 */

import React from "react";
import { VideoConfig } from "@/data/machines";

interface VideoShowcaseProps {
  video: VideoConfig;
}

export default function VideoShowcase({ video }: VideoShowcaseProps) {
  return (
    <section className="w-full bg-slate-900">
      <div className="relative w-full h-[400px] lg:h-[550px] overflow-hidden">

        {/* Video Element */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={video.poster}
        >
          <source src={video.url} type="video/mp4" />
        </video>

        {/* Subtle Vignette - Corner darkening for depth */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]"></div>

        {/* Live Status Badge - Bottom Right */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Action</span>
        </div>

      </div>
    </section>
  );
}
