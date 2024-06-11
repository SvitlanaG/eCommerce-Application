import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import getBookInfo from '@/services/getBookInfo';
import { Book } from '@/types/products';
import styles from './ProductPage.module.scss';
import ImageModal from '@/components/ImageModal/ImageModal';
import { getDiscounts } from '@/services/catalog';

const ProductPage = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);

  useEffect(() => {
    if (key) {
      getBookInfo(key, navigate).then((result) => {
        if (result) {
          setBook(result.masterData?.current);
        }
      });
    }
  }, [key, navigate]);

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
  }, [book]);

  const price = book?.masterVariant?.prices[0]?.value?.centAmount;

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
