import { useCart } from '../Cart/CartContext';
import { useNavigate } from 'react-router-dom'; // Для навигации на детальную страницу
import styles from './ProductCard.module.css';

function ProductCard({
  id,
  image,
  rating,
  title,
  category,
  price,
  dimensions = [],
  supplements = [],
  onClick,
}) {
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate(); // Инициализация функции навигации

  // Категории, в которых могут быть добавки
  const drinkCategories = [
    'кофе',
    'холодные напитки',
    'не кофе',
    'раф',
    'авторский кофе',
  ];

  const isInCart = cart.some(
    (item) =>
      item.name === title &&
      item.dimension === (dimensions[0] || '') &&
      JSON.stringify(item.supplements) === JSON.stringify(supplements)
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Проверяем, если категория требует добавки, открываем детальную страницу
    if (drinkCategories.includes(category.toLowerCase())) {
      navigate(`/menu/${id}`); // Переход на детальную страницу с ID продукта
      return;
    }

    // Если добавок не требуется, добавляем товар в корзину
    const selectedDimension = dimensions.length > 0 ? dimensions[0] : '';

    const productToCart = {
      baseId: id,
      name: title,
      dimension: selectedDimension,
      supplements,
      basePrice: price,
    };

    if (isInCart) {
      removeFromCart(productToCart.name);
    } else {
      addToCart(productToCart);
    }
  };

  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          loading="lazy"
          src={image}
          className={styles.productImage}
          alt={title}
        />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.productInfo}>
          <h2 className={styles.productTitle}>{title}</h2>
          <p className={styles.productDescription}>{category}</p>
        </div>
        <div className={styles.priceSection}>
          <div className={styles.price}>
            <span className={styles.priceAmount}>{price}</span>
            <span className={styles.priceCurrency}>РУБ.</span>
          </div>
          <button
            className={isInCart ? styles.correctButton : styles.addButton}
            aria-label={
              isInCart ? 'The product is already in the cart' : 'Add to cart'
            }
            tabIndex={0}
            onClick={handleAddToCart}
          >
            <img
              loading="lazy"
              src={
                isInCart
                  ? '/assets/icons/correct.svg'
                  : '/assets/icons/plus.svg'
              }
              className={styles.addIcon}
              alt={isInCart ? 'Correct' : 'Add'}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
