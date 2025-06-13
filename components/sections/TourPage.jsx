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
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
  marginBottom: theme.spacing(3),
}));

const TourImage = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
    minWidth: '300px',
  },
  height: '200px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.grey[800],
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
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
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 1,
        display: isMobile ? (mobileOpen ? 'block' : 'none') : 'block',
        position: isMobile ? 'fixed' : 'static',
        top: 0,
        left: 0,
        width: isMobile ? '280px' : 'auto',
        height: isMobile ? '100vh' : 'auto',
        zIndex: isMobile ? 1200 : 'auto',
        overflowY: 'auto',
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
        <FilterListIcon sx={{ mr: 1 }} /> Filters
      </Typography>
      
      <Box mb={3}>
        <Typography fontWeight="bold" mb={1}>Tour Type</Typography>
        <FormGroup>
          {["Nature Tours", "Adventure Tours", "Cultural Tours", "Food Tours", "City Tours", "Cruises Tours"].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox 
                  size="small"
                  checked={filters.type.includes(type)}
                  onChange={() => handleChange("type", type)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                />
              }
              label={<Typography variant="body2">{type}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography fontWeight="bold" mb={1}>Price Range</Typography>
        <Slider
          value={filters.price}
          onChange={handlePriceChange}
          min={20}
          max={70000}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `₹${value}`}
          sx={{ color: 'primary.main', mb: 2 }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">₹{filters.price[0]}</Typography>
          <Typography variant="body2">₹{filters.price[1]}</Typography>
        </Box>
        <Button 
          variant="contained" 
          size="small" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Apply Price
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Typography fontWeight="bold" mb={1}>Rating</Typography>
        <FormGroup>
          {[5, 4, 3, 2, 1].map((star) => (
            <FormControlLabel
              key={star}
              control={
                <Checkbox
                  size="small"
                  checked={filters.rating.includes(star)}
                  onChange={() => handleChange("rating", star)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
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
                  <Typography variant="body2" ml={1}>& Up</Typography>
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
  return (
    <StyledTourCard elevation={3}>
      <TourImage>
        <img
          src={tour.image}
          alt={tour.name}
          onError={(e) => {
            e.target.src = '/images/default-tour.jpg';
          }}
        />
      </TourImage>
      <Box sx={{ p: 3, flex: 1 }}>
        <Typography variant="body2" color="primary" fontWeight="medium">
          {tour.location}
        </Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 0.5, mb: 1 }}>
          {tour.name}
        </Typography>

        <Box display="flex" alignItems="center" mb={1.5}>
          <Rating
            value={tour.rating}
            precision={0.5}
            readOnly
            size="small"
            emptyIcon={<StarIcon fontSize="inherit" color="disabled" />}
          />
          <Typography variant="body2" color="text.secondary" ml={1}>
            ({Math.round(tour.rating * 10) / 10})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {tour.duration}
        </Typography>

        <Box display="flex" gap={1} mb={3} flexWrap="wrap">
          {tour.tags?.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="caption" color="text.secondary">Starting from</Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              ₹{tour.price.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">per person</Typography>
          </Box>
          <Button
            variant="contained"
            size="medium"
            sx={{ borderRadius: 2, px: 3 }}
            onClick={() => router.push(`/tour-details/${tour.slug}`)}
          >
            View Details
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
    const matchesType = filters.type.length === 0 || filters.type.includes(tour.type);
    const matchesPrice = tour.price >= filters.price[0] && tour.price <= filters.price[1];
    const matchesRating = filters.rating.length === 0 || filters.rating.includes(Math.floor(tour.rating));
    return matchesType && matchesPrice && matchesRating;
  });

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" component="h1" gutterBottom>
            Discover Amazing Tours
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Find your perfect adventure with our curated selection of tours
          </Typography>
        </Box>

        <FilterButton
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={() => setMobileOpen(true)}
        >
          Filters
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
                  <Skeleton variant="rectangular" width={300} height={200} />
                  <Box sx={{ p: 3, flex: 1 }}>
                    <Skeleton width="40%" />
                    <Skeleton width="80%" height={40} />
                    <Skeleton width="60%" />
                    <Box sx={{ my: 2 }}>
                      <Skeleton width="100%" height={60} />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Skeleton width="30%" height={50} />
                      <Skeleton width="30%" height={50} />
                    </Box>
                  </Box>
                </StyledTourCard>
              ))
            ) : filteredTours.length > 0 ? (
              filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            ) : (
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No tours found matching your criteria
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Try adjusting your filters or search for something else
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => setFilters({ type: [], price: [2000, 50000], rating: [] })}
                >
                  Reset Filters
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
