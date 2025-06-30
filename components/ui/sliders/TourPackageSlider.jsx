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
  const { currencySymbol } = useCurrency();
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
    const ratingMatch = !filters.rating?.length || filters.rating.includes(pkg.rating);
    const languageMatch = !filters.language?.length || filters.language.includes(pkg.language);
    const durationDaysMatch = !filters.duration_days ||
  pkg.duration_days?.toString() === filters.duration_days;

const durationNightsMatch = !filters.duration_nights ||
  pkg.duration_nights?.toString() === filters.duration_nights;
    // const locationMatch = !filters.location ||
    //   pkg.city_name?.toLowerCase().includes(filters.location.toLowerCase());
    const country_nameMatch = !filters.country_name ||
      pkg.country_name?.toLowerCase().includes(filters.country_name.toLowerCase());
    const tourTypeMatch = !filters.tourType ||
      pkg.tourType?.toLowerCase().includes(filters.tourType.toLowerCase());
    const guestMatch = !filters.guests || parseInt(filters.guests) === 2;

    const numericPrice = parseFloat(pkg.price?.toString().replace(/[^\d.]/g, '')) || 0;
    const minPriceMatch = !filters.minPrice || numericPrice >= parseFloat(filters.minPrice);
    const maxPriceMatch = !filters.maxPrice || numericPrice <= parseFloat(filters.maxPrice);

    return  ratingMatch &&
  languageMatch &&
  country_nameMatch &&
  tourTypeMatch &&
  guestMatch &&
  minPriceMatch &&
  maxPriceMatch &&
  durationDaysMatch &&
  durationNightsMatch;
  });

  useEffect(() => {
    if (packages.length > 0 && filtered.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Tours Found',
        text: 'Try adjusting your search filters.',
        confirmButtonColor: '#f97316',
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
            {filtered.map((pkg) => {
              const priceINR = parseFloat(pkg.price) || 0;
              return (
                <SwiperSlide key={pkg.id}>
                  <TourPackageCard
                    packageData={{
                      title: pkg.title,
                      location: `${pkg.city_name}, ${pkg.state_name}`,
                      country_name: ` ${pkg.country_name}`,
                      tourType: pkg.tour_type || "Explore",
                      duration: `${pkg.duration_nights}N/${pkg.duration_days}D`,
                      itinerary: pkg.itinerary?.slice(0, 50) + "...",
                      rating: 4,
                      guests: 2,
                      originalPrice: priceINR * 1.2,
                      discountedPrice: priceINR,
                      images: pkg.images?.length
                        ? [`https://craftedvacays.grandeurnet.in/${pkg.images[0]}`]
                        : ["/images/bg/default.jpg"]
                    }}
                    onClick={() => router.push(`/tour-details/${pkg.slug}`)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </Container>
  );
};

export default TourPackage;
