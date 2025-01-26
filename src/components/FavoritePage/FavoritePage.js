import { useNavigate } from 'react-router-dom';

import { useFavorites } from '../FavoritePage/FavoriteContext';

import NavigationMenu from '../Navbar/NavigationMenu';
import ProductCard from '../MenuPage/ProductCard';

import styles from './FavoritePage.module.css';

function FavoritePAge() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const handleClick = (id) => {
    navigate(`/menu/${id}`);
  };
  return (
    <>
      <div className={styles.favoritePageContainer}>
        <div className={styles.titleContainer}>
          <img src="/assets/icons/heart.svg" alt="favorite"></img>
          <h2 className={styles.title}>Избранное</h2>
        </div>
        <div className={styles.productsContainer}>
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                rating={product.rating}
                title={product.title}
                category={product.category}
                price={product.price}
                dimensions={product.dimensions}
                supplements={product.supplements}
                onClick={() => handleClick(product.id)}
              />
            ))
          ) : (
            <p>Список любимых напитков еще пуст</p>
          )}
        </div>
      </div>
      <NavigationMenu />
    </>
  );
}

export default FavoritePAge;
