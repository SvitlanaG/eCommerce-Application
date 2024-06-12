import styles from '@/pages/BasketPage/BasketPage.module.scss';
import EmptyCart from '@/components/EmptyCart';

const BasketPage = () => {
  const items = [];
  return (
    <div>
      <h2>Your Basket - Review Your Selections</h2>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className={styles['cart-items']}>
          {/* Display cart items here */}
        </div>
      )}
    </div>
  );
};

export default BasketPage;
