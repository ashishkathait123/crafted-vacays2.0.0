"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Link from "next/link";

const DestinationCard = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { fetchDestinationsFromWP } = await import("@/lib/api/destinations");
      const data = await fetchDestinationsFromWP();
      setDestinations(data);
      setCurrentImages(data.map((d) => d.images?.[0] || "/images/destinations/default.jpg"));
    };

    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prevImages) =>
        prevImages.map((currentImage, index) => {
          const destination = destinations[index];
          if (!destination || !destination.images?.length) return "/images/destinations/default.jpg";
          const nextIndex = (destination.images.indexOf(currentImage) + 1) % destination.images.length;
          return destination.images[nextIndex];
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [destinations]);

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 xl:px-32 2xl:px-40">
      <Swiper
        modules={[Autoplay, Navigation, Scrollbar]}
        slidesPerView={1}
        spaceBetween={20}
        loop
        speed={2500}
        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        scrollbar={{ draggable: true }}
        grabCursor
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={destination.id || index}>
            <div
              className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] xl:h-[350px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentImages[index]})`,
                transition: "background-image 1s ease-in-out",
              }}
            >
              <div className="absolute inset-0 bg-black/50 z-0" />
              <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1 text-sm rounded">
                {destination.tours || 0} Tours
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                <h3 className="text-lg md:text-xl font-semibold">
                  <Link href={`/destinations/${destination.slug || destination.title.toLowerCase()}`}>
                    {destination.title}
                  </Link>
                </h3>
                <p className="text-sm">{destination.departures || 0} Departures</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DestinationCard;
