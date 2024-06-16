import clsx from 'clsx';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from '@/pages/BasketPage/BasketPage.module.scss';

const ProductQuantityControls = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.flex}>
      <div
        onClick={handleDecrement}
        className={clsx(styles['button-icon'], styles['button-icon-secondary'])}
      >
        <FaMinus />
      </div>
      <div className={styles['product-quantity-controls']}>
        <span>{quantity}</span>
      </div>

      <div
        onClick={handleIncrement}
        className={clsx(styles['button-icon'], styles['button-icon-secondary'])}
      >
        <FaPlus />
      </div>
    </div>
  );
};

export default ProductQuantityControls;
