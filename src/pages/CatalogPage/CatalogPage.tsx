import { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import Select, { SingleValue } from 'react-select';
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
import { sortCondition } from '@/helpers/Utils/utils';
import optionsSort from '@/helpers/constants';

const CatalogPage = () => {
  const [books, setBooks] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [priceRange, setPriceRange] = useState<number | null>(null);
  useEffect(() => {
    getBooks('').then((products) => setBooks(products));
  }, []);
  const handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === 'langauge') {
      setLanguage(ev.target.value);
      let url;
      if (category !== '') {
        url = `search?filter=categories.id:"${category}"${priceRange ? `&filter=variants.price.centAmount:range(${+priceRange * 100} to ${+priceRange === 100 ? '*' : (+priceRange + 30) * 100})` : ''}`;
      } else if (priceRange)
        url = `search?filter=variants.price.centAmount: range (${+priceRange * 100} to ${+priceRange === 100 ? '*' : (+priceRange + 30) * 100})`;
      else url = '';
      getBooks(url).then((data: Product[]) => {
        setBooks(
          data.filter((book) =>
            Object.keys(book.name).includes(ev.target.value),
          ),
        );
      });
    } else if (ev.target.name === 'price') {
      setPriceRange(+ev.target.value);
      getBooks(
        `search?filter=variants.price.centAmount:range (${+ev.target.value * 100} to ${+ev.target.value === 100 ? '*' : (+ev.target.value + 30) * 100})${category ? `&filter=categories.id:"${category}"` : ''}`,
      ).then((data: Product[]) => {
        setBooks(
          data.filter((book) => {
            return language ? Object.keys(book.name).includes(language) : true;
          }),
        );
      });
    }
  };

  const sortBooks = async (criteria: string) => {
    if (criteria === 'asc' || criteria === 'desc') {
      getBooks(`search?sort=price ${criteria}`).then((data: Product[]) => {
        setBooks(data.filter((book) => sortCondition(book, books)));
      });
    }
    if (criteria === 'name') {
      getBooks(`search?sort=name.en-US asc`).then((data: Product[]) => {
        setBooks(data.filter((book) => sortCondition(book, books)));
      });
    }
  };
  const handleSortChange = (
    ev: SingleValue<{
      value: string;
      label: string;
    }>,
  ) => {
    if (ev) {
      const criteria = ev.value;
      sortBooks(criteria);
    }
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
          <span className={clsx(styles.searching)}>
            <img
              src={Search}
              alt="search"
              className={`${styles['input-img']} ${styles.search}`}
            />
            <input
              className={styles['search-input']}
              onChange={async (e) => {
                getBooks('').then((data: Product[]) => {
                  setBooks(
                    data.filter((book) =>
                      book.name['en-GB']
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()),
                    ),
                  );
                });
              }}
              type="search"
            />
          </span>
          <span className={clsx(styles['sort-container'])}>
            <Select
              options={optionsSort}
              className={styles.sort}
              placeholder="Sort By"
              onChange={handleSortChange}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  cursor: 'pointer',
                  borderRadius: '10px',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  '&:hover': {
                    backgroundColor: `#F86C08`,
                    color: 'white',
                  },
                  backgroundColor: state.isSelected ? '#F86C08' : 'white',
                  cursor: 'pointer',
                }),
              }}
            />
            <img
              src={sortAscending}
              alt=""
              className={clsx(styles['sort-icon'])}
            />
          </span>
          <div className={clsx(styles['filter-div'])}>
            <div
              className={clsx(styles['filter-buttons'])}
              onClick={() => setVisible(!visible)}
            >
              <span className={clsx(styles.filter)}>filter</span>
              <img src={filter} alt="" className={clsx(styles['sort-icon'])} />
            </div>
            <div className={clsx(styles.details, visible ? '' : styles.hidden)}>
              <Prices handleChange={handleChange} />
              <Languages handleChange={handleChange} />
            </div>
          </div>
        </div>
        <Books books={books} />
      </div>
    </div>
  );
};

export default CatalogPage;
