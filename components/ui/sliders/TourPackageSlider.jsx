'use client';

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TourPackageCard from "../cards/TourCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const TourPackage = ({ filters }) => {
  const [packages, setPackages] = useState([]);
  const { convertPrice, currencySymbol } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    fetch("https://craftedvacays.grandeurnet.in/get-tours.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tours) {
          setPackages(data.tours);
        }
      });
  }, []);

  const filtered = packages.filter((pkg) => {
    const ratingMatch =
      !filters.rating?.length || filters.rating.includes(pkg.rating);

    const languageMatch =
      !filters.language?.length || filters.language.includes(pkg.language);

    const durationMatch =
      !filters.duration ||
      `${pkg.duration_nights}N/${pkg.duration_days}D`
        .toLowerCase()
        .includes(filters.duration.toLowerCase());

    const locationMatch =
      !filters.location ||
      pkg.city_name?.toLowerCase().includes(filters.location.toLowerCase());

    const tourTypeMatch =
      !filters.tourType ||
      pkg.tourType?.toLowerCase().includes(filters.tourType.toLowerCase());

    const guestMatch =
      !filters.guests || parseInt(filters.guests) === 2; // Replace with real logic

    const numericPrice = parseFloat(pkg.price?.toString().replace(/[^\d.]/g, '')) || 0;
    const minPriceMatch =
      !filters.minPrice || numericPrice >= parseFloat(filters.minPrice);
    const maxPriceMatch =
      !filters.maxPrice || numericPrice <= parseFloat(filters.maxPrice);

    return (
      ratingMatch &&
      languageMatch &&
      durationMatch &&
      locationMatch &&
      tourTypeMatch &&
      guestMatch &&
      minPriceMatch &&
      maxPriceMatch
    );
  });

  // ✅ Show SweetAlert if no tours match
  useEffect(() => {
    if (packages.length > 0 && filtered.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Tours Found',
        text: 'Try adjusting your search filters.',
        confirmButtonColor: '#f97316', // Tailwind orange-500
      });
    }
  }, [filtered, packages]);

  return (
    <Container sx={{ mt: 4, position: "relative" }}>
      <div className="foggy-effect mb-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg mb-6 text-center">
          Top Trending
        </h2>
        {filtered.length > 0 && (
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
            {filtered.map((pkg) => (
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
        )}
      </div>
    </Container>
  );
};

export default TourPackage;
