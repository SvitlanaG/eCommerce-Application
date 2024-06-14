import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import clsx from 'clsx';
import styles from '@/pages/BasketPage/BasketPage.module.scss';
import EmptyCart from '@/components/EmptyCart';
import { getCart } from '@/services/cart';
import { getBookById } from '@/services/getBooks';
import { Product } from '@/types/products';
import { Books } from '@/components/Catalog';
import 'react-loading-skeleton/dist/skeleton.css';

const BasketPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCart().then((data) => {
      if (data) {
        const books: Product[] = [];
        const promises = data.productIds.map((id) => {
          return getBookById(id).then((product) => {
            if (product) {
              books.push(product);
            }
          });
        });
        Promise.all(promises).then(() => {
          setProducts(books);
          setLoading(false);
        });
      }
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <SkeletonTheme highlightColor="#444">
          <div className={styles.skeletonContainer}>
            {Array.from({ length: 3 }).map(() => (
              <Skeleton height={300} width="200px" style={{ margin: '10px' }} />
            ))}
          </div>
        </SkeletonTheme>
      ) : (
        <div>
          <h2>Your Basket - Review Your Selections</h2>
          <div className={styles.basket}>
            {products.length === 0 ? (
              <EmptyCart />
            ) : (
              <div
                className={clsx(styles['input-div'], styles['book-baskets'])}
              >
                <Books books={products} disable />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
