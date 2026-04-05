import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProducts, getFallbackProducts } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('remote');
  const [requestId, setRequestId] = useState(0);

  const loadProducts = useCallback(async () => {
    const data = await fetchProducts();
    if (!data.length) {
      throw new Error('No se encontraron productos en el servicio.');
    }
    return data;
  }, []);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await loadProducts();
        if (!active) {
          return;
        }
        setProducts(data);
        setSource('remote');
      } catch (requestError) {
        if (!active) {
          return;
        }
        setProducts(getFallbackProducts());
        setSource('fallback');
        setError(requestError.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [loadProducts, requestId]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique).sort((a, b) => a.localeCompare(b, 'es'));
  }, [products]);

  const reload = useCallback(() => {
    setRequestId((current) => current + 1);
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    source,
    reload
  };
}
