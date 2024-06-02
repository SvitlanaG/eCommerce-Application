import { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import { Product } from '@/types/products';
import Search from '@/assets/icons/search.svg';
import Categories from '@/components/Catalog/Categories';
import Books from '@/components/Catalog/Books';
import sortAscending from '@/assets/icons/sortAscending.svg';
import filter from '@/assets/icons/filter.svg';
import Prices from '@/components/Catalog/Prices';
import Languages from '@/components/Catalog/Languages';

const CatalogPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [priceRange, setPriceRange] = useState<number | null>(null);
  useEffect(() => {
    getBooks(false, false).then((products) => setBooks(products));
  }, []);
  const handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === 'langauge') {
      setLanguage(ev.target.value);
      let url;
      if (category !== '') {
        url = `:"${category}"${priceRange ? `&filter=variants.price.centAmount:range(${+priceRange * 100} to ${+priceRange === 100 ? '*' : (+priceRange + 30) * 100})` : ''}`;
      } else if (priceRange)
        url = `variants.price.centAmount:range (${+priceRange * 100} to ${+priceRange === 100 ? '*' : (+priceRange + 30) * 100})`;
      else url = '';
      setBooks(
        (
          await getBooks(
            false,
            Boolean(category) || Boolean(priceRange),
            `${category ? 'categories.id' : ''}`,
            url,
          )
        ).filter((book) => Object.keys(book.name).includes(ev.target.value)),
      );
    } else if (ev.target.name === 'price') {
      setPriceRange(+ev.target.value);
      setBooks(
        await getBooks(
          false,
          true,
          'variants.price.centAmount',
          `:range (${+ev.target.value * 100} to ${+ev.target.value === 100 ? '*' : (+ev.target.value + 30) * 100})${category ? `&filter=categories.id:"${category}"` : ''}`,
        ),
      );
    }
  };

  const sortBooks = async (criteria: string) => {
    if (criteria === 'priceAsc') {
      setBooks(
        (await getBooks(true, false, 'price', 'asc')).filter((book) => {
          const key = books.find((el) => el.key === book.key)?.key;
          if (key) {
            return key === book.key;
          }
          return false;
        }),
      );
    } else if (criteria === 'priceDesc') {
      setBooks(
        (await getBooks(true, false, 'price', 'desc')).filter((book) => {
          const key = books.find((el) => el.key === book.key)?.key;
          if (key) {
            return key === book.key;
          }
          return false;
        }),
      );
    }
    if (criteria === 'name') {
      setBooks(
        (await getBooks(true, false, 'name.en-US', 'asc')).filter((book) => {
          const key = books.find((el) => el.key === book.key)?.key;
          if (key) {
            return key === book.key;
          }
          return false;
        }),
      );
    }
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.target.value;
    sortBooks(criteria);
  };

  return (
    <div className={styles.container} data-testid="catalog-container">
      <Categories
        language={language}
        priceRange={priceRange}
        onSetCategory={(value: string) => setCategory(value)}
        onSetBooks={(value: Product[]) => setBooks(value)}
      />
      <div className={styles['input-div']}>
        <div className={clsx(styles['search-sort'])}>
          <span>
            <img
              src={Search}
              alt="search"
              className={`${styles['input-img']} ${styles.search}`}
            />
            <input
              className={styles.searchInput}
              onChange={async (e) => {
                setBooks(
                  (await getBooks(false, false)).filter((book) =>
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
              <option value="priceAsc">ascending price</option>
              <option value="priceDesc">descending price</option>
              <option value="name">name</option>
            </select>
            <img src={sortAscending} alt="" className={clsx(styles.sortIcon)} />
          </span>
          <div className={clsx(styles.filterDiv)}>
            <div
              className={clsx(styles.filterButtons)}
              onClick={() => setVisible(!visible)}
            >
              <span className={clsx(styles.filter)}>filter</span>
              <img src={filter} alt="" className={clsx(styles.sortIcon)} />
            </div>
          </div>
        </div>
        <div className={clsx(styles.details, visible ? '' : styles.hidden)}>
          <Prices handleChange={handleChange} />
          <Languages handleChange={handleChange} />
        </div>
        <Books books={books} />
      </div>
    </div>
  );
};

export default CatalogPage;
