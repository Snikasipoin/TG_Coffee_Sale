import styles from './Price.module.css';

function Price({ action, price, onClick }) {
  return (
    <div className={styles.priceContainer}>
      <div className={styles.priceWrapper}>
        <div className={styles.priceLabel}>Цена</div>
        <div className={styles.priceAmount}>
          <span className={styles.priceValue}>{price}</span>
          <span className={styles.priceCurrency}> РУБ.</span>
        </div>
      </div>
      <button
        className={styles.addButton}
        onClick={onClick}
        tabIndex={0}
        aria-label={action}
      >
        {action}
      </button>
    </div>
  );
}
export default Price;
