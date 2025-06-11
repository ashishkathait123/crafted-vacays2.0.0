'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const TourDetailsPage = () => {
  const { slug } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://craftedvacays.grandeurnet.in/get-tours.php')
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
      <Container sx={{ mt: 10 }}>
        <Typography variant="h5" color="error">
          Tour not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        {tourData.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {tourData.city_name}, {tourData.state_name}
      </Typography>
      <img
        src={`https://craftedvacays.grandeurnet.in/${tourData.images?.[0]}`}
        alt={tourData.title}
        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12 }}
      />
      <Typography variant="body1" sx={{ mt: 4 }}>
        <strong>Duration:</strong> {tourData.duration_nights}N / {tourData.duration_days}D
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Price:</strong> ₹{tourData.price}
      </Typography>
      <Typography variant="body2" sx={{ mt: 3 }}>
        <strong>Itinerary:</strong> <br />
        {tourData.itinerary}
      </Typography>
    </Container>
  );
};

export default TourDetailsPage;
