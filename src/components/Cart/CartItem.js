import { useCart } from './CartContext';

import styles from './CartItem.module.css';

function CartItem({ quantity, id, name, price, supplements, dimension }) {
  const { removeFromCart, updateQuantity } = useCart();

  const totalPrice = price * quantity;
  return (
    <div className={styles.cartItem}>
      <div className={styles.actions}>
        <button
          className={styles.quantityButton}
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          +
        </button>
        <button
          className={styles.quantityButton}
          onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
        >
          -
        </button>
      </div>

      <div className={styles.quantity}>{quantity} шт</div>

      <div className={styles.itemDetails}>
        <div className={styles.itemName}>
          {name} <div>({dimension} мл)</div>
        </div>
        {supplements && supplements.length > 0 && (
          <div className={styles.itemAdditive}>
            {supplements.map((additive) => additive.name + ' ')}
          </div>
        )}
      </div>

      <div className={styles.price}>
        <span className={styles.priceAmount}>{totalPrice}</span>
        <span className={styles.priceCurrency}> РУБ.</span>
      </div>

      <img
        loading="lazy"
        src="/assets/icons/dellete.svg"
        className={styles.deleteIcon}
        alt="Remove item"
        tabIndex="0"
        role="button"
        onClick={() => removeFromCart(id)}
      />
    </div>
  );
}

export default CartItem;
