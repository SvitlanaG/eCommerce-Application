import { FaSignInAlt } from 'react-icons/fa';
import styles from './Header.module.scss';
import btnStyles from '../../styles/components/buttons.module.scss';
import appStyles from '../../App.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${appStyles.container} flex flex-jc-space-between`}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-fw-wrap flex-fd-column">
          <h1 className={styles['product-name']}>Book Lounge Online</h1>
          <p
            className={`${styles['product-name-slogan']} text-subtitle text-subtitle-large`}
          >
            Between Codes and Coffee, Find Time for Books
          </p>
        </div>

        <div className={styles.login}>
          <a
            className={`${btnStyles['button-icon']} ${btnStyles['button-icon-secondary']}`}
            href="https://github.com/SvitlanaG/eCommerce-Application"
          >
            <FaSignInAlt />
          </a>
          <p className="text-button text-button-small">Login</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
