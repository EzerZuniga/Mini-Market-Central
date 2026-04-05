import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material';
import Button from '../components/common/Button';
import InventoryStatus from '../components/features/InventoryStatus';
import { useCart } from '../context/CartContext';
import { useProductDetail } from '../hooks/useProductDetail';
import { formatCurrency } from '../utils/formatters';

const imageFallback =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { product, loading, error, source } = useProductDetail(id);

  if (loading) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <CircularProgress size={22} />
        <Typography color="text.secondary">Cargando detalle del producto...</Typography>
      </Stack>
    );
  }

  if (!product) {
    return (
      <Card sx={{ borderRadius: 4, maxWidth: 620 }}>
        <CardContent>
          <Stack spacing={1.1}>
            <Typography variant="h5">Producto no encontrado</Typography>
            <Typography color="text.secondary">
              Revisa el catalogo para seleccionar otro articulo.
            </Typography>
            <Button component={RouterLink} to="/catalogo" variant="secondary">
              Volver al catalogo
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'minmax(280px, 460px) 1fr' }
        }}
      >
        <CardMedia
          component="img"
          image={product.image || imageFallback}
          alt={product.name}
          sx={{ minHeight: { xs: 250, md: 420 }, objectFit: 'cover' }}
        />

        <CardContent sx={{ p: { xs: 2, md: 2.6 } }}>
          <Stack spacing={1.1}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="overline" color="text.secondary">
                {product.category}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {source === 'remote' ? 'Fuente: API remota' : 'Fuente: respaldo local'}
              </Typography>
            </Stack>

            <Typography variant="h4">{product.name}</Typography>
            <Typography color="text.secondary">{product.description}</Typography>
            <Typography variant="h4" color="primary.main">
              {formatCurrency(product.price)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Marca: ${product.brand}`}
            </Typography>

            <InventoryStatus stock={product.stock} />

            {error ? (
              <Alert severity="warning">{`Detalle cargado en modo local: ${error}`}</Alert>
            ) : null}

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ pt: 0.8 }}>
              <Button onClick={() => addItem(product)} disabled={!product.inStock}>
                Agregar al carrito
              </Button>
              <Button component={RouterLink} to="/catalogo" variant="ghost">
                Volver
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
