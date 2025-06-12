"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TourPackageCard from "../cards/TourCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const CountryPackage = ({ countryFilter }) => {
  const [packages, setPackages] = useState([]);
  const { convertPrice, currencySymbol } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    fetch("https://craftedvacays.grandeurnet.in/get-tours.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tours) {
          const filtered = data.tours.filter(
            (pkg) =>
              pkg.country_name?.toLowerCase() ===
              countryFilter?.toLowerCase()
          );
          setPackages(filtered);
        }
      });
  }, [countryFilter]);

  if (!packages.length) return null;

  return (
    <Container sx={{ mt: 4, position: "relative" }}>
      <div className="foggy-effect mb-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg mb-6 text-center">
          Related Tour Packages in {countryFilter}
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
          {packages.map((pkg) => (
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
                             originalPrice: `${currencySymbol}${convertPrice(
                               parseFloat(pkg.price) * 1.2
                             ).toFixed(2)}`,
                             discountedPrice: `${currencySymbol}${convertPrice(
                               parseFloat(pkg.price)
                             ).toFixed(2)}`,
                           images: pkg.images?.length
             ? [`https://craftedvacays.grandeurnet.in/${pkg.images[0]}`]
             : ["/images/bg/default.jpg"]
                           }}
                           onClick={() => router.push(`/tour-details/${pkg.slug}`)}
                         />
                       </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default CountryPackage;
