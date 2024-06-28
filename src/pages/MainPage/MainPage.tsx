import styles from '@/pages/MainPage/MainPage.module.scss';
import Links from '@/components/Main/Links';
import books from '@/assets/img/books.png';

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={books} alt="orange books" />
      </div>
      <div className={styles.content}>
        <h2>Welcome to Book Lounge Online</h2>
        <p className="text-body text-body-large">
          Discover a world of books at our online bookstore, your one-stop
          destination for all your reading needs. Whether you are a lifelong
          bookworm or just starting to explore the joys of reading, we have
          something for everyone.
        </p>
        <h3>Start Your Reading Adventure Today!</h3>
        <p className="text-body text-body-large">
          Go to <strong>Catalog</strong> and explore our extensive collection of
          books. Find your next great read and experience the joy of reading
          with Book Lounge Online. Happy reading!
        </p>
        <p className={styles.code}>
          Get an exclusive 25% discount using promo code{' '}
          <span className={styles.span}>&quot;rss-promocode&quot;</span>
        </p>
        <Links />
      </div>
    </div>
  );
};

export default MainPage;
