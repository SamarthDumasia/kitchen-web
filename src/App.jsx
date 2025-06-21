import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import About from './components/layout/About';
import MenuSection from './components/layout/MenuSection';
import Contact from './components/layout/Contact';

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
        <About />
        <MenuSection />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
