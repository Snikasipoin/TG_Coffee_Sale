import styles from './NavigationMenu.module.css';

function NavigationButton({ icon, isActive, label, onClick }) {
  return (
    <button
      className={isActive ? styles.navIconActive : styles.navIcon}
      aria-label={label}
      tabIndex={0}
      onClick={onClick}
    >
      <img src={icon} alt="" loading="lazy" />
    </button>
  );
}

export default NavigationButton;
