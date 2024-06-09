import Carousel from 'react-bootstrap/Carousel';
import styles from './ImageModal.module.scss';
import closeIcon from '@/assets/icons/close.svg';
import handleBackdropClick from '@/hooks/useModalConfig';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  images: { uri: string }[] | undefined;
};

const ImageModal = ({ isOpen, onClose, images }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => handleBackdropClick(e, onClose)}
    >
      <div className={styles.imgModal}>
        <Carousel data-bs-theme="dark">
          {images?.map((i) => {
            return (
              <Carousel.Item key={i.uri}>
                <div className={styles.imgWrapper}>
                  <div className={styles.imgContainer}>
                    <img className={styles.sliderImg} src={i.uri} alt="Book" />
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <div className={styles.closeModal} onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
