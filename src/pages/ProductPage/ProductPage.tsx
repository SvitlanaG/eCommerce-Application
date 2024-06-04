import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import getBookInfo from '@/services/getBookInfo';
import { Book } from '@/types/products';
import styles from './ProductPage.module.scss';
import ImageModal from '@/components/ImageModal/ImageModal';

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

  console.log('book', book);

  return (
    <div className={styles.product}>
      <div className={styles.info}>
        <h2>{book?.name['en-GB']}</h2>
        <p>{book?.description['en-GB']}</p>
      </div>
      <Carousel data-bs-theme="dark">
        {book?.masterVariant.assets?.[0]?.sources.map((i) => {
          return (
            <Carousel.Item key={i.uri}>
              <div className={styles.imgWrapper}>
                <div className={styles.imgContainer} onClick={handleOpenModal}>
                  <img className={styles.sliderImg} src={i.uri} alt="Book" />
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <ImageModal
        isOpen={isShowModal}
        onClose={handleCloseModal}
        images={book?.masterVariant.assets?.[0]?.sources}
      />
    </div>
  );
};

export default ProductPage;