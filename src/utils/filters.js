function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

export function filterByCategory(products, category) {
  const normalizedCategory = normalizeText(category);

  if (!normalizedCategory || normalizedCategory === 'all') {
    return products;
  }

  return products.filter(
    (product) => normalizeText(product.category) === normalizedCategory
  );
}

export function searchProducts(products, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const haystack = `${product.name} ${product.description} ${product.brand} ${product.category}`;
    return normalizeText(haystack).includes(normalizedQuery);
  });
}

export function filterInStock(products) {
  return products.filter((product) => (product.stock || 0) > 0);
}

export function filterByPrice(products, minPrice, maxPrice) {
  const lowerLimit = Number.isFinite(minPrice) ? minPrice : 0;
  const upperLimit = Number.isFinite(maxPrice) ? maxPrice : Number.POSITIVE_INFINITY;

  return products.filter(
    (product) => product.price >= lowerLimit && product.price <= upperLimit
  );
}

export function applyProductFilters(
  products,
  { category = 'all', query = '', onlyInStock = false }
) {
  let filtered = filterByCategory(products, category);
  filtered = searchProducts(filtered, query);

  if (onlyInStock) {
    filtered = filterInStock(filtered);
  }

  return filtered;
}
