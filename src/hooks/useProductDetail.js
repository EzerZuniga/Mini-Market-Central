import { useEffect, useState } from 'react';
import {
  fetchProductById,
  getFallbackProductById
} from '../services/productService';

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('remote');

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setProduct(null);
      return;
    }

    let active = true;

    const loadProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchProductById(productId);
        if (!active) {
          return;
        }
        setProduct(data);
        setSource('remote');
      } catch (requestError) {
        const fallbackProduct = getFallbackProductById(productId);
        if (!active) {
          return;
        }

        setProduct(fallbackProduct);
        setSource('fallback');
        setError(requestError.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  return { product, loading, error, source };
}
