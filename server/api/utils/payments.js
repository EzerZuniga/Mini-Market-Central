const METODO_PAGO_LOCAL = {
  YAPE_PLIN: 'yape_plin',
  CONTRA_ENTREGA: 'contra_entrega'
};

function toSafeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeItems(rawItems) {
  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems
    .map((item) => {
      const quantity = Math.max(1, Math.floor(toSafeNumber(item.quantity, 1)));
      const unitAmount = Number(toSafeNumber(item.price, 0).toFixed(2));
      const name = String(item.name || 'Producto').trim().slice(0, 127);
      const sku = String(item.id || name).slice(0, 127);

      if (!unitAmount || !name) {
        return null;
      }

      return {
        name,
        sku,
        quantity,
        unitAmount
      };
    })
    .filter(Boolean);
}

function buildShipping(rawShipping) {
  if (!rawShipping || !rawShipping.addressLine1 || !rawShipping.city) {
    return null;
  }

  return {
    name: {
      full_name: String(rawShipping.fullName || 'Cliente Mini Market Central')
        .trim()
        .slice(0, 300)
    },
    address: {
      address_line_1: String(rawShipping.addressLine1).trim().slice(0, 300),
      address_line_2: String(rawShipping.addressLine2 || '').trim().slice(0, 300),
      admin_area_2: String(rawShipping.city).trim().slice(0, 120),
      admin_area_1: String(rawShipping.state || rawShipping.city).trim().slice(0, 120),
      postal_code: String(rawShipping.postalCode || '00000').trim().slice(0, 60),
      country_code: String(rawShipping.countryCode || 'PE').trim().slice(0, 2).toUpperCase()
    },
    phone: String(rawShipping.phone || '').trim(),
    email: String(rawShipping.email || '').trim()
  };
}

function createLocalOrderId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `PED-${date}-${random}`;
}

function methodStatus(method) {
  if (method === METODO_PAGO_LOCAL.YAPE_PLIN) {
    return 'PENDIENTE_VALIDACION_PAGO';
  }

  if (method === METODO_PAGO_LOCAL.CONTRA_ENTREGA) {
    return 'CONFIRMADO_CONTRA_ENTREGA';
  }

  return 'PENDIENTE';
}

module.exports = {
  METODO_PAGO_LOCAL,
  normalizeItems,
  buildShipping,
  createLocalOrderId,
  methodStatus
};
