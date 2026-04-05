export const fallbackProducts = [
  {
    id: 'abarrotes-001',
    name: 'Arroz Extra Costeño 5kg',
    description: 'Arroz de grano largo ideal para consumo diario familiar.',
    price: 24.9,
    stock: 40,
    category: 'Abarrotes',
    brand: 'Costeño',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'abarrotes-002',
    name: 'Azúcar Rubia 1kg',
    description: 'Azúcar rubia de caña para cocina y repostería.',
    price: 4.8,
    stock: 60,
    category: 'Abarrotes',
    brand: 'Casa Grande',
    rating: 4.3,
    image:
      'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'bebidas-001',
    name: 'Agua Mineral 625ml',
    description: 'Botella de agua mineral sin gas, ideal para llevar.',
    price: 2.5,
    stock: 120,
    category: 'Bebidas',
    brand: 'San Luis',
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1564419320408-38e24e03809d?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'bebidas-002',
    name: 'Gaseosa Cola 3L',
    description: 'Bebida gaseosa familiar para reuniones y celebraciones.',
    price: 10.9,
    stock: 28,
    category: 'Bebidas',
    brand: 'Inca Kola',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'lacteos-001',
    name: 'Leche Entera 1L',
    description: 'Leche UHT entera para consumo diario.',
    price: 4.6,
    stock: 34,
    category: 'Lácteos',
    brand: 'Gloria',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'lacteos-002',
    name: 'Yogurt Fresa 1kg',
    description: 'Yogurt sabor fresa para desayuno o snack.',
    price: 8.9,
    stock: 18,
    category: 'Lácteos',
    brand: 'Laive',
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1571212515416-fca9f17f6a98?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'limpieza-001',
    name: 'Detergente Líquido 2L',
    description: 'Detergente para lavado de ropa con fórmula concentrada.',
    price: 18.9,
    stock: 22,
    category: 'Limpieza',
    brand: 'Bolívar',
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'limpieza-002',
    name: 'Lavavajilla Limón 900ml',
    description: 'Lava platos con aroma limón y alto rendimiento.',
    price: 7.2,
    stock: 16,
    category: 'Limpieza',
    brand: 'Sapolio',
    rating: 4.1,
    image:
      'https://images.unsplash.com/photo-1584473457409-ce8fd5b0f4f4?auto=format&fit=crop&w=1000&q=80'
  }
].map((product) => ({
  ...product,
  inStock: product.stock > 0
}));
