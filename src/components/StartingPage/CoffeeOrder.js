import { Link } from 'react-router-dom';

import styles from './CoffeeOrder.module.css';

function CoffeeOrder() {
  // Объект пользователя
  // window.Telegram.WebApp.initDataUnsafe.user = {
  //    id,
  //    first_name,
  //    last_name,
  //    is_premium,
  //    photo_url,
  //    username,
  // }
  return (
    <section className={styles.container}>
      <article className={styles.content}>
        <h1 className={styles.title}>Ки5'ok! Вкусный кофе!</h1>
        <p className={styles.description}>
          Привет {window.Telegram.WebApp?.initDataUnsafe?.user?.first_name}! Закажи невероятно вкусный кофе, в нашем удобном приложении. не выходя
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
