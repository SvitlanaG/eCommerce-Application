import Toast from '@/helpers/Toast';
import { Errors } from '@/types/Errors';
import { getCart } from './cart';

const addCartDiscount = async (discountCode: string) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem('userAccessToken');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${token || localStorage.getItem('visitorIdentifier')}`,
  );

  const cartId = localStorage.getItem('cartId');
  let version;

  await getCart().then((cartInfo): void => {
    if (cartInfo) {
      version = cartInfo.version;
    }
  });

  const raw = JSON.stringify({
    version,
    actions: [
      {
        action: 'addDiscountCode',
        code: `${discountCode}`,
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts/${cartId}`,
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      throw new Error(`${message}`);
    }
    Toast({
      message: 'Promo code was successfully applied to the cart!',
      status: 'success',
    });
    return true;
  } catch (error) {
    Toast({
      message: 'Invalid promo code or something went wrong. Try again later!',
      status: 'error',
    });
    return false;
  }
};

export default addCartDiscount;
