import styles from './NavigationMenu.module.css';

function NavigationButton({ icon, isActive, label, onClick, badge }) {
  return (
    <button
      className={styles.navIcon}
      aria-label={label}
      tabIndex={0}
      onClick={onClick}
    >
      <img
        src={icon}
        alt=""
        loading="lazy"
        className={isActive ? styles.navIconActive : styles.navIcon}
      />
      {badge > 0 && <div className={styles.badge}>{badge}</div>}
    </button>
  );
}

export default NavigationButton;
