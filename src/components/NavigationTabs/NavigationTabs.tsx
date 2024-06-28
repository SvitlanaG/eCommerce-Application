import { NavLink } from 'react-router-dom';
import styles from '@/components/NavigationTabs/NavigationTabs.module.scss';

const NavigationTabs = () => {
  return (
    <nav className={styles.navtabs}>
      <div className={styles.navtab}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <p className="text-button text-button-large">Home</p>
        </NavLink>
      </div>
      <div className={styles.navtab}>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <p className="text-button text-button-large">Catalog</p>
        </NavLink>
      </div>
      <div className={styles.navtab}>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <p className="text-button text-button-large">About Us</p>
        </NavLink>
      </div>
    </nav>
  );
};
export default NavigationTabs;
