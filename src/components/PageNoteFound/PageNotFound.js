import { Link } from 'react-router-dom';

import styles from './PageNotFound.module.css';

function PageNotFound() {
  return (
    <div className={styles.PageNotFoundContainer}>
      <div className={styles.blurContainer}>
        <h1 className={styles.PageNotFoundHeading}>404</h1>
        <p className={styles.PageNotFoundText}>Страница не найдена</p>
        <Link
          to="/menu"
          className={styles.orderButton}
          aria-label="Вернуться на главный экран"
        >
          Главный экран
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
