import { Link } from 'react-router-dom';
import styles from '@/pages/MainPage/MainPage.module.scss';

const Links = () => {
  return (
    <>
      <Link
        to="/login"
        className={`${styles['button-large']} ${styles['button-primary']}`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`${styles['button-large']} ${styles['button-primary']}`}
      >
        Sign up
      </Link>
    </>
  );
};

export default Links;
