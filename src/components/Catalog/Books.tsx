import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import s from '@/pages/BasketPage/BasketPage.module.scss';
import Delete from '@/assets/icons/delete.svg';
import { Product } from '@/types/products';
import { getDiscounts } from '@/services/catalog';
import imageDefault from '@/assets/img/imageDefault.png';
import getDiscounted, { calculateTotal } from '@/helpers/Utils/utils';
import { getCart, updateCart } from '@/services/cart';
import removeFromCart from '@/services/removeFromCart';

type Props = {
  books: Product[];
  disable: boolean;
  fromBasket: boolean;
  refreshCart: () => void;
};

const Books = ({ books, disable, fromBasket, refreshCart }: Props) => {
  const [discounted, setDiscounted] = useState<
    ({ sku: string; value: number } | null)[]
  >([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [cartAdded, setCartAdded] = useState<number | null>(null);
  const [lineItemId, setLineItemId] = useState('');
  const [lineItemQuantity, setLineItemQuantity] = useState(1);

  const handleLimeItems = async (bookId: string) => {
    await getCart().then(async (data) => {
      const lineItemsArray = data?.lineItems;
      console.log('lineItemsArray', lineItemsArray);
      if (lineItemsArray) {
        for (let i = 0; i < lineItemsArray.length; i += 1) {
          if (lineItemsArray[i].productId === bookId) {
            setLineItemId(lineItemsArray[i].id);
            setLineItemQuantity(lineItemsArray[i].quantity);
          }
        }
      }
    });
  };

  useEffect(() => {
    getCart().then((data) => setProductIds(data ? data.productIds : []));
  }, [cartAdded]);
  useEffect(() => {
    getDiscounts().then((discounts) => {
      const skus = discounts.map((discount) => {
        const matched = discount?.predicate // get sku from predicate raw value
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
  const addCart = (productId: string) => {
    getCart().then(async (cartInfo) => {
      if (cartInfo) {
        localStorage.setItem('cartId', cartInfo.id);
        await updateCart(cartInfo.id, cartInfo.version, productId);
        setCartAdded(cartInfo.version);
      }
    });
  };

  const navigate = useNavigate();
  const handleBookInfo = (key: string) => {
    navigate(`/catalog/${key}`);
  };

  return (
    <div className={s['book-container']}>
      <div className={styles['main-div']}>
        {books.map((book) => (
          <div key={book.key} className={styles['image-div']}>
            <div
              className={clsx(styles['image-description'])}
              onClick={() => handleBookInfo(book.key)}
            >
              <div className={styles.baskets}>
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
              </div>
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
                    {getDiscounted(book, discounted)}$
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={() => addCart(book.id)}
              disabled={productIds.includes(book.id) ? true : disable}
              className={clsx(
                styles['button-small'],
                styles['button-primary'],
                styles['btn-cart'],
                fromBasket ? styles.hidden : '',
                {
                  [styles.disabled]: productIds.includes(book.id)
                    ? true
                    : disable,
                },
              )}
            >
              Add To Cart
            </button>
            {fromBasket && (
              <>
                <div>
                  <button type="button">minus</button>
                  <span>quantity</span>
                  <button type="button">plus</button>
                </div>
                <button
                  onClick={async () => {
                    await handleLimeItems(book.id);
                    console.log('lineItemId', lineItemId);
                    console.log('lineItemQuantity', lineItemQuantity);
                    await removeFromCart(lineItemId, lineItemQuantity);
                    refreshCart();
                  }}
                  className={clsx(
                    s.delete,
                    styles['button-small'],
                    styles['button-primary'],
                    styles['btn-cart'],
                  )}
                  type="button"
                >
                  <span>Delete from cart</span>
                  <img src={Delete} alt="" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      {fromBasket && (
        <div className={s.order}>
          total: {calculateTotal(books, discounted)}$
          <button
            className={clsx(styles['button-small'], styles['button-primary'])}
            type="submit"
          >
            <span>Order</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Books;
