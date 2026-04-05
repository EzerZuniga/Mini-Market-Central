import { fallbackProducts } from '../data/fallbackProducts';
import { httpClient } from './httpClient';

const CATEGORY_LABELS = {
  groceries: 'Abarrotes',
  beverages: 'Bebidas',
  dairy: 'Lacteos',
  kitchen_accessories: 'Hogar',
  skincare: 'Cuidado Personal',
  fragrances: 'Cuidado Personal',
  beauty: 'Cuidado Personal'
};

const imageFallback =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80';

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeCategory(rawCategory) {
  if (!rawCategory) {
    return 'General';
  }

  const normalized = String(rawCategory).trim().toLowerCase().replace(/[\s-]+/g, '_');
  return CATEGORY_LABELS[normalized] || String(rawCategory);
}

function mapApiProduct(product) {
  if (!product) {
    return null;
  }

  const stock = Math.max(0, Math.floor(toNumber(product.stock, 0)));
  const price = Number(toNumber(product.price, 0).toFixed(2));

  return {
    id: String(product.id),
    name: product.title || product.name || 'Producto sin nombre',
    description: product.description || 'Sin descripcion disponible.',
    price,
    stock,
    category: normalizeCategory(product.category),
    brand: product.brand || 'Marca local',
    rating: toNumber(product.rating, 0),
    image: product.thumbnail || product.image || imageFallback,
    inStock: stock > 0
  };
}

export async function fetchProducts(limit = 100) {
  const response = await httpClient.get('/products', {
    params: { limit }
  });

  const products = Array.isArray(response.data?.products) ? response.data.products : [];
  return products.map(mapApiProduct).filter(Boolean);
}

export async function fetchProductById(productId) {
  const response = await httpClient.get(`/products/${productId}`);
  return mapApiProduct(response.data);
}

export function getFallbackProducts() {
  return fallbackProducts;
}

export function getFallbackProductById(productId) {
  return fallbackProducts.find((product) => String(product.id) === String(productId)) || null;
}
