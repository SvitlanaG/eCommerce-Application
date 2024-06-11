import { useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import Up from '@/assets/icons/up.svg';
import Menu from '@/assets/icons/menu.svg';
import Down from '@/assets/icons/down.svg';
import Close from '@/assets/icons/close.svg';
import { PropsCategories } from '@/types/Props';
import useFetch from '@/hooks/useFetch';
import { filterBooks } from '@/helpers/Utils/utils';
import { Product } from '@/types/products';

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
        className={styles['category-btn']}
        onClick={() => setIsListVisible(!isListVisible)}
      >
        <h4>categories</h4> <img src={isListVisible ? Up : Down} alt="" />
      </span>
      <span
        className={styles['burger-btn']}
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
                    filterBooks(language, priceRange, item).then(
                      (data: Product[]) => {
                        onSetBooks(data);
                      },
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
