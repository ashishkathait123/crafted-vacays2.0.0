"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Link from "next/link";

const BASE_UPLOAD_URL = "https://craftedvacays.grandeurnet.in/uploads/states/";
const FALLBACK_IMAGE = `${BASE_UPLOAD_URL}1748091523_befunky-collage-2024-05-26t102953-1716699598.jpg`;

const DestinationCard = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { fetchDestinationsFromWP } = await import("@/lib/api/destinations");
        const data = await fetchDestinationsFromWP();

        const processed = data.map((d) => {
          let image = FALLBACK_IMAGE;

          if (Array.isArray(d.images) && d.images.length > 0) {
            const img = d.images[0];

            if (typeof img === "string") {
              image = img.startsWith("http")
                ? img
                : img.includes("uploads/states/")
                ? `craftedvacays.grandeurnet.in/get-tours.php/${img.replace(/^\/+/, "")}`
                : `${BASE_UPLOAD_URL}${img.replace(/^\/+/, "")}`;
            }
          }

          return { ...d, image };
        });

        setDestinations(processed);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching destinations:", err);
        setError("Failed to load destinations.");
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading destinations...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (destinations.length === 0) return <p className="text-center text-gray-500">No destinations found.</p>;

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
          <SwiperSlide key={`${destination.slug || destination.title}-${index}`}>
            <div
              className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] xl:h-[350px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-cover bg-center"
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 z-0" />
              <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1 text-sm rounded">
                {destination.tours || 0} Tours
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                <h2 className="text-xl font-bold">{destination.title}</h2>
                <p className="line-clamp-2">{destination.description}</p>
                <Link
                  href={`/destinations/${destination.parent?.slug}/${destination.slug}`}
                  className="inline-block mt-3 px-4 py-2 bg-white text-orange-600 font-semibold rounded shadow hover:bg-orange-100 transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DestinationCard;
