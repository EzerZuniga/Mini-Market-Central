import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { CircularProgress, Stack, Typography } from '@mui/material';

const Home = lazy(() => import('../pages/Home'));
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));
const Pago = lazy(() => import('../pages/Checkout'));
const PagoExitoso = lazy(() => import('../pages/CheckoutSuccess'));

function RouteFallback() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <CircularProgress size={20} />
      <Typography color="text.secondary">Cargando vista...</Typography>
    </Stack>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Shop />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/ingresar" element={<Login />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/pago/exito" element={<PagoExitoso />} />

        <Route path="/shop" element={<Navigate to="/catalogo" replace />} />
        <Route path="/product/:id" element={<LegacyProductRedirect />} />
        <Route path="/cart" element={<Navigate to="/carrito" replace />} />
        <Route path="/login" element={<Navigate to="/ingresar" replace />} />
        <Route path="/checkout" element={<Navigate to="/pago" replace />} />
        <Route path="/checkout/exito" element={<Navigate to="/pago/exito" replace />} />
        <Route path="/success" element={<Navigate to="/pago/exito" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function LegacyProductRedirect() {
  const { id } = useParams();
  return <Navigate to={`/producto/${id}`} replace />;
}
