export const APP_CONFIG = Object.freeze({
  appName: 'Mini Market Central',
  locale: 'es-PE',
  currency: 'PEN',
  supportPhone: '+51 999 000 111',
  supportEmail: 'soporte@minimarketcentral.pe',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || 'https://dummyjson.com',
  paymentsApiBaseUrl: import.meta.env.VITE_PAYMENTS_API_BASE_URL?.trim() || ''
});
