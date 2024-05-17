import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} flex flex-jc-space-between`}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-fw-wrap flex-fd-column">
          <h1 className={styles['product-name']}>Book Lounge Online</h1>
          <p
            className={`${styles['product-name-slogan']} text-subtitle text-subtitle-large`}
          >
            Between Codes and Coffee, Find Time for Books
          </p>
        </div>
        <nav className="flex flex-fd-row">
          <div className={styles.login}>
            <NavLink
              to="/register"
              className={`${styles['button-icon']} ${styles['button-icon-secondary']}`}
            >
              <FaUserPlus />
            </NavLink>
            <p className="text-button text-button-small">Sign up</p>
          </div>
          <div className={styles.login}>
            <NavLink
              to="/login"
              className={`${styles['button-icon']} ${styles['button-icon-secondary']}`}
            >
              <FaSignInAlt />
            </NavLink>
            <p className="text-button text-button-small">Login</p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
