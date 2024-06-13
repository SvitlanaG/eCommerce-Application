import { useEffect, useState } from 'react';
import styles from '@/pages/BasketPage/BasketPage.module.scss';
import EmptyCart from '@/components/EmptyCart';
import { getCart } from '@/services/cart';
import { getBookById } from '@/services/getBooks';
import { Product } from '@/types/products';
import { Books } from '@/components/Catalog';

const BasketPage = () => {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCart().then((data) => {
      setProductIds(data ? data.productIds : []);
    });
  }, []);

  useEffect(() => {
    const books: Product[] = [];
    const promises = productIds.map((id) => {
      return getBookById(id).then((product) => {
        if (product) {
          books.push(product);
        }
      });
    });
    Promise.all(promises).then(() => {
      setProducts(books);
    });
  }, [productIds]);

  return (
    <>
      <h2>Your Basket - Review Your Selections</h2>
      <div className={styles.basket}>
        {products.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className={styles['input-div']}>
            <Books books={products} disable />
          </div>
        )}
      </div>
    </>
  );
};

export default BasketPage;
