import { Link } from 'react-router-dom';
import styles from '@/pages/MainPage/MainPage.module.scss';

const Links = () => {
  return (
    <Link
      to="/catalog"
      className={`${styles['button-large']} ${styles['button-primary']}`}
    >
      Catalog
    </Link>
  );
};

export default Links;
