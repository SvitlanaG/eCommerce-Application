import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
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
        <a href="https://github.com/SvitlanaG/eCommerce-Application">
          <img src="/login.svg" alt="Login" />
        </a>
        <p className="text-button text-button-small">Login</p>
      </div>
    </header>
  );
};

export default Header;
