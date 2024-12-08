import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SearchBar.module.css';

function SearchBar({ products }) {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Фильтрация товаров при изменении запроса
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProducts([]); // Если поле пустое, очищаем результаты
    } else {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  const handleProductClick = (productId) => {
    navigate(`/menu/${productId}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form
        role="search"
        className={`${styles.searchForm} ${isFocused ? styles.expanded : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <img
          loading="lazy"
          src="/assets/icons/search.svg"
          className={styles.searchIcon}
          alt=""
        />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Найти напиток для себя"
          aria-label="Найти напиток для себя"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </form>

      {isFocused && query && (
        <div className={styles.dropdown}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className={styles.dropdownItem}
                onMouseDown={() => handleProductClick(product.id)} // onMouseDown вместо onClick для предотвращения потери фокуса
              >
                <span className={styles.productName}>{product.title}</span>
                <span className={styles.productPrice}>
                  {product.price} РУБ.
                </span>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>Товар не найден</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
