'use client';

import React, { useState } from 'react';
import {
  Box, Typography, Button, Divider, Checkbox, FormControlLabel, TextField,
  MenuItem, Paper, styled
} from '@mui/material';
import { FaMinus, FaPlus, FaCalendarAlt, FaClock, FaUser, FaEnvelope } from 'react-icons/fa';
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

const BookingForm = ({ basePrice = 1200, tourTitle }) => {
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
      email: 'ashish2kathait@gmail.com',
      tour_name: tourTitle,
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
      'service_ni7b61s',
      'template_e8pvmcl',
      templateParams,
      '6_ceoboGTfkeyhpgT'
    ).then(
      () => {
        alert('🎉 Booking confirmed! Your adventure awaits. Confirmation sent to your email.');
      },
      (error) => {
        console.error('EmailJS error:', error?.text || error);
        alert('Oops! Something went wrong. Please try again or contact us directly.');
      }
    );
  };

  return (
    <Paper elevation={6} sx={{ 
      p: 3, 
      borderRadius: 3, 
      backgroundColor: 'white', 
      maxWidth: 400,
      ml: 'auto',
      border: '1px solid #FFA726',
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        background: 'linear-gradient(90deg, #FF7B00, #FFA800)',
      }
    }}>
      <Typography variant="h5" sx={{ 
        mb: 2, 
        fontWeight: 'bold',
        color: '#FF7B00',
        textAlign: 'center'
      }}>
        Book Your {tourTitle} Experience
      </Typography>
      
      <Typography variant="body1" sx={{ 
        mb: 3,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#555'
      }}>
        Limited spots available! Secure your adventure today.
      </Typography>

      <Box sx={{ mb: 3, p: 2, backgroundColor: '#FFF8E1', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Starting at just {formatINR(basePrice)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Best price guarantee • Free cancellation up to 24 hours before
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FaUser style={{ marginRight: 8, color: '#FF7B00' }} />
          <TextField
            fullWidth 
            label="Your Name" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FaEnvelope style={{ marginRight: 8, color: '#FF7B00' }} />
          <TextField
            fullWidth 
            label="Your Email" 
            type="email" 
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FaCalendarAlt style={{ marginRight: 8, color: '#FF7B00' }} />
          <TextField
            fullWidth 
            label="Select Date" 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FaClock style={{ marginRight: 8, color: '#FF7B00' }} />
          <TextField
            fullWidth 
            select 
            label="Preferred Time" 
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          >
            <MenuItem value="morning">🌄 Morning (8am-12pm)</MenuItem>
            <MenuItem value="afternoon">☀️ Afternoon (12pm-4pm)</MenuItem>
            <MenuItem value="evening">🌆 Evening (4pm-8pm)</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Box sx={{ mb: 2, p: 2, backgroundColor: '#F5F5F5', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          👪 Select Participants
        </Typography>
        
        {['adult', 'youth', 'child'].map((type) => {
          const labels = {
            adult: 'Adult (18+ years)',
            youth: 'Youth (13–17 years)',
            child: 'Child (0–12 years)',
          };
          const prices = {
            adult: '₹7,800',
            youth: '₹6,900',
            child: '₹1,800',
          };
          return (
            <Box key={type} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              my: 1.5,
              p: 1,
              backgroundColor: 'white',
              borderRadius: 1
            }}>
              <Box>
                <Typography fontWeight="medium">{labels[type]}</Typography>
                <Typography variant="body2" color="text.secondary">{prices[type]}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button 
                  size="small" 
                  onClick={() => handleCountChange(type, -1)}
                  sx={{ minWidth: 30, height: 30 }}
                >
                  <FaMinus />
                </Button>
                <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
                  {ticketCounts[type]}
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => handleCountChange(type, 1)}
                  sx={{ minWidth: 30, height: 30 }}
                >
                  <FaPlus />
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          ✨ Enhance Your Experience
        </Typography>
        
        <FormControlLabel
          control={
            <Checkbox
              checked={extras.perBooking}
              onChange={() => setExtras((p) => ({ ...p, perBooking: !p.perBooking }))}
              color="warning"
            />
          }
          label={
            <Box>
              <Typography>Premium Tour Guide (₹3,000 per booking)</Typography>
              <Typography variant="body2" color="text.secondary">
                Get expert insights throughout your journey
              </Typography>
            </Box>
          }
          sx={{ mb: 1, alignItems: 'flex-start' }}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={extras.perPerson}
              onChange={() => setExtras((p) => ({ ...p, perPerson: !p.perPerson }))}
              color="warning"
            />
          }
          label={
            <Box>
              <Typography>Photo Package (₹1,400 adult / ₹1,200 youth)</Typography>
              <Typography variant="body2" color="text.secondary">
                Professional photos to remember your adventure
              </Typography>
            </Box>
          }
          sx={{ alignItems: 'flex-start' }}
        />
      </Box>

      <Box sx={{ 
        p: 2, 
        backgroundColor: '#FFF3E0', 
        borderRadius: 2,
        mb: 3
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Your Total:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF7B00' }}>
            {formatINR(getTotal())}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Includes all taxes and fees
        </Typography>
      </Box>

      <StyledButton
        fullWidth 
        size="large"
        onClick={handleBookNow}
        sx={{ borderRadius: 2 }}
      >
        Secure Your Spot Now →
      </StyledButton>
      
      <Typography variant="body2" sx={{ 
        mt: 2, 
        textAlign: 'center',
        color: '#666'
      }}>
        🔒 Safe and secure booking. No credit card fees.
      </Typography>
    </Paper>
  );
};

export default BookingForm;