import { useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import Up from '@/assets/icons/up.svg';
import Menu from '@/assets/icons/menu.svg';
import Down from '@/assets/icons/down.svg';
import Close from '@/assets/icons/close.svg';
import { PropsCategories } from '@/types/Props';
import useFetch from '@/hooks/useFetch';

const Categories = ({
  onSetBooks,
  onSetCategory,
  language,
  priceRange,
}: PropsCategories) => {
  const categories = useFetch();
  const [isListVisible, setIsListVisible] = useState(false);
  return (
    <div className={styles.categories}>
      <span
        className={styles.categoryBtn}
        onClick={() => setIsListVisible(!isListVisible)}
      >
        <h4>categories</h4> <img src={isListVisible ? Up : Down} alt="" />
      </span>
      <span
        className={styles.burgerBtn}
        onClick={() => setIsListVisible(!isListVisible)}
      >
        <img src={isListVisible ? Close : Menu} alt="" />
      </span>
      <div className="list">
        <ul className={`${styles.list} ${isListVisible ? '' : 'hidden'}`}>
          {categories.map((item) => {
            return (
              <li key={item.key}>
                <span
                  onClick={async () => {
                    onSetCategory(item.id);
                    onSetBooks(
                      (await getBooks(false, false))
                        .filter((book) =>
                          book.categories.some(
                            (category) => category.id === item.id,
                          ),
                        )
                        .filter((book) => {
                          return language
                            ? Object.keys(book.name).includes(language)
                            : true;
                        })
                        .filter((book) => {
                          if (priceRange) {
                            return priceRange === 100
                              ? (book.price?.centAmount ?? 0) >= 100 * 100
                              : (book.price?.centAmount ?? 0) >=
                                  priceRange * 100 &&
                                  (book.price?.centAmount ?? 0) <=
                                    (priceRange + 30) * 100;
                          }
                          return true;
                        }),
                    );
                  }}
                >
                  {item.name['en-US']}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
