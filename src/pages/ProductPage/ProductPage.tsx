import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Carousel from 'react-bootstrap/Carousel';
import getBookInfo from '@/services/getBookInfo';
import { Book } from '@/types/products';
import styles from './ProductPage.module.scss';
import ImageModal from '@/components/ImageModal/ImageModal';
import { getDiscounts } from '@/services/catalog';
import { getCart, updateCart } from '@/services/cart';
import removeFromCart from '@/services/removeFromCart';

const ProductPage = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [bookId, setBookId] = useState('');
  const [lineItemId, setLineItemId] = useState('');
  const [lineItemQuantity, setLineItemQuantity] = useState(1);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [cartVersion, setCartVersion] = useState<number | null>(null);
  const [discounted, setDiscounted] = useState<
    ({ sku: string; value: number } | null)[]
  >([]);
  const [isAddButton, setIsAddButton] = useState(false);

  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);

  const handleButtonName = () => {
    if (productIds.includes(bookId)) {
      setIsAddButton(false);
    } else {
      setIsAddButton(true);
    }
  };

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
  }, [book]);

  const price = book?.masterVariant?.prices[0]?.value?.centAmount;

  // console.log(productIds);
  // console.log(bookId);

  useEffect(() => {
    getCart().then((data) => {
      console.log(data?.lineItems);
      console.log('book', bookId);
      const lineItemsArray = data?.lineItems;
      if (lineItemsArray) {
        for (let i = 0; i < lineItemsArray.length; i += 1) {
          if (lineItemsArray[i].productId === bookId) {
            setLineItemId(lineItemsArray[i].id);
            setLineItemQuantity(lineItemsArray[i].quantity);
            console.log('lineid', lineItemId, lineItemQuantity);
          }
        }
      }
    });
  }, [bookId, lineItemId]);

  useEffect(() => {
    getCart().then((data) => {
      setProductIds(data ? data.productIds : []);
    });
  }, [cartVersion]);

  const addCart = (productId: string) => {
    getCart().then(async (cartInfo) => {
      if (cartInfo) {
        localStorage.setItem('cartId', cartInfo.id);
        await updateCart(cartInfo.id, cartInfo.version, productId);
        setCartVersion(cartInfo.version);
      }
    });
  };

  const handleCartVersion = () => {
    getCart().then(async (cartInfo) => {
      if (cartInfo) {
        setCartVersion(cartInfo.version);
      }
    });
  };

  const removeBook = async (
    itemId: string,
    version: number,
    quantity: number,
  ) => {
    const cartId = localStorage.getItem('cartId');
    console.log('click', cartId, itemId, version, quantity);
    if (cartId && cartVersion) {
      await removeFromCart(cartId, version, itemId, quantity);
    }
  };

  useEffect(() => {
    if (key) {
      getBookInfo(key, navigate).then((result) => {
        if (result) {
          setBookId(result.id);
          setBook(result.masterData?.current);
        }
      });
    }
    handleCartVersion();
    handleButtonName();
  }, [key, navigate]);

  return (
    <div className={styles.product}>
      <div className={styles.info}>
        <h2>{book?.name['en-GB']}</h2>
        <p>{book?.description['en-GB']}</p>
        <div className={styles['price-container']}>
          <div className={styles.price}>Price:</div>
          <div
            className={`${styles.price} ${discounted.find((d) => d?.sku === book?.masterVariant?.sku) && styles.discounted}`}
          >
            {price && +(price / 100).toFixed(2)}$
          </div>
          {discounted.find(
            (discount) => discount?.sku === book?.masterVariant?.sku,
          ) && (
            <div className={styles.price}>
              {+((price ?? 0) / 100).toFixed(2) -
                +(
                  +(
                    discounted.find(
                      (discount) => discount?.sku === book?.masterVariant?.sku,
                    )?.value ?? 0
                  ) / 100
                ).toFixed(2)}
              $
            </div>
          )}
        </div>
        {isAddButton ? (
          <button
            type="button"
            onClick={() => {
              if (cartVersion) {
                removeBook(lineItemId, cartVersion, lineItemQuantity);
                handleButtonName();
              }
            }}
            className={clsx(
              styles['button-small'],
              styles['button-primary'],
              styles['btn-cart'],
            )}
          >
            Delete from cart
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              addCart(bookId);
              setIsAddButton(true);
            }}
            className={clsx(
              styles['button-small'],
              styles['button-primary'],
              styles['btn-cart'],
            )}
          >
            Add To Cart
          </button>
        )}
      </div>
      <div className={styles['carousel-container']}>
        <Carousel data-bs-theme="dark">
          {book?.masterVariant.assets?.[0]?.sources.map((i) => {
            return (
              <Carousel.Item key={i.uri}>
                <div className={styles['img-wrapper']}>
                  <div
                    className={styles['img-container']}
                    onClick={handleOpenModal}
                  >
                    <img
                      className={styles['slider-img']}
                      src={i.uri}
                      alt="Book"
                    />
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <ImageModal
        isOpen={isShowModal}
        onClose={handleCloseModal}
        images={book?.masterVariant.assets?.[0]?.sources}
      />
    </div>
  );
};

export default ProductPage;
