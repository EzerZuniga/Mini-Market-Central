function createPaypalService({ env, clientId, clientSecret, currency }) {
  const paypalEnv = (env || 'sandbox').toLowerCase();
  const apiBase =
    paypalEnv === 'production'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

  async function getAccessToken() {
    if (!clientId || !clientSecret) {
      throw new Error('Configura PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET en el servidor.');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${apiBase}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();

    if (!response.ok || !data.access_token) {
      const details = data.error_description || data.error || 'No se pudo autenticar con PayPal';
      throw new Error(details);
    }

    return data.access_token;
  }

  async function request(path, { method = 'GET', body } = {}) {
    const accessToken = await getAccessToken();

    const response = await fetch(`${apiBase}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();

    if (!response.ok) {
      const details = data && data.details && data.details[0] && data.details[0].description;
      const message = details || data.message || 'Error en la API de PayPal';
      const error = new Error(message);
      error.status = response.status;
      error.debugId = data ? data.debug_id : null;
      throw error;
    }

    return data;
  }

  function getClientConfig() {
    if (!clientId) {
      const error = new Error('PAYPAL_CLIENT_ID no configurado en el servidor.');
      error.status = 500;
      throw error;
    }

    return {
      clientId,
      currency,
      env: paypalEnv
    };
  }

  async function createOrder({ items, shipping }) {
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitAmount, 0);

    if (total <= 0) {
      const error = new Error('El total del pedido es invalido.');
      error.status = 400;
      throw error;
    }

    const totalAsText = total.toFixed(2);

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: `MMC-${Date.now()}`,
          description: 'Pedido Mini Market Central',
          amount: {
            currency_code: currency,
            value: totalAsText,
            breakdown: {
              item_total: {
                currency_code: currency,
                value: totalAsText
              }
            }
          },
          items: items.map((item) => ({
            name: item.name,
            sku: item.sku,
            quantity: String(item.quantity),
            unit_amount: {
              currency_code: currency,
              value: item.unitAmount.toFixed(2)
            }
          })),
          shipping: shipping || undefined
        }
      ],
      application_context: {
        brand_name: 'Mini Market Central',
        user_action: 'PAY_NOW',
        shipping_preference: shipping ? 'SET_PROVIDED_ADDRESS' : 'NO_SHIPPING'
      }
    };

    const order = await request('/v2/checkout/orders', {
      method: 'POST',
      body: orderPayload
    });

    return {
      orderId: order.id,
      status: order.status,
      method: 'paypal'
    };
  }

  async function captureOrder(orderId) {
    if (!orderId) {
      const error = new Error('orderId es requerido.');
      error.status = 400;
      throw error;
    }

    const capture = await request(`/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      body: {}
    });

    const captureDetails =
      capture && capture.purchase_units && capture.purchase_units[0]
        ? capture.purchase_units[0].payments && capture.purchase_units[0].payments.captures
          ? capture.purchase_units[0].payments.captures[0]
          : null
        : null;

    return {
      orderId: capture.id,
      status: capture.status,
      method: 'paypal',
      captureId: captureDetails ? captureDetails.id : null,
      amount: captureDetails && captureDetails.amount ? captureDetails.amount.value : null,
      currency:
        captureDetails && captureDetails.amount ? captureDetails.amount.currency_code : currency,
      payerEmail: capture && capture.payer ? capture.payer.email_address : null,
      payerName:
        capture && capture.payer && capture.payer.name
          ? `${capture.payer.name.given_name || ''} ${capture.payer.name.surname || ''}`.trim()
          : null
    };
  }

  return {
    paypalEnv,
    getClientConfig,
    createOrder,
    captureOrder
  };
}

module.exports = {
  createPaypalService
};
