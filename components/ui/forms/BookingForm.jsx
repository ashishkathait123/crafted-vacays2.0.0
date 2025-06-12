'use client';

import React, { useState } from 'react';
import {
  Box, Typography, Button, Divider, Checkbox, FormControlLabel, TextField,
  MenuItem
} from '@mui/material';
import { FaMinus, FaPlus } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const BookingForm = ({ basePrice = 1200 }) => {
  const [ticketCounts, setTicketCounts] = useState({
    adult: 1,
    youth: 0,
    child: 0,
  });
  const [extras, setExtras] = useState({
    perBooking: false,
    perPerson: false,
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleCountChange = (type, delta) => {
    setTicketCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const getTotal = () => {
    const adult = ticketCounts.adult * 7800;
    const youth = ticketCounts.youth * 6900;
    const child = ticketCounts.child * 1800;
    let total = adult + youth + child;

    if (extras.perBooking) total += 3000;
    if (extras.perPerson) {
      total += ticketCounts.adult * 1400 + ticketCounts.youth * 1200;
    }

    return total;
  };

  const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const handleBookNow = () => {
    if (!userName || !userEmail || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields.');
      return;
    }

const templateParams = {
  user_name: userName,
  user_email: userEmail,
  email: 'ashish2kathait@gmail.com', // ✅ This matches {{email}} in your template

  tour_name: 'Crafted Vacays Tour',
  tour_date: selectedDate,
  tour_time: selectedTime,

  ticket_adult: ticketCounts.adult,
  price_adult: ticketCounts.adult * 7800,
  ticket_youth: ticketCounts.youth,
  price_youth: ticketCounts.youth * 6900,
  ticket_child: ticketCounts.child,
  price_child: ticketCounts.child * 1800,

  extras_selected: [
    extras.perBooking ? 'Service per booking' : '',
    extras.perPerson ? 'Service per person' : '',
  ].filter(Boolean).join(', ') || 'None',

  total_amount: formatINR(getTotal()),
};





    emailjs.send(
      'service_ni7b61s',          // ✅ Your EmailJS service ID
      'template_e8pvmcl',         // ✅ Your EmailJS template ID
      templateParams,
      '6_ceoboGTfkeyhpgT'         // ✅ Your EmailJS public key
    ).then(
      () => {
        alert('Booking submitted! Confirmation sent to admin.');
      },
      (error) => {
        console.error('EmailJS error:', error?.text || error);
        alert('Booking failed. Please try again.');
      }
    );
  };

  return (
    <Box sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: 'white', maxWidth: 360, ml: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        From <strong>{formatINR(basePrice)}</strong>
      </Typography>

      <TextField
        fullWidth label="Your Name" value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{ mb: 2 }} required
      />
      <TextField
        fullWidth label="Your Email" type="email" value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        sx={{ mb: 2 }} required
      />
      {/* Optional phone number input:
      <TextField
        fullWidth label="Phone Number" type="tel" value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
        sx={{ mb: 2 }}
      /> */}

      <TextField
        fullWidth label="Select Date" type="date" value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        sx={{ mb: 2 }} InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth select label="Choose Time" value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="morning">Morning</MenuItem>
        <MenuItem value="afternoon">Afternoon</MenuItem>
        <MenuItem value="evening">Evening</MenuItem>
      </TextField>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>Tickets</Typography>
      {['adult', 'youth', 'child'].map((type) => {
        const labels = {
          adult: 'Adult (18+ years) ₹7,800',
          youth: 'Youth (13–17 years) ₹6,900',
          child: 'Children (0–12 years) ₹1,800',
        };
        return (
          <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
            <Typography>{labels[type]}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button size="small" onClick={() => handleCountChange(type, -1)}><FaMinus /></Button>
              <Typography>{ticketCounts[type]}</Typography>
              <Button size="small" onClick={() => handleCountChange(type, 1)}><FaPlus /></Button>
            </Box>
          </Box>
        );
      })}

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>Add Extra</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={extras.perBooking}
            onChange={() => setExtras((p) => ({ ...p, perBooking: !p.perBooking }))}
          />
        }
        label="Add Service per booking (₹3,000)"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={extras.perPerson}
            onChange={() => setExtras((p) => ({ ...p, perPerson: !p.perPerson }))}
          />
        }
        label="Add Service per person (₹1,400 adult / ₹1,200 youth)"
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Total: {formatINR(getTotal())}
      </Typography>

      <Button
        fullWidth variant="contained" color="warning" size="large"
        sx={{ mt: 2, fontWeight: 'bold', borderRadius: 2 }}
        onClick={handleBookNow}
      >
        Book Now →
      </Button>
    </Box>
  );
};

export default BookingForm;
