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
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingForm from "@/components/ui/forms/BookingForm";
import IconLabel from "@/components/ui/common/IconLabel";
import Slider from "react-slick";
import CustomerTestimonials from "@/components/sections/CustomerTestimonials";
import CityTourPackageSlider from "@/components/ui/sliders/CityTourPackageSlider";
import ToursPage from "@/app/tours/page";
import ItineraryAccordion from "@/components/ui/blocks/ItineraryAccordion";
import CommentSection from "@/components/ui/blocks/CommentSection";
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
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaEye,
  FaCalendarAlt,
  FaUsers,
  FaTag,
} from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";

const TourDetailsPage = () => {
  const { slug } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

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
        <Typography mt={2}>Loading your dream vacation...</Typography>
      </Box>
    );
  }

  if (!tourData) {
    return (
      <Box sx={{ mt: 10, px: 2 }}>
        <Typography variant="h5" color="error">
          Oops! This tour seems to be on a break. Check out our other amazing adventures!
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
    itinerary,
    inclusions = [],
    exclusions = [],
    images = [],
  } = tourData;

  const amenities = [
    { icon: FaHotel, label: "Luxury Stays" },
    { icon: FaPlane, label: "Airport Transfers" },
    { icon: FaWifi, label: "Free Wi-Fi" },
    { icon: FaUtensils, label: "Gourmet Meals" },
    { icon: FaCarAlt, label: "Private Transport" },
    { icon: FaStar, label: "Travel Insurance" },
  ];

  const renderList = (items, isIncluded = true) =>
    items
      .filter((item) => item && item.trim())
      .map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
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

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    swipeToSlide: true,
    draggable: true,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    beforeChange: (current, next) => setActiveSlide(next),
  };

  // Get first 4 images for highlights or pad with default if needed
  const highlightImages = Array.isArray(images) && images.length > 0 
    ? images.slice(0, 4) 
    : Array(4).fill('/images/default-tour.jpg');

  return (
    <div className="relative overflow-x-hidden py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <Box sx={{ maxWidth: "1440px", mx: "auto", px: { xs: 2, md: 4 }, mb: 6 }}>
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
          boxShadow: 3
        }}>
          {/* Image Slider */}
          <Box sx={{ height: { xs: 300, sm: 400, md: 500 } }}>
            <Slider {...sliderSettings}>
              {Array.isArray(images) && images.length > 0 ? (
                images.map((img, index) => (
                  <Box key={index}>
                    <img
                      src={`https://craftedvacays.grandeurnet.in/${img}`}
                      alt={`${title} - ${index + 1}`}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        filter: activeSlide === index ? 'none' : 'brightness(0.7)'
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Box>
                  <img
                    src="/images/default-tour.jpg"
                    alt="Default"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              )}
            </Slider>
          </Box>

          {/* Overlay Content */}
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
            color: 'white'
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: "bold",
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {title}
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FaMapMarkerAlt /> {city_name}, {state_name}
              </Typography>
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FaStar color="gold" /> 4.8 (1.6k reviews)
              </Typography>
            </Box>
          </Box>

          {/* Floating Price Tag */}
          <Box sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            bgcolor: 'rgba(255,255,255,0.9)',
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center'
          }}>
            <Typography variant="body2" color="text.secondary">
              Starting from
            </Typography>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
              ₹{price}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              per person
            </Typography>
          </Box>
        </Box>

        {/* Quick Facts Ribbon */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
          justifyContent: 'center',
          '& > *': {
            flex: '1 1 200px'
          }
        }}>
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
            <GiSandsOfTime size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{duration_days} Days</Typography>
            <Typography variant="caption">Adventure-filled itinerary</Typography>
          </Card>
          
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
            <FaUsers size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Small Groups</Typography>
            <Typography variant="caption">Max 12 travelers</Typography>
          </Card>
          
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
            <FaCalendarAlt size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Flexible Dates</Typography>
            <Typography variant="caption">Multiple departures</Typography>
          </Card>
          
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
            <FaTag size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Best Price</Typography>
            <Typography variant="caption">Guaranteed</Typography>
          </Card>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2, 
          mb: 4,
          justifyContent: 'center'
        }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<IoIosFlash />}
            sx={{ fontWeight: 'bold' }}
          >
            Book Now - Limited Seats!
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            startIcon={wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
            onClick={() => setWishlisted(!wishlisted)}
          >
            {wishlisted ? 'Saved' : 'Save for Later'}
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<FaShareAlt />}
          >
            Share with Friends
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<FaEye />}
          >
            Virtual Preview
          </Button>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4} sx={{ mt: 4 }} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            {/* Highlights Section */}
            <Card sx={{ mb: 4, borderLeft: '4px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✨ Why You'll Love This Tour
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'primary.main', fontSize: '1.5rem' }}>•</Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Instagram-Worthy Spots</Typography>
                        <Typography variant="body2">Curated locations perfect for your travel feed</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'primary.main', fontSize: '1.5rem' }}>•</Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Local Experiences</Typography>
                        <Typography variant="body2">Authentic activities with native guides</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'primary.main', fontSize: '1.5rem' }}>•</Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Flexible Options</Typography>
                        <Typography variant="body2">Customize your adventure your way</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'primary.main', fontSize: '1.5rem' }}>•</Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>5-Star Support</Typography>
                        <Typography variant="body2">24/7 assistance throughout your trip</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Tour Overview */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              🌟 Tour Overview
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line", mb: 3 }}>
              {full_description || "No overview available."}
            </Typography>

            {/* Photo Highlights */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, mt: 4 }}>
              📸 Photo Highlights
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {highlightImages.map((img, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    }
                  }}>
                    <img 
                      src={img.startsWith('/') ? img : `https://craftedvacays.grandeurnet.in/${img}`}
                      alt={`Highlight ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Amenities */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              🏆 Premium Amenities
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {amenities.map((item, idx) => (
                <Grid item xs={6} sm={4} key={idx}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <IconLabel icon={item.icon} label={item.label} center />
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Included / Excluded */}
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              ✅ What's Included
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                {renderList(inclusions, true)}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>❌ Not Included</Typography>
                {renderList(exclusions, false)}
              </Grid>
            </Grid>

            <ItineraryAccordion itineraryString={tourData?.itinerary} />

            {/* Booking Section */}
            <Box sx={{ 
              mt: 6, 
              p: 3, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              boxShadow: 3
            }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: 'center' }}>
                ✈️ Ready for Your Adventure?
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    height: '100%'
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      Select Your Dates
                    </Typography>
                    <Calendar
                      tileClassName={({ date, view }) =>
                        view === "month" && isDateAvailable(date) ? "available-date" : ""
                      }
                      tileContent={({ date, view }) =>
                        view === "month" && isDateAvailable(date) ? (
                          <div style={{ marginTop: 2, color: "green", fontSize: 12 }}>Available</div>
                        ) : null
                      }
                    />
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                      * Popular dates sell out fast! Book early to secure your spot.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    height: '100%'
                  }}>
                    <BookingForm
                      basePrice={price}
                      tourTitle={title}
                      availableDates={availableDates}
                      isDateAvailable={isDateAvailable}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  🔒 Secure booking with free cancellation up to 30 days before departure
                </Typography>
              </Box>
            </Box>

            {/* Map */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                🗺️ Explore {city_name} on Map
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
                  // src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${mapQuery}`}
                />
              </Box>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <CustomerTestimonials />
            
            {/* Special Offer Card */}
            {/* <Card sx={{ 
              mt: 4, 
              p: 3, 
              bgcolor: 'warning.light',
              borderLeft: '4px solid',
              borderColor: 'warning.dark'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                🎁 Special Offer!
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Book before June 30th and get:
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li><Typography variant="body2">10% Early Bird Discount</Typography></li>
                <li><Typography variant="body2">Free Airport Transfer</Typography></li>
                <li><Typography variant="body2">Upgrade to Premium Room</Typography></li>
              </ul>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Claim Your Deal
              </Button>
            </Card> */}

            {/* Social Proof */}
            {/* <Card sx={{ mt: 4, p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                📱 Tag Us & Get Featured!
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Share your experience with #CraftedVacays for a chance to be featured on our page!
              </Typography>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={6} key={item}>
                    <img 
                      src={`/images/social-proof-${item}.jpg`} 
                      alt="User photo" 
                      style={{ 
                        width: '100%', 
                        height: '120px', 
                        objectFit: 'cover',
                        borderRadius: 4
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<FaShareAlt />}
              >
                Share Your Experience
              </Button>
            </Card> */}
          </Grid>
        </Grid>

        {/* Related Tours */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: 'center' }}>
            More Amazing Tours in {city_name}
          </Typography>
          <CityTourPackageSlider city={city_name} state={state_name} excludeSlug={slug} />
        </Box>

        <CommentSection />

        {/* Final CTA */}
        {/* <Box sx={{ 
          mt: 6, 
          p: 4, 
          textAlign: 'center',
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Your Dream Vacation Awaits!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
            Don't just dream about it - live it! Book now and create memories that will last a lifetime.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ 
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Book Your Adventure Today
          </Button>
        </Box> */}
      </Box>
    </div>
  );
};

export default TourDetailsPage;