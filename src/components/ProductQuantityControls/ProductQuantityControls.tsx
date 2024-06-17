import clsx from 'clsx';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from '@/pages/BasketPage/BasketPage.module.scss';
import { updateCart } from '@/services/cart';
import removeFromCart from '@/services/removeFromCart';
import Toast from '@/helpers/Toast';

interface ProductQuantityControlsProps {
  initialQuantity: number;
  lineItemId: string;
  productId: string;
  cartId: string;
  version: number;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
}

const ProductQuantityControls = ({
  initialQuantity,
  lineItemId,
  productId,
  cartId,
  version,
  onIncrement,
  onDecrement,
}: ProductQuantityControlsProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = async () => {
    try {
      await updateCart(cartId, version, productId);
      setQuantity(quantity + 1);
      onIncrement(productId);
    } catch (error) {
      Toast({
        message: 'Failed to add the product to the cart.',
        status: 'error',
      });
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      try {
        await removeFromCart(lineItemId);
        setQuantity(quantity - 1);
        onDecrement(productId);
      } catch (error) {
        Toast({
          message: 'Failed to remove the product from the cart.',
          status: 'error',
        });
      }
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
