import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import { useCart } from '../Cart/CartContext';
import { useFavorites } from '../FavoritePage/FavoriteContext';

import NavigationMenu from '../Navbar/NavigationMenu';
import Price from '../Price/Price';
import Alert from '../Alert/Alert';

import styles from './ProductDetails.module.css';

function ProductDetails({ products, supplements }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)); // Ищем продукт по id
  const [selectedDimension, setSelectedDimension] = useState('');
  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [price, setPrice] = useState(product?.price || 0); // Цена на основе размера
  const descriptionRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((item) => item.id === product.id);

  const { addToCart } = useCart();

  const addSizePrice = 20; // Стоимость увеличения размера

  useEffect(() => {
    if (descriptionRef.current && descriptionRef.current.scrollHeight > 90) {
      setIsTruncated(true);
    }
  }, []);

  useEffect(() => {
    if (product?.Dimensions?.length > 0) {
      setSelectedDimension(product.Dimensions[0]);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const basePrice = product.price;
    const dimensionIndex = product.Dimensions.indexOf(selectedDimension);
    const dimensionPrice = basePrice + dimensionIndex * addSizePrice;

    const supplementsPrice = selectedSupplements.reduce(
      (total, supplementName) => {
        const supplement = supplements.find((s) => s.name === supplementName);
        return total + (supplement?.price || 0);
      },
      0
    );

    setPrice(dimensionPrice + supplementsPrice);
  }, [selectedDimension, selectedSupplements, product, supplements]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDimensionChange = (dimension) => {
    setSelectedDimension(dimension);
  };

  const toggleSupplement = (supplementName) => {
    setSelectedSupplements((prev) =>
      prev.includes(supplementName)
        ? prev.filter((item) => item !== supplementName)
        : [...prev, supplementName]
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    const productToCart = {
      baseId: product.id,
      name: product.title,
      basePrice: product.price,
      dimension: selectedDimension,
      supplements: selectedSupplements.map((name) => {
        const supplement = supplements.find((s) => s.name === name);
        return { name, price: supplement?.price || 0 };
      }),
    };

    addToCart(productToCart);
    Alert.success('Товар добавлен в корзину!');
  };

  const isDrinkCategory = (category) => {
    const drinkCategories = [
      'кофе',
      'холодные напитки',
      'не кофе',
      'раф',
      'авторский кофе',
    ];
    return drinkCategories.includes(category.toLowerCase());
  };

  return (
    <>
      <div className={styles.detailsContainer}>
        <div className={styles.headContainer}>
          <img
            loading="lazy"
            src={product.image}
            className={styles.cardImage}
            alt={product.title}
          />
          <div className={styles.actionContainer}>
            <button
              className={styles.actionButton}
              onClick={() => window.history.back()}
            >
              <img src="/assets/icons/ArrowLeft.svg" alt="Back"></img>
            </button>
            <button
              className={styles.actionButton}
              onClick={() => toggleFavorite(product)}
            >
              {isFavorite ? (
                <img src="/assets/icons/noFavorite.svg" alt="noFavorite"></img>
              ) : (
                <img src="/assets/icons/heart.svg" alt="favorite"></img>
              )}
            </button>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.subtitle}>{product.category}</div>
            </div>
            {/* <div className={styles.ratingContainer}> // Рейтинг напитка выводить не надо(данный функционал под вопросом)
              <img
                loading="lazy"
                src="/assets/icons/Rating.svg"
                className={styles.ratingIcon}
                alt="Rating star"
              />
              <div className={styles.ratingValue}>{product.rating}</div>
            </div> */}
          </div>
        </div>
        <Price
          action="Добавить в корзину"
          price={price}
          onClick={handleAddToCart}
        />
        <div className={styles.descriptionContainer}>
          <h2 className={styles.descriptionTitle}>Описание</h2>
          <div
            className={`${styles.descriptionText} ${
              isExpanded ? styles.expanded : ''
            }`}
            ref={descriptionRef}
            style={{
              maxHeight: isExpanded ? 'none' : '90px',
              overflow: isExpanded ? 'visible' : 'hidden',
            }}
          >
            {product?.description || 'Описание недоступно'}
          </div>
          {isTruncated && (
            <span
              className={styles.readMore}
              onClick={toggleExpand}
              style={{ cursor: 'pointer', color: '#ff7f50' }}
            >
              {isExpanded ? 'Свернуть' : 'Читать далее'}
            </span>
          )}
        </div>

        {product.Dimensions?.length > 0 && (
          <div className={styles.sizeContainer}>
            <h2 className={styles.sizeTitle}>Размер</h2>
            <div className={styles.sizeOptions}>
              {product.Dimensions.map((dimension) => (
                <button
                  key={dimension}
                  className={`${styles.sizeOption} ${
                    selectedDimension === dimension ? styles.selected : ''
                  }`}
                  onClick={() => handleDimensionChange(dimension)}
                >
                  {dimension} {!isDrinkCategory(product.category) ? 'гр' : 'мл'}
                </button>
              ))}
            </div>
          </div>
        )}

        {isDrinkCategory(product.category) && supplements.length > 0 && (
          <div className={styles.supplementContainer}>
            <h2 className={styles.supplementTitle}>Дополнительно</h2>
            <div className={styles.supplementOptions}>
              {supplements.map((supplement) => (
                <button
                  key={supplement.name}
                  className={`${styles.supplementOption} ${
                    selectedSupplements.includes(supplement.name)
                      ? styles.selected
                      : ''
                  }`}
                  onClick={() => toggleSupplement(supplement.name)}
                >
                  {supplement.name}: <span>{supplement.price} РУБ.</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <NavigationMenu />
    </>
  );
}

export default ProductDetails;
