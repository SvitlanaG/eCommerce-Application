import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Category } from '@/types/categories';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import { Product } from '@/types/products';
import Up from '@/assets/icons/up.svg';
import Down from '@/assets/icons/down.svg';
import getCategories from '@/services/catalog';

const CatalogPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);
  useEffect(() => {
    getBooks().then((products) => setBooks(products));
    getCategories().then((items) => setCategories(items));
  }, []);
  return (
    <div className={styles.container} data-testid="catalog-container">
      <div className={styles.categories}>
        <span
          className={styles.categoryBtn}
          onClick={() => setIsListVisible(!isListVisible)}
        >
          <h4>categories</h4> <img src={isListVisible ? Up : Down} alt="" />
        </span>
        <div className="list">
          <ul className={`${styles.list} ${isListVisible ? '' : 'hidden'}`}>
            {categories.map((item) => {
              return <li key={item.key}>{item.name['en-US']}</li>;
            })}
          </ul>
        </div>
      </div>
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
    </div>
  );
};

export default CatalogPage;
