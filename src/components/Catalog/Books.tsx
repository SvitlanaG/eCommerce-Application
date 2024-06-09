import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import { Product } from '@/types/products';
import { getDiscounts } from '@/services/catalog';
import imageDefault from '@/assets/img/imageDefault.png';

const Books = ({ books }: { books: Product[] }) => {
  const [discounted, setDiscounted] = useState<
    ({ sku: string; value: number } | null)[]
  >([]);
  useEffect(() => {
    getDiscounts().then((discounts) => {
      const skus = discounts.map((discount) => {
        const matched = discount?.predicate
          ?.split('=')[1]
          .trim()
          .replace(/"/g, '');
        return matched
          ? { sku: matched, value: discount.value.money[0].centAmount }
          : null;
      });
      setDiscounted(skus);
    });
  }, [books]);

  const navigate = useNavigate();
  const handleBookInfo = (key: string) => {
    navigate(`/catalog/${key}`);
  };

  return (
    <div className={styles['main-div']}>
      {books.map((book) => (
        <div key={book.key} className={styles['image-div']}>
          <div
            className={styles['image-description']}
            onClick={() => handleBookInfo(book.key)}
          >
            <img
              src={book.assetSources[0].uri}
              onError={(ev) => {
                ev.currentTarget.src = imageDefault;
              }}
              alt="book"
              className={styles.img}
            />
            <p className={styles['book-name']} key={book.key}>
              {book.name['en-GB']}
            </p>
            <div className={clsx(styles.prices)}>
              <p
                className={`${clsx(styles.price)} ${discounted.find((discount) => discount?.sku === book.sku) && clsx(styles.discounted)}`}
              >
                {book.price?.centAmount &&
                  +(book.price.centAmount / 100).toFixed(2)}
                $
              </p>
              {discounted.find((discount) => discount?.sku === book.sku) && (
                <span className={clsx(styles.price)}>
                  {+((book?.price?.centAmount ?? 0) / 100).toFixed(2) -
                    +(
                      +(
                        discounted.find(
                          (discount) => discount?.sku === book.sku,
                        )?.value ?? 0
                      ) / 100
                    ).toFixed(2)}
                  $
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={clsx(styles['button-small'], styles['button-primary'])}
          >
            Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default Books;
