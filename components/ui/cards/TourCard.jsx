'use client';

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import { useCurrency } from "@/context/CurrencyContext";
import { FaLocationDot, FaUser, FaClock, FaTag, FaPlane } from "react-icons/fa6";

const TourPackageCard = ({ packageData, onClick }) => {
  const { convertPrice, currencySymbol } = useCurrency();
  const [selectedHotel, setSelectedHotel] = useState("3");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imageErrorFlags, setImageErrorFlags] = useState([]);

  if (!packageData) return <div>Loading...</div>;

  const images = packageData.images && packageData.images.length > 0
    ? packageData.images
    : ["/images/bg.jpg"];

  useEffect(() => {
    setImageErrorFlags(new Array(images.length).fill(false));
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageError = (index) => {
    const updatedFlags = [...imageErrorFlags];
    updatedFlags[index] = true;
    setImageErrorFlags(updatedFlags);
  };

  const safePrice = (price) => (isNaN(price) || price <= 0 ? 0 : price);

  const originalPriceNum = packageData.originalPrice ?? 0;
  const discountedPriceNum = packageData.discountedPrice ?? 0;

  const calculatePrice = () => {
    let basePrice = safePrice(discountedPriceNum);
    if (selectedHotel === "4") return convertPrice(Math.round(basePrice * 1.2));
    if (selectedHotel === "5") return convertPrice(Math.round(basePrice * 1.5));
    return convertPrice(basePrice);
  };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        width: "100%",
        maxWidth: 400,
        height: 480,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        backgroundImage: `url(${
          imageErrorFlags[currentImageIndex] ? "/images/bg.jpg" : images[currentImageIndex]
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out, transform 0.5s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        cursor: "pointer",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: index === currentImageIndex ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </Box>

      {/* Header Info */}
      <Box sx={{ position: "relative", zIndex: 2, mb: 1 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {packageData.tags?.map((tag, index) => (
            <Chip
              key={index}
              icon={<FaTag color="white" size={12} />}
              label={`#${tag}`}
              sx={{
                bgcolor: "rgba(255,255,255,0.3)",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
          {packageData.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
          <FaLocationDot /> {packageData.location}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
          🧭 {packageData.tourType}
        </Typography>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaClock /> {packageData.duration}
        </Typography>
      </Box>

      {/* Itinerary + Hotel Selector */}
      <Box sx={{ position: "relative", zIndex: 2, textAlign: "center", mb: 2 }}>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
          Hotel Type
        </Typography>
        <RadioGroup
          row
          name="hotelRating"
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
          sx={{ justifyContent: "center" }}
        >
          {["3", "4", "5"].map((rating) => (
            <FormControlLabel
              key={rating}
              value={rating}
              control={<Radio sx={{ color: "white" }} />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <HotelIcon fontSize="small" />
                  <Typography sx={{ color: "white", fontSize: "12px" }}>
                    {rating} Star
                  </Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Pricing */}
      <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ textDecoration: "line-through", opacity: 0.7 }}>
          {currencySymbol} {convertPrice(originalPriceNum).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {currencySymbol} {calculatePrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Typography>

        {/* Flight Dynamic Caption */}
        {packageData.flight_included ? (
          <Typography variant="caption" sx={{ color: "#00c853", fontWeight: "bold" }}>
            ✈️ Flight Included
          </Typography>
        ) : (
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Approx Price without flights
          </Typography>
        )}
      </Box>

      {/* CTA */}
      <Button
        variant="contained"
        color="warning"
        sx={{
          width: "100%",
          borderRadius: "20px",
          position: "relative",
          zIndex: 2,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={onClick}
      >
        Plan Now
      </Button>
    </Box>
  );
};

export default TourPackageCard;
