import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('hazel_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }
  }, []);

  // Save cart to localStorage when changed
  useEffect(() => {
    localStorage.setItem('hazel_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cake, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cake.id === cake.id);
      if (existing) {
        return prev.map((item) =>
          item.cake.id === cake.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { cake, quantity: qty }];
    });
  };

  const removeFromCart = (cakeId) => {
    setCartItems((prev) => prev.filter((item) => item.cake.id !== cakeId));
  };

  const updateQuantity = (cakeId, qty) => {
    if (qty <= 0) {
      removeFromCart(cakeId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cake.id === cakeId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.cake.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
