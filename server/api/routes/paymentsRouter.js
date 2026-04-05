const express = require('express');
const {
  METODO_PAGO_LOCAL,
  buildShipping,
  createLocalOrderId,
  methodStatus,
  normalizeItems
} = require('../utils/payments');

function createPaymentsRouter({ paypalService, currency }) {
  const router = express.Router();
  const pedidosLocales = new Map();

  router.get('/paypal/client-id', (_request, response) => {
    try {
      response.json(paypalService.getClientConfig());
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'No se pudo obtener configuracion de PayPal.'
      });
    }
  });

  router.post('/paypal/create-order', async (request, response) => {
    try {
      const items = normalizeItems(request.body ? request.body.items : null);
      const shipping = buildShipping(request.body ? request.body.shipping : null);

      if (!items.length) {
        response.status(400).json({ error: 'No hay productos validos para procesar.' });
        return;
      }

      const result = await paypalService.createOrder({ items, shipping });
      response.status(201).json(result);
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'No se pudo crear la orden en PayPal.',
        debugId: error.debugId || null
      });
    }
  });

  router.post('/paypal/capture-order', async (request, response) => {
    try {
      const orderId = String(
        request.body && request.body.orderId ? request.body.orderId : ''
      ).trim();

      const result = await paypalService.captureOrder(orderId);
      response.json(result);
    } catch (error) {
      response.status(error.status || 500).json({
        error: error.message || 'No se pudo capturar la orden de PayPal.',
        debugId: error.debugId || null
      });
    }
  });

  router.post('/local/create-order', (request, response) => {
    const items = normalizeItems(request.body ? request.body.items : null);
    const shipping = buildShipping(request.body ? request.body.shipping : null);
    const method = String(request.body && request.body.method ? request.body.method : '').trim();
    const operationCode = String(
      request.body && request.body.operationCode ? request.body.operationCode : ''
    )
      .trim()
      .toUpperCase();

    if (!items.length) {
      response.status(400).json({ error: 'No hay productos validos para procesar.' });
      return;
    }

    if (!shipping) {
      response.status(400).json({ error: 'Faltan datos de entrega.' });
      return;
    }

    const validMethods = [METODO_PAGO_LOCAL.YAPE_PLIN, METODO_PAGO_LOCAL.CONTRA_ENTREGA];
    if (!validMethods.includes(method)) {
      response.status(400).json({ error: 'Metodo de pago local no soportado.' });
      return;
    }

    if (method === METODO_PAGO_LOCAL.YAPE_PLIN && operationCode.length < 4) {
      response.status(400).json({
        error: 'Ingresa un codigo de operacion valido de Yape o Plin.'
      });
      return;
    }

    const total = items.reduce((sum, item) => sum + item.quantity * item.unitAmount, 0);
    const orderId = createLocalOrderId();
    const status = methodStatus(method);
    const createdAt = new Date().toISOString();

    const orderData = {
      orderId,
      status,
      method,
      amount: total.toFixed(2),
      currency,
      operationCode: method === METODO_PAGO_LOCAL.YAPE_PLIN ? operationCode : null,
      shipping,
      items,
      createdAt
    };

    pedidosLocales.set(orderId, orderData);

    response.status(201).json({
      orderId,
      status,
      method,
      amount: orderData.amount,
      currency,
      operationCode: orderData.operationCode,
      createdAt
    });
  });

  return router;
}

module.exports = {
  createPaymentsRouter
};
