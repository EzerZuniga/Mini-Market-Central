import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'mini-market-central-cart';

const initialState = {
  items: [],
  lastAddedId: null,
  lastAddedAt: null
};

function getInitialState() {
  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return initialState;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed.items)) {
      return initialState;
    }

    return {
      items: parsed.items,
      lastAddedId: parsed.lastAddedId ?? null,
      lastAddedAt: parsed.lastAddedAt ?? null
    };
  } catch {
    return initialState;
  }
}

function normalizeQuantity(rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.max(1, Math.floor(value));
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const safeQuantity = normalizeQuantity(quantity);
      const existingItem = state.items.find((item) => item.id === product.id);
      const maxStock = Math.max(0, product.stock || 0);

      if (maxStock <= 0) {
        return state;
      }

      let items;
      if (existingItem) {
        items = state.items.map((item) => {
          if (item.id !== product.id) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(item.quantity + safeQuantity, maxStock)
          };
        });
      } else {
        items = [
          ...state.items,
          {
            ...product,
            quantity: Math.min(safeQuantity, maxStock)
          }
        ];
      }

      return {
        ...state,
        items,
        lastAddedId: product.id,
        lastAddedAt: Date.now()
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const safeQuantity = normalizeQuantity(quantity);

      const items = state.items
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(safeQuantity, Math.max(1, item.stock || 1))
          };
        })
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items
      };
    }

    case 'DECREASE_ITEM': {
      const { productId } = action.payload;
      const items = state.items
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items
      };
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        lastAddedId: null,
        lastAddedAt: null
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, getInitialState);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const subtotal = state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

    return {
      items: state.items,
      lastAddedId: state.lastAddedId,
      lastAddedAt: state.lastAddedAt,
      addItem: (product, quantity = 1) =>
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } }),
      updateItemQuantity: (productId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
      decreaseItem: (productId) =>
        dispatch({ type: 'DECREASE_ITEM', payload: { productId } }),
      removeItem: (productId) =>
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      totalItems,
      total: subtotal
    };
  }, [state.items, state.lastAddedId, state.lastAddedAt]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
}
