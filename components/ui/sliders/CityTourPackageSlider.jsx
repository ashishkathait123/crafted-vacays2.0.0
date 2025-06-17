"use client";

import React, { useEffect, useState } from "react";
import { Container, Button, Box, IconButton } from "@mui/material";
import TourPackageCard from "../cards/TourCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import ShareIcon from '@mui/icons-material/Share';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/system';

// Styled component for social sharing
const SocialShare = styled(Box)({
  position: 'absolute',
  right: 20,
  top: 10,
  zIndex: 2,
  display: 'flex',
  gap: '8px'
});

const CityTourPackageSlider = ({ city, state, excludeSlug }) => {
  const [packages, setPackages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://craftedvacays.grandeurnet.in/get-tours.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tours) {
          const filtered = data.tours.filter(
            (pkg) =>
              pkg.city_name?.toLowerCase() === city?.toLowerCase() &&
              pkg.state_name?.toLowerCase() === state?.toLowerCase() &&
              pkg.slug !== excludeSlug
          );
          setPackages(filtered);
        }
      });
  }, [city, state, excludeSlug]);

  if (!packages.length) return null;

  const handleShare = (pkg) => {
    if (navigator.share) {
      navigator.share({
        title: `Explore ${pkg.title} with Crafted Vacays`,
        text: `Check out this amazing ${pkg.duration_days}-day tour in ${city}!`,
        url: `https://yourdomain.com/tour-details/${pkg.slug}`,
      });
    }
  };

  return (
    <Container sx={{ mt: 10, position: "relative", py: 4, background: 'linear-gradient(to bottom, #f8f9fa, white)' }}>
      <Box textAlign="center" mb={6}>
        <h2 className="text-4xl font-bold mb-3 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
          ✨ Must-Do Experiences in {city} ✨
        </h2>
        <p className="text-xl text-gray-600">
          Discover these Instagram-worthy tours curated just for you!
        </p>
      </Box>

      <Swiper
        modules={[Autoplay, Navigation, Scrollbar]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 }
        }}
        navigation
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        scrollbar={{ draggable: true }}
        style={{ padding: '20px 10px' }}
      >
        {packages.map((pkg) => {
          const priceINR = parseFloat(pkg.price) || 0;

          return (
            <SwiperSlide key={pkg.id} style={{ position: 'relative' }}>
              <SocialShare>
                <IconButton onClick={() => handleShare(pkg)} sx={{ color: '#1877f2' }}>
                  <ShareIcon />
                </IconButton>
                <IconButton sx={{ color: '#e1306c' }} onClick={() => window.open('https://instagram.com')}>
                  <InstagramIcon />
                </IconButton>
              </SocialShare>

              <TourPackageCard
                packageData={{
                  title: pkg.title,
                  location: `${pkg.city_name}, ${pkg.state_name}`,
                  tourType: pkg.tourType || "Bucket List Experience",
                  duration: `${pkg.duration_nights}N/${pkg.duration_days}D`,
                  itinerary: pkg.itinerary?.slice(0, 50) + "...",
                  rating: 4,
                  guests: 2,
                  originalPrice: priceINR * 1.2,
                  discountedPrice: priceINR,
                  images: pkg.images?.length
                    ? [`https://craftedvacays.grandeurnet.in/${pkg.images[0]}`]
                    : ["/images/bg/default.jpg"],
                  highlightBadge: "🔥 Trending Now",
                  instagramHint: "Tag #CraftedVacays for a feature!"
                }}
                onClick={() => router.push(`/tour-details/${pkg.slug}`)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(to right, #ff8a00, #da1b60)',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            py: 1.5,
            px: 4,
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(218, 27, 96, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(218, 27, 96, 0.4)'
            }
          }}
          onClick={() => router.push(`/tours?city=${city}`)}
        >
          View All {city} Adventures →
        </Button>
      </Box>
    </Container>
  );
};

export default CityTourPackageSlider;
