import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import { Product } from '@/types/products';
import Search from '@/assets/icons/search.svg';
import Categories from '@/components/Catalog/Categories';
import Books from '@/components/Catalog/Books';
import sortAscending from '@/assets/icons/sortAscending.svg';

const CatalogPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  useEffect(() => {
    getBooks().then((products) => setBooks(products));
  }, []);

  const sortBooks = (criteria: string) => {
    const sortedBooks = [...books].sort((a, b) => {
      if (criteria === 'price') {
        return +(a.price?.centAmount ?? 0) - +(b.price?.centAmount ?? 0);
      }
      if (criteria === 'name') {
        return a.name['en-GB'].localeCompare(b.name['en-GB']);
      }
      return 0;
    });
    setBooks(sortedBooks);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.target.value;
    sortBooks(criteria);
  };

  return (
    <div className={styles.container} data-testid="catalog-container">
      <Categories onSetBooks={(value: Product[]) => setBooks(value)} />
      <div className={styles['input-div']}>
        <div className={clsx(styles['search-sort'])}>
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
          <span className={clsx(styles.sortContainer)}>
            <select
              name="sort"
              id="sort"
              className={clsx(styles.sort)}
              onChange={handleSortChange}
            >
              <option value="">sort by</option>
              <option value="price">price</option>
              <option value="name">name</option>
            </select>
            <img src={sortAscending} alt="" className={clsx(styles.sortIcon)} />
          </span>
        </div>
        <Books books={books} />
      </div>
    </div>
  );
};

export default CatalogPage;
