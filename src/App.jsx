import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import FeaturedMenu from './components/layout/FeaturedMenu';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar />
        <Hero />
        <FeaturedMenu />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
