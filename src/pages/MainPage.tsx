import { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import { getBooks } from '../services/getData';
import { Product } from '../interfaces';

const MainPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  useEffect(() => {
    getBooks().then((products) => setBooks(products));
  }, []);
  return (
    <div>
      <div className={styles['main-div']}>
        {books.map((book) => (
          <div className={styles.imageDiv}>
            <img
              src={book.assetSources[0].uri}
              alt="book"
              className={styles.img}
            />
            <p key={book.key} className={styles.bookName}>
              {book.name['en-GB']}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
