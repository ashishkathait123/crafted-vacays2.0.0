"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingForm from "@/components/ui/forms/BookingForm";
import IconLabel from "@/components/ui/common/IconLabel";
import Slider from "react-slick";
import CustomerTestimonials from "@/components/sections/CustomerTestimonials";
import TourPackage from "@/components/ui/sliders/TourPackageSlider";
import { useParams } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
  FaPlane,
  FaWifi,
  FaUtensils,
  FaHotel,
  FaCarAlt,
} from "react-icons/fa";

const TourDetailsPage = () => {
  const { slug } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://craftedvacays.grandeurnet.in/get-tours.php")
      .then((res) => res.json())
      .then((data) => {
        const found = data.tours.find((item) => item.slug === slug);
        setTourData(found || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Loading tour details...</Typography>
      </Box>
    );
  }

  if (!tourData) {
    return (
      <Box sx={{ mt: 10, px: 2 }}>
        <Typography variant="h5" color="error">
          Tour not found.
        </Typography>
      </Box>
    );
  }

  const {
    title,
    city_name,
    state_name,
    duration_nights,
    duration_days,
    price,
    full_description,
    inclusions = [],
    exclusions = [],
    images = [],
  } = tourData;

  const amenities = [
    { icon: FaHotel, label: "Accommodation" },
    { icon: FaPlane, label: "Airport" },
    { icon: FaWifi, label: "Wi-Fi" },
    { icon: FaUtensils, label: "Dinner & Snacks" },
    { icon: FaCarAlt, label: "Transport" },
    { icon: FaStar, label: "Insurance" },
  ];

  const renderList = (items, isIncluded = true) =>
    items
      .filter((item) => item && item.trim())
      .map((item, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
        >
          {isIncluded ? <FaCheck color="green" /> : <FaTimes color="red" />}
          <Typography variant="body2">{item}</Typography>
        </Box>
      ));

  const mapQuery = encodeURIComponent(`${city_name}, ${state_name}`);

  const availableDates = [
    "2025-06-15",
    "2025-06-18",
    "2025-06-25",
    "2025-07-02",
    "2025-07-10",
  ];

  const isDateAvailable = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return availableDates.includes(dateStr);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1440px", mx: "auto", px: { xs: 2, md: 4 }, mt: 4, mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FaMapMarkerAlt /> {city_name}, {state_name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <FaStar color="orange" /> 4.8 (1.6k reviews)
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          mt: 1,
        }}
      >
        <Chip label={`From ₹${price}`} color="success" />
        <Chip label={`${duration_nights}N / ${duration_days}D`} />
        <Chip label="Tour Type: Adventure" />
        <Button variant="outlined" size="small">Preview</Button>
        <Button variant="outlined" size="small">Share</Button>
        <Button variant="outlined" size="small">Wishlist</Button>
      </Box>

      <Box sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
        <Slider
          dots={true}
          arrows={true}
          infinite={true}
          speed={800}
          autoplay={true}
          autoplaySpeed={4000}
          fade={true}
          swipeToSlide={true}
          draggable={true}
          pauseOnHover={true}
          cssEase="ease-in-out"
        >
          {images?.map((img, index) => (
            <Box key={index}>
              <img
                src={`https://craftedvacays.grandeurnet.in/${img}`}
                alt={`Tour image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  transition: "transform 0.5s ease-in-out",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Tour Overview
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-line" }}>
            {full_description || "No overview available."}
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <img
                src="/images/tour-card-2.webp"
                alt="facility"
                style={{ width: "100%", borderRadius: 12 }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Advance Facilities
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Challenge
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              p: 2,
              border: `1px dashed ${theme.palette.success.main}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Tour Amenities
            </Typography>
            <Grid container spacing={2}>
              {amenities.map((item, idx) => (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <IconLabel icon={item.icon} label={item.label} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Included
              </Typography>
              {renderList(inclusions, true)}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Excluded
              </Typography>
              {renderList(exclusions, false)}
            </Grid>
          </Grid>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Availability Calendar & Booking
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  maxWidth: 360,
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: 1,
                  flex: "1 1 300px",
                }}
              >
                <Calendar
                  tileClassName={({ date, view }) =>
                    view === "month" && isDateAvailable(date) ? "available-date" : ""
                  }
                  tileContent={({ date, view }) =>
                    view === "month" && isDateAvailable(date) ? (
                      <div style={{ marginTop: 2, color: "green", fontSize: 12 }}>
                        Available
                      </div>
                    ) : null
                  }
                />
              </Box>

             <Box
  sx={{
    p: 2,
    border: "1px solid #ddd",
    borderRadius: 2,
    backgroundColor: "#fff",
    boxShadow: 2,
    position: { md: "sticky", xs: "static" },
    top: 100,
    flexShrink: 0, // prevents it from stretching
    maxWidth: '100%', // ensures responsiveness on small screens
    width: 'fit-content', // only takes up necessary space
    minWidth: 320, // optional: avoid being too narrow
  }}
>
  <BookingForm
    tourTitle={title}
    price={price}
    availableDates={availableDates}
    isDateAvailable={isDateAvailable}
  />
</Box>

            </Box>
          </Box>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              View on Map
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: 400,
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${mapQuery}`}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomerTestimonials />
          
        </Grid>
        
      
      </Grid>
    </Box>
  );
};

export default TourDetailsPage;