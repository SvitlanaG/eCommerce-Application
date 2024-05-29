import { useEffect, useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import { Product } from '@/types/products';
import Search from '@/assets/icons/search.svg';
import Categories from '@/components/Catalog/Categories';
import Books from '@/components/Catalog/Books';

const CatalogPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  useEffect(() => {
    getBooks().then((products) => setBooks(products));
  }, []);
  return (
    <div className={styles.container} data-testid="catalog-container">
      <Categories onSetBooks={(value: Product[]) => setBooks(value)} />
      <div className={styles['input-div']}>
        <span>
          <img
            src={Search}
            alt="search"
            className={`${styles['input-img']} ${styles.search}`}
          />
          <input
            onChange={async (e) => {
              setBooks(
                (await getBooks()).filter((book) =>
                  book.name['en-GB']
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
            type="search"
          />
        </span>
        <Books books={books} />
      </div>
    </div>
  );
};

export default CatalogPage;
