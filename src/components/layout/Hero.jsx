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

const ParallaxBackground = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(139, 69, 19, 0.85))',
    zIndex: 2,
  },
  '& .bg-image': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease-out',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  }
}));

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

  const handleWhatsAppClick = () => {
    // Get device info
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = "8888888888";
    const message = "Hi! I would like to place an order.";
    
    // Create WhatsApp URL
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=91${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=91${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <HeroSection>      <ParallaxBackground
        style={{
          scale,
          y: backgroundY,
        }}
      >        {[          'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80', // Butter Chicken
          'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80', // Biryani
          'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80', // Paneer Tikka
          'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80', // Pav Bhaji
          'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80', // Featured Curry
          'https://images.unsplash.com/photo-1617692855027-33b14db85a42?auto=format&fit=crop&q=80' // Naan and Curry
        ].map((img, index) => (          <motion.img
            key={index}
            src={img}
            loading="lazy"
            className="bg-image"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transform: `rotate(${Math.random() * 2 - 1}deg)` 
            }}
            transition={{ 
              duration: 1.5,
              delay: index * 0.2,
              ease: "easeOut"
            }}            style={{
              filter: 'saturate(1.2) brightness(0.8) contrast(1.1)',
              transform: `scale(1.01) rotate(${Math.random() * 2 - 1}deg)`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
            whileHover={{
              scale: 1.12,
              filter: 'saturate(1.4) brightness(0.9) contrast(1.15)',
              boxShadow: '0 8px 30px rgba(218, 165, 32, 0.3)',
              transition: { 
                duration: 0.5, 
                ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoother animation
              }
            }}
          />
        ))}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,            background: 'radial-gradient(circle at center, rgba(218, 165, 32, 0.15) 0%, rgba(0, 0, 0, 0.85) 100%)',
            zIndex: 3,
            backgroundSize: '200% 200%',
            backdropFilter: 'blur(1px)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </ParallaxBackground>

      <Container maxWidth="md"sx={{ position: 'relative', zIndex: 1 }}>
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
            sx={{              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(45deg, #DAA520, #FFD700)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #DAA520, transparent)',
              },
            }}
          >
            Artisanal Home Kitchen
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
            Exquisite home-crafted delicacies prepared with love and tradition
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
                onClick={handleWhatsAppClick}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(45deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #128C7E, #075E54)',
                  }
                }}
              >
                Order on WhatsApp
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >              <Button
                variant="outlined"
                size="large"
                startIcon={<LocalDining />}
                onClick={() => {
                  const menuSection = document.querySelector('#menu');
                  if (menuSection) {
                    const navbarHeight = 70; // Approximate navbar height
                    const elementPosition = menuSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
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
