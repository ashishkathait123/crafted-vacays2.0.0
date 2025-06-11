'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useParams } from 'next/navigation';
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
  FaPlane,
  FaWifi,
  FaUtensils,
  FaHotel,
  FaCarAlt
} from 'react-icons/fa';

const IconLabel = ({ icon, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14 }}>
    {icon}
    <Typography variant="body2">{label}</Typography>
  </Box>
);

const TourDetailsPage = () => {
  const { slug } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://craftedvacays.grandeurnet.in/get-tours.php')
      .then(res => res.json())
      .then(data => {
        const found = data.tours.find(item => item.slug === slug);
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
      <Container sx={{ mt: 10 }}>
        <Typography variant="h5" color="error">Tour not found.</Typography>
      </Container>
    );
  }

  const {
    title,
    city_name,
    state_name,
    duration_nights,
    duration_days,
    price,
    itinerary,
    inclusions = [],
    exclusions = [],
    images = [],
  } = tourData;

  const amenities = [
    { icon: <FaHotel />, label: 'Accommodation' },
    { icon: <FaPlane />, label: 'Airport' },
    { icon: <FaWifi />, label: 'Wi-Fi' },
    { icon: <FaUtensils />, label: 'Dinner & Snacks' },
    { icon: <FaCarAlt />, label: 'Transport' },
    { icon: <FaStar />, label: 'Insurance' }
  ];

  const renderList = (items, isIncluded = true) => (
    items.filter(item => item && item.trim()).map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {isIncluded ? <FaCheck color="green" /> : <FaTimes color="red" />}
        <Typography variant="body2">{item}</Typography>
      </Box>
    ))
  );

  const mapQuery = encodeURIComponent(`${city_name}, ${state_name}`);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Location, Rating */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaMapMarkerAlt /> {city_name}, {state_name}
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FaStar color="orange" /> 4.8 (1.6k reviews)
        </Typography>
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>{title}</Typography>

      {/* Price and Tags */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mt: 1 }}>
        <Chip label={`From ₹${price}`} color="success" />
        <Chip label={`${duration_nights}N / ${duration_days}D`} />
        <Chip label="Tour Type: Adventure" />
        <Button variant="outlined" size="small">Preview</Button>
        <Button variant="outlined" size="small">Share</Button>
        <Button variant="outlined" size="small">Wishlist</Button>
      </Box>

      {/* Cover Image */}
      <Box sx={{ mt: 3, borderRadius: 2, overflow: 'hidden' }}>
        <img
          src={`https://craftedvacays.grandeurnet.in/${images?.[0]}`}
          alt={title}
          style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
        />
      </Box>

      {/* Overview */}
     {/* Overview */}
<Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>Tour Overview</Typography>
<Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
  {tourData.full_description || 'No overview available.'}
</Typography>


      {/* Facilities and Challenge */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <img
            src="/images/tour-card-2.webp"
            alt="facility"
            style={{ width: '100%', borderRadius: 12 }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Advance Facilities</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Challenge</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...
          </Typography>
        </Grid>
      </Grid>

      {/* Tour Amenities */}
      <Box sx={{
        mt: 4,
        p: 2,
        border: `1px dashed ${theme.palette.success.main}`,
        borderRadius: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Tour Amenities</Typography>
        <Grid container spacing={2}>
          {amenities.map((item, idx) => (
            <Grid item xs={6} sm={4} md={3} key={idx}>
              <IconLabel icon={item.icon} label={item.label} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Included & Excluded */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Included</Typography>
          {renderList(inclusions, true)}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Excluded</Typography>
          {renderList(exclusions, false)}
        </Grid>
      </Grid>

      {/* Map Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>View on Map</Typography>
        <Box
          sx={{
            width: '100%',
            height: 400,
            borderRadius: 2,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`
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
    </Container>
  );
};

export default TourDetailsPage;
