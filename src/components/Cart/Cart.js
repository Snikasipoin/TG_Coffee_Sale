import { useCart } from './CartContext';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';
import NavigationMenu from '../Navbar/NavigationMenu';
import Price from '../Price/Price';
import CartList from './CartList';
import Alert from '../Alert/Alert';

import styles from './Cart.module.css';

function Cart({ products }) {
  const { cart, totalAmount, clearCart } = useCart();

  const handleOrderSubmit = async () => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          id: item.baseId,
          name: item.name,
          dimension: item.dimension,
          supplements: item.supplements.map((s) => s.name),
          unitPrice: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
        totalAmount,
      };

      const response = await axios.post(
        'https://your-api-url.com/orders',
        orderData
      );

      if (response.status === 200 || response.status === 201) {
        Alert.success('Заказ успешно оформлен!');
        clearCart();
      } else {
        Alert.warn('Ошибка при оформлении заказа. Попробуйте снова.');
      }
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      Alert.warn('Произошла ошибка. Проверьте соединение с сервером.');
    }
  };

  return (
    <div className={styles.cartContainer}>
      <SearchBar products={products} />
      <div className={styles.cartlistContainer}>
        <div className={styles.clearButtonContainer}>
          <button className={styles.clearButton} onClick={() => clearCart()}>
            Очистить
          </button>
        </div>
        <CartList />
      </div>
      <NavigationMenu />
      <Price
        action="Оформить заказ"
        price={totalAmount}
        onClick={handleOrderSubmit}
      />
    </div>
  );
}

export default Cart;
