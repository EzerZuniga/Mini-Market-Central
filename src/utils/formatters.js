import { APP_CONFIG } from '../config/env';

const currencyFormatter = new Intl.NumberFormat(APP_CONFIG.locale, {
  style: 'currency',
  currency: APP_CONFIG.currency,
  maximumFractionDigits: 2
});

export function formatCurrency(amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  return currencyFormatter.format(value);
}

export function formatShortDate(value) {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}
