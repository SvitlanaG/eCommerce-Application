import { useEffect, useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import getBooks from '@/services/getBooks';
import Up from '@/assets/icons/up.svg';
import Down from '@/assets/icons/down.svg';
import { Category } from '@/types/categories';
import getCategories from '@/services/catalog';
import { PropsCategories } from '@/types/Props';

const Categories = ({ onSetBooks }: PropsCategories) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);
  useEffect(() => {
    getCategories().then((items) => setCategories(items));
  }, []);
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
                      (await getBooks()).filter((book) =>
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
