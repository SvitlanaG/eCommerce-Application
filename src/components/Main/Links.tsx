import { Link } from 'react-router-dom';
import styles from '../../pages/MainPage/MainPage.module.scss';

const Links = () => {
  if (localStorage.getItem('userAccessToken'))
    return (
      <Link
        to="/#"
        className={`${styles['button-large']} ${styles['button-primary']}`}
      >
        LogOut
      </Link>
    );

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
