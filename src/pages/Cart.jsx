import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { formatCurrency, formatShortDate } from '../utils/formatters';

export default function Cart() {
  const {
    items,
    total,
    updateItemQuantity,
    decreaseItem,
    removeItem,
    clearCart
  } = useCart();

  const hasItems = items.length > 0;

  return (
    <Stack spacing={1.4}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4">Carrito de compras</Typography>
          <Typography color="text.secondary">Revisa cantidades antes de confirmar tu pedido.</Typography>
        </CardContent>
      </Card>

      {!hasItems && (
        <Card sx={{ borderRadius: 4, maxWidth: 620 }}>
          <CardContent>
            <Stack spacing={1.1}>
              <Typography variant="h6">Tu carrito esta vacio.</Typography>
              <Typography color="text.secondary">
                Explora el catalogo y agrega productos para continuar.
              </Typography>
              <Button component={RouterLink} to="/catalogo" variant="secondary">
                Ir al catalogo
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {hasItems && (
        <Box
          sx={{
            display: 'grid',
            gap: 1.3,
            gridTemplateColumns: { xs: '1fr', lg: '1fr minmax(280px, 330px)' },
            alignItems: 'start'
          }}
        >
          <Stack spacing={1}>
            {items.map((item) => (
              <Card key={item.id} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 1,
                      gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
                      alignItems: 'center'
                    }}
                  >
                    <Stack spacing={0.2}>
                      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${formatCurrency(item.price)} c/u`}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                      <Stack direction="row" spacing={0.4} alignItems="center">
                        <IconButton onClick={() => decreaseItem(item.id)} aria-label="Disminuir cantidad">
                          <RemoveRoundedIcon />
                        </IconButton>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(event) =>
                            updateItemQuantity(item.id, Number(event.target.value))
                          }
                          inputProps={{ min: 1, max: item.stock }}
                          size="small"
                          sx={{ width: 88 }}
                        />
                        <IconButton
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          <AddRoundedIcon />
                        </IconButton>
                      </Stack>

                      <Stack alignItems="flex-end" spacing={0.2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() => removeItem(item.id)}
                          aria-label="Quitar producto"
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Card sx={{ borderRadius: 4, position: { lg: 'sticky' }, top: { lg: 100 } }}>
            <CardContent>
              <Stack spacing={0.9}>
                <Typography variant="h5">Resumen</Typography>
                <Typography color="text.secondary">Total a pagar</Typography>
                <Typography variant="h4" color="primary.main">
                  {formatCurrency(total)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`Actualizado: ${formatShortDate(new Date())}`}
                </Typography>

                <Divider sx={{ my: 0.6 }} />

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Button onClick={clearCart} variant="secondary">
                    Vaciar carrito
                  </Button>
                  <Button component={RouterLink} to="/pago">
                    Confirmar pedido
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Stack>
  );
}
