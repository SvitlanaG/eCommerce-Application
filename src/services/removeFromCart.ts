import { Errors } from '@/types/Errors';
import Toast from '@/helpers/Toast';
import { getCart } from './cart';

const removeFromCart = async (lineItemId: string, quantity: number = 1) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem('userAccessToken');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${token || localStorage.getItem('visitorIdentifier')}`,
  );

  let version;
  const cartId = localStorage.getItem('cartId');

  await getCart().then((cartInfo): void => {
    if (cartInfo) {
      version = cartInfo.version;
    }
  });

  const raw = JSON.stringify({
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: `${lineItemId}`,
        quantity,
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
      message: 'The book was successfully removed from the cart!',
      status: 'success',
    });
    return true;
  } catch (error) {
    Toast({
      message: 'Something went wrong. Try again later!',
      status: 'error',
    });
    return false;
  }
};

export default removeFromCart;
