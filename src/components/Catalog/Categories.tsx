import { useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import Up from '@/assets/icons/up.svg';
import Down from '@/assets/icons/down.svg';
import { PropsCategories } from '@/types/Props';
import useFetch from '@/hooks/useFetch';

const Categories = ({ onSetBooks }: PropsCategories) => {
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
      <div className="list">
        <ul className={`${styles.list} ${isListVisible ? '' : 'hidden'}`}>
          {categories.map((item) => {
            return (
              <li key={item.key}>
                <span
                  onClick={async () => {
                    onSetBooks(
                      (await getBooks(false)).filter((book) =>
                        book.categories.some(
                          (category) => category.id === item.id,
                        ),
                      ),
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
