const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const { createHealthRouter } = require('./api/routes/healthRouter');
const { createPaymentsRouter } = require('./api/routes/paymentsRouter');
const { createPaypalService } = require('./api/services/paypalService');

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);
const paypalEnv = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase();
const paypalClientId = process.env.PAYPAL_CLIENT_ID || '';
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
const defaultCurrency = (process.env.PAYPAL_CURRENCY || 'PEN').toUpperCase();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

const paypalService = createPaypalService({
  env: paypalEnv,
  clientId: paypalClientId,
  clientSecret: paypalClientSecret,
  currency: defaultCurrency
});

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));

app.use(
  '/api/payments',
  createPaymentsRouter({
    paypalService,
    currency: defaultCurrency
  })
);

app.use(
  '/api/health',
  createHealthRouter({
    environment: paypalEnv
  })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor de pagos activo en http://localhost:${port}`);
});
