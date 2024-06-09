import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaShoppingCart,
} from 'react-icons/fa';
import styles from '@/components/Header/Header.module.scss';

interface NavigationIconsProps {
  isLoggedIn: boolean;
  logOut: () => void;
}

const NavigationIcons = ({ isLoggedIn, logOut }: NavigationIconsProps) => {
  return (
    <nav className="flex flex-fd-row">
      {!isLoggedIn ? (
        <>
          <div className={styles.login}>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              <div
                className={clsx(
                  styles['button-icon'],
                  styles['button-icon-secondary'],
                )}
              >
                <FaUserPlus />
              </div>
              <p className="text-button text-button-small">Sign up</p>
            </NavLink>
          </div>
          <div className={styles.login}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              <div
                className={clsx(
                  styles['button-icon'],
                  styles['button-icon-secondary'],
                )}
              >
                <FaSignInAlt />
              </div>
              <p className="text-button text-button-small">Login</p>
            </NavLink>
          </div>
          <div className={styles.login}>
            <NavLink
              to="/basket"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              <div
                className={clsx(
                  styles['button-icon'],
                  styles['button-icon-primary'],
                )}
              >
                <FaShoppingCart />
              </div>
              <p className="text-button text-button-small">Basket</p>
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className={styles.login}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              <div
                className={clsx(
                  styles['button-icon'],
                  styles['button-icon-secondary'],
                )}
              >
                <FaUser />
              </div>
              <p className="text-button text-button-small">Profile</p>
            </NavLink>
          </div>
          <div className={styles.login} onClick={logOut}>
            <div
              className={clsx(
                styles['button-icon'],
                styles['button-icon-secondary'],
              )}
            >
              <FaSignOutAlt />
            </div>
            <p className="text-button text-button-small">LogOut</p>
          </div>
          <div className={styles.login}>
            <NavLink
              to="/basket"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              <div
                className={clsx(
                  styles['button-icon'],
                  styles['button-icon-primary'],
                )}
              >
                <FaShoppingCart />
              </div>
              <p className="text-button text-button-small">Basket</p>
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavigationIcons;
