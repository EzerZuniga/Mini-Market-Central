import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import Button from '../components/common/Button';
import { APP_CONFIG } from '../config/env';
import { formatCurrency } from '../utils/formatters';

const metodoLabel = {
  paypal: 'Tarjeta o PayPal',
  yape_plin: 'Yape o Plin',
  contra_entrega: 'Pago contra entrega'
};

export default function CheckoutSuccess() {
  const location = useLocation();
  const payment = location.state ? location.state.payment : null;
  const shipping = location.state ? location.state.shipping : null;
  const method = location.state ? location.state.method : null;

  const chargedAmountText =
    payment && payment.amount
      ? payment.currency === APP_CONFIG.currency
        ? formatCurrency(Number(payment.amount))
        : `${payment.currency} ${payment.amount}`
      : null;

  return (
    <Card sx={{ borderRadius: 5, maxWidth: 760, mx: 'auto' }}>
      <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
        <Stack spacing={1.2}>
          <Chip label="Pedido confirmado" color="success" sx={{ alignSelf: 'flex-start' }} />
          <Typography variant="h4">Compra registrada con exito</Typography>
          <Typography color="text.secondary">
            Tu pedido ya fue recibido y estamos coordinando la preparacion y entrega.
          </Typography>

          {payment && (
            <Stack spacing={0.4}>
              <Typography variant="body2" color="text.secondary">
                {`Codigo de pedido: ${payment.orderId}`}
              </Typography>

              {method && (
                <Typography variant="body2" color="text.secondary">
                  {`Metodo de pago: ${metodoLabel[method] || method}`}
                </Typography>
              )}

              {payment.captureId && (
                <Typography variant="body2" color="text.secondary">
                  {`Operacion: ${payment.captureId}`}
                </Typography>
              )}

              {chargedAmountText && (
                <Typography variant="body2" color="text.secondary">
                  {`Monto: ${chargedAmountText}`}
                </Typography>
              )}

              {payment.status && (
                <Typography variant="body2" color="text.secondary">
                  {`Estado: ${payment.status}`}
                </Typography>
              )}

              {payment.payerEmail && (
                <Typography variant="body2" color="text.secondary">
                  {`Correo de pago: ${payment.payerEmail}`}
                </Typography>
              )}
            </Stack>
          )}

          {shipping && (
            <Typography variant="body2" color="text.secondary">
              {`Entrega para: ${shipping.fullName} - ${shipping.addressLine1}, ${shipping.city}`}
            </Typography>
          )}

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ pt: 0.5 }}>
            <Button component={RouterLink} to="/catalogo">
              Seguir comprando
            </Button>
            <Button component={RouterLink} to="/carrito" variant="ghost">
              Ver carrito
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
