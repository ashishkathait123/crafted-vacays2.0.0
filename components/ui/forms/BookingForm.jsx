'use client';

import React, { useState } from 'react';
import {
  Box, Typography, Button, Divider, Checkbox, FormControlLabel, TextField,
  MenuItem, Paper, styled
} from '@mui/material';
import { FaMinus, FaPlus } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #FF7B00 30%, #FFA800 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 123, 0, .2)',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: '12px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF6B00 30%, #FF9800 90%)',
  },
});

const BookingForm = ({
  basePrice = 0,
  tourTitle,
  adultPrice = 0,
  youthPrice = 0,
  childPrice = 0,
  hasPhotoPackage = false,
  photoPackagePrice = { adult: 0, youth: 0 },
}) => {
  const [ticketCounts, setTicketCounts] = useState({ adult: 1, youth: 0, child: 0 });
  const [extras, setExtras] = useState({ perPerson: false });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleCountChange = (type, delta) => {
    setTicketCounts((prev) => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
  };

 const getTotal = () => {
  const adult = ticketCounts.adult * adultPrice;
  const youth = ticketCounts.youth * youthPrice;
  const child = ticketCounts.child * childPrice;
  let total = basePrice + adult + youth + child;

  if (extras.perPerson && hasPhotoPackage) {
    total += ticketCounts.adult * (photoPackagePrice.adult || 0);
    total += ticketCounts.youth * (photoPackagePrice.youth || 0);
  }

  return total;
};
  const formatINR = (amount) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(amount);

  const handleBookNow = () => {
    if (!userName || !userEmail || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields.');
      return;
    }

    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      email: 'ashish2kathait@gmail.com',
      tour_name: tourTitle,
      tour_date: selectedDate,
      tour_time: selectedTime,
      ticket_adult: ticketCounts.adult,
      price_adult: ticketCounts.adult * adultPrice,
      ticket_youth: ticketCounts.youth,
      price_youth: ticketCounts.youth * youthPrice,
      ticket_child: ticketCounts.child,
      price_child: ticketCounts.child * childPrice,
      extras_selected: extras.perPerson && hasPhotoPackage ? 'Photo Package' : 'None',
      total_amount: formatINR(getTotal()),
    };

    emailjs.send('service_ni7b61s', 'template_e8pvmcl', templateParams, '6_ceoboGTfkeyhpgT')
      .then(() => {
        alert('🎉 Booking confirmed! Confirmation sent to your email.');
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Oops! Something went wrong.');
      });
  };

  return (
    <Paper elevation={6} sx={{ p: 3, borderRadius: 3, maxWidth: 400, ml: 'auto', border: '1px solid #FFA726' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#FF7B00' }}>
        Book Your {tourTitle} Experience
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField fullWidth label="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <TextField fullWidth label="Your Email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required sx={{ mt: 2 }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField fullWidth label="Select Date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
        <TextField fullWidth select label="Preferred Time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required sx={{ mt: 2 }}>
          <MenuItem value="morning">🌄 Morning</MenuItem>
          <MenuItem value="afternoon">☀️ Afternoon</MenuItem>
          <MenuItem value="evening">🌆 Evening</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ mb: 2 }}>
        {['adult', 'youth', 'child'].map((type) => {
          const labels = {
            adult: `Adult (${formatINR(adultPrice)})`,
            youth: `Youth (${formatINR(youthPrice)})`,
            child: `Child (${formatINR(childPrice)})`,
          };
          return (
            <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography>{labels[type]}</Typography>
              <Box>
                <Button size="small" onClick={() => handleCountChange(type, -1)}><FaMinus /></Button>
                <Typography component="span" sx={{ mx: 2 }}>{ticketCounts[type]}</Typography>
                <Button size="small" onClick={() => handleCountChange(type, 1)}><FaPlus /></Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      {hasPhotoPackage && (
        <>
          <Divider sx={{ my: 2 }} />
          <FormControlLabel
            control={<Checkbox checked={extras.perPerson} onChange={() => setExtras((p) => ({ ...p, perPerson: !p.perPerson }))} />}
            label={`Photo Package (${formatINR(photoPackagePrice.adult)} adult / ${formatINR(photoPackagePrice.youth)} youth)`}
          />
        </>
      )}

      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total: {formatINR(getTotal())}</Typography>
      </Box>

      <StyledButton fullWidth onClick={handleBookNow}>Secure Your Spot Now →</StyledButton>
    </Paper>
  );
};

export default BookingForm;
