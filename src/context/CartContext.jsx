import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('foodkart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    localStorage.setItem('foodkart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code) => {
    const promoCodes = {
      'FOOD50': { type: 'percent', value: 0.5, max: 100 },
      'BOGO': { type: 'fixed', value: 0 }, // Placeholder for BOGO logic
      'FREE100': { type: 'fixed', value: 100, min: 500 },
      'TREAT': { type: 'percent', value: 0.2 }
    };

    const promo = promoCodes[code.toUpperCase()];
    if (promo) {
      if (promo.min && cartTotal < promo.min) {
        return { success: false, message: `Minimum order of ₹${promo.min} required.` };
      }
      setAppliedPromo({ ...promo, code: code.toUpperCase() });
      return { success: true, message: 'Promo code applied!' };
    }
    return { success: false, message: 'Invalid promo code.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discount = cartTotal * appliedPromo.value;
      if (appliedPromo.max) discount = Math.min(discount, appliedPromo.max);
    } else if (appliedPromo.type === 'fixed') {
      discount = appliedPromo.value;
    }
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, cartCount, applyPromoCode, removePromoCode, appliedPromo, discount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
