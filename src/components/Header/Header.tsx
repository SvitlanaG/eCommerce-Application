import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { setLoggedIn } from '@/store/user/userSlice';
import { RootState } from '@/store/store';
import Toast from '@/helpers/Toast';
import styles from '@/components/Header/Header.module.scss';
import NavigationTabs from '@/components/NavigationTabs/NavigationTabs';
import NavigationIcons from '@/components/NavigationIcons/NavigationIcons';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const logOut = () => {
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('cartId');
    dispatch(setLoggedIn());
    navigate('/');
    Toast({ message: 'You have successfully logged out', status: 'success' });
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
            className={clsx(
              styles['product-name-slogan'],
              'text-subtitle',
              'text-subtitle-large',
            )}
          >
            Between Codes and Coffee, Find Time for Books
          </p>
        </div>
        <NavigationIcons isLoggedIn={isLoggedIn} logOut={logOut} />
      </div>
      <div className={styles.container}>
        <NavigationTabs />
      </div>
    </header>
  );
};

export default Header;
