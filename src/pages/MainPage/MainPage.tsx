import { IoBookOutline } from 'react-icons/io5';
import styles from '@/pages/MainPage/MainPage.module.scss';
import Links from '@/components/Main/Links';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.msg}>
        <span>Hi there</span>
        <IoBookOutline data-testid="IoBookOutlineIcon" />
      </p>
      <Links />
    </div>
  );
};

export default MainPage;
