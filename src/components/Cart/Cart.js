import { useCart } from './CartContext';

import SearchBar from '../SearchBar/SearchBar';
import NavigationMenu from '../Navbar/NavigationMenu';
import Price from '../Price/Price';
import CartList from './CartList';

import styles from './Cart.module.css';

function Cart({ products }) {
  const { totalAmount, clearCart } = useCart();
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
      <Price action="Оформить заказ" price={totalAmount} />
    </div>
  );
}
export default Cart;
