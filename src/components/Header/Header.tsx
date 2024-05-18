import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  // localStorage.setItem('token', '123');
  const token = localStorage.getItem('token') || '';

  const [isLogin, setIsLogin] = useState(token);

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLogin('');
    navigate('/');
    window.location.reload();
  };

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
        {!isLogin ? (
          <nav className="flex flex-fd-row">
            <div className={styles.login}>
              <NavLink to="/register" className={styles.link}>
                <div
                  className={`${styles['button-icon']} ${styles['button-icon-secondary']}`}
                >
                  <FaUserPlus />
                </div>
                <p className="text-button text-button-small">Sign up</p>
              </NavLink>
            </div>
            <div className={styles.login}>
              <NavLink to="/login" className={styles.link}>
                <div
                  className={`${styles['button-icon']} ${styles['button-icon-secondary']}`}
                >
                  <FaSignInAlt />
                </div>
                <p className="text-button text-button-small">Login</p>
              </NavLink>
            </div>
          </nav>
        ) : (
          <div className={styles.logOut} onClick={logOut}>
            <div
              className={`${styles['button-icon']} ${styles['button-icon-secondary']}`}
            >
              <FaSignOutAlt />
            </div>
            <p className="text-button text-button-small">LogOut</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
