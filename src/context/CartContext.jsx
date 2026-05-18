import { createContext, useState, useContext, useCallback, useMemo } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((productId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id: productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== productId);
      }

      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartItemsWithProducts = useCallback(() => {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }, [cartItems]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [cartItems]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemsWithProducts,
      getCartTotal,
      getCartItemsCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemsWithProducts,
      getCartTotal,
      getCartItemsCount,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}