"use client";

import React from "react";
import { Container } from "@mui/material";
import TourPackageCard from "../cards/TourCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { useCurrency } from "@/context/CurrencyContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const allPackages = [
  {
    title: "Tropical Paradise",
    location: "Bali, Indonesia",
    tourType: "Leisure",
    duration: "7N/8D",
    itinerary: "3N Bali → 2N Gili Islands → 2N Ubud",
    tags: ["Beach", "Luxury"],
    language: "English",
    rating: 4,
    guests: 2,
    originalPrice: 12000,
    discountedPrice: 9500,
    images: ["/images/bg/n1.jpg"],
  },
  {
    title: "Mountain Escape",
    location: "Everest Base Camp, Nepal",
    tourType: "Adventure",
    duration: "5N/6D",
    itinerary: "2N Kathmandu → 3N Everest Base Camp",
    tags: ["Adventure", "Hiking"],
    language: "German",
    rating: 5,
    guests: 2,
    originalPrice: 12000,
    discountedPrice: 9500,
    images: ["/images/bg/n2.jpg"],
  },
  {
    title: "European Dream",
    location: "Europe (Paris, Rome, Amsterdam)",
    tourType: "Cultural",
    duration: "10N/11D",
    itinerary: "3N Paris → 3N Rome → 4N Amsterdam",
    tags: ["Culture", "Luxury"],
    language: "French",
    rating: 5,
    guests: 1,
    originalPrice: 25000,
    discountedPrice: 22000,
    images: ["/images/bg/n1.jpg", "/images/bg/n2.jpg"],
  },
];

const TourPackage = ({ filters }) => {
  const { convertPrice, currencySymbol } = useCurrency();

  const filtered = allPackages.filter((pkg) => {
    const ratingMatch =
      !filters.rating?.length || filters.rating.includes(pkg.rating);
    const languageMatch =
      !filters.language?.length || filters.language.includes(pkg.language);
    const durationMatch =
      !filters.duration ||
      pkg.duration.toLowerCase().includes(filters.duration.toLowerCase());
    const locationMatch =
      !filters.location ||
      pkg.location.toLowerCase().includes(filters.location.toLowerCase());
    const tourTypeMatch =
      !filters.tourType ||
      pkg.tourType.toLowerCase().includes(filters.tourType.toLowerCase());
    const guestMatch =
      !filters.guests || pkg.guests === parseInt(filters.guests);

    return (
      ratingMatch &&
      languageMatch &&
      durationMatch &&
      locationMatch &&
      tourTypeMatch &&
      guestMatch
    );
  });

  return (
    <Container sx={{ mt: 4, position: "relative" }}>
      <div className="foggy-effect mb-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg mb-6 text-center">
          Top Trending
        </h2>
        <Swiper
          modules={[Autoplay, Navigation, Scrollbar]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          autoplay={{ delay: 3000 }}
          scrollbar={{ draggable: true }}
        >
          {filtered.map((pkg, index) => (
            <SwiperSlide key={index}>
              <TourPackageCard
                packageData={{
                  ...pkg,
                  originalPrice: `${currencySymbol}${convertPrice(
                    pkg.originalPrice
                  ).toFixed(2)}`,
                  discountedPrice: `${currencySymbol}${convertPrice(
                    pkg.discountedPrice
                  ).toFixed(2)}`,
                }}
                onClick={() => console.log(pkg.title)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};



export default TourPackage;
