'use client';
import { useState } from 'react';
import VideoPopup from './VideoPopup';
export default function HeroSection({ children }) {
  const [showVideo, setShowVideo] = useState(false);
  const youtubeUrl = "https://www.youtube.com/watch?v=fW4_LOLGY38";  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-black/50 z-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Amazing Places With Us
          </h1>
          <p className="text-xl mb-8">
            Explore the world's most beautiful destinations with our expert guides
            and premium travel packages.
          </p>
          <div className="flex gap-4">
            {/* Simple button for testing */}
            <button className="bg-orange-500 text-white px-6 py-3 text-lg rounded-lg">
              Explore Tours
            </button>
            <button 
        onClick={() => setShowVideo(true)}
        className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 text-lg rounded-lg"
      >
        Watch Video
      </button>
      <VideoPopup 
        isOpen={showVideo} 
        onClose={() => setShowVideo(false)}
        youtubeUrl={youtubeUrl}
      />
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}
