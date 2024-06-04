import { Link } from 'react-router-dom';
import book from '../../assets/img/book.png';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={book} alt="orange book" />
      </div>
      <div className={styles.content}>
        <h2>404 Page Not Found</h2>
        <p className="text-body text-body-large">
          Sorry, the page you are looking for does not exist. Return to our home
          page to continue your journey.
        </p>
        <Link
          to="/"
          className={`${styles['button-large']} ${styles['button-primary']}`}
        >
          go home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
