import { clsx } from 'clsx';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import { Product } from '@/types/products';

const Books = ({ books }: { books: Product[] }) => {
  return (
    <div className={styles['main-div']}>
      {books.map((book) => (
        <div key={book.key} className={styles.imageDiv}>
          <img
            src={book.assetSources[0].uri}
            alt="book"
            className={styles.img}
          />
          <p key={book.key} className={styles.bookName}>
            {book.name['en-GB']}
          </p>
          <button
            type="submit"
            className={clsx(styles['button-primary'], styles.btn)}
          >
            Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Books;
