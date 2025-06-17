'use client';
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Divider,
  Chip,
  Button,
  Container,
  Paper,
  Skeleton,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from 'next/navigation';
import StarIcon from "@mui/icons-material/Star";
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/material/styles';

// === STYLES ===
const StyledTourCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
  overflow: 'hidden',
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
  },
  marginBottom: theme.spacing(3),
}));

const TourImage = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '350px',
    minWidth: '350px',
  },
  height: '250px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.grey[800],
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

const PopularBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  left: '16px',
  backgroundColor: '#FF6600',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 'bold',
  zIndex: 1,
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
}));

const FilterButton = styled(Button)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
}));

// === FILTER SIDEBAR ===
const FiltersSidebar = ({ filters, setFilters, mobileOpen, setMobileOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, price: newValue }));
  };

  return (
    <Box 
      sx={{ 
        p: 3,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 3,
        display: isMobile ? (mobileOpen ? 'block' : 'none') : 'block',
        position: isMobile ? 'fixed' : 'static',
        top: 0,
        left: 0,
        width: isMobile ? '280px' : 'auto',
        height: isMobile ? '75vh' : 'auto',
        zIndex: isMobile ? 1200 : 'auto',
        overflowY: 'auto',
        marginTop: isMobile ? '132px' : 0,
      }}
    >
      {isMobile && (
        <Button 
          onClick={() => setMobileOpen(false)}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          ✕
        </Button>
      )}
      
      <Typography variant="h6" fontWeight="bold" mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <FilterListIcon sx={{ mr: 1 }} /> Find Your Perfect Trip
      </Typography>
      
      <Box mb={3}>
        <Typography fontWeight="bold" mb={1} color="primary">Tour Type</Typography>
        <FormGroup>
          {["Nature Escapes", "Adventure Thrills", "Cultural Journeys", "Foodie Trails", "City Explorations", "Luxury Cruises"].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  size="small"
                  checked={filters.type.includes(type)}
                  onChange={() => handleChange("type", type)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                  color="primary"
                />
              }
              label={<Typography variant="body2">{type}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography fontWeight="bold" mb={1} color="primary">Price Range</Typography>
        <Slider
          value={filters.price}
          onChange={handlePriceChange}
          min={20}
          max={70000}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `₹${value}`}
          sx={{ 
            color: '#FF6600',
            '& .MuiSlider-thumb': {
              height: 20,
              width: 20,
              backgroundColor: '#fff',
              border: '2px solid #FF6600',
            },
            mb: 2 
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">₹{filters.price[0]}</Typography>
          <Typography variant="body2">₹{filters.price[1]}</Typography>
        </Box>
        <Button 
          variant="contained" 
          size="small" 
          fullWidth
          sx={{ 
            mt: 2,
            backgroundColor: '#FF6600', 
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            py: 1,
            '&:hover': { 
              backgroundColor: '#e65c00',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(255,102,0,0.3)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Show Tours in This Range
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography fontWeight="bold" mb={1} color="primary">Rating</Typography>
        <FormGroup>
          {[5, 4, 3].map((star) => (
            <FormControlLabel
              key={star}
              control={
                <Checkbox
                  size="small"
                  checked={filters.rating.includes(star)}
                  onChange={() => handleChange("rating", star)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                  color="primary"
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <Rating
                    value={star}
                    readOnly
                    precision={1}
                    size="small"
                    emptyIcon={<StarIcon fontSize="inherit" color="disabled" />}
                  />
                  <Typography variant="body2" ml={1} color="text.secondary">{star === 5 ? 'Exceptional' : star === 4 ? 'Very Good' : 'Good'} & Up</Typography>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

// === TOUR CARD ===
const TourCard = ({ tour }) => {
  const router = useRouter();
  const isPopular = tour.rating >= 4.5;
  
  return (
    <StyledTourCard elevation={3}>
      <TourImage>
        {isPopular && <PopularBadge>POPULAR</PopularBadge>}
        <img
          src={tour.image}
          alt={tour.name}
          onError={(e) => {
            e.target.src = '/images/default-tour.jpg';
          }}
        />
      </TourImage>
      <Box sx={{ p: 3, flex: 1, position: 'relative' }}>
        <Box display="flex" alignItems="center" mb={0.5}>
          <PlaceIcon fontSize="small" color="primary" />
          <Typography variant="body2" color="primary" fontWeight="medium" ml={0.5}>
            {tour.location}
          </Typography>
        </Box>
        
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5, mb: 1.5 }}>
          {tour.name}
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Rating
            value={tour.rating}
            precision={0.5}
            readOnly
            size="medium"
            emptyIcon={<StarIcon fontSize="inherit" color="disabled" />}
          />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {tour.rating.toFixed(1)} ({Math.floor(tour.price/100)} reviews)
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <AccessTimeIcon fontSize="small" sx={{ color: '#FF6600', mr: 0.5 }} />
          <Typography variant="body2" color="#FF6600" fontWeight="medium">
            {tour.duration}
          </Typography>
        </Box>

        <Box display="flex" gap={1} mb={3} flexWrap="wrap">
          {tour.tags?.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 1, fontWeight: 'medium' }}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="caption" color="text.secondary">Starting from</Typography>
            <Box display="flex" alignItems="baseline">
              <Typography variant="h4" fontWeight="bold" color="#FF6600" sx={{ mr: 1 }}>
                ₹{tour.price.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">per person</Typography>
            </Box>
            {tour.price < 10000 && (
              <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalOfferIcon fontSize="small" sx={{ mr: 0.5 }} /> Great Deal!
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            size="medium"
            sx={{ 
              borderRadius: '8px', 
              px: 4,
              py: 1,
              backgroundColor: '#FF6600', 
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { 
                backgroundColor: '#e65c00',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(255,102,0,0.3)'
              },
              transition: 'all 0.3s ease'
            }}
            onClick={() => router.push(`/tour-details/${tour.slug}`)}
          >
            Explore Now
          </Button>
        </Box>
      </Box>
    </StyledTourCard>
  );
};

// === MAIN PAGE ===
const ToursPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filters, setFilters] = useState({
    type: [],
    price: [2000, 50000],
    rating: [],
  });
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://craftedvacays.grandeurnet.in/get-tours.php");
        const data = await res.json();

        if (!data.success || !Array.isArray(data.tours)) {
          setTours([]);
          return;
        }

        const formatted = data.tours.map((item) => ({
          id: item.id,
          slug: item.slug || item.id.toString(),
          name: item.title,
          image: item.images?.[0]
            ? `https://craftedvacays.grandeurnet.in/${item.images[0]}`
            : "/images/default-tour.jpg",
          location: `${item.city_name}, ${item.state_name}`,
          price: parseInt(item.price) || 0,
          rating: parseFloat(item.rating || 4.0),
          duration: `${item.duration_days || 1} Day${item.duration_days > 1 ? 's' : ''}${item.duration_nights ? ` / ${item.duration_nights} Night${item.duration_nights > 1 ? 's' : ''}` : ''}`,
          tags: [item.special, item.cancellation].filter(Boolean),
          type: item.type || "General",
        }));

        // Sort by rating (highest first)
        formatted.sort((a, b) => b.rating - a.rating);
        
        setTours(formatted);
      } catch (err) {
        console.error("Failed to fetch tours", err);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = tours.filter((tour) => {
    const matchesType = filters.type.length === 0 || filters.type.some(type => tour.type.includes(type.split(' ')[0]));
    const matchesPrice = tour.price >= filters.price[0] && tour.price <= filters.price[1];
    const matchesRating = filters.rating.length === 0 || filters.rating.includes(Math.floor(tour.rating));
    return matchesType && matchesPrice && matchesRating;
  });

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      color: 'text.primary', 
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to bottom, #f9f9ff, #ffffff)',
    marginTop: isMobile ? '75px' : 0,
    }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" component="h1" gutterBottom sx={{ color: '#333' }}>
            Your Next Adventure Awaits
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Discover handpicked experiences that will create memories to last a lifetime
          </Typography>
        </Box>

        <FilterButton
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={() => setMobileOpen(true)}
          sx={{
            backgroundColor: '#FF6600',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            py: 1,
            '&:hover': { 
              backgroundColor: '#e65c00',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(255,102,0,0.3)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Filter Tours
        </FilterButton>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FiltersSidebar 
              filters={filters} 
              setFilters={setFilters} 
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            {loading ? (
              [...Array(4)].map((_, index) => (
                <StyledTourCard key={index} elevation={3}>
                  <Skeleton variant="rectangular" width={350} height={250} animation="wave" />
                  <Box sx={{ p: 3, flex: 1 }}>
                    <Skeleton width="40%" height={24} animation="wave" />
                    <Skeleton width="80%" height={40} animation="wave" sx={{ my: 1 }} />
                    <Skeleton width="60%" height={24} animation="wave" />
                    <Box sx={{ my: 2 }}>
                      <Skeleton width="100%" height={60} animation="wave" />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Skeleton width="30%" height={50} animation="wave" />
                      <Skeleton width="30%" height={50} animation="wave" />
                    </Box>
                  </Box>
                </StyledTourCard>
              ))
            ) : filteredTours.length > 0 ? (
              <>
                <Typography variant="h6" mb={3} color="text.secondary">
                  {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'} Found
                </Typography>
                {filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
              </>
            ) : (
              <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No tours match your search
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
                  We couldn't find any tours that match your filters. Try adjusting your criteria or browse our most popular options below.
                </Typography>
                <Button 
                  variant="contained"
                  size="large"
                  onClick={() => setFilters({ type: [], price: [2000, 50000], rating: [] })}
                  sx={{
                    backgroundColor: '#FF6600',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    px: 4,
                    py: 1.5,
                    '&:hover': { 
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255,102,0,0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Show All Tours
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ToursPage;