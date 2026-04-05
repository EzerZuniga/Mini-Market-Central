import { APP_CONFIG } from '../config/env';

function buildUrl(path) {
  if (!APP_CONFIG.paymentsApiBaseUrl) {
    return path;
  }

  return `${APP_CONFIG.paymentsApiBaseUrl}${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || 'No se pudo completar el pago.');
  }

  return payload;
}

export function getPayPalClientConfig() {
  return request('/api/payments/paypal/client-id');
}

export function createPayPalOrder({ items, shipping }) {
  return request('/api/payments/paypal/create-order', {
    method: 'POST',
    body: JSON.stringify({ items, shipping })
  });
}

export function capturePayPalOrder(orderId) {
  return request('/api/payments/paypal/capture-order', {
    method: 'POST',
    body: JSON.stringify({ orderId })
  });
}

export function createLocalOrder({ items, shipping, method, operationCode }) {
  return request('/api/payments/local/create-order', {
    method: 'POST',
    body: JSON.stringify({ items, shipping, method, operationCode })
  });
}
