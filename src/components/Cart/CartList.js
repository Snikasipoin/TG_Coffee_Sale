import { useCart } from './CartContext';

import CartItem from './CartItem';
import styles from './CartList.module.css';

function CartList() {
  const { cart } = useCart();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CartItem
              key={index}
              quantity={item.quantity}
              name={item.name}
              additive={item.additive}
              price={item.price}
              supplements={item.supplements}
              id={item.id}
              dimension={item.dimension}
            />
          ))
        ) : (
          <div>Корзина пуста</div>
        )}
      </div>
    </div>
  );
}
export default CartList;
