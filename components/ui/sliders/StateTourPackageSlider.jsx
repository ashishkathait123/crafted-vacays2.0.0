"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import TourPackageCard from "../cards/TourCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const StateTourPackageSlider = ({ state, excludeSlug }) => {
  const [packages, setPackages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    fetch("https://craftedvacays.grandeurnet.in/get-tours.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tours) {
          const filtered = data.tours.filter(
            (pkg) =>
              pkg.state_name?.toLowerCase() === state?.toLowerCase() &&
              pkg.slug !== excludeSlug
          );
          setPackages(filtered);
        }
      })
      .catch((err) => console.error("Error fetching tours:", err));
  }, [state, excludeSlug]);

  if (!packages.length) return null;

  return (
    <Container sx={{ mt: 6, position: "relative" }}>
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        More Tours in {state}
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
        {packages.map((pkg) => {
          const priceINR = parseFloat(pkg.price) || 0;

          return (
            <SwiperSlide key={pkg.id}>
              <TourPackageCard
                packageData={{
                  title: pkg.title,
                  location: `${pkg.city_name}, ${pkg.state_name}`,
                  tourType: pkg.tourType || "Explore",
                  duration: `${pkg.duration_nights}N/${pkg.duration_days}D`,
                  itinerary: pkg.itinerary?.slice(0, 50) + "...",
                  rating: 4,
                  guests: 2,
                  originalPrice: priceINR * 1.2,
                  discountedPrice: priceINR,
                  images: pkg.images?.length
                    ? [`https://craftedvacays.grandeurnet.in/${pkg.images[0]}`]
                    : ["/images/bg/default.jpg"],
                }}
                onClick={() => router.push(`/tour-details/${pkg.slug}`)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default StateTourPackageSlider;
