import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const FeaturedMenu = () => {
  const featuredDishes = [
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Tender chicken in rich, creamy tomato sauce',
      image: 'https://source.unsplash.com/featured/?butter,chicken',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      description: 'Grilled cottage cheese with aromatic spices',
      image: 'https://source.unsplash.com/featured/?paneer',
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Biryani',
      description: 'Fragrant rice dish with tender meat and spices',
      image: 'https://source.unsplash.com/featured/?biryani',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Dal Makhani',
      description: 'Creamy black lentils cooked overnight',
      image: 'https://source.unsplash.com/featured/?dal',
      rating: 4.6,
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Our Signature Dishes
        </Typography>
        <Grid container spacing={4}>
          {featuredDishes.map((dish) => (
            <Grid item key={dish.id} xs={12} sm={6} md={3}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={dish.image}
                  alt={dish.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {dish.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {dish.description}
                  </Typography>
                  <Rating value={dish.rating} precision={0.1} readOnly size="small" />
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedMenu;
