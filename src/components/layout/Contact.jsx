import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '743482 5745',
      action: 'tel:7434825745'
    },
    {
      icon: <WhatsAppIcon />,
      title: 'WhatsApp',
      content: '743482 5745',
      action: 'https://wa.me/917434825745'
    },
    {
      icon: <EmailIcon />,
      title: 'Email',      content: 'info@mistykitchen.com',
      action: 'mailto:info@mistykitchen.com'
    },
    {
      icon: <LocationIcon />,
      title: 'Address',
      content: 'C-43, Dharam Row House, Opp. Monalisa Park, Citylight, Surat.',
      action: 'https://maps.google.com/?q=123+Curry+Lane+NY+10001'
    }
  ];

  return (
    <Box component="section" py={8} id="contact">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >              <Typography variant="h2" component="h2" align="center" gutterBottom>
                Personal Concierge
              </Typography>
              <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
                For personalized dining experiences, special orders, or any culinary requests, our dedicated concierge team is at your service.
              </Typography>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Paper 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ p: 3 }}
                elevation={3}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      component={motion.button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} key={info.title}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      component={motion.div}
                      whileHover={{ y: -5 }}
                      sx={{ height: '100%' }}
                    >
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={1}>
                          <IconButton
                            color="primary"
                            component="a"
                            href={info.action}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {info.icon}
                          </IconButton>
                          <Typography variant="h6" component="h3">
                            {info.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {info.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
