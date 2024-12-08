import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationMenu from '../Navbar/NavigationMenu';
import SearchBar from '../SearchBar/SearchBar';
import CategoryList from '../CategoryList/CategoryList';
import ProductCard from './ProductCard';

import styles from './MenuPage.module.css';

function MenuPage({ products }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleClick = (id) => {
    navigate(`/menu/${id}`);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className={styles.menuPageContainer}>
      <SearchBar products={products} />
      <CategoryList
        products={products}
        onCategorySelect={handleCategorySelect}
        activeCategory={selectedCategory}
      />
      <div className={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              rating={product.rating}
              title={product.title}
              category={product.category}
              price={product.price}
              dimensions={product.Dimensions || []}
              supplements={product.supplements || []}
              onClick={() => handleClick(product.id)}
            />
          ))
        ) : (
          <p>Нет товаров в данной категории</p>
        )}
      </div>
      <NavigationMenu />
    </div>
  );
}

export default MenuPage;
