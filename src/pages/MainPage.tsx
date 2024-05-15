import { Link } from 'react-router-dom';
import { IoBookOutline } from 'react-icons/io5';
import styles from './MainPage.module.scss';
import s from '../styles/components/buttons.module.scss';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.msg}>
        <span>Hi there</span>
        <IoBookOutline />
      </p>
      <Link
        to="/login"
        className={`${s['button-large']} ${s['button-primary']}`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`${s['button-large']} ${s['button-primary']}`}
      >
        Sign up
      </Link>
    </div>
  );
};

export default MainPage;
