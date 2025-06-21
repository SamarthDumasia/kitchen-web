import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // A rich brown color for sophistication
      light: '#A0522D',
      dark: '#654321',
    },
    secondary: {
      main: '#DAA520', // Elegant golden color
      light: '#FFD700',
      dark: '#B8860B',
    },
    background: {
      default: '#FFFAF0',
      paper: '#FFF8DC',
    },
  },  typography: {
    fontFamily: '"Cormorant Garamond", "Poppins", serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Cormorant Garamond", serif',
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Cormorant Garamond", serif',
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 600,
      fontFamily: '"Cormorant Garamond", serif',
    },
    h4: {
      fontFamily: '"Cormorant Garamond", serif',
    },
    h5: {
      fontFamily: '"Cormorant Garamond", serif',
    },
    h6: {
      fontFamily: '"Cormorant Garamond", serif',
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1.1rem',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      textTransform: 'none',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCardMedia: {
      defaultProps: {
        loading: 'lazy',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },
});

export default theme;
