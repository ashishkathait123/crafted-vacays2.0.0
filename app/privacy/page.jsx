'use client';

import React from 'react';
import { Container, Typography, Box, Link, Divider, List, ListItem, ListItemText } from '@mui/material';
import { PrivacyTip, Security, Cookie, Share, Email, Phone } from '@mui/icons-material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <PrivacyTip sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Last Updated: February 8, 2025
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2, p: 4, boxShadow: 1 }}>
        <Typography variant="body1" paragraph>
          Welcome to <strong>Crafted Vacays</strong>! Your privacy is important to us. This Privacy Policy outlines how we collect, 
          use, disclose, and protect your personal data when you use our website www.craftedvacays.com ("Website"). 
          By using our Website, you consent to the practices described in this policy.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>1. Information We Collect</Typography>
          <Typography variant="body1" paragraph>
            We collect various types of information to enhance your experience and improve our services:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2 }}>
            <li><Typography component="span"><strong>Personal Information:</strong> When you book a trip or sign up for our services, we may collect your name, email address, phone number, billing details, and travel preferences.</Typography></li>
            <li><Typography component="span"><strong>Browsing Data:</strong> We collect non-personal information such as IP address, browser type, and device information through cookies and analytics tools.</Typography></li>
            <li><Typography component="span"><strong>Location Data:</strong> If you allow geolocation services, we may collect your device's location to provide location-based recommendations.</Typography></li>
            <li><Typography component="span"><strong>Communications:</strong> We store emails, messages, and customer service interactions to enhance support and respond effectively to inquiries.</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>2. How We Use Your Information</Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2 }}>
            <li><Typography component="span">Processing bookings and payments.</Typography></li>
            <li><Typography component="span">Providing personalized travel recommendations.</Typography></li>
            <li><Typography component="span">Sending booking confirmations and updates.</Typography></li>
            <li><Typography component="span">Improving website performance and user experience.</Typography></li>
            <li><Typography component="span">Complying with legal and regulatory obligations.</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>3. Cookies and Tracking Technologies</Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar tracking technologies to enhance user experience. You can manage cookie preferences through your browser settings. Third-party analytics services like Google Analytics may also collect data about your interaction with our Website.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>4. How We Share Your Information</Typography>
          <Typography variant="body1" paragraph>
            We do not sell your personal data. However, we may share it with:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2 }}>
            <li><Typography component="span"><strong>Trusted Service Providers:</strong> Payment processors, travel partners, and customer support providers who assist in service delivery.</Typography></li>
            <li><Typography component="span"><strong>Legal Authorities:</strong> If required by law, we may disclose information in response to legal requests or to protect our rights.</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>5. Data Security</Typography>
          <Typography variant="body1" paragraph>
            We implement security measures such as encryption and access controls to protect your personal information. However, no online transmission is 100% secure, and we encourage users to take precautions when sharing sensitive data.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>6. Your Rights & Choices</Typography>
          <Typography variant="body1" paragraph>
            Depending on your location, you may have the right to:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mb: 2 }}>
            <li><Typography component="span">Access, update, or delete your personal data.</Typography></li>
            <li><Typography component="span">Opt-out of marketing communications.</Typography></li>
            <li><Typography component="span">Restrict or object to data processing.</Typography></li>
            <li><Typography component="span">Request data portability.</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            To exercise these rights, please contact us at <Link href="mailto:support@craftedvacays.com">support@craftedvacays.com</Link>.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>7. Third-Party Links</Typography>
          <Typography variant="body1" paragraph>
            Our Website may contain links to third-party websites. We are not responsible for their privacy practices, and we encourage you to review their policies before providing any personal information.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>8. Social Media Interactions</Typography>
          <Typography variant="body1" paragraph>
            When you interact with us via social media platforms, your activity is subject to the respective platform's privacy policies. We do not request sensitive personal information through social media.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" mb={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>9. Policy Updates</Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy periodically. Changes will be reflected with a revised "Last Updated" date. Continued use of our services after updates signifies your acceptance of the revised policy.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section">
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>10. Contact Us</Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ mr: 1 }} />
            <Link href="mailto:support@craftedvacays.com">support@craftedvacays.com</Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Phone sx={{ mr: 1 }} />
            <Link href="tel:+919234835704">+91-9234835704</Link>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" textAlign="center" sx={{ fontStyle: 'italic' }}>
          Thank you for trusting Crafted Vacays for your travel experiences!
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;