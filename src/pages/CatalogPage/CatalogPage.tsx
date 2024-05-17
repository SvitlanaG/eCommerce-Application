import { useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { getBooks } from '../../services/getData';
import { Product } from '../../interfaces';

const CatalogPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  useEffect(() => {
    getBooks().then((products) => setBooks(products));
  }, []);
  return (
    <div className={styles.container}>
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
              className={`${styles['button-primary']} ${styles.btn}`}
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;