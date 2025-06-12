'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';

const IconLabel = ({ icon: Icon = FaCheckCircle, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Icon size={18} style={{ color: '#4caf50' }} />
    <Typography variant="body2">{label}</Typography>
  </Box>
);

export default IconLabel;
