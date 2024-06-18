import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from '@/pages/CatalogPage/CatalogPage.module.scss';
import s from '@/pages/BasketPage/BasketPage.module.scss';
import Delete from '@/assets/icons/delete.svg';
import { Product } from '@/types/products';
import { getDiscounts } from '@/services/catalog';
import imageDefault from '@/assets/img/imageDefault.png';
import getDiscounted, { calculateTotal } from '@/helpers/Utils/utils';
import { getCart, updateCart } from '@/services/cart';
import ProductQuantityControls from '@/components/ProductQuantityControls';
import removeFromCart from '@/services/removeFromCart';
import addCartDiscount from '@/services/addCartDiscount';
import { Cart } from '@/types/cart';

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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState<number>(0);
  const [cart, setCart] = useState<Cart | null>(null);
  const [withDiscount, setWithDiscount] = useState<number>(0);
  const [refreshBook, setRefreshBook] = useState(true);

  const handleLineItems = async (bookId: string) => {
    await getCart().then(async (data) => {
      const lineItemsArray = data?.lineItems;
      if (lineItemsArray) {
        for (let i = 0; i < lineItemsArray.length; i += 1) {
          if (lineItemsArray[i].productId === bookId) {
            removeFromCart(lineItemsArray[i].id, lineItemsArray[i].quantity);
          }
        }
      }
    });
  };

  const handleWithDiscount = async () => {
    await getCart().then((data) => {
      if (data) setWithDiscount(data.totalPrice.centAmount);
    });
  };

  useEffect(() => {
    getCart().then((data) => {
      setCart(data);
      setProductIds(data ? data.productIds : []);
      if (data) {
        const initialQuantities = data.lineItems.reduce(
          (acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
          },
          {} as { [key: string]: number },
        );
        setQuantities(initialQuantities);
        setTotal(calculateTotal(books, discounted, initialQuantities));
        setWithDiscount(data.totalPrice.centAmount);
      }
    });
  }, [cartAdded, books, discounted, withDiscount, refreshBook]);

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

  const addCart = (productId: string) => {
    getCart().then(async (cartInfo) => {
      if (cartInfo) {
        localStorage.setItem('cartId', cartInfo.id);
        await updateCart(cartInfo.id, productId);
        setCartAdded(cartInfo.version);
      }
    });
  };

  const navigate = useNavigate();
  const handleBookInfo = (key: string) => {
    navigate(`/catalog/${key}`);
  };

  const handleIncrement = (productId: string) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      };
      setTotal(calculateTotal(books, discounted, newQuantities));
      return newQuantities;
    });
  };

  const handleDecrement = (productId: string) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      };
      setTotal(calculateTotal(books, discounted, newQuantities));
      return newQuantities;
    });
  };

  return (
    <div className={s['book-container']}>
      <div className={styles['main-div']}>
        {books.map((book) => (
          <div
            key={book.key}
            className={clsx(styles['image-div'], {
              [styles['image-div_basket']]: fromBasket,
            })}
          >
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
                  className={`${clsx(styles.price)} ${
                    discounted.find((discount) => discount?.sku === book.sku) &&
                    clsx(styles.discounted)
                  }`}
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
            {fromBasket && cart && (
              <>
                <div>
                  <ProductQuantityControls
                    initialQuantity={quantities[book.id] || 1}
                    lineItemId={
                      cart.lineItems.find((item) => item.productId === book.id)
                        ?.id || ''
                    }
                    productId={book.id}
                    cartId={cart.id}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    handleWithDiscount={handleWithDiscount}
                  />
                </div>
                <button
                  onClick={async () => {
                    await handleLineItems(book.id);
                    setTimeout(() => {
                      refreshCart();
                    }, 150);
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
          <p>Total: {total}$</p>
          {withDiscount && <p>With discount: {withDiscount / 100}$</p>}
          <button
            type="button"
            className={clsx(styles['button-large'], styles['button-primary'])}
            onClick={async () => {
              await addCartDiscount('rss-promocode');
              // setTimeout(() => {
              //   handleWithDiscount();
              // }, 150);
              setRefreshBook(!refreshBook);
            }}
          >
            Apply promo code
          </button>
          <button
            disabled
            className={clsx(styles['button-large'], styles['button-secondary'])}
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
