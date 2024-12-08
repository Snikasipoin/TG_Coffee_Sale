import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

// Хук для использования контекста
export const useCart = () => {
  return useContext(CartContext);
};

// Провайдер корзины
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Генерация уникального ID для корзины
  const generateCartItemId = (baseId, dimension, supplements) => {
    const supplementsHash = supplements
      .map((s) => s.name)
      .sort()
      .join('-');
    return `${baseId}-${dimension}-${supplementsHash}`;
  };

  // Добавить товар в корзину
  const addToCart = (product) => {
    const { baseId, name, dimension, supplements = [], basePrice } = product;

    // Итоговая цена с добавками
    const totalPrice =
      basePrice + (supplements?.reduce((sum, sup) => sum + sup.price, 0) || 0);

    // Сформировать уникальный ID для товара
    const id = generateCartItemId(baseId, dimension, supplements);

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);

      if (existingProduct) {
        // Если товар уже в корзине, увеличиваем количество
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Если товара нет в корзине, добавляем новый элемент
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

  // Обновить количество товара
  const updateQuantity = (cartItemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) } // предотвратить отрицательное количество
          : item
      )
    );
  };

  // Удалить товар из корзины
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  // Очистить корзину
  const clearCart = () => {
    setCart([]);
  };

  // Вычисление общей суммы корзины
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
        totalAmount, // Общая сумма корзины
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
