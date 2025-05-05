"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function DestinationCard({ destination }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images if multiple exist
  useEffect(() => {
    if (!destination?.images || destination.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        (prev + 1) % destination.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [destination?.images]);

  // Fallback if no destination provided
  if (!destination) {
    return (
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
      {/* Image Slider */}
      {destination.images?.length > 1 ? (
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation
          className="h-full w-full"
        >
          {destination.images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${destination.images?.[0] || '/images/placeholder-destination.jpg'})` 
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Tour count badge */}
      {destination.tours > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
          {destination.tours} {destination.tours === 1 ? 'Tour' : 'Tours'}
        </span>
      )}

      {/* Destination info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
        <h3 className="text-lg font-semibold mb-1">
          <Link 
            href={`/destinations/${destination.slug || destination.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover:text-orange-300 transition-colors"
          >
            {destination.title}
          </Link>
        </h3>
        {destination.departures > 0 && (
          <p className="text-sm opacity-90">
            {destination.departures} Departures
          </p>
        )}
      </div>
    </div>
  );
}