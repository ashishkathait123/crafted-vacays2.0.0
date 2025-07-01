'use client';
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
    country_name,
    duration_nights,
    duration_days,
    price,
    price_adult,
    price_youth,
    price_child,
    premium_guide,
    premium_guide_price,
    photo_package,
    photo_package_price,
flight_included: raw_flight_included,
    tour_type,
    amenities = [],
    full_description,
    itinerary,
    tour_plan = [],
    travel_prep = [],
    inclusions = [],
    exclusions = [],
    notes,
    images = [],
    availability_from,
    availability_to,
    status
  } = tourData;
const flight_included = raw_flight_included === "1" || raw_flight_included === 1;

  // Generate available dates between availability_from and availability_to
  const generateAvailableDates = () => {
    if (!availability_from || !availability_to) return [];
    const start = new Date(availability_from);
    const end = new Date(availability_to);
    const dates = [];
    
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      dates.push(new Date(dt).toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();
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

  const highlightImages = Array.isArray(images) && images.length > 0 
    ? images.slice(0, 4) 
    : Array(4).fill('/images/default-tour.jpg');

  const renderList = (items, isIncluded = true) =>
    items
      .filter((item) => item && item.trim())
      .map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          {isIncluded ? <FaCheck color="green" /> : <FaTimes color="red" />}
          <Typography variant="body2">{item}</Typography>
        </Box>
      ));

  const mapQuery = encodeURIComponent(`${city_name}, ${state_name}, ${country_name}`);

  return (
    <div className="relative overflow-x-hidden py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen mt-24">
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
                <FaMapMarkerAlt /> {city_name}, {state_name}, {country_name}
              </Typography>
              <Chip 
                label={tour_type} 
                color="primary" 
                size="small" 
                sx={{ color: 'white', fontWeight: 'bold' }}
              />
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
            {flight_included && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <FaPlane size={14} color="#FF7B00" />
                <Typography variant="caption" sx={{ ml: 0.5, color: '#FF7B00' }}>
                  Flight Included
                </Typography>
              </Box>
            )}
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
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{duration_days} Days / {duration_nights} Nights</Typography>
            <Typography variant="caption">Adventure-filled itinerary</Typography>
          </Card>
          
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
            <FaUsers size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Small Groups</Typography>
            <Typography variant="caption">Max 12 travelers</Typography>
          </Card>
          
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
            <FaCalendarAlt size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {new Date(availability_from).toLocaleDateString()} - {new Date(availability_to).toLocaleDateString()}
            </Typography>
            <Typography variant="caption">Availability</Typography>
          </Card>
          
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
            <FaTag size={24} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Best Price</Typography>
            <Typography variant="caption">Guaranteed</Typography>
          </Card>
        </Box>

        {/* Main Content with Sidebar */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: 'flex-start'
        }}>
          {/* Left Content */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            {/* Tour Overview */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                🌟 Tour Overview
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {full_description || "No overview available."}
              </Typography>
            </Box>

            {/* Photo Highlights */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                📸 Photo Highlights
              </Typography>
              <Grid container spacing={2}>
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
            </Box>

            {/* Amenities */}
            {amenities.length > 0 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  🏆 Premium Amenities
                </Typography>
                <Grid container spacing={2}>
                  {amenities.map((item, idx) => {
                    const amenityIcons = {
                      "Luxury Stays": FaHotel,
                      "Airport Transfers": FaPlane,
                      "Free Wi-Fi": FaWifi,
                      "Gourmet Meals": FaUtensils,
                      "Private Transport": FaCarAlt,
                      "Travel Insurance": FaStar
                    };
                    
                    const IconComponent = amenityIcons[item] || FaCheck;
                    
                    return (
                      <Grid item xs={6} sm={4} key={idx}>
                        <Card sx={{ p: 2, height: '100%' }}>
                          <IconLabel icon={IconComponent} label={item} center />
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}

            {/* Included / Excluded */}
          <Box>
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          ✅ What's Included
        </Typography>
        {renderList(inclusions, true)}
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          ❌ Not Included
        </Typography>
        {renderList(exclusions, false)}
      </Box>
    </Grid>
  </Grid>
</Box>


            {/* Itinerary */}
            {tour_plan.length > 0 && (
              <Box>
                <ItineraryAccordion tour_plan={tour_plan} />
              </Box>
            )}

            {/* Travel Preparation */}
            {travel_prep.length > 0 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  🧳 Travel Preparation
                </Typography>
                {travel_prep.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.heading}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                      {item.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Additional Notes */}
            {notes && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  ℹ️ Additional Notes
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {notes}
                </Typography>
              </Box>
            )}

            <Box>
              <CommentSection />
            </Box>
          </Box>
         
          {/* Right Sidebar */}
          <Box sx={{ 
            width: { xs: '100%', md: '400px' },
            position: { md: 'sticky' },
            top: { md: 20 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            {/* Package Details Card */}
            <Card sx={{ 
              p: 3,
              borderRadius: 2,
              boxShadow: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Package Details
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  From ₹{price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Duration: {duration_days} days / {duration_nights} nights
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Tour Type: {tour_type}
                </Typography>
                {flight_included && (
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaPlane size={14} /> Flight included
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small">
                  <FaShareAlt />
                </IconButton>
                <IconButton size="small" onClick={() => setWishlisted(!wishlisted)}>
                  {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
                </IconButton>
              </Box>
            </Card>

            {/* Calendar Card */}
            <Card sx={{ 
              p: 3,
              borderRadius: 2,
              boxShadow: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Select A Date
              </Typography>
              <Calendar
                className={theme.palette.mode === 'dark' ? 'calendar-dark' : 'calendar-light'}
                tileClassName={({ date, view }) =>
                  view === "month" && isDateAvailable(date) ? "available-date" : ""
                }
                tileContent={({ date, view }) =>
                  view === "month" && isDateAvailable(date) ? (
                    <div style={{ marginTop: 2, color: "green", fontSize: 12 }}>Avail..</div>
                  ) : null
                }
              />
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Available from {new Date(availability_from).toLocaleDateString()} to {new Date(availability_to).toLocaleDateString()}
              </Typography>
            </Card>

            {/* Booking Form Card */}
            <Card sx={{ 
              p: 3,
              borderRadius: 2,
              boxShadow: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Book Your Adventure
              </Typography>
              <BookingForm
  basePrice={price}
  tourTitle={title}
  adultPrice={price_adult}
  youthPrice={price_youth}
  childPrice={price_child}
  hasPhotoPackage={photo_package}
  photoPackagePrice={photo_package_price}
/>

            </Card>
          </Box>
        </Box>
        
        {/* Related Tours */}
        <Box sx={{ mt: 6 }}>
          <CityTourPackageSlider city={city_name} state={state_name} excludeSlug={slug} />
        </Box>
      </Box>
    </div>
  );
};

export default TourDetailsPage;