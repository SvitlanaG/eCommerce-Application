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
import emptyCart from '@/services/emptyCart';

const BasketPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEmpty, setisEmpty] = useState(false);

  const handleIsEmpty = () => {
    setisEmpty(!isEmpty);
  };

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
  }, [isEmpty]);

  return (
    <div>
      {isLoading ? (
        <SkeletonTheme highlightColor="#444">
          <div className={styles.skeletonContainer}>
            {['skeleton1', 'skeleton2', 'skeleton3'].map((skeletonId) => (
              <Skeleton
                key={skeletonId}
                height={300}
                width="200px"
                style={{ margin: '10px' }}
              />
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
                <Books
                  books={products}
                  refreshCart={handleIsEmpty}
                  disable
                  fromBasket
                />
                <button
                  type="button"
                  className={clsx(
                    styles['button-large'],
                    styles['button-primary'],
                  )}
                  onClick={async () => {
                    // eslint-disable-next-line no-restricted-globals, no-alert
                    const isCart = confirm('Are you sure? ');
                    if (isCart) {
                      await emptyCart();
                      handleIsEmpty();
                    }
                  }}
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
