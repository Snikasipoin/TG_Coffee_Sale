import CoffeeOrder from './CoffeeOrder';
import style from './StartingPage.module.css';

function StartingPage() {
  return (
    <div className={style.StartingPageContainer}>
      <CoffeeOrder />
    </div>
  );
}

export default StartingPage;
