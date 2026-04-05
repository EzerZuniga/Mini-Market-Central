import { Box, Container } from '@mui/material';
import CartConfirmation from '../features/CartConfirmation';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ flex: 1, py: { xs: 2.5, md: 3.5 } }}
        className="page-fade"
      >
        {children}
      </Container>
      <CartConfirmation />
      <Footer />
    </Box>
  );
}
