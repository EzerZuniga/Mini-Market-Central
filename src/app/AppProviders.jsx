import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { CartProvider } from '../context/CartContext';
import { appTheme } from '../theme/appTheme';

const globalStyles = (
  <GlobalStyles
    styles={{
      '.page-fade': {
        animation: 'pageFade 420ms ease-out'
      },
      '.hover-lift': {
        transition: 'transform 220ms ease, box-shadow 220ms ease'
      },
      '.hover-lift:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 14px 28px rgba(15, 23, 42, 0.14)'
      },
      '@keyframes pageFade': {
        from: { opacity: 0, transform: 'translateY(8px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
      }
    }}
  />
);

export default function AppProviders({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {globalStyles}
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
