import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VegetarianFriendlyIcon from '@mui/icons-material/Spa';

const menuItems = [
  {
    id: 1,
    name: 'Heritage Butter Chicken',
    description: 'A family recipe passed down through generations - tender free-range chicken in a rich, aromatic tomato gravy finished with cultured butter',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80',
    category: 'Chef\'s Specialties',
    isSpicy: false,
    isVeg: false,
  },
  {
    id: 2,
    name: 'Royal Awadhi Biryani',
    description: 'Premium aged basmati rice layered with tender meat and exotic spices, slow-cooked in the traditional dum style',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80',
    category: 'Royal Delicacies',
    isSpicy: true,
    isVeg: false,
  },
  {
    id: 3,
    name: 'Saffron-Infused Paneer Tikka',
    description: 'Fresh homemade cottage cheese marinated in saffron yogurt with hand-ground spices, chargrilled to perfection',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80',
    category: 'Vegetarian Treasures',
    isSpicy: false,
    isVeg: true,
  },
  {
    id: 4,
    name: 'Mumbai-Style Pav Bhaji',
    description: 'Perfectly spiced vegetable mash served with butter-toasted pavs, topped with fresh herbs, diced onions, and a generous dollop of homemade butter',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80',
    category: 'Street Food Delights',
    isSpicy: true,
    isVeg: true,
  },
  {
    id: 5,
    name: 'Signature Tava Pulao',
    description: 'Fragrant basmati rice stir-fried with garden-fresh vegetables, aromatic spices, and special house masala, garnished with crispy onions',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&q=80',
    category: 'Street Food Delights',
    isSpicy: true,
    isVeg: true,
  }
];

const MenuSection = () => {
  return (
    <Box component="section" py={8} bgcolor="#f5f5f5" id="menu">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Our Signature Dishes
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            Experience the authentic flavors of India
          </Typography>
        </motion.div>

        <Grid container spacing={4} mt={4}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {item.description}
                    </Typography>
                    <Box display="flex" gap={1}>
                      <Chip 
                        label={item.category}
                        color="primary"
                        size="small"
                      />
                      {item.isSpicy && (
                        <Chip
                          icon={<LocalFireDepartmentIcon />}
                          label="Spicy"
                          color="error"
                          size="small"
                        />
                      )}
                      {item.isVeg && (
                        <Chip
                          icon={<VegetarianFriendlyIcon />}
                          label="Vegetarian"
                          color="success"
                          size="small"
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MenuSection;
