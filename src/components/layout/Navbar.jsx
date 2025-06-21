import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Box, Badge, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search as SearchIcon, Menu as MenuIcon, Close, KeyboardArrowDown, LocalDining } from '@mui/icons-material';
import { mix } from 'popmotion';
import SearchResults from './SearchResults';

const NavbarContainer = styled(motion.div)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const GlassAppBar = styled(AppBar)(({ theme, $scrolled }) => ({
  background: $scrolled 
    ? 'rgba(139, 69, 19, 0.95)'
    : 'transparent',
  backdropFilter: $scrolled ? 'blur(10px)' : 'none',
  boxShadow: $scrolled ? '0 4px 30px rgba(139, 69, 19, 0.3)' : 'none',
  color: '#fff',
  transition: theme.transitions.create(['background', 'box-shadow', 'color'], {
    duration: 0.5,
  }),
  borderBottom: $scrolled ? '1px solid rgba(218, 165, 32, 0.2)' : 'none',
}));

const Search = styled(motion.div)(({ theme, $scrolled }) => ({
  position: 'relative',
  borderRadius: 50,
  backgroundColor: $scrolled 
    ? 'rgba(218, 165, 32, 0.1)'
    : 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: $scrolled 
      ? 'rgba(218, 165, 32, 0.2)'
      : 'rgba(255, 255, 255, 0.25)',
  },
  border: $scrolled ? '1px solid rgba(218, 165, 32, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: theme.transitions.create('background'),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme, $scrolled }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(['width', 'background']),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
        backgroundColor: $scrolled 
          ? alpha(theme.palette.common.black, 0.05)
          : alpha(theme.palette.common.white, 0.15),
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme, $scrolled }) => ({
  position: 'relative',
  margin: theme.spacing(0, 1),
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    background: $scrolled ? theme.palette.primary.main : '#fff',
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '70%',
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '80%',
    maxWidth: 300,
    background: 'rgba(139, 69, 19, 0.97)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    borderRight: '1px solid rgba(218, 165, 32, 0.2)',
    '& .MuiIconButton-root': {
      color: '#fff',
    },
    '& .MuiListItem-root': {
      borderBottom: '1px solid rgba(218, 165, 32, 0.1)',
    },
    '& .MuiTypography-root': {
      color: '#fff',
    },
  },
}));

const MobileMenuItem = styled(motion.div)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const menuItems = [
  { title: 'Home', href: '#' },
  { title: 'Menu', href: '#menu' },
  { title: 'About', href: '#about' },
  { title: 'Contact', href: '#contact' },
];

// Mock data for search (you can replace this with your actual menu data)
const menuData = [
  {
    id: 1,
    name: 'Butter Chicken',
    category: 'Main Course',
    price: 350,
    image: '/public/dishes/butter-chicken.jpg'
  },
  {
    id: 2,
    name: 'Biryani',
    category: 'Main Course',
    price: 300,
    image: '/public/dishes/biryani.jpg'
  },
  {
    id: 3,
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 250,
    image: '/public/dishes/paneer-tikka.jpg'
  },
  {
    id: 4,
    name: 'Pav Bhaji',
    category: 'Main Course',
    price: 200,
    image: '/public/dishes/pav-bhaji.jpg'
  }
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const theme = useTheme();
  
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange(latest => {
      setHasScrolled(latest > 50);
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const handleMenuClick = (href) => {
    setMobileOpen(false);
    setIsOpen(false);
    
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 70; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = menuData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleResultClick = (item) => {
    setShowResults(false);
    setSearchQuery('');
    // Scroll to menu section and highlight the item
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      const navbarHeight = 70;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <NavbarContainer>
      <GlassAppBar position="static" $scrolled={scrolled}>
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                fontWeight: 700,
                letterSpacing: 1,              background: 'linear-gradient(45deg, #DAA520, #FFD700)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: hasScrolled ? '1px 1px 2px rgba(0,0,0,0.2)' : '1px 1px 2px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              Misty Kitchen
            </Typography>
          </motion.div>          <Box ref={searchRef} sx={{ position: 'relative' }}>
            <Search 
              $scrolled={hasScrolled}
              animate={{
                width: isSearchFocused ? '30ch' : '20ch',
                boxShadow: isSearchFocused ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search dishes..."
                inputProps={{ 'aria-label': 'search' }}
                $scrolled={hasScrolled}
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setShowResults(searchResults.length > 0);
                }}
                onBlur={() => setIsSearchFocused(false)}
              />
            </Search>
            <SearchResults 
              results={searchResults}
              onResultClick={handleResultClick}
              isVisible={showResults && searchResults.length > 0}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <NavButton
                key={item.title}
                color="inherit"
                $scrolled={hasScrolled}
                component={motion.button}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => handleMenuClick(item.href)}
              >
                {item.title}
              </NavButton>
            ))}
          </Box>
        </Toolbar>
      </GlassAppBar>

      {/* Mobile Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(139, 69, 19, 0.97)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,              background: 'linear-gradient(45deg, #DAA520, #FFD700)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}>
              Misty Kitchen
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>
          
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.title}
                component={motion.div}
                whileHover={{ x: 10 }}
                onClick={() => handleMenuClick(item.href)}
                sx={{
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(218, 165, 32, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(218, 165, 32, 0.1)',
                  }
                }}
              >
                <ListItemText 
                  primary={item.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#fff'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </NavbarContainer>
  );
};

export default Navbar;
