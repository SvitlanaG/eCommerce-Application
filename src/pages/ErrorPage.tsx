import book from '../assets/img/book.png';
import btnStyles from '../styles/components/buttons.module.scss';
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
        <a
          className={`${btnStyles['button-large']} ${btnStyles['button-primary']}`}
          href="/"
        >
          go home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
