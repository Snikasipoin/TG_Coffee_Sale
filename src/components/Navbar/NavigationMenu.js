import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

import NavigationButton from './NavigationButton';

import styles from './NavigationMenu.module.css';

const navigationItems = [
  {
    icon: './assets/icons/heart.svg',
    label: 'Favorites',
    path: '/favorites',
  },
  {
    icon: './assets/icons/home.svg',
    label: 'Home',
    path: '/menu',
  },
  {
    icon: './assets/icons/basket.svg',
    label: 'Basket',
    path: '/cart',
  },
];

function NavigationMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCart();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <nav className={styles.navigationBar}>
      {navigationItems.map((item, index) => (
        <NavigationButton
          key={index}
          icon={item.icon}
          label={item.label}
          isActive={location.pathname === item.path}
          onClick={() => handleNavigation(item.path)}
          badge={item.label === 'Basket' ? totalQuantity : 0}
        />
      ))}
    </nav>
  );
}
export default NavigationMenu;
