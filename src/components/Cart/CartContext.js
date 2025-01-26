import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  });

  const generateCartItemId = (baseId, dimension, supplements) => {
    const supplementsHash = supplements
      .map((s) => s.name)
      .sort()
      .join('-');
    return `${baseId}-${dimension}-${supplementsHash}`;
  };

  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product) => {
    const { baseId, name, dimension, supplements = [], basePrice } = product;

    const totalPrice =
      basePrice + (supplements?.reduce((sum, sup) => sum + sup.price, 0) || 0);

    const id = generateCartItemId(baseId, dimension, supplements);

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id,
            baseId,
            name,
            dimension,
            supplements,
            price: totalPrice,
            quantity: 1,
          },
        ];
      }
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
