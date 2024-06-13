import { useEffect, useState } from 'react';
import { getCart } from '@/services/cart';
import styles from '@/pages/BasketPage/BasketPage.module.scss';
import { getBookById } from '@/services/getBooks';
import { Product } from '@/types/products';
import { Books } from '../Catalog';

const CartItems = () => {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCart().then((data) => setProductIds(data ? data.productIds : []));
    const books: Product[] = [];
    productIds.forEach((id) => {
      getBookById(id).then((product) => {
        if (product) books.push(product);
      });
    });
    setProducts(books);
  }, [productIds]);

  return (
    <div className={styles['input-div']}>
      <Books books={products} />
    </div>
  );
};

export default CartItems;
