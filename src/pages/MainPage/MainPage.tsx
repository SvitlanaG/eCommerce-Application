import { Link } from 'react-router-dom';
import { IoBookOutline } from 'react-icons/io5';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.msg}>
        <span>Hi there</span>
        <IoBookOutline />
      </p>
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
    </div>
  );
};

export default MainPage;
