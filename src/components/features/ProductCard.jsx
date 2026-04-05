import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography
} from '@mui/material';
import Button from '../common/Button';
import Badge from '../common/Badge';
import InventoryStatus from './InventoryStatus';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

const imageFallback =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <Card
      className="hover-lift"
      sx={{
        height: '100%',
        display: 'grid',
        gridTemplateRows: '220px 1fr auto',
        borderRadius: 4,
        overflow: 'hidden'
      }}
    >
      <CardMedia
        component="img"
        image={product.image || imageFallback}
        alt={`Producto ${product.name}`}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ display: 'grid', gap: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Badge variant={product.inStock ? 'success' : 'danger'}>{product.category}</Badge>
          <Typography variant="caption" color="text.secondary" noWrap>
            {product.brand}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
          {product.description}
        </Typography>

        <Typography variant="h6" color="primary.main">
          {formatCurrency(product.price)}
        </Typography>

        <Box>
          <InventoryStatus stock={product.stock} />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1, flexWrap: 'wrap' }}>
        <Button component={RouterLink} to={`/producto/${product.id}`} variant="ghost">
          Ver detalle
        </Button>
        <Button onClick={() => addItem(product)} disabled={!product.inStock}>
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
