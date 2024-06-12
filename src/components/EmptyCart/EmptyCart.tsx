import styles from '@/pages/MainPage/MainPage.module.scss';
import Links from '@/components/Main/Links';
import backpack from '@/assets/img/backpack.png';

const EmptyCart = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={backpack} alt="orange backpack" />
      </div>
      <div className={styles.content}>
        <h3>Your basket is currently empty.</h3>
        <p className="text-body text-body-large">
          Explore our online selection and uncover a book that fuels your next
          great idea!
        </p>
        <Links />
      </div>
    </div>
  );
};

export default EmptyCart;
