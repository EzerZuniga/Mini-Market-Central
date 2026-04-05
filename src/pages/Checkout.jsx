import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config/env';
import {
  capturePayPalOrder,
  createLocalOrder,
  createPayPalOrder,
  getPayPalClientConfig
} from '../services/paymentService';
import { formatCurrency } from '../utils/formatters';

const initialShipping = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: 'Lima',
  state: 'Lima',
  postalCode: '15000',
  countryCode: 'PE'
};

const PAYMENT_METHOD = {
  PAYPAL: 'paypal',
  YAPE_PLIN: 'yape_plin',
  CASH_ON_DELIVERY: 'contra_entrega'
};

const paymentMethodOptions = [
  {
    value: PAYMENT_METHOD.PAYPAL,
    title: 'Tarjeta o PayPal',
    description: 'Pago en linea inmediato con confirmacion automatica.'
  },
  {
    value: PAYMENT_METHOD.YAPE_PLIN,
    title: 'Yape o Plin',
    description: 'Transferencia local en Peru con codigo de operacion.'
  },
  {
    value: PAYMENT_METHOD.CASH_ON_DELIVERY,
    title: 'Pago contra entrega',
    description: 'Paga en efectivo o tarjeta al recibir tu pedido.'
  }
];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState(initialShipping);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.PAYPAL);
  const [operationCode, setOperationCode] = useState('');
  const [clientConfig, setClientConfig] = useState(null);
  const [loadingClientConfig, setLoadingClientConfig] = useState(false);
  const [paypalError, setPaypalError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [submittingLocalOrder, setSubmittingLocalOrder] = useState(false);

  const hasItems = items.length > 0;

  useEffect(() => {
    if (paymentMethod !== PAYMENT_METHOD.PAYPAL || clientConfig || loadingClientConfig) {
      return;
    }

    let active = true;

    const loadClientConfig = async () => {
      setLoadingClientConfig(true);
      setPaypalError('');

      try {
        const config = await getPayPalClientConfig();
        if (!active) {
          return;
        }
        setClientConfig(config);
      } catch (error) {
        if (!active) {
          return;
        }
        setPaypalError(error.message);
      } finally {
        if (active) {
          setLoadingClientConfig(false);
        }
      }
    };

    loadClientConfig();

    return () => {
      active = false;
    };
  }, [paymentMethod, clientConfig, loadingClientConfig]);

  const paymentItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
    [items]
  );

  const orderSummary = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        label: `${item.name} x${item.quantity}`,
        amount: formatCurrency(item.price * item.quantity)
      })),
    [items]
  );

  const isShippingValid = Boolean(
    shipping.fullName.trim() &&
      shipping.email.trim() &&
      shipping.phone.trim() &&
      shipping.addressLine1.trim() &&
      shipping.city.trim()
  );

  const canSubmitYapePlin = isShippingValid && operationCode.trim().length >= 4;

  const submitLocalOrder = async (method) => {
    setCheckoutError('');
    setPaymentMessage('');
    setSubmittingLocalOrder(true);

    try {
      const result = await createLocalOrder({
        items: paymentItems,
        shipping,
        method,
        operationCode: method === PAYMENT_METHOD.YAPE_PLIN ? operationCode.trim() : ''
      });

      clearCart();
      navigate('/pago/exito', {
        replace: true,
        state: {
          payment: result,
          shipping,
          method
        }
      });
    } catch (error) {
      setCheckoutError(error.message || 'No se pudo registrar el pedido.');
    } finally {
      setSubmittingLocalOrder(false);
    }
  };

  if (!hasItems) {
    return <Navigate to="/carrito" replace />;
  }

  return (
    <Stack spacing={1.4}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4">Pago seguro en Peru</Typography>
          <Typography color="text.secondary">
            Completa tus datos y elige tu metodo de pago para finalizar el pedido.
          </Typography>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 1.3,
          gridTemplateColumns: { xs: '1fr', xl: '1.05fr minmax(320px, 400px)' },
          alignItems: 'start'
        }}
      >
        <Stack spacing={1.1}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={1.1}>
                <Typography variant="h6">Datos de entrega</Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
                  }}
                >
                  <TextField
                    label="Nombre completo"
                    value={shipping.fullName}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, fullName: event.target.value }))
                    }
                    required
                  />
                  <TextField
                    label="Telefono"
                    value={shipping.phone}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, phone: event.target.value }))
                    }
                    required
                  />
                  <TextField
                    label="Correo"
                    type="email"
                    value={shipping.email}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, email: event.target.value }))
                    }
                    required
                    sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                  />
                  <TextField
                    label="Direccion"
                    value={shipping.addressLine1}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, addressLine1: event.target.value }))
                    }
                    required
                    sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                  />
                  <TextField
                    label="Referencia (opcional)"
                    value={shipping.addressLine2}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, addressLine2: event.target.value }))
                    }
                    sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
                  />
                  <TextField
                    label="Ciudad"
                    value={shipping.city}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, city: event.target.value }))
                    }
                    required
                  />
                  <TextField
                    label="Departamento"
                    value={shipping.state}
                    onChange={(event) =>
                      setShipping((current) => ({ ...current, state: event.target.value }))
                    }
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack spacing={1.1}>
                <Typography variant="h6">Metodo de pago</Typography>

                <FormControl>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(event) => {
                      setPaymentMethod(event.target.value);
                      setCheckoutError('');
                      setPaymentMessage('');
                    }}
                  >
                    <Stack spacing={0.7}>
                      {paymentMethodOptions.map((option) => (
                        <Box
                          key={option.value}
                          sx={{
                            border: '1px solid',
                            borderColor:
                              paymentMethod === option.value ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            px: 1,
                            py: 0.8
                          }}
                        >
                          <FormControlLabel
                            value={option.value}
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography variant="subtitle2">{option.title}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {option.description}
                                </Typography>
                              </Box>
                            }
                            sx={{ m: 0, alignItems: 'flex-start' }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {!isShippingValid && (
                  <Alert severity="info">
                    Completa los datos de entrega para habilitar el pago.
                  </Alert>
                )}

                {paypalError && paymentMethod === PAYMENT_METHOD.PAYPAL && (
                  <Alert severity="error">{paypalError}</Alert>
                )}

                {checkoutError && <Alert severity="error">{checkoutError}</Alert>}

                {paymentMessage && <Alert severity="warning">{paymentMessage}</Alert>}

                {paymentMethod === PAYMENT_METHOD.PAYPAL && (
                  <>
                    {loadingClientConfig && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CircularProgress size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Conectando con PayPal...
                        </Typography>
                      </Stack>
                    )}

                    {!loadingClientConfig && clientConfig && isShippingValid && (
                      <PayPalScriptProvider
                        options={{
                          clientId: clientConfig.clientId,
                          currency: clientConfig.currency || APP_CONFIG.currency,
                          intent: 'capture'
                        }}
                      >
                        <PayPalButtons
                          style={{ layout: 'vertical', shape: 'pill', label: 'paypal' }}
                          forceReRender={[total, clientConfig.currency]}
                          createOrder={async () => {
                            setCheckoutError('');
                            setPaymentMessage('');
                            const order = await createPayPalOrder({
                              items: paymentItems,
                              shipping
                            });
                            return order.orderId;
                          }}
                          onApprove={async (data) => {
                            const result = await capturePayPalOrder(data.orderID);
                            clearCart();
                            navigate('/pago/exito', {
                              replace: true,
                              state: {
                                payment: result,
                                shipping,
                                method: PAYMENT_METHOD.PAYPAL
                              }
                            });
                          }}
                          onCancel={() => {
                            setPaymentMessage('Pago cancelado. Puedes intentarlo nuevamente.');
                          }}
                          onError={(error) => {
                            setCheckoutError(error.message || 'No se pudo completar el pago.');
                          }}
                        />
                      </PayPalScriptProvider>
                    )}
                  </>
                )}

                {paymentMethod === PAYMENT_METHOD.YAPE_PLIN && (
                  <Stack spacing={1}>
                    <Alert severity="info">
                      Transfiere por Yape o Plin al numero <strong>{APP_CONFIG.supportPhone}</strong> y registra el codigo de operacion.
                    </Alert>
                    <TextField
                      label="Codigo de operacion"
                      value={operationCode}
                      onChange={(event) => setOperationCode(event.target.value)}
                      placeholder="Ejemplo: YP12345678"
                    />
                    <Button
                      onClick={() => submitLocalOrder(PAYMENT_METHOD.YAPE_PLIN)}
                      disabled={!canSubmitYapePlin || submittingLocalOrder}
                    >
                      {submittingLocalOrder ? 'Registrando pago...' : 'Registrar pago Yape/Plin'}
                    </Button>
                  </Stack>
                )}

                {paymentMethod === PAYMENT_METHOD.CASH_ON_DELIVERY && (
                  <Stack spacing={1}>
                    <Alert severity="info">
                      Confirmaremos tu pedido y podras pagar al recibirlo en tu direccion.
                    </Alert>
                    <Button
                      onClick={() => submitLocalOrder(PAYMENT_METHOD.CASH_ON_DELIVERY)}
                      disabled={!isShippingValid || submittingLocalOrder}
                    >
                      {submittingLocalOrder ? 'Confirmando...' : 'Confirmar pedido contra entrega'}
                    </Button>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={{ borderRadius: 4, position: { xl: 'sticky' }, top: { xl: 98 } }}>
          <CardContent>
            <Stack spacing={0.9}>
              <Typography variant="h5">Resumen del pedido</Typography>
              {orderSummary.map((line) => (
                <Stack key={line.id} direction="row" justifyContent="space-between" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    {line.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {line.amount}
                  </Typography>
                </Stack>
              ))}

              <Divider sx={{ my: 0.5 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="h5" color="primary.main">
                  {formatCurrency(total)}
                </Typography>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                Operamos con metodos de pago en Peru y confirmacion segura del pedido.
              </Typography>

              <Button component={RouterLink} to="/carrito" variant="ghost">
                Volver al carrito
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
