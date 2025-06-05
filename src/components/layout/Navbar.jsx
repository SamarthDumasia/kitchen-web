import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Box, Badge, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search as SearchIcon, Menu as MenuIcon, Close, KeyboardArrowDown, LocalDining } from '@mui/icons-material';
import { mix } from 'popmotion';

const NavbarContainer = styled(motion.div)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const GlassAppBar = styled(AppBar)(({ theme, $scrolled }) => ({
  background: $scrolled 
    ? `rgb(255, 87, 34)`
    : 'transparent',
  backdropFilter: $scrolled ? 'blur(10px)' : 'none',
  boxShadow: $scrolled ? '0 4px 30px rgb(255, 87, 34)' : 'none',
  color: $scrolled ? theme.palette.text.primary : '#fff',
  transition: theme.transitions.create(['background', 'box-shadow', 'color'], {
    duration: 0.3,
  }),
}));

const Search = styled(motion.div)(({ theme, $scrolled }) => ({
  position: 'relative',
  borderRadius: 50,
  backgroundColor: $scrolled 
    ? alpha(theme.palette.common.black, 0.05)
    : alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: $scrolled 
      ? alpha(theme.palette.common.black, 0.1)
      : alpha(theme.palette.common.white, 0.25),
  },
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

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const theme = useTheme();
  
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange(latest => {
      setHasScrolled(latest > 50);
    });
  }, [scrollY]);

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  return (
    <NavbarContainer>
      <GlassAppBar position="static" $scrolled={hasScrolled}>
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
                letterSpacing: 1,
                background: hasScrolled ? 'none' : 'linear-gradient(45deg, #FF5722, #FFC107)',
                backgroundClip: hasScrolled ? 'none' : 'text',
                WebkitBackgroundClip: hasScrolled ? 'none' : 'text',
                color: hasScrolled ? 'inherit' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              Khana Khazana
            </Typography>
          </motion.div>

          <Search 
            $scrolled={hasScrolled}
            animate={{
              width: isSearchFocused ? '100%' : 'auto',
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
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>            {['Menu', 'About', 'Contact'].map((item) => (
              <NavButton
                key={item}
                color="inherit"
                $scrolled={hasScrolled}
                component={motion.button}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </NavButton>
            ))}
          </Box>
        </Toolbar>
      </GlassAppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Khana Khazana
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <List>
            {['Menu', 'About', 'Contact'].map((item) => (
              <ListItem 
                key={item}
                component={motion.div}
                whileHover={{ x: 10 }}
                button
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </NavbarContainer>
  );
};

export default Navbar;
