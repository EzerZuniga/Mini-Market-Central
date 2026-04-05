import { useMemo, useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/carrito', label: 'Carrito' }
];

function NavItem({ item, onClick, mobile = false }) {
  return (
    <Button
      component={NavLink}
      to={item.to}
      onClick={onClick}
      fullWidth={mobile}
      sx={{
        justifyContent: mobile ? 'flex-start' : 'center',
        color: 'text.secondary',
        px: mobile ? 2 : 1.5,
        '&.active': {
          color: 'primary.main',
          backgroundColor: mobile ? 'rgba(15, 118, 110, 0.1)' : 'transparent'
        }
      }}
    >
      {item.label}
    </Button>
  );
}

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const cartText = useMemo(() => {
    if (!totalItems) {
      return 'Carrito';
    }
    return `Carrito (${totalItems})`;
  }, [totalItems]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 76, gap: 1.2 }}>
          <Stack
            component={RouterLink}
            to="/"
            direction="row"
            spacing={1.2}
            alignItems="center"
            sx={{ mr: 1.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                color: 'white',
                background: 'linear-gradient(145deg, #0f766e, #14b8a6)'
              }}
            >
              <StorefrontRoundedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                Mini Market Central
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tu tienda del barrio, en linea
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
          >
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 'auto' }}>
            <Button
              component={RouterLink}
              to="/ingresar"
              variant={location.pathname === '/ingresar' ? 'contained' : 'outlined'}
              size="small"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Ingresar
            </Button>

            <Button
              component={RouterLink}
              to="/carrito"
              variant="contained"
              size="small"
              startIcon={
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartRoundedIcon fontSize="small" />
                </Badge>
              }
            >
              {cartText}
            </Button>

            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              aria-label="Abrir menu"
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={closeMobileMenu}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1.2 }}>
            Menú
          </Typography>
          <Stack spacing={0.5}>
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} mobile onClick={closeMobileMenu} />
            ))}
            <Button
              component={RouterLink}
              to="/ingresar"
              onClick={closeMobileMenu}
              sx={{ justifyContent: 'flex-start', px: 2 }}
            >
              Ingresar
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
