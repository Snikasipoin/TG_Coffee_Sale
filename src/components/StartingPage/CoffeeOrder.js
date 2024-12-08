import { Link } from 'react-router-dom';

import styles from './CoffeeOrder.module.css';

function CoffeeOrder() {
  return (
    <section className={styles.container}>
      <article className={styles.content}>
        <h1 className={styles.title}>Ки5'ok! Вкусный кофе!</h1>
        <p className={styles.description}>
          Закажи невероятно вкусный кофе, в нашем удобном приложении. не выходя
          из Telegram.
        </p>
      </article>

      <Link
        to="/menu"
        className={styles.orderButton}
        aria-label="Оформить заказ"
      >
        Оформить заказ
      </Link>
    </section>
  );
}

export default CoffeeOrder;
