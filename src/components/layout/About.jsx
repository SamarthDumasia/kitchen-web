import { Box, Container, Typography, Grid, Card, CardContent, IconButton, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { ContentCopy as CopyIcon, Phone as PhoneIcon, Email as EmailIcon, WhatsApp as WhatsAppIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import React from 'react';

const About = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      label: 'Phone',
      value: '743482 5745',
      color: 'primary.main'
    },
    {
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
      value: '743482 5745',
      color: '#25D366'
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: 'info@mistykitchen.com',
      color: '#EA4335'
    },
    {
      icon: <LocationIcon />,
      label: 'Address',
      value: 'C-43, Dharam Row House, Opp. Monalisa Park, Citylight, Surat.',
      color: '#4285F4'
    }
  ];

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      setSnackbar({
        open: true,
        message: `${label} copied to clipboard!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to copy to clipboard',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box component="section" py={8} bgcolor="background.paper" id="about">
      <Container>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="h2" component="h2" gutterBottom>
                About Misty Kitchen
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to Misty Kitchen, where cherished family recipes meet luxurious dining. Our premium home kitchen brings the refined taste of authentic Indian cuisine, lovingly prepared in small batches with meticulous attention to detail.
              </Typography>
              <Typography variant="body1" paragraph>
                Each dish is crafted with passion using century-old family recipes and hand-picked premium ingredients. Our master home chefs, with their deep-rooted understanding of traditional cooking methods, create culinary masterpieces that elevate home-cooked food to a fine dining experience.
              </Typography>
              <Typography variant="body1">
                From slow-cooked royal biryanis to artisanal curries, every creation reflects the sophistication of India's grand culinary heritage. Experience the warmth of home cooking with the finesse of fine dining, delivered with utmost care to your doorstep.
              </Typography>

              {/* Contact Information Cards */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  {contactInfo.map((info, index) => (
                    <Grid item xs={12} sm={6} key={info.label}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card
                          component={motion.div}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: '0 8px 24px rgba(139, 69, 19, 0.15)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          sx={{
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'visible'
                          }}
                          onClick={() => handleCopy(info.value, info.label)}
                        >
                          <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>
                              <IconButton
                                size="small"
                                sx={{ color: info.color }}
                              >
                                {info.icon}
                              </IconButton>
                              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                                {info.label}
                              </Typography>
                              <IconButton
                                size="small"
                                sx={{
                                  opacity: 0.6,
                                  transition: 'opacity 0.2s',
                                  '&:hover': { opacity: 1 }
                                }}
                              >
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1, wordBreak: 'break-word' }}
                            >
                              {info.value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  width: '100%',
                  height: '400px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.2)',
                  position: 'relative'
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80"
                  alt="Traditional Indian Spices and Ingredients"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  initial={{ scale: 1.1 }}
                  whileHover={{ 
                    scale: 1.15,
                    transition: { duration: 0.4 }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(139, 69, 19, 0.1) 100%)',
                    opacity: 0.6,
                  }}
                />
              </motion.div>
              
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default About;
