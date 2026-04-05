export function getInventoryStatus(stock) {
  if (stock <= 0) {
    return { variant: 'danger', label: 'Agotado' };
  }

  if (stock <= 8) {
    return { variant: 'warning', label: 'Stock limitado' };
  }

  return { variant: 'success', label: 'Disponible' };
}

export function isInStock(product) {
  return (product?.stock || 0) > 0;
}

export function canAddToCart(product, requestedQuantity) {
  return (product?.stock || 0) >= requestedQuantity;
}
