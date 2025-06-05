import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  AccessTime, 
  LocalDining, 
  RestaurantMenu, 
  Star, 
  WhatsApp 
} from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  overflow: 'hidden',
}));

const ParallaxBackground = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
    zIndex: 1,
  },
});

const FloatingHighlight = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const RotatingText = styled(motion.div)({
  position: 'absolute',
  right: '5%',
  top: '30%',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
});

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotationSpring = useSpring(0, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      rotationSpring.set(rotationSpring.get() + 360);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.02;
      const moveY = (clientY - window.innerHeight / 2) * 0.02;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <HeroSection>
      <ParallaxBackground
        style={{
          backgroundImage: 'url("https://source.unsplash.com/featured/?indian,kitchen,cooking")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          y: backgroundY,
        }}
      />

    

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ opacity }}
        >
          <Typography
            variant="h1"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              textShadow: '2px 2px 4px rgba(194, 28, 28, 0.29)',
              background: 'linear-gradient(45deg, #FF5722, #FFC107)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3,
            }}
          >
            Cloud Kitchen Excellence
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Crafting authentic flavors in our state-of-the-art cloud kitchen
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 4,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsApp />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(45deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                }}
              >
                Order on WhatsApp
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<LocalDining />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  borderColor: 'white',
                  color: 'white',
                  borderWidth: '2px',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                View Menu
              </Button>
            </motion.div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {['Pure Veg Options', 'Authentic Spices', 'Hygienic Kitchen'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  '& .MuiChip-label': {
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  },
                }}
              />
            ))}
          </Box>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default Hero;
